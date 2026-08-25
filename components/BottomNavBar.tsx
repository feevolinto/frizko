import { View, Text, Pressable, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, typography, spacing, radius } from "../theme/tokens";

const ICON_MAP: Record<string, keyof typeof MaterialIcons.glyphMap> = {
  index: "dashboard",
  home: "dashboard",
  history: "inventory-2",
  logistics: "inventory-2",
  "intake-log": "inventory-2",
  orders: "inventory-2",
  market: "storefront",
  profile: "person",
};

// Loosely typed on purpose: expo-router re-exports its own copy of
// @react-navigation/bottom-tabs' types, and the two don't structurally
// match (duplicate react-native type packages) — not worth fighting for a
// presentational component that only reads state/descriptors/navigation.emit.
interface BottomNavBarProps {
  state: { routes: { key: string; name: string }[]; index: number };
  descriptors: Record<string, { options: { title?: string } }>;
  navigation: {
    navigate: (name: string) => void;
    emit: (opts: any) => any;
  };
}

export function BottomNavBar({ state, descriptors, navigation }: BottomNavBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title ?? route.name;
        const isFocused = state.index === index;
        const icon = ICON_MAP[route.name] ?? "circle";

        const onPress = () => {
          const event = navigation.emit({ type: "tabPress", target: route.key, canPreventDefault: true });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable key={route.key} onPress={onPress} style={styles.tab}>
            <View style={[styles.iconWrap, isFocused && styles.iconWrapActive]}>
              <MaterialIcons
                name={icon}
                size={22}
                color={isFocused ? colors.onSecondaryContainer : colors.onSurfaceVariant}
              />
              <Text
                style={[
                  typography.labelSm,
                  { color: isFocused ? colors.onSecondaryContainer : colors.onSurfaceVariant, marginTop: 2 },
                ]}
              >
                {label}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: colors.surfaceContainerLowest,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    paddingTop: 8,
    shadowColor: "#193546",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 8,
  },
  tab: {
    flex: 1,
    alignItems: "center",
  },
  iconWrap: {
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    borderRadius: radius.full,
  },
  iconWrapActive: {
    backgroundColor: colors.secondaryContainer,
  },
});
