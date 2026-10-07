import { SectionHeader } from "@/components/ui/section-header";

interface Props {
  items: readonly { q: string; a: string }[];
  title?: string;
}

/** Native <details> disclosure: keyboard and screen-reader accessible with no JS. */
export function Faq({ items, title = "Questions, answered." }: Props) {
  return (
    <section aria-labelledby="faq-title" className="shell grid gap-12 py-24 md:py-32 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-4">
        <div className="lg:sticky lg:top-28">
          <SectionHeader label="FAQ" id="faq-title" title={title} className="!block" />
        </div>
      </div>
      <div className="border-t border-fg/80 lg:col-span-7 lg:col-start-6">
        {items.map((item, i) => (
          <details key={item.q} className="group border-b border-line">
            <summary className="flex min-h-16 cursor-pointer list-none items-baseline gap-5 py-5 text-[1.125rem] tracking-[-0.015em] text-fg transition-colors hover:text-muted [&::-webkit-details-marker]:hidden">
              <span className="label w-6 shrink-0 text-faint">{String(i + 1).padStart(2, "0")}</span>
              <span className="flex-1">{item.q}</span>
              <span aria-hidden className="relative size-3 shrink-0 self-center text-muted">
                <span className="absolute left-0 top-1/2 h-px w-3 bg-current" />
                <span className="absolute left-1/2 top-0 h-3 w-px bg-current transition-transform duration-300 group-open:scale-y-0" />
              </span>
            </summary>
            <p className="max-w-2xl pb-6 pl-11 pr-8 leading-relaxed text-muted">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
