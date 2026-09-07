import { notFound } from "next/navigation";

/**
 * Without this catch-all, an unmatched path under a locale (`/sk/nope`) never
 * enters the `[locale]` tree and Next.js falls back to the app-level
 * `not-found.tsx`, which has no locale context and always renders English.
 * Matching here instead puts the 404 inside the localized layout, so
 * `[locale]/not-found.tsx` renders in the right language.
 */
export default function CatchAllNotFound() {
  notFound();
}
