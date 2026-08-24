import { createHighlighter, type Highlighter } from "shiki";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";

import { isCodeLanguage } from "./languages";

/**
 * Dual theme: shiki emits both palettes as CSS custom properties and
 * `globals.css` picks one per color scheme, so a theme switch needs no re-render.
 */
export const codeThemes = { light: "vitesse-light", dark: "vitesse-dark" } as const;

// One highlighter for the whole server process — creating it per request would
// re-parse the theme files every time. Grammars are loaded lazily on first use.
let highlighterPromise: Promise<Highlighter> | null = null;

const getHighlighter = (): Promise<Highlighter> => {
  highlighterPromise ??= createHighlighter({
    themes: [codeThemes.light, codeThemes.dark],
    langs: [],
    // The JavaScript engine keeps the WASM binary out of the server bundle.
    engine: createJavaScriptRegexEngine({ forgiving: true }),
  });
  return highlighterPromise;
};

export async function highlightCode(code: string, language?: string | null): Promise<string> {
  const highlighter = await getHighlighter();
  let lang = isCodeLanguage(language) ? language : "text";

  if (lang !== "text") {
    try {
      await highlighter.loadLanguage(lang);
    } catch {
      lang = "text";
    }
  }

  return highlighter.codeToHtml(code, {
    lang,
    themes: codeThemes,
    defaultColor: false,
  });
}
