import type { Metadata } from "next";

import { ServicePage } from "@/components/service-page";

export const metadata: Metadata = {
  title: "AI & CRM Automation",
  description:
    "GoHighLevel setup and workflows, n8n orchestration, AI lead qualification and routing, AI receptionists, and API and webhook integrations, built to fail safely and stay maintainable.",
  alternates: { canonical: "/services/ai-automation" },
};

export default function Page() {
  return <ServicePage slug="ai-automation" />;
}
