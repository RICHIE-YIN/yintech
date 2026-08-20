import type { Metadata } from "next";
import type { ReactNode } from "react";
import { V4Nav } from "@/components/v4/nav";
import { RevealRoot } from "@/components/v4/reveal";
import { V4Footer } from "@/components/v4/ui";
import { V4_INDEXABLE } from "@/content/v4";
import "./v4.css";

export const metadata: Metadata = {
  title: {
    default: "YinTech Solutions | AI Automation & Business Systems",
    template: "%s | YinTech Solutions",
  },
  description:
    "YinTech builds practical AI automation and custom business systems around the way your company already works: lead capture, qualification, CRM, follow-up, and reporting on one foundation.",
  // One flag in content/v4.ts controls indexing for the whole concept.
  robots: V4_INDEXABLE ? undefined : { index: false, follow: false },
};

export default function V4Layout({ children }: { children: ReactNode }) {
  return (
    <div className="v4">
      <a className="v4-skip" href="#v4-main">
        Skip to content
      </a>
      <V4Nav />
      <main className="v4-main" id="v4-main">
        {children}
      </main>
      <V4Footer />
      <RevealRoot />
    </div>
  );
}
