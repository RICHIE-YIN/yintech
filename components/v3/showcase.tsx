import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import { SnapRail } from "@/components/v3/snap-rail";
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
  heroBackdrop: "hero-backdrop",
  pageBackdrop: "page-backdrop",
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
 * Resolved at build time — every V3 route is statically prerendered, so this
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
      className={cn("v3-showcase", className)}
      style={{ aspectRatio: `${asset.width} / ${asset.height}` }}
    >
      <Image
        alt={alt}
        className="v3-showcase-image"
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
    <section className="v3-section v3-showcase-band">
      {/* Bands render their own section rather than going through V3Section,
          so they need snap coverage of their own. */}
      <SnapRail />
      <div className="v3-container" data-width="wide">
        <div className="v3-showcase-band-inner" data-reveal>
          {eyebrow ? <p className="v3-eyebrow">{eyebrow}</p> : null}
          <Showcase alt={alt} name={name} sizes="(max-width: 900px) 100vw, 92vw" />
          {caption ? <p className="v3-showcase-caption">{caption}</p> : null}
        </div>
      </div>
    </section>
  );
}

/**
 * Atmosphere for the inner page heroes. Deliberately quieter than the
 * homepage: same world, heavier scrim, no embossed mark — the homepage keeps
 * that as its arrival moment.
 */
export function PageHeroBackdrop() {
  const asset = resolveShowcase(SHOWCASE.pageBackdrop);
  if (!asset) return null;

  return (
    <div aria-hidden="true" className="v3-page-backdrop">
      <Image
        alt=""
        className="v3-page-backdrop-image"
        fill
        priority
        sizes="100vw"
        src={asset.src}
      />
      <span className="v3-page-backdrop-scrim" />
    </div>
  );
}
