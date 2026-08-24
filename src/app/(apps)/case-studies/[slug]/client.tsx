import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { IconBrandGithub } from "@tabler/icons-react";

import RichText from "@/components/RichText";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Project } from "@/payload-types";

export default function CaseStudyClient({ project }: { project: Project }) {
  const image = typeof project.image === "object" ? project.image : null;
  const video = typeof project.video === "object" ? project.video : null;

  return (
    <article className="container mx-auto px-4 py-24 md:py-32">
      <header className="mx-auto max-w-[70ch]">
        <div className="mb-6 flex flex-wrap gap-2">
          {project.techStack.map((entry) => (
            <Badge key={entry.id ?? entry.tech} variant="outline">
              {entry.tech}
            </Badge>
          ))}
        </div>

        <h1 className="font-heading text-4xl leading-tight font-bold md:text-6xl">
          {project.title}
        </h1>

        <p className="font-body text-foreground/80 mt-6 text-base leading-relaxed md:text-lg">
          {project.description}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {project.liveLink && (
            <Button
              render={<a href={project.liveLink} target="_blank" rel="noopener noreferrer" />}
            >
              <ExternalLink />
              Live site
            </Button>
          )}
          {project.githubLink && (
            <Button
              variant="outline"
              render={<a href={project.githubLink} target="_blank" rel="noopener noreferrer" />}
            >
              <IconBrandGithub size={16} />
              Source
            </Button>
          )}
        </div>
      </header>

      {image?.url && (
        <div className="border-border bg-muted relative mx-auto mt-16 aspect-video max-w-4xl overflow-hidden rounded-lg border">
          <Image
            src={image.url}
            alt={image.alt || project.title}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 896px, 100vw"
            priority
          />
        </div>
      )}

      {video?.url && (
        <div className="border-border bg-muted relative mx-auto mt-8 max-w-4xl overflow-hidden rounded-lg border">
          <video src={video.url} controls className="w-full" />
        </div>
      )}

      {project.content && (
        <div className="mt-16">
          <RichText data={project.content} enableGutter={false} />
        </div>
      )}
    </article>
  );
}
