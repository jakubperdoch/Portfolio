import type { Field, GroupField } from "payload";
import deepMerge from "@/utilities/deepMerge";

export type LinkAppearances =
  | "default"
  | "inverse"
  | "outline"
  | "outline-dark"
  | "white"
  | "premium"
  | "gradient"
  | "gold-outline"
  | "link-white"
  | "link-premium"
  | "link-gradient"
  | "link-black";

export const appearanceOptions: Record<LinkAppearances, { label: string; value: string }> = {
  default: {
    label: "Default",
    value: "default",
  },
  inverse: {
    label: "Inverse",
    value: "inverse",
  },
  outline: {
    label: "Outline",
    value: "outline",
  },
  "outline-dark": {
    label: "Outline Dark",
    value: "outline-dark",
  },
  "gold-outline": {
    label: "Gold Outline",
    value: "gold-outline",
  },
  white: {
    label: "White",
    value: "white",
  },
  premium: {
    label: "Premium",
    value: "premium",
  },
  gradient: {
    label: "Gradient",
    value: "gradient",
  },
  "link-white": {
    label: "Link White",
    value: "link-white",
  },
  "link-black": {
    label: "Link Black",
    value: "link-black",
  },
  "link-premium": {
    label: "Link Premium",
    value: "link-premium",
  },
  "link-gradient": {
    label: "Link Gradient",
    value: "link-gradient",
  },
};

type LinkType = (options?: {
  appearances?: LinkAppearances[] | false;
  inverseAppearances?: LinkAppearances[] | false;
  disableLabel?: boolean;
  overrides?: Partial<GroupField>;
}) => Field;

export const link: LinkType = ({
  appearances,
  inverseAppearances = false,
  disableLabel = false,
  overrides = {},
} = {}) => {
  const linkResult: GroupField = {
    name: "link",
    type: "group",
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        type: "row",
        fields: [
          {
            name: "type",
            type: "radio",
            admin: {
              layout: "horizontal",
              width: "50%",
            },
            defaultValue: "reference",
            options: [
              {
                label: "Internal link",
                value: "reference",
              },
              {
                label: "Custom URL",
                value: "custom",
              },
            ],
          },
          {
            name: "newTab",
            type: "checkbox",
            admin: {
              style: {
                alignSelf: "flex-end",
              },
              width: "50%",
            },
            label: "Open in new tab",
          },
        ],
      },
    ],
  };

  const linkTypes: Field[] = [
    {
      name: "url",
      type: "text",
      admin: {
        condition: (_, siblingData) => siblingData?.type === "custom",
      },
      label: "Custom URL",
      required: true,
    },
  ];

  if (!disableLabel) {
    linkTypes.map((linkType) => ({
      ...linkType,
      admin: {
        ...linkType.admin,
        width: "50%",
      },
    }));

    linkResult.fields.push({
      type: "row",
      fields: [
        ...linkTypes,
        {
          name: "label",
          type: "text",
          admin: {
            width: "50%",
          },
          label: "Label",
          required: true,
          localized: true,
        },
      ],
    });
  } else {
    linkResult.fields = [...linkResult.fields, ...linkTypes];
  }

  if (appearances !== false) {
    let appearanceOptionsToUse = [
      appearanceOptions.default,
      appearanceOptions.outline,
      appearanceOptions["gold-outline"],
      appearanceOptions.gradient,
    ];

    if (appearances) {
      appearanceOptionsToUse = appearances.map((appearance) => appearanceOptions[appearance]);
    }

    linkResult.fields.push({
      name: "appearance",
      type: "select",
      admin: {
        description: "Choose how the link should be rendered.",
      },
      defaultValue: "default",
      options: appearanceOptionsToUse,
    });
  }

  if (inverseAppearances !== false) {
    let inverseAppearanceOptionsToUse = [
      appearanceOptions.default,
      appearanceOptions.inverse,
      appearanceOptions.outline,
      appearanceOptions["outline-dark"],
      appearanceOptions["gold-outline"],
      appearanceOptions.gradient,
      appearanceOptions.premium,
      appearanceOptions.white,
      appearanceOptions["link-white"],
      appearanceOptions["link-black"],
      appearanceOptions["link-premium"],
      appearanceOptions["link-gradient"],
    ];

    if (inverseAppearances) {
      inverseAppearanceOptionsToUse = inverseAppearances.map(
        (appearance) => appearanceOptions[appearance]
      );
    }

    linkResult.fields.push({
      name: "inverseAppearance",
      type: "select",
      admin: {
        description: "Choose how the link should be rendered in light mode.",
      },
      defaultValue: "default",
      enumName: "link_inverse_appearance",
      options: inverseAppearanceOptionsToUse,
    });
  }

  return deepMerge(linkResult, overrides);
};
