import type { Metadata } from "next";

import JsonLd from "@/lib/JsonLd";
import { constructMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

import TermsofServiceClient from "./client";

export const metadata: Metadata = constructMetadata({
  title: "Terms of Service",
  description: "Terms of service for jakubperdoch.com.",
  path: "/terms-of-service",
  noIndex: true,
});

export default function TermsofServicePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Terms of Service", path: "/terms-of-service" },
        ])}
      />
      <TermsofServiceClient />
    </>
  );
}
