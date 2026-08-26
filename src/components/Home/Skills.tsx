import { Skill } from "@/payload-types";
import { TextAnimate } from "@/components/ui/text-animate";

interface SkillProps {
  className?: string;
  skills: Skill[];
}

export default function Skills({ skills }: SkillProps) {
  return (
    <section className="container mx-auto pt-14 pb-8 max-lg:px-8">
      <div className="space-y-1.5">
        <p className="font-heading text-sm tracking-widest text-zinc-600 uppercase">Knowledge</p>
        <TextAnimate
          animation="blurInUp"
          by="word"
          className="font-heading text-4xl font-medium tracking-tight text-zinc-900 md:text-6xl"
        >
          Technical Stack
        </TextAnimate>

        <p className="font-heading max-w-sm font-light text-zinc-600 md:text-lg">
          A collection of technologies and tools I use to build robust, scalable, and
          high-performance digital products.
        </p>
      </div>
    </section>
  );
}
