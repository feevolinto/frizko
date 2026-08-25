import { useState } from "react";
import { ScrollView, Pressable, Text, StyleSheet } from "react-native";
import { colors, radius, spacing, typography } from "../theme/tokens";

export function FilterChipRow({
  options,
  value,
  onChange,
}: {
  options: string[];
  value?: string;
  onChange?: (value: string) => void;
}) {
  const [internalActive, setInternalActive] = useState(options[0]);
  const active = value ?? internalActive;

  const select = (opt: string) => {
    setInternalActive(opt);
    onChange?.(opt);
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
      {options.map((opt) => {
        const isActive = opt === active;
        return (
          <Pressable
            key={opt}
            onPress={() => select(opt)}
            style={[styles.chip, isActive ? styles.chipActive : styles.chipInactive]}
          >
            <Text style={[typography.labelSm, isActive ? styles.textActive : styles.textInactive]}>{opt}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    gap: spacing.sm,
    paddingVertical: spacing.xs,
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderRadius: radius.full,
  },
  chipActive: {
    backgroundColor: colors.secondary,
  },
  chipInactive: {
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  textActive: {
    color: colors.onSecondary,
    fontWeight: "600",
  },
  textInactive: {
    color: colors.onSurfaceVariant,
    fontWeight: "600",
  },
});
