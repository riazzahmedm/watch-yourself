import { PropsWithChildren, useEffect, useMemo, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { theme } from "../../lib/theme";

type BackgroundVariant =
  | "introWarm"
  | "introCool"
  | "auth"
  | "home"
  | "profile";

const variantMap: Record<
  BackgroundVariant,
  {
    base: readonly [string, string, string];
    overlayA: readonly [string, string, string];
    overlayB: readonly [string, string, string];
    overlayC: readonly [string, string, string];
  }
> = {
  introWarm: {
    base: ["#04030b", "#18061f", "#0c1530"],
    overlayA: ["#ff4fd8", "#7c3aed", "#04030b"],
    overlayB: ["#22f0ff", "#04030b", "#ff4fd8"],
    overlayC: ["#7c3aed", "#22f0ff", "#04030b"],
  },
  introCool: {
    base: ["#02040c", "#090f24", "#111339"],
    overlayA: ["#22f0ff", "#7c3aed", "#02040c"],
    overlayB: ["#ff4fd8", "#02040c", "#22f0ff"],
    overlayC: ["#7c3aed", "#ff4fd8", "#02040c"],
  },
  auth: {
    base: ["#04030b", "#12081f", "#111739"],
    overlayA: ["#ff4fd8", "#1d1147", "#04030b"],
    overlayB: ["#22f0ff", "#04030b", "#7c3aed"],
    overlayC: ["#7c3aed", "#ff4fd8", "#02040c"],
  },
  home: {
    base: ["#04030b", "#0a1027", "#15113a"],
    overlayA: ["#22f0ff", "#12153a", "#04030b"],
    overlayB: ["#ff4fd8", "#04030b", "#7c3aed"],
    overlayC: ["#7c3aed", "#22f0ff", "#04030b"],
  },
  profile: {
    base: ["#04030b", "#15081d", "#0d1330"],
    overlayA: ["#7c3aed", "#04030b", "#22f0ff"],
    overlayB: ["#ff4fd8", "#111739", "#04030b"],
    overlayC: ["#22f0ff", "#7c3aed", "#04030b"],
  },
};

const noiseDots = Array.from({ length: 140 }, (_, index) => ({
  key: `noise-${index}`,
  top: `${(index * 11) % 100}%` as const,
  left: `${(index * 23) % 100}%` as const,
  size: (index % 3) + 1,
  opacity: 0.04 + (index % 6) * 0.02,
}));

const grainPixels = Array.from({ length: 420 }, (_, index) => ({
  key: `grain-${index}`,
  top: `${(index * 7) % 100}%` as const,
  left: `${(index * 19) % 100}%` as const,
  width: index % 5 === 0 ? 2 : 1,
  height: index % 7 === 0 ? 2 : 1,
  opacity: 0.028 + (index % 9) * 0.008,
}));

const grainStreaks = Array.from({ length: 180 }, (_, index) => ({
  key: `streak-${index}`,
  top: `${(index * 13) % 100}%` as const,
  left: `${(index * 29) % 100}%` as const,
  width: index % 2 === 0 ? 12 : 8,
  height: 1,
  opacity: 0.018 + (index % 5) * 0.01,
  rotate: index % 3 === 0 ? "14deg" : index % 3 === 1 ? "-12deg" : "0deg",
}));

export function CinematicBackground({
  children,
  variant = "auth",
}: PropsWithChildren<{ variant?: BackgroundVariant }>) {
  const config = variantMap[variant];
  const drift = useRef(new Animated.Value(0)).current;
  const shimmer = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const driftLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(drift, {
          toValue: 1,
          duration: 14000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(drift, {
          toValue: 0,
          duration: 14000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    );

    const shimmerLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, {
          toValue: 1,
          duration: 9000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(shimmer, {
          toValue: 0,
          duration: 9000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    );

    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 7000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 7000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    );

    driftLoop.start();
    shimmerLoop.start();
    pulseLoop.start();

    return () => {
      driftLoop.stop();
      shimmerLoop.stop();
      pulseLoop.stop();
    };
  }, [drift, pulse, shimmer]);

  const layerATransform = useMemo(
    () => [
      {
        translateX: drift.interpolate({
          inputRange: [0, 1],
          outputRange: [-60, 60],
        }),
      },
      {
        translateY: drift.interpolate({
          inputRange: [0, 1],
          outputRange: [-30, 30],
        }),
      },
      { rotate: "18deg" },
      {
        scale: shimmer.interpolate({
          inputRange: [0, 1],
          outputRange: [1.08, 1.22],
        }),
      },
    ],
    [drift, shimmer],
  );

  const layerBTransform = useMemo(
    () => [
      {
        translateX: shimmer.interpolate({
          inputRange: [0, 1],
          outputRange: [45, -45],
        }),
      },
      {
        translateY: drift.interpolate({
          inputRange: [0, 1],
          outputRange: [40, -40],
        }),
      },
      { rotate: "-26deg" },
      {
        scale: pulse.interpolate({
          inputRange: [0, 1],
          outputRange: [1.1, 1.3],
        }),
      },
    ],
    [drift, pulse, shimmer],
  );

  const layerCTransform = useMemo(
    () => [
      {
        translateX: pulse.interpolate({
          inputRange: [0, 1],
          outputRange: [-35, 35],
        }),
      },
      {
        translateY: shimmer.interpolate({
          inputRange: [0, 1],
          outputRange: [25, -25],
        }),
      },
      { rotate: "42deg" },
      {
        scale: drift.interpolate({
          inputRange: [0, 1],
          outputRange: [1.02, 1.18],
        }),
      },
    ],
    [drift, pulse, shimmer],
  );

  return (
    <View style={styles.root}>
      <LinearGradient colors={[...config.base]} style={StyleSheet.absoluteFill} />

      <Animated.View
        style={[
          styles.gradientLayer,
          {
            opacity: shimmer.interpolate({
              inputRange: [0, 1],
              outputRange: [0.42, 0.7],
            }),
            transform: layerATransform,
          },
        ]}
      >
        <LinearGradient colors={[...config.overlayA]} style={StyleSheet.absoluteFill} />
      </Animated.View>

      <Animated.View
        style={[
          styles.gradientLayer,
          {
            opacity: drift.interpolate({
              inputRange: [0, 1],
              outputRange: [0.3, 0.58],
            }),
            transform: layerBTransform,
          },
        ]}
      >
        <LinearGradient colors={[...config.overlayB]} style={StyleSheet.absoluteFill} />
      </Animated.View>

      <Animated.View
        style={[
          styles.gradientLayer,
          {
            opacity: pulse.interpolate({
              inputRange: [0, 1],
              outputRange: [0.18, 0.42],
            }),
            transform: layerCTransform,
          },
        ]}
      >
        <LinearGradient colors={[...config.overlayC]} style={StyleSheet.absoluteFill} />
      </Animated.View>

      <Animated.View
        style={[
          styles.noiseLayer,
          {
            opacity: pulse.interpolate({
              inputRange: [0, 1],
              outputRange: [0.2, 0.32],
            }),
          },
        ]}
      >
        {grainPixels.map((pixel) => (
          <View
            key={pixel.key}
            style={[
              styles.pixel,
              {
                top: pixel.top,
                left: pixel.left,
                width: pixel.width,
                height: pixel.height,
                opacity: pixel.opacity,
              },
            ]}
          />
        ))}
        {grainStreaks.map((streak) => (
          <View
            key={streak.key}
            style={[
              styles.streak,
              {
                top: streak.top,
                left: streak.left,
                width: streak.width,
                height: streak.height,
                opacity: streak.opacity,
                transform: [{ rotate: streak.rotate }],
              },
            ]}
          />
        ))}
        {noiseDots.map((dot) => (
          <View
            key={dot.key}
            style={[
              styles.dot,
              {
                top: dot.top,
                left: dot.left,
                width: dot.size,
                height: dot.size,
                opacity: dot.opacity,
              },
            ]}
          />
        ))}
      </Animated.View>

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
  gradientLayer: {
    ...StyleSheet.absoluteFillObject,
  },
  noiseLayer: {
    ...StyleSheet.absoluteFillObject,
  },
  dot: {
    position: "absolute",
    borderRadius: 999,
    backgroundColor: "#ffffff",
  },
  pixel: {
    position: "absolute",
    backgroundColor: "#ffffff",
  },
  streak: {
    position: "absolute",
    backgroundColor: "#ffffff",
  },
});
