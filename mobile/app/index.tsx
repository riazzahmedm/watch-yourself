import { Redirect } from "expo-router";
import { ActivityIndicator, SafeAreaView, StyleSheet, View } from "react-native";

import { useSession } from "../hooks/use-session";

export default function IndexScreen() {
  const { isLoading, session } = useSession();

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centered}>
          <ActivityIndicator color="#f472b6" />
        </View>
      </SafeAreaView>
    );
  }

  if (!session) {
    return <Redirect href="/intro-one" />;
  }

  return <Redirect href="/home" />;
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#070a14",
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
