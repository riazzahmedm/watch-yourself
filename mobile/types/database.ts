export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string | null;
          display_name: string | null;
          bio: string | null;
          avatar_url: string | null;
          onboarding_completed_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username?: string | null;
          display_name?: string | null;
          bio?: string | null;
          avatar_url?: string | null;
          onboarding_completed_at?: string | null;
        };
        Update: {
          username?: string | null;
          display_name?: string | null;
          bio?: string | null;
          avatar_url?: string | null;
          onboarding_completed_at?: string | null;
        };
        Relationships: [];
      };
      mood_tags: {
        Row: {
          id: string;
          slug: string;
          label: string;
          description: string | null;
          category: "pre_watch" | "post_watch" | "both";
          energy_level: number | null;
          valence_level: number | null;
          intensity_level: number | null;
          is_active: boolean;
          created_at: string;
        };
        Insert: never;
        Update: never;
        Relationships: [];
      };
      titles: {
        Row: {
          id: string;
          tmdb_id: number;
          tmdb_type: "movie" | "tv";
          name: string;
          original_name: string | null;
          overview: string | null;
          poster_url: string | null;
          backdrop_url: string | null;
          release_date: string | null;
          original_language: string | null;
          runtime_minutes: number | null;
          status: string | null;
          popularity: number | null;
          vote_average: number | null;
          metadata_json: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: never;
        Update: never;
        Relationships: [];
      };
      watch_logs: {
        Row: {
          id: string;
          user_id: string;
          title_id: string;
          episode_id: string | null;
          watched_on: string;
          rating: number | null;
          review_text: string | null;
          is_rewatch: boolean;
          pre_watch_mood_tag_id: string | null;
          post_watch_mood_tag_id: string | null;
          mood_capture_version: number;
          contains_spoilers: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          title_id: string;
          episode_id?: string | null;
          watched_on: string;
          rating?: number | null;
          review_text?: string | null;
          is_rewatch?: boolean;
          pre_watch_mood_tag_id?: string | null;
          post_watch_mood_tag_id?: string | null;
          mood_capture_version?: number;
          contains_spoilers?: boolean;
        };
        Update: Partial<Database["public"]["Tables"]["watch_logs"]["Insert"]>;
        Relationships: [];
      };
      watch_log_emotion_signals: {
        Row: {
          id: string;
          watch_log_id: string;
          phase: "pre_watch" | "post_watch";
          primary_mood_tag_id: string | null;
          secondary_mood_tag_id: string | null;
          energy_level: number | null;
          valence_level: number | null;
          intensity_level: number | null;
          confidence: number | null;
          source: "user_selected" | "inferred" | "hybrid";
          created_at: string;
        };
        Insert: {
          watch_log_id: string;
          phase: "pre_watch" | "post_watch";
          primary_mood_tag_id?: string | null;
          secondary_mood_tag_id?: string | null;
          energy_level?: number | null;
          valence_level?: number | null;
          intensity_level?: number | null;
          confidence?: number | null;
          source?: "user_selected" | "inferred" | "hybrid";
        };
        Update: Partial<Database["public"]["Tables"]["watch_log_emotion_signals"]["Insert"]>;
        Relationships: [];
      };
      watch_log_context: {
        Row: {
          watch_log_id: string;
          time_of_day: string | null;
          watching_with: "alone" | "partner" | "friends" | "family" | "group" | null;
          location_type: "home" | "cinema" | "travel" | "other" | null;
          attention_level: "full" | "partial" | "background" | null;
          life_note: string | null;
          private_by_default: boolean;
          created_at: string;
        };
        Insert: {
          watch_log_id: string;
          time_of_day?: string | null;
          watching_with?: "alone" | "partner" | "friends" | "family" | "group" | null;
          location_type?: "home" | "cinema" | "travel" | "other" | null;
          attention_level?: "full" | "partial" | "background" | null;
          life_note?: string | null;
          private_by_default?: boolean;
        };
        Update: Partial<Database["public"]["Tables"]["watch_log_context"]["Insert"]>;
        Relationships: [];
      };
    };
  };
};
