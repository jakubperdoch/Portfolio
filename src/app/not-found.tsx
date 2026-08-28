import type { Metadata } from "next";
import { Geist, Geist_Mono, Lora, Outfit } from "next/font/google";

import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import ErrorScreen from "@/components/Layout/ErrorScreen";
import { cn } from "@/lib/utils";
import { constructMetadata } from "@/lib/seo";

// Unmatched URLs never reach a root layout — this app has one per route group,
// so Next.js renders this file inside its own generated document. The
// stylesheet and fonts the layouts normally provide have to be pulled in here.
import "./(apps)/globals.css";

const outfitHeading = Outfit({ subsets: ["latin"], variable: "--font-heading" });
const lora = Lora({ subsets: ["latin"], variable: "--font-serif" });
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = constructMetadata({
  title: "Page not found",
  description: "The page you were looking for does not exist or has been moved.",
  path: "/404",
  noIndex: true,
});

export default function RootNotFound() {
  return (
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
        eyebrow="Page not found"
        title={
          <>
            This page took a wrong turn{" "}
            <span className="font-serif text-zinc-900 italic">somewhere.</span>
          </>
        }
        description="The link may be outdated, the page may have been renamed, or it may never have existed at all. Nothing is broken — there is just nothing here."
        actions={[
          { label: "Back home", href: "/" },
          { label: "See projects", href: "/projects", variant: "ghost" },
        ]}
      />
      <Footer />
    </div>
  );
}
