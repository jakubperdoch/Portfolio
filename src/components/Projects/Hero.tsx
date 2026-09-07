import { useTranslations } from "next-intl";

import { TextAnimate } from "@/components/ui/text-animate";

export default function Hero() {
  const t = useTranslations("ProjectsPage");

  return (
    <div className="container mx-auto flex flex-col gap-5 px-4 pt-36 max-lg:px-8 md:items-center md:justify-between lg:flex-row">
      <div>
        <p className="font-heading text-sm tracking-widest text-zinc-600 uppercase">
          {t("eyebrow")}
        </p>
        <TextAnimate className="font-heading text-6xl font-medium text-zinc-900 md:text-8xl">
          {t("title")}
        </TextAnimate>
      </div>
      <p className="font-heading max-w-sm font-light text-zinc-600 md:text-lg">
        {t("description")}
      </p>
    </div>
  );
}
