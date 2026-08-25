import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ScreenContainer } from "../ScreenContainer";
import { Card } from "../Card";
import { Button } from "../buttons/Button";
import { colors, typography, spacing } from "../../theme/tokens";

export function ProfileScreen({ roleLabel, name }: { roleLabel: string; name: string }) {
  return (
    <ScreenContainer roleLabel={roleLabel} scroll={false}>
      <View style={styles.wrap}>
        <View style={styles.avatar}>
          <MaterialIcons name="person" size={40} color={colors.onSecondaryContainer} />
        </View>
        <Text style={[typography.titleMd, { color: colors.onSurface }]}>{name}</Text>
        <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant, marginBottom: spacing.lg }]}>
          {roleLabel} · General Santos City
        </Text>
        <Card style={{ width: "100%" }}>
          <Text style={[typography.bodyMd, { color: colors.onSurfaceVariant }]}>
            Account settings, verification, and support are out of scope for the Phase 1 pilot build.
          </Text>
        </Card>
        <Button
          label="Switch Role"
          variant="secondary"
          style={{ marginTop: spacing.lg, width: "100%" }}
          onPress={() => router.replace("/")}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    alignItems: "center",
    padding: spacing.marginMobile,
    paddingTop: spacing.xl,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.secondaryContainer,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
});
