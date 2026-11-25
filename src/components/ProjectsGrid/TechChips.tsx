"use client";

import { useLayoutEffect, useRef, useState } from "react";

type TechChipsProps = {
  techs: string[];
  maxRows?: number;
};

export default function TechChips({ techs, maxRows = 2 }: TechChipsProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(techs.length);

  useLayoutEffect(() => {
    const row = rowRef.current;
    if (!row || visible <= 1) return;

    const children = Array.from(row.children) as HTMLElement[];
    if (children.length === 0) return;

    const rowOffsets = [...new Set(children.map((child) => child.offsetTop))].sort((a, b) => a - b);
    if (rowOffsets.length <= maxRows) return;

    // First row that no longer fits — everything from there down has to go.
    const cutoff = rowOffsets[maxRows];
    const chipsThatFit = children.filter(
      (child) => child.dataset.chip !== undefined && child.offsetTop < cutoff
    ).length;

    const next = Math.max(1, chipsThatFit < visible ? chipsThatFit : visible - 1);
    if (next < visible) setVisible(next);
  }, [visible, maxRows, techs.length]);

  useLayoutEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    let lastWidth = row.clientWidth;
    const observer = new ResizeObserver(() => {
      if (row.clientWidth !== lastWidth) {
        lastWidth = row.clientWidth;
        setVisible(techs.length);
      }
    });
    observer.observe(row);
    return () => observer.disconnect();
  }, [techs.length]);

  const hidden = techs.length - visible;

  return (
    <div ref={rowRef} className="flex w-full max-w-lg min-w-0 flex-wrap gap-2">
      {techs.slice(0, visible).map((tech, idx) => (
        <div
          key={idx}
          data-chip=""
          className="font-heading flex max-w-full shrink-0 cursor-default gap-1 overflow-hidden rounded-full bg-zinc-100 px-2.5 py-1.5 text-[10px] font-medium tracking-widest whitespace-nowrap text-zinc-600 uppercase hover:text-zinc-900"
        >
          {tech}
        </div>
      ))}
      {hidden > 0 && (
        <div className="font-heading flex shrink-0 cursor-default rounded-full px-1 py-1.5 text-[10px] font-medium tracking-widest whitespace-nowrap text-zinc-400">
          +{hidden}
        </div>
      )}
    </div>
  );
}
