import { renderOg, ogSize } from "@/lib/og";
import { caseStudies, getCaseStudy } from "@/lib/projects";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Case study by Edishan Lee Tenorio";

export function generateStaticParams() {
  return caseStudies.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getCaseStudy(slug);
  return renderOg({
    eyebrow: project ? `${project.live ? "Live project" : "Case study"} · ${project.caseStudy.kind}` : "Project",
    lead: project?.title,
    title: project ? (project.live ? "Live in production." : "How it's built.") : "Project",
    footer: project ? project.stack.slice(0, 4).join(" · ") : "Edishan Lee Tenorio",
  });
}
