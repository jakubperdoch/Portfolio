import Image from "next/image";
import type { CaseStudy } from "@/components/Home/CaseStudiesScroll";
import { shimmerBlurDataURL } from "@/lib/utils";

export default function CaseStudiesCard({ caseStudy }: { caseStudy: CaseStudy }) {
  const image = typeof caseStudy.image === "object" ? caseStudy.image : null;
  const width = image?.width ?? 400;
  const height = image?.height ?? 400;

  return (
    <div className="group flex w-[85vw] shrink-0 cursor-pointer flex-col gap-2.5 md:w-[45vw] lg:w-[40vw]">
      {image?.url && (
        <Image
          width={width}
          height={height}
          loading="lazy"
          placeholder="blur"
          blurDataURL={shimmerBlurDataURL(width, height)}
          src={image.url}
          alt={image.alt || caseStudy.title}
          className="max-h-95! rounded-sm object-cover shadow-md"
        />
      )}

      <div className="flex items-center justify-between">
        <div>
          <span className="font-heading text-2xl font-medium text-zinc-900">{caseStudy.title}</span>
          <div className="font-heading flex gap-2 font-extralight text-zinc-500">
            {caseStudy.techStack.slice(0, 3).map((tech, idx) => (
              <span key={idx}>{tech.tech}</span>
            ))}
          </div>
        </div>

        <span className="font-heading text-sm text-zinc-500 uppercase">{caseStudy.visibility}</span>
      </div>
    </div>
  );
}
