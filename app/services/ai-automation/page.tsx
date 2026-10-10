import type { Metadata } from "next";

import { pageMeta } from "@/lib/seo";

import { ServicePage } from "@/components/service-page";

export const metadata: Metadata = pageMeta({
  title: "AI Automation with GoHighLevel & n8n",
  description:
    "GoHighLevel and n8n automation: AI receptionists, speed-to-lead, inbox triage, client onboarding and reporting workflows that fail safely.",
  path: "/services/ai-automation",
});

export default function Page() {
  return <ServicePage slug="ai-automation" />;
}
