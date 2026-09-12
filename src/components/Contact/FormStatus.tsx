"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";

import type { ContactState } from "@/lib/contact";

// The easing the rest of the site animates on (header menu, dock, footer).
const EASE = [0.22, 1, 0.36, 1] as const;

type FormStatusProps = {
  state: ContactState;
  /** Fallback address offered when delivery fails. */
  email: string;
};

export default function FormStatus({ state, email }: FormStatusProps) {
  const t = useTranslations("ContactPage");
  const reducedMotion = useReducedMotion();
  const success = state.status === "success";

  // The live region stays mounted so screen readers announce the card that
  // replaces it, rather than a region that appears already filled.
  return (
    <div role="status" aria-live="polite">
      <AnimatePresence mode="wait">
        {state.status !== "idle" && (
          <motion.div
            key={success ? "success" : `error-${state.error}`}
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.98 }}
            transition={
              reducedMotion
                ? { duration: 0.2 }
                : { type: "spring", stiffness: 420, damping: 32, mass: 0.9 }
            }
            className="flex items-start gap-3.5 rounded-2xl border border-zinc-200/80 bg-white/70 p-4 shadow-[0_1px_2px_rgba(9,9,11,0.04),0_12px_32px_-16px_rgba(9,9,11,0.22)] backdrop-blur-xl sm:p-5"
          >
            <motion.span
              initial={reducedMotion ? false : { scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 24, delay: 0.05 }}
              className={`flex size-9 shrink-0 items-center justify-center rounded-full ${
                success ? "bg-zinc-900" : "bg-red-500/10"
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className={`size-[18px] ${success ? "text-white" : "text-red-600"}`}
              >
                <motion.path
                  d={success ? "M5 12.5 10 17.5 19 7" : "M12 7v6.5"}
                  stroke="currentColor"
                  strokeWidth={2.25}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={reducedMotion ? false : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.45, ease: EASE, delay: 0.12 }}
                />
                {!success && (
                  <motion.circle
                    cx={12}
                    cy={17.5}
                    r={1.15}
                    fill="currentColor"
                    initial={reducedMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: 0.42 }}
                  />
                )}
              </svg>
            </motion.span>
            <div className="min-w-0">
              <p className="font-heading text-[15px] leading-6 font-medium tracking-tight text-zinc-900">
                {success ? t("successTitle") : t("errorTitle")}
              </p>
              <p className="mt-1 text-sm leading-6 text-zinc-600">
                {success ? (
                  t("success")
                ) : (
                  <>
                    {t(`errors.${state.error || "failed"}`)}{" "}
                    <a
                      href={`mailto:${email}`}
                      className="text-zinc-900 underline underline-offset-4 transition-colors hover:text-zinc-600"
                    >
                      {email}
                    </a>
                  </>
                )}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
