"use client";

import { useEffect, useRef } from "react";
import {
  clamp,
  project,
  rotateX,
  rotateY,
  seeded,
  sizeCanvas,
  type Vec3,
} from "@/components/v3/engine";

const COLS = 9;
const ROWS = 5;
const LAYERS = 5;
const SPACING = 2.1;
const FOCAL = 620;
const CAMERA_Z = -13;

type Node = { home: Vec3; phase: number; accent: boolean };

function buildLattice(): { nodes: Node[]; edges: Array<[number, number]> } {
  const random = seeded(20260819);
  const nodes: Node[] = [];
  const index = new Map<string, number>();

  for (let z = 0; z < LAYERS; z += 1) {
    for (let y = 0; y < ROWS; y += 1) {
      for (let x = 0; x < COLS; x += 1) {
        index.set(`${x}:${y}:${z}`, nodes.length);
        nodes.push({
          home: {
            x: (x - (COLS - 1) / 2) * SPACING + (random() - 0.5) * 0.5,
            y: (y - (ROWS - 1) / 2) * SPACING + (random() - 0.5) * 0.5,
            z: (z - (LAYERS - 1) / 2) * SPACING + (random() - 0.5) * 0.5,
          },
          phase: random() * Math.PI * 2,
          // A single diagonal run reads as the active path through the mesh.
          accent: y === 2 && z === 2 && x % 2 === 0,
        });
      }
    }
  }

  const edges: Array<[number, number]> = [];
  for (let z = 0; z < LAYERS; z += 1) {
    for (let y = 0; y < ROWS; y += 1) {
      for (let x = 0; x < COLS; x += 1) {
        const from = index.get(`${x}:${y}:${z}`)!;
        const right = index.get(`${x + 1}:${y}:${z}`);
        const down = index.get(`${x}:${y + 1}:${z}`);
        const back = index.get(`${x}:${y}:${z + 1}`);
        if (right !== undefined) edges.push([from, right]);
        if (down !== undefined) edges.push([from, down]);
        if (back !== undefined) edges.push([from, back]);
      }
    }
  }

  return { nodes, edges };
}

/**
 * The hero mesh: a lattice of nodes drifting in 3D, drawn as wireframe with
 * depth-faded lines. Pointer movement tilts the camera slightly; it never
 * takes over the scroll or demands interaction.
 */
export function LatticeField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const { nodes, edges } = buildLattice();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    let width = 0;
    let height = 0;
    let frame = 0;
    let running = true;
    let pointerX = 0;
    let pointerY = 0;
    let tiltX = 0;
    let tiltY = 0;

    const resize = () => {
      const size = sizeCanvas(canvas, context);
      width = size.width;
      height = size.height;
    };
    resize();

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const draw = (time: number) => {
      const t = time / 1000;
      // Ease toward the pointer so the mesh never snaps.
      tiltY += (pointerX * 0.22 - tiltY) * 0.045;
      tiltX += (pointerY * 0.14 - tiltX) * 0.045;

      const spin = reduced.matches ? 0.35 : t * 0.055;
      context.clearRect(0, 0, width, height);

      const points = nodes.map((node) => {
        const drift = reduced.matches
          ? 0
          : Math.sin(t * 0.7 + node.phase) * 0.22;
        const world: Vec3 = {
          x: node.home.x,
          y: node.home.y + drift,
          z: node.home.z,
        };
        const spun = rotateX(rotateY(world, spin + tiltY), tiltX);
        return project(spun, width, height, FOCAL, CAMERA_Z);
      });

      context.lineWidth = 1;
      for (const [a, b] of edges) {
        const pa = points[a];
        const pb = points[b];
        if (pa.depth <= 0 || pb.depth <= 0) continue;
        const depth = (pa.depth + pb.depth) / 2;
        const alpha = clamp(0.42 - depth * 0.018, 0, 0.42);
        if (alpha <= 0.01) continue;
        context.strokeStyle = `rgba(120, 156, 214, ${alpha})`;
        context.beginPath();
        context.moveTo(pa.x, pa.y);
        context.lineTo(pb.x, pb.y);
        context.stroke();
      }

      for (let i = 0; i < nodes.length; i += 1) {
        const point = points[i];
        if (point.depth <= 0) continue;
        const node = nodes[i];
        const alpha = clamp(0.95 - point.depth * 0.035, 0, 0.95);
        if (alpha <= 0.02) continue;

        if (node.accent) {
          const pulse = reduced.matches
            ? 1
            : 0.6 + Math.sin(t * 2 + node.phase) * 0.4;
          const radius = clamp(point.scale * 0.05, 1.2, 4.4);
          context.fillStyle = `rgba(47, 125, 246, ${alpha * pulse})`;
          context.beginPath();
          context.arc(point.x, point.y, radius, 0, Math.PI * 2);
          context.fill();

          context.strokeStyle = `rgba(127, 216, 255, ${alpha * pulse * 0.45})`;
          context.beginPath();
          context.arc(point.x, point.y, radius * 2.6, 0, Math.PI * 2);
          context.stroke();
        } else {
          const size = clamp(point.scale * 0.022, 0.7, 2.1);
          context.fillStyle = `rgba(196, 214, 240, ${alpha * 0.55})`;
          context.fillRect(point.x - size / 2, point.y - size / 2, size, size);
        }
      }

      if (running && !reduced.matches) {
        frame = requestAnimationFrame(draw);
      }
    };

    frame = requestAnimationFrame(draw);

    // Stop the loop entirely when the hero is not on screen.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          frame = requestAnimationFrame(draw);
        } else if (!entry.isIntersecting) {
          running = false;
          cancelAnimationFrame(frame);
        }
      },
      { threshold: 0 },
    );
    observer.observe(canvas);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return <canvas aria-hidden="true" className="v3-lattice" ref={canvasRef} />;
}
