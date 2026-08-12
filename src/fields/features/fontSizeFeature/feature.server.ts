import { createServerFeature } from '@payloadcms/richtext-lexical'

export const FontSizeFeature = createServerFeature({
  feature: () => ({
    ClientFeature: '@/fields/features/fontSizeFeature/feature.client#FontSizeFeatureClient',
  }),
  key: 'font-size',
})
