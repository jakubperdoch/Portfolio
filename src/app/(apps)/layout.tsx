import React from "react";
import type { Metadata } from "next";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { BackToTop } from "@/components/Layout/BackToTop";
import { Analytics } from "@vercel/analytics/next";

import { Geist, Geist_Mono, Lora, Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { getServerSideURL } from "@/utilities/getURL";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: getServerSideURL() }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
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

const outfitHeading = Outfit({ subsets: ["latin"], variable: "--font-heading" });
const lora = Lora({ subsets: ["latin"], variable: "--font-serif" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <html lang="en">
        <body
          className={cn(
            geistSans.variable,
            geistMono.variable,
            "font-serif",
            lora.variable,
            outfitHeading.variable
          )}
        >
          <Analytics />
          <Header />
          {children}
          <Footer />
          <BackToTop />
        </body>
      </html>
    </>
  );
}
