import Image, { type StaticImageData } from "next/image";

interface Props {
  src: StaticImageData;
  alt: string;
  caption?: string;
  index?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
}

/** Screenshot on a soft mat, captioned like a figure in a technical document. */
export function Figure({ src, alt, caption, index, sizes = "(min-width: 1024px) 60vw, 100vw", priority, className = "" }: Props) {
  return (
    <figure className={className}>
      <div className="overflow-hidden rounded-lg border border-line bg-surface p-1.5">
        <Image src={src} alt={alt} sizes={sizes} priority={priority} placeholder="blur" className="h-auto w-full rounded-[5px]" />
      </div>
      {caption ? (
        <figcaption className="mt-3 flex gap-3 px-1 text-sm leading-relaxed text-muted">
          {index !== undefined ? <span className="label shrink-0 pt-0.5 text-faint">Fig. {String(index).padStart(2, "0")}</span> : null}
          <span>{caption}</span>
        </figcaption>
      ) : null}
    </figure>
  );
}
