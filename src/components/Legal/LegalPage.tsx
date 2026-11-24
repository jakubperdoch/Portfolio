type LegalSection = { heading: string; body: string };

type LegalPageProps = {
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
};

export default function LegalPage({ eyebrow, title, updated, intro, sections }: LegalPageProps) {
  return (
    <article className="container mx-auto px-6 py-24 sm:px-8 md:py-32">
      <header className="max-w-3xl">
        <p className="font-heading text-sm tracking-wide text-zinc-500 uppercase">{eyebrow}</p>
        <h1 className="font-heading mt-4 text-4xl leading-tight font-medium tracking-tight text-zinc-900 md:text-6xl">
          {title}
        </h1>
        <p className="mt-6 text-lg leading-8 text-zinc-600">{intro}</p>
        <p className="font-heading mt-4 text-sm text-zinc-500">{updated}</p>
      </header>

      <div className="mt-16 max-w-3xl divide-y divide-zinc-200 border-y border-zinc-200">
        {sections.map(({ heading, body }) => (
          <section
            key={heading}
            className="grid gap-3 py-8 md:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] md:gap-10"
          >
            <h2 className="font-heading text-lg font-medium text-zinc-900">{heading}</h2>
            <p className="text-base leading-8 text-zinc-600">{body}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
