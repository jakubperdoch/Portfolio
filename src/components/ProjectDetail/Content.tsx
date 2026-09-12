import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { IconBrandGithub } from "@tabler/icons-react";
import { getTranslations } from "next-intl/server";
import RichText from "@/components/RichText";
import type { Project } from "@/payload-types";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-5">
      <h2 className="font-heading text-2xl font-medium tracking-tight text-zinc-900 md:text-3xl">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default async function Content({ project }: { project: Project }) {
  const t = await getTranslations("ProjectDetail");
  const actionClass =
    "inline-flex items-center gap-2 rounded-full bg-zinc-100 px-5 py-3 text-sm text-zinc-900 transition-colors hover:bg-zinc-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-900";
  const facts = [
    [t("client"), project.client],
    [t("industry"), project.industry],
    [t("role"), project.role],
    [t("timeline"), project.timeline],
    [t("teamSize"), project.teamSize ? t("teamCount", { count: project.teamSize }) : null],
    [t("projectType"), project.projectType ? t(`types.${project.projectType}`) : null],
    [t("projectStatus"), project.projectStatus ? t(`statuses.${project.projectStatus}`) : null],
  ].filter(([, value]) => value);
  const video = typeof project.video === "object" ? project.video : null;
  const hasContent = project.content?.root.children.length;
  // Some authored case studies already include the structured summaries.
  // Keep their original richtext intact and only add missing summaries.
  function nodeText(node: unknown): string {
    if (!node || typeof node !== "object") return "";
    if ("text" in node && typeof node.text === "string") return node.text;
    return "children" in node && Array.isArray(node.children)
      ? node.children.map(nodeText).join("")
      : "";
  }
  const paragraphs = new Set(project.content?.root.children.map(nodeText));
  const included = (text: string) => paragraphs.has(text);
  const showChallenge = project.challenge && !included(project.challenge);
  const showSolution = project.solution && !included(project.solution);
  const responsibilities = project.responsibilities?.filter(({ item }) => !included(item));
  const outcomes = project.outcomes?.filter(
    ({ result, metric, evidence }) => metric || evidence || !included(result)
  );
  const bodyClass = "text-base leading-8 whitespace-pre-line text-zinc-600";

  return (
    <div className="container mx-auto px-6 py-12 sm:px-8 md:py-20">
      <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-20">
        <aside className="font-heading min-w-0 space-y-10 lg:sticky lg:top-28">
          {facts.length > 0 && (
            <section aria-labelledby="project-overview">
              <h2 id="project-overview" className="mb-5 text-lg font-medium text-zinc-900">
                {t("overview")}
              </h2>
              <dl className="divide-y divide-zinc-200 border-y border-zinc-200">
                {facts.map(([label, value]) => (
                  <div
                    key={label}
                    className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-4 py-4 text-sm leading-6"
                  >
                    <dt className="text-zinc-500">{label}</dt>
                    <dd className="break-words text-zinc-900">{value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}
          {project.techStack?.length > 0 && (
            <section aria-labelledby="project-technologies">
              <h2 id="project-technologies" className="mb-4 text-lg font-medium text-zinc-900">
                {t("technologies")}
              </h2>
              <ul className="flex flex-wrap gap-2">
                {project.techStack.map(({ tech, id }, index) => (
                  <li
                    key={id ?? index}
                    className="rounded-full bg-zinc-100 px-3 py-1.5 text-xs text-zinc-600"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </section>
          )}
          {(project.liveLink || project.githubLink) && (
            <div className="font-heading flex flex-wrap gap-3">
              {project.liveLink && (
                <a
                  className={actionClass}
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("live")}
                  <ArrowUpRight aria-hidden="true" size={16} />
                </a>
              )}
              {project.githubLink && (
                <a
                  className={actionClass}
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconBrandGithub aria-hidden="true" size={16} />
                  {t("source")}
                </a>
              )}
            </div>
          )}
        </aside>
        <div className="min-w-0 space-y-12 md:space-y-16">
          {project.targetAudience && (
            <Section title={t("targetAudience")}>
              <p className={bodyClass}>{project.targetAudience}</p>
            </Section>
          )}
          {!!responsibilities?.length && (
            <Section title={t("contribution")}>
              <ul className="list-disc space-y-3 pl-5 text-base leading-8 text-zinc-600">
                {responsibilities.map(({ item, id }, index) => (
                  <li key={id ?? index}>{item}</li>
                ))}
              </ul>
            </Section>
          )}
          {project.collaboration && (
            <Section title={t("collaboration")}>
              <p className={bodyClass}>{project.collaboration}</p>
            </Section>
          )}
          {(showChallenge || showSolution) && (
            <div className="space-y-8 border-y border-zinc-200 py-8">
              {showChallenge && (
                <Section title={t("challenge")}>
                  <p className={bodyClass}>{project.challenge}</p>
                </Section>
              )}
              {showSolution && (
                <Section title={t("solution")}>
                  <p className={bodyClass}>{project.solution}</p>
                </Section>
              )}
            </div>
          )}
          {!!outcomes?.length && (
            <Section title={t("outcomes")}>
              <ul className="space-y-6">
                {outcomes.map(({ result, metric, evidence, id }, index) => (
                  <li key={id ?? index} className="border-l-2 border-zinc-900 pl-5">
                    {metric && (
                      <p className="font-heading mb-2 text-3xl font-medium tracking-tight text-zinc-900">
                        {metric}
                      </p>
                    )}
                    <p className="font-heading text-lg leading-7 text-zinc-900">{result}</p>
                    {evidence && (
                      <p className="mt-2 text-sm leading-6 whitespace-pre-line text-zinc-500">
                        {evidence}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </Section>
          )}
          {hasContent ? (
            <section aria-label={t("caseStudy")} className="border-t border-zinc-200 pt-10">
              <RichText
                data={project.content!}
                enableProse={false}
                enableGutter={false}
                skipAnimation
                className="min-w-0 break-words [&>:first-child]:mt-0 [&>blockquote]:my-6 [&>figure]:my-8 [&>h2]:mt-12 [&>h2]:mb-5 [&>h2]:text-3xl [&>h2]:font-medium [&>h3]:mt-8 [&>h3]:mb-4 [&>h3]:text-2xl [&>h3]:font-medium [&>ol]:my-5 [&>p]:my-5 [&>p]:leading-8 [&>p]:text-zinc-600 [&>ul]:my-5"
              />
            </section>
          ) : null}
          {!!project.keyDecisions?.length && (
            <Section title={t("decisions")}>
              <div className="space-y-8">
                {project.keyDecisions.map(({ decision, rationale, id }, index) => (
                  <div key={id ?? index}>
                    <h3 className="font-heading mb-2 text-xl font-medium text-zinc-900">
                      {decision}
                    </h3>
                    <p className={bodyClass}>{rationale}</p>
                  </div>
                ))}
              </div>
            </Section>
          )}
          {project.learnings && (
            <Section title={t("learnings")}>
              <p className={bodyClass}>{project.learnings}</p>
            </Section>
          )}
          {video?.url && (
            <Section title={t("video")}>
              <video
                controls
                playsInline
                preload="none"
                aria-label={t("video")}
                className="w-full rounded-sm bg-zinc-100"
                src={video.url}
              />
            </Section>
          )}
        </div>
      </div>
    </div>
  );
}
