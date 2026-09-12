import type { Project } from "@/payload-types";
import { Link } from "@/i18n/navigation";
import { ChevronLeft } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { shimmerBlurDataURL } from "@/lib/utils";

// Matches the Tailwind container breakpoints and px-6 / sm:px-8 below.
const HERO_IMAGE_SIZES =
  "(min-width: 1536px) 1472px, (min-width: 1280px) 1216px, (min-width: 1024px) 960px, (min-width: 768px) 704px, (min-width: 640px) 576px, calc(100vw - 48px)";

export default async function Hero({ project }: { project: Project }) {
  const t = await getTranslations("ProjectDetail");
  const image = typeof project.image === "object" ? project.image : null;

  return (
    <header className="container mx-auto px-6 pt-32 sm:px-8 md:pt-40">
      <Link
        href="/projects"
        className="font-heading inline-flex items-center gap-2 text-sm text-zinc-600 transition-colors hover:text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-4"
      >
        <ChevronLeft aria-hidden="true" size={16} />
        {t("back")}
      </Link>
      <div className="mt-8 grid items-end gap-6 pb-10 md:pb-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-16">
        <h1 className="font-heading min-w-0 text-5xl leading-[1.05] font-medium tracking-tight wrap-break-word text-zinc-900 sm:text-6xl md:text-7xl">
          {project.title}
        </h1>
        <div className="space-y-6">
          <p className="font-heading max-w-xl text-base leading-relaxed font-light text-zinc-600 md:text-lg">
            {project.description}
          </p>
        </div>
      </div>
      {image?.url && (
        <div className="relative aspect-video overflow-hidden rounded-sm bg-white shadow-sm">
          <Image
            fill
            preload
            sizes={HERO_IMAGE_SIZES}
            quality={100}
            placeholder="blur"
            blurDataURL={shimmerBlurDataURL(image.width ?? 1200, image.height ?? 800)}
            src={image.url}
            alt={image.alt || project.title}
            className="object-contain"
          />
        </div>
      )}
    </header>
  );
}
