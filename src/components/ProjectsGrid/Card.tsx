"use client";

import { Project } from "@/payload-types";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { shimmerBlurDataURL } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import { IconBrandGithub } from "@tabler/icons-react";

export const IMAGE_SIZES =
  "(min-width: 1536px) 716px, (min-width: 1280px) 588px, (min-width: 1024px) 460px, (min-width: 768px) 704px, (min-width: 640px) 576px, calc(100vw - 48px)";

export default function Card({ caseStudy, index }: { caseStudy: Project; index: number }) {
  const reducedMotion = useReducedMotion();
  const t = useTranslations("ProjectsPage");
  const image = typeof caseStudy.image === "object" ? caseStudy.image : null;

  return (
    <motion.article
      whileHover={"cardHover"}
      whileTap={"cardTap"}
      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.08 }}
      viewport={{ once: true }}
      className="relative flex cursor-pointer flex-col gap-4"
    >
      <Link
        href={"/projects/" + caseStudy.slug + "/"}
        aria-label={caseStudy.title}
        className="absolute inset-0 z-2 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-zinc-900"
      />

      <motion.div
        variants={{
          cardHover: {
            scale: reducedMotion ? 1 : 1.01,
          },
          cardTap: {
            scale: reducedMotion ? 1 : 0.99,
          },
        }}
        className="relative z-1 aspect-video overflow-hidden rounded-sm border border-zinc-100 bg-white shadow-sm"
      >
        {image?.url && (
          <Image
            fill
            sizes={IMAGE_SIZES}
            quality={100}
            loading={index < 2 ? "eager" : "lazy"}
            data-loaded="false"
            onLoad={(event) => {
              event.currentTarget.setAttribute("data-loaded", "true");
            }}
            placeholder="blur"
            blurDataURL={shimmerBlurDataURL(image.width ?? 1200, image.height ?? 800)}
            src={image.url}
            alt={image.alt || caseStudy.title}
            className="object-contain"
          />
        )}
      </motion.div>

      <div className="flex flex-col justify-between gap-4 xl:flex-row">
        <div className="flex flex-col gap-2">
          <motion.h3
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
          </motion.h3>
          <div className="flex max-w-lg flex-wrap gap-2">
            {caseStudy.techStack.map((tech, idx) => (
              <div
                key={idx}
                className="font-heading flex cursor-default gap-1 rounded-full bg-zinc-100 px-2.5 py-1.5 text-[10px] font-medium tracking-widest text-zinc-600 uppercase hover:text-zinc-900"
              >
                {tech.tech}
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          {caseStudy.liveLink && (
            <motion.a
              href={caseStudy.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("openLiveSite")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative z-10 h-fit rounded-full bg-zinc-100 p-2 transition-colors duration-300 hover:bg-zinc-200"
            >
              <ExternalLink size={22} />
            </motion.a>
          )}

          {caseStudy.githubLink && (
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={caseStudy.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("openSourceCode")}
              className="relative z-10 h-fit rounded-full bg-zinc-100 p-2 transition-colors duration-300 hover:bg-zinc-200"
            >
              <IconBrandGithub size={22} />
            </motion.a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
