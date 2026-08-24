import { alpha, colorReference } from "@/lib/theme";

const gradient = (from: string, to: string) => ({
  background: `linear-gradient(104deg, ${from} 0%, ${to} 100%)`,
  "-webkit-background-clip": "text",
  "background-clip": "text",
  color: "transparent",
});

export const FontColorVariables = {
  foreground: { label: "Foreground", css: { color: colorReference.foreground } },
  "foreground-soft": {
    label: "Foreground Soft",
    css: { color: alpha(colorReference.foreground, 0.8) },
  },
  muted: { label: "Muted", css: { color: colorReference.neutral[600] } },

  primary: { label: "Primary", css: { color: colorReference.primary.DEFAULT } },
  "primary-soft": {
    label: "Primary Soft",
    css: { color: alpha(colorReference.primary.DEFAULT, 0.4) },
  },
  secondary: { label: "Secondary", css: { color: colorReference.secondary.DEFAULT } },
  "secondary-soft": {
    label: "Secondary Soft",
    css: { color: alpha(colorReference.secondary.DEFAULT, 0.4) },
  },
  accent: { label: "Accent", css: { color: colorReference.accent.DEFAULT } },

  white: { label: "White", css: { color: colorReference.white } },
  "white-soft": { label: "White Soft", css: { color: alpha(colorReference.white, 0.8) } },

  gradient: {
    label: "Gradient",
    css: gradient(colorReference.secondary.DEFAULT, colorReference.primary.DEFAULT),
  },
  "gradient-dark": {
    label: "Gradient Dark",
    css: gradient(colorReference.secondary[900], colorReference.primary[700]),
  },
  "gradient-light": {
    label: "Gradient Light",
    css: gradient(colorReference.secondary[400], colorReference.primary[300]),
  },

  gold: { label: "Gold", css: { color: colorReference.warning.DEFAULT } },
  "gold-dark": { label: "Gold Dark", css: { color: colorReference.warning[700] } },
} as const;
