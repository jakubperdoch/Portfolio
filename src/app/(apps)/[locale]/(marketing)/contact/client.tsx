"use client";

import { useActionState, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Check, Copy, MapPin } from "lucide-react";
import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";
import { Link } from "@/i18n/navigation";

import { sendContact } from "@/app/actions/contact";
import type { ContactState } from "@/lib/contact";

const email = "perdochjakub@gmail.com";
const topics = ["project", "opportunity", "other"] as const;

export default function ContactClient() {
  const t = useTranslations("ContactPage");
  const reducedMotion = useReducedMotion();
  const [topic, setTopic] = useState<(typeof topics)[number]>("project");
  const [message, setMessage] = useState("");
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle");
  const [state, formAction, pending] = useActionState<ContactState, FormData>(sendContact, {
    status: "idle",
  });

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }
  }

  return (
    <div className="container mx-auto px-6 pt-36 pb-20 sm:px-8 md:pb-28">
      <header className="grid gap-6 border-b border-zinc-200 pb-12 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-20">
        <div>
          <p className="font-heading mb-4 text-sm tracking-widest text-zinc-600 uppercase">
            {t("eyebrow")}
          </p>
          <motion.h1
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-heading text-5xl leading-[1.05] font-medium tracking-tight text-zinc-900 md:text-7xl"
          >
            {t("title")}
          </motion.h1>
        </div>
        <p className="font-heading max-w-lg text-lg leading-relaxed font-light text-zinc-600">
          {t("body")}
        </p>
      </header>

      <div className="grid gap-14 pt-12 md:pt-16 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
        <aside className="min-w-0 space-y-12">
          <section>
            <h2 className="font-heading mb-4 text-sm text-zinc-500">{t("emailLabel")}</h2>
            <a
              href={`mailto:${email}`}
              className="font-heading text-2xl leading-relaxed font-medium break-all text-zinc-900 underline-offset-8 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 sm:text-3xl"
            >
              {email}
            </a>
            <div className="mt-5">
              <button
                type="button"
                onClick={copyEmail}
                className="font-heading inline-flex min-h-11 items-center gap-2 rounded-full bg-zinc-100 px-4 py-2 text-sm text-zinc-700 transition-colors hover:bg-zinc-200 focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                {copyStatus === "copied" ? (
                  <Check size={16} aria-hidden="true" />
                ) : (
                  <Copy size={16} aria-hidden="true" />
                )}
                {copyStatus === "copied" ? t("copied") : t("copy")}
              </button>
              <p role="status" className="mt-2 text-sm text-zinc-600">
                {copyStatus === "error"
                  ? t("copyError")
                  : copyStatus === "copied"
                    ? t("copied")
                    : ""}
              </p>
            </div>
            <p className="font-heading mt-5 flex items-center gap-2 text-sm text-zinc-500">
              <MapPin size={16} aria-hidden="true" />
              {t("location")}
            </p>
          </section>
          <section>
            <h2 className="font-heading mb-4 text-xl font-medium text-zinc-900">
              {t("elsewhere")}
            </h2>
            <div className="divide-y divide-zinc-200 border-y border-zinc-200">
              {[
                {
                  name: "LinkedIn",
                  description: t("linkedin"),
                  href: "https://www.linkedin.com/in/jakub-perďoch",
                  Icon: IconBrandLinkedin,
                },
                {
                  name: "GitHub",
                  description: t("github"),
                  href: "https://github.com/jakubperdoch",
                  Icon: IconBrandGithub,
                },
              ].map(({ name, description, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 py-5 text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-4"
                >
                  <Icon size={24} aria-hidden="true" />
                  <span className="font-heading flex-1">
                    <span className="block text-lg">{name}</span>
                    <span className="text-sm text-zinc-500">{description}</span>
                  </span>
                  <ArrowUpRight
                    size={20}
                    aria-hidden="true"
                    className="transition-transform motion-safe:group-hover:translate-x-1 motion-safe:group-hover:-translate-y-1"
                  />
                </a>
              ))}
            </div>
          </section>
          <Link
            href="/projects"
            className="font-heading inline-flex items-center gap-2 text-sm text-zinc-600 underline underline-offset-4 hover:text-zinc-900"
          >
            {t("work")}
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </aside>

        <section className="min-w-0">
          <h2 className="font-heading text-3xl font-medium tracking-tight text-zinc-900">
            {t("start")}
          </h2>
          <p className="mt-4 leading-7 text-zinc-600">{t("intro")}</p>
          <form action={formAction} className="mt-8 space-y-7" aria-busy={pending}>
            <fieldset disabled={pending} className="space-y-7 disabled:opacity-60">
              <div className="hidden" aria-hidden="true">
                <label htmlFor="contact-website">Website</label>
                <input
                  id="contact-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="font-heading mb-3 block text-sm font-medium text-zinc-900"
                  >
                    {t("name")}
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    autoComplete="name"
                    required
                    minLength={2}
                    maxLength={100}
                    className="w-full rounded-sm border border-zinc-200 bg-zinc-50 p-3 text-zinc-900 focus:outline-2 focus:outline-zinc-900"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="font-heading mb-3 block text-sm font-medium text-zinc-900"
                  >
                    {t("yourEmail")}
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={254}
                    className="w-full rounded-sm border border-zinc-200 bg-zinc-50 p-3 text-zinc-900 focus:outline-2 focus:outline-zinc-900"
                  />
                </div>
              </div>
              <fieldset>
                <legend className="font-heading mb-3 text-sm font-medium text-zinc-900">
                  {t("topic")}
                </legend>
                <div className="flex flex-wrap gap-2">
                  {topics.map((value) => (
                    <label key={value} className="cursor-pointer">
                      <input
                        type="radio"
                        name="topic"
                        value={value}
                        checked={topic === value}
                        onChange={() => setTopic(value)}
                        className="peer sr-only"
                      />
                      <span className="font-heading block rounded-full border border-zinc-200 px-4 py-2.5 text-sm text-zinc-600 transition-colors peer-checked:border-zinc-900 peer-checked:bg-zinc-900 peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 hover:border-zinc-400">
                        {t(value)}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <div>
                <label
                  htmlFor="contact-message"
                  className="font-heading mb-3 block text-sm font-medium text-zinc-900"
                >
                  {t("message")}
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  minLength={10}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  maxLength={5000}
                  rows={6}
                  placeholder={t("placeholder")}
                  className="w-full resize-y rounded-sm border border-zinc-200 bg-zinc-50 p-4 text-base leading-7 text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-2 focus:outline-offset-2 focus:outline-zinc-900"
                />
              </div>
              <div>
                <button
                  type="submit"
                  disabled={pending}
                  className="font-heading inline-flex items-center gap-3 rounded-full bg-zinc-900 px-6 py-3.5 text-sm text-white transition-colors hover:bg-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-900 disabled:cursor-wait disabled:opacity-60"
                >
                  {pending ? t("sending") : t("send")}
                  <ArrowUpRight size={18} aria-hidden="true" />
                </button>
                <p className="font-heading mt-3 text-sm leading-6 text-zinc-500">
                  {t("emailHint")}
                </p>
              </div>
            </fieldset>
            <div role="status" aria-live="polite" className="text-sm leading-6 text-zinc-700">
              {state.status === "success" && t("success")}
              {state.status === "error" && (
                <p>
                  {t(`errors.${state.error || "failed"}`)}{" "}
                  <a className="underline" href={`mailto:${email}`}>
                    {email}
                  </a>
                </p>
              )}
            </div>
          </form>
          <div className="mt-10 border-t border-zinc-200 pt-6">
            <h3 className="font-heading mb-3 text-base font-medium text-zinc-900">
              {t("briefTitle")}
            </h3>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-zinc-600">
              <li>{t("brief1")}</li>
              <li>{t("brief2")}</li>
              <li>{t("brief3")}</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
