// /api/oauth/callback.ts
import { WhopServerSdk } from "@whop/api";

const whopApi = WhopServerSdk({
  appApiKey: process.env.WHOP_API_KEY!,
  appId: process.env.NEXT_PUBLIC_WHOP_APP_ID!,
});

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  if (!code || !state) {
    return new Response("Missing code or state", { status: 400 });
  }

  const cookieHeader = request.headers.get("Cookie") ?? "";
  const stateCookie = cookieHeader
    .split(";")
    .find((c) => c.trim().startsWith(`oauth-state.${state}=`));

  if (!stateCookie) {
    return new Response("Invalid state cookie", { status: 400 });
  }

  // Exchange code for tokens:
  const authResponse = await whopApi.oauth.exchangeCode({
    code,
    // IMPORTANT: ensure this matches the redirectUri used in /api/oauth/init.ts
    redirectUri: "https://vitalboostapp.netlify.app/api/oauth/callback",
  });

  if (!authResponse.ok) {
    console.error("Whop code exchange failed:", authResponse);
    return new Response("Code exchange failed", { status: 400 });
  }

  const { access_token } = authResponse.tokens;

  // restore `next` from state cookie:
  const next = decodeURIComponent(stateCookie.split("=")[1] || "/");
  const redirectUrl = new URL(next, "https://vitalboostapp.netlify.app");

  // Set whop_access_token cookie for app to read (HttpOnly)
  return new Response(null, {
    status: 302,
    headers: {
      Location: redirectUrl.toString(),
      "Set-Cookie": `whop_access_token=${access_token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=3600`,
      // optionally clear the oauth-state cookie:
      // "Set-Cookie": `oauth-state.${state}=; Path=/; HttpOnly; Secure; Max-Age=0`,
    },
  });
}
