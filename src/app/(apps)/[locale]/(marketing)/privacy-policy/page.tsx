import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import type { AppLocale } from "@/i18n/routing";
import JsonLd from "@/lib/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { constructMetadata } from "@/lib/seo";

import PrivacyPolicyClient from "./client";

type PrivacyPolicyPageProps = {
  params: Promise<{ locale: AppLocale }>;
};

export async function generateMetadata({ params }: PrivacyPolicyPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return constructMetadata({
    locale,
    title: t("privacyPolicy.title"),
    description: t("privacyPolicy.description"),
    path: "/privacy-policy",
    noIndex: true,
  });
}

export default async function PrivacyPolicyPage({ params }: PrivacyPolicyPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Breadcrumbs" });

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(
          [
            { name: t("home"), path: "/" },
            { name: t("privacyPolicy"), path: "/privacy-policy" },
          ],
          locale
        )}
      />
      <PrivacyPolicyClient />
    </>
  );
}
