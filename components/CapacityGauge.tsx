import { View, Text, StyleSheet } from "react-native";
import { colors, typography, spacing, radius } from "../theme/tokens";

export function CapacityGauge({
  percent,
  usedLabel,
  totalLabel,
  barColor = colors.primary,
}: {
  percent: number;
  usedLabel: string;
  totalLabel: string;
  barColor?: string;
}) {
  const clamped = Math.min(100, Math.max(0, percent));
  return (
    <View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${clamped}%`, backgroundColor: barColor }]} />
      </View>
      <View style={styles.captionRow}>
        <Text style={[typography.labelSm, styles.caption]}>{usedLabel}</Text>
        <Text style={[typography.labelSm, styles.caption]}>{totalLabel}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: "100%",
    height: spacing.base,
    borderRadius: radius.full,
    backgroundColor: "#E2E8F0",
    overflow: "hidden",
    marginBottom: spacing.xs,
  },
  fill: {
    height: "100%",
    borderRadius: radius.full,
  },
  captionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  caption: {
    color: colors.outline,
  },
});
