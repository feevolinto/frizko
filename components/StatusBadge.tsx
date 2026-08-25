import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors, radius, spacing, typography } from "../theme/tokens";
import type { RequestStatus, FacilityStatus } from "../lib/types";

type Status = RequestStatus | FacilityStatus;

const STATUS_MAP: Record<
  Status,
  { label: string; color: string; icon: keyof typeof MaterialIcons.glyphMap }
> = {
  available: { label: "Available", color: colors.statusAvailable, icon: "check-circle" },
  pending: { label: "Pending", color: colors.statusPending, icon: "schedule" },
  matched: { label: "Matched", color: colors.statusMatched, icon: "link" },
  reserved: { label: "Reserved", color: colors.statusPending, icon: "schedule" },
  stored: { label: "Stored", color: colors.statusMatched, icon: "inventory-2" },
  full: { label: "Full", color: colors.statusClosed, icon: "block" },
};

export function StatusBadge({ status, label }: { status: Status; label?: string }) {
  const meta = STATUS_MAP[status];
  return (
    <View style={[styles.badge, { backgroundColor: `${meta.color}26` }]}>
      <MaterialIcons name={meta.icon} size={12} color={meta.color} />
      <Text style={[typography.labelSm, styles.text, { color: meta.color }]}>
        {label ?? meta.label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.full,
    alignSelf: "flex-start",
  },
  text: {
    fontWeight: "600",
  },
});
