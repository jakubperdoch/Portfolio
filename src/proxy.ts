import createMiddleware from "next-intl/middleware";

import { routing } from "@/i18n/routing";

// Next.js 16 renamed the `middleware` file convention to `proxy`.
export const proxy = createMiddleware(routing);

export const config = {
  /**
   * Locale handling applies to the public site only. The Payload admin
   * (`/admin`), its REST/GraphQL endpoints (`/api`), the app's own route
   * handlers, Next.js internals and anything with a file extension
   * (`/sitemap.xml`, `/robots.txt`, `/resume.pdf`, `/icons/*.svg`) are all
   * excluded — rewriting those to `/en/...` would 404 them.
   */
  matcher: ["/((?!admin|api|_next|_vercel|.*\\..*).*)"],
};
