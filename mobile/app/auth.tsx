import { Redirect } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { CinematicBackground } from "../components/ui/cinematic-background";
import { useSession } from "../hooks/use-session";
import { supabase } from "../lib/supabase";
import { theme } from "../lib/theme";

export default function AuthScreen() {
  const { isLoading: isSessionLoading, session } = useSession();
  const [mode, setMode] = useState<"sign-in" | "sign-up">("sign-up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleAuth(nextMode: "sign-in" | "sign-up") {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Credentials needed", "Enter an email and password to continue.");
      return;
    }

    try {
      setIsSubmitting(true);

      const normalizedEmail = email.trim().toLowerCase();
      const normalizedPassword = password.trim();

      const { error } =
        nextMode === "sign-in"
          ? await supabase.auth.signInWithPassword({
              email: normalizedEmail,
              password: normalizedPassword,
            })
          : await supabase.auth.signUp({
              email: normalizedEmail,
              password: normalizedPassword,
              options: {
                data: {
                  username: username.trim().toLowerCase() || null,
                  display_name: displayName.trim() || normalizedEmail,
                },
              },
            });

      if (error) {
        throw error;
      }

      if (nextMode === "sign-up") {
        Alert.alert(
          "Account created",
          "Your account is ready. If email confirmation is enabled later, check your inbox.",
        );
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong.";
      Alert.alert("Sign in failed", message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSessionLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centered}>
          <ActivityIndicator color={theme.colors.pink} />
        </View>
      </SafeAreaView>
    );
  }

  if (session) {
    return <Redirect href="/home" />;
  }

  return (
    <CinematicBackground variant="auth">
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.select({ ios: "padding", android: undefined })}
          style={styles.flex}
        >
          <ScrollView
            style={styles.flex}
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.heroCard}>
              <Text style={styles.eyebrow}>WatchYourself</Text>
              <Text style={styles.title}>Enter a movie world that remembers how you felt.</Text>
              <Text style={styles.subtitle}>
                Every sign-in opens the same living archive: mood trails, emotional logs,
                Taste DNA, and the story of how your viewing life changes over time.
              </Text>

              <View style={styles.tagRow}>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>Neon mood diary</Text>
                </View>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>Private by default</Text>
                </View>
              </View>
            </View>

            <View style={styles.formCard}>
              <View style={styles.modeSwitch}>
                <Pressable
                  onPress={() => setMode("sign-up")}
                  style={[styles.modeButton, mode === "sign-up" && styles.modeButtonActive]}
                >
                  <Text
                    style={[styles.modeButtonText, mode === "sign-up" && styles.modeButtonTextActive]}
                  >
                    Create account
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => setMode("sign-in")}
                  style={[styles.modeButton, mode === "sign-in" && styles.modeButtonActive]}
                >
                  <Text
                    style={[styles.modeButtonText, mode === "sign-in" && styles.modeButtonTextActive]}
                  >
                    Sign in
                  </Text>
                </Pressable>
              </View>

              <Text style={styles.formHeading}>
                {mode === "sign-up" ? "Start your emotional archive" : "Welcome back to your archive"}
              </Text>
              <Text style={styles.formCopy}>
                {mode === "sign-up"
                  ? "Create your identity, then let each watch deepen the profile around your taste."
                  : "Sign in and continue the story you have already started building."}
              </Text>

              {mode === "sign-up" ? (
                <>
                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Display name</Text>
                    <TextInput
                      placeholder="How should the app address you?"
                      placeholderTextColor="#6b7280"
                      style={styles.input}
                      value={displayName}
                      onChangeText={setDisplayName}
                    />
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Username</Text>
                    <TextInput
                      autoCapitalize="none"
                      placeholder="your-handle"
                      placeholderTextColor="#6b7280"
                      style={styles.input}
                      value={username}
                      onChangeText={setUsername}
                    />
                  </View>
                </>
              ) : null}

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  autoCapitalize="none"
                  autoComplete="email"
                  keyboardType="email-address"
                  placeholder="you@example.com"
                  placeholderTextColor="#6b7280"
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                  autoCapitalize="none"
                  secureTextEntry
                  placeholder={mode === "sign-up" ? "Create a password" : "Enter your password"}
                  placeholderTextColor="#6b7280"
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                />
              </View>

              <Pressable
                onPress={() => void handleAuth(mode)}
                disabled={isSubmitting}
                style={[styles.primaryButton, isSubmitting && styles.buttonDisabled]}
              >
                {isSubmitting ? (
                  <ActivityIndicator color={theme.colors.text} />
                ) : (
                  <Text style={styles.primaryButtonText}>
                    {mode === "sign-up" ? "Create account" : "Sign in"}
                  </Text>
                )}
              </Pressable>

              <Text style={styles.footnote}>
                {mode === "sign-up"
                  ? "Your profile begins private and becomes richer as you log more."
                  : "Use the same credentials you created during setup."}
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </CinematicBackground>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "transparent",
  },
  content: {
    padding: 20,
    gap: 18,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heroCard: {
    borderRadius: theme.radii.xl,
    padding: 24,
    gap: 12,
    backgroundColor: "#120f25cc",
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  eyebrow: {
    color: theme.colors.pink,
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
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    paddingTop: 4,
  },
  tag: {
    backgroundColor: "#0b0a1bcc",
    borderWidth: 1,
    borderColor: theme.colors.borderSoft,
    borderRadius: theme.radii.pill,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  tagText: {
    color: theme.colors.cyan,
    fontSize: 12,
    fontFamily: theme.fonts.bodyBold,
  },
  formCard: {
    backgroundColor: theme.colors.paper,
    borderRadius: theme.radii.xl,
    padding: 20,
    gap: 16,
  },
  modeSwitch: {
    flexDirection: "row",
    backgroundColor: "#e5edf4",
    borderRadius: 16,
    padding: 4,
  },
  modeButton: {
    flex: 1,
    minHeight: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  modeButtonActive: {
    backgroundColor: theme.colors.surface,
  },
  modeButtonText: {
    color: "#475569",
    fontSize: 14,
    fontFamily: theme.fonts.bodyBold,
  },
  modeButtonTextActive: {
    color: theme.colors.text,
  },
  formHeading: {
    color: theme.colors.ink,
    fontSize: 28,
    lineHeight: 32,
    fontFamily: theme.fonts.display,
  },
  formCopy: {
    color: "#475569",
    fontSize: 15,
    lineHeight: 22,
    fontFamily: theme.fonts.body,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    color: theme.colors.ink,
    fontSize: 14,
    fontFamily: theme.fonts.bodyBold,
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
  primaryButton: {
    marginTop: 4,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.md,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 56,
    paddingHorizontal: 16,
    shadowColor: theme.colors.cyan,
    shadowOpacity: 0.25,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 0 },
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  primaryButtonText: {
    color: theme.colors.text,
    fontSize: 16,
    fontFamily: theme.fonts.bodyBold,
  },
  footnote: {
    color: "#64748b",
    fontSize: 13,
    lineHeight: 20,
    fontFamily: theme.fonts.body,
  },
});
