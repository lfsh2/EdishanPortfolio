import type { ReactNode } from "react";

import { revealDelay } from "@/lib/utils";

interface Props {
  /** Pipeline step, e.g. "02 · qualify". Rendered before the label. */
  step?: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
  className?: string;
}

/**
 * Section opener: step + label on a hairline, headline on the left,
 * intro set against the right edge: an asymmetric spec-sheet layout.
 */
export function SectionHeader({ step, label, title, intro, id, className = "" }: Props) {
  return (
    <header className={`grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10 ${className}`}>
      <div className="lg:col-span-8">
        <p className="label flex items-center gap-3 text-faint">
          {step ? (
            <>
              <span className="inline-flex items-center gap-2 text-fg">
                <span aria-hidden className="size-1.5 rounded-full bg-lime ring-2 ring-lime/30" />
                {step}
              </span>
              <span aria-hidden className="h-px w-6 bg-line" />
            </>
          ) : null}
          {label}
        </p>
        <h2 id={id} data-reveal className="mt-6 text-headline text-fg">
          {title}
        </h2>
      </div>
      {intro ? (
        <div data-reveal style={revealDelay(100)} className="text-[1.0625rem] leading-relaxed text-muted lg:col-span-4 lg:pb-1">
          {intro}
        </div>
      ) : null}
    </header>
  );
}
