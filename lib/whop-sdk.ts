import { WhopServerSdk } from "@whop/api";

export const whopSdk = WhopServerSdk({
  appId: process.env.VITE_PUBLIC_WHOP_APP_ID ?? "fallback",
  appApiKey: process.env.WHOP_API_KEY ?? "fallback",
  onBehalfOfUserId: process.env.VITE_PUBLIC_WHOP_AGENT_USER_ID,
  companyId: process.env.VITE_PUBLIC_WHOP_COMPANY_ID,
});
