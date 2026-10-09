import type { Metadata } from "next";

import { ContactCTA } from "@/components/contact-cta";
import { Mark } from "@/components/ui/mark";
import { WorkIndex } from "@/components/work-index";
import { WorkflowLibrary } from "@/components/workflows";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Live client systems: AI lead qualification, CRM automation, a dental marketplace and clinic OS, a rental and delivery platform, and more.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <header className="relative">
        <div aria-hidden className="paper-grid pointer-events-none absolute inset-x-0 top-0 h-[30rem]" />
        <div className="shell relative grid gap-8 pb-12 pt-12 md:pb-16 md:pt-20 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-8">
            <p className="label flex items-center gap-3 text-faint">
              <span className="inline-flex items-center gap-2 text-fg">
                <span aria-hidden className="size-1.5 rounded-full bg-lime ring-2 ring-lime/30" />
                Index
              </span>
              <span aria-hidden className="h-px w-6 bg-line" />
              {projects.length} projects · 2023–2026
            </p>
            <h1 className="mt-9 text-display text-fg">
              Automations and applications, <Mark onLoad>live in production.</Mark>
            </h1>
          </div>
          <p className="text-[1.0625rem] leading-relaxed text-muted lg:col-span-4 lg:pb-2">
            Systems running for real clients, from n8n pipelines to multi-tenant platforms. Featured builds are broken down end to end.
          </p>
        </div>
      </header>

      <section aria-label="Projects" className="shell pb-24 md:pb-32">
        <WorkIndex />
      </section>

      <WorkflowLibrary />

      <ContactCTA />
    </>
  );
}
