import { createServerFeature } from "@payloadcms/richtext-lexical";

export const FontWeightFeature = createServerFeature({
  feature: () => ({
    ClientFeature: "@/fields/features/fontWeightFeature/feature.client#FontWeightFeatureClient",
  }),
  key: "font-weight",
});
