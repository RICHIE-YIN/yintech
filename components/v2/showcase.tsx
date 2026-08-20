import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import type { ReactNode } from "react";
import { readImageSize } from "@/lib/image-size";
import { cn } from "@/lib/utils";

/**
 * Named showcase slots. Drop a file into `public/v2-assets/` using one of
 * these names and the matching section switches from its coded mockup to the
 * real render on the next build — no code change needed.
 *
 * `.webp` wins over `.png` over `.jpg` when more than one exists.
 */
export const SHOWCASE = {
  hero: "hero-system-showcase",
  salesAutomation: "services-sales-automation-showcase",
  quotesOperations: "services-quotes-operations-showcase",
  crmSystems: "services-crm-systems-showcase",
  websites: "services-websites-showcase",
  systemTransformation: "home-system-transformation-showcase",
  automationOs: "automation-os-flagship-showcase",
  aboutPhilosophy: "about-workflow-philosophy-showcase",
  howItWorksMap: "how-it-works-system-map-showcase",
} as const;

export type ShowcaseName = (typeof SHOWCASE)[keyof typeof SHOWCASE];

const ASSET_DIR = "v2-assets";
const EXTENSIONS = [".webp", ".png", ".jpg"] as const;

export type ResolvedShowcase = { src: string; width: number; height: number };

/**
 * Resolved at build time — every V2 route is statically prerendered, so this
 * never runs on a request. Dimensions come from the file itself, so a frame
 * always matches its asset and a replacement of any shape just fits.
 */
export function resolveShowcase(name: ShowcaseName): ResolvedShowcase | null {
  for (const extension of EXTENSIONS) {
    const file = `${name}${extension}`;
    const path = join(process.cwd(), "public", ASSET_DIR, file);
    if (!existsSync(path)) continue;

    const size = readImageSize(path);
    if (!size) continue;

    return { src: `/${ASSET_DIR}/${file}`, ...size };
  }
  return null;
}

export function hasShowcase(name: ShowcaseName): boolean {
  return resolveShowcase(name) !== null;
}

export function Showcase({
  alt,
  className,
  fallback = null,
  name,
  priority = false,
  sizes = "(max-width: 900px) 100vw, 62vw",
}: {
  alt: string;
  className?: string;
  /** Rendered until the named file exists. */
  fallback?: ReactNode;
  name: ShowcaseName;
  priority?: boolean;
  sizes?: string;
}) {
  const asset = resolveShowcase(name);

  if (!asset) return <>{fallback}</>;

  return (
    <figure
      className={cn("v2-showcase", className)}
      style={{ aspectRatio: `${asset.width} / ${asset.height}` }}
    >
      <Image
        alt={alt}
        className="v2-showcase-image"
        fill
        priority={priority}
        sizes={sizes}
        src={asset.src}
      />
    </figure>
  );
}

/**
 * A full-width showcase anchor. Renders nothing until its asset exists, so
 * sections that have no coded equivalent stay clean rather than shipping an
 * empty frame.
 */
export function ShowcaseBand({
  alt,
  caption,
  eyebrow,
  name,
}: {
  alt: string;
  caption?: string;
  eyebrow?: string;
  name: ShowcaseName;
}) {
  if (!hasShowcase(name)) return null;

  return (
    <section className="v2-section v2-showcase-band">
      <div className="v2-container" data-width="wide">
        <div className="v2-showcase-band-inner" data-reveal>
          {eyebrow ? <p className="v2-eyebrow">{eyebrow}</p> : null}
          <Showcase alt={alt} name={name} sizes="(max-width: 900px) 100vw, 92vw" />
          {caption ? <p className="v2-showcase-caption">{caption}</p> : null}
        </div>
      </div>
    </section>
  );
}
