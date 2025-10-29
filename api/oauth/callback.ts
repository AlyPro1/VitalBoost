import { WhopServerSdk } from "@whop/api";

const whopApi = WhopServerSdk({
  appApiKey: process.env.WHOP_API_KEY!,
  appId: process.env.VITE_PUBLIC_WHOP_APP_ID!,
});

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  if (!code || !state) {
    return new Response("Missing code or state", { status: 400 });
  }

  const cookieHeader = request.headers.get("Cookie") || "";
  const stateCookie = cookieHeader
    .split(";")
    .find((cookie) => cookie.trim().startsWith(`oauth-state.${state}=`));

  if (!stateCookie) {
    return new Response("Invalid state", { status: 400 });
  }

  const authResponse = await whopApi.oauth.exchangeCode({
    code,
    redirectUri: "http://localhost:5173/api/oauth/callback", // change to your production URL later
  });

  if (!authResponse.ok) {
    return new Response("Code exchange failed", { status: 400 });
  }

  const { access_token } = authResponse.tokens;
  const next = decodeURIComponent(stateCookie.split("=")[1]);
  const nextUrl = new URL(next, "http://localhost:5173");

  // Store Whop token in cookie (short lifespan)
  return new Response(null, {
    status: 302,
    headers: {
      Location: nextUrl.toString(),
      "Set-Cookie": `whop_access_token=${access_token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=3600`,
    },
  });
}
