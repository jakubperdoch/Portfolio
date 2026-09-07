import type { Metadata } from "next";
import { Geist, Geist_Mono, Lora, Outfit } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";

import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import ErrorScreen from "@/components/Layout/ErrorScreen";
import { defaultLocale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

// Unmatched URLs never reach a root layout — this app has one per route group,
// so Next.js renders this file inside its own generated document. The
// stylesheet and fonts the layouts normally provide have to be pulled in here.
import "./(apps)/globals.css";

const outfitHeading = Outfit({ subsets: ["latin", "latin-ext"], variable: "--font-heading" });
const lora = Lora({ subsets: ["latin", "latin-ext"], variable: "--font-serif" });
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin", "latin-ext"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin", "latin-ext"] });

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: defaultLocale, namespace: "Metadata" });

  return {
    title: t("notFound.title"),
    description: t("notFound.description"),
    robots: { index: false, follow: false },
  };
}

export default async function RootNotFound() {
  // These URLs are excluded from the proxy (they carry a file extension, or
  // sit outside the localized tree), so there is no `[locale]` segment to read
  // and no provider above us. Fall back to the default locale and supply the
  // client context that Header/Footer/ErrorScreen expect.
  const t = await getTranslations({ locale: defaultLocale, namespace: "NotFound" });
  const messages = (await import(`../../messages/${defaultLocale}.json`)).default;

  return (
    <NextIntlClientProvider locale={defaultLocale} messages={messages}>
      <div
        className={cn(
          geistSans.variable,
          geistMono.variable,
          lora.variable,
          outfitHeading.variable,
          "bg-background text-foreground font-serif"
        )}
      >
        <Header />
        <ErrorScreen
          code="404"
          eyebrow={t("eyebrow")}
          title={t.rich("title", {
            em: (chunks) => <span className="font-serif text-zinc-900 italic">{chunks}</span>,
          })}
          description={t("description")}
          actions={[
            { label: t("backHome"), href: "/" },
            { label: t("seeProjects"), href: "/projects", variant: "ghost" },
          ]}
        />
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}
