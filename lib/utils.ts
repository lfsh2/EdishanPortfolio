import type { CSSProperties } from "react";

/** Stagger for [data-reveal] elements. */
export const revealDelay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;
