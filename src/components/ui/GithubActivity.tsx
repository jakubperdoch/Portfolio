"use client";

import { useEffect, useState } from "react";
import { IconBrandGithub } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface ActivityData {
  lastActive: string | null;
  commitsToday: number;
}

interface ActivityProps {
  className?: string;
}

const INTERVALS = [
  { seconds: 86400, key: "daysAgo" },
  { seconds: 3600, key: "hoursAgo" },
  { seconds: 60, key: "minutesAgo" },
] as const;

type Elapsed = { key: (typeof INTERVALS)[number]["key"]; count: number } | null;

/** Pure: the reference time is passed in rather than read during render. */
function elapsedSince(lastActive: string, now: number): Elapsed {
  const seconds = Math.floor((now - new Date(lastActive).getTime()) / 1000);

  for (const { seconds: unit, key } of INTERVALS) {
    const count = Math.floor(seconds / unit);
    if (count >= 1) return { key, count };
  }

  return null;
}

export default function GithubActivity({ className }: ActivityProps) {
  const t = useTranslations("GithubActivity");
  const [elapsed, setElapsed] = useState<Elapsed | undefined>(undefined);

  useEffect(() => {
    fetch("/api/github/activity")
      .then((res) => res.json())
      .then((data: ActivityData) => {
        if (!data?.lastActive) return;
        // Snapshot the clock as the data arrives, so rendering stays pure and
        // the label does not drift on unrelated re-renders.
        setElapsed(elapsedSince(data.lastActive, Date.now()));
      })
      .catch(() => {});
  }, []);

  if (elapsed === undefined) return null;

  const time = elapsed ? t(elapsed.key, { count: elapsed.count }) : t("justNow");

  return (
    <div className={cn("text-muted-foreground flex items-center gap-1.5 text-sm", className)}>
      <div className="relative inline-flex h-4 w-4">
        <IconBrandGithub size={16} className="absolute inline-flex animate-ping text-green-500" />
        <IconBrandGithub size={16} className="absolute inline-flex" />
      </div>
      <span className="font-heading">{t("lastActive", { time })}</span>
    </div>
  );
}
