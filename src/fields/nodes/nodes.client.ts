"use client";

import { createClientFeature } from "@payloadcms/richtext-lexical/client";
import { StyledTextNode } from "@/fields/nodes/StyledTextNode";

export const RegisterNodesFeatureClient = createClientFeature({
  nodes: [StyledTextNode as any],
});
