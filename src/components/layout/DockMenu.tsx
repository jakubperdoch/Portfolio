"use client";

import React from "react";

import { Dock, DockIcon } from "@/components/ui/dock";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { motion } from "motion/react";

interface DockMenuProps {
  menuOpenHandler: () => void;
}

export default function DockMenu({ menuOpenHandler }: DockMenuProps) {
  return (
    <div className="relative">
      <Dock direction="middle" className="rounded-full bg-zinc-900">
        <DockIcon className="w-24!" onClick={menuOpenHandler}>
          <motion.div whileTap={{ scale: 0.95 }} className="flex items-center gap-2">
            <p className="font-heading text-lg text-white">Menu</p>
            <div className="flex flex-col items-end gap-1">
              <div className="h-0.5 w-5 bg-white"></div>
              <div className="h-0.5 w-3 bg-white"></div>
            </div>
          </motion.div>
        </DockIcon>
        <Separator orientation="vertical" className="h-full rounded-full! bg-zinc-500" />
        <DockIcon>
          <Image src="/icons/linkedin.svg" alt="LinkedIn" width={24} height={24} />
        </DockIcon>
        <DockIcon>
          <Image src="/icons/github.svg" alt="GitHub" width={24} height={24} />
        </DockIcon>
        <DockIcon>
          <Image src="/icons/gmail.svg" alt="Email" width={24} height={24} />
        </DockIcon>
      </Dock>
    </div>
  );
}
