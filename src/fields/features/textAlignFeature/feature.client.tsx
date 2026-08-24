"use client";

import { createStyleFeature } from "@/fields/features/styleFeatureFactory";
import { TextAlignStart } from "lucide-react";
import React from "react";
import { TextAlignFeatureVariables } from "@/fields/features/textAlignFeature/utils/variables";
const TextAlignStartIcon: React.FC = () => <TextAlignStart size={13} />;

const textAlignFeature = createStyleFeature({
  key: "text-align",
  icon: TextAlignStartIcon,
  variables: TextAlignFeatureVariables,
  applyLabelStyle: true,
});

export const SET_TEXT_ALIGN_COMMAND = textAlignFeature.COMMAND;
export const TextAlignFeatureClient = textAlignFeature.Feature;
