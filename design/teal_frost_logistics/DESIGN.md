---
name: Teal Frost Logistics
colors:
  surface: '#F2F9FA'
  surface-dim: '#d8dadb'
  surface-bright: '#f7fafb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f4f5'
  surface-container: '#E0EEF0'
  surface-container-high: '#e6e9ea'
  surface-container-highest: '#e0e3e4'
  on-surface: '#001F24'
  on-surface-variant: '#3f484b'
  inverse-surface: '#2d3132'
  inverse-on-surface: '#eef1f2'
  outline: '#6f797b'
  outline-variant: '#bec8cb'
  surface-tint: '#006878'
  primary: '#004e5b'
  on-primary: '#ffffff'
  primary-container: '#006878'
  on-primary-container: '#98e4f7'
  inverse-primary: '#86d2e4'
  secondary: '#2f6193'
  on-secondary: '#ffffff'
  secondary-container: '#99c7ff'
  on-secondary-container: '#1d5384'
  tertiary: '#004e5b'
  on-tertiary: '#ffffff'
  tertiary-container: '#006878'
  on-tertiary-container: '#7ee7ff'
  error: '#BA1A1A'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#a6eeff'
  primary-fixed-dim: '#86d2e4'
  on-primary-fixed: '#001f25'
  on-primary-fixed-variant: '#004e5b'
  secondary-fixed: '#d1e4ff'
  secondary-fixed-dim: '#9ecaff'
  on-secondary-fixed: '#001d36'
  on-secondary-fixed-variant: '#0d4979'
  tertiary-fixed: '#a7eeff'
  tertiary-fixed-dim: '#4bd7f3'
  on-tertiary-fixed: '#001f25'
  on-tertiary-fixed-variant: '#004e5b'
  background: '#f7fafb'
  on-background: '#181c1d'
  surface-variant: '#e0e3e4'
  success: '#22C55E'
  warning: '#F59E0B'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  title-md:
    fontFamily: Poppins
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Poppins
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Poppins
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-sm:
    fontFamily: Poppins
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style

This design system is engineered for the high-stakes world of cold chain logistics, balancing industrial reliability with the fluid, approachable feel of a modern SaaS platform. By pivoting to a deep teal primary, the system moves away from traditional navy "corporate" tones toward a more sophisticated, "technical-fresh" aesthetic. 

The design style is **Corporate / Modern** with a lean toward **Minimalism**. It emphasizes clarity through generous whitespace and a "cool" color temperature, ensuring that complex logistics data feels manageable and precise. The emotional response is one of calm authority—perfect for dispatchers and field operators who require high-legibility interfaces in fast-paced environments.

## Colors

The palette is anchored by a deep teal primary, which provides better visual distinction for action states than traditional blues. To harmonize with this core hue, the neutral surfaces have been shifted from pure blue-greys to "Arctic Teals"—very low-saturation teal washes that maintain a cohesive temperature across the UI.

- **Primary (#006878):** The focal point for high-priority actions and brand identity.
- **Secondary (#004373):** A deep navy used for navigation bars and structural elements to provide "weight."
- **Tertiary (#0DB8D3):** A vibrant "Ice-Bright" used sparingly for data accents and progress indicators.
- **Surface Strategy:** Backgrounds utilize `#F2F9FA` to keep the interface feeling airy. Containers and cards use subtle tonal shifts rather than heavy borders to define hierarchy.

## Typography

The system utilizes a dual-typeface strategy to separate brand expression from functional utility. **Plus Jakarta Sans** is reserved for headlines and large display text, offering a friendly, modern geometric look. **Poppins** is the workhorse typeface, used for all body text, data entries, and UI labels due to its exceptional legibility on small screens.

To ensure high accessibility for drivers in varying light conditions, maintain a high contrast ratio between `on-surface` text and container backgrounds. All status indicators must use `label-sm` in semi-bold to ensure they remain glanceable at a distance.

## Layout & Spacing

This design system uses a **Fluid Grid** with an 8px base unit to ensure consistent vertical and horizontal rhythm. 

- **Desktop (12-column):** Uses a fixed side-navigation rail (240px) with a fluid content area. Margins are set to 40px to give data-heavy tables room to breathe.
- **Mobile (4-column):** Focuses on a "Tap-First" architecture. Interactive elements must span at least 48px in height. Margins are 16px to maximize horizontal real estate.
- **Gutter Strategy:** A consistent 16px gutter is used between cards to maintain a clean "stacked" look on mobile and a structured grid on desktop.

## Elevation & Depth

Hierarchy is established primarily through **Tonal Layers**—using different shades of teal-tinted neutrals to stack information. **Ambient Shadows** are used sparingly to indicate interactivity.

- **Background:** Uses the lightest surface tint (#F2F9FA) to create a sense of vast space.
- **Cards/Containers:** Elevated slightly with pure white (#FFFFFF) backgrounds and a soft, diffused shadow: `0px 4px 20px rgba(0, 104, 120, 0.08)`. The shadow is slightly tinted with the primary teal to feel more natural.
- **Floating Actions/Modals:** Higher elevation with a more pronounced shadow to focus the user's attention on the task at hand.

## Shapes

The shape language is **Rounded**, intended to soften the hard edges of industrial data. This makes the platform feel like a service-oriented tool rather than a rigid database.

- **Standard Elements:** Buttons, input fields, and small chips use a 0.5rem (8px) radius.
- **Large Containers:** Dashboard cards and modals use 1rem (16px) to clearly define content boundaries.
- **Functional Shapes:** Status badges use a "Pill" (full radius) to differentiate them from square-ish buttons, aiding in quick cognitive recognition of status vs. action.

## Components

### Buttons
- **Primary:** Solid Primary Teal (#006878) with white text. High prominence for the main "Next" or "Confirm" actions.
- **Secondary:** Outlined in Primary Teal with a subtle Teal-wash hover state.
- **Tertiary:** Ghost style with bold Poppins text for low-priority actions like "Cancel" or "Edit."

### Input Fields
- **Design:** 48px height with an 8px radius. Labels are positioned above the field. In error states, the border shifts to the `error` red with a 15% red background tint.

### Status Chips
- **Design:** Pill-shaped with a 15% opacity background of the status color (e.g., green for "Delivered") and high-contrast text.

### Logistics Cards
- **Structure:** Cards must feature a clear header area for tracking numbers, a body for route details, and a footer for capacity/temperature data. Internal padding should be a consistent 20px.

### Navigation
- Side navigation on desktop uses the Secondary Navy (#004373) as the background to provide a strong visual anchor, with the Primary Teal used for active state highlights.