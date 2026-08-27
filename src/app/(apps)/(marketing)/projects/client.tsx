import { CaseStudy } from "@/components/Home/CaseStudiesSection";
import Hero from "@/components/Projects/Hero";
import ProjectsGridSection from "@/components/Projects/ProjectsGridSection";
import { Separator } from "@/components/ui/separator";

export default function WorkClient({ caseStudies }: { caseStudies: CaseStudy[] }) {
  return (
    <>
      <Hero />
      <Separator className="mt-8 mb-16 bg-zinc-200" />
      <ProjectsGridSection caseStudies={caseStudies} />
    </>
  );
}
