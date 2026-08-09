"use client";

import { useEffect, useState } from "react";
import { IconBrandGithub } from "@tabler/icons-react";

interface ActivityData {
  lastActive: string | null;
  commitsToday: number;
}

export default function GithubActivity() {
  const [data, setData] = useState<ActivityData | null>(null);

  useEffect(() => {
    fetch("/api/github/activity")
      .then((res) => res.json())
      .then(setData)
      .catch(() => {});
  }, []);

  console.log(data);

  if (!data || !data.lastActive) return null;

  return (
    <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
      <div className="relative inline-flex h-4 w-4">
        <IconBrandGithub size={16} className="absolute inline-flex animate-ping text-green-500" />
        <IconBrandGithub size={16} className="absolute inline-flex" />
      </div>
      <span className="font-heading">
        Last active {getTimeAgo(new Date(data.lastActive))}
        {data.commitsToday > 0 &&
          ` · ${data.commitsToday} commit${data.commitsToday > 1 ? "s" : ""} today`}
      </span>
    </div>
  );
}

function getTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  const intervals: [number, string][] = [
    [86400, "d"],
    [3600, "h"],
    [60, "m"],
  ];
  for (const [secs, label] of intervals) {
    const count = Math.floor(seconds / secs);
    if (count >= 1) return `${count}${label} ago`;
  }
  return "just now";
}
