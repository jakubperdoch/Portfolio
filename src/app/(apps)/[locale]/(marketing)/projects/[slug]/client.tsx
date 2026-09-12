import Hero from "@/components/ProjectDetail/Hero";
import { Project } from "@/payload-types";
import Content from "@/components/ProjectDetail/Content";

export default function ProjectDetailClient(project: Project) {
  return (
    <section className="pb-12">
      <Hero project={project} />
      <Content project={project} />
    </section>
  );
}
