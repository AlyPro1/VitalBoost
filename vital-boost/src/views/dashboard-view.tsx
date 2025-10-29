import { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";
import whop from "../whopClient";

export function DashboardView() {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await whop.retrieveCurrentUser();
        setUser(response);
      } catch (err: any) {
        console.error("Whop auth error:", err);
        setError("User not authenticated");
      }
    }

    fetchUser();
  }, []);

  return (
    <ScrollView>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
        Vital Boost Dashboard
      </Text>

      {error && <Text style={{ color: "red" }}>{error}</Text>}

      {user ? (
        <>
          <Text>✅ Whop Auth Active</Text>
          <Text>User ID: {user.id}</Text>
          <Text>Email: {user.email}</Text>
        </>
      ) : (
        <Text>Loading user info...</Text>
      )}
    </ScrollView>
  );
}
