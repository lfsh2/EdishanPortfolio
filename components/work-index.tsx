"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { LiveBadge } from "@/components/ui/live-badge";
import { disciplineLabel, projectHref, projects, type Discipline } from "@/lib/projects";

const filters: { key: "all" | Discipline; label: string }[] = [
  { key: "all", label: "All" },
  { key: "automation", label: disciplineLabel.automation },
  { key: "full-stack", label: disciplineLabel["full-stack"] },
];

export function WorkIndex() {
  // Server renders the full list; a ?type= filter in the URL is applied after hydration.
  const [active, setActive] = useState<"all" | Discipline>("all");

  useEffect(() => {
    const raw = new URLSearchParams(window.location.search).get("type");
    if (filters.some((f) => f.key === raw)) setActive(raw as Discipline);
  }, []);

  const visible = active === "all" ? projects : projects.filter((p) => p.disciplines.includes(active));

  const select = (key: "all" | Discipline) => {
    setActive(key);
    const url = new URL(window.location.href);
    if (key === "all") url.searchParams.delete("type");
    else url.searchParams.set("type", key);
    window.history.replaceState(window.history.state, "", url);
  };

  return (
    <div>
      <div role="group" aria-label="Filter projects by discipline" className="flex flex-wrap gap-2">
        {filters.map((f) => {
          const count = f.key === "all" ? projects.length : projects.filter((p) => p.disciplines.includes(f.key as Discipline)).length;
          const on = f.key === active;
          return (
            <button
              key={f.key}
              type="button"
              aria-pressed={on}
              onClick={() => select(f.key)}
              className={`inline-flex min-h-11 cursor-pointer items-center gap-2.5 rounded-md border px-4 text-[0.9375rem] transition-colors duration-200 ${
                on ? "border-fg bg-fg text-canvas" : "border-line bg-canvas text-muted hover:border-fg hover:text-fg"
              }`}
            >
              {f.label}
              <span className={`font-mono text-[0.7rem] ${on ? "text-canvas/60" : "text-faint"}`}>{String(count).padStart(2, "0")}</span>
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="sr-only">
        Showing {visible.length} projects
      </p>

      <ol className="mt-10 border-b border-line [&>li:first-child>*]:border-fg/80">
        {visible.map((p, i) => {
          const href = projectHref(p);
          const external = href ? /^https?:/.test(href) : false;
          const Row = (
            <>
              <span className="label hidden pt-1.5 text-faint md:col-span-1 md:block">{String(i + 1).padStart(2, "0")}</span>
              <span className="md:col-span-6">
                <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="text-2xl tracking-[-0.03em] text-fg transition-colors duration-200 group-hover:text-muted md:text-[1.75rem]">
                    {p.shortTitle}
                  </span>
                  {p.live ? <LiveBadge /> : null}
                </span>
                <span className="mt-2 block max-w-xl leading-relaxed text-muted">{p.summary}</span>
                <span className="label mt-4 block text-faint">
                  {p.disciplines.map((d) => disciplineLabel[d]).join(" + ")} · {p.year}
                </span>
                {p.result ? <span className="mt-2 block font-mono text-[0.75rem] text-accent">↳ {p.result}</span> : null}
              </span>
              <span className="md:col-span-4 md:col-start-8">
                <span className="block overflow-hidden rounded-lg border border-line bg-surface p-1.5">
                  <Image
                    src={p.cover.src}
                    alt=""
                    sizes="(min-width: 768px) 30vw, 100vw"
                    placeholder="blur"
                    className="aspect-[16/9] w-full rounded-[5px] object-cover object-top transition-transform duration-700 ease-[var(--ease-out-quart)] group-hover:scale-[1.03]"
                  />
                </span>
              </span>
              <span
                aria-hidden
                className="hidden pt-1 text-right font-mono text-faint transition-colors group-hover:text-muted md:col-span-1 md:col-start-12 md:block"
              >
                {href ? (external ? "↗" : "→") : ""}
              </span>
            </>
          );
          const rowClass = "group grid gap-6 border-t border-line py-8 md:grid-cols-12 md:gap-6 md:py-10";
          return (
            <li key={p.slug}>
              {href ? (
                <Link href={href} className={rowClass} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                  {Row}
                  {external ? <span className="sr-only"> (opens live site in a new tab)</span> : null}
                </Link>
              ) : (
                <div className={rowClass}>{Row}</div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
