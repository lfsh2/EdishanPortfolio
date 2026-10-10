import type { Metadata } from "next";

import { pageMeta } from "@/lib/seo";
import Link from "next/link";

import { ContactCTA } from "@/components/contact-cta";
import { Faq } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { Capabilities } from "@/components/home/capabilities";
import { Differentiator } from "@/components/home/differentiator";
import { ButtonLink } from "@/components/ui/button";
import { Mark } from "@/components/ui/mark";
import { SectionHeader } from "@/components/ui/section-header";
import { engagements, faq, process, services } from "@/lib/content";
import { breadcrumbs, faqSchema, graph, serviceSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import { revealDelay } from "@/lib/utils";

export const metadata: Metadata = pageMeta({
  title: "Services: AI Automation, CRM & Software",
  description:
    "AI automation, CRM systems and custom software for growing businesses. Automation when you can, custom software when you have to.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={graph(
          ...services.map(serviceSchema),
          faqSchema(faq),
          breadcrumbs([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
        )}
      />
      <header className="shell grid gap-8 pb-14 pt-8 md:pb-20 md:pt-14 lg:grid-cols-12 lg:items-end lg:gap-12">
        <div className="lg:col-span-8">
          <p className="label flex items-center gap-2.5 text-faint">
            <span aria-hidden className="size-1.5 rounded-full bg-lime ring-2 ring-lime/30" />
            Services
          </p>
          <h1 className="mt-6 text-display text-fg">
            Automation when you can. <Mark onLoad>Custom software</Mark> when you have to.
          </h1>
        </div>
        <div className="lg:col-span-4 lg:pb-3">
          <p className="text-lede text-muted">
            Three kinds of systems, one engineer, and a plain answer about which one you actually need.
          </p>
          <ButtonLink href={site.calendar} className="mt-6">
            Book a strategy call
          </ButtonLink>
        </div>
      </header>

      <section aria-label="Solution categories" className="shell pb-20 md:pb-28">
        <ul className="grid gap-4 lg:grid-cols-3">
          {services.map((s, i) => (
            <li key={s.slug} data-reveal style={revealDelay(i * 80)}>
              <Link
                href={`/services/${s.slug}`}
                className="card group flex h-full flex-col p-7 transition-transform duration-300 hover:-translate-y-1"
              >
                <p className="label text-accent">
                  {s.index} · {s.name}
                </p>
                <h2 className="mt-5 text-title text-fg">{s.headline}</h2>
                <ul className="mt-6 space-y-2.5 border-t border-line pt-5">
                  {s.highlights.slice(0, 4).map((h) => (
                    <li key={h} className="flex gap-3 text-[0.95rem] text-muted">
                      <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-lime" />
                      {h}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 font-mono text-[0.75rem] text-faint">{s.tools.slice(0, 5).join(" · ")}</p>
                <span className="mt-auto inline-flex items-center gap-2 pt-8 text-[0.9375rem] text-fg">
                  Explore {s.name}
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <Differentiator />
      <Capabilities />

      <section id="process" aria-labelledby="process-title" className="shell scroll-mt-8 pb-20 md:pb-28">
        <SectionHeader
          label="Process"
          id="process-title"
          title={
            <>
              Diagnose. Design. Build. <Mark>Launch.</Mark>
            </>
          }
          intro="Every engagement follows the same four steps, whether it's one automation or a whole platform."
        />
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((p, i) => (
            <li key={p.step} data-reveal style={revealDelay(i * 80)} className="card p-6">
              <span className="grid size-10 place-items-center rounded-full bg-lime font-mono text-xs text-on-lime">{p.step}</span>
              <h3 className="mt-6 font-display text-2xl text-fg">{p.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{p.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {engagements.map((e) => (
            <div key={e.title} className="rounded-[1.25rem] border border-line p-6 md:p-7">
              <p className="label text-faint">Engagement</p>
              <h3 className="mt-3 font-display text-2xl text-fg">{e.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{e.body}</p>
            </div>
          ))}
        </div>
      </section>

      <Faq items={faq} />
      <ContactCTA />
    </>
  );
}
