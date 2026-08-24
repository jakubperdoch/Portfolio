import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — Jakub Perďoch",
  robots: { index: false },
};

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-24 md:py-32">
      <h1 className="font-heading text-4xl leading-tight font-bold md:text-6xl">
        Terms of Service
      </h1>
      <p className="font-body text-foreground/80 mt-6 max-w-[60ch] text-base leading-relaxed md:text-lg">
        These terms have not been written yet. They should not be treated as binding.
      </p>
    </div>
  );
}
