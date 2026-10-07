import type { Stage } from "@/lib/projects";

const cols: Record<number, string> = {
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
};

/** System architecture rendered from data, on a dark instrument panel. */
export function StageFlow({ stages, crossCutting }: { stages: Stage[]; crossCutting?: string[] }) {
  return (
    <div className="theme-dark panel-shadow relative overflow-hidden rounded-3xl p-3 sm:p-4">
      <div aria-hidden className="blueprint pointer-events-none absolute inset-0" />
      <ol className={`relative grid gap-2 sm:grid-cols-2 ${cols[stages.length] ?? "lg:grid-cols-4"}`}>
        {stages.map((stage, i) => (
          <li key={stage.label} className="relative rounded-2xl border border-line bg-surface/80 p-5">
            <p className="label text-accent">{stage.label}</p>
            <p className="mt-3 text-[1.05rem] leading-snug tracking-[-0.015em] text-fg">{stage.title}</p>
            <ul className="mt-4 space-y-2">
              {stage.nodes.map((node) => (
                <li key={node} className="flex items-start gap-2.5 font-mono text-[0.72rem] leading-snug text-muted">
                  <span aria-hidden className="mt-[0.3rem] size-1 shrink-0 rounded-full bg-faint" />
                  {node}
                </li>
              ))}
            </ul>
            {i < stages.length - 1 ? (
              <span
                aria-hidden
                className="absolute -right-[0.8rem] top-6 z-10 hidden size-5 place-items-center rounded-full bg-canvas text-[0.65rem] text-faint ring-1 ring-line lg:grid"
              >
                →
              </span>
            ) : null}
          </li>
        ))}
      </ol>
      {crossCutting?.length ? (
        <div className="relative mt-2 flex flex-col gap-3 rounded-2xl border border-line bg-surface/50 p-5 sm:flex-row sm:items-center sm:gap-6">
          <p className="label shrink-0 text-faint">Across every stage</p>
          <ul className="flex flex-wrap gap-2">
            {crossCutting.map((c) => (
              <li key={c} className="rounded-full border border-line px-3 py-1 font-mono text-[0.7rem] text-muted">
                {c}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
