"use client";

import { useRef, type ReactNode } from "react";

const MAX_TILT = 7;

/**
 * A panel that tilts toward the pointer in real 3D space. Transform is written
 * straight to the node — putting pointer position through React state would
 * re-render the tree on every mouse move for no benefit.
 */
export function TiltPanel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useRef<boolean | null>(null);

  const isReduced = () => {
    if (reduced.current === null) {
      reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)")
        .matches;
    }
    return reduced.current;
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node || isReduced()) return;
    const rect = node.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    node.style.transform = `perspective(900px) rotateY(${px * MAX_TILT}deg) rotateX(${-py * MAX_TILT}deg) translateZ(6px)`;
    node.style.setProperty("--glare-x", `${(px + 0.5) * 100}%`);
    node.style.setProperty("--glare-y", `${(py + 0.5) * 100}%`);
  };

  const reset = () => {
    const node = ref.current;
    if (!node) return;
    node.style.transform = "";
  };

  return (
    <div
      className={className}
      onPointerLeave={reset}
      onPointerMove={onPointerMove}
      ref={ref}
    >
      {children}
    </div>
  );
}
