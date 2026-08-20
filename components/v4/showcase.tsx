import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import type { ReactNode } from "react";
import { readImageSize } from "@/lib/image-size";
import { cn } from "@/lib/utils";

/** Renders live in `public/v2-assets`, shared across every concept. */
const ASSET_DIR = "v2-assets";
const EXTENSIONS = [".webp", ".png", ".jpg"] as const;

export const SHOWCASE = {
  hero: "hero-system-showcase",
  heroBackdrop: "hero-backdrop",
  pageBackdrop: "page-backdrop",
  transformation: "home-system-transformation-showcase",
  automationOs: "automation-os-flagship-showcase",
  salesAutomation: "services-sales-automation-showcase",
  quotesOperations: "services-quotes-operations-showcase",
  crmSystems: "services-crm-systems-showcase",
  websites: "services-websites-showcase",
  aboutPhilosophy: "about-workflow-philosophy-showcase",
  howItWorksMap: "how-it-works-system-map-showcase",
} as const;

export type ShowcaseName = (typeof SHOWCASE)[keyof typeof SHOWCASE];

/** Build-time only: every V4 route is statically prerendered. */
export function resolveShowcase(
  name: ShowcaseName,
): { src: string; width: number; height: number } | null {
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

export function Showcase({
  alt,
  className,
  fallback = null,
  name,
  priority = false,
  sizes = "(max-width: 900px) 100vw, 60vw",
}: {
  alt: string;
  className?: string;
  fallback?: ReactNode;
  name: ShowcaseName;
  priority?: boolean;
  sizes?: string;
}) {
  const asset = resolveShowcase(name);
  if (!asset) return <>{fallback}</>;

  return (
    <figure
      className={cn("v4-showcase", className)}
      style={{ aspectRatio: `${asset.width} / ${asset.height}` }}
    >
      <Image
        alt={alt}
        className="v4-showcase-image"
        fill
        priority={priority}
        sizes={sizes}
        src={asset.src}
      />
    </figure>
  );
}
