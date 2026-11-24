"use client";

import { useLayoutEffect, useRef, useState } from "react";

type TechChipsProps = {
  techs: string[];
  max?: number;
};

export default function TechChips({ techs, max = 4 }: TechChipsProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(Math.min(max, techs.length));

  useLayoutEffect(() => {
    const row = rowRef.current;
    if (row && visible > 1 && row.scrollWidth > row.clientWidth) {
      setVisible((count) => count - 1);
    }
  }, [visible]);

  useLayoutEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    let lastWidth = row.clientWidth;
    const observer = new ResizeObserver(() => {
      if (row.clientWidth !== lastWidth) {
        lastWidth = row.clientWidth;
        setVisible(Math.min(max, techs.length));
      }
    });
    observer.observe(row);
    return () => observer.disconnect();
  }, [max, techs.length]);

  const hidden = techs.length - visible;

  return (
    <div ref={rowRef} className="flex max-w-lg flex-nowrap gap-2 overflow-hidden">
      {techs.slice(0, visible).map((tech, idx) => (
        <div
          key={idx}
          className="font-heading flex shrink-0 cursor-default gap-1 rounded-full bg-zinc-100 px-2.5 py-1.5 text-[10px] font-medium tracking-widest whitespace-nowrap text-zinc-600 uppercase hover:text-zinc-900"
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
