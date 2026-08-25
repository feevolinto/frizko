import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ScreenContainer } from "../../components/ScreenContainer";
import { Card } from "../../components/Card";
import { StatusBadge } from "../../components/StatusBadge";
import { CapacityGauge } from "../../components/CapacityGauge";
import { Button } from "../../components/buttons/Button";
import { FilterChipRow } from "../../components/FilterChipRow";
import { matchSuggestions } from "../../lib/mockData/matches";
import { colors, typography, spacing } from "../../theme/tokens";

export default function OpsMatching() {
  return (
    <ScreenContainer roleLabel="Ops Matching">
      <Text style={[typography.headlineLgMobile, { color: colors.onSurface }]}>Storage Matching</Text>
      <FilterChipRow options={["Location", "Capacity", "Species"]} />

      {matchSuggestions.map(({ request, suggestedNode }, i) => {
        const capacityPercent = Math.round(
          ((suggestedNode.capacityTotalKg - suggestedNode.capacityAvailableKg) / suggestedNode.capacityTotalKg) * 100
        );
        const isCritical = suggestedNode.status === "reserved" || capacityPercent >= 85;

        return (
          <Card key={`${request.id}-${suggestedNode.id}-${i}`} style={styles.matchCard}>
            <View style={styles.side}>
              <Text style={[typography.labelSm, styles.eyebrow]}>SUPPLIER REQUEST</Text>
              <View style={styles.rowBetween}>
                <Text style={[typography.titleMd, { color: colors.onSurface }]}>{request.supplierName}</Text>
                <StatusBadge status={request.status} />
              </View>
              <View style={styles.statGrid}>
                <View style={styles.statBox}>
                  <Text style={[typography.labelSm, styles.statLabel]}>Species</Text>
                  <View style={styles.iconTextRow}>
                    <MaterialIcons name="set-meal" size={16} color={colors.secondary} />
                    <Text style={[typography.bodyLg, styles.statValue]}>{request.species}</Text>
                  </View>
                </View>
                <View style={styles.statBox}>
                  <Text style={[typography.labelSm, styles.statLabel]}>Volume</Text>
                  <Text style={[typography.bodyLg, { color: colors.onSurface }]}>
                    {request.weightKg.toLocaleString()} kg
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.side}>
              <Text style={[typography.labelSm, styles.eyebrow]}>SUGGESTED NODE</Text>
              <View style={styles.iconTextRow}>
                <Text style={[typography.titleMd, { color: colors.onSurface }]}>{suggestedNode.name}</Text>
                {suggestedNode.verified && <MaterialIcons name="verified" size={18} color={colors.tertiaryContainer} />}
              </View>
              <View style={[styles.iconTextRow, { marginBottom: spacing.sm }]}>
                <MaterialIcons name="route" size={16} color={colors.onSurfaceVariant} />
                <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant }]}>
                  {suggestedNode.distanceKm} km away
                </Text>
              </View>
              <View style={{ marginBottom: spacing.md }}>
                <View style={styles.capacityLabelRow}>
                  <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>Available Capacity</Text>
                  <Text style={[typography.labelSm, { color: isCritical ? colors.error : colors.secondary, fontWeight: "700" }]}>
                    {suggestedNode.capacityAvailableKg.toLocaleString()} kg{isCritical ? " (Critical)" : ""}
                  </Text>
                </View>
                <CapacityGauge percent={capacityPercent} usedLabel="" totalLabel="" barColor={colors.iceBright} />
              </View>
              <Button label="Match Now" onPress={() => {}} />
            </View>
          </Card>
        );
      })}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  matchCard: { gap: spacing.md },
  side: { gap: spacing.xs },
  eyebrow: { color: colors.outline, textTransform: "uppercase", letterSpacing: 1 },
  rowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  statGrid: { flexDirection: "row", gap: spacing.sm, marginTop: spacing.xs },
  statBox: { flex: 1, backgroundColor: colors.surfaceContainerLow, borderRadius: 8, padding: spacing.sm },
  statLabel: { color: colors.onSurfaceVariant, marginBottom: 4 },
  statValue: { color: colors.onSurface, fontWeight: "600" },
  iconTextRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  divider: { height: 1, backgroundColor: colors.surfaceContainerHigh },
  capacityLabelRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
});
