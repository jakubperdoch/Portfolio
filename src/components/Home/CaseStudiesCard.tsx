import Image from "next/image";
import type { CaseStudy } from "@/components/Home/CaseStudiesScroll";
import { shimmerBlurDataURL } from "@/lib/utils";

const IMAGE_SIZES = "(min-width: 1024px) 40vw, (min-width: 768px) 45vw, 85vw";

export default function CaseStudiesCard({
  caseStudy,
  index = 0,
}: {
  caseStudy: CaseStudy;
  index?: number;
}) {
  const image = typeof caseStudy.image === "object" ? caseStudy.image : null;

  return (
    <div className="group flex w-[85vw] shrink-0 cursor-pointer snap-start flex-col gap-2.5 md:w-[45vw] lg:w-[40vw]">
      {image?.url && (
        <div className="relative aspect-3/2 w-full overflow-hidden rounded-sm shadow-md">
          <Image
            fill
            sizes={IMAGE_SIZES}
            loading={index < 2 ? "eager" : "lazy"}
            placeholder="blur"
            blurDataURL={shimmerBlurDataURL(image.width ?? 1200, image.height ?? 800)}
            src={image.url}
            alt={image.alt || caseStudy.title}
            className="object-cover"
          />
        </div>
      )}

      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <span className="font-heading text-2xl font-medium text-zinc-900">{caseStudy.title}</span>
          <div className="font-heading flex flex-wrap gap-x-2 gap-y-0.5 font-extralight text-zinc-500">
            {caseStudy.techStack.slice(0, 3).map((tech, idx) => (
              <span key={idx}>{tech.tech}</span>
            ))}
          </div>
        </div>

        <span className="font-heading shrink-0 text-sm text-zinc-500 uppercase">
          {caseStudy.visibility}
        </span>
      </div>
    </div>
  );
}
