import Link from "next/link";
import type { ReactNode } from "react";
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
  variant?: "primary" | "ghost";
}) {
  return (
    <Link className={cn("v3-button", `v3-button-${variant}`, className)} href={href}>
      <span>{children}</span>
    </Link>
  );
}

export function V3Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section className={cn("v3-section", className)} id={id}>
      <div className="v3-container">{children}</div>
    </section>
  );
}

export function V3Footer() {
  return (
    <footer className="v3-footer" id="contact">
      <div className="v3-container">
        <div className="v3-footer-main">
          <p className="v3-eyebrow">Start here</p>
          <h2 className="v3-footer-title">
            Show us the repetitive work.
            <br />
            We&rsquo;ll map what the system replaces.
          </h2>
          <V3Button href="/v2/contact">Book an Automation Audit</V3Button>
        </div>
        <div className="v3-footer-meta">
          <span>YinTech · V3 concept</span>
          <nav aria-label="Concepts">
            <Link href="/">V1</Link>
            <Link href="/v2">V2</Link>
            <Link href={v3Site.base}>V3</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
