import { nestedDocsPlugin } from "@payloadcms/plugin-nested-docs";
import { Plugin } from "payload";
import { importExportPlugin } from "@payloadcms/plugin-import-export";
import { emailTemplatePlugin } from "payload-email-template";
import { payloadCmdk } from "@veiag/payload-cmdk";
import { s3Storage } from "@payloadcms/storage-s3";

const R2_BUCKET = process.env.R2_BUCKET;
const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;

const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL?.replace(/\/+$/, "");

const r2Enabled = Boolean(R2_BUCKET && R2_ACCOUNT_ID && R2_ACCESS_KEY_ID && R2_SECRET_ACCESS_KEY);

const servesFromR2 = r2Enabled && Boolean(R2_PUBLIC_URL);

export const plugins: Plugin[] = [
  s3Storage({
    enabled: r2Enabled,
    bucket: R2_BUCKET ?? "",
    clientUploads: true,
    collections: {
      media: {
        prefix: "media",
        ...(servesFromR2
          ? {
              disablePayloadAccessControl: true as const,
              generateFileURL: ({ filename, prefix }) =>
                [R2_PUBLIC_URL, prefix, filename].filter(Boolean).join("/"),
            }
          : {}),
      },
    },
    config: {
      endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      region: "auto",
      credentials: {
        accessKeyId: R2_ACCESS_KEY_ID ?? "",
        secretAccessKey: R2_SECRET_ACCESS_KEY ?? "",
      },
    },
  }),

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
