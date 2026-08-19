"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Single IntersectionObserver for every `[data-reveal]` element on the page.
 * Server components only have to add the attribute; nothing else ships JS.
 */
export function RevealRoot() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.querySelector(".v2");
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const targets = Array.from(
      root.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    if (reduced.matches || typeof IntersectionObserver === "undefined") {
      for (const target of targets) target.dataset.revealed = "true";
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const target = entry.target as HTMLElement;
          target.dataset.revealed = "true";
          observer.unobserve(target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );

    for (const target of targets) observer.observe(target);
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
