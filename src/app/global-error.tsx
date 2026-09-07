"use client";

// Rendered when the root layout itself fails, so it replaces the layout
// entirely: no global stylesheet, no fonts, no Header/Footer, and no
// next-intl provider. The copy is inlined per locale on purpose, and the
// locale is read straight off the URL because there is no request context
// left to ask.
const COPY = {
  en: {
    eyebrow: "Something went wrong",
    title: "The site failed to load.",
    description:
      "An unexpected error broke the page before it could render. Trying again usually helps.",
    tryAgain: "Try again",
    backHome: "Back home",
    reference: "Error reference:",
    documentTitle: "Something went wrong — Jakub Perďoch",
    home: "/",
  },
  sk: {
    eyebrow: "Niečo sa pokazilo",
    title: "Stránku sa nepodarilo načítať.",
    description:
      "Neočakávaná chyba prerušila vykreslenie stránky. Opakovaný pokus to zvyčajne vyrieši.",
    tryAgain: "Skúsiť znova",
    backHome: "Späť domov",
    reference: "Referencia chyby:",
    documentTitle: "Niečo sa pokazilo — Jakub Perďoch",
    home: "/sk",
  },
} as const;

function resolveLocale(): keyof typeof COPY {
  if (typeof window === "undefined") return "en";
  return window.location.pathname.startsWith("/sk") ? "sk" : "en";
}

export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  const locale = resolveLocale();
  const copy = COPY[locale];

  return (
    <html lang={locale}>
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
        <title>{copy.documentTitle}</title>
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
            {copy.eyebrow}
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
            {copy.title}
          </h1>
          <p style={{ margin: "1rem 0 0", lineHeight: 1.7, color: "#52525b" }}>
            {copy.description}
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
              {copy.tryAgain}
            </button>
            {/* A plain anchor: the app shell failed to render, so a full
                document load is the point of this link. */}
            <a
              href={copy.home}
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
              {copy.backHome}
            </a>
          </div>
          {error.digest ? (
            <p style={{ marginTop: "3rem", fontSize: "0.75rem", color: "#a1a1aa" }}>
              {copy.reference}{" "}
              <span style={{ fontFamily: "ui-monospace, monospace" }}>{error.digest}</span>
            </p>
          ) : null}
        </main>
      </body>
    </html>
  );
}
