import Hero from "@/components/Home/Hero";
import CaseStudiesScroll, { CaseStudy } from "@/components/Home/CaseStudiesScroll";
import Experience from "@/components/Home/Experience";
import { Experience as ExperienceType, Skill } from "@/payload-types";
import Skills from "@/components/Home/Skills";

export default function HomeClient({
  caseStudies,
  experiences,
  skills,
}: {
  caseStudies: CaseStudy[];
  experiences: ExperienceType[];
  skills: Skill[];
}) {
  return (
    <>
      <Hero />
      {caseStudies.length > 0 && <CaseStudiesScroll caseStudies={caseStudies} />}
      {experiences.length > 0 && <Experience experiences={experiences} />}
      {skills.length > 0 && <Skills skills={skills} />}
    </>
  );
}
