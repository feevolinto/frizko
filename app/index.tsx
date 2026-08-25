import { View, Text, Pressable, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, typography, spacing, radius, shadow } from "../theme/tokens";
import type { FrizkoRole } from "../lib/types";

const ROLES: { key: FrizkoRole; label: string; description: string; icon: keyof typeof MaterialIcons.glyphMap; path: string }[] = [
  { key: "supplier", label: "Supplier", description: "Consign your catch via SMS", icon: "sailing", path: "/supplier" },
  { key: "operator", label: "Storage Operator", description: "Manage facility intake", icon: "warehouse", path: "/operator" },
  { key: "buyer", label: "Buyer", description: "Browse consignable inventory", icon: "storefront", path: "/buyer" },
];

export default function Onboarding() {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.hero}>
        <View style={styles.logoWrap}>
          <MaterialIcons name="ac-unit" size={40} color={colors.onSecondary} />
        </View>
        <Text style={[typography.displayLg, styles.title]}>Frizko</Text>
        <Text style={[typography.bodyLg, styles.subtitle]}>
          Cold chain visibility for General Santos fisherfolk, storage operators, and buyers.
        </Text>
      </View>
      <View style={styles.roleList}>
        {ROLES.map((role) => (
          <Pressable
            key={role.key}
            onPress={() => router.push(role.path as any)}
            style={({ pressed }) => [styles.roleCard, pressed && { opacity: 0.85 }]}
          >
            <View style={styles.roleIcon}>
              <MaterialIcons name={role.icon} size={24} color={colors.secondary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[typography.titleMd, styles.roleLabel]}>{role.label}</Text>
              <Text style={[typography.bodyMd, styles.roleDescription]}>{role.description}</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={colors.outline} />
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.marginMobile,
    justifyContent: "center",
    gap: spacing.xl,
  },
  hero: {
    alignItems: "center",
    gap: spacing.sm,
  },
  logoWrap: {
    width: 72,
    height: 72,
    borderRadius: radius.xl,
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.xs,
  },
  title: {
    color: colors.primary,
  },
  subtitle: {
    color: colors.onSurfaceVariant,
    textAlign: "center",
    maxWidth: 320,
  },
  roleList: {
    gap: spacing.md,
  },
  roleCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radius.lg,
    padding: spacing.md,
    ...shadow.card,
  },
  roleIcon: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: colors.secondaryContainer,
    alignItems: "center",
    justifyContent: "center",
  },
  roleLabel: {
    color: colors.onSurface,
  },
  roleDescription: {
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
});
