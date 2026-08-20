"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** One observer for every `[data-reveal]` element; server components just add the attribute. */
export function RevealRoot() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.querySelector(".v4");
    if (!root) return;

    const targets = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reduced.matches || typeof IntersectionObserver === "undefined") {
      for (const target of targets) target.dataset.revealed = "true";
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.revealed = "true";
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );

    for (const target of targets) observer.observe(target);
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
