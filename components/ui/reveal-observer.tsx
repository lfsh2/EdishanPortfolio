"use client";

import { useEffect } from "react";

/**
 * Marks [data-reveal] elements with [data-in] as they scroll into view.
 * Elements are only hidden when <html> has the `js` class (set inline in the
 * document head), so content never depends on this component to be visible.
 */
export function RevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-in", "");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    const observeAll = () => document.querySelectorAll("[data-reveal]:not([data-in])").forEach((el) => io.observe(el));

    observeAll();
    // Route changes and client-rendered lists add new nodes after first paint.
    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
