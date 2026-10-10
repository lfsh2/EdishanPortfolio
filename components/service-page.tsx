import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { ContactCTA } from "@/components/contact-cta";
import { Faq } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { WorkflowLibrary } from "@/components/workflows";
import { ArrowLink, ButtonLink } from "@/components/ui/button";
import { LiveBadge } from "@/components/ui/live-badge";
import { Mark } from "@/components/ui/mark";
import { SectionHeader } from "@/components/ui/section-header";
import { getService, process } from "@/lib/content";
import { projectHref, projects } from "@/lib/projects";
import { breadcrumbs, faqSchema, graph, serviceSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import { revealDelay } from "@/lib/utils";

const heroTitles: Record<string, ReactNode> = {
  "ai-automation": (
    <>
      Automation that <Mark onLoad>runs the busywork.</Mark>
    </>
  ),
  "crm-systems": (
    <>
      A CRM that matches how you <Mark onLoad>actually sell.</Mark>
    </>
  ),
  "full-stack-development": (
    <>
      Software that platforms <Mark onLoad>can&apos;t buy.</Mark>
    </>
  ),
};

export function ServicePage({ slug }: { slug: string }) {
  const service = getService(slug);
  if (!service) notFound();

  const related = projects
    .filter((p) => p.disciplines.includes(service.discipline))
    .sort((a, b) => Number(Boolean(b.caseStudy)) - Number(Boolean(a.caseStudy)))
    .slice(0, 3);
  const automation = service.discipline === "automation";

  return (
    <>
      <JsonLd
        data={graph(
          serviceSchema(service),
          faqSchema(service.faq),
          breadcrumbs([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.name, path: `/services/${service.slug}` },
          ]),
        )}
      />
      <header className="relative">
        <div aria-hidden className="paper-grid pointer-events-none absolute inset-x-0 top-0 h-[36rem]" />
        <div className="shell relative grid gap-14 pb-20 pt-12 md:pb-24 md:pt-20 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <nav aria-label="Breadcrumb" className="label text-faint">
              <ol className="flex items-center gap-2">
                <li>Services</li>
                <li aria-hidden>/</li>
                <li aria-current="page" className="inline-flex items-center gap-2 text-fg">
                  <span className={`rounded-[4px] px-1.5 py-px ${automation ? "bg-lime text-on-lime" : "bg-fg text-canvas"}`}>
                    {service.index}
                  </span>
                  {service.name}
                </li>
              </ol>
            </nav>
            <h1 className="mt-9 text-display text-fg">{heroTitles[service.slug]}</h1>
            <p className="mt-8 max-w-xl text-lede text-muted">{service.intro}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href={site.calendar}>Discuss a project</ButtonLink>
              <ButtonLink href="#related" variant="text" icon={<span aria-hidden>↓</span>}>
                See live work
              </ButtonLink>
            </div>
          </div>

          <aside aria-label="Toolkit" className="theme-dark panel-shadow self-end rounded-xl p-6 md:p-8 lg:col-span-5">
            <p className="label flex items-center justify-between text-faint">
              <span>Toolkit</span>
              <span className="text-accent">{String(service.tools.length).padStart(2, "0")} tools</span>
            </p>
            <p className="mt-5 text-xl tracking-[-0.02em] text-fg">{service.headline}</p>
            <ul className="mt-6 grid grid-cols-2 border-t border-line">
              {service.tools.map((tool, i) => (
                <li
                  key={tool}
                  className={`border-b border-line py-3 font-mono text-[0.78rem] text-fg/90 ${i % 2 === 1 ? "pl-4" : "border-r pr-4"}`}
                >
                  {tool}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </header>

      <section aria-labelledby="offer-title" className="shell py-24 md:py-32">
        <SectionHeader
          label="Scope"
          id="offer-title"
          className="border-t border-fg/80 pt-12"
          title="What I build."
          intro={service.crossover.body}
        />
        <ol className="mt-14 grid gap-x-10 md:mt-20 md:grid-cols-2">
          {service.offerings.map((o, i) => (
            <li key={o.title} data-reveal style={revealDelay((i % 2) * 80)} className="grid grid-cols-[3rem_1fr] border-t border-line py-7">
              <span className="label pt-1.5 text-faint">{String(i + 1).padStart(2, "0")}</span>
              <span>
                <h3 className="text-xl tracking-[-0.02em] text-fg">{o.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{o.body}</p>
              </span>
            </li>
          ))}
        </ol>
      </section>

      {service.slug === "ai-automation" ? <WorkflowLibrary /> : null}

      <section aria-labelledby="process-title" className="theme-dark relative overflow-hidden">
        <div aria-hidden className="blueprint pointer-events-none absolute inset-0 opacity-60" />
        <div className="shell relative py-24 md:py-32">
          <SectionHeader
            label="Process"
            id="process-title"
            title={
              <>
                How an engagement <Mark>runs.</Mark>
              </>
            }
          />
          <ol className="relative mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            <span aria-hidden className="absolute left-0 right-0 top-5 hidden h-px bg-line lg:block" />
            {process.map((p, i) => (
              <li key={p.step} data-reveal style={revealDelay(i * 80)} className="relative">
                <span className="relative grid size-10 place-items-center rounded-full border border-line bg-canvas font-mono text-xs text-accent">
                  {p.step}
                </span>
                <h3 className="mt-6 text-xl tracking-[-0.02em] text-fg">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="related" aria-labelledby="related-title" className="shell py-24 md:py-32">
        <SectionHeader
          label="Live work"
          id="related-title"
          title={
            <>
              Proof, <Mark>not promises.</Mark>
            </>
          }
          intro={<ArrowLink href={`/work?type=${service.discipline}`}>All {automation ? "automation" : "engineering"} work</ArrowLink>}
        />
        <ul className="mt-14 grid gap-8 md:mt-20 md:grid-cols-3 md:gap-6">
          {related.map((p, i) => {
            const href = projectHref(p) ?? "/work";
            const external = /^https?:/.test(href);
            return (
              <li key={p.slug} data-reveal style={revealDelay(i * 80)}>
                <Link href={href} className="group block" {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                  <span className="block overflow-hidden rounded-lg border border-line bg-surface p-1.5">
                    <Image
                      src={p.cover.src}
                      alt=""
                      sizes="(min-width: 768px) 33vw, 100vw"
                      placeholder="blur"
                      className="aspect-[4/3] w-full rounded-[5px] object-cover object-top-left transition-transform duration-700 ease-[var(--ease-out-quart)] group-hover:scale-[1.03]"
                    />
                  </span>
                  <span className="mt-5 flex items-center gap-3 border-t border-line pt-4">
                    {p.live ? <LiveBadge /> : null}
                    {p.year ? <span className="label text-faint">{p.year}</span> : null}
                  </span>
                  <span className="mt-3 block text-xl tracking-[-0.02em] text-fg transition-colors group-hover:text-muted">
                    {p.shortTitle}
                  </span>
                  {p.result ? <span className="mt-1 block text-sm text-muted">{p.result}</span> : null}
                </Link>
              </li>
            );
          })}
        </ul>

        <Link
          href={service.crossover.href}
          className="group mt-20 grid gap-6 rounded-xl border border-line p-7 transition-colors hover:border-fg md:grid-cols-12 md:items-center md:p-10"
        >
          <span className="md:col-span-8">
            <span className="label flex items-center gap-2 text-faint">
              <span aria-hidden className="size-1.5 rounded-full bg-lime" />
              The other half
            </span>
            <span className="mt-4 block text-title text-fg">{service.crossover.title}</span>
          </span>
          <span className="flex items-center justify-between gap-4 md:col-span-4 md:justify-end">
            <span className="text-fg">{service.crossover.cta}</span>
            <span
              aria-hidden
              className="text-xl text-faint transition-transform duration-300 group-hover:translate-x-1 group-hover:text-fg"
            >
              →
            </span>
          </span>
        </Link>
      </section>

      <Faq items={service.faq} />

      <ContactCTA
        title={
          automation ? (
            <>
              Have a process that <Mark>should be automated?</Mark>
            </>
          ) : (
            <>
              Have an application that <Mark>needs building?</Mark>
            </>
          )
        }
      />
    </>
  );
}
