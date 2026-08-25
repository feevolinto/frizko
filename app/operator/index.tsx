import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ScreenContainer } from "../../components/ScreenContainer";
import { Card } from "../../components/Card";
import { CapacityGauge } from "../../components/CapacityGauge";
import { StatusBadge } from "../../components/StatusBadge";
import { Button } from "../../components/buttons/Button";
import { facility, consignments, incomingRequests } from "../../lib/mockData/consignments";
import { useDynamicIncomingRequests } from "../../lib/notificationStore";
import { colors, typography, spacing, radius } from "../../theme/tokens";

export default function OperatorDashboard() {
  const percent = Math.round((facility.tonsUsed / facility.tonsTotal) * 100);
  const previewConsignments = consignments.slice(0, 2);
  const liveRequests = useDynamicIncomingRequests();
  const allIncoming = [...liveRequests, ...incomingRequests];

  return (
    <ScreenContainer roleLabel="Operator View">
      <Card>
        <View style={styles.gaugeHeader}>
          <View>
            <Text style={[typography.titleMd, { color: colors.onSurface }]}>Facility Capacity</Text>
            <Text style={[typography.bodyMd, { color: colors.outline }]}>{facility.name}</Text>
          </View>
          <MaterialIcons name="analytics" size={22} color={colors.primary} />
        </View>
        <View style={styles.percentRow}>
          <Text style={[typography.displayLg, { color: colors.primary }]}>{percent}%</Text>
          <Text style={[typography.bodyLg, styles.percentLabel]}>Utilized</Text>
        </View>
        <CapacityGauge
          percent={percent}
          usedLabel={`${facility.tonsUsed} Tons In Use`}
          totalLabel={`${facility.tonsTotal} Tons Total`}
        />
      </Card>

      <View>
        <Text style={[typography.titleMd, { color: colors.onSurface, marginBottom: spacing.sm }]}>
          Active Consignments
        </Text>
        <View style={styles.consignmentGrid}>
          {previewConsignments.map((c) => {
            const percentFull = Math.round((c.palletsUsed / c.palletsTotal) * 100);
            return (
              <Card key={c.id} style={styles.consignmentCard}>
                <View style={styles.consignmentTop}>
                  <Text style={[typography.labelSm, styles.consignmentId]}>{c.id}</Text>
                  <StatusBadge status={c.status} />
                </View>
                <Text style={[typography.titleMd, { color: colors.onSurface, marginBottom: spacing.sm }]}>
                  {c.species}
                </Text>
                <View style={styles.tempRow}>
                  <MaterialIcons name="thermostat" size={18} color={colors.outline} />
                  <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant }]}>
                    {c.tempRequiredC}°C Required
                  </Text>
                </View>
                <CapacityGauge
                  percent={percentFull}
                  usedLabel="Volume"
                  totalLabel={`${c.palletsUsed} / ${c.palletsTotal} Pallets`}
                />
              </Card>
            );
          })}
        </View>
      </View>

      <View>
        <View style={styles.incomingHeader}>
          <Text style={[typography.titleMd, { color: colors.onSurface }]}>Incoming Requests</Text>
          <View style={styles.countBadge}>
            <Text style={[typography.labelSm, { color: colors.onError }]}>{allIncoming.length}</Text>
          </View>
        </View>
        {allIncoming.map((req) => {
          const isLive = liveRequests.some((r) => r.id === req.id);
          return (
          <Card key={req.id} style={{ marginBottom: spacing.sm, borderColor: isLive ? colors.secondary : undefined }}>
            {isLive && (
              <View style={styles.newPill}>
                <MaterialIcons name="notifications-active" size={12} color={colors.onSecondary} />
                <Text style={[typography.labelSm, { color: colors.onSecondary }]}>New · via Frizko AI chat</Text>
              </View>
            )}
            <View style={styles.incomingTop}>
              <View>
                <Text style={[typography.titleMd, { color: colors.onSurface }]}>{req.requesterName}</Text>
                <Text style={[typography.bodyMd, { color: colors.outline }]}>
                  Req: {req.tons} Tons | {req.tempC}°C
                </Text>
              </View>
              <MaterialIcons name={req.icon} size={22} color={colors.primary} />
            </View>
            <View style={styles.etaRow}>
              <MaterialIcons name="schedule" size={16} color={colors.onSurfaceVariant} />
              <Text style={[typography.labelSm, { color: colors.onSurfaceVariant }]}>ETA: {req.etaLabel}</Text>
            </View>
            <View style={styles.actions}>
              <Button label="Accept" onPress={() => {}} style={{ flex: 1 }} />
              <Button label="Decline" variant="secondary" onPress={() => {}} style={{ flex: 1 }} />
            </View>
          </Card>
          );
        })}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  gaugeHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: spacing.lg },
  percentRow: { flexDirection: "row", alignItems: "flex-end", gap: spacing.sm, marginBottom: spacing.xs },
  percentLabel: { color: colors.onSurfaceVariant, paddingBottom: 4 },
  consignmentGrid: { gap: spacing.md },
  consignmentCard: {},
  consignmentTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: spacing.xs },
  consignmentId: { color: colors.outline, textTransform: "uppercase" },
  tempRow: { flexDirection: "row", alignItems: "center", gap: spacing.xs, marginBottom: spacing.md },
  incomingHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: spacing.sm },
  countBadge: {
    backgroundColor: colors.error,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  newPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    alignSelf: "flex-start",
    backgroundColor: colors.secondary,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.full,
    marginBottom: spacing.sm,
  },
  incomingTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: spacing.sm },
  etaRow: { flexDirection: "row", alignItems: "center", gap: spacing.xs, marginBottom: spacing.md },
  actions: { flexDirection: "row", gap: spacing.sm },
});
