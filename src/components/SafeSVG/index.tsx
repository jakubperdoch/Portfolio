"use client";
import { useMemo, useSyncExternalStore } from "react";
import Image from "next/image";

type Props = {
  svg?: string | null;
  className?: string;
  size?: number;
  color?: string;
};

function noopSubscribe() {
  return () => {};
}

function getServerVarColor() {
  return undefined;
}

export default function SafeSVG({ svg, className, size = 20, color }: Props) {
  const varProp = useMemo(() => color?.match(/^var\((--[\da-z\-]+)\)\s*$/i)?.[1], [color]);

  const resolvedVarColor = useSyncExternalStore(
    noopSubscribe,
    () => {
      if (!varProp) return undefined;
      const raw = getComputedStyle(document.documentElement).getPropertyValue(varProp).trim();
      return raw ? `hsl(${raw})` : undefined;
    },
    getServerVarColor,
  );

  const resolvedColor = varProp ? resolvedVarColor : color;

  const dataUrl = useMemo(() => {
    if (!svg) return null;
    const s = svg.trim();
    const colored = resolvedColor ? s.replaceAll("currentColor", resolvedColor) : s;
    return `data:image/svg+xml;utf8,${encodeURIComponent(colored)}`;
  }, [svg, resolvedColor]);

  if (!dataUrl) return null;

  return (
    <Image
      src={dataUrl}
      alt="icon"
      width={size}
      height={size}
      className={className}
      loading="lazy"
      unoptimized
    />
  );
}
