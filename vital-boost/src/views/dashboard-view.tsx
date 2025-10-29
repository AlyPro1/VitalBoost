// src/views/dashboard-view.tsx
import type { DashboardViewProps } from "@whop/react-native";
import { ScrollView, Text } from "react-native";
import React, { useEffect } from "react";

export function DashboardView(props: DashboardViewProps) {
  // ✅ Log all props when this screen loads
  useEffect(() => {
    console.log("🧩 DashboardView props:", props);
  }, [props]);

  return (
    <ScrollView style={{ padding: 24 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 12 }}>
        Vital Boost — Dashboard
      </Text>

      <Text>companyId: {props.companyId}</Text>
      <Text>currentUserId: {props.currentUserId}</Text>
      <Text>path: /{props.path.join("/")}</Text>

      <Text style={{ marginTop: 20, color: "#4CAF50" }}>
        ✅ Whop App Loaded
      </Text>
    </ScrollView>
  );
}
