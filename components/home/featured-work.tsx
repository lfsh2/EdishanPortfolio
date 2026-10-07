import Link from "next/link";

import { AnnotatedShot } from "@/components/ui/annotated-shot";
import { ArrowLink, ButtonLink } from "@/components/ui/button";
import { LiveBadge } from "@/components/ui/live-badge";
import { Mark } from "@/components/ui/mark";
import { SectionHeader } from "@/components/ui/section-header";
import { caseStudies } from "@/lib/projects";
import { stepLabel } from "@/lib/site";
import { revealDelay } from "@/lib/utils";

export function FeaturedWork() {
  return (
    <section id="work" aria-labelledby="work-title" className="shell py-24 md:py-32">
      <SectionHeader
        step={stepLabel("work")}
        label="Live work"
        id="work-title"
        title={
          <>
            Real systems, <Mark>running right now.</Mark>
          </>
        }
        intro={
          <>
            <p>An AI pipeline, a two-sided marketplace and an operations platform, all in production for real clients.</p>
            <ArrowLink href="/work" className="mt-2">
              All work
            </ArrowLink>
          </>
        }
      />

      <div className="mt-14 md:mt-20">
        {caseStudies.map((project, i) => {
          const href = `/work/${project.slug}`;
          const cs = project.caseStudy;
          return (
            <article
              key={project.slug}
              aria-labelledby={`work-${project.slug}`}
              className="grid gap-10 border-t border-fg/80 py-12 md:py-16 lg:grid-cols-12 lg:gap-12"
            >
              <div data-reveal className="flex flex-col lg:col-span-4">
                <div className="flex items-start justify-between gap-4">
                  <span className="font-mono text-[2.75rem] leading-none tracking-[-0.06em] text-quiet">
                    {String(i + 1).padStart(2, "0")}
                    <span className="text-line">/{String(caseStudies.length).padStart(2, "0")}</span>
                  </span>
                  <LiveBadge />
                </div>
                <p className="label mt-8 text-faint">{cs.kind}</p>
                <h3 id={`work-${project.slug}`} className="mt-3 text-title text-fg">
                  <Link href={href} className="transition-colors duration-200 hover:text-muted">
                    {project.title}
                  </Link>
                </h3>
                <p className="mt-4 leading-relaxed text-muted">{project.summary}</p>

                <dl className="mt-8 border-t border-line">
                  {cs.metrics.map((m) => (
                    <div key={m.label} className="flex items-baseline justify-between gap-4 border-b border-line py-3">
                      <dt className="text-sm text-muted">{m.label}</dt>
                      <dd className="shrink-0 text-lg tracking-[-0.02em] text-fg tabular-nums">{m.value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 font-mono text-[0.72rem] leading-relaxed text-faint">{project.stack.slice(0, 6).join(" · ")}</p>

                <div className="mt-8 lg:mt-auto lg:pt-8">
                  <ButtonLink href={href}>See how it was built</ButtonLink>
                </div>
              </div>

              <div data-reveal style={revealDelay(100)} className="lg:col-span-8">
                <AnnotatedShot
                  src={project.cover.src}
                  alt={project.cover.alt}
                  notes={project.notes}
                  dark={project.slug === "ai-lead-qualification"}
                />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
