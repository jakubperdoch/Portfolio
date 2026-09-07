import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
// The `[locale]` segment sits above the root layout, so Next.js exposes it as a
// root param. next-intl deprecated its own `requestLocale` in favour of this.
import { locale as localeRootParam } from "next/root-params";

import { routing } from "@/i18n/routing";

export default getRequestConfig(async ({ locale, requestLocale }) => {
  // 1. An explicit override, e.g. `getTranslations({ locale: "sk" })`.
  let requested: string | undefined = locale;

  // 2. The `[locale]` root param. Unavailable outside the Server Component
  //    tree (route handlers, server actions), hence the guard.
  if (!requested) {
    try {
      requested = await localeRootParam();
    } catch {
      requested = undefined;
    }
  }

  // 3. Whatever the proxy matched, for the contexts step 2 cannot serve.
  if (!requested) {
    requested = await requestLocale;
  }

  const active = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return {
    locale: active,
    messages: (await import(`../../messages/${active}.json`)).default,
    // Dates and numbers render in the visitor's locale; the timezone is fixed
    // so server and client agree during hydration.
    timeZone: "Europe/Bratislava",
  };
});
