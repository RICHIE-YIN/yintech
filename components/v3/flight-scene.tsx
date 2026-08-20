"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export type FlightStep = {
  id: string;
  label: string;
  body?: string;
  meta?: ReactNode;
  visual: ReactNode;
};

/**
 * A stack of stages advanced one at a time. Scroll only decides *which* stage
 * is current; the move itself is a fixed-duration CSS transition, so a flick
 * lands on the next stage at the same speed however slowly you scrolled.
 * Interpolating against scroll position made the change feel like a drag.
 */
export function FlightScene({
  body,
  eyebrow,
  id,
  numbered = false,
  perStageVh = 38,
  steps,
  title,
  titleTag: TitleTag = "h2",
}: {
  body?: string;
  eyebrow?: string;
  id?: string;
  numbered?: boolean;
  /** Scroll distance allotted to each stage. */
  perStageVh?: number;
  steps: FlightStep[];
  title: string;
  titleTag?: "h2" | "h3";
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    /*
     * Product windows are content-sized and taller than the row they get on
     * short viewports. Scale each one down to fit rather than clipping it, so
     * the whole interface stays visible at every window height.
     */
    const fitVisuals = () => {
      const visuals =
        section.querySelectorAll<HTMLElement>(".v3-flight-visual");
      for (const visual of visuals) {
        const child = visual.firstElementChild as HTMLElement | null;
        if (!child) continue;
        child.style.transform = "";
        const natural = child.offsetHeight;
        const available = visual.clientHeight;
        if (!natural || !available) continue;
        const fit = Math.min(1, available / natural);
        child.style.transform = fit < 0.999 ? `scale(${fit.toFixed(4)})` : "";
      }
    };

    let frame = 0;
    let running = true;
    let activeIndex = -1;

    const apply = () => {
      const rect = section.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      const progress =
        travel > 0
          ? Math.min(1, Math.max(0, -rect.top / travel))
          : rect.top <= 0
            ? 1
            : 0;

      section.style.setProperty("--flight-p", progress.toFixed(4));
      // Nearest stage wins outright — no partial states between them.
      const nearest = Math.round(progress * (steps.length - 1));

      if (nearest !== activeIndex) {
        activeIndex = nearest;
        setActive(nearest);
      }

      if (running) frame = requestAnimationFrame(apply);
    };

    fitVisuals();
    frame = requestAnimationFrame(apply);

    const resize = new ResizeObserver(fitVisuals);
    resize.observe(section);

    const visibility = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          frame = requestAnimationFrame(apply);
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(frame);
        }
      },
      { rootMargin: "15% 0px" },
    );
    visibility.observe(section);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      visibility.disconnect();
      resize.disconnect();
    };
  }, [steps.length]);

  return (
    <div
      className="v3-flight"
      id={id}
      ref={sectionRef}
      style={{
        minHeight: `calc(100svh + ${(steps.length - 1) * perStageVh}vh)`,
      }}
    >
      <div className="v3-flight-pin">
        <div className="v3-flight-inner">
          <div className="v3-flight-head">
            {eyebrow ? <p className="v3-eyebrow">{eyebrow}</p> : null}
            <TitleTag className="v3-scene-title">{title}</TitleTag>
            {body ? <p className="v3-flight-lede">{body}</p> : null}
          </div>

          <div className="v3-flight-stack">
            {steps.map((step, index) => (
              <div
                className="v3-flight-stage"
                data-state={
                  index === active
                    ? "active"
                    : index < active
                      ? "passed"
                      : "ahead"
                }
                key={step.id}
              >
                <div className="v3-flight-step">
                  {numbered ? (
                    <span className="v3-flight-step-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  ) : null}
                  <h3>{step.label}</h3>
                  {step.body ? <p>{step.body}</p> : null}
                  {step.meta}
                </div>
                <div className="v3-flight-visual">{step.visual}</div>
              </div>
            ))}
          </div>

          <ol className="v3-flight-rail">
            {steps.map((step, index) => (
              <li data-active={index === active || undefined} key={step.id}>
                <span className="v3-sr-only">{step.label}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
