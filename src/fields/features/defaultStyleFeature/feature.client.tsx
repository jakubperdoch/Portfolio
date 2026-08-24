'use client'

import React from 'react'
import { createStyleFeature } from '@/fields/features/styleFeatureFactory'
import { RemoveFormatting } from 'lucide-react'

const RemoveFormattingIcon: React.FC = () => <RemoveFormatting size={15} />

const defaultStyleFeature = createStyleFeature({
  key: 'default-style',
  icon: RemoveFormattingIcon,
  variables: {
    default: {
      label: 'Default',
      // Everything resets to `inherit`/`none` rather than to a literal color:
      // a hardcoded value here would fight the theme (the old `#fff` made text
      // invisible on the light background).
      css: {
        color: 'inherit',
        background: 'none',
        'background-clip': 'border-box',
        '-webkit-background-clip': 'border-box',
        'font-weight': 'inherit',
        'font-size': 'inherit',
        'text-decoration': 'none',
        'text-shadow': 'none',
        'font-family': 'inherit',
        'line-height': 'inherit',
        'letter-spacing': 'inherit',
        'text-align': 'inherit',
        'background-color': 'transparent',
        filter: 'none',
      },
    },
  },
  applyLabelStyle: false,
  isButtonVariant: true,
})

export const RESET_STYLE_COMMAND = defaultStyleFeature.COMMAND
export const DefaultStyleFeatureClient = defaultStyleFeature.Feature
