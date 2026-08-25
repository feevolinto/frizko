import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ScreenContainer } from "../ScreenContainer";
import { Card } from "../Card";
import { GradeBadge } from "../GradeBadge";
import { Button } from "../buttons/Button";
import { FilterChipRow } from "../FilterChipRow";
import { inventoryItems } from "../../lib/mockData/inventoryItems";
import { colors, typography, spacing } from "../../theme/tokens";

export function MarketplaceScreen({ roleLabel }: { roleLabel: string }) {
  return (
    <ScreenContainer roleLabel={roleLabel}>
      <View>
        <Text style={[typography.headlineLgMobile, styles.title]}>Buyer Marketplace</Text>
        <Text style={[typography.bodyMd, styles.subtitle]}>
          Available consigned inventory across GenSan cold storage nodes.
        </Text>
      </View>
      <FilterChipRow options={["All Seafood", "Tuna (Yellowfin)", "Marlin", "Grade A+"]} />
      <View style={styles.grid}>
        {inventoryItems.map((item) => (
          <Pressable key={item.id} onPress={() => router.push(`/item/${item.id}`)} style={styles.cardWrap}>
            <Card style={styles.card}>
              <View style={styles.imageWrap}>
                <Image source={{ uri: item.imageUrl }} style={styles.image} />
                <View style={styles.badgeWrap}>
                  <GradeBadge label={item.grade} />
                </View>
              </View>
              <View style={styles.body}>
                <View style={styles.headerRow}>
                  <Text style={[typography.titleMd, styles.name]} numberOfLines={1}>
                    {item.species}
                    {item.variant ? ` (${item.variant})` : ""}
                  </Text>
                  <Text style={[typography.titleMd, styles.price]}>
                    ₱{item.pricePerKg}
                    <Text style={[typography.bodyMd, styles.priceUnit]}>/kg</Text>
                  </Text>
                </View>
                <Text style={[typography.bodyMd, styles.description]} numberOfLines={2}>
                  {item.description}
                </Text>
                <View style={styles.metaRow}>
                  <MaterialIcons name="scale" size={16} color={colors.onSurfaceVariant} />
                  <Text style={[typography.bodyMd, styles.metaText]}>{item.weightAvailableKg} kg available</Text>
                </View>
                <View style={styles.metaRow}>
                  <MaterialIcons name="location-on" size={16} color={colors.onSurfaceVariant} />
                  <Text style={[typography.bodyMd, styles.metaText]}>{item.location}</Text>
                </View>
                <Button label="Request to Buy" onPress={() => router.push(`/item/${item.id}`)} />
              </View>
            </Card>
          </Pressable>
        ))}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.onSurface },
  subtitle: { color: colors.onSurfaceVariant, marginTop: 4 },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.lg,
  },
  cardWrap: {
    width: "100%",
    minWidth: 260,
    flexGrow: 1,
    flexBasis: 260,
  },
  card: { padding: 0, overflow: "hidden" },
  imageWrap: { width: "100%", height: 180, backgroundColor: colors.surfaceVariant },
  image: { width: "100%", height: "100%" },
  badgeWrap: { position: "absolute", top: spacing.sm, left: spacing.sm },
  body: { padding: spacing.md, gap: spacing.xs },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", gap: spacing.sm },
  name: { color: colors.onSurface, flex: 1 },
  price: { color: colors.secondary, fontWeight: "700" },
  priceUnit: { color: colors.onSurfaceVariant, fontWeight: "400" },
  description: { color: colors.onSurfaceVariant, marginBottom: spacing.xs },
  metaRow: { flexDirection: "row", alignItems: "center", gap: spacing.xs },
  metaText: { color: colors.onSurfaceVariant },
});
