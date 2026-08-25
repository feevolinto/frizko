import { useEffect, useRef, useState } from "react";
import { Animated, View, Text, Pressable, Image, Modal, ScrollView, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { AnimatedSnowflake } from "../AnimatedSnowflake";
import { TypewriterText } from "../TypewriterText";
import { LanguagePicker } from "./LanguagePicker";
import { SupplierChatScreen } from "./SupplierChatScreen";
import { storageNodes } from "../../lib/mockData/storageNodes";
import { colors, typography, spacing, radius, shadow } from "../../theme/tokens";
import type { ChatLanguage } from "../../lib/chatStrings";
import type { StorageNode } from "../../lib/types";

// Hero tagline cycles through the app's three supplier-facing languages,
// matching the chat's own English/Tagalog/Bisaya support.
const HERO_LINES = [
  "Store, match, and\nsell your catch.",
  "Itago, itugma, at\nibenta ang iyong huli.",
  "Tipigi, i-match, ug\nibaligya ang imong kuha.",
];
const HERO_INTERVAL_MS = 3400;
const HERO_FADE_MS = 450;

function useCyclingHeroLine() {
  const [index, setIndex] = useState(0);
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const id = setInterval(() => {
      Animated.timing(opacity, { toValue: 0, duration: HERO_FADE_MS, useNativeDriver: true }).start(() => {
        setIndex((i) => (i + 1) % HERO_LINES.length);
        Animated.timing(opacity, { toValue: 1, duration: HERO_FADE_MS, useNativeDriver: true }).start();
      });
    }, HERO_INTERVAL_MS);
    return () => clearInterval(id);
  }, [opacity]);

  return { line: HERO_LINES[index], opacity };
}

// Layout follows design/landing_cold_storage_finder/ (Stitch export) — hero
// + conversational search card + nearby facilities feed — re-skinned onto
// Frizko's standard Arctic Logistics Framework tokens instead of that
// export's one-off Teal Frost palette, to stay consistent with the rest of
// the app (see spec-phase-1.md §2).

export function SupplierHomeScreen() {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<ChatLanguage | null>(null);
  const [showAllFacilities, setShowAllFacilities] = useState(false);
  const { line: heroLine, opacity: heroOpacity } = useCyclingHeroLine();

  const openChat = () => setIsOpen(true);
  const closeChat = () => {
    setIsOpen(false);
    setLanguage(null);
  };

  const facilities = storageNodes.slice(0, showAllFacilities ? undefined : 2);

  return (
    <SafeAreaView style={styles.root} edges={["top"]}>
      <View style={styles.header}>
        <AnimatedSnowflake size={24} color={colors.primary} spinning durationMs={6000} />
        <Text style={[typography.labelSm, styles.headerWordmark]}>Frizko</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.hero}>
          <Animated.Text style={[typography.headlineLgMobile, styles.heroTitle, { opacity: heroOpacity }]}>
            {heroLine}
          </Animated.Text>
          <Text style={[typography.bodyLg, styles.heroSubtitle]}>Find a cold storage near you.</Text>

          <View style={styles.searchCard}>
            <Pressable onPress={openChat} style={styles.searchRow}>
              <AnimatedSnowflake size={20} color={colors.primary} spinning durationMs={4000} />
              <TypewriterText
                text="Yellowfin tuna 500kg"
                style={[typography.bodyMd, styles.searchPlaceholder]}
                cursorColor={colors.outline}
              />
            </Pressable>

            <View style={styles.chatNowRow}>
              <ChatNowButton onPress={openChat} />
            </View>
          </View>

          <Text style={[typography.labelSm, styles.poweredBy]}>Powered by Frizko AI</Text>
        </View>

        <View style={styles.facilitiesSection}>
          <View style={styles.facilitiesHeader}>
            <View>
              <Text style={[typography.titleMd, { color: colors.primary }]}>Available Facilities</Text>
              <Text style={[typography.bodyMd, { color: colors.outline }]}>Based on your current location</Text>
            </View>
            {storageNodes.length > 2 && (
              <Pressable onPress={() => setShowAllFacilities((v) => !v)} style={styles.seeAllRow}>
                <Text style={[typography.labelSm, styles.seeAllLabel]}>{showAllFacilities ? "Show less" : "See all"}</Text>
                <MaterialIcons
                  name={showAllFacilities ? "expand-less" : "chevron-right"}
                  size={16}
                  color={colors.secondary}
                />
              </Pressable>
            )}
          </View>

          {facilities.map((node) => (
            <FacilityCard key={node.id} node={node} onBookNow={openChat} />
          ))}
        </View>
      </ScrollView>

      <Modal visible={isOpen} animationType="slide" onRequestClose={closeChat} presentationStyle="pageSheet">
        {language ? (
          <SupplierChatScreen language={language} onClose={closeChat} />
        ) : (
          <LanguagePicker onSelect={setLanguage} onClose={closeChat} />
        )}
      </Modal>
    </SafeAreaView>
  );
}

function ChatNowButton({ onPress }: { onPress: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Pressable
      onPress={onPress}
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
      style={({ pressed }) => [
        styles.chatNowButton,
        hovered && styles.chatNowButtonHovered,
        pressed && styles.chatNowButtonPressed,
      ]}
    >
      <MaterialIcons name="chat-bubble" size={13} color={colors.onPrimary} />
      <Text style={[typography.labelSm, styles.chatNowLabel]}>Chat Now</Text>
    </Pressable>
  );
}

function FacilityCard({ node, onBookNow }: { node: StorageNode; onBookNow: () => void }) {
  const [saved, setSaved] = useState(false);

  return (
    <View style={styles.facilityCard}>
      <View style={styles.facilityImageWrap}>
        <Image source={{ uri: node.imageUrl }} style={styles.facilityImage} />
        <View style={styles.ratingBadge}>
          <MaterialIcons name="star" size={14} color={colors.statusPending} />
          <Text style={[typography.labelSm, { color: colors.onSurface, fontWeight: "700" }]}>{node.rating}</Text>
        </View>
        <Pressable onPress={() => setSaved((v) => !v)} style={styles.favoriteButton}>
          <MaterialIcons name={saved ? "favorite" : "favorite-border"} size={18} color={saved ? colors.error : colors.outline} />
        </Pressable>
      </View>

      <View style={styles.facilityBody}>
        <Text style={[typography.titleMd, { color: colors.primary }]}>{node.name}</Text>
        <View style={styles.facilityLocationRow}>
          <MaterialIcons name="location-on" size={16} color={colors.outline} />
          <Text style={[typography.bodyMd, { color: colors.outline, fontSize: 12 }]}>
            {node.distanceKm} km · {node.areaLabel}
          </Text>
        </View>

        <View style={styles.statRow}>
          <View style={styles.statBox}>
            <Text style={[typography.labelSm, styles.statLabel]}>TEMP RANGE</Text>
            <Text style={[typography.bodyMd, styles.statValue]}>{node.tempRangeLabel}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={[typography.labelSm, styles.statLabel]}>AVAILABLE CAP</Text>
            <Text style={[typography.bodyMd, styles.statValue]}>{node.availablePallets.toLocaleString()} Pallets</Text>
          </View>
        </View>

        <View style={styles.footerRow}>
          <View>
            <Text style={[typography.labelSm, { color: colors.outline }]}>Starting at</Text>
            <Text style={[typography.titleMd, { color: colors.primary }]}>
              ₱{node.pricePerPalletPhp.toLocaleString()}
              <Text style={[typography.bodyMd, { color: colors.outlineVariant, fontWeight: "400", fontSize: 12 }]}>
                /pallet/mo
              </Text>
            </Text>
          </View>
          <Pressable onPress={onBookNow} style={styles.bookButton}>
            <Text style={[typography.labelSm, { color: colors.onSecondary }]}>Book Now</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceContainerHigh,
  },
  headerWordmark: { color: colors.primary, fontWeight: "700", fontSize: 16 },
  scroll: { paddingBottom: spacing.xl },
  hero: { alignItems: "center", paddingHorizontal: spacing.marginMobile, paddingTop: spacing.lg },
  heroTitle: { color: colors.primary, textAlign: "center", fontFamily: "PlusJakartaSans_700Bold" },
  heroSubtitle: { color: colors.onSurfaceVariant, textAlign: "center", marginTop: spacing.xs, marginBottom: spacing.lg },
  searchCard: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.85)",
    borderRadius: radius.xl + 8,
    padding: spacing.md,
    gap: spacing.md,
    ...shadow.cardLifted,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: radius.xl,
    paddingHorizontal: spacing.md,
    height: 52,
  },
  searchPlaceholder: { flex: 1, color: colors.outline },
  chatNowRow: { alignItems: "center" },
  chatNowButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: 12,
    borderRadius: radius.full,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  chatNowButtonHovered: {
    backgroundColor: colors.primaryContainer,
    transform: [{ translateY: -1 }],
    shadowOpacity: 0.45,
    shadowRadius: 10,
  },
  chatNowButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.96 }],
    shadowOpacity: 0.2,
  },
  chatNowLabel: { color: colors.onPrimary, fontWeight: "700" },
  poweredBy: { color: colors.outline, marginTop: spacing.md, letterSpacing: 0.5 },
  facilitiesSection: { paddingHorizontal: spacing.marginMobile, marginTop: spacing.xl, gap: spacing.md },
  facilitiesHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" },
  seeAllRow: { flexDirection: "row", alignItems: "center", gap: 2 },
  seeAllLabel: { color: colors.secondary, fontWeight: "600" },
  facilityCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radius.lg,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.surfaceContainerHigh,
    ...shadow.card,
  },
  facilityImageWrap: { width: "100%", height: 160, backgroundColor: colors.surfaceVariant },
  facilityImage: { width: "100%", height: "100%" },
  ratingBadge: {
    position: "absolute",
    top: spacing.sm,
    left: spacing.sm,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(255,255,255,0.9)",
    paddingHorizontal: spacing.xs + 2,
    paddingVertical: 4,
    borderRadius: radius.DEFAULT,
  },
  favoriteButton: {
    position: "absolute",
    top: spacing.sm,
    right: spacing.sm,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.85)",
  },
  facilityBody: { padding: spacing.md, gap: spacing.xs },
  facilityLocationRow: { flexDirection: "row", alignItems: "center", gap: 4, marginBottom: spacing.xs },
  statRow: { flexDirection: "row", gap: spacing.sm, marginBottom: spacing.sm },
  statBox: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: radius.DEFAULT,
    padding: spacing.sm,
  },
  statLabel: { color: colors.outline, fontSize: 10, marginBottom: 2 },
  statValue: { color: colors.onSurface, fontWeight: "600", fontSize: 13 },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.surfaceContainerHigh,
  },
  bookButton: {
    backgroundColor: colors.secondary,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    borderRadius: radius.DEFAULT,
  },
});
