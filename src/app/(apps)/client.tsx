import Hero from "@/components/Home/Hero";
import CaseStudiesScroll, { CaseStudy } from "@/components/Home/CaseStudiesScroll";

export default function HomeClient({ caseStudies }: { caseStudies: CaseStudy[] }) {
  return (
    <>
      <Hero />
      {caseStudies.length > 0 && <CaseStudiesScroll caseStudies={caseStudies} />}
      {/* Experience */}
      {/* Knowledge */}
    </>
  );
}
