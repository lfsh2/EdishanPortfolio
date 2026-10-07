import Image from "next/image";
import Link from "next/link";

import { AnnotatedShot } from "@/components/ui/annotated-shot";
import { ArrowLink, ButtonLink } from "@/components/ui/button";
import { LiveBadge } from "@/components/ui/live-badge";
import { Mark } from "@/components/ui/mark";
import { flagships } from "@/lib/projects";
import { revealDelay } from "@/lib/utils";

export function SelectedWork() {
  const [lead, ...rest] = flagships;
  const leadPitch = lead.pitch!;

  return (
    <section id="work" aria-labelledby="work-title" className="shell pb-20 md:pb-28">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="label flex items-center gap-2.5 text-faint">
            <span aria-hidden className="size-1.5 rounded-full bg-lime ring-2 ring-lime/30" />
            Selected work
          </p>
          <h2 data-reveal className="mt-5 text-headline text-fg">
            Real systems, <Mark>live in production.</Mark>
          </h2>
        </div>
        <ArrowLink href="/work" className="shrink-0">
          See all work
        </ArrowLink>
      </div>

      {/* Lead result: the strongest numbers, with the real workflow marked up. */}
      <article data-reveal aria-labelledby={`work-${lead.slug}`} className="card mt-10 grid gap-8 p-5 md:p-8 lg:grid-cols-12 lg:gap-10">
        <div className="flex flex-col lg:col-span-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="label text-accent">01 · {leadPitch.eyebrow}</span>
            <LiveBadge />
          </div>
          <h3 id={`work-${lead.slug}`} className="mt-5 text-title text-fg">
            {leadPitch.headline}
          </h3>
          <p className="mt-3 text-muted">{leadPitch.sub}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {leadPitch.features.map((f) => (
              <li key={f} className="rounded-full bg-raised px-3 py-1.5 text-sm text-fg tabular-nums">
                {f}
              </li>
            ))}
          </ul>
          <p className="mt-5 font-mono text-[0.75rem] text-faint">{leadPitch.stack.join(" · ")}</p>
          <div className="mt-8 lg:mt-auto lg:pt-8">
            <ButtonLink href={`/work/${lead.slug}`}>See how it was built</ButtonLink>
          </div>
        </div>
        <div className="lg:col-span-7">
          <AnnotatedShot src={lead.cover.src} alt={lead.cover.alt} notes={lead.notes} dark sizes="(min-width: 1024px) 640px, 100vw" />
        </div>
      </article>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {rest.map((p, i) => {
          const pitch = p.pitch!;
          return (
            <article key={p.slug} data-reveal style={revealDelay((i + 1) * 80)} aria-labelledby={`work-${p.slug}`}>
              <Link href={`/work/${p.slug}`} className="card group flex h-full flex-col overflow-hidden">
                <div className="aspect-[16/9] overflow-hidden border-b border-line bg-raised">
                  <Image
                    src={p.cover.src}
                    alt={p.cover.alt}
                    sizes="(min-width: 768px) 560px, 100vw"
                    placeholder="blur"
                    className="h-full w-full object-cover object-top-left transition-transform duration-700 ease-[var(--ease-out-quart)] group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5 md:p-7">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="label text-accent">
                      0{i + 2} · {pitch.eyebrow}
                    </span>
                    <LiveBadge />
                  </div>
                  <h3 id={`work-${p.slug}`} className="mt-4 text-title text-fg">
                    {pitch.headline}
                  </h3>
                  <p className="mt-2 text-muted">{pitch.sub}</p>
                  <p className="mt-4 text-sm text-faint">{pitch.features.join(" · ")}</p>
                  <p className="mt-3 font-mono text-[0.75rem] text-faint">{pitch.stack.join(" · ")}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-6 text-[0.9375rem] text-fg">
                    See how it was built
                    <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}
