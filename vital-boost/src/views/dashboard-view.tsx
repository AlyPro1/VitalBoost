import type { DashboardViewProps } from "@whop/react-native";
import { ScrollView, Text, View, Button } from "react-native";
import { useEffect, useState } from "react";
import { getWhopUser } from "../lib/whop";

export function DashboardView(props: DashboardViewProps) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const whopUser = await getWhopUser();
      setUser(whopUser);
      setLoading(false);
    }
    fetchUser();
  }, []);

  if (loading) {
    return <Text>Loading user session...</Text>;
  }

  if (!user) {
    return (
      <ScrollView>
        <Text>No active Whop session found.</Text>
        <Text>Please login with Whop below:</Text>
        <a href="/api/oauth/init?next=/dashboard">Login with Whop</a>
      </ScrollView>
    );
  }

  return (
    <ScrollView>
      <Text>Hello {user.email || "Whop User"} 👋</Text>
      <Text>companyId: {props.companyId}</Text>
      <Text>currentUserId: {user.id}</Text>
      <Text>path: /{props.path.join("/")}</Text>
    </ScrollView>
  );
}
