import { getPayload } from "payload";
import config from "@payload-config";
import type { Experience } from "@/payload-types";

export type ExperienceResult =
  { success: true; experiences: Experience[] } | { success: false; error: string };

export async function getExperiences(): Promise<ExperienceResult> {
  try {
    const payload = await getPayload({ config });

    const result = await payload.find({
      collection: "experience",
      limit: 20,
      sort: "order",
    });

    return { success: true, experiences: result.docs };
  } catch (error) {
    console.error("Error fetching experiences:", error);
    return { success: false, error: "Failed to fetch experiences" };
  }
}
