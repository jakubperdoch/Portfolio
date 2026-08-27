import Hero from "@/components/Home/Hero";
import CaseStudiesSection, { CaseStudy } from "@/components/Home/CaseStudiesSection";
import ExperienceSection from "@/components/Home/ExperienceSection";
import { Experience as ExperienceType, Skill } from "@/payload-types";
import SkillsSection from "@/components/Home/SkillsSection";

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
      {caseStudies.length > 0 && <CaseStudiesSection caseStudies={caseStudies} />}
      {experiences.length > 0 && <ExperienceSection experiences={experiences} />}
      {skills.length > 0 && <SkillsSection skills={skills} />}
    </>
  );
}
