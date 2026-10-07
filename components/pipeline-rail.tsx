"use client";

import { useEffect, useState } from "react";

import { pipeline } from "@/lib/site";

/**
 * Left-edge scroll rail: the homepage's sections as workflow nodes.
 * The lime wire fills as you scroll, like a run moving through the pipeline.
 */
export function PipelineRail() {
  const [active, setActive] = useState(0);
  const [fill, setFill] = useState(0);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const probe = window.scrollY + window.innerHeight * 0.4;
      const tops = pipeline.map((p) => document.getElementById(p.id)?.getBoundingClientRect().top ?? 0).map((t) => t + window.scrollY);
      let i = 0;
      while (i < tops.length - 1 && probe >= tops[i + 1]) i++;
      const atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      const span = (tops[i + 1] ?? tops[i] + 1) - tops[i];
      const frac = i < tops.length - 1 ? Math.min(Math.max((probe - tops[i]) / span, 0), 1) : 1;
      setActive(atEnd ? pipeline.length - 1 : i);
      setFill(atEnd ? 1 : (i + frac) / (pipeline.length - 1));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <nav aria-label="Page sections" className="fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 min-[1400px]:block">
      <ol className="relative flex flex-col gap-7 rounded-full border border-line bg-canvas/85 px-2 py-4 backdrop-blur-md">
        <span aria-hidden className="absolute bottom-6 left-1/2 top-6 w-px -translate-x-1/2 bg-line">
          <span
            className="absolute inset-0 origin-top bg-lime transition-transform duration-300"
            style={{ transform: `scaleY(${fill})` }}
          />
        </span>
        {pipeline.map((p, i) => {
          const state = i === active ? "active" : i < active ? "done" : "idle";
          return (
            <li key={p.id} className="relative">
              <a
                href={`#${p.id}`}
                aria-current={state === "active" ? "step" : undefined}
                className="group relative grid size-4 place-items-center"
              >
                <span
                  className={`size-2.5 rounded-full border transition-colors duration-300 ${
                    state === "idle" ? "border-quiet bg-canvas" : "border-lime bg-lime"
                  } ${state === "active" ? "ring-4 ring-lime/30" : ""}`}
                />
                <span
                  className={`label pointer-events-none absolute left-7 whitespace-nowrap rounded-[4px] border border-line bg-canvas px-1.5 py-0.5 text-fg transition-opacity duration-200 ${
                    state === "active" ? "opacity-0 min-[1600px]:opacity-100" : "opacity-0"
                  } group-hover:opacity-100 group-focus-visible:opacity-100`}
                >
                  {p.step} {p.node}
                </span>
                <span className="sr-only">
                  {p.step} {p.node}: {p.label}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
