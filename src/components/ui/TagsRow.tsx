"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

const tags = ["Discover", "Design", "Develop"];

export function TagsRow() {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setRevealed(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="relative flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <motion.div
          key={tag}
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: revealed ? 1 : 0 }}
          transition={{ delay: index * 0.08, duration: 0.4, ease: "easeOut" }}
          style={!revealed ? { position: "absolute", top: 0, left: 0 } : undefined}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="font-heading rounded-full border border-zinc-200 bg-zinc-100 px-3 py-1 text-zinc-500"
        >
          {tag}
        </motion.div>
      ))}
    </div>
  );
}
