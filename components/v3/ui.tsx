import Link from "next/link";
import type { ReactNode } from "react";
import {
  PageHeroBackdrop,
  SHOWCASE,
  hasShowcase,
} from "@/components/v3/showcase";
import { cn } from "@/lib/utils";
import { v3Site } from "@/content/v3";

export function V3Button({
  children,
  className,
  href,
  variant = "primary",
}: {
  children: ReactNode;
  className?: string;
  href: string;
  variant?: "primary" | "secondary" | "quiet";
}) {
  return (
    <Link className={cn("v3-button", `v3-button-${variant}`, className)} href={href}>
      {children}
    </Link>
  );
}

export function V3Section({
  children,
  className,
  id,
  width = "standard",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  width?: "standard" | "wide" | "full";
}) {
  return (
    <section className={cn("v3-section", className)} id={id}>
      <div className="v3-container" data-width={width}>
        {children}
      </div>
    </section>
  );
}

/** Inner-page hero. Picks up the shared backdrop once that asset exists. */
export function V3PageHero({
  children,
  width = "standard",
}: {
  children: ReactNode;
  width?: "standard" | "wide";
}) {
  const backdrop = hasShowcase(SHOWCASE.pageBackdrop);

  return (
    <section
      className="v3-section v3-page-hero"
      data-backdrop={backdrop || undefined}
    >
      <PageHeroBackdrop />
      <div className="v3-container" data-width={width}>
        {children}
      </div>
    </section>
  );
}

export function V3Footer() {
  return (
    <footer className="v3-footer">
      <div className="v3-container" data-width="standard">
        <div className="v3-footer-top">
          <p className="v3-footer-statement">
            Practical AI automation and business systems, built around the way
            your company actually works.
          </p>
          <V3Button href={v3Site.cta.href}>Book an Automation Audit</V3Button>
        </div>
        <div className="v3-footer-bottom">
          <span>YinTech · V3 concept</span>
          <nav aria-label="Footer">
            {v3Site.nav.map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
            <Link href="/">V1 site</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
