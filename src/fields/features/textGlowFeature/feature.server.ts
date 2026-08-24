import { createServerFeature } from "@payloadcms/richtext-lexical";

export const TextGlowFeature = createServerFeature({
  feature: () => ({
    ClientFeature: "@/fields/features/textGlowFeature/feature.client#TextGlowFeatureClient",
  }),
  key: "text-glow",
});
