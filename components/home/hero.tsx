import { ButtonLink } from "@/components/ui/button";
import { Mark } from "@/components/ui/mark";
import { proof, site, stepLabel } from "@/lib/site";

import { SystemTrace } from "./system-trace";

/** Real clients from shipped work: set as type, not logos. */
const clients = ["Teethly", "MeepleCrate", "SoftlinkIQ", "Tippler", "INM Audio", "Vantrippers", "JKK Construction", "Forever Fitness"];

export function Hero() {
  return (
    <section id="intro" aria-labelledby="hero-title" className="relative">
      <div aria-hidden className="paper-grid pointer-events-none absolute inset-x-0 top-0 h-[44rem]" />

      <div className="shell relative grid gap-14 pb-16 pt-12 md:pt-20 lg:grid-cols-12 lg:gap-10 lg:pb-24">
        <div className="flex flex-col lg:col-span-7">
          <p className="label flex flex-wrap items-center gap-3 text-faint">
            <span className="inline-flex items-center gap-2 text-fg">
              <span aria-hidden className="size-1.5 rounded-full bg-lime ring-2 ring-lime/30" />
              {stepLabel("intro")}
            </span>
            <span aria-hidden className="h-px w-6 bg-line" />
            Independent engineer · Philippines · Remote worldwide
          </p>

          <h1 id="hero-title" className="mt-9 text-display text-fg">
            I build intelligent systems that <Mark onLoad>do the work.</Mark>
          </h1>

          <p className="mt-8 max-w-xl text-lede text-muted">
            AI automation, CRM and custom software for agencies and growing businesses. When an off-the-shelf platform runs out of road, I
            write the code that finishes the job.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href={site.calendar}>Discuss a project</ButtonLink>
            <ButtonLink href="#work" variant="text" icon={<span aria-hidden>↓</span>}>
              Explore live work
            </ButtonLink>
          </div>

          <dl className="mt-14 grid grid-cols-2 border-t border-fg/80 sm:grid-cols-4 lg:mt-auto lg:pt-0">
            {proof.map((p) => (
              <div key={p.label} className="flex flex-col-reverse justify-end border-b border-line py-4 pr-3 sm:border-b-0">
                <dt className="mt-1 text-[0.8125rem] leading-snug text-faint">{p.label}</dt>
                <dd className="text-2xl tracking-[-0.03em] text-fg tabular-nums md:text-[1.75rem]">{p.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-5">
          <div className="theme-dark panel-shadow rounded-xl p-2">
            <SystemTrace />
          </div>
          <p className="label mt-3 text-faint">Fig. 01 · Live lead-qualification workflow, sample run</p>
        </div>
      </div>

      <div className="border-y border-line">
        <div className="shell grid gap-4 py-5 md:grid-cols-12 md:items-center">
          <p className="label text-faint md:col-span-2">Built for</p>
          <ul className="flex flex-wrap items-center gap-x-3 gap-y-1 md:col-span-10">
            {clients.map((c, i) => (
              <li key={c} className="flex items-center gap-3 text-[0.95rem] tracking-[-0.01em] text-muted">
                {i > 0 ? (
                  <span aria-hidden className="text-quiet">
                    /
                  </span>
                ) : null}
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
