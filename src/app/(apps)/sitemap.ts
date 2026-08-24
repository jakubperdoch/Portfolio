import type { MetadataRoute } from "next";
import { getPayload } from "payload";
import config from "@payload-config";
import { getServerSideURL } from "@/utilities/getURL";

const staticRoutes: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/case-studies", changeFrequency: "weekly", priority: 0.9 },
  { path: "/work", changeFrequency: "monthly", priority: 0.6 },
  { path: "/my-gear", changeFrequency: "monthly", priority: 0.4 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.5 },
];

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

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const projectEntries: MetadataRoute.Sitemap = projects.docs.map((project) => ({
    url: `${baseUrl}/case-studies/${project.slug}`,
    lastModified: new Date(project.updatedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...projectEntries];
}
