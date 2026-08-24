import { Experience } from "@/payload-types";
import { getServerSideURL } from "@/utilities/getURL";

export type ExperienceResult =
  { success: true; experiences: Experience[] } | { success: false; error: string };

export async function getExperiences(): Promise<ExperienceResult> {
  try {
    const res = await fetch(`${getServerSideURL()}/api/experience`);
    if (!res.ok) {
      return { success: false, error: `Request failed with status ${res.status}` };
    }
    const data = (await res.json()) as { docs?: Experience[] };
    return { success: true, experiences: data.docs ?? [] };
  } catch (error) {
    console.error("Error fetching experiences:", error);
    return { success: false, error: "Failed to fetch experiences" };
  }
}
