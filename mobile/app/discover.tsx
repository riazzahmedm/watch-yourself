import { useLocalSearchParams } from "expo-router";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

import { moodCollections } from "../features/mood/mood-data";

const recommendations = [
  {
    title: "Past Lives",
    reason: "Gentle emotional depth with warmth and reflection.",
  },
  {
    title: "Aftersun",
    reason: "Quiet, intimate, and emotionally resonant if you want something deep.",
  },
  {
    title: "Before Sunrise",
    reason: "Light, human, and restorative without feeling shallow.",
  },
];

export default function DiscoverScreen() {
  const params = useLocalSearchParams<{ mood?: string }>();
  const selectedMood =
    moodCollections.preWatch.find((mood) => mood.slug === params.mood) ??
    moodCollections.preWatch[0];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.emoji}>{selectedMood.emoji}</Text>
          <Text style={styles.title}>{selectedMood.label}</Text>
          <Text style={styles.subtitle}>{selectedMood.description}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Recommended for this mood</Text>
          {recommendations.map((item) => (
            <View key={item.title} style={styles.item}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemReason}>{item.reason}</Text>
            </View>
          ))}
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
    gap: 16,
  },
  hero: {
    backgroundColor: "#16212d",
    borderRadius: 24,
    padding: 20,
    gap: 10,
    borderWidth: 1,
    borderColor: "#223043",
  },
  emoji: {
    fontSize: 34,
  },
  title: {
    color: "#f8fafc",
    fontSize: 28,
    fontWeight: "800",
  },
  subtitle: {
    color: "#cbd5e1",
    fontSize: 16,
    lineHeight: 24,
  },
  card: {
    backgroundColor: "#16212d",
    borderRadius: 24,
    padding: 18,
    gap: 12,
    borderWidth: 1,
    borderColor: "#223043",
  },
  sectionTitle: {
    color: "#f8fafc",
    fontSize: 18,
    fontWeight: "700",
  },
  item: {
    padding: 14,
    borderRadius: 18,
    backgroundColor: "#0f1720",
    gap: 6,
  },
  itemTitle: {
    color: "#f8fafc",
    fontSize: 17,
    fontWeight: "700",
  },
  itemReason: {
    color: "#94a3b8",
    fontSize: 14,
    lineHeight: 20,
  },
});
