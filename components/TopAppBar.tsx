import { View, Text, StyleSheet, Platform } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, typography, spacing, shadow } from "../theme/tokens";

export function TopAppBar({ roleLabel }: { roleLabel: string }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.bar, { paddingTop: insets.top }, shadow.card]}>
      <View style={styles.row}>
        <View style={styles.brand}>
          <MaterialIcons name="ac-unit" size={22} color={colors.secondary} />
          <Text style={[typography.headlineLgMobile, styles.wordmark]}>Frizko</Text>
        </View>
        <View style={styles.roleChip}>
          <Text style={[typography.bodyMd, styles.roleText]}>{roleLabel}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: colors.surface,
    ...Platform.select({ web: { position: "sticky" as any, top: 0, zIndex: 50 } }),
  },
  row: {
    height: 56,
    paddingHorizontal: spacing.marginMobile,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brand: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  wordmark: {
    color: colors.secondary,
    fontWeight: "700",
  },
  roleChip: {
    backgroundColor: colors.surfaceContainerLow,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: 999,
  },
  roleText: {
    color: colors.secondary,
    fontWeight: "600",
  },
});
