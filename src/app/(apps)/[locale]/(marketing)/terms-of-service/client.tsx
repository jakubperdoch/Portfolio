import { useTranslations } from "next-intl";
import LegalPage from "@/components/Legal/LegalPage";

export default function TermsOfServiceClient() {
  const t = useTranslations("TermsOfServicePage");

  return (
    <LegalPage
      eyebrow={t("eyebrow")}
      title={t("title")}
      updated={t("updated")}
      intro={t("intro")}
      sections={t.raw("sections") as { heading: string; body: string }[]}
    />
  );
}
