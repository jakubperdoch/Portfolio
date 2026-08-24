import HomeClient from "@/app/(apps)/client";
import JsonLd from "@/lib/JsonLd";
import type { Metadata } from "next";
import { getCaseStudies } from "@/app/actions/case-study";
import { getExperiences } from "@/app/actions/experience";
import { constructMetadata, siteConfig } from "@/lib/seo";
import { breadcrumbSchema, personSchema, websiteSchema } from "@/lib/schema";

export const metadata: Metadata = {
  ...constructMetadata({
    title: siteConfig.title,
    description: siteConfig.description,
    path: "/",
    appendSiteName: false,
  }),
  title: { absolute: siteConfig.title },
};

export const revalidate = 3600;

export default async function Page() {
  const resultCaseStudies = await getCaseStudies();
  const caseStudies =
    resultCaseStudies.success && resultCaseStudies.caseStudies ? resultCaseStudies.caseStudies : [];

  const resultExperiences = await getExperiences();
  const experiences =
    resultExperiences.success && resultExperiences.experiences ? resultExperiences.experiences : [];

  return (
    <>
      <JsonLd data={personSchema()} />
      <JsonLd data={websiteSchema()} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }])} />
      <HomeClient caseStudies={caseStudies} experiences={experiences} />
    </>
  );
}
