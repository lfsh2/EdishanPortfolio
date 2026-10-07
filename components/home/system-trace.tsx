"use client";

import { useEffect, useRef, useState } from "react";

/*
 * Hero schematic. Mirrors the structure of the production n8n workflow in the
 * live lead-qualification build (webhook → AI qualifier → priority router → CRM → action)
 * and plays one sample run through it. Values are illustrative and labelled so.
 */

const stages = [
  { kind: "Trigger", title: "Lead enters", meta: "webhook · forms · ads · calls", result: "201" },
  { kind: "Qualify", title: "AI qualification", meta: "openai · structured output", result: "score 86" },
  { kind: "Route", title: "Route by priority", meta: null, result: "→ high" },
  { kind: "Sync", title: "CRM & custom backend", meta: "ghl upsert · api · database", result: "upserted" },
  { kind: "Act", title: "Action & follow-up", meta: "calendar · email · analytics", result: "booked" },
] as const;

const log = [
  { t: "00.000", step: "POST", msg: "/webhook/lead", status: "201" },
  { t: "00.184", step: "qualify", msg: "score=86 priority=high", status: "ok" },
  { t: "00.207", step: "route", msg: "branch → high", status: "ok" },
  { t: "00.611", step: "crm", msg: "contact.upsert", status: "ok" },
  { t: "00.958", step: "act", msg: "calendar.create + gmail.send", status: "ok" },
];

const STEP_MS = 1050;
const HOLD_MS = 3400;
const DONE = stages.length;

export function SystemTrace() {
  // t = index of the stage currently executing; DONE = run complete.
  const [t, setT] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) {
      setT(DONE);
      return;
    }

    let timer: ReturnType<typeof setTimeout> | undefined;
    let visible = false;
    let step = -1;

    const tick = () => {
      step = step >= DONE ? 0 : step + 1;
      setT(step);
      timer = setTimeout(tick, step === DONE ? HOLD_MS : STEP_MS);
    };
    const start = () => {
      if (timer || !visible || document.hidden) return;
      timer = setTimeout(tick, step < 0 ? 500 : STEP_MS);
    };
    const stop = () => {
      clearTimeout(timer);
      timer = undefined;
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    if (ref.current) io.observe(ref.current);
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div
      ref={ref}
      role="img"
      aria-label="Diagram of an automated lead workflow: a lead enters through a webhook, is qualified by AI, routed by priority, synced to the CRM and custom backend, then followed up with a calendar booking and email."
      className="relative h-full rounded-xl border border-line bg-surface/70 backdrop-blur-[2px]"
    >
      <div aria-hidden className="flex items-center justify-between border-b border-line px-4 py-3 sm:px-5">
        <span className="label text-faint">lead-qualification.flow</span>
        <span className="label flex items-center gap-2 text-faint">
          <span className={`size-1.5 ${t >= 0 && t < DONE ? "status-dot bg-lime" : "bg-faint"}`} />
          {t >= DONE ? "run complete" : "sample run"}
        </span>
      </div>

      <ol aria-hidden className="relative px-4 py-5 sm:px-5 sm:py-6">
        {stages.map((s, i) => {
          const state = t > i || t >= DONE ? "done" : t === i ? "active" : "idle";
          return (
            <li key={s.kind} className="relative grid grid-cols-[1.75rem_1fr_auto] items-start gap-x-3 py-2.5 sm:gap-x-4">
              {/* Connector to the next stage; fills lime once this stage has passed its signal on. */}
              {i < DONE - 1 ? (
                <span className="absolute -bottom-[1.375rem] left-[0.875rem] top-[1.375rem] w-px bg-line">
                  <span
                    className="absolute inset-0 origin-top bg-lime transition-transform duration-[900ms] ease-[var(--ease-out-quart)]"
                    style={{ transform: `scaleY(${t > i ? 1 : 0})` }}
                  />
                </span>
              ) : null}
              <span className="relative flex h-6 items-center justify-center">
                <span
                  className={`relative z-10 size-2.5 border transition-colors duration-300 ${
                    state === "idle" ? "border-faint bg-surface" : "border-lime bg-lime"
                  }`}
                />
                <span
                  className={`absolute size-6 border border-lime/40 transition-opacity duration-300 ${state === "active" ? "opacity-100" : "opacity-0"}`}
                />
              </span>
              <span className="min-w-0">
                <span className="label block text-faint">
                  0{i + 1} · {s.kind}
                </span>
                <span
                  className={`mt-1 block text-[0.95rem] tracking-[-0.01em] transition-colors duration-300 sm:text-base ${state === "idle" ? "text-muted" : "text-fg"}`}
                >
                  {s.title}
                </span>
                {s.meta ? (
                  <span className="mt-0.5 block truncate font-mono text-[0.7rem] text-faint">{s.meta}</span>
                ) : (
                  <span className="mt-1.5 flex gap-1.5">
                    {["high", "med", "low"].map((p) => (
                      <span
                        key={p}
                        className={`border px-1.5 py-px font-mono text-[0.625rem] uppercase tracking-wider transition-colors duration-300 ${
                          p === "high" && state !== "idle" ? "border-lime text-accent" : "border-line text-faint"
                        }`}
                      >
                        {p}
                      </span>
                    ))}
                  </span>
                )}
              </span>
              <span
                className={`pt-[1.15rem] font-mono text-[0.7rem] text-accent transition-opacity duration-300 ${state === "done" ? "opacity-100" : "opacity-0"}`}
              >
                {s.result}
              </span>
            </li>
          );
        })}
      </ol>

      <div aria-hidden className="rounded-b-xl border-t border-line bg-canvas/60 px-4 py-3 font-mono text-[0.68rem] leading-[1.7] sm:px-5">
        <div className="h-[8.6rem] overflow-hidden">
          {log.map((line, i) => (
            <div
              key={line.t}
              className={`grid grid-cols-[3.4rem_3.6rem_1fr_auto] gap-2 transition-opacity duration-300 ${t > i || t >= DONE ? "opacity-100" : "opacity-0"}`}
            >
              <span className="text-faint">{line.t}</span>
              <span className="text-muted">{line.step}</span>
              <span className="truncate text-fg/80">{line.msg}</span>
              <span className="text-accent">{line.status}</span>
            </div>
          ))}
          <div className={`mt-1 text-accent transition-opacity duration-500 ${t >= DONE ? "opacity-100" : "opacity-0"}`}>
            ✓ responded in 0.96s <span className="text-faint">(manual baseline: 4–6 h)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
