import { supabase } from "../../lib/supabase";

type CreateLogInput = {
  userId: string;
  titleId: string;
  watchedOn: string;
  rating: number | null;
  reviewText: string | null;
  preWatchMoodId: string;
  postWatchMoodId: string;
  lifeNote: string | null;
};

export async function createWatchLog(input: CreateLogInput) {
  const db = supabase as any;

  const { data: watchLog, error: watchLogError } = await db
    .from("watch_logs")
    .insert({
      user_id: input.userId,
      title_id: input.titleId,
      watched_on: input.watchedOn,
      rating: input.rating,
      review_text: input.reviewText,
      pre_watch_mood_tag_id: input.preWatchMoodId,
      post_watch_mood_tag_id: input.postWatchMoodId,
    })
    .select("id")
    .single();

  if (watchLogError) {
    throw watchLogError;
  }

  const logId = watchLog.id;

  const { error: emotionError } = await db
    .from("watch_log_emotion_signals")
    .insert([
      {
        watch_log_id: logId,
        phase: "pre_watch",
        primary_mood_tag_id: input.preWatchMoodId,
        source: "user_selected",
        confidence: 1,
      },
      {
        watch_log_id: logId,
        phase: "post_watch",
        primary_mood_tag_id: input.postWatchMoodId,
        source: "user_selected",
        confidence: 1,
      },
    ]);

  if (emotionError) {
    throw emotionError;
  }

  if (input.lifeNote && input.lifeNote.trim().length > 0) {
    const { error: contextError } = await db.from("watch_log_context").insert({
      watch_log_id: logId,
      life_note: input.lifeNote.trim(),
      private_by_default: true,
      location_type: "home",
      attention_level: "full",
      watching_with: "alone",
    });

    if (contextError) {
      throw contextError;
    }
  }

  return logId;
}
