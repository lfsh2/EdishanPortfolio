import type { Metadata } from "next";

import { pageMeta } from "@/lib/seo";

import { ServicePage } from "@/components/service-page";

export const metadata: Metadata = pageMeta({
  title: "Custom Software & Full-Stack Development",
  description:
    "Custom CRMs, SaaS products, React and Next.js apps, Node.js, Laravel and Spring Boot backends, REST APIs, payments and admin dashboards.",
  path: "/services/full-stack-development",
});

export default function Page() {
  return <ServicePage slug="full-stack-development" />;
}
