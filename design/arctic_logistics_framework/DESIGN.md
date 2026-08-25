---
name: Arctic Logistics Framework
colors:
  surface: '#f6faff'
  surface-dim: '#c2def3'
  surface-bright: '#f6faff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eaf5ff'
  surface-container: '#dff0ff'
  surface-container-high: '#d3ebff'
  surface-container-highest: '#cbe6fc'
  on-surface: '#001e2e'
  on-surface-variant: '#42474f'
  inverse-surface: '#183344'
  inverse-on-surface: '#e5f2ff'
  outline: '#727780'
  outline-variant: '#c2c7d0'
  surface-tint: '#2f6193'
  primary: '#002c4f'
  on-primary: '#ffffff'
  primary-container: '#065b98'
  on-primary-container: '#82b0e7'
  inverse-primary: '#9ecaff'
  secondary: '#006878'
  on-secondary: '#ffffff'
  secondary-container: '#5ae3ff'
  on-secondary-container: '#0c6c7c'
  tertiary: '#002c53'
  on-tertiary: '#ffffff'
  tertiary-container: '#004279'
  on-tertiary-container: '#83b0ed'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d1e4ff'
  primary-fixed-dim: '#9ecaff'
  on-primary-fixed: '#001d36'
  on-primary-fixed-variant: '#0d4979'
  secondary-fixed: '#a6eeff'
  secondary-fixed-dim: '#86d2e4'
  on-secondary-fixed: '#001f25'
  on-secondary-fixed-variant: '#004e5b'
  tertiary-fixed: '#d3e3ff'
  tertiary-fixed-dim: '#a3c9ff'
  on-tertiary-fixed: '#001c39'
  on-tertiary-fixed-variant: '#0d487f'
  background: '#f6faff'
  on-background: '#001e2e'
  surface-variant: '#cbe6fc'
  ice-bright: '#0db8d3'
  safe-green: '#22c55e'
  warning-amber: '#f59e0b'
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

This design system is engineered for the cold chain industry, merging the utilitarian efficiency of a logistics powerhouse with the approachability of a high-end consumer travel app. It prioritizes clarity, reliability, and speed of recognition.

The aesthetic follows a **Corporate / Modern** style with a focus on softness and clarity. It utilizes generous whitespace to reduce cognitive load for field operators while maintaining a high-density information architecture for back-office dispatchers. The tone is professional yet welcoming, replacing clinical coldness with a "cool and fresh" atmosphere that signifies temperature-controlled integrity.

## Colors

The palette is derived from "Arctic Depths," utilizing a tiered blue system to represent different levels of information hierarchy and temperature safety.

- **Primary (#004373):** Used for core navigation and primary actions to establish trust.
- **Secondary (#006878):** Used for active states and secondary brand elements.
- **Ice-Bright (#0DB8D3):** Used for data visualizations and progress indicators.
- **Surface & Background:** The base is light, utilizing subtle cool-grey washes and tinted containers to separate content blocks without using heavy lines.

## Typography

This design system uses **Plus Jakarta Sans** for headlines to provide a modern, welcoming, and slightly soft personality. **Poppins** is utilized for all functional text, body copy, and labels to ensure geometric clarity and legibility, especially for drivers and warehouse staff using mobile devices in varying light conditions.

- **Contrast:** High contrast between titles (Dark Neutral) and body text (Mid-Grey/On-Surface Variant) is mandatory for outdoor readability.
- **Status Text:** Always uses `label-sm` with a semi-bold weight to ensure status chips are glanceable.

## Layout & Spacing

The layout employs a **Fluid Grid** system with a focus on "Tap-First" architecture. 

- **Mobile:** 4-column layout with 16px margins. Primary interaction points must have a minimum height of 48px for field use.
- **Desktop:** 12-column layout with 40px margins. Dashboard views use a side-navigation pattern to maximize horizontal space for data tables and maps.
- **Rhythm:** An 8px base grid ensures consistent vertical rhythm. Use 24px (lg) spacing between cards and 16px (md) for internal container padding.

## Elevation & Depth

To maintain a clean feel, the system uses **Tonal Layers** supplemented by **Ambient Shadows**.

- **Level 0 (Background):** #F6FAFF — Main canvas.
- **Level 1 (Cards):** #FFFFFF — Pure white surfaces with a soft, diffused shadow (0px 4px 20px rgba(25, 53, 70, 0.05)).
- **Level 2 (Modals):** #FFFFFF — Higher elevation with defined shadows (0px 8px 30px rgba(25, 53, 70, 0.12)).
- **Interaction:** On hover, interactive cards should lift slightly via increased shadow spread or a subtle 1px border.

## Shapes

The shape language is **Rounded**. This softens the industrial nature of logistics data, making the platform feel like a modern service tool.

- **Standard Elements:** Buttons and inputs use a 0.5rem (8px) radius.
- **Large Containers:** Cards use a 1rem (16px) radius for better visual containment.
- **Status Badges:** Use a fully rounded (pill) shape to distinguish them from interactive buttons.

## Components

### Buttons
- **Primary:** Solid #004373 with white text. High-contrast, rounded-lg.
- **Secondary:** White background with #004373 border and text.
- **Tertiary:** Ghost style, text only, for "Cancel" or neutral actions.

### Status Badges (Chips)
- **Structure:** Soft colored background (15% opacity) with high-contrast text of the same hue.
- **Design:** Pill-shaped, semi-bold Poppins, 12px. Icons should be included for critical states (e.g., a "Clock" for Pending).

### Cards
- **Logistics Card:** Contains a header with a Status Badge, a central section for "Origin → Destination," and a footer for capacity indicators.
- **Padding:** Internal padding should be 16px or 20px.

### Input Fields
- **Design:** 48px height, 8px border-radius. Labels are always visible above the field for accessibility.

### Large Tap Targets
- Navigable list items must include a chevron-right accessory and utilize the full width of the screen on mobile to ensure ease of use for field workers in high-motion environments.