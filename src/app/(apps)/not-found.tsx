import type { Metadata } from "next";

import ErrorScreen from "@/components/Layout/ErrorScreen";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Page not found",
  description: "The page you were looking for does not exist or has been moved.",
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
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
  );
}
