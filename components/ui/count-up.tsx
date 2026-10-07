"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts the numeric part of a value like "200+" or "<5 min" up from zero when it
 * scrolls into view. Server-renders the final value; reduced motion skips the animation.
 */
export function CountUp({ value, duration = 1100 }: { value: string; duration?: number }) {
  const match = value.match(/^(\D*)(\d+)(.*)$/);
  const [shown, setShown] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!match || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const [, pre, num, post] = match;
    const target = Number(num);
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const step = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          setShown(`${pre}${Math.round(target * eased)}${post}`);
          if (t < 1) frame = requestAnimationFrame(step);
        };
        setShown(`${pre}0${post}`);
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <span ref={ref} aria-label={value}>
      <span aria-hidden>{shown}</span>
    </span>
  );
}
