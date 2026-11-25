import { cache } from "react";
import type { Project } from "@/payload-types";
import config from "@payload-config";
import { getPayload } from "payload";

import { type AppLocale, defaultLocale } from "@/i18n/routing";

export type CaseStudiesResult =
  { success: true; caseStudies: Project[] } | { success: false; error: string };

interface GetCaseStudiesOptions {
  locale: AppLocale;
  featuredOnly?: boolean;
  limit?: number;
}

export async function getCaseStudies({
  locale,
  featuredOnly = false,
  limit = 10,
}: GetCaseStudiesOptions): Promise<CaseStudiesResult> {
  try {
    const payload = await getPayload({ config });

    const result = await payload.find({
      collection: "projects",
      limit,
      sort: "-createdAt",
      locale,

      fallbackLocale: defaultLocale,
      where: {
        ...(featuredOnly ? { featured: { equals: true } } : {}),
      },
    });

    return { success: true, caseStudies: result.docs };
  } catch (error) {
    console.error("Error fetching case studies:", error);
    return { success: false, error: "Failed to fetch case studies" };
  }
}

const findCaseStudy = cache(async (slug: string, locale: AppLocale) => {
  try {
    const payload = await getPayload({ config });

    const result = await payload.find({
      collection: "projects",
      where: { slug: { equals: slug } },
      locale,
      fallbackLocale: defaultLocale,
      limit: 1,
    });

    return { success: true as const, caseStudy: result.docs[0] };
  } catch (error) {
    console.error("Error fetching case study:", error);
    return { success: false as const, error: "Failed to fetch case study" };
  }
});

export async function getCaseStudy({ slug, locale }: { slug: string; locale: AppLocale }) {
  return findCaseStudy(slug, locale);
}

export async function getCaseStudySlugs(): Promise<string[]> {
  try {
    const payload = await getPayload({ config });

    const result = await payload.find({
      collection: "projects",
      limit: 200,
      depth: 0,
      pagination: false,
      select: { slug: true },
    });

    return result.docs.map((doc) => doc.slug).filter(Boolean);
  } catch (error) {
    console.error("Error fetching case study slugs:", error);
    return [];
  }
}
