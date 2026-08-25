import { View, Text, Pressable, ScrollView, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors, typography, spacing, radius, shadow } from "../../theme/tokens";
import { CHAT_STRINGS, type ChatLanguage } from "../../lib/chatStrings";
import type { StorageNode } from "../../lib/types";

// Purely decorative "barcode" — no scanning logic, just sells the
// invoice/ticket feel without pulling in a QR/barcode dependency.
function DecorativeBarcode() {
  const bars = [3, 1, 2, 4, 1, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 2, 1, 4, 1, 3];
  return (
    <View style={styles.barcodeRow}>
      {bars.map((w, i) => (
        <View key={i} style={{ width: w * 2, height: 36, backgroundColor: colors.onSurface, marginRight: 2 }} />
      ))}
    </View>
  );
}

export function ConsignmentTicket({
  language,
  species,
  weightKg,
  supplierName,
  node,
  reference,
  issuedAt,
  onClose,
}: {
  language: ChatLanguage;
  species: string;
  weightKg: number;
  supplierName: string;
  node: StorageNode;
  reference: string;
  issuedAt: Date;
  onClose: () => void;
}) {
  const t = CHAT_STRINGS[language];

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text style={[typography.titleMd, { color: colors.onSurface }]}>{t.viewTicket}</Text>
        <Pressable onPress={onClose} style={styles.closeButton}>
          <MaterialIcons name="close" size={20} color={colors.onSurface} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.ticketCard}>
          <View style={styles.ticketTop}>
            <View style={styles.brandRow}>
              <View style={styles.brandIcon}>
                <MaterialIcons name="ac-unit" size={18} color={colors.onSecondary} />
              </View>
              <Text style={[typography.titleMd, { color: colors.secondary, fontWeight: "700" }]}>Frizko</Text>
            </View>
            <Text style={[typography.labelSm, styles.eyebrow]}>{t.ticketTitle}</Text>
            <Text style={[typography.headlineLgMobile, { color: colors.onSurface }]}>{reference}</Text>
            <Text style={[typography.labelSm, styles.issued]}>
              {t.ticketIssued}: {issuedAt.toLocaleString()}
            </Text>
          </View>

          <View style={styles.dashedDivider} />

          <View style={styles.section}>
            <Text style={[typography.labelSm, styles.sectionLabel]}>SUPPLIER</Text>
            <Text style={[typography.bodyLg, { color: colors.onSurface }]}>{supplierName}</Text>
          </View>

          <View style={styles.section}>
            <Text style={[typography.labelSm, styles.sectionLabel]}>{t.ticketCatch.toUpperCase()}</Text>
            <Text style={[typography.bodyLg, { color: colors.onSurface }]}>
              {species} · {weightKg} kg
            </Text>
          </View>

          <View style={styles.dashedDivider} />

          <View style={styles.section}>
            <Text style={[typography.labelSm, styles.sectionLabel]}>{t.ticketBring}</Text>
            <View style={styles.destinationRow}>
              <MaterialIcons name="warehouse" size={22} color={colors.primary} />
              <View style={{ flex: 1 }}>
                <Text style={[typography.titleMd, { color: colors.onSurface }]}>{node.name}</Text>
                <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant }]}>{node.address}</Text>
                <Text style={[typography.labelSm, { color: colors.outline, marginTop: 2 }]}>
                  {node.distanceKm} km away
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.statusRow}>
            <MaterialIcons name="check-circle" size={18} color={colors.statusAvailable} />
            <Text style={[typography.bodyMd, { color: colors.statusAvailable, fontWeight: "600" }]}>
              {t.ticketStatusNotified}
            </Text>
          </View>

          <View style={styles.dashedDivider} />

          <DecorativeBarcode />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable onPress={onClose} style={styles.doneButton}>
          <Text style={[typography.titleMd, { color: colors.onSecondary }]}>{t.close}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.marginMobile,
    height: 56,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surfaceContainerLow,
  },
  scroll: { padding: spacing.marginMobile, paddingTop: spacing.md },
  ticketCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radius.lg,
    padding: spacing.lg,
    ...shadow.cardLifted,
  },
  ticketTop: { alignItems: "center", gap: 4, marginBottom: spacing.md },
  brandRow: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: spacing.sm },
  brandIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  eyebrow: { color: colors.outline, letterSpacing: 1.5 },
  issued: { color: colors.outline, marginTop: 4 },
  dashedDivider: {
    borderStyle: "dashed",
    borderTopWidth: 1.5,
    borderColor: colors.outlineVariant,
    marginVertical: spacing.md,
  },
  section: { marginBottom: spacing.md },
  sectionLabel: { color: colors.outline, letterSpacing: 1, marginBottom: 4 },
  destinationRow: { flexDirection: "row", gap: spacing.sm, alignItems: "flex-start" },
  statusRow: { flexDirection: "row", alignItems: "center", gap: spacing.xs },
  barcodeRow: { flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: spacing.xs },
  footer: {
    padding: spacing.marginMobile,
    borderTopWidth: 1,
    borderTopColor: colors.surfaceContainerHigh,
  },
  doneButton: {
    height: 48,
    borderRadius: radius.DEFAULT * 2,
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
});
