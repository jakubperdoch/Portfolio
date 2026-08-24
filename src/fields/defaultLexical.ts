import type { TextFieldSingleValidation } from "payload";
import {
  AlignFeature,
  BlockquoteFeature,
  BlocksFeature,
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  IndentFeature,
  InlineCodeFeature,
  InlineToolbarFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  type LinkFields,
  OrderedListFeature,
  ParagraphFeature,
  StrikethroughFeature,
  UnderlineFeature,
  UnorderedListFeature,
} from "@payloadcms/richtext-lexical";
import { FontWeightFeature } from "@/fields/features/fontWeightFeature/feature.server";
import { FontColorFeature } from "@/fields/features/fontColorFeature/feature.server";
import { RegisterNodesFeature } from "@/fields/nodes/nodes.server";
import { FontSizeFeature } from "@/fields/features/fontSizeFeature/feature.server";
import { DefaultStyleFeature } from "@/fields/features/defaultStyleFeature/feature.server";
import { TextGlowFeature } from "@/fields/features/textGlowFeature/feature.server";
import { FontStyleFeature } from "@/fields/features/fontStyleFeature/feature.server";
import { Code } from "@/blocks/Code/config";

export const defaultLexical = lexicalEditor({
  features: [
    FixedToolbarFeature(),
    InlineToolbarFeature(),

    RegisterNodesFeature(),

    ParagraphFeature(),
    HeadingFeature({ enabledHeadingSizes: ["h2", "h3", "h4"] }),

    BoldFeature(),
    ItalicFeature(),
    UnderlineFeature(),
    StrikethroughFeature(),
    InlineCodeFeature(),

    FontSizeFeature(),
    FontColorFeature(),
    FontWeightFeature(),
    FontStyleFeature(),
    TextGlowFeature(),
    DefaultStyleFeature(),

    UnorderedListFeature(),
    OrderedListFeature(),
    IndentFeature(),
    AlignFeature(),

    BlockquoteFeature(),
    HorizontalRuleFeature(),
    BlocksFeature({ blocks: [Code] }),

    LinkFeature({
      fields: ({ defaultFields }) => {
        const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
          if ("name" in field && field.name === "url") return false;
          return true;
        });

        return [
          ...defaultFieldsWithoutUrl,
          {
            name: "url",
            type: "text",
            admin: {
              condition: (_data, siblingData) => siblingData?.linkType !== "internal",
            },
            label: ({ t }) => t("fields:enterURL"),
            required: true,
            validate: ((value, options) => {
              if ((options?.siblingData as LinkFields)?.linkType === "internal") {
                return true; // no validation needed, as no url should exist for internal links
              }
              return value ? true : "URL is required";
            }) as TextFieldSingleValidation,
          },
        ];
      },
    }),
  ],
});
