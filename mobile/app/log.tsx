import { useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
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

import { fetchTitles } from "../features/catalog/api";
import { createWatchLog } from "../features/logging/api";
import { fetchMoodTags } from "../features/mood/api";
import { moodCollections, type MoodOption } from "../features/mood/mood-data";
import { useSession } from "../hooks/use-session";

function hasMoodId(mood: MoodOption): mood is MoodOption & { id: string } {
  return typeof mood.id === "string" && mood.id.length > 0;
}

function MoodSelector({
  title,
  options,
  selected,
  onSelect,
}: {
  title: string;
  options: MoodOption[];
  selected: string | null;
  onSelect: (slug: string) => void;
}) {
  return (
    <View style={styles.fieldBlock}>
      <Text style={styles.label}>{title}</Text>
      <View style={styles.optionGrid}>
        {options.map((mood) => {
          const isSelected = selected === mood.slug;

          return (
            <Pressable
              key={mood.slug}
              onPress={() => onSelect(mood.slug)}
              style={[styles.optionChip, isSelected && styles.optionChipSelected]}
            >
              <Text style={styles.optionEmoji}>{mood.emoji}</Text>
              <Text style={styles.optionText}>{mood.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export default function LogScreen() {
  const { isLoading: isSessionLoading, session } = useSession();
  const [selectedTitleId, setSelectedTitleId] = useState<string | null>(null);
  const [preWatchMood, setPreWatchMood] = useState<string | null>(null);
  const [postWatchMood, setPostWatchMood] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState<string>("8");

  const { data: titles = [], isLoading: isTitlesLoading } = useQuery({
    queryKey: ["titles"],
    queryFn: fetchTitles,
  });

  const { data: preWatchMoods = moodCollections.preWatch } = useQuery({
    queryKey: ["mood-tags", "pre_watch"],
    queryFn: () => fetchMoodTags("pre_watch"),
  });

  const { data: postWatchMoods = moodCollections.postWatch } = useQuery({
    queryKey: ["mood-tags", "post_watch"],
    queryFn: () => fetchMoodTags("post_watch"),
  });

  const createLogMutation = useMutation({
    mutationFn: createWatchLog,
    onSuccess: () => {
      setSelectedTitleId(null);
      setPreWatchMood(null);
      setPostWatchMood(null);
      setNote("");
      setReviewText("");
      setRating("8");
      Alert.alert("Log saved", "Your emotional log has been added to WatchYourself.");
    },
    onError: (error) => {
      const message =
        error instanceof Error ? error.message : "Could not save your log.";

      Alert.alert("Save failed", message);
    },
  });

  const summary = useMemo(() => {
    const pre = preWatchMoods.find((item) => item.slug === preWatchMood);
    const post = postWatchMoods.find((item) => item.slug === postWatchMood);

    if (!pre || !post) {
      return "Choose what you needed and how the watch left you feeling.";
    }

    return `You looked for ${pre.label.toLowerCase()} and left feeling ${post.label.toLowerCase()}. That gap becomes part of your Taste DNA.`;
  }, [postWatchMood, preWatchMood]);

  async function handleSave() {
    if (!session?.user) {
      Alert.alert("Sign in needed", "Please sign in before creating a log.");
      return;
    }

    if (!selectedTitleId || !preWatchMood || !postWatchMood) {
      Alert.alert(
        "Missing details",
        "Choose a title plus one pre-watch and post-watch mood.",
      );
      return;
    }

    const preMood = preWatchMoods.find((item) => item.slug === preWatchMood);
    const postMood = postWatchMoods.find((item) => item.slug === postWatchMood);

    if (!preMood || !postMood || !hasMoodId(preMood) || !hasMoodId(postMood)) {
      Alert.alert("Mood data unavailable", "Refresh and try again.");
      return;
    }

    await createLogMutation.mutateAsync({
      userId: session.user.id,
      titleId: selectedTitleId,
      watchedOn: new Date().toISOString().slice(0, 10),
      rating: Number.isNaN(Number(rating)) ? null : Number(rating),
      reviewText: reviewText.trim() ? reviewText.trim() : null,
      preWatchMoodId: preMood.id,
      postWatchMoodId: postMood.id,
      lifeNote: note.trim() ? note.trim() : null,
    });
  }

  if (isSessionLoading) {
    return (
      <SafeAreaView style={styles.centeredSafeArea}>
        <ActivityIndicator color="#f59e0b" />
      </SafeAreaView>
    );
  }

  if (!session) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.authGate}>
          <Text style={styles.title}>Sign in to save your emotional watch history.</Text>
          <Text style={styles.subtitle}>
            Logging is personal, so we keep it tied to your account from the start.
          </Text>
          <Link href="/auth" style={styles.authLink}>
            Go to sign in
          </Link>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.title}>Log the watch, not just the title.</Text>
          <Text style={styles.subtitle}>
            Mood context is what makes WatchYourself feel personal over time.
          </Text>
        </View>

        <View style={styles.fieldBlock}>
          <Text style={styles.label}>Choose a title</Text>
          {isTitlesLoading ? (
            <ActivityIndicator color="#f59e0b" />
          ) : (
            <View style={styles.optionGrid}>
              {titles.map((item) => {
                const isSelected = selectedTitleId === item.id;

                return (
                  <Pressable
                    key={item.id}
                    onPress={() => setSelectedTitleId(item.id)}
                    style={[styles.optionChip, isSelected && styles.optionChipSelected]}
                  >
                    <Text style={styles.optionText}>{item.name}</Text>
                    <Text style={styles.optionMeta}>
                      {item.tmdb_type === "tv" ? "Series" : "Movie"}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          )}
        </View>

        <MoodSelector
          title="What did you need?"
          options={preWatchMoods}
          selected={preWatchMood}
          onSelect={setPreWatchMood}
        />

        <MoodSelector
          title="How did it leave you feeling?"
          options={postWatchMoods}
          selected={postWatchMood}
          onSelect={setPostWatchMood}
        />

        <View style={styles.fieldBlock}>
          <Text style={styles.label}>Rating out of 10</Text>
          <TextInput
            keyboardType="number-pad"
            placeholder="8"
            placeholderTextColor="#64748b"
            style={styles.input}
            value={rating}
            onChangeText={setRating}
          />
        </View>

        <View style={styles.fieldBlock}>
          <Text style={styles.label}>Quick reflection</Text>
          <TextInput
            multiline
            placeholder="Optional. What stood out in this watch?"
            placeholderTextColor="#64748b"
            style={[styles.input, styles.noteInput]}
            value={reviewText}
            onChangeText={setReviewText}
          />
        </View>

        <View style={styles.fieldBlock}>
          <Text style={styles.label}>Private life note</Text>
          <TextInput
            multiline
            placeholder="Optional. What was happening in your life during this phase?"
            placeholderTextColor="#64748b"
            style={[styles.input, styles.noteInput]}
            value={note}
            onChangeText={setNote}
          />
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Emotional summary</Text>
          <Text style={styles.summaryText}>{summary}</Text>
        </View>

        <Pressable
          disabled={createLogMutation.isPending}
          onPress={() => void handleSave()}
          style={[styles.saveButton, createLogMutation.isPending && styles.saveButtonDisabled]}
        >
          {createLogMutation.isPending ? (
            <ActivityIndicator color="#111827" />
          ) : (
            <Text style={styles.saveButtonText}>Save log to Supabase</Text>
          )}
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0f1720",
  },
  centeredSafeArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0f1720",
  },
  content: {
    padding: 20,
    gap: 18,
  },
  authGate: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
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
  fieldBlock: {
    gap: 10,
  },
  label: {
    color: "#f8fafc",
    fontSize: 16,
    fontWeight: "700",
  },
  input: {
    backgroundColor: "#16212d",
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: "#f8fafc",
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#223043",
  },
  noteInput: {
    minHeight: 120,
    textAlignVertical: "top",
  },
  optionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  optionChip: {
    width: "48%",
    backgroundColor: "#16212d",
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "#223043",
    gap: 6,
  },
  optionChipSelected: {
    borderColor: "#f59e0b",
    backgroundColor: "#2d1f0a",
  },
  optionEmoji: {
    fontSize: 22,
  },
  optionText: {
    color: "#e2e8f0",
    fontSize: 14,
    fontWeight: "600",
  },
  optionMeta: {
    color: "#94a3b8",
    fontSize: 12,
  },
  summaryCard: {
    backgroundColor: "#f59e0b",
    borderRadius: 24,
    padding: 18,
    gap: 8,
  },
  summaryTitle: {
    color: "#111827",
    fontSize: 17,
    fontWeight: "800",
  },
  summaryText: {
    color: "#111827",
    fontSize: 15,
    lineHeight: 22,
  },
  saveButton: {
    backgroundColor: "#f59e0b",
    borderRadius: 18,
    minHeight: 52,
    justifyContent: "center",
    alignItems: "center",
  },
  saveButtonDisabled: {
    opacity: 0.7,
  },
  saveButtonText: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "800",
  },
  authLink: {
    color: "#f59e0b",
    fontSize: 16,
    fontWeight: "700",
  },
});
