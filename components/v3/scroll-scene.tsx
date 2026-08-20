"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Mode = "pin" | "enter";

/**
 * Publishes scroll position as CSS custom properties and lets CSS do the
 * animating. One rAF loop per scene, no React state, so scrolling never
 * re-renders the tree.
 *
 *   --scene-p     0 → 1 across the scene's range
 *   --scene-peak  0 → 1 → 0, peaking at the midpoint
 *
 * `pin` measures a tall section against its sticky child (progress runs while
 * the section is held in place). `enter` measures an element crossing the
 * viewport.
 */
export function ScrollScene({
  as: Tag = "div",
  children,
  className,
  id,
  mode = "enter",
}: {
  as?: "div" | "section";
  children: ReactNode;
  className?: string;
  id?: string;
  mode?: Mode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Park the scene at its resting state rather than animating it.
      node.style.setProperty("--scene-p", "1");
      node.style.setProperty("--scene-peak", "0");
      return;
    }

    let frame = 0;
    let running = true;
    let last = -1;

    const measure = () => {
      const rect = node.getBoundingClientRect();
      const viewport = window.innerHeight;

      let progress: number;
      if (mode === "pin") {
        const travel = rect.height - viewport;
        progress = travel > 0 ? -rect.top / travel : rect.top <= 0 ? 1 : 0;
      } else {
        progress = (viewport - rect.top) / (viewport + rect.height);
      }

      progress = Math.min(1, Math.max(0, progress));

      // Only touch the DOM when the value actually moves.
      if (Math.abs(progress - last) > 0.001) {
        last = progress;
        node.style.setProperty("--scene-p", progress.toFixed(4));
        node.style.setProperty(
          "--scene-peak",
          (1 - Math.abs(progress * 2 - 1)).toFixed(4),
        );
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
  }, [mode]);

  return (
    <Tag className={className} data-scene={mode} id={id} ref={ref}>
      {children}
    </Tag>
  );
}
