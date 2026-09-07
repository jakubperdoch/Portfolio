import React from "react";
import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { BackToTop } from "@/components/Layout/BackToTop";
import { routing } from "@/i18n/routing";
import { alternateLanguages, siteConfig } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { getServerSideURL } from "@/utilities/getURL";

import { Geist, Geist_Mono, Lora, Outfit } from "next/font/google";
import "../globals.css";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

// Both locales are known up front, so every route can be prerendered per locale.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: Omit<LocaleLayoutProps, "children">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    metadataBase: new URL(getServerSideURL()),
    title: {
      default: t("siteTitle"),
      template: `%s — ${siteConfig.name}`,
    },
    description: t("siteDescription"),
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.name, url: getServerSideURL() }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    alternates: {
      languages: alternateLanguages("/"),
    },
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon.ico", sizes: "any" },
      ],
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#09090b",
};

// `next/font` only accepts literal options, so the Latin Extended-A subset —
// which carries the Slovak diacritics (ď, ĺ, ň, ô, ŕ, ť, ž…) the bare `latin`
// subset drops — is repeated on each call rather than shared via a constant.
const outfitHeading = Outfit({ subsets: ["latin", "latin-ext"], variable: "--font-heading" });
const lora = Lora({ subsets: ["latin", "latin-ext"], variable: "--font-serif" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
});

export default async function MainLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  // `[locale]` acts as a catch-all for unmatched top-level paths, so anything
  // that is not a real locale has to 404 rather than render an empty shell.
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Opts this route tree into static rendering instead of forcing every page
  // to become dynamic on the first `useTranslations` call.
  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          "font-serif",
          lora.variable,
          outfitHeading.variable
        )}
      >
        <NextIntlClientProvider>
          <SpeedInsights />
          <Analytics />
          <Header />
          {children}
          <Footer />
          <BackToTop />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
