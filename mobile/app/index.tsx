import { Link } from "expo-router";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { moodCollections } from "../features/mood/mood-data";

const quickStats = [
  { label: "Drama Affinity", value: "78%" },
  { label: "Twist Dependency", value: "High" },
  { label: "Comfort Rewatcher", value: "Yes" },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>WatchYourself</Text>
          <Text style={styles.title}>A movie diary that understands how you feel.</Text>
          <Text style={styles.subtitle}>
            Start with mood, log with emotional context, and let your Taste DNA
            evolve over time.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>How are you watching today?</Text>
          <View style={styles.moodGrid}>
            {moodCollections.preWatch.map((mood) => (
              <Link
                key={mood.slug}
                href={{ pathname: "/discover", params: { mood: mood.slug } }}
                asChild
              >
                <Pressable style={styles.moodChip}>
                  <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                  <Text style={styles.moodLabel}>{mood.label}</Text>
                </Pressable>
              </Link>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.rowHeader}>
            <Text style={styles.sectionTitle}>Your Taste DNA</Text>
            <Link href="/dna" style={styles.inlineLink}>
              Explore
            </Link>
          </View>
          {quickStats.map((item) => (
            <View key={item.label} style={styles.statRow}>
              <Text style={styles.statLabel}>{item.label}</Text>
              <Text style={styles.statValue}>{item.value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <View style={styles.rowHeader}>
            <Text style={styles.sectionTitle}>Start your first emotional log</Text>
            <Link href="/log" style={styles.inlineLink}>
              Log now
            </Link>
          </View>
          <Text style={styles.bodyText}>
            Capture what you needed before the watch, what you actually felt
            after, and leave a private life note if it mattered.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0f1720",
  },
  content: {
    padding: 20,
    gap: 18,
  },
  hero: {
    paddingTop: 20,
    gap: 12,
  },
  eyebrow: {
    color: "#f59e0b",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1.1,
    textTransform: "uppercase",
  },
  title: {
    color: "#f8fafc",
    fontSize: 34,
    fontWeight: "800",
    lineHeight: 40,
  },
  subtitle: {
    color: "#94a3b8",
    fontSize: 16,
    lineHeight: 24,
  },
  card: {
    backgroundColor: "#16212d",
    borderRadius: 24,
    padding: 18,
    gap: 14,
    borderWidth: 1,
    borderColor: "#223043",
  },
  sectionTitle: {
    color: "#f8fafc",
    fontSize: 20,
    fontWeight: "700",
  },
  moodGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  moodChip: {
    width: "48%",
    backgroundColor: "#0f1720",
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: "#2c405a",
    gap: 6,
  },
  moodEmoji: {
    fontSize: 24,
  },
  moodLabel: {
    color: "#e2e8f0",
    fontSize: 15,
    fontWeight: "600",
  },
  rowHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  inlineLink: {
    color: "#f59e0b",
    fontSize: 14,
    fontWeight: "700",
  },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#2c405a",
  },
  statLabel: {
    color: "#cbd5e1",
    fontSize: 15,
  },
  statValue: {
    color: "#f8fafc",
    fontSize: 15,
    fontWeight: "700",
  },
  bodyText: {
    color: "#cbd5e1",
    fontSize: 15,
    lineHeight: 24,
  },
});
