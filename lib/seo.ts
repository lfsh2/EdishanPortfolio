import type { Metadata } from "next";

import { site } from "./site";

interface PageMeta {
  /** Page-specific title; the site name is appended unless `absolute` is set. */
  title: string;
  /** Keep under ~155 characters so search results don't truncate it. */
  description: string;
  path: string;
  absolute?: boolean;
  type?: "website" | "article" | "profile";
  /** Share image path; defaults to the site-wide one. */
  image?: string;
}

/**
 * One source for a page's search and social metadata. Next.js replaces (not merges)
 * a parent's openGraph/twitter objects, so every page sets its own to avoid
 * inheriting the homepage's preview title.
 */
export function pageMeta({ title, description, path, absolute, type = "website", image = "/opengraph-image" }: PageMeta): Metadata {
  const full = absolute ? title : `${title} | ${site.name}`;
  // Setting openGraph stops Next.js inheriting file-based share images, so reference one explicitly.
  const images = [{ url: image, width: 1200, height: 630, alt: full }];
  return {
    title: absolute ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: { title: full, description, url: path, siteName: site.name, type, locale: "en_US", images },
    twitter: { card: "summary_large_image", title: full, description, images },
  };
}
