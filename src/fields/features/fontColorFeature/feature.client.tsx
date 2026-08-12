'use client'

import React from 'react'
import { createStyleFeature } from '@/fields/features/styleFeatureFactory'
import { Palette } from 'lucide-react'
import { FontColorVariables } from '@/fields/features/fontColorFeature/utils/variables'

const ColorIcon: React.FC = () => <Palette size={15} />

const colorFeature = createStyleFeature({
  key: 'font-color',
  icon: ColorIcon,
  variables: FontColorVariables,
  applyLabelStyle: true,
})

export const SET_FONT_COLOR_COMMAND = colorFeature.COMMAND
export const FontColorFeatureClient = colorFeature.Feature
