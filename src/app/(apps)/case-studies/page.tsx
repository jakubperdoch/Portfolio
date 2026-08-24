import { getPayload } from "payload";
import config from "@payload-config";
import type { Metadata } from "next";

import JsonLd from "@/lib/JsonLd";
import { constructMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

import CaseStudiesClient from "./client";

const description =
  "A collection of projects and case studies by Jakub Perďoch, covering the process, stack and outcome behind each build.";

export const metadata: Metadata = constructMetadata({
  title: "Case Studies",
  description,
  path: "/case-studies",
});

export const revalidate = 3600;

async function getProjects() {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "projects",
    limit: 50,
    sort: "-createdAt",
    where: {
      visibility: { equals: "public" },
    },
  });

  return result.docs;
}

export default async function CaseStudiesPage() {
  const projects = await getProjects();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Case Studies", path: "/case-studies" },
        ])}
      />
      <CaseStudiesClient projects={projects} />
    </>
  );
}
