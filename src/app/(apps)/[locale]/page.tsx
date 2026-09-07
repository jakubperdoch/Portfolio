import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import HomeClient from "@/app/(apps)/[locale]/client";
import { getCaseStudies } from "@/app/actions/case-study";
import { getExperiences } from "@/app/actions/experience";
import { getSkills } from "@/app/actions/skill";
import type { AppLocale } from "@/i18n/routing";
import JsonLd from "@/lib/JsonLd";
import { breadcrumbSchema, personSchema, websiteSchema } from "@/lib/schema";
import { constructMetadata } from "@/lib/seo";

type HomePageProps = {
  params: Promise<{ locale: AppLocale }>;
};

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    ...constructMetadata({
      locale,
      title: t("home.title"),
      description: t("home.description"),
      path: "/",
      appendSiteName: false,
    }),
    title: { absolute: t("home.title") },
  };
}

export const revalidate = 3600;

export default async function Page({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale });

  const resultCaseStudies = await getCaseStudies({ locale, featuredOnly: true });
  const caseStudies =
    resultCaseStudies.success && resultCaseStudies.caseStudies ? resultCaseStudies.caseStudies : [];

  const resultExperiences = await getExperiences({ locale });
  const experiences =
    resultExperiences.success && resultExperiences.experiences ? resultExperiences.experiences : [];

  const resultSkills = await getSkills({ locale });
  const skills = resultSkills.success && resultSkills.skills ? resultSkills.skills : [];

  const description = t("Metadata.siteDescription");

  return (
    <>
      <JsonLd data={personSchema({ locale, description, jobTitle: t("Schema.jobTitle") })} />
      <JsonLd data={websiteSchema({ locale, description })} />
      <JsonLd data={breadcrumbSchema([{ name: t("Breadcrumbs.home"), path: "/" }], locale)} />
      <HomeClient caseStudies={caseStudies} experiences={experiences} skills={skills} />
    </>
  );
}
