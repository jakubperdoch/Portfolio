import { TextAnimate } from "@/components/ui/text-animate";

export default function Hero() {
  return (
    <div className="container mx-auto flex flex-col items-center gap-5 px-4 pt-36 max-lg:px-8 md:justify-between lg:flex-row">
      <div>
        <p className="font-heading text-sm tracking-widest text-zinc-600 uppercase">
          Selected Projects
        </p>
        <TextAnimate className="font-heading text-6xl font-medium text-zinc-900 md:text-8xl">
          My Work.
        </TextAnimate>
      </div>
      <p className="font-heading max-w-sm font-light text-zinc-600 md:text-lg">
        A curated selection of work exploring the intersection of design precision and technical
        performance.
      </p>
    </div>
  );
}
