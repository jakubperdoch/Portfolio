import { colorReference } from '@/lib/theme'

export const FontColorVariables = {
  primary: { label: 'Primary', css: { color: colorReference.primary.DEFAULT } },
  'primary-light': {
    label: 'Primary Light',
    css: { color: colorReference.primary.DEFAULT + '66' },
  },
  secondary: { label: 'Secondary', css: { color: colorReference.secondary.DEFAULT } },
  'secondary-light': {
    label: 'Secondary Light',
    css: { color: colorReference.secondary.DEFAULT + '66' },
  },
  white: { label: 'White', css: { color: colorReference.white } },
  'white-light': { label: 'White Light', css: { color: colorReference.white + 'cc' } },
  foreground: { label: 'Foreground', css: { color: colorReference.foreground } },
  'foreground-light': {
    label: 'Foreground Light',
    css: { color: colorReference.foreground + 'CC' },
  },

  gradient: {
    label: 'Gradient',
    css: {
      background: `linear-gradient(104deg, ${colorReference.secondary.DEFAULT} 0%, ${colorReference.primary.DEFAULT} 100%)`,
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      color: 'transparent',
    },
  },
  'gradient-dark': {
    label: 'Gradient Dark',
    css: {
      background: `linear-gradient(104deg, color-mix(in oklab, ${colorReference.secondary.DEFAULT}, black 10%) 0%, color-mix(in oklab, ${colorReference.primary.DEFAULT}, black 10%) 100%)`,
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      color: 'transparent',
    },
  },
  'gradient-light': {
    label: 'Gradient Light',
    css: {
      background: `linear-gradient(104deg, color-mix(in oklab, ${colorReference.secondary.DEFAULT}, white 35%) 0%, color-mix(in oklab, ${colorReference.primary.DEFAULT}, white 35%) 100%)`,
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      color: 'transparent',
    },
  },

  gold: { label: 'Gold', css: { color: colorReference.warning.DEFAULT } },
  'gold-dark': { label: 'Gold Dark', css: { color: colorReference.warning[700] } },
} as const
