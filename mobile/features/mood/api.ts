import { supabase } from "../../lib/supabase";
import type { Database } from "../../types/database";
import type { MoodOption } from "./mood-data";

type MoodRow = Database["public"]["Tables"]["mood_tags"]["Row"];

const moodEmojiBySlug: Record<string, string> = {
  "feeling-low": "😔",
  "need-intensity": "😤",
  "comfort-watch": "😌",
  "want-to-escape": "🏃",
  "want-something-deep": "🌌",
  "want-to-feel-inspired": "✨",
  "want-to-laugh": "😂",
  "want-to-be-surprised": "🎲",
  comforted: "🤍",
  energized: "⚡",
  moved: "🥹",
  disturbed: "🫨",
  drained: "🫠",
  "mind-blown": "🤯",
  reflective: "🌙",
  inspired: "🌤️",
  "let-down": "😕",
  warm: "🧡",
};

function toMoodOption(row: MoodRow): MoodOption {
  return {
    id: row.id,
    slug: row.slug,
    label: row.label,
    description: row.description ?? "",
    emoji: moodEmojiBySlug[row.slug] ?? "🎬",
  };
}

export async function fetchMoodTags(category: "pre_watch" | "post_watch") {
  const { data, error } = await supabase
    .from("mood_tags")
    .select("*")
    .eq("category", category)
    .eq("is_active", true)
    .order("label", { ascending: true });

  if (error) {
    throw error;
  }

  return ((data ?? []) as MoodRow[]).map(toMoodOption);
}
