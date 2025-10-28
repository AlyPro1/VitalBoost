import type { DashboardViewProps } from "@whop/react-native";
import { ScrollView, Text, TouchableOpacity, Linking } from "react-native";

export function DashboardView(props: DashboardViewProps) {
  const handleWhopLogin = () => {
    // When running in production, this should open your deployed site’s /api/oauth/init route
    // Example for production:
    Linking.openURL("https://vitalboostapp.netlify.app/api/oauth/init?next=/");

    // If you ever test locally instead, you can temporarily use:
    // Linking.openURL("http://localhost:5174/api/oauth/init?next=/");
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      {/* --- Whop Login Button --- */}
      <TouchableOpacity
        onPress={handleWhopLogin}
        style={{
          backgroundColor: "#111",
          padding: 12,
          borderRadius: 8,
          marginBottom: 20,
        }}
      >
        <Text style={{ color: "#fff", textAlign: "center" }}>
          Login with Whop
        </Text>
      </TouchableOpacity>

      {/* --- Existing Dashboard Info --- */}
      <Text>Hello World! (DashboardView)</Text>
      <Text>companyId: {props.companyId}</Text>
      <Text>currentUserId: {props.currentUserId}</Text>
      <Text>path: /{props.path.join("/")}</Text>
    </ScrollView>
  );
}
