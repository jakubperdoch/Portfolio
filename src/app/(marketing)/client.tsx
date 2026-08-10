"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue } from "motion/react";
import { useSpring } from "framer-motion";
import { TextAnimate } from "@/components/ui/text-animate";
import Image from "next/image";

export default function HomeClient() {
  const words = ["Design.", "Code.", "Build.", "Ship.", "Refine.", "Repeat."];
  const [wordIndex, setWordIndex] = useState(0);
  const [showImage, setShowImage] = useState(false);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <>
      <section className="container mx-auto h-screen pt-24">
        <div className="relative">
          <h1 className="font-heading text-8xl font-medium tracking-tighter text-zinc-500">
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
              <span className="font-serif font-light whitespace-nowrap text-zinc-500 italic">
                love to
              </span>
              <div className="relative inline-flex h-[1.2em] items-center overflow-visible">
                <span className="pointer-events-none whitespace-nowrap opacity-0">Deploy.</span>
                <AnimatePresence mode="wait">
                  <TextAnimate
                    key={words[wordIndex]}
                    animation="blurInUp"
                    by="character"
                    duration={0.6}
                    className="absolute left-0 whitespace-nowrap text-zinc-900"
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

        <div></div>
      </section>
    </>
  );
}
