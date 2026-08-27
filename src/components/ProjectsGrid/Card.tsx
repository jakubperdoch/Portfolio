"use client";

import { Project } from "@/payload-types";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { shimmerBlurDataURL } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import { IconBrandGithub } from "@tabler/icons-react";

const IMAGE_SIZES = "(min-width: 1024px) 40vw, (min-width: 768px) 45vw, 85vw";

export default function Card({ caseStudy, index }: { caseStudy: Project; index: number }) {
  const image = typeof caseStudy.image === "object" ? caseStudy.image : null;

  return (
    <motion.article
      whileHover={"cardHover"}
      whileTap={"cardTap"}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative flex cursor-pointer flex-col gap-4"
    >
      <Link
        href={"/projects/" + caseStudy.slug + "/"}
        aria-label={caseStudy.title}
        className="absolute inset-0 z-0"
      />

      <motion.div
        variants={{
          cardHover: {
            scale: 1.02,
          },
          cardTap: {
            scale: 0.98,
          },
        }}
        className="relative aspect-video overflow-hidden rounded-sm drop-shadow-lg"
      >
        {image?.url && (
          <Image
            fill
            sizes={IMAGE_SIZES}
            loading={index < 2 ? "eager" : "lazy"}
            placeholder="blur"
            blurDataURL={shimmerBlurDataURL(image.width ?? 1200, image.height ?? 800)}
            src={image.url}
            alt={image.alt || caseStudy.title}
            className="object-cover"
          />
        )}
      </motion.div>

      <div className="flex flex-col justify-between gap-8 lg:flex-row">
        <div className="flex flex-col gap-2">
          <h3 className="font-heading text-xl font-medium text-zinc-900 md:text-2xl">
            {caseStudy.title}
          </h3>
          <div className="flex max-w-lg flex-wrap gap-2">
            {caseStudy.techStack.map((tech, idx) => (
              <div
                key={idx}
                className="font-heading relative z-10 flex cursor-default gap-1 rounded-full bg-zinc-100 px-2.5 py-1.5 text-[10px] font-medium tracking-widest text-zinc-600 uppercase hover:text-zinc-900"
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
