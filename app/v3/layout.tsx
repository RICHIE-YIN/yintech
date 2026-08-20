import type { Metadata } from "next";
import type { ReactNode } from "react";
import { IntroOverlay } from "@/components/v3/intro-overlay";
import { V3Nav } from "@/components/v3/nav";
import { RevealRoot } from "@/components/v3/reveal-root";
import { V3Footer } from "@/components/v3/ui";
import "./v3.css";

export const metadata: Metadata = {
  title: "YinTech V3 | Cinematic Concept",
  description:
    "Experimental V3 concept for YinTech: the V2 cinematic design with scroll-driven, camera-style transitions.",
  robots: { index: false, follow: false },
};

/**
 * Runs before first paint so the brand moment either exists or does not —
 * no flash either way. `--v3-enter-delay` holds the hero back until the
 * overlay has cleared.
 */
const INTRO_BOOT = `(function(){try{
var d=document.documentElement,k="yintech-v3-intro";
if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){d.dataset.ytIntro="skip";return;}
if(sessionStorage.getItem(k)){d.dataset.ytIntro="done";return;}
sessionStorage.setItem(k,"1");
d.dataset.ytIntro="play";
d.style.setProperty("--v3-enter-delay","2.6s");
}catch(e){}})();
`;

export default function V3Layout({ children }: { children: ReactNode }) {
  return (
    <div className="v3">
      <script dangerouslySetInnerHTML={{ __html: INTRO_BOOT }} />
      <noscript>
        <style>{`.v3 [data-reveal]{opacity:1!important;transform:none!important;filter:none!important}`}</style>
      </noscript>
      <IntroOverlay />
      <V3Nav />
      <div className="v3-main">{children}</div>
      <V3Footer />
      <RevealRoot />
    </div>
  );
}
