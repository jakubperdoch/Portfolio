import Link from "next/link";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import type { Project } from "@/payload-types";

export default function CaseStudiesClient({ projects }: { projects: Project[] }) {
  return (
    <div className="container mx-auto px-4 py-24 md:py-32">
      <h1 className="font-heading text-4xl leading-tight font-bold md:text-6xl">Case Studies</h1>

      <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2">
        {projects.map((project) => {
          const image = typeof project.image === "object" ? project.image : null;

          return (
            <Link key={project.id} href={`/case-studies/${project.slug}`} className="group block">
              {image?.url && (
                <div className="border-border bg-muted relative aspect-video overflow-hidden rounded-lg border">
                  <Image
                    src={image.url}
                    alt={image.alt || project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                </div>
              )}

              <h2 className="font-heading mt-4 text-2xl font-semibold">{project.title}</h2>
              <p className="font-body text-foreground/80 mt-2 line-clamp-2 text-base leading-relaxed">
                {project.description}
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {project.techStack.slice(0, 4).map((entry) => (
                  <Badge key={entry.id ?? entry.tech} variant="outline">
                    {entry.tech}
                  </Badge>
                ))}
              </div>
            </Link>
          );
        })}

        {projects.length === 0 && (
          <p className="text-muted-foreground">No case studies published yet.</p>
        )}
      </div>
    </div>
  );
}
