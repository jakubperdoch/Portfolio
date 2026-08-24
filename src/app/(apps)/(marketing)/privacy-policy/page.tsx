import type { Metadata } from "next";

import JsonLd from "@/lib/JsonLd";
import { constructMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";

import PrivacyPolicyClient from "./client";

export const metadata: Metadata = constructMetadata({
  title: "Privacy Policy",
  description: "Privacy policy for jakubperdoch.com.",
  path: "/privacy-policy",
  noIndex: true,
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy-policy" },
        ])}
      />
      <PrivacyPolicyClient />
    </>
  );
}
