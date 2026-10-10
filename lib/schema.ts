import headshot from "@/assets/people/headshot.jpg";

import type { Service } from "./content";
import type { Project } from "./projects";
import { site } from "./site";

/** Schema.org structured data. Stable @ids let pages reference the same Person and WebSite. */
const abs = (path: string) => new URL(path, site.url).toString();
export const personId = abs("/#person");
const websiteId = abs("/#website");

export const personSchema = {
  "@type": "Person",
  "@id": personId,
  name: site.name,
  jobTitle: site.role,
  description:
    "AI automation specialist and CRM developer who builds GoHighLevel, n8n and AI workflows, and the custom software underneath them, for agencies and growing businesses.",
  url: site.url,
  image: abs(headshot.src),
  email: `mailto:${site.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Naic, Cavite", addressCountry: "PH" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Cavite State University" },
  sameAs: [site.socials.linkedin, site.socials.github],
  knowsAbout: [
    "GoHighLevel",
    "n8n",
    "AI automation",
    "AI receptionists",
    "CRM development",
    "Workflow automation",
    "OpenAI",
    "ElevenLabs",
    "Next.js",
    "TypeScript",
    "Laravel",
    "Java Spring Boot",
  ],
};

export const websiteSchema = {
  "@type": "WebSite",
  "@id": websiteId,
  name: site.name,
  url: site.url,
  inLanguage: "en",
  publisher: { "@id": personId },
};

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: abs(it.path) })),
  };
}

export function serviceSchema(service: Service) {
  return {
    "@type": "Service",
    name: service.name,
    serviceType: service.name,
    description: service.intro,
    url: abs(`/services/${service.slug}`),
    provider: { "@id": personId },
    areaServed: "Worldwide",
  };
}

/** FAQPage no longer earns Google rich results for most sites, but AI answer engines read it. */
export function faqSchema(items: readonly { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({ "@type": "Question", name: it.q, acceptedAnswer: { "@type": "Answer", text: it.a } })),
  };
}

export function projectSchema(project: Project) {
  return {
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: abs(`/work/${project.slug}`),
    image: abs(project.cover.src.src),
    creator: { "@id": personId },
    ...(project.year ? { dateCreated: project.year.slice(0, 4) } : {}),
    ...(project.liveUrl ? { sameAs: project.liveUrl } : {}),
    keywords: project.stack.join(", "),
  };
}

/** A workflow breakdown page: TechArticle, authored by the Person, illustrated by the real canvas. */
export function workflowSchema(w: { slug: string; h1: string; definition: string; tools: string[]; image?: { src: { src: string } } }) {
  return {
    "@type": "TechArticle",
    headline: w.h1,
    description: w.definition,
    url: abs(`/automations/${w.slug}`),
    author: { "@id": personId },
    ...(w.image ? { image: abs(w.image.src.src) } : {}),
    keywords: w.tools.join(", "),
    inLanguage: "en",
  };
}

export function itemList(items: { name: string; path: string }[]) {
  return {
    "@type": "ItemList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, url: abs(it.path) })),
  };
}

export const profilePageSchema = {
  "@type": "ProfilePage",
  url: abs("/about"),
  mainEntity: { "@id": personId },
};

export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
