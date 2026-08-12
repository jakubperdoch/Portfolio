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
      css: {
        color: '#fff',
        'font-weight': 'normal',
        'font-size': '1rem',
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

export const SET_FONT_COLOR_COMMAND = defaultStyleFeature.COMMAND
export const DefaultStyleFeatureClient = defaultStyleFeature.Feature
