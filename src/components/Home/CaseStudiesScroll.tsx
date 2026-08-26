"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { TextAnimate } from "@/components/ui/text-animate";
import type { Project } from "@/payload-types";
import CaseStudiesCard from "@/components/Home/CaseStudiesCard";

import "swiper/css";

export type CaseStudy = Project;

const PINNED_QUERY = "(min-width: 1024px)";
const EDGE_OFFSET = 32;

function subscribeToPinned(onChange: () => void) {
  const query = window.matchMedia(PINNED_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function useIsPinned() {
  return useSyncExternalStore(
    subscribeToPinned,
    () => window.matchMedia(PINNED_QUERY).matches,
    () => false
  );
}

interface CaseStudiesScrollProps {
  className?: string;
  caseStudies: CaseStudy[];
}

export default function CaseStudiesScroll({ className, caseStudies }: CaseStudiesScrollProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const isPinned = useIsPinned();

  const navId = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const prevClass = `case-studies-prev-${navId}`;
  const nextClass = `case-studies-next-${navId}`;

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const [scrollDistance, setScrollDistance] = useState(0);

  useEffect(() => {
    if (!isPinned) return;

    const track = trackRef.current;
    const content = contentRef.current;
    if (!track || !content) return;

    const measure = () => {
      const visible = track.clientWidth;
      const total = content.scrollWidth;
      if (visible === 0 || total === 0) return;
      setScrollDistance(Math.max(0, Math.round(total - visible)));
    };

    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(track);
    resizeObserver.observe(content);
    document.fonts?.ready.then(measure).catch(() => {});

    return () => resizeObserver.disconnect();
  }, [caseStudies.length, isPinned]);

  const pinnedDistance = isPinned ? scrollDistance : 0;
  const xCord = useTransform(scrollYProgress, [0, 1], [0, -pinnedDistance]);

  const navButtonClass =
    "flex size-11 cursor-pointer items-center justify-center rounded-full border border-zinc-300 text-zinc-900 transition-colors duration-300 hover:bg-zinc-900 hover:text-white [&.swiper-button-disabled]:pointer-events-none [&.swiper-button-disabled]:opacity-30 [&.swiper-button-lock]:hidden";

  return (
    <section
      ref={targetRef}
      className={cn("relative", className)}
      style={pinnedDistance > 0 ? { height: `calc(100svh + ${pinnedDistance}px)` } : undefined}
    >
      <div
        className={cn(
          "flex flex-col",
          isPinned ? "sticky top-0 h-svh justify-center overflow-x-clip" : "gap-10 py-24"
        )}
      >
        {/* Header */}
        <div
          className={cn("container mx-auto max-lg:px-8", isPinned && "absolute inset-x-0 top-24")}
        >
          <div className="mx-auto flex max-w-screen-2xl flex-col justify-between gap-4 md:flex-row md:items-end md:gap-8">
            <TextAnimate
              animation="blurInUp"
              by="word"
              className="font-heading text-4xl font-medium tracking-tight text-zinc-900 md:text-6xl"
            >
              Selected Work
            </TextAnimate>
            <p className="font-heading max-w-sm font-light text-zinc-600 md:text-base">
              A collection of projects exploring the boundary between digital precision and human
              experience.
            </p>
          </div>
        </div>

        {isPinned ? (
          <div ref={trackRef} className="container mx-auto">
            <motion.div
              ref={contentRef}
              style={{ x: xCord }}
              className="flex gap-14 will-change-transform"
            >
              {caseStudies.map((caseStudy, index) => (
                <CaseStudiesCard key={caseStudy.id} caseStudy={caseStudy} index={index} />
              ))}
            </motion.div>
          </div>
        ) : (
          <div className="container mx-auto">
            <Swiper
              modules={[Navigation]}
              slidesPerView="auto"
              spaceBetween={40}
              slidesOffsetBefore={EDGE_OFFSET}
              slidesOffsetAfter={EDGE_OFFSET}
              breakpoints={{ 768: { spaceBetween: 56 } }}
              navigation={{ prevEl: `.${prevClass}`, nextEl: `.${nextClass}` }}
              grabCursor
            >
              {caseStudies.map((caseStudy, index) => (
                <SwiperSlide key={caseStudy.id} className="w-auto!">
                  <CaseStudiesCard caseStudy={caseStudy} index={index} />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="mt-8 flex justify-end gap-3 px-8">
              <button
                type="button"
                aria-label="Previous project"
                className={cn(prevClass, navButtonClass)}
              >
                <IconArrowLeft stroke={1.5} size={20} />
              </button>
              <button
                type="button"
                aria-label="Next project"
                className={cn(nextClass, navButtonClass)}
              >
                <IconArrowRight stroke={1.5} size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
