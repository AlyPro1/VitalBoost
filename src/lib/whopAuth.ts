// src/lib/whopAuth.ts
import { WhopServerSdk } from "@whop/api";

const whop = WhopServerSdk({
  appId: import.meta.env.VITE_WHOP_APP_ID,
  appApiKey: import.meta.env.VITE_WHOP_API_KEY,
});

export default whop;
