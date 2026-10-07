import Image from "next/image";
import Link from "next/link";

import portrait from "@/assets/people/edishan.jpg";
import { site } from "@/lib/site";

/** Compact profile header: identity first, navigation lives in the bottom bar. */
export function TopBar() {
  return (
    <header className="shell flex items-center justify-between gap-4 pb-2 pt-5 md:pt-7">
      <Link href="/" className="group flex min-h-11 items-center gap-3" aria-label="Edishan Lee Tenorio, home">
        <Image
          src={portrait}
          alt=""
          width={44}
          height={44}
          priority
          className="size-10 rounded-full object-cover object-[50%_22%] ring-2 ring-surface md:size-11"
        />
        <span className="leading-tight">
          <span className="block text-[0.95rem] font-medium tracking-[-0.01em] text-fg">{site.name}</span>
          <span className="block text-[0.8125rem] text-faint">AI Automation &amp; CRM Systems</span>
        </span>
      </Link>
      <p className="label hidden items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-fg sm:inline-flex">
        <span aria-hidden className="size-1.5 rounded-full bg-lime ring-2 ring-lime/30" />
        Available for remote work
      </p>
    </header>
  );
}
