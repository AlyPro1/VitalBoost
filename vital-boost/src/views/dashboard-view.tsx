// src/views/dashboard-view.tsx

import React, { useEffect, useState } from "react";
import type { DashboardViewProps } from "@whop/react-native";
import { ScrollView, Text, TouchableOpacity, Linking } from "react-native";

export function DashboardView(props: DashboardViewProps) {
  const [user, setUser] = useState<any>(null);

  // Fetch user session from Whop API
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/current-user");
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    }
    fetchUser();
  }, []);

  // If user not logged in → show Login with Whop button
  if (!user) {
    return (
      <ScrollView>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 12 }}>
          Welcome to Vital Boost Dashboard
        </Text>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL("/api/oauth/init?next=/dashboard")
          }
          style={{
            backgroundColor: "#4CAF50",
            padding: 12,
            borderRadius: 8,
            alignSelf: "flex-start",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>
            Login with Whop
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  // If user is logged in → show Whop info
  return (
    <ScrollView>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 16 }}>
        Hello, {user.name || "Whop User"} 👋
      </Text>
      <Text>User ID: {user.id}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Company ID: {props.companyId}</Text>
      <Text>Current Path: /{props.path.join("/")}</Text>
    </ScrollView>
  );
}
