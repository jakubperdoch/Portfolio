import React from "react";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { BackToTop } from "@/components/Layout/BackToTop";

import { Geist, Geist_Mono, Lora, Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

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
          <Header />
          {children}
          <Footer />
          <BackToTop />
        </body>
      </html>
    </>
  );
}
