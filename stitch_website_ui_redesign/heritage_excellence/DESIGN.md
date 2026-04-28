---
name: Heritage Excellence
colors:
  surface: '#fbf9f8'
  surface-dim: '#dbd9d9'
  surface-bright: '#fbf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f3'
  surface-container: '#efeded'
  surface-container-high: '#eae8e7'
  surface-container-highest: '#e4e2e2'
  on-surface: '#1b1c1c'
  on-surface-variant: '#44474d'
  inverse-surface: '#303030'
  inverse-on-surface: '#f2f0f0'
  outline: '#75777e'
  outline-variant: '#c5c6cd'
  surface-tint: '#515f78'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#0d1c32'
  on-primary-container: '#76849f'
  inverse-primary: '#b9c7e4'
  secondary: '#775a19'
  on-secondary: '#ffffff'
  secondary-container: '#fed488'
  on-secondary-container: '#785a1a'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#191c1d'
  on-tertiary-container: '#828485'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#b9c7e4'
  on-primary-fixed: '#0d1c32'
  on-primary-fixed-variant: '#39475f'
  secondary-fixed: '#ffdea5'
  secondary-fixed-dim: '#e9c176'
  on-secondary-fixed: '#261900'
  on-secondary-fixed-variant: '#5d4201'
  tertiary-fixed: '#e1e3e4'
  tertiary-fixed-dim: '#c5c7c8'
  on-tertiary-fixed: '#191c1d'
  on-tertiary-fixed-variant: '#454748'
  background: '#fbf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e2'
typography:
  display-xl:
    fontFamily: Akony
    fontSize: 64px
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Akony
    fontSize: 40px
    fontWeight: '400'
    lineHeight: '1.2'
    letterSpacing: 0.01em
  headline-md:
    fontFamily: Akony
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.3'
  body-lg:
    fontFamily: manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.7'
  body-md:
    fontFamily: manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: manrope
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: 0.15em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 32px
  section-padding: 120px
  stack-sm: 16px
  stack-md: 32px
  stack-lg: 64px
---

## Brand & Style

This design system is anchored in the concept of "Architectural Confidence." It targets high-net-worth individuals and corporate entities in Coimbatore looking for uncompromising quality in construction. The aesthetic leans heavily into **Modern Minimalism** with a **Corporate/Luxury** finish, evoking the same emotional response as a high-end heritage hotel or a premium real estate gallery.

The interface prioritizes breathtaking imagery of finished structures, framed by generous white space to allow the craftsmanship to breathe. The vibe is quiet, stable, and prestigious—avoiding flashy animations in favor of purposeful, weighted transitions that suggest permanence and reliability.

## Colors

The palette is a sophisticated interplay between the depth of the sea and the warmth of precious metal. 

- **Deep Navy (#0A192F):** Used for primary headings, navigation backgrounds, and high-impact structural elements. It provides the "anchor" of the design.
- **Elegant Gold (#C5A059):** Reserved for accents, call-to-action buttons, and fine-line borders. This is a muted, metallic gold rather than a bright yellow, ensuring a "warm" rather than "loud" premium feel.
- **Paper White (#FDFDFD):** The primary background color to ensure the "clean white space" requested.
- **Warm Grey (#4A4A4A):** Used for body copy to reduce harsh contrast against the white background, maintaining a softer, more inviting read.

## Typography

This design system utilizes **Akony** for its distinctive, wide-set architectural character in headlines. Its geometric precision mirrors the blueprint of a well-constructed building. 

For readability and warmth, **Manrope** is used for body text and functional labels. Manrope's modern, slightly rounded grotesque qualities balance the sharpness of Akony, providing a trustworthy and approachable feel for long-form content about project details and company philosophy. 

All caps "Label-caps" should be used for section eyebrows (e.g., "CURRENT PROJECTS") to establish a clear hierarchy.

## Layout & Spacing

The layout follows a **Fixed Grid** model to maintain a controlled, editorial feel. We use a 12-column grid with generous 32px gutters to prevent visual clutter. 

- **Generous Margins:** Vertical spacing between major sections is set to 120px to emphasize luxury and focus.
- **Rhythmic Stacking:** Elements within a card or form use an 8px base unit. 
- **The "Breath" Principle:** No more than 60% of the screen should be occupied by dense content; the remaining 40% is dedicated to whitespace or atmospheric background imagery.

## Elevation & Depth

To maintain a "high-end" feel, this design system avoids heavy, dark shadows. Instead, it utilizes **Ambient Shadows** and **Tonal Layers**.

- **Surface Elevation:** Depth is created through extremely diffused, low-opacity shadows (Color: Navy, Opacity: 4%, Blur: 40px) that make portfolio cards appear to float slightly above the white surface.
- **Subtle Outlines:** Components like input fields or inactive cards use a 1px border in a very light grey-gold tint instead of a shadow.
- **Interactive Depth:** Upon hover, the shadow spread increases slightly, and the Gold accent border thickens, providing a tactile "pressable" response without breaking the minimalist aesthetic.

## Shapes

The shape language is **Soft (0.25rem)**. This slight rounding takes the edge off the "coldness" of construction materials like steel and glass, introducing the "warmth" requested. 

- **Cards:** Use `rounded-lg` (0.5rem) to feel substantial yet polished.
- **Buttons:** Use the standard `rounded` (0.25rem). Avoid pills, as the rectangular structure feels more architectural and grounded.
- **Images:** Architectural photography should maintain sharp corners or very minimal rounding to preserve the integrity of the building's lines.

## Components

- **Buttons:** Primary buttons are solid Deep Navy with Gold text or vice versa. They feature a "growing border" hover effect where a Gold line expands from the center bottom.
- **Sophisticated Cards:** Portfolio cards feature a full-bleed image. Information (Project Name, Location) is housed in a white overlay that slides up or appears with a subtle shadow on hover.
- **Clean Forms:** Input fields are "minimalist underline" style or very light boxes with Gold focus states. Labels are always visible in Manrope Bold (12px).
- **Portfolio Displays:** Interactive galleries should use a "Ken Burns" effect (slow zoom) on images. Navigation arrows are thin, elegant Gold lines.
- **Counters:** For "Years of Experience" or "Projects Completed," use large Akony numbers that animate upward on scroll, reinforcing the brand's confidence.
- **Detail Dividers:** Use 1px Gold horizontal lines to separate content, but only where absolutely necessary to maintain the "clean" vibe.