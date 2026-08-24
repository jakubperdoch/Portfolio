import React from "react";

import { cn } from "@/lib/utils";

import { CopyButton } from "./CopyButton";
import { highlightCode } from "./highlighter";
import { codeLanguageLabel } from "./languages";

export type CodeBlockProps = {
  code: string;
  language?: string | null;
  filename?: string | null;
  showLineNumbers?: boolean | null;
  blockType: "code";
};

type Props = CodeBlockProps & {
  className?: string;
};

export const CodeBlock: React.FC<Props> = async ({
  className,
  code,
  language,
  filename,
  showLineNumbers = true,
}) => {
  if (!code) return null;

  const html = await highlightCode(code, language);

  return (
    <figure
      className={cn(
        "not-prose border-border bg-card overflow-hidden rounded-lg border",
        showLineNumbers && "code-block--numbered",
        className
      )}
    >
      <figcaption className="border-border bg-muted/60 flex items-center justify-between gap-3 border-b px-4 py-2">
        <span className="text-muted-foreground truncate font-mono text-xs">
          {filename || codeLanguageLabel(language)}
        </span>
        <CopyButton code={code} />
      </figcaption>

      <div dangerouslySetInnerHTML={{ __html: html }} />
    </figure>
  );
};
