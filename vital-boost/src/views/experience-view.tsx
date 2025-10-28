// src/views/experience-view.tsx

import React from "react";
import type { ExperienceViewProps } from "@whop/react-native";
import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from "react-native";

export function ExperienceView(props: ExperienceViewProps) {
  const { companyId, experienceId, currentUserId, path } = props;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Vital Boost</Text>
      <Text style={styles.subtitle}>Experience View</Text>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Company ID:</Text>
        <Text style={styles.value}>{companyId}</Text>

        <Text style={styles.label}>Experience ID:</Text>
        <Text style={styles.value}>{experienceId}</Text>

        <Text style={styles.label}>Current User ID:</Text>
        <Text style={styles.value}>{currentUserId}</Text>

        <Text style={styles.label}>Path:</Text>
        <Text style={styles.value}>/{path.join("/")}</Text>
      </View>

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
