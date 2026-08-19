"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * V1 chrome (navbar + footer) wraps every route from the root layout.
 * The V2 concept ships its own chrome, so it opts out here.
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
  const pathname = usePathname();
  const isV2 = pathname === "/v2" || pathname?.startsWith("/v2/");

  if (isV2) {
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
