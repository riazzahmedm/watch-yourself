import type { ExpoConfig } from "expo/config";

const config: ExpoConfig = {
  name: "WatchYourself",
  slug: "watch-yourself-mobile",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  newArchEnabled: true,
  scheme: "watchyourself",
  splash: {
    image: "./assets/splash-icon.png",
    resizeMode: "contain",
    backgroundColor: "#0f1720",
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.watchyourself.mobile",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#0f1720",
    },
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
    package: "com.watchyourself.mobile",
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  plugins: ["expo-router"],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
    supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
  },
};

export default config;
