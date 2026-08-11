"use client";

import { AnimatePresence, motion, useMotionValue } from "motion/react";
import { TextAnimate } from "@/components/ui/text-animate";
import Image from "next/image";
import { TagsRow } from "@/components/ui/TagsRow";
import { IconBrandGithub, IconBrandLinkedin, IconFileInvoice, IconMail } from "@tabler/icons-react";
import { useEffect, useState } from "react";

const words = ["Design.", "Code.", "Build.", "Ship.", "Refine.", "Repeat."];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [showImage, setShowImage] = useState(false);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="container mx-auto flex h-screen flex-col justify-between py-24 max-lg:px-8">
      <div className="relative">
        <h1 className="font-heading text-[12vw] leading-[1.15] font-light tracking-tighter text-zinc-500 md:text-[8vw] md:leading-[1.1] lg:text-[7vw]">
          Hi, I am{" "}
          <span
            className="group relative inline-block cursor-none"
            onMouseEnter={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setImagePosition({ x: rect.left + rect.width / 2, y: rect.top });
              setShowImage(true);
            }}
            onMouseMove={(e) => {
              mouseX.set(e.clientX);
              mouseY.set(e.clientY);
            }}
            onMouseLeave={() => setShowImage(false)}
          >
            <span className="relative z-10 text-zinc-700 transition-colors duration-300 hover:text-zinc-950">
              Jakub
            </span>
          </span>{" "}
          and I
          <div className="flex flex-nowrap items-center gap-x-3 overflow-visible md:gap-x-6">
            <span className="font-serif whitespace-nowrap text-zinc-500 italic">love to</span>
            <div className="relative inline-flex h-[1.2em] items-center overflow-visible">
              <span className="pointer-events-none whitespace-nowrap opacity-0">Deploy.</span>
              <AnimatePresence mode="wait">
                <TextAnimate
                  key={words[wordIndex]}
                  animation="blurInUp"
                  by="character"
                  duration={0.6}
                  className="absolute left-0 font-medium whitespace-nowrap text-zinc-900"
                >
                  {words[wordIndex]}
                </TextAnimate>
              </AnimatePresence>
            </div>
          </div>
        </h1>

        <AnimatePresence mode="wait">
          {showImage && (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -12 }}
                animate={{ opacity: 1, scale: 1, rotate: 3 }}
                exit={{ opacity: 0, scale: 0.8, rotate: 12 }}
                className="absolute z-20"
                style={{
                  left: `min(max(${imagePosition.x}px, 80px), calc(100vw - 80px))`,
                  top: imagePosition.y,
                  transform: "translate(-50%, -105%)",
                }}
              >
                <p className='className="animate-bounce-slow absolute -bottom-10 -left-8 z-40 text-7xl'>
                  👋
                </p>
                <Image
                  width={200}
                  height={200}
                  src="/images/profile-picture.png"
                  alt="Profile Picture"
                  className="relative z-30 h-64 w-52 rounded-4xl object-cover"
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end md:gap-12">
        <div className="max-w-xl space-y-2.5">
          {/* Animated Tags Row */}
          <TagsRow />

          {/* Description */}
          <p className="text-sm leading-relaxed font-light text-zinc-600 md:text-base">
            Frontend Developer turning ideas into interfaces that move, respond, and feel alive.
            Based in a town most maps skip past —{" "}
            <span className="inline-flex items-center gap-1 font-medium text-zinc-900">
              <svg
                className="h-3 w-3"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Turzovka, Slovakia
            </span>
            , shipping for a much bigger one.
          </p>

          {/* Available for projects - Animated Ping */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="inline-flex items-center gap-2"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span className="font-heading text-xs font-light text-zinc-600 md:text-sm">
              Available for projects
            </span>
          </motion.div>
        </div>

        <div className="flex gap-4">
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            href="https://www.linkedin.com/in/jakub-perďoch/"
            target="_blank"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="rounded-full bg-zinc-200 p-2 text-zinc-800 transition-colors duration-300 hover:bg-zinc-800 hover:text-white"
          >
            <IconBrandLinkedin />
          </motion.a>
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            href="https://github.com/jakubperdoch"
            target="_blank"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="rounded-full bg-zinc-200 p-2 text-zinc-800 transition-colors duration-300 hover:bg-zinc-800 hover:text-white"
          >
            <IconBrandGithub />
          </motion.a>
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            href="mailto:jakub.perdoch@gmail.com"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="rounded-full bg-zinc-200 p-2 text-zinc-800 transition-colors duration-300 hover:bg-zinc-800 hover:text-white"
          >
            <IconMail />
          </motion.a>
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.4 }}
            href="/resume.pdf"
            download
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="rounded-full bg-zinc-200 p-2 text-zinc-800 transition-colors duration-300 hover:bg-zinc-800 hover:text-white"
          >
            <IconFileInvoice />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
