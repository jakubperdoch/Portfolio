// collections/Projects.ts
import type { CollectionConfig } from "payload";

export const Projects: CollectionConfig = {
  slug: "projects",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "visibility", "updatedAt"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: {
        position: "sidebar",
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (value) return value;
            return data?.title
              ?.toLowerCase()
              .trim()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "");
          },
        ],
      },
    },
    {
      name: "techStack",
      type: "array",
      required: true,
      minRows: 1,
      fields: [
        {
          name: "tech",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "content",
      type: "richText",
      localized: true,
      label: "Case study",
      admin: {
        description: "Long-form body rendered on the case study detail page.",
      },
    },
    {
      name: "visibility",
      type: "select",
      required: true,
      defaultValue: "public",
      options: [
        { label: "Public", value: "public" },
        { label: "Private", value: "private" },
        { label: "Draft", value: "draft" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "githubLink",
      type: "text",
      required: false,
      validate: (value: string | null | undefined) => {
        if (!value) return true;
        return /^https?:\/\//.test(value) || "Musí byť platná URL";
      },
    },
    {
      name: "liveLink",
      type: "text",
      required: false,
      validate: (value: string | null | undefined) => {
        if (!value) return true;
        return /^https?:\/\//.test(value) || "Musí byť platná URL";
      },
    },
    {
      name: "imageUrl",
      type: "text",
      required: false,
      admin: {
        description: "URL obrázka (R2/Cloudinary)",
      },
    },
    {
      name: "videoUrl",
      type: "text",
      required: false,
      admin: {
        description: "URL videa (Cloudinary)",
      },
    },
  ],
  timestamps: true,
};
