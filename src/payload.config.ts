import sharp from "sharp";
import path from "path";
import { buildConfig, PayloadRequest } from "payload";
import { fileURLToPath } from "url";

import { Categories } from "./collections/Categories";
import { Media } from "./collections/Media";
import { Users } from "./collections/Users";
import { plugins } from "./plugins";
import { defaultLexical } from "@/fields/defaultLexical";
import { getServerSideURL } from "./utilities/getURL";
import Faqs from "@/collections/Faqs";

import { en } from "@payloadcms/translations/languages/en";
import { sk } from "@payloadcms/translations/languages/sk";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { Projects } from "@/collections/Projects";
import { Experience } from "@/collections/Experience";
import { Skills } from "@/collections/Skills";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    components: {
      beforeDashboard: ["@/components/Admin/WelcomeBanner.tsx"],
      afterLogin: ["@/components/Admin/AfterLogin"],
      beforeLogin: ["@/components/Admin/BeforeLogin"],
      graphics: {
        Logo: "@/components/Admin/Logo",
        Icon: "@/components/Admin/Icon",
      },
    },
    meta: {
      title: "- Perďoch",
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
  },
  editor: defaultLexical,
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || "",
  }),
  // Content locales. Must stay in sync with `src/i18n/routing.ts` — the front
  // end passes its active locale straight into `payload.find`.
  localization: {
    locales: [
      { code: "en", label: { en: "English", sk: "Angličtina" } },
      { code: "sk", label: { en: "Slovak", sk: "Slovenčina" } },
    ],
    defaultLocale: "en",
    // Untranslated fields fall back to the default locale instead of
    // rendering blank on the Slovak site.
    fallback: true,
  },
  // Admin UI language, unrelated to the content locales above.
  i18n: {
    supportedLanguages: { sk, en },
    fallbackLanguage: "en",
  },
  collections: [Media, Categories, Users, Faqs, Projects, Experience, Skills],
  cors: [getServerSideURL()].filter(Boolean),
  plugins: [...plugins],
  secret: process.env.PAYLOAD_SECRET || "secret",
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        if (req.user) return true;
        const authHeader = req.headers.get("authorization");
        return authHeader === `Bearer ${process.env.CRON_SECRET}`;
      },
    },
    tasks: [],
  },
});
