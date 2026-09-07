import { defineRouting } from "next-intl/routing";

export const locales = ["en", "sk"] as const;

export type AppLocale = (typeof locales)[number];

export const defaultLocale: AppLocale = "en";

/**
 * `as-needed` keeps the English site on its original paths (`/`, `/projects`)
 * so already-indexed URLs and canonicals stay valid, while Slovak lives under
 * `/sk`. The proxy rewrites unprefixed requests to `/en/...` internally.
 */
export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
  localeDetection: true,
});
