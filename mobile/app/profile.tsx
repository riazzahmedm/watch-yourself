import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "expo-router";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { CinematicBackground } from "../components/ui/cinematic-background";
import { fetchMyProfile, updateMyProfile } from "../features/profile/api";
import { useSession } from "../hooks/use-session";
import { supabase } from "../lib/supabase";
import { theme } from "../lib/theme";

export default function ProfileScreen() {
  const queryClient = useQueryClient();
  const { isLoading: isSessionLoading, session } = useSession();
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  const profileQuery = useQuery({
    queryKey: ["profile", session?.user.id],
    queryFn: () => fetchMyProfile(session!.user.id),
    enabled: Boolean(session?.user.id),
  });

  useEffect(() => {
    if (!profileQuery.data) {
      return;
    }

    setDisplayName(profileQuery.data.display_name ?? "");
    setUsername(profileQuery.data.username ?? "");
    setBio(profileQuery.data.bio ?? "");
  }, [profileQuery.data]);

  const updateMutation = useMutation({
    mutationFn: () =>
      updateMyProfile(session!.user.id, {
        display_name: displayName.trim() || null,
        username: username.trim().toLowerCase() || null,
        bio: bio.trim() || null,
      }),
    onSuccess: (profile) => {
      queryClient.setQueryData(["profile", session?.user.id], profile);
      Alert.alert("Profile updated", "Your profile changes are saved.");
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : "Could not update profile.";
      Alert.alert("Update failed", message);
    },
  });

  if (isSessionLoading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator color={theme.colors.pink} />
      </SafeAreaView>
    );
  }

  if (!session) {
    return (
      <CinematicBackground variant="profile">
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.authGate}>
            <Text style={styles.title}>Sign in to manage your profile.</Text>
            <Text style={styles.subtitle}>
              Your profile is the emotional front page for your watch history and evolving taste.
            </Text>
            <Link href="/auth" style={styles.inlineLink}>
              Go to sign in
            </Link>
          </View>
        </SafeAreaView>
      </CinematicBackground>
    );
  }

  return (
    <CinematicBackground variant="profile">
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.heroCard}>
            <Text style={styles.eyebrow}>Identity Layer</Text>
            <Text style={styles.title}>Shape how WatchYourself reads your movie life.</Text>
            <Text style={styles.subtitle}>
              This is the profile that frames your emotional archive, Taste DNA, and future twins.
            </Text>

            <View style={styles.heroMetaRow}>
              <View style={styles.heroMetric}>
                <Text style={styles.heroMetricLabel}>Email</Text>
                <Text style={styles.heroMetricValue}>{session.user.email ?? "Unknown email"}</Text>
              </View>
              <View style={styles.heroMetric}>
                <Text style={styles.heroMetricLabel}>Account</Text>
                <Text style={styles.heroMetricValue}>Private</Text>
              </View>
            </View>
          </View>

          {profileQuery.isLoading ? (
            <ActivityIndicator color={theme.colors.pink} />
          ) : (
            <>
              <View style={styles.formCard}>
                <View style={styles.formHeader}>
                  <Text style={styles.formHeading}>Public profile</Text>
                  <Text style={styles.formCopy}>
                    Keep this sharp and expressive. It is the social face of your taste.
                  </Text>
                </View>

                <View style={styles.fieldBlock}>
                  <Text style={styles.label}>Display name</Text>
                  <TextInput
                    placeholder="How should the app address you?"
                    placeholderTextColor="#6b7280"
                    style={styles.input}
                    value={displayName}
                    onChangeText={setDisplayName}
                  />
                </View>

                <View style={styles.fieldBlock}>
                  <Text style={styles.label}>Username</Text>
                  <TextInput
                    autoCapitalize="none"
                    placeholder="your-handle"
                    placeholderTextColor="#6b7280"
                    style={styles.input}
                    value={username}
                    onChangeText={setUsername}
                  />
                </View>

                <View style={styles.fieldBlock}>
                  <Text style={styles.label}>Bio</Text>
                  <TextInput
                    multiline
                    placeholder="What do you usually want from a watch?"
                    placeholderTextColor="#6b7280"
                    style={[styles.input, styles.bioInput]}
                    value={bio}
                    onChangeText={setBio}
                  />
                </View>

                <Pressable
                  onPress={() => void updateMutation.mutateAsync()}
                  disabled={updateMutation.isPending}
                  style={[styles.primaryButton, updateMutation.isPending && styles.buttonDisabled]}
                >
                  {updateMutation.isPending ? (
                    <ActivityIndicator color={theme.colors.text} />
                  ) : (
                    <Text style={styles.primaryButtonText}>Save profile</Text>
                  )}
                </Pressable>
              </View>

              <View style={styles.insightCard}>
                <Text style={styles.insightEyebrow}>Why this matters</Text>
                <Text style={styles.insightTitle}>Your profile becomes the frame around your taste.</Text>
                <Text style={styles.insightCopy}>
                  A clear identity makes onboarding stronger, improves the way Taste DNA reads,
                  and gives Movie Twin a real social surface.
                </Text>
              </View>
            </>
          )}

          <View style={styles.accountCard}>
            <View style={styles.accountHeader}>
              <Text style={styles.accountTitle}>Account actions</Text>
              <Link href="/home" style={styles.inlineLink}>
                Back home
              </Link>
            </View>
            <Pressable style={styles.secondaryButton} onPress={() => void supabase.auth.signOut()}>
              <Text style={styles.secondaryButtonText}>Sign out</Text>
            </Pressable>
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
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.bg,
  },
  content: {
    padding: 20,
    gap: 18,
  },
  heroCard: {
    borderRadius: theme.radii.xl,
    padding: 24,
    gap: 10,
    backgroundColor: "#120f25cc",
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  eyebrow: {
    color: theme.colors.cyan,
    fontSize: 12,
    fontFamily: theme.fonts.bodyBold,
    textTransform: "uppercase",
    letterSpacing: 1.4,
  },
  title: {
    color: theme.colors.text,
    fontSize: 34,
    lineHeight: 40,
    fontFamily: theme.fonts.display,
  },
  subtitle: {
    color: theme.colors.textSoft,
    fontSize: 15,
    lineHeight: 24,
    fontFamily: theme.fonts.body,
  },
  heroMetaRow: {
    flexDirection: "row",
    gap: 12,
    paddingTop: 8,
  },
  heroMetric: {
    flex: 1,
    padding: 14,
    borderRadius: theme.radii.md,
    backgroundColor: "#0b0a1bcc",
    borderWidth: 1,
    borderColor: theme.colors.borderSoft,
    gap: 4,
  },
  heroMetricLabel: {
    color: theme.colors.textMuted,
    fontSize: 12,
    fontFamily: theme.fonts.bodyBold,
    textTransform: "uppercase",
    letterSpacing: 1.1,
  },
  heroMetricValue: {
    color: theme.colors.text,
    fontSize: 14,
    fontFamily: theme.fonts.bodyBold,
  },
  formCard: {
    backgroundColor: theme.colors.paper,
    borderRadius: theme.radii.xl,
    padding: 20,
    gap: 16,
  },
  formHeader: {
    gap: 6,
  },
  fieldBlock: {
    gap: 10,
  },
  label: {
    color: theme.colors.ink,
    fontSize: 14,
    fontFamily: theme.fonts.bodyBold,
  },
  formHeading: {
    color: theme.colors.ink,
    fontSize: 26,
    lineHeight: 30,
    fontFamily: theme.fonts.display,
  },
  formCopy: {
    color: "#64748b",
    fontSize: 14,
    lineHeight: 21,
    fontFamily: theme.fonts.body,
  },
  input: {
    backgroundColor: theme.colors.paperSoft,
    borderRadius: theme.radii.md,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: theme.colors.ink,
    fontSize: 15,
    borderWidth: 1,
    borderColor: theme.colors.paperBorder,
    fontFamily: theme.fonts.body,
  },
  bioInput: {
    minHeight: 120,
    textAlignVertical: "top",
  },
  primaryButton: {
    marginTop: 4,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.md,
    minHeight: 52,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  primaryButtonText: {
    color: theme.colors.text,
    fontSize: 16,
    fontFamily: theme.fonts.bodyBold,
  },
  insightCard: {
    borderRadius: theme.radii.xl,
    padding: 20,
    gap: 8,
    backgroundColor: theme.colors.pink,
  },
  insightEyebrow: {
    color: theme.colors.ink,
    fontSize: 12,
    fontFamily: theme.fonts.bodyBold,
    textTransform: "uppercase",
    letterSpacing: 1.1,
  },
  insightTitle: {
    color: theme.colors.ink,
    fontSize: 24,
    lineHeight: 28,
    fontFamily: theme.fonts.heading,
  },
  insightCopy: {
    color: theme.colors.ink,
    fontSize: 14,
    lineHeight: 22,
    fontFamily: theme.fonts.body,
  },
  accountCard: {
    borderRadius: 26,
    padding: 18,
    gap: 14,
    backgroundColor: "#110f25cc",
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  accountHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  accountTitle: {
    color: theme.colors.text,
    fontSize: 18,
    fontFamily: theme.fonts.heading,
  },
  secondaryButton: {
    minHeight: 50,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.bgSoft,
    borderWidth: 1,
    borderColor: theme.colors.borderSoft,
  },
  secondaryButtonText: {
    color: theme.colors.text,
    fontSize: 15,
    fontFamily: theme.fonts.bodyBold,
  },
  authGate: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    gap: 16,
  },
  inlineLink: {
    color: theme.colors.cyan,
    fontSize: 14,
    fontFamily: theme.fonts.bodyBold,
  },
});
