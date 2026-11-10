import type { MetadataRoute } from "next";

import { services } from "@/lib/content";
import { caseStudies } from "@/lib/projects";
import { workflows } from "@/lib/workflows";
import { site } from "@/lib/site";

/** Last content change on pages without their own date (home, services, about). Bump it when their copy changes. */
const siteUpdated = "2026-11-10";

const latest = (dates: (string | undefined)[]) => dates.filter(Boolean).sort().at(-1) ?? siteUpdated;

export default function sitemap(): MetadataRoute.Sitemap {
  const workflowDate = (w: (typeof workflows)[number]) => w.updated ?? w.published;
  const routes = [
    { path: "", priority: 1, updated: siteUpdated },
    { path: "/work", priority: 0.9, updated: latest(caseStudies.map((p) => p.updated)) },
    ...caseStudies.map((p) => ({ path: `/work/${p.slug}`, priority: 0.8, updated: p.updated ?? siteUpdated })),
    { path: "/automations", priority: 0.9, updated: latest(workflows.map(workflowDate)) },
    ...workflows.map((w) => ({ path: `/automations/${w.slug}`, priority: 0.8, updated: workflowDate(w) })),
    { path: "/services", priority: 0.9, updated: siteUpdated },
    ...services.map((s) => ({ path: `/services/${s.slug}`, priority: 0.8, updated: siteUpdated })),
    { path: "/about", priority: 0.6, updated: siteUpdated },
  ];
  return routes.map((r) => ({
    url: `${site.url}${r.path}`,
    lastModified: r.updated,
    changeFrequency: "monthly",
    priority: r.priority,
  }));
}
