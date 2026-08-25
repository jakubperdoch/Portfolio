import Image from "next/image";
import type { CaseStudy } from "@/components/Home/CaseStudiesScroll";

export default function CaseStudiesCard({ caseStudy }: { caseStudy: CaseStudy }) {
  const image = typeof caseStudy.image === "object" ? caseStudy.image : null;

  return (
    <div className="group flex w-[85vw] shrink-0 cursor-pointer flex-col gap-1.5 md:w-[45vw] lg:w-[40vw]">
      {image?.url && (
        <Image
          width={image.width ?? 400}
          height={image.height ?? 400}
          src={image.url}
          alt={image.alt || caseStudy.title}
          className="rounded-sm"
        />
      )}

      <div className="flex items-center justify-between">
        <div>
          <span className="font-heading text-2xl text-zinc-900">{caseStudy.title}</span>
          <div className="font-heading flex gap-2 font-extralight text-zinc-500">
            {caseStudy.techStack.slice(0, 4).map((tech, idx) => (
              <span key={idx}>{tech.tech}</span>
            ))}
          </div>
        </div>

        <span className="font-heading text-sm text-zinc-500 uppercase">{caseStudy.visibility}</span>
      </div>
    </div>
  );
}
