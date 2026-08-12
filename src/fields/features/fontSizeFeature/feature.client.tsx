'use client'

import React from 'react'
import { createStyleFeature } from '@/fields/features/styleFeatureFactory'
import { FontSizeVariables } from '@/fields/features/fontSizeFeature/utils/variables'
import { ALargeSmall } from 'lucide-react'

const SizeIcon: React.FC = () => <ALargeSmall size={20} />

const sizeFeature = createStyleFeature({
  key: 'font-size',
  icon: SizeIcon,
  variables: FontSizeVariables,
  applyLabelStyle: false,
})

export const SET_FONT_SIZE_COMMAND = sizeFeature.COMMAND
export const FontSizeFeatureClient = sizeFeature.Feature
