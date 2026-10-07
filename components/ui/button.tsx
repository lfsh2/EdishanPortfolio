import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "lime" | "outline" | "text";

const variants: Record<Variant, string> = {
  primary: "bg-fg text-canvas hover:opacity-90 pl-5 pr-2",
  lime: "bg-lime text-on-lime hover:bg-[#d6f78c] pl-5 pr-2",
  outline: "border border-fg/25 text-fg hover:border-fg px-5",
  text: "text-fg hover:text-muted px-2",
};

interface Props extends Omit<ComponentProps<typeof Link>, "className"> {
  variant?: Variant;
  /** Trailing glyph. Primary/lime buttons default to an arrow in a circle. */
  icon?: ReactNode;
  className?: string;
}

const isExternal = (href: unknown) => typeof href === "string" && /^https?:/.test(href);

export function ButtonLink({ variant = "primary", icon, className = "", children, href, ...rest }: Props) {
  const external = isExternal(href);
  const outbound = external || (typeof href === "string" && href.startsWith("mailto:"));
  const filled = variant === "primary" || variant === "lime";
  const glyph =
    icon ??
    (filled ? (
      <span
        aria-hidden
        className={`grid size-8 place-items-center rounded-[4px] text-[0.8rem] transition-transform duration-300 group-hover:translate-x-0.5 ${
          variant === "lime" ? "bg-on-lime/10" : "bg-lime text-on-lime"
        }`}
      >
        {outbound ? "↗" : "→"}
      </span>
    ) : (
      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
        {outbound ? "↗" : "→"}
      </span>
    ));

  return (
    <Link
      href={href}
      className={`group inline-flex min-h-12 cursor-pointer items-center justify-center gap-4 rounded-md text-[0.9375rem] transition-[opacity,background-color,border-color,color] duration-200 ${variants[variant]} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      <span>{children}</span>
      {glyph}
    </Link>
  );
}

/** Quiet inline link with an arrow that nudges on hover. */
export function ArrowLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  const external = isExternal(href);
  return (
    <Link
      href={href}
      className={`group inline-flex min-h-11 items-center gap-2 text-[0.9375rem] text-fg transition-colors hover:text-muted ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span className="underline decoration-line underline-offset-[6px] transition-colors group-hover:decoration-fg">{children}</span>
      <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
        {external ? "↗" : "→"}
      </span>
    </Link>
  );
}
