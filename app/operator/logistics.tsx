import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ScreenContainer } from "../../components/ScreenContainer";
import { Card } from "../../components/Card";
import { StatusBadge } from "../../components/StatusBadge";
import { CapacityGauge } from "../../components/CapacityGauge";
import { FilterChipRow } from "../../components/FilterChipRow";
import { consignments } from "../../lib/mockData/consignments";
import { colors, typography, spacing } from "../../theme/tokens";
import type { FacilityStatus } from "../../lib/types";

const FILTERS: { label: string; value: FacilityStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Available", value: "available" },
  { label: "Reserved", value: "reserved" },
  { label: "Full", value: "full" },
];

export default function OperatorIntakeLog() {
  const [filter, setFilter] = useState<FacilityStatus | "all">("all");
  const filtered = filter === "all" ? consignments : consignments.filter((c) => c.status === filter);

  return (
    <ScreenContainer roleLabel="Operator View">
      <Text style={[typography.headlineLgMobile, { color: colors.onSurface }]}>Intake Log</Text>
      <FilterChipRow
        options={FILTERS.map((f) => f.label)}
        value={FILTERS.find((f) => f.value === filter)?.label}
        onChange={(label) => setFilter(FILTERS.find((f) => f.label === label)?.value ?? "all")}
      />
      {filtered.map((c) => {
        const percentFull = Math.round((c.palletsUsed / c.palletsTotal) * 100);
        return (
          <Card key={c.id}>
            <View style={styles.top}>
              <View>
                <Text style={[typography.labelSm, styles.id]}>{c.id}</Text>
                <Text style={[typography.titleMd, { color: colors.onSurface }]}>{c.species}</Text>
              </View>
              <StatusBadge status={c.status} />
            </View>
            <View style={styles.tempRow}>
              <MaterialIcons name="thermostat" size={16} color={colors.outline} />
              <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant }]}>{c.tempRequiredC}°C Required</Text>
            </View>
            <CapacityGauge
              percent={percentFull}
              usedLabel="Volume"
              totalLabel={`${c.palletsUsed} / ${c.palletsTotal} Pallets`}
            />
          </Card>
        );
      })}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  top: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: spacing.sm },
  id: { color: colors.outline, textTransform: "uppercase" },
  tempRow: { flexDirection: "row", alignItems: "center", gap: spacing.xs, marginBottom: spacing.md },
});
