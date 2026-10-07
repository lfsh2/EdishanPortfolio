import Image, { type StaticImageData } from "next/image";

import type { Note } from "@/lib/projects";

interface Props {
  src: StaticImageData;
  alt: string;
  notes?: Note[];
  sizes?: string;
  priority?: boolean;
  /** Dark mat for screenshots of dark UIs (e.g. the n8n canvas). */
  dark?: boolean;
  className?: string;
}

/**
 * A screenshot marked up like a design review: numbered callouts on the image,
 * with the legend as the accessible text. Hovering a legend row highlights its marker.
 */
export function AnnotatedShot({ src, alt, notes = [], sizes = "(min-width: 1024px) 760px, 100vw", priority, dark, className = "" }: Props) {
  return (
    <figure className={`group/shot ${className}`}>
      <div className={`relative overflow-hidden rounded-lg border border-line p-1.5 ${dark ? "bg-[#1d1d1d]" : "bg-surface"}`}>
        <Image src={src} alt={alt} sizes={sizes} priority={priority} placeholder="blur" className="h-auto w-full rounded-[5px]" />
        {notes.map((n, i) => (
          <span
            key={n.label}
            aria-hidden
            data-note={i}
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
            className="note-marker absolute grid size-6 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-lime font-mono text-[0.65rem] font-medium text-on-lime shadow-[0_0_0_4px_rgb(200_243_106/0.35),0_6px_14px_-4px_rgb(0_0_0/0.4)] transition-transform duration-200"
          >
            {i + 1}
          </span>
        ))}
      </div>
      {notes.length ? (
        <figcaption>
          <ol className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2">
            {notes.map((n, i) => (
              <li key={n.label} data-note-key={i} className="note-key flex items-start gap-3 text-sm leading-snug text-muted">
                <span className="mt-px grid size-5 shrink-0 place-items-center rounded-full border border-line font-mono text-[0.6rem] text-fg">
                  {i + 1}
                </span>
                {n.label}
              </li>
            ))}
          </ol>
        </figcaption>
      ) : null}
    </figure>
  );
}
