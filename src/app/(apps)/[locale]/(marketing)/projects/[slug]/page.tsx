import { AppLocale } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import JsonLd from "@/lib/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import ProjectDetailClient from "@/app/(apps)/[locale]/(marketing)/projects/[slug]/client";
import type { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";

type ProjectDetailPageProps = {
  params: Promise<{ locale: AppLocale; slug: string }>;
};

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return constructMetadata({
    locale,
    title: t("projectDetail.title"),
    description: t("projectDetail.description"),
    path: `/projects/${slug}`,
  });
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "Breadcrumbs" });

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(
          [
            { name: t("home"), path: "/" },
            { name: t("projects"), path: "/projects" },
            { name: t("projectDetail"), path: `/projects/${slug}` },
          ],
          locale
        )}
      />
      <ProjectDetailClient />
    </>
  );
}
