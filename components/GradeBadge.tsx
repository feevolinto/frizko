import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors, radius, spacing, typography } from "../theme/tokens";

export function GradeBadge({ label, icon = "ac-unit" }: { label: string; icon?: keyof typeof MaterialIcons.glyphMap }) {
  return (
    <View style={styles.badge}>
      <MaterialIcons name={icon} size={14} color={colors.secondary} />
      <Text style={[typography.labelSm, styles.text]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(255,255,255,0.9)",
    paddingHorizontal: spacing.xs + 2,
    paddingVertical: 4,
    borderRadius: radius.md,
    alignSelf: "flex-start",
  },
  text: {
    color: colors.onSurface,
    fontWeight: "600",
  },
});
