import { ScrollView, View, StyleSheet } from "react-native";
import { TopAppBar } from "./TopAppBar";
import { colors, spacing } from "../theme/tokens";

export function ScreenContainer({
  roleLabel,
  children,
  scroll = true,
}: {
  roleLabel: string;
  children: React.ReactNode;
  scroll?: boolean;
}) {
  const Content = scroll ? ScrollView : View;
  return (
    <View style={styles.root}>
      <TopAppBar roleLabel={roleLabel} />
      <Content
        style={{ flex: 1 }}
        contentContainerStyle={scroll ? styles.scrollContent : undefined}
      >
        {children}
      </Content>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: spacing.marginMobile,
    gap: spacing.lg,
    paddingBottom: spacing.xl,
  },
});
