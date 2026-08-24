"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

/**
 * Client shell for the fade-in. Keeping it separate lets `RichText` stay a
 * server component, which is what allows the code block to highlight on the
 * server instead of shipping shiki to the browser.
 */
export function Reveal({ children }: { children: ReactNode }) {
  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <motion.div variants={itemVariants}>{children}</motion.div>
    </motion.div>
  );
}
