import { View, Text, Pressable, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, typography, spacing, radius, shadow } from "../../theme/tokens";
import { LANGUAGE_LABELS, type ChatLanguage } from "../../lib/chatStrings";

const ORDER: ChatLanguage[] = ["bisaya", "tagalog", "english"];

export function LanguagePicker({
  onSelect,
  onClose,
}: {
  onSelect: (language: ChatLanguage) => void;
  onClose: () => void;
}) {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <View style={{ width: 36 }} />
        <Pressable onPress={onClose} style={styles.closeButton}>
          <MaterialIcons name="close" size={20} color={colors.onSurface} />
        </Pressable>
      </View>

      <View style={styles.content}>
        <View style={styles.brandIcon}>
          <MaterialIcons name="translate" size={28} color={colors.onSecondary} />
        </View>
        <Text style={[typography.headlineLgMobile, styles.title]}>
          Bisaya · Tagalog · English
        </Text>
        <Text style={[typography.bodyMd, styles.subtitle]}>Pilia ang pinulongan / Piliin ang wika / Choose your language</Text>

        <View style={styles.options}>
          {ORDER.map((lang) => (
            <Pressable key={lang} onPress={() => onSelect(lang)} style={({ pressed }) => [styles.option, pressed && { opacity: 0.85 }]}>
              <View style={{ flex: 1 }}>
                <Text style={[typography.titleMd, { color: colors.onSurface }]}>{LANGUAGE_LABELS[lang].native}</Text>
                <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, marginTop: 2 }]}>
                  {LANGUAGE_LABELS[lang].tagline}
                </Text>
              </View>
              <MaterialIcons name="chevron-right" size={22} color={colors.outline} />
            </Pressable>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: spacing.marginMobile, height: 56 },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surfaceContainerLow,
  },
  content: { flex: 1, padding: spacing.marginMobile, alignItems: "center", justifyContent: "center", gap: spacing.sm },
  brandIcon: {
    width: 56,
    height: 56,
    borderRadius: radius.xl,
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.sm,
  },
  title: { color: colors.onSurface, textAlign: "center" },
  subtitle: { color: colors.onSurfaceVariant, textAlign: "center", marginBottom: spacing.lg, maxWidth: 300 },
  options: { width: "100%", gap: spacing.sm },
  option: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radius.lg,
    padding: spacing.md,
    ...shadow.card,
  },
});
