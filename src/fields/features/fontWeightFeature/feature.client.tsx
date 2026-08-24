"use client";

import { createStyleFeature } from "@/fields/features/styleFeatureFactory";
import { Bold } from "lucide-react";
import React from "react";
import { FontWeightFeatureVariables } from "@/fields/features/fontWeightFeature/utils/variables";

const BoldIcon: React.FC = () => <Bold size={13} />;

const weightFeature = createStyleFeature({
  key: "font-weight",
  icon: BoldIcon,
  variables: FontWeightFeatureVariables,
  applyLabelStyle: true,
});

export const SET_FONT_WEIGHT_COMMAND = weightFeature.COMMAND;
export const FontWeightFeatureClient = weightFeature.Feature;
