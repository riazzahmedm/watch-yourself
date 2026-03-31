import { useMemo, useState } from "react";
import { Stack } from "expo-router";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { moodCollections, type MoodOption } from "../features/mood/mood-data";

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
  const [title, setTitle] = useState("");
  const [preWatchMood, setPreWatchMood] = useState<string | null>(null);
  const [postWatchMood, setPostWatchMood] = useState<string | null>(null);
  const [note, setNote] = useState("");

  const summary = useMemo(() => {
    const pre = moodCollections.preWatch.find((item) => item.slug === preWatchMood);
    const post = moodCollections.postWatch.find((item) => item.slug === postWatchMood);

    if (!pre || !post) {
      return "Choose what you needed and how the watch left you feeling.";
    }

    return `You looked for ${pre.label.toLowerCase()} and left feeling ${post.label.toLowerCase()}. That gap becomes part of your Taste DNA.`;
  }, [postWatchMood, preWatchMood]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ headerShown: true, title: "Emotional Log" }} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.title}>Log the watch, not just the title.</Text>
          <Text style={styles.subtitle}>
            Mood context is what makes WatchYourself feel personal over time.
          </Text>
        </View>

        <View style={styles.fieldBlock}>
          <Text style={styles.label}>What did you watch?</Text>
          <TextInput
            placeholder="Search title later, start with anything for now"
            placeholderTextColor="#64748b"
            style={styles.input}
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <MoodSelector
          title="What did you need?"
          options={moodCollections.preWatch}
          selected={preWatchMood}
          onSelect={setPreWatchMood}
        />

        <MoodSelector
          title="How did it leave you feeling?"
          options={moodCollections.postWatch}
          selected={postWatchMood}
          onSelect={setPostWatchMood}
        />

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
});
