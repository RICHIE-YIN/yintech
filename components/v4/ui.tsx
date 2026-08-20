import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { v4Site } from "@/content/v4";

export function V4Button({
  children,
  className,
  href,
  variant = "primary",
}: {
  children: ReactNode;
  className?: string;
  href: string;
  variant?: "primary" | "secondary";
}) {
  return (
    <Link className={cn("v4-button", `v4-button-${variant}`, className)} href={href}>
      {children}
    </Link>
  );
}

export function V4Section({
  children,
  className,
  id,
  width = "standard",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  width?: "standard" | "wide";
}) {
  return (
    <section className={cn("v4-section", className)} id={id}>
      <div className="v4-container" data-width={width}>
        {children}
      </div>
    </section>
  );
}

/**
 * Eyebrow + heading + optional lede. `level` exists so each page gets exactly
 * one h1 — the page head — and every later section is an h2 beneath it.
 */
export function V4Head({
  eyebrow,
  index,
  lede,
  level = 2,
  title,
}: {
  eyebrow: string;
  index?: string;
  lede?: string;
  level?: 1 | 2;
  title: string;
}) {
  const Heading = level === 1 ? "h1" : "h2";

  return (
    <header className="v4-head" data-reveal>
      <p className="v4-eyebrow">
        {index ? <span className="v4-index">{index}</span> : null}
        {eyebrow}
      </p>
      <Heading className={level === 1 ? "v4-h1 v4-h1-page" : "v4-h2"}>
        {title}
      </Heading>
      {lede ? <p className="v4-lede">{lede}</p> : null}
    </header>
  );
}

export function V4Footer() {
  return (
    <footer className="v4-footer">
      <div className="v4-container" data-width="standard">
        <div className="v4-footer-cta" data-reveal>
          <p className="v4-eyebrow">Start here</p>
          <h2 className="v4-h2">
            Show us the repetitive work.
            <br />
            We&rsquo;ll map what a system replaces.
          </h2>
          <V4Button href={v4Site.cta.href}>Book an automation audit</V4Button>
        </div>

        <div className="v4-footer-meta">
          <div>
            <p className="v4-footer-name">YinTech Solutions</p>
            <p>
              Practical AI automation and business systems, built around the way
              your company actually works.
            </p>
          </div>
          <nav aria-label="Footer">
            {v4Site.nav.map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
            <Link href={v4Site.cta.href}>Contact</Link>
          </nav>
        </div>

        <p className="v4-footer-legal">
          © {new Date().getFullYear()} YinTech Solutions · V4 concept
        </p>
      </div>
    </footer>
  );
}
