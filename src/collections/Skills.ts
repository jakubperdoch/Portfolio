// collections/Skills.ts
import type { CollectionConfig } from "payload";

export const Skills: CollectionConfig = {
  slug: "skills",
  admin: {
    useAsTitle: "category",
    defaultColumns: ["category", "order", "updatedAt"],
  },
  defaultSort: "order",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "order",
      type: "number",
      admin: {
        position: "sidebar",
        description:
          "Nižšie číslo = vyššie na stránke (drag&drop reorder vyžaduje plugin, toto je manuálny fallback)",
      },
      defaultValue: 0,
    },
    {
      name: "category",
      type: "select",
      required: true,
      options: [
        { label: "Frontend & Frameworks", value: "frontend-frameworks" },
        { label: "Backend & Databases", value: "backend-databases" },
      ],
    },
    {
      name: "items",
      type: "array",
      required: true,
      minRows: 1,
      fields: [
        {
          name: "icon",
          type: "textarea",
          required: true,
          admin: {
            description: "Raw SVG markup (napr. <svg>...</svg>), vykresľuje sa inline.",
          },
        },
        {
          name: "name",
          type: "text",
          required: true,
        },
      ],
    },
  ],
  timestamps: true,
};
