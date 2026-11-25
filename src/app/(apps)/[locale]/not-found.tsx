import { useTranslations } from "next-intl";

import ErrorScreen from "@/components/Layout/ErrorScreen";

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
