import type { MetadataRoute } from "next";

import { services } from "@/lib/content";
import { caseStudies } from "@/lib/projects";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    { path: "", priority: 1 },
    { path: "/work", priority: 0.9 },
    ...caseStudies.map((p) => ({ path: `/work/${p.slug}`, priority: 0.8 })),
    { path: "/services", priority: 0.9 },
    ...services.map((s) => ({ path: `/services/${s.slug}`, priority: 0.8 })),
    { path: "/about", priority: 0.6 },
  ];
  return routes.map((r) => ({ url: `${site.url}${r.path}`, lastModified: now, changeFrequency: "monthly", priority: r.priority }));
}
