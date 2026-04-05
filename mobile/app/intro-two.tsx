import { Link } from "expo-router";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

import { CinematicBackground } from "../components/ui/cinematic-background";
import { theme } from "../lib/theme";

export default function IntroTwoScreen() {
  return (
    <CinematicBackground variant="introCool">
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.frame}>
          <Text style={styles.kicker}>Taste DNA</Text>
          <Text style={styles.title}>Your movie identity should feel alive, not statistical.</Text>
          <Text style={styles.copy}>
            WatchYourself turns moods, rewatches, and emotional outcomes into a living profile,
            reflection timeline, and eventually a Movie Twin.
          </Text>

          <View style={styles.metricsRow}>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Drama Affinity</Text>
              <Text style={styles.metricValue}>78%</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Twist Dependency</Text>
              <Text style={styles.metricValue}>High</Text>
            </View>
          </View>

          <Link href="/auth" asChild>
            <Pressable style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Enter the app</Text>
            </Pressable>
          </Link>
        </View>
      </SafeAreaView>
    </CinematicBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "transparent",
  },
  frame: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    gap: 18,
  },
  kicker: {
    color: theme.colors.cyan,
    fontSize: 13,
    fontFamily: theme.fonts.bodyBold,
    textTransform: "uppercase",
    letterSpacing: 1.6,
  },
  title: {
    color: theme.colors.text,
    fontSize: 40,
    lineHeight: 46,
    fontFamily: theme.fonts.display,
  },
  copy: {
    color: theme.colors.textSoft,
    fontSize: 16,
    lineHeight: 26,
    fontFamily: theme.fonts.body,
  },
  metricsRow: {
    flexDirection: "row",
    gap: 12,
  },
  metricCard: {
    flex: 1,
    backgroundColor: "#120f25cc",
    borderRadius: 24,
    padding: 18,
    gap: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  metricLabel: {
    color: theme.colors.textMuted,
    fontSize: 13,
    fontFamily: theme.fonts.bodyMedium,
  },
  metricValue: {
    color: theme.colors.text,
    fontSize: 26,
    fontFamily: theme.fonts.heading,
  },
  primaryButton: {
    marginTop: 6,
    minHeight: 58,
    borderRadius: theme.radii.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.cyan,
    shadowColor: theme.colors.cyan,
    shadowOpacity: 0.45,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 0 },
  },
  primaryButtonText: {
    color: theme.colors.ink,
    fontSize: 16,
    fontFamily: theme.fonts.bodyBold,
  },
});
