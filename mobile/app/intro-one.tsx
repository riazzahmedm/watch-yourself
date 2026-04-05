import { Link } from "expo-router";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

import { CinematicBackground } from "../components/ui/cinematic-background";
import { theme } from "../lib/theme";

export default function IntroOneScreen() {
  return (
    <CinematicBackground variant="introWarm">
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.frame}>
          <Text style={styles.kicker}>WatchYourself</Text>
          <Text style={styles.title}>Not just what you watched. Why you reached for it.</Text>
          <Text style={styles.copy}>
            Start from emotional intent instead of genre. The app learns what you needed,
            what you chose, and what actually stayed with you.
          </Text>

          <View style={styles.panel}>
            <Text style={styles.panelLabel}>Tonight’s intent</Text>
            <Text style={styles.panelValue}>Comfort watch</Text>
            <Text style={styles.panelSubtext}>
              Soft mood, familiar energy, low emotional resistance.
            </Text>
          </View>

          <Link href="/intro-two" asChild>
            <Pressable style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Continue</Text>
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
    color: theme.colors.pink,
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
  panel: {
    backgroundColor: "#120f25cc",
    borderRadius: 28,
    padding: 20,
    gap: 6,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  panelLabel: {
    color: theme.colors.cyan,
    fontSize: 12,
    fontFamily: theme.fonts.bodyBold,
    textTransform: "uppercase",
    letterSpacing: 1.3,
  },
  panelValue: {
    color: theme.colors.text,
    fontSize: 28,
    fontFamily: theme.fonts.heading,
  },
  panelSubtext: {
    color: theme.colors.textMuted,
    fontSize: 14,
    lineHeight: 22,
    fontFamily: theme.fonts.body,
  },
  primaryButton: {
    marginTop: 6,
    minHeight: 58,
    borderRadius: theme.radii.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.pink,
    shadowColor: theme.colors.pink,
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
