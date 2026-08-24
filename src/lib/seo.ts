import type { Metadata } from "next";
import { getServerSideURL } from "@/utilities/getURL";

export const siteConfig = {
  name: "Jakub Perďoch",
  title: "Jakub Perďoch — Software Developer",
  description:
    "Portfolio of Jakub Perďoch, a software developer building fast, well-crafted web experiences with React, Next.js and TypeScript.",
  locale: "en_US",
  twitterHandle: "@jakubperdoch",
} as const;

type ConstructMetadataArgs = {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
  type?: "website" | "article";
  appendSiteName?: boolean;
};

export function constructMetadata({
  title,
  description,
  path,
  image,
  noIndex = false,
  type = "website",
  appendSiteName = true,
}: ConstructMetadataArgs): Metadata {
  const url = `${getServerSideURL()}${path}`;
  const fullTitle = appendSiteName ? `${title} — ${siteConfig.name}` : title;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
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
