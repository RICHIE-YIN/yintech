"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { v3Site } from "@/content/v3";

export function V3Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="v3-header" data-scrolled={scrolled || undefined}>
      <div className="v3-header-inner">
        <Link aria-label="YinTech home" className="v3-brand" href={v3Site.base}>
          <Image
            alt="YinTech"
            height={52}
            priority
            src="/images/yintech-logo.png"
            style={{ height: "auto" }}
            width={78}
          />
        </Link>
        <nav aria-label="Primary" className="v3-nav">
          {v3Site.nav.map((item) => (
            <Link href={item.href} key={item.href}>
              <span className="v3-nav-dot" aria-hidden="true" />
              {item.label}
            </Link>
          ))}
        </nav>
        <Link className="v3-button v3-button-primary v3-header-cta" href={v3Site.cta.href}>
          <span>{v3Site.cta.label}</span>
        </Link>
      </div>
    </header>
  );
}
