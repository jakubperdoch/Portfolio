import type { Metadata } from "next";

import JsonLd from "@/lib/JsonLd";
import { constructMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

import WorkClient from "./client";

export const metadata: Metadata = constructMetadata({
  title: "Work",
  description: "Work experience and background of Jakub Perďoch, software developer.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
        ])}
      />
      <WorkClient />
    </>
  );
}
