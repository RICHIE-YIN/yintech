import type { Metadata } from "next";
import type { ReactNode } from "react";
import { V3Nav } from "@/components/v3/nav";
import { V3Footer } from "@/components/v3/ui";
import "./v3.css";

export const metadata: Metadata = {
  title: "YinTech V3 | Spatial Concept",
  description:
    "Experimental V3 concept for YinTech: the automation system rendered as navigable 3D architecture.",
  robots: { index: false, follow: false },
};

export default function V3Layout({ children }: { children: ReactNode }) {
  return (
    <div className="v3">
      <div aria-hidden="true" className="v3-grain" />
      <V3Nav />
      <div className="v3-main">{children}</div>
      <V3Footer />
    </div>
  );
}
