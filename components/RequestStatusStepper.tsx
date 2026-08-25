import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors, typography, spacing } from "../theme/tokens";
import type { RequestStatus } from "../lib/types";

const STEPS: { key: RequestStatus; title: string; subtitle: string }[] = [
  { key: "pending", title: "Request Received", subtitle: "System parsed SMS" },
  { key: "matched", title: "Finding Storage", subtitle: "Matching with nearby facilities" },
  { key: "stored", title: "Stored", subtitle: "Consigned into cold storage" },
];

const ORDER: RequestStatus[] = ["pending", "matched", "stored"];

export function RequestStatusStepper({ status }: { status: RequestStatus }) {
  const activeIndex = ORDER.indexOf(status);

  return (
    <View style={styles.container}>
      <View style={styles.line} />
      {STEPS.map((step, i) => {
        const isDone = i < activeIndex;
        const isActive = i === activeIndex;
        const isUpcoming = i > activeIndex;
        return (
          <View key={step.key} style={[styles.step, isUpcoming && styles.upcoming]}>
            <View
              style={[
                styles.dot,
                isDone && { backgroundColor: colors.secondary },
                isActive && styles.dotActive,
                isUpcoming && styles.dotUpcoming,
              ]}
            >
              {isDone && <MaterialIcons name="check" size={14} color={colors.onSecondary} />}
              {isActive && <View style={styles.innerDot} />}
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={[
                  typography.bodyMd,
                  { fontWeight: "600", color: isActive ? colors.secondary : colors.onSurface },
                ]}
              >
                {step.title}
              </Text>
              {(isDone || isActive) && (
                <Text style={[typography.labelSm, { color: colors.outline }]}>{step.subtitle}</Text>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
}

const DOT = 24;

const styles = StyleSheet.create({
  container: {
    paddingLeft: spacing.lg,
    gap: spacing.lg,
  },
  line: {
    position: "absolute",
    left: spacing.lg - DOT / 2 - 1,
    top: 8,
    bottom: 8,
    width: 2,
    backgroundColor: colors.surfaceVariant,
  },
  step: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm,
  },
  upcoming: {
    opacity: 0.5,
  },
  dot: {
    marginLeft: -(spacing.lg),
    width: DOT,
    height: DOT,
    borderRadius: DOT / 2,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.surfaceContainerLowest,
    backgroundColor: colors.surfaceContainerLowest,
  },
  dotActive: {
    borderColor: colors.secondary,
    borderWidth: 2,
    backgroundColor: colors.surfaceContainerLowest,
  },
  dotUpcoming: {
    borderColor: colors.outlineVariant,
    borderWidth: 2,
  },
  innerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.secondary,
  },
});
