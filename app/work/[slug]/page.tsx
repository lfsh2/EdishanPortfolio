import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { ContactCTA } from "@/components/contact-cta";
import { StageFlow } from "@/components/stage-flow";
import { ButtonLink } from "@/components/ui/button";
import { AnnotatedShot } from "@/components/ui/annotated-shot";
import { Figure } from "@/components/ui/figure";
import { LiveBadge } from "@/components/ui/live-badge";
import { Mark } from "@/components/ui/mark";
import { StackList } from "@/components/ui/stack-list";
import { caseStudies, getCaseStudy } from "@/lib/projects";
import { revealDelay } from "@/lib/utils";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return caseStudies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getCaseStudy(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: { title: project.title, description: project.summary, url: `/work/${project.slug}`, type: "article" },
  };
}

const sections = [
  { id: "problem", label: "Problem" },
  { id: "role", label: "My role" },
  { id: "architecture", label: "System architecture" },
  { id: "implementation", label: "Implementation" },
  { id: "outcome", label: "Outcome" },
  { id: "screens", label: "Screens" },
];

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getCaseStudy(slug);
  if (!project) notFound();

  const cs = project.caseStudy;
  const index = caseStudies.indexOf(project);
  const next = caseStudies[(index + 1) % caseStudies.length];
  const number = String(index + 1).padStart(2, "0");

  return (
    <article>
      <header className="relative">
        <div aria-hidden className="paper-grid pointer-events-none absolute inset-x-0 top-0 h-[32rem]" />
        <div className="shell relative grid gap-12 pb-14 pt-12 md:pb-20 md:pt-20 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-8">
            <nav aria-label="Breadcrumb" className="label text-faint">
              <ol className="flex items-center gap-2">
                <li>
                  <Link href="/work" className="hover:text-fg">
                    Work
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li aria-current="page" className="text-fg">
                  {project.shortTitle}
                </li>
              </ol>
            </nav>
            <h1 className="mt-9">
              <span className="label flex flex-wrap items-center gap-3 text-faint">
                <span className="text-fg">
                  {number} · {cs.kind}
                </span>
                <span aria-hidden className="h-px w-6 bg-line" />
                {project.title}
              </span>
              <span className="mt-6 block text-headline text-fg">{cs.headline}</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lede text-muted">{project.summary}</p>
          </div>

          <dl className="self-end border-t border-fg/80 lg:col-span-4">
            {[
              { k: "Client", v: project.client },
              { k: "Year", v: project.year },
              { k: "Status", v: project.live ? <LiveBadge long /> : "Delivered" },
              {
                k: project.liveUrl ? "Live" : "Role",
                v: project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-fg underline decoration-line underline-offset-4 hover:decoration-fg"
                  >
                    {project.liveUrl.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")} ↗
                  </a>
                ) : (
                  cs.role.title.split(", ")[0]
                ),
              },
            ].map((row) => (
              <div key={row.k} className="flex items-center justify-between gap-4 border-b border-line py-3.5">
                <dt className="label text-faint">{row.k}</dt>
                <dd className="text-right text-sm text-fg">{row.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <div className="shell">
        <AnnotatedShot
          src={project.cover.src}
          alt={project.cover.alt}
          notes={project.notes}
          priority
          dark={project.slug === "ai-lead-qualification"}
          sizes="(min-width: 1280px) 1216px, 100vw"
        />
      </div>

      <section aria-label="Key results" className="shell mt-16 md:mt-24">
        <dl className="grid border-t border-fg/80 sm:grid-cols-3">
          {cs.metrics.map((m, i) => (
            <div
              key={m.label}
              data-reveal
              style={revealDelay(i * 80)}
              className="flex flex-col-reverse justify-end gap-3 border-b border-line py-8 sm:pr-6"
            >
              <dt className="text-sm text-muted">{m.label}</dt>
              <dd className="text-[clamp(2.25rem,1.6rem+2.6vw,3.75rem)] leading-none tracking-[-0.045em] text-fg tabular-nums">
                {m.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="shell grid gap-16 py-24 md:py-32 lg:grid-cols-12 lg:gap-12">
        <aside className="hidden lg:col-span-3 lg:block">
          <nav aria-label="On this page" className="sticky top-28">
            <p className="label text-faint">On this page</p>
            <ol className="mt-5 space-y-1 border-l border-line-soft">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="-ml-px flex min-h-9 items-center gap-3 border-l border-transparent pl-4 text-sm text-muted transition-colors hover:border-fg hover:text-fg"
                  >
                    <span className="label text-faint">0{i + 1}</span>
                    {s.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <div className="space-y-24 md:space-y-32 lg:col-span-9">
          <Block id="problem" n={1} title="Problem">
            <div className="space-y-5 text-lede text-muted">
              {cs.problem.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </Block>

          <Block id="role" n={2} title="My role">
            <p className="text-title text-fg">{cs.role.title}</p>
            <ul className="mt-8 grid gap-x-8 sm:grid-cols-2">
              {cs.role.scope.map((item) => (
                <li key={item} className="flex gap-3 border-t border-line-soft py-4 text-muted">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-lime ring-2 ring-lime/30" />
                  {item}
                </li>
              ))}
            </ul>
          </Block>

          <Block id="architecture" n={3} title="System architecture">
            <p className="max-w-2xl text-lede text-muted">{cs.architecture.intro}</p>
            <div className="mt-10" data-reveal>
              <StageFlow stages={cs.architecture.stages} crossCutting={cs.architecture.crossCutting} />
            </div>
          </Block>

          <Block id="implementation" n={4} title="Implementation">
            <ol className="grid gap-x-10 gap-y-12 md:grid-cols-2">
              {cs.implementation.map((item, i) => (
                <li key={item.title} data-reveal style={revealDelay((i % 2) * 80)} className="border-t border-line pt-6">
                  <p className="label text-faint">
                    {number}.{i + 1}
                  </p>
                  <h3 className="mt-3 text-xl tracking-[-0.02em] text-fg">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{item.body}</p>
                </li>
              ))}
            </ol>
          </Block>

          <Block id="outcome" n={5} title="Outcome">
            <ul className="border-t border-fg/80">
              {cs.outcome.map((o) => (
                <li key={o} className="flex gap-4 border-b border-line py-4 text-[1.0625rem] leading-snug tracking-[-0.01em] text-fg">
                  <svg aria-hidden viewBox="0 0 16 16" className="mt-1 size-4 shrink-0 text-accent">
                    <path
                      d="M3.5 8.5 6.5 11.5 12.5 4.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {o}
                </li>
              ))}
            </ul>
            <StackList items={project.stack} className="mt-8" />
            {project.liveUrl ? (
              <ButtonLink href={project.liveUrl} variant="outline" className="mt-10">
                Visit the live product
              </ButtonLink>
            ) : null}
          </Block>

          <Block id="screens" n={6} title="Screens">
            <div className="grid gap-12 md:grid-cols-2 md:gap-x-8">
              {cs.gallery
                .filter((shot) => shot.src !== project.cover.src)
                .map((shot, i) => (
                  <Figure
                    key={shot.caption ?? i}
                    src={shot.src}
                    alt={shot.alt}
                    caption={shot.caption}
                    index={i + 1}
                    sizes={i === 0 ? "(min-width: 1024px) 900px, 100vw" : "(min-width: 768px) 45vw, 100vw"}
                    className={i === 0 ? "md:col-span-2" : ""}
                  />
                ))}
            </div>
          </Block>
        </div>
      </div>

      <nav aria-label="Next project" className="shell pb-24 md:pb-32">
        <Link
          href={`/work/${next.slug}`}
          className="group flex flex-col gap-4 rounded-xl border border-line p-8 transition-colors hover:border-fg md:flex-row md:items-end md:justify-between md:p-12"
        >
          <span>
            <span className="label block text-faint">Next project</span>
            <span className="mt-4 block text-headline text-fg transition-colors duration-200 group-hover:text-muted">
              {next.shortTitle}
            </span>
            <span className="mt-3 block text-muted">{next.caseStudy.kind}</span>
          </span>
          <span
            aria-hidden
            className="font-mono text-3xl text-faint transition-transform duration-300 group-hover:translate-x-2 group-hover:text-muted"
          >
            →
          </span>
        </Link>
      </nav>

      {project.disciplines.includes("automation") ? (
        <ContactCTA />
      ) : (
        <ContactCTA
          title={
            <>
              Have an application that <Mark>needs building?</Mark>
            </>
          }
        />
      )}
    </article>
  );
}

function Block({ id, n, title, children }: { id: string; n: number; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-28">
      <h2 id={`${id}-h`} className="mb-8 flex items-baseline gap-4 border-t border-line pt-6 text-title text-fg">
        <span className="label text-faint">0{n}</span>
        {title}
      </h2>
      {children}
    </section>
  );
}
