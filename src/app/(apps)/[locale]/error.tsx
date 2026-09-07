"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";

import ErrorScreen from "@/components/Layout/ErrorScreen";

export default function ErrorPage({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  const t = useTranslations("ErrorPage");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorScreen
      code="500"
      eyebrow={t("eyebrow")}
      title={t.rich("title", {
        em: (chunks) => <span className="font-serif text-zinc-900 italic">{chunks}</span>,
      })}
      description={t("description")}
      actions={[
        { label: t("tryAgain"), onClick: () => retry() },
        { label: t("reportIt"), href: "/contact", variant: "ghost" },
      ]}
      footnote={
        error.digest ? (
          <>
            {t("reference")} <span className="font-mono">{error.digest}</span>
          </>
        ) : null
      }
    />
  );
}
