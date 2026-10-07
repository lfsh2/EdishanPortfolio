"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import { Wordmark } from "@/components/wordmark";
import { nav, site } from "@/lib/site";

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const servicesRef = useRef<HTMLLIElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const servicesId = useId();
  const menuId = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close any open menu on navigation.
  useEffect(() => {
    setServicesOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!servicesOpen && !menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (menuOpen) menuButtonRef.current?.focus();
      setServicesOpen(false);
      setMenuOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) setServicesOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [servicesOpen, menuOpen]);

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const linkClass = (active: boolean) =>
    `relative inline-flex min-h-11 items-center gap-1.5 text-[0.9375rem] transition-colors duration-200 hover:text-fg ${active ? "text-fg" : "text-muted"}`;
  const activeMark = <span aria-hidden className="absolute -bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-lime" />;

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled || menuOpen ? "border-b border-line-soft bg-canvas/80 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <nav aria-label="Primary" className="shell flex h-16 items-center justify-between md:h-[4.5rem]">
        <Link href="/" className="inline-flex min-h-11 items-center" aria-label="Edishan Lee, home">
          <Wordmark />
        </Link>

        <ul className="hidden items-center gap-9 md:flex">
          {nav.map((item) =>
            "children" in item ? (
              <li key={item.label} ref={servicesRef} className="relative">
                <button
                  type="button"
                  aria-expanded={servicesOpen}
                  aria-controls={servicesId}
                  onClick={() => setServicesOpen((v) => !v)}
                  className={`${linkClass(pathname.startsWith("/services"))} cursor-pointer`}
                >
                  {pathname.startsWith("/services") ? activeMark : null}
                  {item.label}
                  <svg
                    aria-hidden
                    width="9"
                    height="9"
                    viewBox="0 0 10 10"
                    className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                  >
                    <path d="M1 3.5 5 7l4-3.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                </button>
                <div
                  id={servicesId}
                  hidden={!servicesOpen}
                  className="absolute left-1/2 top-full mt-3 w-[20rem] -translate-x-1/2 rounded-2xl border border-line-soft bg-canvas p-2 shadow-[0_30px_60px_-30px_rgba(28,25,23,0.35)]"
                >
                  <ul>
                    {item.children.map((child, i) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          aria-current={isActive(child.href) ? "page" : undefined}
                          className="group flex gap-4 rounded-xl p-3 transition-colors duration-200 hover:bg-surface"
                        >
                          <span className="label pt-1 text-accent">0{i + 1}</span>
                          <span>
                            <span className="block text-sm text-fg">{child.label}</span>
                            <span className="mt-0.5 block text-[0.8rem] text-faint">{child.hint}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ) : (
              <li key={item.href}>
                <Link href={item.href} aria-current={isActive(item.href) ? "page" : undefined} className={linkClass(isActive(item.href))}>
                  {isActive(item.href) ? activeMark : null}
                  {item.label}
                </Link>
              </li>
            ),
          )}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href={site.calendar}
            target="_blank"
            rel="noopener noreferrer"
            className="group hidden min-h-10 items-center gap-2 rounded-full bg-fg px-4 text-sm text-canvas transition-opacity duration-200 hover:opacity-85 sm:inline-flex"
          >
            Let&apos;s talk
            <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">
              ↗
            </span>
          </Link>
          <button
            ref={menuButtonRef}
            type="button"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
            className="inline-flex size-11 cursor-pointer items-center justify-center text-fg md:hidden"
          >
            <span aria-hidden className="relative block h-2.5 w-5">
              <span
                className={`absolute left-0 h-px w-5 bg-current transition-transform duration-300 ${menuOpen ? "top-1 rotate-45" : "top-0"}`}
              />
              <span
                className={`absolute left-0 h-px w-5 bg-current transition-transform duration-300 ${menuOpen ? "top-1 -rotate-45" : "top-2.5"}`}
              />
            </span>
          </button>
        </div>
      </nav>

      <div id={menuId} hidden={!menuOpen} className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line-soft bg-canvas md:hidden">
        <div className="shell flex min-h-full flex-col justify-between py-8">
          <ul className="space-y-1">
            {[
              { href: "/", label: "Home" },
              { href: "/work", label: "Work" },
              ...nav.flatMap((item) => ("children" in item ? item.children.map((c) => ({ href: c.href, label: c.label })) : [])),
              { href: "/about", label: "About" },
            ].map((item, i) => (
              <li key={item.href} className="border-b border-line-soft">
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className="flex min-h-14 items-baseline gap-4 py-3 text-2xl tracking-[-0.03em] text-fg"
                >
                  <span className="label text-faint">0{i + 1}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10 space-y-4">
            <Link
              href={site.calendar}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-fg text-[0.9375rem] text-canvas"
            >
              Book a strategy call <span aria-hidden>↗</span>
            </Link>
            <a href={`mailto:${site.email}`} className="block break-all text-center text-sm text-muted">
              {site.email}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
