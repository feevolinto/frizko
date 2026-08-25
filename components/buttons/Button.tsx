import { Pressable, Text, StyleSheet, ViewStyle, PressableProps } from "react-native";
import { colors, radius, typography } from "../../theme/tokens";

type Variant = "primary" | "secondary" | "tertiary";

interface Props extends PressableProps {
  label: string;
  variant?: Variant;
  style?: ViewStyle;
}

export function Button({ label, variant = "primary", style, ...props }: Props) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.base,
        variantStyles[variant],
        pressed && { opacity: 0.85 },
        style,
      ]}
      {...props}
    >
      <Text style={[typography.titleMd, textVariantStyles[variant]]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 48,
    borderRadius: radius.DEFAULT * 2,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
});

const variantStyles: Record<Variant, ViewStyle> = {
  primary: { backgroundColor: colors.secondary },
  secondary: {
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  tertiary: { backgroundColor: "transparent" },
};

const textVariantStyles = StyleSheet.create({
  primary: { color: colors.onSecondary },
  secondary: { color: colors.secondary },
  tertiary: { color: colors.onSurfaceVariant },
});
