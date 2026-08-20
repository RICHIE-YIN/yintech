"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Concept routes that ship their own header and footer. */
const SELF_CHROMED = ["/v2", "/v3"];

/**
 * V1 chrome (navbar + footer) wraps every route from the root layout.
 * The concept sites opt out here so they can bring their own.
 */
export function ChromeGate({
  children,
  footer,
  header,
}: {
  children: ReactNode;
  footer: ReactNode;
  header: ReactNode;
}) {
  const pathname = usePathname() ?? "";
  const selfChromed = SELF_CHROMED.some(
    (base) => pathname === base || pathname.startsWith(`${base}/`),
  );

  if (selfChromed) {
    return <>{children}</>;
  }

  return (
    <>
      {header}
      {children}
      {footer}
    </>
  );
}
