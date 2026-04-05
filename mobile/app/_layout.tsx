import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { AppProviders } from "../providers/app-providers";
import { theme } from "../lib/theme";

export default function RootLayout() {
  return (
    <AppProviders>
      <StatusBar style="light" backgroundColor={theme.colors.bg} translucent={false} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: theme.colors.bg,
          },
          animation: "slide_from_right",
        }}
      />
    </AppProviders>
  );
}
