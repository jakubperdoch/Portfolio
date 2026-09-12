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
      localized: true,
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
      localized: true,
    },
    {
      type: "collapsible",
      label: "Project context",
      admin: { initCollapsed: true },
      fields: [
        {
          name: "client",
          type: "text",
          localized: true,
          admin: {
            description: "Klient alebo firma. Pri neverejnom názve použi všeobecný opis.",
          },
        },
        {
          name: "industry",
          type: "text",
          localized: true,
          admin: { description: "Odvetvie, napr. e-commerce, vzdelávanie alebo fintech." },
        },
        {
          name: "projectType",
          type: "select",
          options: [
            { label: "Client work", value: "client" },
            { label: "Employment", value: "employment" },
            { label: "Personal project", value: "personal" },
            { label: "Open source", value: "open-source" },
            { label: "Academic project", value: "academic" },
          ],
        },
        {
          name: "projectStatus",
          type: "select",
          admin: { description: "Stav realizácie projektu, nezávislý od viditeľnosti na webe." },
          options: [
            { label: "In progress", value: "in-progress" },
            { label: "Launched", value: "launched" },
            { label: "Maintained", value: "maintained" },
            { label: "Completed", value: "completed" },
            { label: "Archived", value: "archived" },
          ],
        },
        {
          name: "timeline",
          type: "text",
          localized: true,
          admin: {
            description: "Obdobie a trvanie tvojej práce, napr. január – apríl 2026, 4 mesiace.",
          },
        },
        {
          name: "targetAudience",
          type: "textarea",
          localized: true,
          admin: { description: "Pre koho je produkt určený a akú potrebu používateľov rieši." },
        },
      ],
    },
    {
      type: "collapsible",
      label: "My contribution",
      admin: { initCollapsed: true },
      fields: [
        {
          name: "role",
          type: "text",
          localized: true,
          admin: { description: "Tvoja rola, napr. Full-stack developer alebo Product designer." },
        },
        {
          name: "teamSize",
          type: "number",
          min: 1,
          validate: (value: number | null | undefined) =>
            value == null || Number.isInteger(value) || "Zadaj celé číslo.",
          admin: {
            description:
              "Počet ľudí v projektovom tíme vrátane teba. Pri samostatnej práci zadaj 1.",
          },
        },
        {
          name: "collaboration",
          type: "textarea",
          localized: true,
          admin: {
            description:
              "S kým si spolupracoval, ako prebiehala komunikácia a prípadné vedenie tímu.",
          },
        },
        {
          name: "responsibilities",
          type: "array",
          localized: true,
          admin: {
            description:
              "Konkrétne časti, za ktoré si osobne zodpovedal. Odlíš svoj prínos od práce tímu.",
          },
          fields: [{ name: "item", type: "text", required: true }],
        },
      ],
    },
    {
      type: "collapsible",
      label: "Problem, solution & impact",
      admin: { initCollapsed: true },
      fields: [
        {
          name: "challenge",
          type: "textarea",
          localized: true,
          admin: { description: "Východiskový problém, cieľ a dôležité obmedzenia projektu." },
        },
        {
          name: "solution",
          type: "textarea",
          localized: true,
          admin: { description: "Ako si problém vyriešil a prečo si zvolil tento prístup." },
        },
        {
          name: "keyDecisions",
          type: "array",
          localized: true,
          admin: {
            description: "Dôležité technické alebo dizajnové rozhodnutia a ich kompromisy.",
          },
          fields: [
            { name: "decision", type: "text", required: true },
            { name: "rationale", type: "textarea", required: true },
          ],
        },
        {
          name: "outcomes",
          type: "array",
          localized: true,
          admin: {
            description: "Overiteľné výsledky. Ak nemáš čísla, opíš konkrétny kvalitatívny prínos.",
          },
          fields: [
            { name: "result", type: "text", required: true },
            {
              name: "metric",
              type: "text",
              admin: {
                description: "Voliteľná hodnota vrátane jednotky alebo porovnania pred/po.",
              },
            },
            {
              name: "evidence",
              type: "textarea",
              admin: {
                description:
                  "Zdroj, obdobie a spôsob merania alebo kontext, ktorý výsledok dokladá.",
              },
            },
          ],
        },
        {
          name: "learnings",
          type: "textarea",
          localized: true,
          admin: { description: "Čo si sa naučil a čo by si pri ďalšej iterácii zlepšil." },
        },
      ],
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
      name: "featured",
      type: "checkbox",
      label: "Featured on home page",
      defaultValue: false,
      index: true,
      admin: {
        position: "sidebar",
        description: "Zobrazí projekt v sekcii „Selected Work“ na domovskej stránke.",
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
      name: "image",
      type: "upload",
      relationTo: "media",
      required: false,
      filterOptions: {
        mimeType: { contains: "image" },
      },
      admin: {
        description: "Náhľadový obrázok — nahráva sa priamo do R2.",
      },
    },
    {
      name: "video",
      type: "upload",
      relationTo: "media",
      required: false,
      filterOptions: {
        mimeType: { contains: "video" },
      },
      admin: {
        description: "Voliteľné video — nahráva sa priamo do R2.",
      },
    },
  ],
  timestamps: true,
};
