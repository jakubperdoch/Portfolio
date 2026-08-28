"use client";

// Rendered when the root layout itself fails, so it replaces the layout
// entirely: no global stylesheet, no fonts, no Header/Footer. Everything it
// needs is inlined here on purpose.
export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100svh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          backgroundColor: "#ffffff",
          color: "#18181b",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        }}
      >
        <title>Something went wrong — Jakub Perďoch</title>
        <main style={{ maxWidth: "36rem" }}>
          <p
            style={{
              margin: 0,
              fontSize: "0.75rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#71717a",
            }}
          >
            Something went wrong
          </p>
          <p
            aria-hidden
            style={{
              margin: "0.5rem 0 0",
              fontSize: "clamp(5rem, 22vw, 10rem)",
              lineHeight: 0.85,
              fontWeight: 300,
              letterSpacing: "-0.05em",
              color: "#e4e4e7",
            }}
          >
            500
          </p>
          <h1
            style={{
              margin: "1.5rem 0 0",
              fontSize: "clamp(1.5rem, 5vw, 2.25rem)",
              lineHeight: 1.15,
              fontWeight: 400,
              letterSpacing: "-0.03em",
              color: "#3f3f46",
            }}
          >
            The site failed to load.
          </h1>
          <p style={{ margin: "1rem 0 0", lineHeight: 1.7, color: "#52525b" }}>
            An unexpected error broke the page before it could render. Trying again usually helps.
          </p>
          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
              alignItems: "center",
            }}
          >
            <button
              type="button"
              onClick={() => retry()}
              style={{
                cursor: "pointer",
                border: "none",
                borderRadius: "9999px",
                padding: "0.7rem 1.25rem",
                fontSize: "0.875rem",
                textTransform: "uppercase",
                backgroundColor: "#18181b",
                color: "#ffffff",
              }}
            >
              Try again
            </button>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- the app shell
                failed to render, so a full document load is the point of this link. */}
            <a
              href="/"
              style={{
                borderRadius: "9999px",
                border: "1px solid #d4d4d8",
                padding: "0.7rem 1.25rem",
                fontSize: "0.875rem",
                textTransform: "uppercase",
                color: "#3f3f46",
                textDecoration: "none",
              }}
            >
              Back home
            </a>
          </div>
          {error.digest ? (
            <p style={{ marginTop: "3rem", fontSize: "0.75rem", color: "#a1a1aa" }}>
              Error reference:{" "}
              <span style={{ fontFamily: "ui-monospace, monospace" }}>{error.digest}</span>
            </p>
          ) : null}
        </main>
      </body>
    </html>
  );
}
