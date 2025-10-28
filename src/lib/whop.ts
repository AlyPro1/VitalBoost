import { retrieveCurrentUser } from "@whop-sdk/core";

export async function getWhopUser() {
  try {
    const user = await retrieveCurrentUser();
    console.log("✅ Whop user retrieved:", user);
    return user;
  } catch (error) {
    console.error("❌ Failed to retrieve Whop user:", error);
    return null;
  }
}
