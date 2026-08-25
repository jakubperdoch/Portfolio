"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { TextAnimate } from "@/components/ui/text-animate";
import type { Project } from "@/payload-types";
import CaseStudiesCard from "@/components/Home/CaseStudiesCard";

export type CaseStudy = Project;

interface CaseStudiesScrollProps {
  className?: string;
  caseStudies: CaseStudy[];
}

export default function CaseStudiesScroll({ className, caseStudies }: CaseStudiesScrollProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const scrollDistanceRef = useRef(0);
  const [scrollDistance, setScrollDistance] = useState(0);

  useEffect(() => {
    const viewport = viewportRef.current;
    const content = contentRef.current;
    if (!viewport || !content) return;

    const measure = () => {
      if (viewport.clientWidth === 0 || content.scrollWidth === 0) return;
      const distance = Math.max(0, content.scrollWidth - viewport.clientWidth);
      scrollDistanceRef.current = distance;
      setScrollDistance(distance);
    };

    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(viewport);
    resizeObserver.observe(content);

    document.fonts?.ready.then(measure);
    window.addEventListener("load", measure);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("load", measure);
    };
  }, [caseStudies.length]);

  const xCord = useTransform(scrollYProgress, (progress) => -progress * scrollDistanceRef.current);
  const sectionHeight = scrollDistance > 0 ? `calc(100vh + ${scrollDistance}px)` : "100vh";

  return (
    <section
      ref={targetRef}
      className={cn("relative", className)}
      style={{ height: sectionHeight }}
    >
      <div
        ref={viewportRef}
        className="sticky top-0 container mx-auto flex h-screen items-center overflow-visible max-lg:px-8"
      >
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
        <motion.div ref={contentRef} style={{ x: xCord }} className="flex gap-10 md:gap-14">
          {caseStudies.map((caseStudy) => (
            <CaseStudiesCard key={caseStudy.id} caseStudy={caseStudy} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
