"use client";

import { useEffect, useRef, useState } from "react";

type Options = { from?: number; duration?: number };

/**
 * Animates an integer from its previous value (or `from` on first render) to `target`.
 * Skips the animation when the user prefers reduced motion.
 */
export function useCountUp(target: number, { from, duration = 900 }: Options = {}) {
  const start = from ?? target;
  const [value, setValue] = useState(start);
  const current = useRef(start);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || current.current === target) {
      current.current = target;
      setValue(target);
      return;
    }
    const origin = current.current;
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      current.current = origin + (target - origin) * eased;
      setValue(Math.round(current.current));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return value;
}
