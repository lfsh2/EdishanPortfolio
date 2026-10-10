"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { site } from "@/lib/site";

const icon = (d: ReactNode) => (
  <svg
    aria-hidden
    viewBox="0 0 24 24"
    className="size-5"
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
  null,
  {
    href: "/services",
    label: "Services",
    icon: icon(
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
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
] as const;

/**
 * Floating app-style navigation, pinned to the bottom on every viewport.
 * Active state is shown by weight, colour and an indicator dot, never colour alone.
 */
export function BottomNav() {
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`));

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-50 flex justify-center md:hidden px-[4vw] pb-[calc(env(safe-area-inset-bottom)+0.75rem)] md:px-0 md:pb-5"
    >
      <ul className="flex w-full max-w-md items-center justify-between rounded-full border border-line bg-surface/90 p-1.5 shadow-[0_18px_40px_-18px_rgb(18_33_63/0.35)] backdrop-blur-xl md:w-auto md:max-w-none md:gap-1">
        {items.map((item) =>
          item ? (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`relative flex min-h-12 min-w-14 flex-col items-center justify-center gap-0.5 rounded-full px-3 text-[0.6875rem] transition-colors duration-200 md:min-w-0 md:flex-row md:gap-2 md:px-4 md:text-sm ${
                  isActive(item.href) ? "font-medium text-fg" : "text-muted hover:text-fg"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {isActive(item.href) ? (
                  <span aria-hidden className="absolute bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full bg-fg md:bottom-0.5" />
                ) : null}
              </Link>
            </li>
          ) : (
            <li key="book">
              <Link
                href={site.calendar}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-12 items-center justify-center gap-2 rounded-full bg-lime px-4 text-sm font-medium text-on-lime shadow-[0_8px_20px_-8px_rgb(132_204_22/0.8)] transition-transform duration-200 hover:-translate-y-0.5 md:px-5"
              >
                {icon(
                  <>
                    <rect x="4" y="5" width="16" height="15" rx="2" />
                    <path d="M8 3v4M16 3v4M4 10h16" />
                  </>,
                )}
                <span className="hidden sm:inline">Book a call</span>
                <span className="sm:hidden">Book</span>
              </Link>
            </li>
          ),
        )}
      </ul>
    </nav>
  );
}
