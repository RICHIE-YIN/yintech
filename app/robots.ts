import type { MetadataRoute } from "next";
import { V4_INDEXABLE } from "@/content/v4";

const BASE = "https://yintechsolutions.com";

/** Concepts stay out of search until one of them becomes the live site. */
const CONCEPT_PATHS = ["/v2/", "/v3/", ...(V4_INDEXABLE ? [] : ["/v4/"])];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: CONCEPT_PATHS,
    },
    sitemap: `${BASE}/sitemap.xml`,
  };
}
