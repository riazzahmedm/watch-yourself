import { supabase } from "../../lib/supabase";
import type { Database } from "../../types/database";

type TitleRow = Database["public"]["Tables"]["titles"]["Row"];

export async function fetchTitles() {
  const { data, error } = await supabase
    .from("titles")
    .select("id, name, overview, tmdb_type, release_date")
    .order("name", { ascending: true })
    .limit(20);

  if (error) {
    throw error;
  }

  return (data ?? []) as Pick<
    TitleRow,
    "id" | "name" | "overview" | "tmdb_type" | "release_date"
  >[];
}
