import { Skill } from "@/payload-types";
import { getPayload } from "payload";
import config from "@payload-config";

import { type AppLocale, defaultLocale } from "@/i18n/routing";

export type SkillsResult = { success: true; skills: Skill[] } | { success: false; error: string };

interface GetSkillsOptions {
  locale: AppLocale;
  limit?: number;
}

export async function getSkills({ locale, limit = 10 }: GetSkillsOptions): Promise<SkillsResult> {
  try {
    const payload = await getPayload({ config });

    const result = await payload.find({
      collection: "skills",
      limit,
      sort: "-order",
      locale,
      fallbackLocale: defaultLocale,
    });

    return { success: true, skills: result.docs };
  } catch (error) {
    console.error("Error fetching skills:", error);
    return { success: false, error: "Failed to fetch skills" };
  }
}
