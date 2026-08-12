import { createServerFeature } from '@payloadcms/richtext-lexical'

export const FontStyleFeature = createServerFeature({
  feature: () => ({
    ClientFeature: '@/fields/features/fontStyleFeature/feature.client#FontStyleFeatureClient',
  }),
  key: 'font-style',
})
