"use client";

import { Skill } from "@/payload-types";
import { TextAnimate } from "@/components/ui/text-animate";
import { SkillCategories } from "@/collections/Skills";
import SafeSVG from "@/components/SafeSVG";
import { motion } from "motion/react";

interface SkillProps {
  className?: string;
  skills: Skill[];
}

export default function Skills({ skills }: SkillProps) {
  return (
    <section className="container mx-auto space-y-8 pt-14 pb-8 max-lg:px-8 md:space-y-12">
      <div className="space-y-1.5">
        <p className="font-heading text-sm tracking-widest text-zinc-600 uppercase">Knowledge</p>
        <TextAnimate
          animation="blurInUp"
          by="word"
          className="font-heading text-4xl font-medium tracking-tight text-zinc-900 md:text-6xl"
        >
          Technical Stack
        </TextAnimate>

        <p className="font-heading max-w-sm font-light text-zinc-600 md:text-lg">
          A collection of technologies and tools I use to build robust, scalable, and
          high-performance digital products.
        </p>
      </div>

      <div className="flex flex-wrap justify-between gap-2">
        {skills.map((skill, idx) => {
          const skillCategory = SkillCategories.find(
            (category) => category.value == skill.category
          )?.label;
          return (
            <div key={idx} className="flex flex-col gap-8 md:gap-5">
              <span className="font-heading upload text-sm font-medium text-zinc-400">
                {skillCategory}
              </span>

              <div className="flex max-w-sm flex-wrap gap-4">
                {skill.items.map((item, idx) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    key={idx}
                    className="font-heading flex cursor-default gap-1 rounded-full bg-zinc-100 px-4 py-2 text-sm text-zinc-600 hover:text-zinc-900"
                  >
                    <SafeSVG svg={item.icon} />
                    {item.name}
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
