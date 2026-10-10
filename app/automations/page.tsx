import type { Metadata } from "next";

import { ContactCTA } from "@/components/contact-cta";
import { JsonLd } from "@/components/json-ld";
import { Mark } from "@/components/ui/mark";
import { WorkflowLibrary } from "@/components/workflows";
import { breadcrumbs, graph, itemList } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { workflowPages } from "@/lib/workflow-details";

export const metadata: Metadata = pageMeta({
  title: "Automation Workflows: GoHighLevel & n8n",
  description:
    "Six production n8n and GoHighLevel workflows: AI receptionist, speed-to-lead, AI inbox triage, client onboarding, KPI reporting and review generation.",
  path: "/automations",
});

export default function AutomationsPage() {
  return (
    <>
      <JsonLd
        data={graph(
          itemList(workflowPages.map((w) => ({ name: w.title, path: `/automations/${w.slug}` }))),
          breadcrumbs([
            { name: "Home", path: "/" },
            { name: "Automations", path: "/automations" },
          ]),
        )}
      />
      <header className="relative">
        <div aria-hidden className="paper-grid pointer-events-none absolute inset-x-0 top-0 h-[30rem]" />
        <div className="shell relative grid gap-8 pb-12 pt-12 md:pb-16 md:pt-20 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-8">
            <p className="label flex items-center gap-3 text-faint">
              <span className="inline-flex items-center gap-2 text-fg">
                <span aria-hidden className="size-1.5 rounded-full bg-lime ring-2 ring-lime/30" />
                Automations
              </span>
              <span aria-hidden className="h-px w-6 bg-line" />
              {workflowPages.length} workflows · n8n + GoHighLevel
            </p>
            <h1 className="mt-9 text-display text-fg">
              Automation workflows, <Mark onLoad>built end to end.</Mark>
            </h1>
          </div>
          <p className="text-[1.0625rem] leading-relaxed text-muted lg:col-span-4 lg:pb-2">
            The automations agencies and local service businesses ask for most. Each one links to a full breakdown of how it works.
          </p>
        </div>
      </header>
      <WorkflowLibrary id="library" header={false} />
      <ContactCTA />
    </>
  );
}
