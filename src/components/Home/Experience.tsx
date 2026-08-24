"use client";

import { TextAnimate } from "@/components/ui/text-animate";
import { motion } from "motion/react";
import { Experience as ExperienceType } from "@/payload-types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/components/ui/accordion";

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

export default function Experience({ className, experiences }: ExperienceProps) {
  return (
    <section className="bg-zinc-950">
      <div className="container mx-auto grid grid-cols-1 pt-14 pb-8 max-lg:px-8 md:grid-cols-3">
        {/* Header */}
        <div className="space-y-1.5">
          <p className="font-heading text-sm tracking-widest text-white/40 uppercase">Experience</p>
          <TextAnimate
            animation="blurInUp"
            by="word"
            className="font-heading text-4xl font-bold text-white"
          >
            Commercial History.
          </TextAnimate>
          <p className="font-heading mt-4 text-sm text-white/40">
            Click on each role to explore responsibilities and achievements.
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
            {experiences.map((experience, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <AccordionItem>
                  <AccordionTrigger></AccordionTrigger>
                  <AccordionContent></AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
