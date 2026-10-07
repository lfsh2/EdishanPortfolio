import { ArrowLink } from "@/components/ui/button";
import { Mark } from "@/components/ui/mark";
import { SectionHeader } from "@/components/ui/section-header";
import { experience, testimonials } from "@/lib/content";
import { stepLabel } from "@/lib/site";
import { revealDelay } from "@/lib/utils";

/** Present-tense roles first: the log reads newest-on-top, like `git log`. */
const log = [...experience.slice(0, 3)].sort((a, b) => Number(b.period.includes("Present")) - Number(a.period.includes("Present")));

export function Experience() {
  const [lead, ...rest] = testimonials;

  return (
    <section id="trust" aria-labelledby="exp-title" className="shell py-24 md:py-32">
      <SectionHeader
        step={stepLabel("trust")}
        label="Track record"
        id="exp-title"
        title={
          <>
            From building applications to <Mark>automating entire workflows.</Mark>
          </>
        }
        intro={
          <>
            <p>Production roles and independent client work since 2023.</p>
            <ArrowLink href="/about" className="mt-2">
              Full background
            </ArrowLink>
          </>
        }
      />

      <div className="mt-14 grid gap-16 md:mt-20 lg:grid-cols-12 lg:gap-12">
        <ol aria-label="Experience" className="relative self-start lg:col-span-5">
          <span aria-hidden className="absolute bottom-3 left-[5px] top-3 w-px bg-line" />
          {log.map((role, i) => {
            const head = role.period.includes("Present");
            return (
              <li key={role.company} data-reveal style={revealDelay(i * 80)} className="relative pb-10 pl-9 last:pb-0">
                <span
                  aria-hidden
                  className={`absolute left-0 top-1.5 size-[11px] rounded-full border-2 ${
                    head ? "border-lime bg-lime ring-4 ring-lime/25" : "border-fg bg-canvas"
                  }`}
                />
                <p className="label flex items-center gap-2 text-faint">
                  {role.period}
                  {head ? <span className="rounded-[4px] bg-fg px-1.5 py-px text-canvas">ongoing</span> : null}
                </p>
                <p className="mt-2 text-2xl tracking-[-0.03em] text-fg">{role.company}</p>
                <p className="mt-1 text-muted">{role.title}</p>
              </li>
            );
          })}
        </ol>

        <div className="lg:col-span-7">
          <figure data-reveal className="border-t border-fg/80 pt-8">
            <span aria-hidden className="block font-mono text-4xl leading-none text-accent">
              &ldquo;
            </span>
            <blockquote className="mt-3 text-title text-fg">
              <p>{lead.quote}</p>
            </blockquote>
            <figcaption className="mt-6 text-sm">
              <span className="text-fg">{lead.name}</span>
              <span className="text-faint">, {lead.org}</span>
            </figcaption>
          </figure>
          <div className="mt-12 grid gap-10 sm:grid-cols-2">
            {rest.map((t, i) => (
              <figure key={t.name} data-reveal style={revealDelay((i + 1) * 90)} className="border-t border-line pt-6">
                <blockquote className="text-[1.0625rem] leading-relaxed text-fg">
                  <p>&ldquo;{t.quote}&rdquo;</p>
                </blockquote>
                <figcaption className="mt-4 text-sm">
                  <span className="block text-fg">{t.name}</span>
                  <span className="block text-faint">{t.org}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
