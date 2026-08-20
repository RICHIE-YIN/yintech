"use client";

import { useEffect, useRef, useState } from "react";
import {
  clamp,
  project,
  rotateY,
  sizeCanvas,
  type Vec3,
} from "@/components/v3/engine";
import { v3Nodes } from "@/content/v3";

const GAP = 16;
const FOCAL = 700;
const START_Z = -12;
const RING = 3.2;

/** Node centres run straight down the Z axis; the camera flies along it. */
const CENTRES: Vec3[] = v3Nodes.map((_, i) => ({ x: 0, y: 0, z: i * GAP }));

function ringPoints(centre: Vec3, sides: number, radius: number): Vec3[] {
  const points: Vec3[] = [];
  for (let i = 0; i < sides; i += 1) {
    const angle = (i / sides) * Math.PI * 2 + Math.PI / 4;
    points.push({
      x: centre.x + Math.cos(angle) * radius,
      y: centre.y + Math.sin(angle) * radius,
      z: centre.z,
    });
  }
  return points;
}

/**
 * Scroll drives a camera down the axis of the system: each stage arrives,
 * fills the frame, and passes. Labels are HTML positioned at the projected
 * coordinates so they stay selectable and readable to assistive tech, while
 * the geometry is drawn on canvas.
 */
export function SystemFlight() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0;
    let height = 0;
    let frame = 0;
    let activeIndex = 0;

    const resize = () => {
      const size = sizeCanvas(canvas, context);
      width = size.width;
      height = size.height;
    };
    resize();

    const draw = (time: number) => {
      const rect = section.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      const progress =
        travel > 0 ? clamp(-rect.top / travel, 0, 1) : rect.top <= 0 ? 1 : 0;

      const lastZ = CENTRES[CENTRES.length - 1].z;
      /*
       * Stop short of the final node rather than flying past it: overshooting
       * left the last stretch of the scroll on an empty frame.
       */
      const endZ = lastZ - GAP * 0.5;
      const cameraZ = START_Z + progress * (endZ - START_Z);
      const spin = reduced.matches ? 0 : time / 1000 * 0.08;

      context.clearRect(0, 0, width, height);

      // Axis line linking every stage.
      context.strokeStyle = "rgba(120, 156, 214, 0.22)";
      context.lineWidth = 1;
      context.beginPath();
      let started = false;
      for (const centre of CENTRES) {
        const p = project(centre, width, height, FOCAL, cameraZ);
        if (p.depth <= 0) {
          started = false;
          continue;
        }
        if (!started) {
          context.moveTo(p.x, p.y);
          started = true;
        } else {
          context.lineTo(p.x, p.y);
        }
      }
      context.stroke();

      let nearest = -1;
      let nearestDepth = Infinity;

      CENTRES.forEach((centre, i) => {
        const centreProjected = project(centre, width, height, FOCAL, cameraZ);
        const label = labelRefs.current[i];

        if (centreProjected.depth <= 0) {
          if (label) label.style.opacity = "0";
          return;
        }

        const depth = centreProjected.depth;
        if (depth < nearestDepth) {
          nearestDepth = depth;
          nearest = i;
        }

        // Fade in on approach, out as the stage passes the camera.
        const fade =
          clamp((60 - depth) / 26, 0, 1) * clamp((depth - 2) / 7, 0, 1);
        if (fade <= 0.01) {
          if (label) label.style.opacity = "0";
          return;
        }

        const points = ringPoints(centre, 6, RING).map((point) =>
          project(
            rotateY({ x: point.x, y: point.y, z: point.z - centre.z }, spin + i),
            width,
            height,
            FOCAL,
            cameraZ - centre.z,
          ),
        );

        context.strokeStyle = `rgba(47, 125, 246, ${fade * 0.85})`;
        context.lineWidth = 1.4;
        context.beginPath();
        points.forEach((point, index) => {
          if (index === 0) context.moveTo(point.x, point.y);
          else context.lineTo(point.x, point.y);
        });
        context.closePath();
        context.stroke();

        context.strokeStyle = `rgba(127, 216, 255, ${fade * 0.28})`;
        context.lineWidth = 1;
        context.beginPath();
        context.arc(
          centreProjected.x,
          centreProjected.y,
          Math.max(RING * centreProjected.scale * 0.62, 2),
          0,
          Math.PI * 2,
        );
        context.stroke();

        context.fillStyle = `rgba(127, 216, 255, ${fade})`;
        context.beginPath();
        context.arc(centreProjected.x, centreProjected.y, 2.4, 0, Math.PI * 2);
        context.fill();

        if (label) {
          const offset = Math.max(RING * centreProjected.scale * 0.75, 26);
          label.style.opacity = String(fade);
          label.style.transform = `translate3d(${
            centreProjected.x - label.offsetWidth / 2
          }px, ${centreProjected.y + offset}px, 0)`;
        }
      });

      // Hold the last stage when nothing is ahead, so the readout never resets.
      if (nearest !== -1 && nearest !== activeIndex) {
        activeIndex = nearest;
        setActive(nearest);
      }

      if (running) frame = requestAnimationFrame(draw);
    };

    let running = true;
    frame = requestAnimationFrame(draw);

    // No reason to run a camera nobody is looking at.
    const visibility = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          frame = requestAnimationFrame(draw);
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(frame);
        }
      },
      { threshold: 0 },
    );
    visibility.observe(section);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      visibility.disconnect();
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="v3-flight" id="architecture" ref={sectionRef}>
      <div className="v3-flight-stage">
        <canvas aria-hidden="true" className="v3-flight-canvas" ref={canvasRef} />

        <div aria-hidden="true" className="v3-flight-labels">
          {v3Nodes.map((node, i) => (
            <div
              className="v3-flight-label"
              key={node.id}
              ref={(element) => {
                labelRefs.current[i] = element;
              }}
            >
              <span className="v3-flight-label-index">{node.index}</span>
              <span className="v3-flight-label-text">{node.label}</span>
            </div>
          ))}
        </div>

        <div className="v3-flight-readout">
          <p className="v3-eyebrow">Architecture</p>
          <h2 className="v3-flight-title">{v3Nodes[active].label}</h2>
          <p className="v3-flight-detail">{v3Nodes[active].detail}</p>
          <div className="v3-flight-metric">
            <strong>{v3Nodes[active].metric}</strong>
            <span>{v3Nodes[active].metricLabel}</span>
          </div>
          <ol className="v3-flight-track">
            {v3Nodes.map((node, i) => (
              <li data-active={i === active || undefined} key={node.id}>
                <span className="v3-sr-only">{node.label}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Semantic fallback: the full sequence, readable without the canvas. */}
      <ol className="v3-flight-fallback">
        {v3Nodes.map((node) => (
          <li key={node.id}>
            <span>{node.index}</span>
            <h3>{node.label}</h3>
            <p>{node.detail}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
