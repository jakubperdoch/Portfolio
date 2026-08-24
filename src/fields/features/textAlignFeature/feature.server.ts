import { createServerFeature } from "@payloadcms/richtext-lexical";

export const TextAlignFeature = createServerFeature({
  feature: () => ({
    ClientFeature: "@/fields/features/textAlignFeature/feature.client#TextAlignFeatureClient",
  }),
  key: "text-align",
});
