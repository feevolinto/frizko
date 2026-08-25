import { useEffect, useRef, useState } from "react";
import { Animated, Text, TextStyle } from "react-native";

function BlinkingCursor({ color }: { color?: TextStyle["color"] }) {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0, duration: 500, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1, duration: 500, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return (
    <Animated.Text style={{ opacity, color }}>|</Animated.Text>
  );
}

// Loops: types `text` out one character at a time, holds, deletes it, waits,
// then types it again — a "someone is composing this" hint for the
// landing page's chat prompt.
export function TypewriterText({
  text,
  style,
  cursorColor,
  typingSpeedMs = 85,
  pauseMs = 1500,
  deletingSpeedMs = 35,
  restDelayMs = 500,
}: {
  text: string;
  style?: TextStyle | TextStyle[];
  cursorColor?: TextStyle["color"];
  typingSpeedMs?: number;
  pauseMs?: number;
  deletingSpeedMs?: number;
  restDelayMs?: number;
}) {
  const [display, setDisplay] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting" | "resting">("typing");

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (display.length < text.length) {
        timer = setTimeout(() => setDisplay(text.slice(0, display.length + 1)), typingSpeedMs);
      } else {
        timer = setTimeout(() => setPhase("pausing"), 0);
      }
    } else if (phase === "pausing") {
      timer = setTimeout(() => setPhase("deleting"), pauseMs);
    } else if (phase === "deleting") {
      if (display.length > 0) {
        timer = setTimeout(() => setDisplay(text.slice(0, display.length - 1)), deletingSpeedMs);
      } else {
        timer = setTimeout(() => setPhase("resting"), restDelayMs);
      }
    } else if (phase === "resting") {
      timer = setTimeout(() => setPhase("typing"), 0);
    }

    return () => clearTimeout(timer);
  }, [display, phase, text, typingSpeedMs, pauseMs, deletingSpeedMs, restDelayMs]);

  return (
    <Text style={style} numberOfLines={1}>
      {display}
      <BlinkingCursor color={cursorColor} />
    </Text>
  );
}
