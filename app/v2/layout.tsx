import type { Metadata } from "next";
import type { ReactNode } from "react";
import { IntroOverlay } from "@/components/v2/intro-overlay";
import { V2Nav } from "@/components/v2/nav";
import { RevealRoot } from "@/components/v2/reveal-root";
import { V2Footer } from "@/components/v2/ui";
import "./v2.css";

export const metadata: Metadata = {
  title: "YinTech V2 | Cinematic Concept",
  description:
    "Experimental V2 concept for YinTech: a cinematic, product-led presentation of AI automation and custom business systems.",
  robots: { index: false, follow: false },
};

/**
 * Runs before first paint so the brand moment either exists or does not —
 * no flash either way. `--v2-enter-delay` holds the hero back until the
 * overlay has cleared.
 */
const INTRO_BOOT = `(function(){try{
var d=document.documentElement,k="yintech-v2-intro";
if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){d.dataset.ytIntro="skip";return;}
if(sessionStorage.getItem(k)){d.dataset.ytIntro="done";return;}
sessionStorage.setItem(k,"1");
d.dataset.ytIntro="play";
d.style.setProperty("--v2-enter-delay","2.6s");
}catch(e){}})();
`;

export default function V2Layout({ children }: { children: ReactNode }) {
  return (
    <div className="v2">
      <script dangerouslySetInnerHTML={{ __html: INTRO_BOOT }} />
      <noscript>
        <style>{`.v2 [data-reveal]{opacity:1!important;transform:none!important;filter:none!important}`}</style>
      </noscript>
      <IntroOverlay />
      <V2Nav />
      <div className="v2-main">{children}</div>
      <V2Footer />
      <RevealRoot />
    </div>
  );
}
