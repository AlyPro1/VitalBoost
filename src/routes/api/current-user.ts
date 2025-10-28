import { WhopServerSdk } from "@whop/api";

const whopApi = WhopServerSdk({
  appApiKey: process.env.WHOP_API_KEY!,
  appId: process.env.NEXT_PUBLIC_WHOP_APP_ID!,
});

export async function GET(request: Request) {
  const cookie = request.headers.get("cookie") || "";
  const token = cookie
    .split(";")
    .find((c) => c.trim().startsWith("whop_access_token="))
    ?.split("=")[1];

  if (!token) {
    return new Response(JSON.stringify({ error: "Not logged in" }), {
      status: 401,
    });
  }

  const user = await whopApi.users.getCurrentUser({ token });
  if (!user.ok) {
    return new Response(JSON.stringify({ error: "Invalid token" }), {
      status: 403,
    });
  }

  return new Response(JSON.stringify(user.data), {
    headers: { "Content-Type": "application/json" },
  });
}
