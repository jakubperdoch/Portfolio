"use client";

import { useId, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";

import { Link, usePathname } from "@/i18n/navigation";
import { type AppLocale, routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

// The easing the rest of the site animates on (header menu, dock, footer).
const EASE = [0.22, 1, 0.36, 1] as const;

const MotionLink = motion.create(Link);

type LocaleSwitcherProps = {
  className?: string;
  /** `light` sits on the white header, `dark` on the zinc-950 menu and footer. */
  tone?: "light" | "dark";
};

export default function LocaleSwitcher({ className, tone = "light" }: LocaleSwitcherProps) {
  const t = useTranslations("LocaleSwitcher");
  const activeLocale = useLocale() as AppLocale;
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  // Switching locale is a full document navigation (the `/en` → `/` redirect
  // that clears a stale locale cookie cannot be a soft transition), so this
  // component unmounts before the new page paints. Moving the pill optimistically
  // on click means the slide plays in the window where we are still mounted,
  // and the fresh page then renders with it already in place.
  const [pendingLocale, setPendingLocale] = useState<AppLocale | null>(null);
  const selectedLocale = pendingLocale ?? activeLocale;

  // Each instance needs its own indicator id — the header, the open menu and
  // the footer all render a switcher, and a shared `layoutId` would make their
  // pills fly into one another across the page.
  const indicatorId = `locale-indicator-${useId()}`;

  const isDark = tone === "dark";

  return (
    <div
      // A bare `aria-label` on a `div` is ignored; the group role gives it
      // something to attach to and announces the links as one control.
      role="group"
      aria-label={t("label")}
      className={cn(
        "font-heading flex items-center gap-0.5 rounded-full border p-0.5 text-xs uppercase",
        isDark ? "border-white/20" : "border-zinc-200",
        className
      )}
    >
      {routing.locales.map((locale) => {
        // The pill follows the optimistic choice, but `aria-current` keeps
        // telling the truth about which page is actually open.
        const isSelected = locale === selectedLocale;
        const isCurrent = locale === activeLocale;

        return (
          <MotionLink
            key={locale}
            // `usePathname` is locale-stripped, so the same value is the right
            // target for every locale and next-intl adds the prefix.
            href={pathname}
            locale={locale}
            // Replaces the current entry rather than stacking one per toggle,
            // so Back still leaves the site as the visitor expects.
            replace
            hrefLang={locale}
            lang={locale}
            aria-current={isCurrent ? "true" : undefined}
            onClick={(event) => {
              // A modified click opens a new tab and leaves this page on its
              // current locale, so the pill must not move for it. Next.js
              // ignores these for navigation too.
              if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
              if (event.button !== 0) return;
              setPendingLocale(locale);
            }}
            whileHover={reduceMotion ? undefined : { scale: 1.05 }}
            whileTap={reduceMotion ? undefined : { scale: 0.95 }}
            transition={{ duration: 0.3, ease: EASE }}
            className={cn(
              "relative rounded-full px-2.5 py-1 transition-colors duration-300",
              isSelected
                ? isDark
                  ? "text-zinc-900"
                  : "text-white"
                : isDark
                  ? "text-white/50 hover:bg-white/10 hover:text-white"
                  : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
            )}
          >
            {isSelected && (
              <motion.span
                aria-hidden
                layoutId={indicatorId}
                className={cn("absolute inset-0 rounded-full", isDark ? "bg-white" : "bg-zinc-900")}
                transition={reduceMotion ? { duration: 0 } : { duration: 0.45, ease: EASE }}
              />
            )}
            {/* The visible label is the bare code; screen readers get the
                language's own name instead of spelling out "EN". */}
            <span className="sr-only">{t(locale)}</span>
            <span aria-hidden className="relative">
              {locale}
            </span>
          </MotionLink>
        );
      })}
    </div>
  );
}
