import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work — Jakub Perďoch",
  description: "Work and experience of Jakub Perďoch.",
};

export default function WorkPage() {
  return (
    <div className="container mx-auto px-4 py-24 md:py-32">
      <h1 className="font-heading text-4xl leading-tight font-bold md:text-6xl">Work</h1>
      <p className="font-body text-foreground/80 mt-6 max-w-[60ch] text-base leading-relaxed md:text-lg">
        This page is not written yet.
      </p>
    </div>
  );
}
