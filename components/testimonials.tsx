import { SectionHeader } from "@/components/ui/section-header";
import { testimonials } from "@/lib/content";
import { revealDelay } from "@/lib/utils";

/** Client quotes, verbatim. Text only until real video testimonials exist. */
export function Testimonials() {
  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="shell scroll-mt-8 py-20 md:py-28">
      <SectionHeader label="Testimonials" id="testimonials-title" title="Hear it from the people behind the systems." />
      <ul className="mt-12 grid gap-4 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <li key={t.name} data-reveal style={revealDelay(i * 80)}>
            <figure className="card flex h-full flex-col justify-between p-7">
              <blockquote className="font-display text-[1.45rem] leading-snug text-fg">
                <p>&ldquo;{t.quote}&rdquo;</p>
              </blockquote>
              <figcaption className="mt-8 border-t border-line pt-5 text-sm">
                <span className="block text-fg">{t.name}</span>
                <span className="mt-0.5 block text-faint">{t.org}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
