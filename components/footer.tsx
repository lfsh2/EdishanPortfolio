import Image from "next/image";
import Link from "next/link";

import { caseStudies } from "@/lib/projects";
import { site } from "@/lib/site";

const columns = [
  {
    title: "Pages",
    links: [
      { href: "/", label: "Home" },
      { href: "/work", label: "Work" },
      { href: "/services", label: "Services" },
      { href: "/about", label: "About" },
    ],
  },
  {
    title: "Services",
    links: [
      { href: "/services/ai-automation", label: "AI Automation" },
      { href: "/services/crm-systems", label: "CRM Systems" },
      { href: "/services/full-stack-development", label: "Custom Software" },
    ],
  },
  {
    title: "Elsewhere",
    links: [
      { href: site.socials.linkedin, label: "LinkedIn" },
      { href: site.socials.github, label: "GitHub" },
      { href: site.resume, label: "Résumé (PDF)" },
      { href: site.calendar, label: "Book a call" },
    ],
  },
];

const linkClass = "inline-flex min-h-10 items-center text-[0.9375rem] text-muted transition-colors duration-200 hover:text-fg";

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="shell grid gap-12 py-16 sm:grid-cols-2 md:py-24 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-3">
          <Link href="/" className="font-display text-2xl text-fg">
            {site.name}
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
            AI automation and CRM systems, with the custom software behind them. Independent, based in Cavite, Philippines.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-4 inline-flex min-h-11 items-center break-all text-sm text-fg underline decoration-line underline-offset-[6px] transition-colors hover:decoration-fg"
          >
            {site.email}
          </a>
        </div>

        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title} className="lg:col-span-2">
            <p className="label text-faint">{col.title}</p>
            <ul className="mt-4">
              {col.links.map((l) => {
                const external = /^https?:/.test(l.href) || l.href.endsWith(".pdf");
                return (
                  <li key={l.href + l.label}>
                    <Link href={l.href} className={linkClass} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                      {l.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        ))}

        <nav aria-label="Live systems" className="lg:col-span-3">
          <p className="label flex items-center gap-2 text-faint">
            <span aria-hidden className="size-1.5 rounded-full bg-lime" />
            Live systems
          </p>
          <ul className="mt-4">
            {caseStudies.map((p) => (
              <li key={p.slug}>
                <Link href={`/work/${p.slug}`} className={`${linkClass} gap-3`}>
                  <Image
                    src={p.cover.src}
                    alt=""
                    width={36}
                    height={24}
                    className="h-6 w-9 rounded object-cover object-top-left ring-1 ring-line"
                  />
                  {p.shortTitle}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-line">
        <div className="shell flex flex-col gap-2 pb-32 pt-6 text-[0.8125rem] text-faint sm:flex-row sm:justify-between md:pb-8">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <p>Designed and engineered by me with Next.js, TypeScript and Tailwind. No template.</p>
        </div>
      </div>
    </footer>
  );
}
