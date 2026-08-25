import { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/tokens";

// Frizko's answer to "the Claude icon while thinking" — a snowflake that
// spins continuously while `spinning` is true (fast during an active AI
// "thinking" state, slow as an idle brand flourish) and holds still once
// the thought is delivered.
export function AnimatedSnowflake({
  size = 16,
  color = colors.onSecondary,
  spinning = false,
  durationMs = 1200,
}: {
  size?: number;
  color?: string;
  spinning?: boolean;
  durationMs?: number;
}) {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let loop: Animated.CompositeAnimation | undefined;

    if (spinning) {
      rotation.setValue(0);
      loop = Animated.loop(
        Animated.timing(rotation, {
          toValue: 1,
          duration: durationMs,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      );
      loop.start();
    } else {
      rotation.stopAnimation(() => rotation.setValue(0));
    }

    return () => loop?.stop();
  }, [spinning, durationMs, rotation]);

  const rotate = rotation.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "360deg"] });

  return (
    <Animated.View style={{ transform: [{ rotate }] }}>
      <MaterialIcons name="ac-unit" size={size} color={color} />
    </Animated.View>
  );
}
