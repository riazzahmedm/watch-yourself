import { Stack } from "expo-router";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

const traits = [
  {
    label: "Drama Affinity",
    value: "78%",
    explanation: "You consistently rate emotionally rich stories above your average.",
  },
  {
    label: "Slow Pace Tolerance",
    value: "Medium",
    explanation: "You can enjoy deliberate films when they feel rewarding.",
  },
  {
    label: "Comfort Rewatcher",
    value: "Yes",
    explanation: "You return to emotionally safe favorites when you need recovery.",
  },
];

export default function DnaScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ headerShown: true, title: "Taste DNA" }} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.title}>Your taste is more than genre.</Text>
          <Text style={styles.subtitle}>
            WatchYourself builds identity from emotional intent, outcomes, rewatches,
            and your long-term viewing behavior.
          </Text>
        </View>

        {traits.map((trait) => (
          <View key={trait.label} style={styles.card}>
            <View style={styles.header}>
              <Text style={styles.cardTitle}>{trait.label}</Text>
              <Text style={styles.value}>{trait.value}</Text>
            </View>
            <Text style={styles.copy}>{trait.explanation}</Text>
          </View>
        ))}
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
    gap: 10,
    paddingTop: 12,
  },
  title: {
    color: "#f8fafc",
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "800",
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
    gap: 10,
    borderWidth: 1,
    borderColor: "#223043",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  cardTitle: {
    color: "#f8fafc",
    fontSize: 18,
    fontWeight: "700",
  },
  value: {
    color: "#f59e0b",
    fontSize: 15,
    fontWeight: "700",
  },
  copy: {
    color: "#cbd5e1",
    fontSize: 15,
    lineHeight: 22,
  },
});
