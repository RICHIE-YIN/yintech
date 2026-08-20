import type { MetadataRoute } from "next";
import { V4_INDEXABLE } from "@/content/v4";

const BASE = "https://yintechsolutions.com";

const LIVE_ROUTES = [
  "",
  "/services",
  "/automation-os",
  "/how-it-works",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
];

const V4_ROUTES = [
  "/v4",
  "/v4/services",
  "/v4/automation-os",
  "/v4/how-it-works",
  "/v4/about",
  "/v4/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date();
  const routes = [...LIVE_ROUTES, ...(V4_INDEXABLE ? V4_ROUTES : [])];

  return routes.map((route) => ({
    url: `${BASE}${route}`,
    lastModified: updated,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
