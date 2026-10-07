import Image from "next/image";
import { Fragment } from "react";
import Link from "next/link";

import portrait from "@/assets/people/edishan.jpg";
import { site } from "@/lib/site";

/** Compact profile header: identity first, navigation lives in the bottom bar. */
export function TopBar() {
  return (
    <header className="shell flex items-center justify-between gap-4 pb-2 pt-5 md:hidden">
      <Link href="/" className="group flex min-h-11 min-w-0 items-start gap-3" aria-label="Edishan Lee Tenorio, home">
        <Image
          src={portrait}
          alt=""
          width={44}
          height={44}
          priority
          className="mt-0.5 size-11 shrink-0 rounded-full object-cover object-[50%_22%] ring-2 ring-surface"
        />
        <span className="min-w-0 leading-tight">
          <span className="block text-[0.95rem] font-medium tracking-[-0.01em] text-fg">{site.name}</span>
          <span className="block text-[0.8125rem] font-medium text-fg/85">{site.role}</span>
          {/* Each title stays whole; the line only wraps between titles. */}
          <span className="mt-0.5 block text-[0.75rem] leading-snug text-faint">
            {site.titles.map((t, i) => (
              <Fragment key={t}>
                <span className="whitespace-nowrap">
                  {t}
                  {i < site.titles.length - 1 ? "\u00a0·" : ""}
                </span>{" "}
              </Fragment>
            ))}
          </span>
        </span>
      </Link>
      <p className="label hidden items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-fg sm:inline-flex">
        <span aria-hidden className="size-1.5 rounded-full bg-lime ring-2 ring-lime/30" />
        Available for remote work
      </p>
    </header>
  );
}
