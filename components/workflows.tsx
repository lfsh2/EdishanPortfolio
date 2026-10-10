import Image from "next/image";
import Link from "next/link";

import { Mark } from "@/components/ui/mark";
import { SectionHeader } from "@/components/ui/section-header";
import { revealDelay } from "@/lib/utils";
import { workflows, type Workflow } from "@/lib/workflows";

/** Numbered step-by-step flow with a connecting line. */
export function Flow({ steps }: { steps: string[] }) {
  return (
    <ol>
      {steps.map((step, i) => (
        <li key={step} className="relative flex gap-3 pb-3 last:pb-0">
          {i < steps.length - 1 ? <span aria-hidden className="absolute bottom-0 left-[0.6875rem] top-6 w-px bg-line" /> : null}
          <span
            className={`relative z-10 mt-0.5 grid size-[1.375rem] shrink-0 place-items-center rounded-full font-mono text-[0.6rem] ${
              i === 0 ? "bg-lime text-on-lime" : "border border-line bg-surface text-faint"
            }`}
          >
            {i + 1}
          </span>
          <span className="text-[0.9rem] leading-snug text-fg">{step}</span>
        </li>
      ))}
    </ol>
  );
}

/** Real n8n canvas, opened full size in a new tab since node labels are small at card width. */
export function Canvas({ w, sizes }: { w: Workflow; sizes: string }) {
  if (!w.image) return null;
  return (
    <a
      href={w.image.src.src}
      target="_blank"
      rel="noopener noreferrer"
      className="group/canvas relative block overflow-hidden rounded-xl border border-line bg-[#1d1d1d]"
    >
      <Image
        src={w.image.src}
        alt={w.image.alt}
        sizes={sizes}
        placeholder="blur"
        className="h-auto w-full transition-transform duration-500 group-hover/canvas:scale-[1.02]"
      />
      <span className="absolute bottom-2 right-2 rounded-full bg-[#12213f]/85 px-2.5 py-1 text-[0.7rem] text-white backdrop-blur">
        Open full size ↗<span className="sr-only"> (opens the workflow screenshot in a new tab)</span>
      </span>
    </a>
  );
}

function Meta({ w }: { w: Workflow }) {
  return (
    <>
      <p className="mt-5 text-[0.9rem] leading-relaxed text-muted">
        <span className="font-medium text-fg">Outcome. </span>
        {w.outcome}
      </p>
      {w.measures ? (
        <p className="mt-3 flex flex-wrap items-center gap-2 text-sm">
          <span className="label text-faint">Measured by</span>
          {w.measures.map((m) => (
            <span key={m} className="rounded-full bg-raised px-2.5 py-1 text-[0.8rem] text-fg">
              {m}
            </span>
          ))}
        </p>
      ) : null}
      <p className="mt-4 font-mono text-[0.72rem] text-faint">{w.tools.join(" · ")}</p>
      {w.proof ? (
        <Link
          href={w.proof.href}
          className="group mt-4 inline-flex min-h-11 items-center gap-2 text-sm text-fg underline decoration-line underline-offset-4 hover:decoration-fg"
        >
          <span aria-hidden className="size-1.5 rounded-full bg-lime ring-2 ring-lime/30" />
          {w.proof.label}
          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      ) : null}
    </>
  );
}

function Highlight({ w, n }: { w: Workflow; n: number }) {
  return (
    <article data-reveal style={revealDelay(n * 90)} aria-labelledby={`wf-${w.slug}`} className="card flex flex-col p-5 md:p-7">
      <div className="flex flex-wrap items-center gap-2.5">
        <span className="label rounded-[4px] bg-lime px-1.5 py-0.5 text-on-lime">Featured</span>
        <span className="label text-faint">
          W0{n + 1} · {w.category}
        </span>
      </div>
      <h3 id={`wf-${w.slug}`} className="mt-4 text-title text-fg">
        <Link href={`/automations/${w.slug}`} className="transition-colors hover:text-muted">
          {w.title}
        </Link>
      </h3>
      <p className="mt-1.5 text-sm text-faint">For {w.forWho.charAt(0).toLowerCase() + w.forWho.slice(1)}</p>
      <p className="mt-4 text-[1rem] leading-relaxed text-muted">{w.pitch}</p>

      <div className="theme-dark mt-6 rounded-2xl p-3 md:p-4">
        <Canvas w={w} sizes="(min-width: 1024px) 560px, 100vw" />
        <p className="label mb-3 mt-4 flex items-center gap-2 text-faint">
          <span aria-hidden className="size-1.5 rounded-full bg-lime" />
          Workflow
        </p>
        <Flow steps={w.steps} />
      </div>
      <Meta w={w} />
      <Link href={`/automations/${w.slug}`} className="group mt-auto inline-flex min-h-11 items-center gap-2 pt-5 text-[0.9375rem] text-fg">
        See the full breakdown
        <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </Link>
    </article>
  );
}

function Standard({ w, n }: { w: Workflow; n: number }) {
  return (
    <article data-reveal style={revealDelay((n % 2) * 80)} aria-labelledby={`wf-${w.slug}`} className="card flex flex-col p-5 md:p-6">
      <p className="label text-faint">
        W0{n + 1} · {w.category}
      </p>
      <h3 id={`wf-${w.slug}`} className="mt-3 font-display text-[1.6rem] leading-[1.1] text-fg">
        <Link href={`/automations/${w.slug}`} className="transition-colors hover:text-muted">
          {w.title}
        </Link>
      </h3>
      <p className="mt-1.5 text-sm text-faint">For {w.forWho.charAt(0).toLowerCase() + w.forWho.slice(1)}</p>
      <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{w.pitch}</p>
      <div className="mt-5 space-y-4">
        <Canvas w={w} sizes="(min-width: 1024px) 520px, 100vw" />
        <div className="rounded-xl border border-line bg-canvas p-4">
          <Flow steps={w.steps} />
        </div>
      </div>
      <Meta w={w} />
      <Link href={`/automations/${w.slug}`} className="group mt-auto inline-flex min-h-11 items-center gap-2 pt-5 text-[0.9375rem] text-fg">
        See the full breakdown
        <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </Link>
    </article>
  );
}

/** The automation workflow library: two featured builds, then the rest. */
export function WorkflowLibrary({ id = "workflows", header = true }: { id?: string; header?: boolean }) {
  const featured = workflows.filter((w) => w.highlight);
  const rest = workflows.filter((w) => !w.highlight);
  const index = (w: Workflow) => workflows.indexOf(w);

  return (
    <section
      id={id}
      aria-labelledby={header ? `${id}-title` : undefined}
      aria-label={header ? undefined : "Automation workflows"}
      className="shell scroll-mt-8 pb-20 md:pb-28"
    >
      {header ? (
        <SectionHeader
          label="Automation workflows"
          id={`${id}-title`}
          title={
            <>
              Workflows I build, <Mark>end to end.</Mark>
            </>
          }
          intro="The automations agencies and local service businesses ask for most, from the first trigger to the result on the contact record."
        />
      ) : null}
      <div className={`grid gap-4 lg:grid-cols-2 ${header ? "mt-12" : ""}`}>
        {featured.map((w) => (
          <Highlight key={w.slug} w={w} n={index(w)} />
        ))}
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {rest.map((w) => (
          <Standard key={w.slug} w={w} n={index(w)} />
        ))}
      </div>
    </section>
  );
}
