export type MoodOption = {
  slug: string;
  label: string;
  emoji: string;
  description: string;
};

export const moodCollections: Record<"preWatch" | "postWatch", MoodOption[]> = {
  preWatch: [
    {
      slug: "feeling-low",
      label: "Feeling low",
      emoji: "😔",
      description: "You want something gentle, restorative, and emotionally safe.",
    },
    {
      slug: "need-intensity",
      label: "Need intensity",
      emoji: "😤",
      description: "You want momentum, adrenaline, and emotional force.",
    },
    {
      slug: "comfort-watch",
      label: "Comfort watch",
      emoji: "😌",
      description: "You want warmth, familiarity, and something that will hold you.",
    },
    {
      slug: "want-something-deep",
      label: "Want something deep",
      emoji: "🌌",
      description: "You want reflection, complexity, and emotional depth.",
    },
  ],
  postWatch: [
    {
      slug: "comforted",
      label: "Comforted",
      emoji: "🤍",
      description: "It soothed you and gave you emotional safety.",
    },
    {
      slug: "energized",
      label: "Energized",
      emoji: "⚡",
      description: "It woke you up and left you activated.",
    },
    {
      slug: "mind-blown",
      label: "Mind blown",
      emoji: "🤯",
      description: "It surprised you with execution, ideas, or twists.",
    },
    {
      slug: "reflective",
      label: "Reflective",
      emoji: "🌙",
      description: "It stayed with you and opened up deeper thoughts.",
    },
  ],
};
