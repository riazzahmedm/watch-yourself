import { PropsWithChildren } from "react";
import { useFonts } from "expo-font";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Orbitron_700Bold, Orbitron_800ExtraBold } from "@expo-google-fonts/orbitron";
import {
  SpaceGrotesk_400Regular,
  SpaceGrotesk_500Medium,
  SpaceGrotesk_700Bold,
} from "@expo-google-fonts/space-grotesk";

import { theme } from "../lib/theme";

export function FontProvider({ children }: PropsWithChildren) {
  const [loaded] = useFonts({
    Orbitron_700Bold,
    Orbitron_800ExtraBold,
    SpaceGrotesk_400Regular,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_700Bold,
  });

  if (!loaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={theme.colors.pink} />
      </View>
    );
  }

  return children;
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.bg,
  },
});
