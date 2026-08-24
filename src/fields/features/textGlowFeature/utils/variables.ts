import { colorReference, rgba } from "@/lib/theme";

const glow = (hex: string, intensity = 1) => ({
  "text-shadow": [
    `0 0 4px ${rgba(hex, 0.6 * intensity)}`,
    `0 0 10px ${rgba(hex, 0.4 * intensity)}`,
    `0 0 20px ${rgba(hex, 0.2 * intensity)}`,
  ].join(", "),
});

const gradientGlow = (from: string, to: string) => ({
  filter: `drop-shadow(0 0 6px ${rgba(from, 0.5)}) drop-shadow(0 0 12px ${rgba(to, 0.4)})`,
});

export const TextGlowVariables = {
  primary: { label: "Primary", css: glow(colorReference.primary.DEFAULT) },
  secondary: { label: "Secondary", css: glow(colorReference.secondary.DEFAULT) },
  accent: { label: "Accent", css: glow(colorReference.accent.DEFAULT) },

  foreground: { label: "Foreground", css: glow(colorReference.foreground, 0.8) },
  "foreground-soft": { label: "Foreground Soft", css: glow(colorReference.foreground, 0.5) },

  white: { label: "White", css: glow(colorReference.white) },
  "white-soft": { label: "White Soft", css: glow(colorReference.white, 0.6) },

  gradient: {
    label: "Gradient",
    css: gradientGlow(colorReference.secondary.DEFAULT, colorReference.primary.DEFAULT),
  },
  "gradient-dark": {
    label: "Gradient Dark",
    css: gradientGlow(colorReference.secondary[900], colorReference.primary[700]),
  },
  "gradient-light": {
    label: "Gradient Light",
    css: gradientGlow(colorReference.secondary[400], colorReference.primary[300]),
  },

  gold: { label: "Gold", css: glow(colorReference.warning.DEFAULT) },
  "gold-dark": { label: "Gold Dark", css: glow(colorReference.warning[700]) },
} as const;
