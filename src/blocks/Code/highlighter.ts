import { createHighlighter, type Highlighter } from "shiki";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";

import { isCodeLanguage } from "./languages";

export const codeThemes = { light: "vitesse-light", dark: "vitesse-dark" } as const;

let highlighterPromise: Promise<Highlighter> | null = null;

const getHighlighter = (): Promise<Highlighter> => {
  highlighterPromise ??= createHighlighter({
    themes: [codeThemes.light, codeThemes.dark],
    langs: [],
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
