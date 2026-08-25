import { View, ViewProps, StyleSheet } from "react-native";
import { colors, radius, shadow, spacing } from "../theme/tokens";

export function Card({ style, ...props }: ViewProps) {
  return <View style={[styles.card, style]} {...props} />;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.surfaceContainerHigh,
    ...shadow.card,
  },
});
