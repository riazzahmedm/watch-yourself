import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { CinematicBackground } from "../components/ui/cinematic-background";
import { fetchMyProfile } from "../features/profile/api";
import { moodCollections } from "../features/mood/mood-data";
import { useSession } from "../hooks/use-session";
import { supabase } from "../lib/supabase";
import { theme } from "../lib/theme";

const quickStats = [
  { label: "Drama Affinity", value: "78%" },
  { label: "Twist Dependency", value: "High" },
  { label: "Comfort Rewatcher", value: "Yes" },
];

export default function HomeScreen() {
  const { isLoading, session } = useSession();
  const profileQuery = useQuery({
    queryKey: ["profile", session?.user.id],
    queryFn: () => fetchMyProfile(session!.user.id),
    enabled: Boolean(session?.user.id),
  });

  const displayName =
    profileQuery.data?.display_name || session?.user.email?.split("@")[0] || "there";

  return (
    <CinematicBackground variant="home">
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.heroCard}>
            <Text style={styles.eyebrow}>WatchYourself</Text>
            <Text style={styles.title}>A movie diary that glows with your emotional history.</Text>
            <Text style={styles.subtitle}>
              Start with mood, log with emotional context, and let your Taste DNA evolve over time.
            </Text>
          </View>

          {session ? (
            <View style={styles.card}>
              <View style={styles.rowHeader}>
                <Text style={styles.sectionTitle}>Your profile</Text>
                <Link href="/profile" style={styles.inlineLink}>
                  Edit
                </Link>
              </View>
              <Text style={styles.profileName}>{displayName}</Text>
              <Text style={styles.bodyText}>
                {profileQuery.data?.bio?.trim()
                  ? profileQuery.data.bio
                  : "Set up your profile so WatchYourself can feel more personal from the start."}
              </Text>
            </View>
          ) : null}

          <View style={styles.card}>
            <View style={styles.rowHeader}>
              <Text style={styles.sectionTitle}>How are you watching today?</Text>
              {session ? (
                <Pressable onPress={() => void supabase.auth.signOut()}>
                  <Text style={styles.inlineLink}>Sign out</Text>
                </Pressable>
              ) : (
                <Link href="/auth" style={styles.inlineLink}>
                  Sign in
                </Link>
              )}
            </View>
            {isLoading ? (
              <ActivityIndicator color={theme.colors.pink} />
            ) : (
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
            )}
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
              <Link href={session ? "/log" : "/auth"} style={styles.inlineLink}>
                {session ? "Log now" : "Sign in"}
              </Link>
            </View>
            <Text style={styles.bodyText}>
              Capture what you needed before the watch, what you actually felt after,
              and leave a private life note if it mattered.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </CinematicBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "transparent",
  },
  content: {
    padding: 20,
    gap: 18,
  },
  heroCard: {
    borderRadius: theme.radii.xl,
    padding: 24,
    gap: 12,
    backgroundColor: "#130f28cc",
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  eyebrow: {
    color: theme.colors.pink,
    fontSize: 13,
    fontFamily: theme.fonts.bodyBold,
    letterSpacing: 1.4,
    textTransform: "uppercase",
  },
  title: {
    color: theme.colors.text,
    fontSize: 34,
    lineHeight: 40,
    fontFamily: theme.fonts.display,
  },
  subtitle: {
    color: theme.colors.textSoft,
    fontSize: 16,
    lineHeight: 24,
    fontFamily: theme.fonts.body,
  },
  card: {
    backgroundColor: "#110f25cc",
    borderRadius: theme.radii.lg,
    padding: 18,
    gap: 14,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  sectionTitle: {
    color: theme.colors.text,
    fontSize: 20,
    fontFamily: theme.fonts.heading,
  },
  moodGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  moodChip: {
    width: "48%",
    backgroundColor: "#0b0a1bcc",
    borderRadius: theme.radii.md,
    paddingHorizontal: 14,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: theme.colors.borderSoft,
    gap: 6,
  },
  moodEmoji: {
    fontSize: 24,
  },
  moodLabel: {
    color: theme.colors.text,
    fontSize: 15,
    fontFamily: theme.fonts.bodyBold,
  },
  rowHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  inlineLink: {
    color: theme.colors.cyan,
    fontSize: 14,
    fontFamily: theme.fonts.bodyBold,
  },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.borderSoft,
  },
  statLabel: {
    color: theme.colors.textMuted,
    fontSize: 15,
    fontFamily: theme.fonts.body,
  },
  statValue: {
    color: theme.colors.text,
    fontSize: 15,
    fontFamily: theme.fonts.bodyBold,
  },
  bodyText: {
    color: theme.colors.textSoft,
    fontSize: 15,
    lineHeight: 24,
    fontFamily: theme.fonts.body,
  },
  profileName: {
    color: theme.colors.text,
    fontSize: 18,
    fontFamily: theme.fonts.heading,
  },
});
