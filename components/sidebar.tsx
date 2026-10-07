"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import portrait from "@/assets/people/headshot.jpg";
import { site } from "@/lib/site";

const icon = (d: ReactNode) => (
  <svg
    aria-hidden
    viewBox="0 0 24 24"
    className="size-[1.15rem]"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {d}
  </svg>
);

const items = [
  { href: "/", label: "Home", icon: icon(<path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1z" />) },
  {
    href: "/work",
    label: "Work",
    icon: icon(
      <>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
      </>,
    ),
  },
  {
    href: "/services",
    label: "Services",
    icon: icon(
      <>
        <path d="m12 3 8 4.5-8 4.5-8-4.5z" />
        <path d="m4 12 8 4.5 8-4.5M4 16.5 12 21l8-4.5" />
      </>,
    ),
  },
  {
    href: "/about",
    label: "About",
    icon: icon(
      <>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 20c1.2-3.5 3.9-5 7-5s5.8 1.5 7 5" />
      </>,
    ),
  },
  {
    href: "#contact",
    label: "Contact",
    icon: icon(
      <>
        <path d="M4 6h16v12H4z" />
        <path d="m4 7 8 6 8-6" />
      </>,
    ),
  },
];

const socials = [
  { href: site.socials.linkedin, label: "LinkedIn" },
  { href: site.socials.github, label: "GitHub" },
  { href: site.resume, label: "Résumé" },
];

/** Tablet, laptop and desktop navigation: a fixed profile sidebar. Phones use the bottom bar instead. */
export function Sidebar() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : href.startsWith("/") && (pathname === href || pathname.startsWith(`${href}/`));

  return (
    <aside
      aria-label="Profile and navigation"
      className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col overflow-y-auto border-r border-line bg-canvas/95 px-4 py-7 backdrop-blur md:flex lg:w-[17.5rem] lg:px-5 lg:py-8"
    >
      <Link href="/" className="flex flex-col items-center text-center" aria-label="Edishan Lee Tenorio, home">
        <Image
          src={portrait}
          alt=""
          width={112}
          height={112}
          priority
          className="size-20 rounded-full object-cover lg:size-24 object-center shadow-[0_18px_40px_-20px_rgb(18_33_63/0.5)] ring-4 ring-surface"
        />
        <span className="mt-4 font-display text-[1.45rem] leading-tight text-fg lg:text-[1.65rem]">{site.name}</span>
        <span className="mt-1.5 text-[0.8125rem] font-medium leading-snug text-fg">
          {/* Break between the two halves of the role, never mid-phrase. */}
          <span className="whitespace-nowrap">AI Automation Specialist</span> <span className="whitespace-nowrap">&amp; CRM Developer</span>
        </span>
        <span className="mt-1.5 flex flex-col text-[0.75rem] leading-[1.5] text-faint">
          {site.titles.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </span>
      </Link>
      <p className="mx-auto mt-4 inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-line bg-surface px-3 py-1.5 text-[0.75rem] text-fg">
        <span aria-hidden className="size-1.5 rounded-full bg-lime ring-2 ring-lime/30" />
        Available for remote work
      </p>
      <ul className="mt-4 flex flex-wrap justify-center gap-1.5">
        {socials.map((s) => (
          <li key={s.label}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-9 items-center rounded-full border border-line bg-surface px-3 text-[0.75rem] text-muted transition-colors hover:border-fg hover:text-fg"
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>

      <nav aria-label="Primary" className="mt-8 border-t border-line pt-6">
        <ul className="space-y-1">
          {items.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex min-h-11 items-center gap-3 rounded-xl px-3.5 text-[0.95rem] transition-colors duration-200 ${
                    active
                      ? "bg-surface font-medium text-fg shadow-[0_1px_2px_rgb(18_33_63/0.06)] ring-1 ring-line"
                      : "text-muted hover:bg-surface/60 hover:text-fg"
                  }`}
                >
                  <span className={active ? "text-fg" : "text-faint"}>{item.icon}</span>
                  {item.label}
                  {active ? <span aria-hidden className="ml-auto size-1.5 rounded-full bg-lime ring-2 ring-lime/30" /> : null}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-auto border-t border-line pt-6">
        <Link
          href={site.calendar}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex min-h-12 items-center justify-center gap-2 rounded-xl bg-lime text-sm font-medium text-on-lime shadow-[0_8px_20px_-10px_rgb(132_204_22/0.8)] transition-transform duration-200 hover:-translate-y-0.5"
        >
          Book a strategy call
          <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">
            ↗
          </span>
        </Link>
        <p className="mt-4 text-center text-[0.75rem] text-faint">
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </aside>
  );
}
