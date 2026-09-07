import type { Metadata } from "next";

import { getPathname } from "@/i18n/navigation";
import { type AppLocale, routing } from "@/i18n/routing";
import { getServerSideURL } from "@/utilities/getURL";

export const siteConfig = {
  name: "Jakub Perďoch",
  twitterHandle: "@jakubperdoch",
} as const;

const OPEN_GRAPH_LOCALES: Record<AppLocale, string> = {
  en: "en_US",
  sk: "sk_SK",
};

/**
 * Turns a locale-agnostic route (`/projects`) into the path that locale is
 * actually served from. With `localePrefix: "as-needed"` the default locale
 * keeps the bare path and only Slovak gets the `/sk` prefix.
 */
export function localizedPath(path: string, locale: AppLocale): string {
  return getPathname({ href: path === "" ? "/" : path, locale });
}

/**
 * `hreflang` map for a route. `x-default` points at the default locale, which
 * is what an unprefixed request resolves to anyway.
 */
export function alternateLanguages(path: string): Record<string, string> {
  const languages: Record<string, string> = {};

  for (const locale of routing.locales) {
    languages[locale] = localizedPath(path, locale);
  }

  languages["x-default"] = localizedPath(path, routing.defaultLocale);

  return languages;
}

type ConstructMetadataArgs = {
  locale: AppLocale;
  title: string;
  description: string;
  /** Locale-agnostic route, e.g. `/projects`. The locale prefix is added here. */
  path: string;
  image?: string;
  noIndex?: boolean;
  type?: "website" | "article";
  appendSiteName?: boolean;
};

export function constructMetadata({
  locale,
  title,
  description,
  path,
  image,
  noIndex = false,
  type = "website",
  appendSiteName = true,
}: ConstructMetadataArgs): Metadata {
  const canonical = localizedPath(path, locale);
  const url = `${getServerSideURL()}${canonical}`;
  const fullTitle = appendSiteName ? `${title} — ${siteConfig.name}` : title;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: alternateLanguages(path),
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: OPEN_GRAPH_LOCALES[locale],
      alternateLocale: routing.locales
        .filter((candidate) => candidate !== locale)
        .map((candidate) => OPEN_GRAPH_LOCALES[candidate]),
      type,
      // Omitted when no explicit image is given: Next.js then falls back to
      // the nearest `opengraph-image.tsx` file convention for this route
      // segment. Setting `images` here — even to a guessed URL — would
      // override that automatic resolution.
      ...(image ? { images: [{ url: image, width: 1200, height: 630, alt: fullTitle }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(image ? { images: [image] } : {}),
      creator: siteConfig.twitterHandle,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}
