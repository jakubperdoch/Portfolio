import { JSXConverters } from "@payloadcms/richtext-lexical/react";
import { SerializedTextNode } from "@payloadcms/richtext-lexical";
import { FontSizeVariables } from "@/fields/features/fontSizeFeature/utils/variables";
import React from "react";

type SerializedStyledTextNode = SerializedTextNode & {
  type: "styled-text";
  version: 1;
  style?: string;
};

type TextLike = SerializedTextNode | SerializedStyledTextNode;

const IS_BOLD = 1;
const IS_ITALIC = 2;
const IS_STRIKETHROUGH = 4;
const IS_UNDERLINE = 8;
const IS_CODE = 16;
const IS_SUBSCRIPT = 32;
const IS_SUPERSCRIPT = 64;

const responsiveFontMap = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-base md:text-lg",
  xl: "text-lg md:text-xl",
  "2xl": "text-xl md:text-2xl",
  "3xl": "text-2xl md:text-3xl",
  "4xl": "text-3xl md:text-4xl",
  "5xl": "text-4xl md:text-5xl",
  "6xl": "text-5xl md:text-6xl",
  "7xl": "text-6xl md:text-7xl",
  "8xl": "text-7xl md:text-8xl",
  "9xl": "text-8xl md:text-9xl",
};

const parseInlineStyle = (styleStr?: string): React.CSSProperties => {
  const out: Record<string, string> = {};
  if (!styleStr) return out;
  styleStr
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean)
    .forEach((rule) => {
      const idx = rule.indexOf(":");
      if (idx === -1) return;
      const rawKey = rule.slice(0, idx).trim();
      const value = rule.slice(idx + 1).trim();
      const camelKey = rawKey
        .replace(/^-ms-/, "ms-")
        .replace(/-([a-z])/g, (_, l) => l.toUpperCase());
      out[camelKey] = value;
    });
  return out;
};

const renderTextLike = ({ node }: { node: TextLike }) => {
  const styles: React.CSSProperties = parseInlineStyle((node as any).style);
  let fontSizeClass = "";

  const sizeFromStyle = styles.fontSize as string | undefined;
  if (sizeFromStyle) {
    const sizeKey = (
      Object.entries(FontSizeVariables) as Array<
        [keyof typeof FontSizeVariables, { css: Record<string, string> }]
      >
    ).find(([_, def]) => def.css["font-size"] === sizeFromStyle)?.[0];

    if (sizeKey && responsiveFontMap[sizeKey]) {
      fontSizeClass = responsiveFontMap[sizeKey];
      if (styles.lineHeight) delete styles.lineHeight;

      delete styles.fontSize;
    }
  }

  const stateKey = (node as any).$?.fontSize as keyof typeof responsiveFontMap | undefined;
  if (!fontSizeClass && stateKey && responsiveFontMap[stateKey]) {
    fontSizeClass = responsiveFontMap[stateKey];
  }

  let content: React.ReactNode = (node as any).text;
  if ((node as any).format & IS_BOLD) content = <strong style={styles}>{content}</strong>;
  if ((node as any).format & IS_ITALIC) content = <em style={styles}>{content}</em>;
  if ((node as any).format & IS_STRIKETHROUGH)
    content = <span style={{ textDecoration: "line-through" }}>{content}</span>;
  if ((node as any).format & IS_UNDERLINE)
    content = <span style={{ textDecoration: "underline" }}>{content}</span>;
  if ((node as any).format & IS_CODE) content = <code>{content}</code>;
  if ((node as any).format & IS_SUBSCRIPT) content = <sub>{content}</sub>;
  if ((node as any).format & IS_SUPERSCRIPT) content = <sup>{content}</sup>;

  // Only wrap in a span when there is something to carry — otherwise every
  // plain word ends up inside an empty <span class="">.
  if (!fontSizeClass && Object.keys(styles).length === 0) {
    return <>{content}</>;
  }

  return (
    <span style={styles} className={fontSizeClass || undefined}>
      {content}
    </span>
  );
};

export const textConverter: JSXConverters<TextLike> = {
  text: renderTextLike,
  "styled-text": renderTextLike,
};
