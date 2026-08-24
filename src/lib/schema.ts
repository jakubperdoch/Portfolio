import { getServerSideURL } from "@/utilities/getURL";
import { siteConfig } from "@/lib/seo";

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  const baseUrl = getServerSideURL();

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.path}`,
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

export function personSchema() {
  const baseUrl = getServerSideURL();

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: baseUrl,
    description: siteConfig.description,
    jobTitle: "Software Developer",
    email: "perdochjakub@gmail.com",
    knowsAbout,
    sameAs,
  };
}

export function websiteSchema() {
  const baseUrl = getServerSideURL();

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: baseUrl,
    description: siteConfig.description,
  };
}
