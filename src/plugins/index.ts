import { nestedDocsPlugin } from "@payloadcms/plugin-nested-docs";
import { Plugin } from "payload";
import { importExportPlugin } from "@payloadcms/plugin-import-export";
import { emailTemplatePlugin } from "payload-email-template";
import { payloadCmdk } from "@veiag/payload-cmdk";

export const plugins: Plugin[] = [
  nestedDocsPlugin({
    collections: ["categories"],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ""),
  }),

  emailTemplatePlugin({
    enabled: true,
    imageCollectionSlug: "media",
    macros: {
      variables: {
        companyName: "Villa Encarna",
      },

      config: {
        appName: "Villa Encarna Admin",
      },
    },
  }),
  importExportPlugin({
    collections: [{ slug: "users", import: true, export: true }],
  }),
  payloadCmdk({}),
];
