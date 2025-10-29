// src/views/experience-view.tsx
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import { retrieveCurrentUser } from "@whop/api";

export function ExperienceView() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const session = await retrieveCurrentUser();
        setUser(session);
      } catch (error) {
        console.error("Whop auth error:", error);
      }
    }
    fetchUser();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Vital Boost</Text>
      <Text style={styles.subtitle}>Whop Authentication</Text>

      {user ? (
        <>
          <Text style={styles.info}>✅ Logged in as: {user.user?.username}</Text>
          <Text style={styles.info}>User ID: {user.user?.id}</Text>
        </>
      ) : (
        <Text style={styles.info}>❌ Not authenticated</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 30, alignItems: "center" },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 10 },
  subtitle: { fontSize: 18, color: "#666", marginBottom: 20 },
  info: { fontSize: 16, color: "#333", marginBottom: 8 },
});
