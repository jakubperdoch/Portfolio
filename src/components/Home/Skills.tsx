import { Skill } from "@/payload-types";
import { TextAnimate } from "@/components/ui/text-animate";

interface SkillProps {
  className?: string;
  skills: Skill[];
}

export default function Skills({ skills }: SkillProps) {
  return (
    <section className="container mx-auto">
      <div className="space-y-1.5">
        <p className="font-heading text-sm tracking-widest text-white/40 uppercase">Knowledge</p>
        <TextAnimate
          animation="blurInUp"
          by="word"
          className="font-heading text-4xl font-bold text-white"
        >
          Technical Stack
        </TextAnimate>

        <p className="font-heading text-sm text-white/40">
          A collection of technologies and tools I use to build robust, scalable, and
          high-performance digital products.
        </p>
      </div>
    </section>
  );
}
