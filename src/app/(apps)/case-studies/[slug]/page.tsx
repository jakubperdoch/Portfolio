import { getPayload } from "payload";
import config from "@payload-config";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import JsonLd from "@/lib/JsonLd";
import { getServerSideURL } from "@/utilities/getURL";
import { constructMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

import CaseStudyClient from "./client";

type Args = {
  params: Promise<{ slug: string }>;
};

async function getProject(slug: string) {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "projects",
    limit: 1,
    where: {
      slug: { equals: slug },
      visibility: { equals: "public" },
    },
  });

  return result.docs[0] ?? null;
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return { title: "Case Study Not Found", robots: { index: false, follow: false } };
  }

  const image = typeof project.image === "object" ? project.image : null;

  return constructMetadata({
    title: project.title,
    description: project.description,
    path: `/case-studies/${project.slug}`,
    image: image?.url ?? undefined,
    type: "article",
  });
}

export default async function CaseStudyPage({ params }: Args) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: `${getServerSideURL()}/case-studies/${project.slug}`,
    author: {
      "@type": "Person",
      name: "Jakub Perďoch",
    },
  };

  return (
    <>
      <JsonLd data={projectSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Case Studies", path: "/case-studies" },
          { name: project.title, path: `/case-studies/${project.slug}` },
        ])}
      />
      <CaseStudyClient project={project} />
    </>
  );
}
