"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Publishes two things to CSS in one rAF loop:
 *
 *   --scene-p  on the wrapper, 0 → 1 as it crosses the viewport (drives the
 *              spine drawn down the list)
 *   --near     on each list item, 1 when it sits at the middle of the screen
 *              and falling off either side (drives the lift)
 *
 * The lift is applied to the item's children rather than the item itself: the
 * reveal system already owns transform on the item at a higher specificity,
 * and two systems writing the same property is how the last three bugs
 * started.
 */
export function ElevateList({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const items = Array.from(node.querySelectorAll<HTMLElement>("li"));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.style.setProperty("--scene-p", "1");
      for (const item of items) item.style.setProperty("--near", "1");
      return;
    }

    let frame = 0;
    let running = true;

    const measure = () => {
      const viewport = window.innerHeight;
      const rect = node.getBoundingClientRect();

      const progress = Math.min(
        1,
        Math.max(0, (viewport - rect.top) / (viewport + rect.height)),
      );
      node.style.setProperty("--scene-p", progress.toFixed(4));

      const middle = viewport / 2;
      // Reach is generous so neighbouring steps stay partially lifted and the
      // list reads as a wave rather than one item popping.
      const reach = viewport * 0.62;

      for (const item of items) {
        const box = item.getBoundingClientRect();
        const centre = box.top + box.height / 2;
        const near = Math.min(
          1,
          Math.max(0, 1 - Math.abs(centre - middle) / reach),
        );
        item.style.setProperty("--near", near.toFixed(3));
      }

      if (running) frame = requestAnimationFrame(measure);
    };

    frame = requestAnimationFrame(measure);

    const visibility = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          frame = requestAnimationFrame(measure);
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(frame);
        }
      },
      { rootMargin: "20% 0px" },
    );
    visibility.observe(node);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      visibility.disconnect();
    };
  }, []);

  return (
    <div className={className} ref={ref}>
      {children}
    </div>
  );
}
