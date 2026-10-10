import type { Metadata } from "next";

import { pageMeta } from "@/lib/seo";

import { ServicePage } from "@/components/service-page";

export const metadata: Metadata = pageMeta({
  title: "GoHighLevel & Custom CRM Development",
  description:
    "GoHighLevel setup and custom CRM development: pipelines, nurture automation and integrations built around how your business actually sells.",
  path: "/services/crm-systems",
});

export default function Page() {
  return <ServicePage slug="crm-systems" />;
}
