import type { Metadata } from "next";

import JsonLd from "@/lib/JsonLd";
import { constructMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

import ContactClient from "./client";

export const metadata: Metadata = constructMetadata({
  title: "Contact",
  description:
    "Get in touch with Jakub Perďoch about software development projects, collaborations, or opportunities.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <ContactClient />
    </>
  );
}
