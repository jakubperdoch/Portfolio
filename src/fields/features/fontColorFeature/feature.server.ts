import { createServerFeature } from '@payloadcms/richtext-lexical'

export const FontColorFeature = createServerFeature({
  feature: () => ({
    ClientFeature: '@/fields/features/fontColorFeature/feature.client#FontColorFeatureClient',
  }),
  key: 'font-color',
})
