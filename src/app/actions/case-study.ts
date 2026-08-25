import type { Project } from "@/payload-types";
import config from "@payload-config";
import { getPayload } from "payload";

export type CaseStudiesResult =
  { success: true; caseStudies: Project[] } | { success: false; error: string };

interface GetCaseStudiesOptions {
  featuredOnly?: boolean;
  limit?: number;
}

export async function getCaseStudies({
  featuredOnly = false,
  limit = 10,
}: GetCaseStudiesOptions = {}): Promise<CaseStudiesResult> {
  try {
    const payload = await getPayload({ config });

    const result = await payload.find({
      collection: "projects",
      limit,
      sort: "-createdAt",
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
