"use client";

import React from "react";
import { createStyleFeature } from "@/fields/features/styleFeatureFactory";
import { FontStyleVariables } from "@/fields/features/fontStyleFeature/utils/variables";
import { Italic } from "lucide-react";

const ItalicIcon: React.FC = () => <Italic size={15} />;

const styleFeature = createStyleFeature({
  key: "font-style",
  icon: ItalicIcon,
  variables: FontStyleVariables,
  applyLabelStyle: true,
});

export const SET_FONT_STYLE_COMMAND = styleFeature.COMMAND;
export const FontStyleFeatureClient = styleFeature.Feature;
