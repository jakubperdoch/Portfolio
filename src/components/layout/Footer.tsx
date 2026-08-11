"use client";

import { motion } from "motion/react";
import Link from "next/link";
import {
  IconArrowUpRight,
  IconBrandGithubFilled,
  IconBrandLinkedinFilled,
} from "@tabler/icons-react";
import { Separator } from "@/components/ui/separator";

const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "My Setup", href: "/my-setup" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jakub-perďoch",
    icon: <IconBrandLinkedinFilled />,
  },
  {
    label: "GitHub",
    href: "https://github.com/jakubperdoch",
    icon: <IconBrandGithubFilled />,
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="min-h-screen bg-zinc-950 pb-20">
      <div className="container mx-auto pt-24 pb-8 max-lg:px-8">
        <section className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end lg:gap-12">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-muted-foreground font-heading mb-4 text-sm tracking-[0.3em] uppercase"
            >
              Let&apos;s build something great
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="font-heading text-3xl leading-[1.1] font-semibold tracking-tight text-white md:text-4xl md:text-5xl lg:text-6xl"
            >
              Have a project in mind?
              <br />
              <span className="text-muted-foreground">
                Let&apos;s turn it into something worth remembering.
              </span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
            className="group w-fit shrink-0 rounded-full bg-white transition-colors duration-300 hover:bg-zinc-200"
          >
            <Link
              href="mailto:perdochjakub@gmail.com"
              className="font-heading flex h-full w-full items-center gap-1 px-6 py-3 text-base text-zinc-900 md:px-10 md:py-4 md:text-lg"
            >
              Get in touch
              <IconArrowUpRight
                stroke={2}
                className="transform transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          </motion.div>
        </section>

        <Separator className="my-16 bg-zinc-600" />

        <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="font-heading mb-4 text-sm font-medium tracking-wider text-white uppercase">
              Navigation
            </h3>
            <div className="flex flex-col gap-2">
              {navigationLinks.map((link) => (
                <motion.a
                  key={link.label}
                  whileHover="contactLinkHover"
                  whileTap="contactLinkTap"
                  href={link.href}
                  aria-label={link.label}
                  className="font-heading flex w-fit items-center gap-1 font-light text-white/70 transition-colors duration-300 hover:text-white"
                >
                  <motion.div
                    className="h-px w-0 bg-white/70"
                    variants={{
                      contactLinkHover: {
                        width: "1rem",
                        backgroundColor: "white",
                      },
                      contactLinkTap: {
                        width: "1.5rem",
                      },
                    }}
                  />
                  {link.label}
                </motion.a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-heading mb-4 text-sm font-medium tracking-wider text-white uppercase">
              Contact
            </h3>
            <div className="flex flex-col gap-2">
              <a
                href="mailto:perdochjakub@gmail.com"
                className="font-heading font-light text-white/70 transition-colors duration-300 hover:text-white"
              >
                perdochjakub@gmail.com
              </a>
              <p className="font-heading text-sm font-light text-white/50">Žilina, Slovensko</p>
            </div>
          </div>
          <div>
            <h3 className="font-heading mb-4 text-sm font-medium tracking-wider text-white uppercase">
              Socials
            </h3>
            <div className="flex flex-wrap items-center gap-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  aria-label={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit shrink-0 rounded-full border border-zinc-700 bg-zinc-900 p-2 text-white/70 transition-colors duration-300 hover:bg-zinc-800"
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        <Separator className="my-10 bg-zinc-600" />

        <section className="flex flex-col gap-4">
          <motion.h1
            initial={{ y: 100 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="font-heading to-muted-foreground w-fit bg-linear-to-br from-white/70 bg-clip-text text-5xl font-semibold tracking-tight text-transparent md:text-6xl lg:text-8xl"
          >
            Jakub Perďoch
          </motion.h1>

          <div className="font-heading flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="text-white/70">
              © {currentYear} Jakub Perďoch. All rights reserved.
            </span>
            <span className="hidden text-white/70 md:inline">•</span>
            <a href="/privacy-policy" className="text-white/70 transition-colors hover:text-white">
              Privacy Policy
            </a>
            <a
              href="/terms-of-service"
              className="text-white/70 transition-colors hover:text-white"
            >
              Terms of Service
            </a>
          </div>
        </section>
      </div>
    </footer>
  );
}
