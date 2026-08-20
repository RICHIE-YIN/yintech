"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Lays snap points down its parent section, roughly one per screen.
 *
 * Mandatory snapping is what actually makes the page feel like it moves in
 * steps — proximity only engages when a gesture happens to stop near a point,
 * which on a trackpad is almost never. But mandatory with one point per
 * section would strand the middle of any section taller than the viewport, so
 * the whole section gets covered.
 */
export function SnapRail({ stepVh = 68 }: { stepVh?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(1);

  useEffect(() => {
    const node = ref.current;
    const section = node?.parentElement;
    if (!node || !section) return;

    const measure = () => {
      const step = (window.innerHeight * stepVh) / 100;
      const height = section.getBoundingClientRect().height;
      setCount(Math.max(1, Math.ceil(height / step)));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(section);
    return () => observer.disconnect();
  }, [stepVh]);

  return (
    <div aria-hidden="true" className="v3-snap-rail" ref={ref}>
      {Array.from({ length: count }, (_, index) => (
        <span key={index} style={{ top: `${index * stepVh}vh` }} />
      ))}
      {/*
        * Aligned to the scrollport end rather than its start, so the bottom of
        * the last section is reachable. Without it, mandatory snapping stops
        * at the final start-aligned point and the footer cannot be scrolled to.
        */}
      <span data-edge="end" />
    </div>
  );
}
