import { Project } from "@/payload-types";
import Card from "@/components/ProjectsGrid/Card";

export default function ProjectsGridSection({ caseStudies }: { caseStudies: Project[] }) {
  return (
    <section className="container mx-auto grid space-y-8 gap-x-10 gap-y-8 px-4 pb-8 max-lg:px-8 md:space-y-12 lg:grid-cols-2">
      {caseStudies.map((caseStudy, idx) => (
        <Card key={idx} caseStudy={caseStudy} index={idx} />
      ))}
    </section>
  );
}
