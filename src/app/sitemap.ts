import type { MetadataRoute } from "next";
import { getPayload } from "payload";
import config from "@payload-config";

import { routing } from "@/i18n/routing";
import { localizedPath } from "@/lib/seo";
import { getServerSideURL } from "@/utilities/getURL";

const staticRoutes: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/projects", changeFrequency: "weekly", priority: 0.9 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.6 },
];

/**
 * `alternates.languages` tells search engines that the `/` and `/sk` variants
 * of a route are translations of each other rather than duplicates.
 */
function languageAlternates(baseUrl: string, path: string) {
  const languages: Record<string, string> = {};

  for (const locale of routing.locales) {
    languages[locale] = `${baseUrl}${localizedPath(path, locale)}`;
  }

  return languages;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getServerSideURL();
  const payload = await getPayload({ config });

  const projects = await payload.find({
    collection: "projects",
    limit: 200,
    where: {
      visibility: { equals: "public" },
    },
  });

  const staticEntries: MetadataRoute.Sitemap = routing.locales.flatMap((locale) =>
    staticRoutes.map((route) => ({
      url: `${baseUrl}${localizedPath(route.path, locale)}`,
      lastModified: new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: { languages: languageAlternates(baseUrl, route.path) },
    }))
  );

  const projectEntries: MetadataRoute.Sitemap = routing.locales.flatMap((locale) =>
    projects.docs.map((project) => {
      const path = `/projects/${project.slug}`;

      return {
        url: `${baseUrl}${localizedPath(path, locale)}`,
        lastModified: new Date(project.updatedAt),
        changeFrequency: "monthly" as const,
        priority: 0.7,
        alternates: { languages: languageAlternates(baseUrl, path) },
      };
    })
  );

  return [...staticEntries, ...projectEntries];
}
