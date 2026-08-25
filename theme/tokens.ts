// Arctic Logistics Framework — the design system Frizko standardizes on.
// See spec-phase-1.md §2: 3 of 4 existing Stitch mockups (Buyer Marketplace,
// Ops Matching, Supplier Intake) already use these exact values; the
// Operator Dashboard mockup's stray "Teal Frost" override is not carried
// forward here.

export const colors = {
  surface: "#f6faff",
  surfaceDim: "#c2def3",
  surfaceBright: "#f6faff",
  surfaceContainerLowest: "#ffffff",
  surfaceContainerLow: "#eaf5ff",
  surfaceContainer: "#dff0ff",
  surfaceContainerHigh: "#d3ebff",
  surfaceContainerHighest: "#cbe6fc",
  onSurface: "#001e2e",
  onSurfaceVariant: "#42474f",
  inverseSurface: "#183344",
  inverseOnSurface: "#e5f2ff",
  outline: "#727780",
  outlineVariant: "#c2c7d0",
  surfaceTint: "#2f6193",
  primary: "#002c4f",
  onPrimary: "#ffffff",
  primaryContainer: "#065b98",
  onPrimaryContainer: "#82b0e7",
  inversePrimary: "#9ecaff",
  secondary: "#006878",
  onSecondary: "#ffffff",
  secondaryContainer: "#9febfe",
  onSecondaryContainer: "#0c6c7c",
  tertiary: "#002c53",
  onTertiary: "#ffffff",
  tertiaryContainer: "#004279",
  onTertiaryContainer: "#83b0ed",
  error: "#ba1a1a",
  onError: "#ffffff",
  errorContainer: "#ffdad6",
  onErrorContainer: "#93000a",
  background: "#f6faff",
  onBackground: "#001e2e",
  surfaceVariant: "#cbe6fc",
  iceBright: "#0db8d3",
  // Status badge convention, per contract.md §6 (source of truth over the
  // mockups, which didn't consistently follow it — see spec-phase-1.md §3).
  statusAvailable: "#22c55e", // green
  statusPending: "#f59e0b", // amber
  statusMatched: "#002c4f", // blue (primary)
  statusClosed: "#727780", // gray (outline)
} as const;

export const typography = {
  displayLg: { fontFamily: "PlusJakartaSans_700Bold", fontSize: 40, lineHeight: 48, letterSpacing: -0.8 },
  headlineLg: { fontFamily: "PlusJakartaSans_600SemiBold", fontSize: 32, lineHeight: 40 },
  headlineLgMobile: { fontFamily: "PlusJakartaSans_600SemiBold", fontSize: 24, lineHeight: 32 },
  titleMd: { fontFamily: "Poppins_600SemiBold", fontSize: 18, lineHeight: 24 },
  bodyLg: { fontFamily: "Poppins_400Regular", fontSize: 16, lineHeight: 24 },
  bodyMd: { fontFamily: "Poppins_400Regular", fontSize: 14, lineHeight: 20 },
  labelSm: { fontFamily: "Poppins_600SemiBold", fontSize: 12, lineHeight: 16, letterSpacing: 0.6 },
} as const;

export const spacing = {
  base: 8,
  xs: 4,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  gutter: 16,
  marginMobile: 16,
} as const;

export const radius = {
  sm: 4,
  DEFAULT: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const shadow = {
  card: {
    shadowColor: "#193546",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 2,
  },
  cardLifted: {
    shadowColor: "#193546",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 20,
    elevation: 4,
  },
} as const;
