// collections/Experience.ts
import type { CollectionConfig } from "payload";

export const Experience: CollectionConfig = {
  slug: "experience",
  admin: {
    useAsTitle: "role",
    defaultColumns: ["role", "company", "startDate", "isCurrent"],
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
      type: "row",
      fields: [
        {
          name: "startDate",
          type: "date",
          required: true,
          admin: {
            date: { pickerAppearance: "monthOnly" },
            width: "50%",
          },
        },
        {
          name: "endDate",
          type: "date",
          admin: {
            date: { pickerAppearance: "monthOnly" },
            width: "50%",
            condition: (_, siblingData) => !siblingData?.isCurrent,
          },
        },
      ],
    },
    {
      name: "isCurrent",
      type: "checkbox",
      label: 'Aktuálne pôsobím (zobrazí "Present")',
      defaultValue: false,
    },
    {
      name: "customLabel",
      type: "text",
      admin: {
        description:
          'Voliteľné prebitie zobrazeného textu, napr. "2023 — Present". Ak prázdne, generuje sa zo startDate/endDate.',
      },
    },
    {
      type: "row",
      fields: [
        {
          name: "company",
          type: "text",
          required: true,
          admin: { width: "50%" },
        },
        {
          name: "role",
          type: "text",
          required: true,
          admin: { width: "50%" },
        },
      ],
    },
    {
      name: "employmentType",
      type: "select",
      required: true,
      defaultValue: "full-time",
      options: [
        { label: "Full-time", value: "full-time" },
        { label: "Part-time", value: "part-time" },
        { label: "Freelance", value: "freelance" },
        { label: "Contract", value: "contract" },
        { label: "Internship", value: "internship" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "location",
      type: "text",
      admin: {
        description: "napr. Remote, Turzovka / Bratislava, Hybrid",
        position: "sidebar",
      },
    },
    {
      name: "companyLink",
      type: "text",
      validate: (value: string | null | undefined) => {
        if (!value) return true;
        return /^https?:\/\//.test(value) || "Musí byť platná URL";
      },
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "companyLogo",
      type: "upload",
      relationTo: "media",
      filterOptions: {
        mimeType: { contains: "image" },
      },
      admin: {
        description: "Logo firmy — nahráva sa priamo do R2.",
        position: "sidebar",
      },
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "responsibilities",
      type: "array",
      required: true,
      minRows: 1,
      fields: [
        {
          name: "item",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "techStack",
      type: "array",
      admin: {
        description: "Prevažne používané technológie na tejto pozícii",
      },
      fields: [
        {
          name: "tech",
          type: "text",
          required: true,
        },
      ],
    },
  ],
  timestamps: true,
};
