"use client";

import Image from "next/image";
import { useEffect } from "react";

const INTRO_MS = 1500;
const SKIP_KEYS = new Set(["Escape", "Enter", " ", "Spacebar", "Esc"]);

/**
 * The brand moment. Whether it plays at all is decided pre-paint by the
 * inline boot script in the V2 layout, which sets `data-yt-intro="play"` on
 * <html>. This component only ends it — on time, or on a skip.
 */
export function IntroOverlay() {
  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.ytIntro !== "play") return;

    let done = false;
    const end = () => {
      if (done) return;
      done = true;
      window.clearTimeout(timer);
      root.dataset.ytIntro = "done";
      // Anything waiting on the intro starts immediately when it is skipped.
      root.style.setProperty("--v2-enter-delay", "0s");
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", end);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (!SKIP_KEYS.has(event.key)) return;
      event.preventDefault();
      end();
    };

    const timer = window.setTimeout(end, INTRO_MS);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", end);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", end);
    };
  }, []);

  return (
    <div aria-hidden="true" className="v2-intro">
      <div className="v2-intro-veil" />
      <Image
        alt=""
        className="v2-intro-logo"
        height={288}
        priority
        src="/images/yintech-logo.png"
        unoptimized
        width={432}
      />
    </div>
  );
}
