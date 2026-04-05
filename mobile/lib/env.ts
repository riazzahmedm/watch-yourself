import Constants from "expo-constants";

type ExpoExtra = {
  supabaseUrl?: string;
  supabaseAnonKey?: string;
};

const extra = (Constants.expoConfig?.extra ?? {}) as ExpoExtra;

export const env = {
  supabaseUrl: extra.supabaseUrl ?? "http://127.0.0.1:54321",
  supabaseAnonKey: extra.supabaseAnonKey ?? "demo-anon-key",
};

export const hasSupabaseCredentials =
  env.supabaseUrl !== "http://127.0.0.1:54321" &&
  env.supabaseAnonKey !== "demo-anon-key";
