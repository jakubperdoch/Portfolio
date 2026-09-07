import { type AppLocale } from "@/i18n/routing";
import { localizedPath, siteConfig } from "@/lib/seo";
import { getServerSideURL } from "@/utilities/getURL";

export type BreadcrumbItem = {
  /** Already translated label. */
  name: string;
  /** Locale-agnostic route, e.g. `/projects`. */
  path: string;
};

export function breadcrumbSchema(items: BreadcrumbItem[], locale: AppLocale) {
  const baseUrl = getServerSideURL();

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${localizedPath(item.path, locale)}`,
    })),
  };
}

const knowsAbout = [
  "Software Development",
  "Web Development",
  "Software Architecture",
  "Software Design",
  "Software Testing",
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Express.js",
  "MongoDB",
  "PostgreSQL",
  "Docker",
  "Tailwind CSS",
  "Figma",
  "Git",
  "GitHub",
  "Jira",
  "Scrum",
  "Kanban",
  "User Experience",
];

const sameAs = ["https://www.linkedin.com/in/jakub-perďoch", "https://github.com/jakubperdoch"];

type LocalizedSchemaArgs = {
  locale: AppLocale;
  description: string;
  jobTitle: string;
};

export function personSchema({ locale, description, jobTitle }: LocalizedSchemaArgs) {
  const baseUrl = getServerSideURL();

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: `${baseUrl}${localizedPath("/", locale)}`,
    description,
    jobTitle,
    email: "perdochjakub@gmail.com",
    knowsAbout,
    sameAs,
  };
}

export function websiteSchema({ locale, description }: Omit<LocalizedSchemaArgs, "jobTitle">) {
  const baseUrl = getServerSideURL();

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: `${baseUrl}${localizedPath("/", locale)}`,
    description,
    inLanguage: locale,
  };
}
