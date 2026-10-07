import { ButtonLink } from "@/components/ui/button";
import { Mark } from "@/components/ui/mark";
import { site } from "@/lib/site";

import { SystemTrace } from "./system-trace";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="shell grid gap-12 pb-12 pt-8 md:pb-16 md:pt-14 lg:grid-cols-12 lg:items-center lg:gap-12"
    >
      <div className="lg:col-span-7">
        <p className="label flex items-center gap-2.5 text-faint">
          <span aria-hidden className="size-1.5 rounded-full bg-lime ring-2 ring-lime/30" />
          AI Automation &amp; CRM Systems
        </p>
        <h1 id="hero-title" className="mt-6 text-display text-fg">
          Make your business run without the <Mark onLoad>busywork.</Mark>
        </h1>
        <p className="mt-7 max-w-xl text-lede text-muted">
          I design and build the systems behind growing businesses: capturing leads, qualifying prospects, following up, booking
          appointments and keeping your CRM in sync.
        </p>
        <p className="mt-4 text-lede font-medium text-fg">Automation when you can. Custom software when you have to.</p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <ButtonLink href={site.calendar}>Book a strategy call</ButtonLink>
          <ButtonLink href="#work" variant="text" icon={<span aria-hidden>↓</span>}>
            See the work
          </ButtonLink>
        </div>
        <p className="mt-8 text-sm text-faint">Independent engineer · Philippines · Working worldwide</p>
      </div>

      <figure className="lg:col-span-5">
        <div className="theme-dark panel-shadow rounded-[1.5rem] p-2">
          <SystemTrace />
        </div>
        <figcaption className="label mt-3 px-1 text-faint">A live lead workflow, sample run</figcaption>
      </figure>
    </section>
  );
}
