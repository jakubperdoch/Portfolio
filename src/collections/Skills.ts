// collections/Skills.ts
import type { CollectionConfig } from "payload";

export const SkillCategories = [
  { label: "Frontend & Frameworks", value: "frontend-frameworks" },
  { label: "Backend & Databases", value: "backend-databases" },
  { label: "Tools & Platforms", value: "tools-platforms" },
  { label: "Other", value: "other" },
  { label: "Languages", value: "languages" },
  { label: "Version Control", value: "version-control" },
  { label: "DevOps", value: "devops" },
  { label: "Cloud", value: "cloud" },
  { label: "Testing & QA", value: "testing-qa" },
  { label: "Design", value: "design" },
];

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
      options: [...SkillCategories],
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
