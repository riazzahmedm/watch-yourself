import { supabase } from "../../lib/supabase";
import type { Database } from "../../types/database";

export type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];
export type ProfileUpdate = Database["public"]["Tables"]["profiles"]["Update"];

export async function fetchMyProfile(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    throw error;
  }

  return data as ProfileRow;
}

export async function updateMyProfile(userId: string, updates: ProfileUpdate) {
  const db = supabase as any;

  const { data, error } = await db
    .from("profiles")
    .update(updates)
    .eq("id", userId)
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data as ProfileRow;
}
