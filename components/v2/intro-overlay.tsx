"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/**
 * Safety net only. The overlay's own fade-out normally ends the intro, so
 * this just covers the case where the animation never fires at all.
 */
const INTRO_FALLBACK_MS = 3600;
const SKIP_FADE_MS = 240;
const SKIP_KEYS = new Set(["Escape", "Esc", "Enter", " ", "Spacebar"]);

/**
 * The brand moment. Whether it plays at all is decided pre-paint by the
 * inline boot script in the V2 layout, which sets `data-yt-intro="play"` on
 * <html>. This component only ends it — on time, or on a skip.
 */
export function IntroOverlay() {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.ytIntro !== "play") return;

    const overlay = overlayRef.current;
    let done = false;

    const finish = () => {
      if (done) return;
      done = true;
      window.clearTimeout(timer);
      window.clearTimeout(skipTimer);
      root.dataset.ytIntro = "done";
      // Anything waiting on the intro starts immediately once it is over.
      root.style.setProperty("--v2-enter-delay", "0s");
      overlay?.removeEventListener("animationend", onAnimationEnd);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", skip);
    };

    /**
     * A skip gets its own short fade rather than cutting to the page, so
     * dismissing the intro still feels deliberate.
     */
    const skip = () => {
      if (done || root.dataset.ytIntro === "skipping") return;
      root.dataset.ytIntro = "skipping";
      skipTimer = window.setTimeout(finish, SKIP_FADE_MS);
    };

    /*
     * Ending on the overlay's own animation keeps the scroll lock in step
     * with the veil. A parallel timer would drift, because the CSS starts at
     * first paint while any timer can only start after hydration.
     */
    const onAnimationEnd = (event: AnimationEvent) => {
      if (event.target === overlay) finish();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (!SKIP_KEYS.has(event.key)) return;
      event.preventDefault();
      skip();
    };

    let skipTimer = 0;
    const timer = window.setTimeout(finish, INTRO_FALLBACK_MS);
    overlay?.addEventListener("animationend", onAnimationEnd);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", skip);

    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(skipTimer);
      overlay?.removeEventListener("animationend", onAnimationEnd);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", skip);
    };
  }, []);

  return (
    <div aria-hidden="true" className="v2-intro" ref={overlayRef}>
      <div className="v2-intro-veil" />
      <Image
        alt=""
        className="v2-intro-logo"
        height={288}
        src="/images/yintech-logo.png"
        style={{ height: "auto" }}
        width={432}
      />
    </div>
  );
}
