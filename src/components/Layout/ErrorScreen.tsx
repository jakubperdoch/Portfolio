"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { IconArrowUpRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export type ErrorScreenAction = {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: "solid" | "ghost";
};

type ErrorScreenProps = {
  code: string;
  eyebrow: string;
  title: React.ReactNode;
  description: React.ReactNode;
  actions: ErrorScreenAction[];
  footnote?: React.ReactNode;
};

const suggestedLinks: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export default function ErrorScreen({
  code,
  eyebrow,
  title,
  description,
  actions,
  footnote,
}: ErrorScreenProps) {
  return (
    <section className="container mx-auto flex min-h-screen flex-col justify-center py-32 max-lg:px-8">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="font-heading text-sm tracking-[0.3em] text-zinc-500 uppercase"
      >
        {eyebrow}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.05 }}
        aria-hidden
        className="font-heading mt-4 text-[26vw] leading-[0.85] font-light tracking-tighter text-zinc-200 md:text-[16vw]"
      >
        {code}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-heading mt-8 max-w-3xl text-3xl leading-[1.1] font-light tracking-tighter text-zinc-500 md:text-5xl"
      >
        {title}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="mt-6 max-w-[60ch] text-sm leading-relaxed font-light text-zinc-600 md:text-base"
      >
        {description}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-10 flex flex-wrap items-center gap-3"
      >
        {actions.map((action) => {
          const className = cn(
            "font-heading inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm uppercase transition-colors duration-300",
            action.variant === "ghost"
              ? "border border-zinc-300 text-zinc-700 hover:border-zinc-900 hover:text-zinc-900"
              : "bg-zinc-900 text-white hover:bg-zinc-900/85"
          );

          return action.href ? (
            <Link key={action.label} href={action.href} className={className}>
              {action.label}
              <IconArrowUpRight size={16} stroke={2} />
            </Link>
          ) : (
            <button key={action.label} type="button" onClick={action.onClick} className={className}>
              {action.label}
            </button>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-16 border-t border-zinc-200 pt-6"
      >
        <p className="font-heading text-xs tracking-[0.3em] text-zinc-400 uppercase">
          Or jump straight to
        </p>
        <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
          {suggestedLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-zinc-600 underline-offset-4 transition-colors duration-300 hover:text-zinc-900 hover:underline"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        {footnote ? <div className="mt-6 text-xs text-zinc-400">{footnote}</div> : null}
      </motion.div>
    </section>
  );
}
