"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { CaseStudy } from "@/components/Home/CaseStudiesSection";
import { shimmerBlurDataURL } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";
import { Link } from "@/i18n/navigation";

const IMAGE_SIZES = "(min-width: 1024px) 40vw, (min-width: 768px) 45vw, 85vw";

export default function Card({ caseStudy, index = 0 }: { caseStudy: CaseStudy; index?: number }) {
  const reducedMotion = useReducedMotion();
  const t = useTranslations("CaseStudies");
  const image = typeof caseStudy.image === "object" ? caseStudy.image : null;

  return (
    <motion.article
      whileHover={"cardHover"}
      whileTap={"cardTap"}
      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.08 }}
      viewport={{ once: true }}
      className="group relative flex w-[85vw] shrink-0 cursor-pointer snap-start flex-col gap-2.5 md:w-[45vw] lg:w-[40vw]"
    >
      <Link
        href={"/projects/" + caseStudy.slug + "/"}
        aria-label={caseStudy.title}
        className="absolute inset-0 z-2 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-zinc-900"
      />
      {image?.url && (
        <motion.div
          variants={{
            cardHover: {
              scale: reducedMotion ? 1 : 1.01,
            },
            cardTap: {
              scale: reducedMotion ? 1 : 0.99,
            },
          }}
          className="relative aspect-3/2 w-full overflow-hidden rounded-sm border border-zinc-100 bg-white shadow-sm"
        >
          <Image
            fill
            sizes={IMAGE_SIZES}
            loading={index < 2 ? "eager" : "lazy"}
            data-loaded="false"
            onLoad={(event) => {
              event.currentTarget.setAttribute("data-loaded", "true");
            }}
            placeholder="blur"
            blurDataURL={shimmerBlurDataURL(image.width ?? 1200, image.height ?? 800)}
            src={image.url}
            alt={image.alt || caseStudy.title}
            className="object-cover data-[loaded=false]:animate-pulse data-[loaded=false]:bg-gray-100/10"
          />
        </motion.div>
      )}

      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <motion.h4
            variants={{
              cardHover: {
                x: reducedMotion ? 0 : 4,
              },
              cardTap: {
                x: 0,
              },
            }}
            className="font-heading text-xl font-medium text-zinc-900 md:text-2xl"
          >
            {caseStudy.title}
          </motion.h4>
          <div className="font-heading flex flex-wrap gap-x-2 gap-y-0.5 text-sm font-extralight text-zinc-500 md:text-base">
            {caseStudy.techStack.slice(0, 3).map((tech, idx) => (
              <span key={idx}>{tech.tech}</span>
            ))}
          </div>
        </div>

        <span className="font-heading shrink-0 text-sm text-zinc-500 uppercase">
          {t(`visibility.${caseStudy.visibility}`)}
        </span>
      </div>
    </motion.article>
  );
}
