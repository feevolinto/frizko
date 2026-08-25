import { View, Text, StyleSheet } from "react-native";
import { ScreenContainer } from "../../components/ScreenContainer";
import { Card } from "../../components/Card";
import { StatusBadge } from "../../components/StatusBadge";
import { buyerOrders } from "../../lib/mockData/buyerOrders";
import { colors, typography, spacing } from "../../theme/tokens";

export default function BuyerOrders() {
  return (
    <ScreenContainer roleLabel="Buyer View">
      <Text style={[typography.headlineLgMobile, { color: colors.onSurface }]}>My Requests</Text>
      {buyerOrders.length === 0 && (
        <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant }]}>
          No requests yet — browse the marketplace to request a consignment.
        </Text>
      )}
      {buyerOrders.map((order) => (
        <Card key={order.id} style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={[typography.titleMd, { color: colors.onSurface }]}>{order.itemName}</Text>
            <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant }]}>{order.quantityKg} kg requested</Text>
          </View>
          <StatusBadge status={order.status} />
        </Card>
      ))}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: spacing.md },
});
