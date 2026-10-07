import { renderOg, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Edishan Lee Tenorio: Make your business run without the busywork.";

export default function Image() {
  return renderOg({
    eyebrow: "AI Automation & CRM Systems",
    lead: "Make your business run",
    title: "without the busywork.",
    footer: "Automation when you can. Custom software when you have to.",
  });
}
