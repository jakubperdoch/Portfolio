import type { Project } from "@/payload-types";
import { getServerSideURL } from "@/utilities/getURL";

export type CaseStudiesResult =
  { success: true; caseStudies: Project[] } | { success: false; error: string };

export async function getCaseStudies(): Promise<CaseStudiesResult> {
  try {
    const res = await fetch(`${getServerSideURL()}/api/case-studies`);

    if (!res.ok) {
      return { success: false, error: `Request failed with status ${res.status}` };
    }

    const data = (await res.json()) as { docs?: Project[] };

    return { success: true, caseStudies: data.docs ?? [] };
  } catch (error) {
    console.error("Error fetching case studies:", error);
    return { success: false, error: "Failed to fetch case studies" };
  }
}
