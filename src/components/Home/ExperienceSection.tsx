"use client";

import { TextAnimate } from "@/components/ui/text-animate";
import { motion } from "motion/react";
import { useFormatter, useTranslations } from "next-intl";
import { Experience as ExperienceType } from "@/payload-types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    filter: "blur(12px)",
    y: 30,
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

interface ExperienceProps {
  className?: string;
  experiences: ExperienceType[];
}

const MONTH_YEAR = { month: "short", year: "numeric" } as const;

export default function ExperienceSection({ experiences }: ExperienceProps) {
  const t = useTranslations("Experience");
  const format = useFormatter();

  // Month names follow the active locale, so "Sep 2024" becomes "sep 2024" in
  // Slovak rather than staying English.
  function formatDateRange(experience: ExperienceType) {
    if (experience.customLabel) return experience.customLabel;

    const start = format.dateTime(new Date(experience.startDate), MONTH_YEAR);
    const end = experience.isCurrent
      ? t("present")
      : experience.endDate
        ? format.dateTime(new Date(experience.endDate), MONTH_YEAR)
        : "";

    return end ? `${start} — ${end}` : start;
  }

  return (
    <section className="bg-zinc-950">
      <div className="container mx-auto grid grid-cols-1 gap-12 pt-14 pb-8 max-lg:px-8 md:grid-cols-3 md:gap-24">
        {/* Header */}
        <div className="space-y-1.5">
          <p className="font-heading text-sm tracking-widest text-white/40 uppercase">
            {t("eyebrow")}
          </p>
          <TextAnimate
            animation="blurInUp"
            by="word"
            className="font-heading text-4xl font-bold text-white"
          >
            {t("title")}
          </TextAnimate>
          <p className="font-heading max-w-sm font-light text-white/40 md:text-lg">
            {t("description")}
          </p>
        </div>

        {/* Accordion List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1, margin: "-5% 0px -5% 0px" }}
          className="col-span-2 flex flex-col gap-4"
        >
          <Accordion className="w-full">
            {experiences.map((experience) => {
              // `responsibilities` is a localized array: a locale that has not
              // been translated yet (and predates the locale migration) comes
              // back as null rather than an empty list.
              const responsibilities = experience.responsibilities ?? [];

              return (
                <motion.div
                  key={experience.id}
                  variants={itemVariants}
                  style={{ backfaceVisibility: "hidden", transform: "translateZ(0)" }}
                >
                  <AccordionItem value={`item-${experience.id}`}>
                    <AccordionTrigger className="group hover:pl-4">
                      <div className="flex w-full flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex flex-col transition-colors duration-300 ease-in-out group-hover:opacity-80">
                          <span className="font-heading text-lg text-white md:text-xl">
                            {experience.company}
                          </span>
                          <span className="font-heading text-base font-light text-white/50 md:text-lg">
                            {experience.role}
                          </span>
                        </div>

                        <span className="font-heading text-xs font-extralight text-white/50 uppercase transition-colors duration-300 ease-in-out group-hover:text-white md:text-sm">
                          {formatDateRange(experience)}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="font-heading pl-0 md:pl-4">
                      <div className="flex flex-col gap-4">
                        {(experience.location || experience.employmentType) && (
                          <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-white/50">
                            {experience.location && <span>{experience.location}</span>}
                            {experience.location && experience.employmentType && <span>·</span>}
                            {experience.employmentType && (
                              <span>{t(`employmentType.${experience.employmentType}`)}</span>
                            )}
                          </div>
                        )}

                        <p className="text-white/70">{experience.description}</p>

                        {responsibilities.length > 0 && (
                          <ul className="flex flex-col gap-2">
                            {responsibilities.map((responsibility, idx) => (
                              <motion.li
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05, duration: 0.3 }}
                                className="flex items-start gap-3 text-sm font-light text-white/70"
                              >
                                <span className="text-white/30">—</span>
                                {responsibility.item}
                              </motion.li>
                            ))}
                          </ul>
                        )}

                        {experience.techStack && experience.techStack.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {experience.techStack.map((tech) => (
                              <Badge
                                key={tech.id ?? tech.tech}
                                className="font-heading bg-white text-sm"
                              >
                                {tech.tech}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              );
            })}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
