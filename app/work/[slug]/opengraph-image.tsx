import { renderOg, ogSize } from "@/lib/og";
import { caseStudies, getCaseStudy } from "@/lib/projects";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Live project by Edishan Lee Tenorio";

export function generateStaticParams() {
  return caseStudies.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getCaseStudy(slug);
  return renderOg({
    eyebrow: project ? `Live project · ${project.caseStudy.kind}` : "Project",
    lead: project?.title,
    title: project ? "Live in production." : "Project",
    footer: project ? project.stack.slice(0, 4).join(" · ") : "Edishan Lee Tenorio",
  });
}
