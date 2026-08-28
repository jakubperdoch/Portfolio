"use client";

import { useEffect } from "react";

import ErrorScreen from "@/components/Layout/ErrorScreen";

export default function ErrorPage({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorScreen
      code="500"
      eyebrow="Something went wrong"
      title={
        <>
          This one is on me, not on <span className="font-serif text-zinc-900 italic">you.</span>
        </>
      }
      description="An unexpected error interrupted this page while it was loading. Trying again often clears it — if it keeps happening, I would genuinely like to hear about it."
      actions={[
        { label: "Try again", onClick: () => retry() },
        { label: "Report it", href: "/contact", variant: "ghost" },
      ]}
      footnote={
        error.digest ? (
          <>
            Error reference: <span className="font-mono">{error.digest}</span>
          </>
        ) : null
      }
    />
  );
}
