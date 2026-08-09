import HomeClient from "@/app/(marketing)/client";
import JsonLd from "@/lib/JsonLd";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Jakub Perďoch - Software Developer",
  description: "Explore the creative portfolio of Jakub Perďoch, a software developer building unique digital experiences.",
};

export const revalidate = 3600;


export default async function Page() {

  const profileSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Jakub Perďoch - Software Developer",
    url: "https://jakubperdoch.com",
    description: metadata.description,
    jobTitle: "Software Developer",
    email: "perdochjakub@gmail.com",
    mainEntity: {
      "@context": "https://schema.org",
      "@type": "Person",
      url: "https://jakubperdoch.com",
      jobTitle: "Software Developer",
      email: "perdochjakub@gmail.com",
      knowsAbout: [
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
      ],
      sameAs: ["https://www.linkedin.com/in/jakub-perďoch", "https://github.com/jakubperdoch"],
    },
    sameAs: ["https://www.linkedin.com/in/jakub-perďoch", "https://github.com/jakubperdoch"],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Jakub Perďoch Portfolio",
    url: "https://jakubperdoch.com",
    description: metadata.description,
    author: {
      "@type": "Person",
      name: "Jakub Perďoch",
      url: "https://jakubperdoch.com",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://jakubperdoch.com" },
    ],
  };

  return (
    <>
      {/* Todo: Preloader */}
      <JsonLd data={profileSchema} />
      <JsonLd data={websiteSchema} />
      <JsonLd data={breadcrumbSchema} />
      <HomeClient />
    </>
  );
}