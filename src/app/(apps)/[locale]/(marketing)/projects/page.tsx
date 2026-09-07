import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { getCaseStudies } from "@/app/actions/case-study";
import type { AppLocale } from "@/i18n/routing";
import JsonLd from "@/lib/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { constructMetadata } from "@/lib/seo";

import WorkClient from "./client";

type ProjectsPageProps = {
  params: Promise<{ locale: AppLocale }>;
};

export async function generateMetadata({ params }: ProjectsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return constructMetadata({
    locale,
    title: t("projects.title"),
    description: t("projects.description"),
    path: "/projects",
  });
}

export default async function WorkPage({ params }: ProjectsPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Breadcrumbs" });

  const resultCaseStudies = await getCaseStudies({ locale, featuredOnly: false });
  const caseStudies =
    resultCaseStudies.success && resultCaseStudies.caseStudies ? resultCaseStudies.caseStudies : [];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(
          [
            { name: t("home"), path: "/" },
            { name: t("projects"), path: "/projects" },
          ],
          locale
        )}
      />
      <WorkClient caseStudies={caseStudies} />
    </>
  );
}
