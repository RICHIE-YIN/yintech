"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { v3Site } from "@/content/v3";

export function V3Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className="v3-header" data-open={menuOpen || undefined} data-scrolled={scrolled || undefined}>
      <div className="v3-header-inner">
        <Link aria-label="YinTech home" className="v3-brand" href="/v3">
          <span className="v3-brand-mark">
            <Image
              alt="YinTech"
              className="v3-brand-logo"
              height={57}
              priority
              src="/images/yintech-logo.png"
              style={{ height: "auto" }}
              width={86}
            />
          </span>
          <span className="v3-brand-word">YinTech</span>
        </Link>

        <nav aria-label="Primary" className="v3-nav">
          {v3Site.nav.map((item) => (
            <Link
              aria-current={pathname === item.href ? "page" : undefined}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="v3-header-actions">
          <Link className="v3-button v3-button-primary v3-header-cta" href={v3Site.cta.href}>
            {v3Site.cta.label}
          </Link>
          <button
            aria-controls="v3-mobile-nav"
            aria-expanded={menuOpen}
            className="v3-menu-toggle"
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
          >
            <span className="v3-menu-bars" aria-hidden="true" />
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      <div className="v3-mobile-nav" hidden={!menuOpen} id="v3-mobile-nav">
        {v3Site.nav.map((item) => (
          <Link href={item.href} key={item.href} onClick={closeMenu}>
            {item.label}
          </Link>
        ))}
        <Link
          className="v3-button v3-button-primary"
          href={v3Site.cta.href}
          onClick={closeMenu}
        >
          {v3Site.cta.label}
        </Link>
      </div>
    </header>
  );
}
