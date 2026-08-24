"use client";

import React from "react";
import { createStyleFeature } from "@/fields/features/styleFeatureFactory";
import { Sparkles } from "lucide-react";
import { TextGlowVariables } from "@/fields/features/textGlowFeature/utils/variables";

const GlowIcon: React.FC = () => <Sparkles size={15} />;

const glowFeature = createStyleFeature({
  key: "text-glow",
  icon: GlowIcon,
  variables: TextGlowVariables,
  applyLabelStyle: true,
});

export const SET_TEXT_GLOW_COMMAND = glowFeature.COMMAND;
export const TextGlowFeatureClient = glowFeature.Feature;
