import { PropsWithChildren } from "react";
import { StyleSheet, View, ViewProps } from "react-native";

import { theme } from "../../lib/theme";

export function NeonPanel({
  children,
  style,
  ...props
}: PropsWithChildren<ViewProps>) {
  return (
    <View style={[styles.panel, style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: theme.colors.surfaceGlass,
    borderRadius: theme.radii.xl,
    padding: 20,
    borderWidth: 1,
    borderColor: theme.colors.border,
    overflow: "hidden",
  },
});
