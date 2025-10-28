// /api/oauth/init.ts
import { WhopServerSdk } from "@whop/api";

const whopApi = WhopServerSdk({
  appApiKey: process.env.WHOP_API_KEY!,
  appId: process.env.NEXT_PUBLIC_WHOP_APP_ID!,
});

export async function GET(request: Request) {
  const url = new URL(request.url);
  const next = url.searchParams.get("next") ?? "/";

  const { url: authUrl, state } = whopApi.oauth.getAuthorizationUrl({
    // IMPORTANT: Update redirectUri to EXACT value in your Whop App's OAuth settings.
    redirectUri: "https://vitalboostapp.netlify.app/api/oauth/callback",
    scope: ["read_user"],
  });

  // Set a temporary state cookie so we can restore `next` after callback.
  return new Response(null, {
    status: 302,
    headers: {
      Location: authUrl,
      "Set-Cookie": `oauth-state.${state}=${encodeURIComponent(
        next
      )}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=3600`,
    },
  });
}
