import type { Metadata } from "next";

import { ServicePage } from "@/components/service-page";

export const metadata: Metadata = {
  title: "CRM Systems",
  description:
    "GoHighLevel builds, custom CRMs, pipeline design, nurture automation and integrations, built around how your business actually sells.",
  alternates: { canonical: "/services/crm-systems" },
};

export default function Page() {
  return <ServicePage slug="crm-systems" />;
}
