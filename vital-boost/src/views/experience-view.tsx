// src/views/experience-view.tsx

import React, { useEffect, useState } from "react";
import { ScrollView, Text, View, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import { getCurrentUser } from "@whop/sdk";

export function ExperienceView() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWhopUser() {
      try {
        const currentUser = await getCurrentUser();
        console.log("Whop currentUser:", currentUser);
        setUser(currentUser);
      } catch (err) {
        console.error("Error fetching Whop user:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchWhopUser();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={{ marginTop: 10 }}>Loading Whop session...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Vital Boost</Text>
      <Text style={styles.subtitle}>Experience View</Text>

      {/* ✅ Added Whop Auth Confirmation Line */}
      <Text style={styles.authStatus}>Whop Auth Active ✅</Text>

      {user ? (
        <View style={styles.infoBox}>
          <Text style={styles.label}>User Name:</Text>
          <Text style={styles.value}>{user.username || "Anonymous"}</Text>

          <Text style={styles.label}>User ID:</Text>
          <Text style={styles.value}>{user.id}</Text>

          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{user.email || "N/A"}</Text>
        </View>
      ) : (
        <Text style={styles.noUserText}>No Whop session found. Please open this app via Whop.</Text>
      )}

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Go to Vital Boost</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 40,
    paddingHorizontal: 24,
    backgroundColor: "#f7f8fa",
    alignItems: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  infoBox: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 2,
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginTop: 10,
  },
  value: {
    fontSize: 14,
    color: "#555",
  },
  noUserText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
