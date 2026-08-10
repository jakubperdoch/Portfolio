"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { IconFileInvoice } from "@tabler/icons-react";
import GithubActivity from "@/components/ui/GithubActivity";
import { useEffect, useState } from "react";
import DockMenu from "@/components/layout/DockMenu";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [fullMenuOpen, setFullMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  useEffect(() => {
    if (fullMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [fullMenuOpen]);

  return (
    <>
      <header className="absolute top-0 right-0 left-0 z-50 bg-white">
        <nav className="flex w-full items-center justify-between p-6 px-6 py-6 lg:px-12">
          <Link
            href="/"
            className="font-heading text-xl font-bold tracking-tight text-zinc-900 capitalize transition-colors duration-300 ease-in-out hover:text-zinc-900/70"
          >
            Jakub
          </Link>

          <div className="flex items-center gap-6">
            <GithubActivity />

            <motion.a
              href="/resume.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="font-heading flex items-center gap-1.5 rounded-full bg-zinc-900 px-4 py-2 text-sm text-white uppercase"
            >
              <IconFileInvoice stroke={2} size={16} />
              Resume
            </motion.a>

            <motion.button
              onClick={() => setFullMenuOpen((val) => !val)}
              whileHover="menuButtonHover"
              whileTap="menuButtonTap"
              className="font-heading flex cursor-pointer items-center gap-1.5 uppercase"
            >
              <motion.span
                variants={{
                  menuButtonHover: {
                    opacity: 0,
                  },
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="text-sm font-medium text-zinc-900"
              >
                Menu
              </motion.span>
              <div className="flex flex-col items-end gap-1.5">
                <motion.div
                  variants={{
                    menuButtonHover: {
                      width: "2rem",
                    },
                    menuButtonTap: {
                      width: "1.5rem",
                    },
                  }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="h-0.5 w-6 bg-zinc-900"
                ></motion.div>
                <motion.div
                  variants={{
                    menuButtonHover: {
                      width: "2rem",
                    },
                    menuButtonTap: {
                      width: "1.5rem",
                    },
                  }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="h-0.5 w-4 bg-zinc-900"
                ></motion.div>
              </div>
            </motion.button>
          </div>
        </nav>
      </header>

      {/* Floating Dock Menu - Mobile or Scrolled */}
      <AnimatePresence mode="wait">
        {isScrolled && !fullMenuOpen && (
          <motion.div
            initial={{ y: 120 }}
            animate={{ y: 0 }}
            exit={{ y: 120 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}

            className="fixed bottom-8 left-1/2 z-60 -translate-x-1/2"
          >
            <DockMenu menuOpenHandler={() => setFullMenuOpen((val) => !val)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Menu - Desktop - Fully Open */}
      <AnimatePresence mode="wait">
        {fullMenuOpen && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="fixed inset-0 z-100 flex flex-col overflow-hidden bg-neutral-900"
          ></motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
