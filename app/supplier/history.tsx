import { View, Text, StyleSheet } from "react-native";
import { ScreenContainer } from "../../components/ScreenContainer";
import { Card } from "../../components/Card";
import { StatusBadge } from "../../components/StatusBadge";
import { supplierRequests } from "../../lib/mockData/supplierRequests";
import { colors, typography, spacing } from "../../theme/tokens";

export default function SupplierHistory() {
  const myRequests = supplierRequests.filter((r) => r.supplierName === "You");

  return (
    <ScreenContainer roleLabel="Supplier View">
      <Text style={[typography.headlineLgMobile, { color: colors.onSurface }]}>Request History</Text>
      {myRequests.map((req) => (
        <Card key={req.id} style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={[typography.titleMd, { color: colors.onSurface }]}>{req.species}</Text>
            <Text style={[typography.bodyMd, styles.meta]}>
              {req.weightKg} kg · {req.location}
            </Text>
            <Text style={[typography.labelSm, styles.date]}>
              {new Date(req.createdAt).toLocaleDateString("en-PH", { month: "short", day: "numeric" })}
            </Text>
          </View>
          <StatusBadge status={req.status} />
        </Card>
      ))}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: spacing.md },
  meta: { color: colors.onSurfaceVariant, marginTop: 2 },
  date: { color: colors.outline, marginTop: 4 },
});
