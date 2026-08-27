"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { IconFileInvoice } from "@tabler/icons-react";
import GithubActivity from "@/components/ui/GithubActivity";
import React, { useEffect, useState } from "react";
import DockMenu from "@/components/Layout/DockMenu";
import { FileText, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";

const navigationLinks: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  // { label: "My Setup", href: "/my-setup" },
  { label: "Contact", href: "/contact" },
];

const profileLinks: { label: string; href: string; icon?: React.ReactNode }[] = [
  { label: "Github", href: "https://github.com/jakubperdoch" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jakub-perďoch/" },
  { label: "Resume", href: "/resume.pdf", icon: <FileText size={15} /> },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [fullMenuOpen, setFullMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const currentPath = usePathname();

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
        <nav className="container mx-auto flex w-full items-center justify-between py-6 max-lg:px-8">
          <Link
            href="/"
            className="font-heading text-xl font-bold tracking-tight text-zinc-900 capitalize transition-colors duration-300 ease-in-out hover:text-zinc-900/70"
          >
            Jakub
          </Link>

          <div className="flex items-center gap-6">
            <GithubActivity className="hidden md:flex" />

            <motion.a
              href="/resume.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="font-heading hidden items-center gap-1.5 rounded-full bg-zinc-900 px-4 py-2 text-sm text-white uppercase md:flex"
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
          >
            <div className="font-heading flex w-full flex-wrap items-center justify-between gap-x-8 gap-y-4 p-8 text-white lg:px-24">
              <p className="uppercase opacity-80">Navigation</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="flex cursor-pointer items-center gap-1"
                onClick={() => setFullMenuOpen((state) => !state)}
              >
                Close
                <X size={24} />
              </motion.button>
            </div>
            <div className="flex flex-1 items-center">
              <nav
                className="grid gap-x-24 gap-y-3 p-8 md:grid-cols-2 md:gap-y-6 lg:px-24"
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {navigationLinks.map((link, idx) => {
                  const isActive = currentPath === link.href;
                  const isAnyHovered = hoveredIndex !== null;
                  const isTarget = hoveredIndex === idx || (isActive && !isAnyHovered);
                  return (
                    <Link
                      key={idx}
                      href={link.href}
                      onMouseEnter={() => setHoveredIndex(idx)}
                      onClick={() => setFullMenuOpen(false)}
                      className={cn(
                        isTarget
                          ? "translate-x-2 text-white md:translate-x-4"
                          : "scale-95 text-white/20",
                        "font-heading h-fit w-full text-5xl transition-all duration-500 ease-out md:text-7xl"
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
            <Separator className="w-full bg-white/20" />
            <div className="flex flex-col px-8 py-12 md:flex-row md:items-end md:justify-between lg:px-24">
              <div className="font-heading space-y-2">
                <p className="text-white/20 uppercase">Contact</p>
                <motion.a
                  whileHover={"contactLinkHover"}
                  href="mailto:jakub.perdoch@gmail.com"
                  className="text-white transition-all duration-300 ease-in-out sm:text-lg"
                >
                  perdochjakub@gmail.com
                  <motion.div
                    variants={{
                      contactLinkHover: {
                        width: "100%",
                      },
                    }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="h-0.5 w-0 bg-white"
                  />
                </motion.a>
              </div>

              <div className="font-heading flex flex-wrap gap-x-2.5 gap-y-1 md:gap-8">
                {profileLinks.map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.href}
                    className="flex items-center gap-1 text-white/40 transition-colors duration-300 ease-in-out hover:text-white"
                  >
                    {link.label}
                    {link.icon && link.icon}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
