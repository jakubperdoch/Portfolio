import { StyledTextNode } from "@/fields/nodes/StyledTextNode";
import { createServerFeature } from "@payloadcms/richtext-lexical";

export const RegisterNodesFeature = createServerFeature({
  feature: () => ({
    ClientFeature: "@/fields/nodes/nodes.client#RegisterNodesFeatureClient",
    nodes: [{ node: StyledTextNode }],
  }),
  key: "register-nodes",
});
