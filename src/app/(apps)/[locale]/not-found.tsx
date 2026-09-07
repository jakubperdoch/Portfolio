import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";

import ErrorScreen from "@/components/Layout/ErrorScreen";

// Rendered inside the localized layout, so the locale comes from the
// surrounding request context rather than from route params — `not-found`
// receives none. `notFound()` already injects `noindex` on its own.
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Metadata");

  return {
    title: t("notFound.title"),
    description: t("notFound.description"),
    robots: { index: false, follow: false },
  };
}

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <ErrorScreen
      code="404"
      eyebrow={t("eyebrow")}
      title={t.rich("title", {
        em: (chunks) => <span className="font-serif text-zinc-900 italic">{chunks}</span>,
      })}
      description={t("description")}
      actions={[
        { label: t("backHome"), href: "/" },
        { label: t("seeProjects"), href: "/projects", variant: "ghost" },
      ]}
    />
  );
}
