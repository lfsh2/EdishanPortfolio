import type { Metadata } from "next";

import { ServicePage } from "@/components/service-page";

export const metadata: Metadata = {
  title: "Full-Stack Engineering",
  description:
    "Custom CRMs, SaaS products, React and Next.js applications, Node.js, Laravel and Spring Boot backends, REST APIs, payments and admin dashboards.",
  alternates: { canonical: "/services/full-stack-development" },
};

export default function Page() {
  return <ServicePage slug="full-stack-development" />;
}
