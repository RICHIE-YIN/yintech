"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { v2Site } from "@/content/v2";

export function V2Nav() {
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
    <header className="v2-header" data-open={menuOpen || undefined} data-scrolled={scrolled || undefined}>
      <div className="v2-header-inner">
        <Link aria-label="YinTech home" className="v2-brand" href="/v2">
          <span className="v2-brand-mark">
            <Image
              alt="YinTech"
              className="v2-brand-logo"
              height={57}
              priority
              src="/images/yintech-logo.png"
              unoptimized
              width={86}
            />
          </span>
          <span className="v2-brand-word">YinTech</span>
        </Link>

        <nav aria-label="Primary" className="v2-nav">
          {v2Site.nav.map((item) => (
            <Link
              aria-current={pathname === item.href ? "page" : undefined}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="v2-header-actions">
          <Link className="v2-button v2-button-primary v2-header-cta" href={v2Site.cta.href}>
            {v2Site.cta.label}
          </Link>
          <button
            aria-controls="v2-mobile-nav"
            aria-expanded={menuOpen}
            className="v2-menu-toggle"
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
          >
            <span className="v2-menu-bars" aria-hidden="true" />
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      <div className="v2-mobile-nav" hidden={!menuOpen} id="v2-mobile-nav">
        {v2Site.nav.map((item) => (
          <Link href={item.href} key={item.href} onClick={closeMenu}>
            {item.label}
          </Link>
        ))}
        <Link
          className="v2-button v2-button-primary"
          href={v2Site.cta.href}
          onClick={closeMenu}
        >
          {v2Site.cta.label}
        </Link>
      </div>
    </header>
  );
}
