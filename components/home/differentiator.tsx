import type { ReactNode } from "react";

import { Mark } from "@/components/ui/mark";
import { SectionHeader } from "@/components/ui/section-header";
import { principles } from "@/lib/content";
import { stepLabel } from "@/lib/site";
import { revealDelay } from "@/lib/utils";

const stages = [
  { title: "Lead enters", detail: "Forms / Ads / Calls / Website" },
  { title: "AI & workflow orchestration", detail: "n8n / AI qualification / business rules" },
  { title: "CRM & custom backend", detail: "GoHighLevel / APIs / Database" },
  { title: "Action & follow-up", detail: "Routing / Booking / Notifications / Reporting" },
];

/** The column where the platform runs out and custom code takes over. */
const GAP = 2;

export function Differentiator() {
  return (
    <section id="platform" aria-labelledby="diff-title" className="theme-dark relative overflow-hidden">
      <div aria-hidden className="blueprint pointer-events-none absolute inset-0 opacity-60" />
      <div className="shell relative py-24 md:py-32">
        <SectionHeader
          step={stepLabel("platform")}
          label="The differentiator"
          id="diff-title"
          title={
            <>
              When the platform hits its limits, I build <Mark>the missing piece.</Mark>
            </>
          }
          intro="I configure the platform. When a requirement falls outside it, I engineer the layer around it (APIs, databases, services and apps) instead of a workaround."
        />

        <figure data-reveal className="mt-14 md:mt-20" aria-labelledby="diff-caption">
          <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {stages.map((s, i) => (
              <li key={s.title} className="relative rounded-lg border border-line bg-surface p-5 md:p-6">
                <p className="label text-faint">Stage 0{i + 1}</p>
                <p className="mt-4 text-lg tracking-[-0.02em] text-fg">{s.title}</p>
                <p className="mt-2 font-mono text-[0.72rem] leading-relaxed text-muted">{s.detail}</p>
                {i < stages.length - 1 ? (
                  <span
                    aria-hidden
                    className="absolute -right-[0.95rem] top-1/2 z-10 hidden size-6 -translate-y-1/2 place-items-center rounded-full border border-line bg-canvas text-[0.7rem] text-faint lg:grid"
                  >
                    →
                  </span>
                ) : null}
              </li>
            ))}
          </ol>

          <div aria-hidden className="mt-8 space-y-5 md:mt-10">
            <Lane name="Platform layer" note="configured">
              {stages.map((s, i) =>
                i === GAP ? (
                  <div key={s.title} className="flex h-11 items-center justify-center rounded-md border border-dashed border-quiet">
                    <span className="label text-faint">
                      <span className="sm:hidden">limit</span>
                      <span className="hidden sm:inline">platform limit</span>
                    </span>
                  </div>
                ) : (
                  <div key={s.title} className="h-11 rounded-md bg-raised" />
                ),
              )}
            </Lane>
            <Lane name="Code layer" note="engineered">
              {stages.map((s, i) =>
                i === GAP ? (
                  <div key={s.title} className="relative">
                    <span className="absolute -top-5 left-1/2 h-5 w-px bg-lime/60" />
                    <div className="draw-x flex h-11 origin-left items-center justify-center rounded-md bg-lime px-2 shadow-[0_0_40px_-8px_rgba(200,243,106,0.55)]">
                      <span className="label truncate text-on-lime">
                        <span className="sm:hidden">code</span>
                        <span className="hidden sm:inline">custom api · db</span>
                      </span>
                    </div>
                  </div>
                ) : (
                  <div key={s.title} className="h-11 rounded-md border border-dashed border-line" />
                ),
              )}
            </Lane>
          </div>

          <figcaption id="diff-caption" className="mt-6 flex gap-3 text-sm leading-relaxed text-muted">
            <span className="label shrink-0 pt-0.5 text-faint">Fig. 04</span>
            Where GoHighLevel or n8n can&apos;t model the requirement, the gap is filled with a custom API, database or integration service.
          </figcaption>
        </figure>

        <ol className="mt-16 grid gap-10 md:mt-20 md:grid-cols-3 md:gap-8">
          {principles.map((p, i) => (
            <li key={p.title} data-reveal style={revealDelay(i * 90)} className="border-t border-fg/60 pt-6">
              <p className="label text-accent">P0{i + 1}</p>
              <h3 className="mt-4 text-xl tracking-[-0.02em] text-fg">{p.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{p.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Lane({ name, note, children }: { name: string; note: string; children: ReactNode }) {
  return (
    <div>
      <p className="label mb-2.5 text-muted">
        {name} <span className="text-faint">/ {note}</span>
      </p>
      <div className="grid grid-cols-4 gap-2">{children}</div>
    </div>
  );
}
