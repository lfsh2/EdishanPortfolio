import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import jacksonCrm from "@/assets/work/jackson/crm-pipeline.png";
import { process, testimonials } from "@/lib/content";
import { revealDelay } from "@/lib/utils";

/** Mini "platform limit" diagram: the platform layer has a gap, the code layer fills it. */
function LayersVisual() {
  return (
    <div aria-hidden className="flex h-full flex-col justify-center gap-2.5 px-6">
      <div className="grid grid-cols-4 gap-1.5">
        <span className="h-6 rounded-md bg-surface ring-1 ring-line" />
        <span className="h-6 rounded-md bg-surface ring-1 ring-line" />
        <span className="h-6 rounded-md border border-dashed border-quiet" />
        <span className="h-6 rounded-md bg-surface ring-1 ring-line" />
      </div>
      <div className="grid grid-cols-4 gap-1.5">
        <span className="h-6 rounded-md border border-dashed border-line" />
        <span className="h-6 rounded-md border border-dashed border-line" />
        <span className="h-6 rounded-md bg-lime shadow-[0_8px_18px_-8px_rgb(132_204_22/0.8)]" />
        <span className="h-6 rounded-md border border-dashed border-line" />
      </div>
      <div className="label flex justify-between text-faint">
        <span>Automation</span>
        <span>CRM</span>
        <span>Code</span>
      </div>
    </div>
  );
}

function ProcessVisual() {
  return (
    <ol aria-hidden className="relative flex h-full flex-col justify-center gap-2 px-6">
      <span className="absolute bottom-7 left-[1.95rem] top-7 w-px bg-line" />
      {process.map((p, i) => (
        <li key={p.step} className="relative flex items-center gap-3 text-sm text-fg">
          <span
            className={`relative z-10 size-2.5 rounded-full ${i === 0 ? "bg-lime ring-4 ring-lime/30" : "border border-quiet bg-surface"}`}
          />
          <span className="font-mono text-[0.7rem] text-faint">{p.step}</span>
          {p.title}
        </li>
      ))}
    </ol>
  );
}

function QuoteVisual() {
  const t = testimonials[1];
  return (
    <figure aria-hidden className="flex h-full flex-col justify-center px-6">
      <span className="font-display text-4xl leading-none text-accent">&ldquo;</span>
      <p className="mt-1 line-clamp-3 font-display text-lg leading-snug text-fg">{t.quote}</p>
      <p className="mt-2 text-xs text-faint">{t.name}</p>
    </figure>
  );
}

const cards: { n: string; label: string; title: string; sub: string; href: string; visual: ReactNode }[] = [
  {
    n: "01",
    label: "Work",
    title: "Real systems, shipped.",
    sub: "Selected work, live in production.",
    href: "/work",
    visual: (
      <Image src={jacksonCrm} alt="" sizes="(min-width: 1024px) 300px, 100vw" className="h-full w-full object-cover object-top-left" />
    ),
  },
  {
    n: "02",
    label: "Services",
    title: "Automation, CRM, custom software.",
    sub: "The systems I build.",
    href: "/services",
    visual: <LayersVisual />,
  },
  {
    n: "03",
    label: "Process",
    title: "Diagnose. Design. Build. Launch.",
    sub: "How engagements work.",
    href: "/services#process",
    visual: <ProcessVisual />,
  },
  {
    n: "04",
    label: "Testimonials",
    title: "Hear it from the people behind the systems.",
    sub: "Client proof.",
    href: "/about#testimonials",
    visual: <QuoteVisual />,
  },
];

/** Four-card mini directory: the scannable way into the site's depth. */
export function Explore() {
  return (
    <section aria-labelledby="explore-title" className="shell pb-20 md:pb-28">
      <h2 id="explore-title" className="text-title text-fg">
        Explore
      </h2>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c, i) => (
          <li key={c.n} data-reveal style={revealDelay(i * 70)}>
            <Link
              href={c.href}
              className="card group flex h-full flex-col overflow-hidden transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgb(18_33_63/0.35)]"
            >
              <div className="h-28 overflow-hidden border-b border-line bg-raised sm:h-36 md:h-44">{c.visual}</div>
              <div className="flex flex-1 flex-col p-4 sm:p-5">
                <p className="label flex items-center justify-between text-accent">
                  <span>
                    {c.n} · {c.label}
                  </span>
                  <span
                    aria-hidden
                    className="text-sm text-faint transition-transform duration-300 group-hover:translate-x-1 group-hover:text-fg sm:hidden"
                  >
                    →
                  </span>
                </p>
                <p className="mt-2 font-display text-[1.4rem] leading-[1.1] text-fg sm:mt-3 sm:text-[1.6rem]">{c.title}</p>
                <p className="mt-2 text-sm text-faint">{c.sub}</p>
                <span
                  aria-hidden
                  className="mt-auto hidden pt-5 text-faint transition-transform duration-300 group-hover:translate-x-1 group-hover:text-fg sm:block"
                >
                  →
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
