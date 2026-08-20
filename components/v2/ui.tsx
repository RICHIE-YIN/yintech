import Link from "next/link";
import type { ReactNode } from "react";
import {
  PageHeroBackdrop,
  SHOWCASE,
  hasShowcase,
} from "@/components/v2/showcase";
import { cn } from "@/lib/utils";
import { v2Site } from "@/content/v2";

export function V2Button({
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
    <Link className={cn("v2-button", `v2-button-${variant}`, className)} href={href}>
      {children}
    </Link>
  );
}

export function V2Section({
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
    <section className={cn("v2-section", className)} id={id}>
      <div className="v2-container" data-width={width}>
        {children}
      </div>
    </section>
  );
}

/** Inner-page hero. Picks up the shared backdrop once that asset exists. */
export function V2PageHero({
  children,
  width = "standard",
}: {
  children: ReactNode;
  width?: "standard" | "wide";
}) {
  const backdrop = hasShowcase(SHOWCASE.pageBackdrop);

  return (
    <section
      className="v2-section v2-page-hero"
      data-backdrop={backdrop || undefined}
    >
      <PageHeroBackdrop />
      <div className="v2-container" data-width={width}>
        {children}
      </div>
    </section>
  );
}

export function V2Footer() {
  return (
    <footer className="v2-footer">
      <div className="v2-container" data-width="standard">
        <div className="v2-footer-top">
          <p className="v2-footer-statement">
            Practical AI automation and business systems, built around the way
            your company actually works.
          </p>
          <V2Button href={v2Site.cta.href}>Book an Automation Audit</V2Button>
        </div>
        <div className="v2-footer-bottom">
          <span>YinTech · V2 concept</span>
          <nav aria-label="Footer">
            {v2Site.nav.map((item) => (
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
