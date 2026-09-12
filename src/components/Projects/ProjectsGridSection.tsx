import { Project } from "@/payload-types";
import Card from "@/components/ProjectsGrid/Card";

export default function ProjectsGridSection({ caseStudies }: { caseStudies: Project[] }) {
  return (
    <section className="container mx-auto grid gap-x-10 gap-y-12 px-6 pb-20 sm:px-8 md:gap-y-16 lg:grid-cols-2">
      {caseStudies.map((caseStudy, idx) => (
        <Card key={caseStudy.id} caseStudy={caseStudy} index={idx} />
      ))}
    </section>
  );
}
