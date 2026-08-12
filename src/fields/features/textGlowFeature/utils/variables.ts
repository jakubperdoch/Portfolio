export const TextGlowVariables = {
  primary: {
    label: 'Primary',
    css: {
      'text-shadow':
        '0 0 4px rgba(63, 119, 249, 0.6), 0 0 10px rgba(63, 119, 249, 0.4), 0 0 20px rgba(63, 119, 249, 0.2)',
    },
  },
  secondary: {
    label: 'Secondary',
    css: {
      'text-shadow':
        '0 0 4px rgba(1, 208, 156, 0.6), 0 0 10px rgba(1, 208, 156, 0.4), 0 0 20px rgba(1, 208, 156, 0.2)',
    },
  },
  white: {
    label: 'White',
    css: {
      'text-shadow':
        '0 0 4px rgba(255, 255, 255, 0.6), 0 0 10px rgba(255, 255, 255, 0.4), 0 0 20px rgba(255, 255, 255, 0.2)',
    },
  },
  'white-light': {
    label: 'White Light',
    css: {
      'text-shadow':
        '0 0 4px rgba(255, 255, 255, 0.4), 0 0 10px rgba(255, 255, 255, 0.3), 0 0 20px rgba(255, 255, 255, 0.2)',
    },
  },
  foreground: {
    label: 'Foreground',
    css: {
      'text-shadow':
        '0 0 4px rgba(35, 59, 68, 0.5), 0 0 10px rgba(35, 59, 68, 0.3), 0 0 20px rgba(35, 59, 68, 0.2)',
    },
  },
  'foreground-light': {
    label: 'Foreground Light',
    css: {
      'text-shadow':
        '0 0 4px rgba(35, 59, 68, 0.3), 0 0 10px rgba(35, 59, 68, 0.2), 0 0 20px rgba(35, 59, 68, 0.1)',
    },
  },
  gradient: {
    label: 'Gradient',
    css: {
      filter: 'drop-shadow(0 0 6px rgba(67,114,255,0.5)) drop-shadow(0 0 12px rgba(0,207,156,0.4))',
    },
  },
  'gradient-dark': {
    label: 'Gradient Dark',
    css: {
      filter: 'drop-shadow(0 0 6px rgba(45,82,193,0.5)) drop-shadow(0 0 12px rgba(0,160,120,0.4))',
    },
  },
  'gradient-light': {
    label: 'Gradient Light',
    css: {
      filter:
        'drop-shadow(0 0 6px rgba(116,151,255,0.5)) drop-shadow(0 0 12px rgba(111,255,219,0.4))',
    },
  },
  gold: {
    label: 'Gold',
    css: {
      'text-shadow':
        '0 0 4px rgba(241, 194, 92, 0.6), 0 0 10px rgba(241, 194, 92, 0.4), 0 0 20px rgba(241, 194, 92, 0.2)',
    },
  },
  'gold-dark': {
    label: 'Gold Dark',
    css: {
      'text-shadow':
        '0 0 4px rgba(189, 138, 27, 0.6), 0 0 10px rgba(189, 138, 27, 0.4), 0 0 20px rgba(189, 138, 27, 0.2)',
    },
  },
} as const
