import type { ReactNode } from "react";

/** Lime highlighter stroke for the one phrase in a headline that matters most. */
export function Mark({ children, onLoad = false }: { children: ReactNode; onLoad?: boolean }) {
  return <mark className={`marker ${onLoad ? "marker-load" : ""}`}>{children}</mark>;
}
