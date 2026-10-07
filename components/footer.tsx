import Image from "next/image";
import Link from "next/link";

import { Wordmark } from "@/components/wordmark";
import { caseStudies } from "@/lib/projects";
import { site } from "@/lib/site";

const columns = [
  {
    title: "Pages",
    links: [
      { href: "/", label: "Home" },
      { href: "/work", label: "Work" },
      { href: "/services/ai-automation", label: "AI & CRM Automation" },
      { href: "/services/full-stack-development", label: "Full-Stack Engineering" },
      { href: "/about", label: "About" },
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
    <footer className="bg-surface">
      <div className="shell grid gap-14 py-16 md:grid-cols-12 md:py-24">
        <div className="md:col-span-4">
          <Link href="/" aria-label="Edishan Lee, home">
            <Wordmark />
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
            {site.role}. Independent, based in Cavite, Philippines. Working with clients worldwide.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-4 inline-flex min-h-11 items-center break-all text-sm text-fg underline decoration-line underline-offset-[6px] transition-colors hover:decoration-fg"
          >
            {site.email}
          </a>
        </div>

        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title} className={col.title === "Pages" ? "md:col-span-3 md:col-start-5" : "md:col-span-2"}>
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

        <nav aria-label="Live systems" className="md:col-span-3">
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
        <div className="shell flex flex-col gap-2 py-6 text-[0.8125rem] text-faint sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <p>Designed and engineered by me with Next.js, TypeScript and Tailwind. No template.</p>
        </div>
      </div>
    </footer>
  );
}
