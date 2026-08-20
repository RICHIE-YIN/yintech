"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export type FlightStep = {
  id: string;
  label: string;
  body?: string;
  meta?: ReactNode;
  visual: ReactNode;
};

/** How far apart stages sit in depth. Higher = stronger zoom between them. */
const DEPTH = 0.62;

/**
 * A continuous camera dolly through a stack of stages. Scroll moves a camera
 * along Z: the stage ahead grows from far away until it fills the frame, then
 * scales past the viewer and blurs out as the next one arrives behind it.
 *
 * Every frame is scroll-linked rather than a state crossfade, so the motion
 * never snaps between stages — that continuity is the whole effect.
 */
export function FlightScene({
  body,
  eyebrow,
  id,
  numbered = false,
  perStageVh = 64,
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
  const stageRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

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

      // Camera position, measured in stages. Published so CSS (and tests)
      // can see the live value.
      section.style.setProperty("--flight-p", progress.toFixed(4));
      const camera = progress * (steps.length - 1);
      const nearest = Math.round(camera);

      for (let i = 0; i < steps.length; i += 1) {
        const stage = stageRefs.current[i];
        // Distance ahead of the camera: 0 is filling the frame.
        const d = i - camera;

        let scale: number;
        let opacity: number;
        let blur: number;

        if (reduced.matches) {
          scale = 1;
          blur = 0;
          opacity = i === nearest ? 1 : 0;
        } else if (d >= 0) {
          // Approaching: small and soft, resolving as it nears.
          scale = 1 / (1 + d * DEPTH);
          opacity = Math.min(1, Math.max(0, 1.2 - d * 0.8));
          blur = Math.min(d * 4.5, 12);
        } else {
          // Passing the viewer: blows past the frame and dissolves.
          scale = 1 + -d * 0.9;
          opacity = Math.min(1, Math.max(0, 1 + d * 1.7));
          blur = Math.min(-d * 12, 16);
        }

        if (stage) {
          stage.style.opacity = opacity.toFixed(3);
          stage.style.transform = `scale(${scale.toFixed(4)})`;
          stage.style.filter = blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : "";
          stage.style.zIndex = String(200 - Math.round(Math.abs(d) * 10));
          stage.style.pointerEvents = Math.abs(d) < 0.5 ? "auto" : "none";
        }
      }

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
                data-active={index === active || undefined}
                key={step.id}
                ref={(node) => {
                  stageRefs.current[index] = node;
                }}
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
