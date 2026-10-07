import { renderOg, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Edishan Lee Tenorio: I build intelligent systems that do the work.";

export default function Image() {
  return renderOg({
    eyebrow: "AI Automation · CRM · Custom Software",
    lead: "I build intelligent systems",
    title: "that do the work.",
    footer: "Independent engineer · Philippines · Remote worldwide",
  });
}
