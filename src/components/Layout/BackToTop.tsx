"use client";

import { useEffect, useState } from "react";
import { useScroll, useSpring } from "framer-motion";
import { AnimatePresence, motion } from "motion/react";
import { IconArrowUpDashed } from "@tabler/icons-react";

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();

  const scrollProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ y: 120 }}
          animate={{ y: 0 }}
          exit={{ y: 120 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="group fixed right-12 bottom-8 z-60 hidden h-14 w-14 cursor-pointer items-center justify-center rounded-full border border-white bg-zinc-900 text-white shadow-2xl md:flex"
        >
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full -rotate-90"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-neutral-800"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
              strokeDasharray="289.027"
              style={{ pathLength: scrollProgress }}
              className="text-white"
            />
          </svg>

          <IconArrowUpDashed />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
