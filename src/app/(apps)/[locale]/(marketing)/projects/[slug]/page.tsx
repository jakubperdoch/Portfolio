import { notFound } from "next/navigation";
import { AppLocale } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import JsonLd from "@/lib/JsonLd";
import { breadcrumbSchema, creativeWorkSchema } from "@/lib/schema";
import ProjectDetailClient from "@/app/(apps)/[locale]/(marketing)/projects/[slug]/client";
import type { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import { getCaseStudy, getCaseStudySlugs } from "@/app/actions/case-study";
import type { Project } from "@/payload-types";

type ProjectDetailPageProps = {
  params: Promise<{ locale: AppLocale; slug: string }>;
};

function imageURL(project: Project): string | undefined {
  const image = project.image;
  return image && typeof image === "object" ? (image.url ?? undefined) : undefined;
}

export async function generateStaticParams() {
  const slugs = await getCaseStudySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const result = await getCaseStudy({ slug, locale });
  const project = result.success ? result.caseStudy : undefined;

  if (!project) {
    const t = await getTranslations({ locale, namespace: "Metadata" });

    return constructMetadata({
      locale,
      title: t("projectDetail.title"),
      description: t("projectDetail.description"),
      path: `/projects/${slug}`,
      noIndex: true,
    });
  }

  return constructMetadata({
    locale,
    title: project.title,
    description: project.description,
    path: `/projects/${slug}`,
    image: imageURL(project),
    type: "article",
    noIndex: project.visibility !== "public",
  });
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Breadcrumbs" });
  const resultCaseStudy = await getCaseStudy({ slug, locale });
  const caseStudy =
    resultCaseStudy.success && resultCaseStudy.caseStudy ? resultCaseStudy.caseStudy : null;

  if (!caseStudy) {
    notFound();
  }

  const path = `/projects/${slug}`;
  const liveLinks = [caseStudy.liveLink, caseStudy.githubLink].filter(
    (link): link is string => !!link
  );

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(
          [
            { name: t("home"), path: "/" },
            { name: t("projects"), path: "/projects" },
            { name: caseStudy.title, path },
          ],
          locale
        )}
      />
      <JsonLd
        data={creativeWorkSchema({
          locale,
          name: caseStudy.title,
          description: caseStudy.description,
          path,
          image: imageURL(caseStudy),
          keywords: caseStudy.techStack?.map(({ tech }) => tech),
          datePublished: caseStudy.createdAt,
          dateModified: caseStudy.updatedAt,
          sameAs: liveLinks,
        })}
      />
      <ProjectDetailClient {...caseStudy} />
    </>
  );
}
