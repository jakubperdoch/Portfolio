import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import type { AppLocale } from "@/i18n/routing";
import JsonLd from "@/lib/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { constructMetadata } from "@/lib/seo";

import ContactClient from "./client";

type ContactPageProps = {
  params: Promise<{ locale: AppLocale }>;
};

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return constructMetadata({
    locale,
    title: t("contact.title"),
    description: t("contact.description"),
    path: "/contact",
  });
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Breadcrumbs" });

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(
          [
            { name: t("home"), path: "/" },
            { name: t("contact"), path: "/contact" },
          ],
          locale
        )}
      />
      <ContactClient />
    </>
  );
}
