import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { ContactCTA } from "@/components/contact-cta";
import { Faq } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { Mark } from "@/components/ui/mark";
import { Canvas } from "@/components/workflows";
import { breadcrumbs, faqSchema, graph, workflowSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import { revealDelay } from "@/lib/utils";
import { getWorkflowPage, workflowPages } from "@/lib/workflow-details";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return workflowPages.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const w = getWorkflowPage(slug);
  if (!w) return {};
  return pageMeta({
    title: w.seoTitle,
    description: w.seoDescription,
    path: `/automations/${w.slug}`,
    type: "article",
    image: `/automations/${w.slug}/opengraph-image`,
  });
}

export default async function WorkflowPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const w = getWorkflowPage(slug);
  if (!w) notFound();

  const number = `W0${w.index + 1}`;
  const next = workflowPages[(w.index + 1) % workflowPages.length];

  return (
    <article>
      <JsonLd
        data={graph(
          workflowSchema(w),
          faqSchema(w.faq),
          breadcrumbs([
            { name: "Home", path: "/" },
            { name: "Automations", path: "/automations" },
            { name: w.title, path: `/automations/${w.slug}` },
          ]),
        )}
      />

      <header className="relative">
        <div aria-hidden className="paper-grid pointer-events-none absolute inset-x-0 top-0 h-[32rem]" />
        <div className="shell relative grid gap-12 pb-12 pt-12 md:pb-16 md:pt-20 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-8">
            <nav aria-label="Breadcrumb" className="label text-faint">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/automations" className="hover:text-fg">
                    Automations
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li aria-current="page" className="text-fg">
                  {number}
                </li>
              </ol>
            </nav>
            <p className="label mt-9 flex flex-wrap items-center gap-3 text-fg">
              {w.highlight ? <span className="rounded-[4px] bg-lime px-1.5 py-0.5 text-on-lime">Featured</span> : null}
              {number} · {w.category}
            </p>
            <h1 className="mt-5 text-headline text-fg">{w.h1}</h1>
            {/* Answer-first: the definition is what answer engines lift into direct answers. */}
            <p className="mt-7 max-w-2xl text-lede text-muted">{w.definition}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href={site.calendar}>Get this built for you</ButtonLink>
              <ButtonLink href="#how-it-works" variant="text" icon={<span aria-hidden>↓</span>}>
                How it works
              </ButtonLink>
            </div>
          </div>

          <dl className="self-end border-t border-fg/80 lg:col-span-4">
            {[
              { k: "For", v: w.forWho },
              { k: "Built in", v: w.category.split(" · ")[1] ?? w.category },
              { k: "Stages", v: `${w.stages.length} stages, ${w.stages.reduce((n, st) => n + st.nodes.length, 0)} nodes` },
            ].map((row) => (
              <div key={row.k} className="flex items-baseline justify-between gap-6 border-b border-line py-3.5">
                <dt className="label shrink-0 text-faint">{row.k}</dt>
                <dd className="text-right text-sm text-fg">{row.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <div className="shell">
        <figure>
          <Canvas w={w} sizes="(min-width: 1280px) 1216px, 100vw" />
          <figcaption className="label mt-3 text-faint">The production n8n canvas · open full size to read every node</figcaption>
        </figure>
      </div>

      <div className="shell max-w-[56rem] space-y-20 py-20 md:space-y-24 md:py-28">
        <Block id="problem" n={1} title="The problem">
          <p className="text-lede text-muted">{w.problem}</p>
        </Block>

        <Block id="how-it-works" n={2} title="How it works">
          <ol className="space-y-3">
            {w.stages.map((st, i) => (
              <li key={st.title} data-reveal style={revealDelay(i * 60)} className="card grid gap-4 p-5 sm:grid-cols-[3rem_1fr] md:p-6">
                <span className="grid size-10 place-items-center rounded-full bg-lime font-mono text-xs text-on-lime">0{i + 1}</span>
                <div>
                  <h3 className="font-display text-2xl leading-tight text-fg">{st.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{st.body}</p>
                  <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="n8n nodes in this stage">
                    {st.nodes.map((node) => (
                      <li key={node} className="rounded-md border border-line bg-canvas px-2 py-1 font-mono text-[0.7rem] text-faint">
                        {node}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </Block>

        <Block id="safeguards" n={3} title="Built to fail safely">
          <ul className="border-t border-fg/80">
            {w.safeguards.map((g) => (
              <li key={g} className="flex gap-4 border-b border-line py-4 text-[1.0625rem] leading-snug text-fg">
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
                {g}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-muted">
            <span className="font-medium text-fg">Outcome. </span>
            {w.outcome}
          </p>
          {w.measures ? (
            <p className="mt-4 flex flex-wrap items-center gap-2 text-sm">
              <span className="label text-faint">Measured by</span>
              {w.measures.map((m) => (
                <span key={m} className="rounded-full bg-raised px-2.5 py-1 text-fg">
                  {m}
                </span>
              ))}
            </p>
          ) : null}
        </Block>

        <Block id="stack" n={4} title="Stack">
          <ul className="flex flex-wrap gap-2">
            {w.tools.map((t) => (
              <li key={t} className="rounded-full border border-line bg-surface px-3.5 py-1.5 font-mono text-[0.8rem] text-fg">
                {t}
              </li>
            ))}
          </ul>
        </Block>

        <Block id="related" n={5} title="Related">
          <ul className="grid gap-3 sm:grid-cols-2">
            {w.related.map((r) => (
              <li key={r.href}>
                <Link
                  href={r.href}
                  className="group flex h-full items-center justify-between gap-4 rounded-[1.25rem] border border-line p-5 transition-colors hover:border-fg"
                >
                  <span className="text-fg">{r.label}</span>
                  <span aria-hidden className="text-faint transition-transform duration-300 group-hover:translate-x-1 group-hover:text-fg">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Block>
      </div>

      <Faq items={w.faq} title="Questions about this workflow." />

      <nav aria-label="Next workflow" className="shell pb-20 md:pb-28">
        <Link
          href={`/automations/${next.slug}`}
          className="group flex flex-col gap-4 rounded-xl border border-line p-8 transition-colors hover:border-fg md:flex-row md:items-end md:justify-between md:p-12"
        >
          <span>
            <span className="label block text-faint">Next workflow · W0{next.index + 1}</span>
            <span className="mt-4 block text-headline text-fg transition-colors duration-200 group-hover:text-muted">{next.title}</span>
          </span>
          <span
            aria-hidden
            className="font-mono text-3xl text-faint transition-transform duration-300 group-hover:translate-x-2 group-hover:text-muted"
          >
            →
          </span>
        </Link>
      </nav>

      <ContactCTA
        title={
          <>
            Want this workflow <Mark>in your business?</Mark>
          </>
        }
        body="Tell me how leads, bookings and follow-ups work today. I'll map where this workflow fits, what it connects to, and what it should be measured by."
      />
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
