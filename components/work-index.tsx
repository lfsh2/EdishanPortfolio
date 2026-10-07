"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { LiveBadge } from "@/components/ui/live-badge";
import { disciplineLabel, projectHref, projects, type Discipline, type Project } from "@/lib/projects";

const filters: { key: "all" | Discipline; label: string }[] = [
  { key: "all", label: "All" },
  { key: "automation", label: disciplineLabel.automation },
  { key: "full-stack", label: disciplineLabel["full-stack"] },
];

type Size = "wide" | "tall" | "normal";

const sizes: Record<string, Size> = {
  "ai-lead-qualification": "wide",
  "jackson-properties": "tall",
  meeplecrate: "wide",
};
const size = (p: Project): Size => sizes[p.slug] ?? "normal";

const tileSpan: Record<Size, string> = {
  wide: "md:col-span-2",
  tall: "lg:row-span-2",
  normal: "",
};

function ProjectTile({ project: p }: { project: Project }) {
  const href = projectHref(p);
  const external = href ? /^https?:/.test(href) : false;
  const kind = size(p);

  const body = (
    <>
      <div className={`flex flex-col p-6 ${kind === "wide" ? "md:w-[44%] md:shrink-0 md:pr-2" : ""}`}>
        <div className="flex flex-wrap items-center gap-2.5">
          {p.live ? <LiveBadge /> : null}
          <span className="label text-faint">
            {p.disciplines.map((d) => disciplineLabel[d]).join(" + ")} · {p.year}
          </span>
        </div>
        <h2 className={`mt-4 font-display leading-[1.1] text-fg ${kind === "normal" ? "text-[1.6rem]" : "text-title"}`}>{p.shortTitle}</h2>
        <p className={`mt-2 text-[0.95rem] leading-relaxed text-muted ${kind === "normal" ? "line-clamp-3" : ""}`}>{p.summary}</p>
        {p.result ? <p className="mt-3 font-mono text-[0.75rem] text-accent">↳ {p.result}</p> : null}
        {href ? (
          <span className="mt-4 inline-flex items-center gap-2 text-sm text-fg">
            {p.caseStudy ? "See how it was built" : external ? "Visit live site" : "See the build"}
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
              {external ? "↗" : "→"}
            </span>
          </span>
        ) : null}
      </div>
      <div
        className={`overflow-hidden border-line bg-raised ${
          kind === "wide"
            ? "mx-6 mb-6 rounded-xl border md:mx-0 md:mb-0 md:mt-6 md:flex-1 md:rounded-b-none md:rounded-r-none md:border-b-0 md:border-r-0"
            : "mx-6 mt-auto rounded-t-xl border border-b-0"
        } ${kind === "tall" ? "flex-1" : ""}`}
      >
        <Image
          src={p.cover.src}
          alt=""
          sizes={kind === "wide" ? "(min-width: 1024px) 480px, 100vw" : "(min-width: 1024px) 340px, 100vw"}
          placeholder="blur"
          className={`w-full object-cover object-top-left transition-transform duration-700 ease-[var(--ease-out-quart)] group-hover:scale-[1.03] ${
            kind === "tall" ? "h-full min-h-56" : kind === "wide" ? "h-full min-h-48" : "aspect-[16/10]"
          }`}
        />
      </div>
    </>
  );

  const cls = `card group flex h-full overflow-hidden transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgb(18_33_63/0.35)] ${
    kind === "wide" ? "flex-col md:flex-row" : "flex-col"
  }`;

  return href ? (
    <Link href={href} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {body}
      {external ? <span className="sr-only"> (opens live site in a new tab)</span> : null}
    </Link>
  ) : (
    <div className={cls}>{body}</div>
  );
}

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

      {/* Bento grid: featured systems get larger tiles; dense flow fills gaps when filtering. */}
      <ul className="mt-8 grid grid-flow-dense gap-4 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <li key={p.slug} className={tileSpan[size(p)]}>
            <ProjectTile project={p} />
          </li>
        ))}
      </ul>
    </div>
  );
}
