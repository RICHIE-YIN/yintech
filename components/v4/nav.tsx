"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { v4Site } from "@/content/v4";

export function V4Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="v4-header" data-open={open || undefined} data-scrolled={scrolled || undefined}>
      <div className="v4-header-inner">
        <Link aria-label="YinTech Solutions home" className="v4-brand" href={v4Site.base}>
          <span className="v4-brand-mark">
            <Image
              alt=""
              className="v4-brand-logo"
              height={57}
              priority
              src="/images/yintech-logo.png"
              style={{ height: "auto" }}
              width={86}
            />
          </span>
          <span className="v4-brand-word">YinTech</span>
        </Link>

        <nav aria-label="Primary" className="v4-nav">
          {v4Site.nav.map((item) => (
            <Link
              aria-current={pathname === item.href ? "page" : undefined}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="v4-header-actions">
          <Link className="v4-button v4-button-primary v4-header-cta" href={v4Site.cta.href}>
            {v4Site.cta.label}
          </Link>
          <button
            aria-controls="v4-mobile-nav"
            aria-expanded={open}
            className="v4-menu-toggle"
            onClick={() => setOpen((value) => !value)}
            type="button"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      <div className="v4-mobile-nav" hidden={!open} id="v4-mobile-nav">
        {v4Site.nav.map((item) => (
          <Link href={item.href} key={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </Link>
        ))}
        <Link
          className="v4-button v4-button-primary"
          href={v4Site.cta.href}
          onClick={() => setOpen(false)}
        >
          {v4Site.cta.label}
        </Link>
      </div>
    </header>
  );
}
