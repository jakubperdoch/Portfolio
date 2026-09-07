import { createNavigation } from "next-intl/navigation";

import { routing } from "@/i18n/routing";

// Locale-aware replacements for `next/link` and `next/navigation`. Always
// import these instead of the Next.js originals inside the localized tree —
// they add the `/sk` prefix automatically and leave English paths untouched.
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
