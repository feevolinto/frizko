import { useMemo, useState } from "react";
import { View, Text, Image, Pressable, ScrollView, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card } from "../../components/Card";
import { GradeBadge } from "../../components/GradeBadge";
import { Button } from "../../components/buttons/Button";
import { inventoryItems } from "../../lib/mockData/inventoryItems";
import { colors, typography, spacing, radius } from "../../theme/tokens";

export default function ItemDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = useMemo(() => inventoryItems.find((i) => i.id === id), [id]);
  const [quantity, setQuantity] = useState(10);
  const [requested, setRequested] = useState(false);

  if (!item) {
    return (
      <SafeAreaView style={styles.root}>
        <Text style={[typography.bodyLg, { padding: spacing.marginMobile }]}>Item not found.</Text>
      </SafeAreaView>
    );
  }

  const maxQty = item.weightAvailableKg;

  return (
    <SafeAreaView style={styles.root} edges={["top"]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={22} color={colors.onSurface} />
        </Pressable>
        <Text style={[typography.titleMd, { color: colors.onSurface }]}>Item Detail</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.imageWrap}>
          <Image source={{ uri: item.imageUrl }} style={styles.image} />
          <View style={styles.badgeWrap}>
            <GradeBadge label={item.grade} />
          </View>
        </View>

        <View style={styles.titleRow}>
          <Text style={[typography.headlineLgMobile, { color: colors.onSurface, flex: 1 }]}>
            {item.species}
            {item.variant ? ` (${item.variant})` : ""}
          </Text>
          <Text style={[typography.titleMd, { color: colors.secondary, fontWeight: "700" }]}>
            ₱{item.pricePerKg}
            <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, fontWeight: "400" }]}>/kg</Text>
          </Text>
        </View>

        <Text style={[typography.bodyLg, { color: colors.onSurfaceVariant }]}>{item.description}</Text>

        <Card style={styles.metaCard}>
          <View style={styles.metaRow}>
            <MaterialIcons name="scale" size={18} color={colors.onSurfaceVariant} />
            <Text style={[typography.bodyMd, { color: colors.onSurface }]}>
              {item.weightAvailableKg} kg available
            </Text>
          </View>
          <View style={styles.metaRow}>
            <MaterialIcons name="location-on" size={18} color={colors.onSurfaceVariant} />
            <Text style={[typography.bodyMd, { color: colors.onSurface }]}>{item.location}</Text>
          </View>
        </Card>

        <View>
          <Text style={[typography.titleMd, { color: colors.onSurface, marginBottom: spacing.sm }]}>Quantity</Text>
          <View style={styles.stepper}>
            <Pressable
              style={styles.stepperButton}
              onPress={() => setQuantity((q) => Math.max(1, q - 10))}
            >
              <MaterialIcons name="remove" size={20} color={colors.secondary} />
            </Pressable>
            <Text style={[typography.titleMd, { color: colors.onSurface }]}>{quantity} kg</Text>
            <Pressable
              style={styles.stepperButton}
              onPress={() => setQuantity((q) => Math.min(maxQty, q + 10))}
            >
              <MaterialIcons name="add" size={20} color={colors.secondary} />
            </Pressable>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        {requested ? (
          <View style={styles.confirmedRow}>
            <MaterialIcons name="check-circle" size={20} color={colors.statusAvailable} />
            <Text style={[typography.bodyLg, { color: colors.statusAvailable, fontWeight: "600" }]}>
              Request sent to seller
            </Text>
          </View>
        ) : (
          <Button label={`Request to Buy · ${quantity} kg`} onPress={() => setRequested(true)} />
        )}
      </View>
    </SafeAreaView>
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
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surfaceContainerLow,
  },
  content: { padding: spacing.marginMobile, gap: spacing.md, paddingBottom: spacing.xl },
  imageWrap: { width: "100%", height: 260, borderRadius: radius.lg, overflow: "hidden", backgroundColor: colors.surfaceVariant },
  image: { width: "100%", height: "100%" },
  badgeWrap: { position: "absolute", top: spacing.sm, left: spacing.sm },
  titleRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", gap: spacing.sm },
  metaCard: { gap: spacing.sm },
  metaRow: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: radius.DEFAULT,
    paddingHorizontal: spacing.md,
    height: 48,
  },
  stepperButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.secondaryContainer,
  },
  footer: {
    padding: spacing.marginMobile,
    borderTopWidth: 1,
    borderTopColor: colors.surfaceContainerHigh,
  },
  confirmedRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    height: 48,
  },
});
