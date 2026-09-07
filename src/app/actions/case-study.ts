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
      // Untranslated fields fall back to the default locale rather than
      // rendering as blank.
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
