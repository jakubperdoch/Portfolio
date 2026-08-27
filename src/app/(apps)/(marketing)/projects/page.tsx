import type { Metadata } from "next";

import JsonLd from "@/lib/JsonLd";
import { constructMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

import WorkClient from "./client";
import { getCaseStudies } from "@/app/actions/case-study";

export const metadata: Metadata = constructMetadata({
  title: "Projects",
  description:
    "A collection of projects and case studies by Jakub Perďoch, covering the process, stack and outcome behind each build.",
  path: "/projects",
});

export default async function WorkPage() {
  const resultCaseStudies = await getCaseStudies({ featuredOnly: false });
  const caseStudies =
    resultCaseStudies.success && resultCaseStudies.caseStudies ? resultCaseStudies.caseStudies : [];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
        ])}
      />
      <WorkClient caseStudies={caseStudies} />
    </>
  );
}
