import Hero from "@/components/Home/Hero";
import CaseStudiesScroll, { CaseStudy } from "@/components/Home/CaseStudiesScroll";
import Experience from "@/components/Home/Experience";
import { Experience as ExperienceType } from "@/payload-types";

export default function HomeClient({
  caseStudies,
  experiences,
}: {
  caseStudies: CaseStudy[];
  experiences: ExperienceType[];
}) {
  return (
    <>
      <Hero />
      {caseStudies.length > 0 && <CaseStudiesScroll caseStudies={caseStudies} />}
      {experiences.length > 0 && <Experience experiences={experiences} />}
      {/* Knowledge */}
    </>
  );
}
