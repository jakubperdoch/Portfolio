import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import type { AppLocale } from "@/i18n/routing";
import JsonLd from "@/lib/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { constructMetadata } from "@/lib/seo";

import TermsOfServiceClient from "./client";

type TermsOfServicePageProps = {
  params: Promise<{ locale: AppLocale }>;
};

export async function generateMetadata({ params }: TermsOfServicePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return constructMetadata({
    locale,
    title: t("termsOfService.title"),
    description: t("termsOfService.description"),
    path: "/terms-of-service",
    noIndex: true,
  });
}

export default async function TermsOfServicePage({ params }: TermsOfServicePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Breadcrumbs" });

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(
          [
            { name: t("home"), path: "/" },
            { name: t("termsOfService"), path: "/terms-of-service" },
          ],
          locale
        )}
      />
      <TermsOfServiceClient />
    </>
  );
}
