"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export type SceneStep = {
  id: string;
  label: string;
  body?: string;
  meta?: ReactNode;
  visual: ReactNode;
};

type StickySceneProps = {
  align?: "visual-right" | "visual-left";
  body?: string;
  eyebrow?: string;
  footer?: ReactNode;
  id?: string;
  numbered?: boolean;
  steps: SceneStep[];
  title: string;
  titleTag?: "h2" | "h3";
};

/**
 * Sticky product visual on one side, scrolling copy on the other. The active
 * step is whichever copy block owns the middle of the viewport; the visual
 * crossfades to match. Below the layout breakpoint the sticky column is
 * dropped and each step renders its own visual inline (see v2.css).
 */
export function StickyScene({
  align = "visual-right",
  body,
  eyebrow,
  footer,
  id,
  numbered = false,
  steps,
  title,
  titleTag: TitleTag = "h2",
}: StickySceneProps) {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    const nodes = stepRefs.current.filter(Boolean) as HTMLLIElement[];
    if (!nodes.length || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = Number((entry.target as HTMLElement).dataset.stepIndex);
          if (!Number.isNaN(index)) setActive(index);
        }
      },
      { rootMargin: "-48% 0px -48% 0px", threshold: 0 },
    );

    for (const node of nodes) observer.observe(node);
    return () => observer.disconnect();
  }, [steps.length]);

  return (
    <div className="v2-scene" data-align={align} id={id}>
      <div className="v2-scene-copy">
        <div className="v2-scene-head" data-reveal>
          {eyebrow ? <p className="v2-eyebrow">{eyebrow}</p> : null}
          <TitleTag className="v2-scene-title">{title}</TitleTag>
          {body ? <p className="v2-scene-lede">{body}</p> : null}
        </div>

        <ol className="v2-scene-steps">
          {steps.map((step, index) => (
            <li
              data-active={index === active || undefined}
              data-step-index={index}
              key={step.id}
              ref={(node) => {
                stepRefs.current[index] = node;
              }}
            >
              <div className="v2-scene-step-copy">
                {numbered ? (
                  <span className="v2-scene-step-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                ) : null}
                <h3>{step.label}</h3>
                {step.body ? <p>{step.body}</p> : null}
                {step.meta}
              </div>
              <div className="v2-scene-visual-inline">{step.visual}</div>
            </li>
          ))}
        </ol>

        {footer ? <div className="v2-scene-footer">{footer}</div> : null}
      </div>

      <div className="v2-scene-visual-col">
        <div className="v2-scene-visual">
          {steps.map((step, index) => (
            <div
              aria-hidden={index === active ? undefined : "true"}
              className="v2-scene-frame"
              data-active={index === active || undefined}
              key={step.id}
            >
              {step.visual}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
