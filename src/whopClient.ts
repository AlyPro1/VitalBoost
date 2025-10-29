// src/whopClient.ts
import { WhopSDK } from "@whop/api";

const whop = new WhopSDK({
  apiKey: import.meta.env.VITE_WHOP_API_KEY,
  appId: import.meta.env.VITE_WHOP_APP_ID,
});

export default whop;
