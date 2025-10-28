// src/lib/whop-server.ts
import { WhopServerSdk } from "@whop/api";

const whopApi = WhopServerSdk({
  appApiKey: process.env.WHOP_API_KEY!,
  appId: process.env.NEXT_PUBLIC_WHOP_APP_ID!,
});

/**
 * Read the 'whop_access_token' from request headers and fetch the current user.
 * Returns the user object or null.
 */
export async function retrieveCurrentUserFromRequest(request: Request) {
  const cookieHeader = request.headers.get("Cookie") ?? "";
  const token = cookieHeader
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith("whop_access_token="))
    ?.split("=")[1];

  if (!token) return null;

  const userResponse = await whopApi.oauth.getCurrentUser({ accessToken: token });
  if (!userResponse.ok) return null;
  return userResponse.data;
}
