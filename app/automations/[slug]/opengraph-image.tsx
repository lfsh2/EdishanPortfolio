import { renderOg, ogSize } from "@/lib/og";
import { getWorkflowPage, workflowPages } from "@/lib/workflow-details";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Automation workflow by Edishan Lee Tenorio";

export function generateStaticParams() {
  return workflowPages.map((w) => ({ slug: w.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const w = getWorkflowPage(slug);
  return renderOg({
    eyebrow: w ? `Automation workflow · W0${w.index + 1}` : "Automation workflow",
    lead: w?.title,
    title: "Built end to end.",
    footer: w ? w.tools.slice(0, 5).join(" · ") : "n8n · GoHighLevel",
  });
}
