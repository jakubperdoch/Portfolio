import { createServerFeature } from '@payloadcms/richtext-lexical'
export const DefaultStyleFeature = createServerFeature({
  feature: () => ({
    ClientFeature: '@/fields/features/defaultStyleFeature/feature.client#DefaultStyleFeatureClient',
  }),
  key: 'default-style',
})
