"use client";

import { cn } from "@/lib/utils";
import { motion, useTransform } from "motion/react";
import { useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { TextAnimate } from "@/components/ui/text-animate";
import type { Project } from "@/payload-types";

export type CaseStudy = Project;

interface CaseStudiesScrollProps {
  className?: string;
  caseStudies: CaseStudy[];
}

export default function CaseStudiesScroll({ className, caseStudies }: CaseStudiesScrollProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  const isMobile = windowWidth <= 768;
  const xCord = useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? "-76%" : "-60%"]);

  return (
    <section ref={targetRef} className={cn("relative h-[400vh]", className)}>
      <div className="sticky top-0 container mx-auto flex h-screen items-center overflow-visible max-lg:px-8">
        {/* Header */}
        <div className="absolute top-24 left-0 w-full max-lg:px-8">
          <div className="mx-auto flex max-w-screen-2xl flex-col justify-between gap-8 md:flex-row md:items-end">
            <TextAnimate
              animation="blurInUp"
              by="word"
              className="font-heading text-4xl tracking-tight text-zinc-900 md:text-6xl"
            >
              Selected Work
            </TextAnimate>
            <p className="max-w-sm text-sm font-light text-zinc-600 md:text-base">
              A collection of projects exploring the boundary between digital precision and human
              experience.
            </p>
          </div>
        </div>

        {/* Scrollable Content */}
        <motion.div style={{ x: xCord }} className="mt-32 flex gap-10 md:gap-14">
          {caseStudies.map((caseStudy) => (
            <div
              key={caseStudy.id}
              className="group block w-[85vw] shrink-0 cursor-pointer md:w-[45vw] lg:w-[40vw]"
            >
              {caseStudy.imageUrl && (
                <Image
                  width={400}
                  height={400}
                  src={caseStudy.imageUrl}
                  alt={`Case Study ${caseStudy.id}`}
                />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
