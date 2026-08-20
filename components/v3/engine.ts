/**
 * Minimal 3D helpers for the V3 canvas scenes. Hand-rolled rather than
 * pulling in a WebGL library: these scenes are wireframe point-and-line work,
 * which canvas draws happily, and a 600KB dependency would cost more than it
 * buys on a static marketing site.
 */

export type Vec3 = { x: number; y: number; z: number };

export type Projected = {
  x: number;
  y: number;
  /** Perspective scale factor; also used for depth cues. */
  scale: number;
  /** Camera-space depth. Negative means behind the camera. */
  depth: number;
};

export function rotateY(p: Vec3, angle: number): Vec3 {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return { x: p.x * cos + p.z * sin, y: p.y, z: p.z * cos - p.x * sin };
}

export function rotateX(p: Vec3, angle: number): Vec3 {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return { x: p.x, y: p.y * cos - p.z * sin, z: p.y * sin + p.z * cos };
}

/**
 * Pinhole projection. `focal` is in the same units as the scene, `cameraZ`
 * moves the camera along Z. Points at or behind the near plane report a
 * negative depth so callers can skip them.
 */
export function project(
  p: Vec3,
  width: number,
  height: number,
  focal: number,
  cameraZ: number,
): Projected {
  const depth = p.z - cameraZ;
  const near = 0.1;
  if (depth <= near) {
    return { x: 0, y: 0, scale: 0, depth };
  }

  const scale = focal / depth;
  return {
    x: width / 2 + p.x * scale,
    y: height / 2 + p.y * scale,
    scale,
    depth,
  };
}

/** Deterministic pseudo-random so the lattice is identical every render. */
export function seeded(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** Sets up a device-pixel-ratio-correct backing store. Returns the CSS size. */
export function sizeCanvas(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
): { width: number; height: number; dpr: number } {
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(rect.width * dpr);
  canvas.height = Math.round(rect.height * dpr);
  context.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { width: rect.width, height: rect.height, dpr };
}
