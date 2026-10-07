import type { ReactNode } from "react";

import { ButtonLink } from "@/components/ui/button";
import { Mark } from "@/components/ui/mark";
import { site, stepLabel } from "@/lib/site";

interface Props {
  title?: ReactNode;
  body?: string;
  /** Show the pipeline step label (homepage only). */
  step?: boolean;
}

const brief = [
  { k: "The workflow", v: "What's slow, manual or breaking today." },
  { k: "Your tools", v: "The CRM, forms and apps already in play." },
  { k: "Done looks like", v: "The outcome you want, and roughly when." },
];

export function ContactCTA({
  title = (
    <>
      Have a process that <Mark>should be automated?</Mark>
    </>
  ),
  body = "Tell me about the workflow that's slowing you down, the systems you need connected, or the application you want to build. We'll work out the right approach.",
  step = false,
}: Props) {
  return (
    <section id="contact" aria-labelledby="cta-title" className="border-t border-fg/80">
      <div className="shell grid gap-14 py-24 md:py-32 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <p className="label flex items-center gap-3 text-faint">
            <span className="inline-flex items-center gap-2 text-fg">
              <span aria-hidden className="size-1.5 rounded-full bg-lime ring-2 ring-lime/30" />
              {step ? stepLabel("contact") : "Next step"}
            </span>
            <span aria-hidden className="h-px w-6 bg-line" />
            Contact
          </p>
          <h2 id="cta-title" data-reveal className="mt-8 text-display text-fg">
            {title}
          </h2>
          <p className="mt-8 max-w-xl text-lede text-muted">{body}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href={site.calendar}>Book a strategy call</ButtonLink>
            <ButtonLink href={`mailto:${site.email}`} variant="text">
              {site.email}
            </ButtonLink>
          </div>
        </div>

        <aside aria-label="What to send" className="theme-dark panel-shadow self-end rounded-xl p-6 md:p-8 lg:col-span-5">
          <p className="label flex items-center justify-between text-faint">
            <span>Project brief</span>
            <span className="text-accent">3 inputs</span>
          </p>
          <p className="mt-5 text-xl tracking-[-0.02em] text-fg">Send me three things. I&apos;ll reply with a plan.</p>
          <ol className="mt-6 border-t border-line">
            {brief.map((b, i) => (
              <li key={b.k} className="grid grid-cols-[2rem_1fr] gap-2 border-b border-line py-4">
                <span className="font-mono text-[0.75rem] text-accent">0{i + 1}</span>
                <span>
                  <span className="block text-fg">{b.k}</span>
                  <span className="mt-0.5 block text-sm text-muted">{b.v}</span>
                </span>
              </li>
            ))}
          </ol>
          <p className="label mt-6 text-faint">{site.timezone}</p>
        </aside>
      </div>
    </section>
  );
}
