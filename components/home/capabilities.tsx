import { Mark } from "@/components/ui/mark";
import { SectionHeader } from "@/components/ui/section-header";
import { revealDelay } from "@/lib/utils";

type Cover = "automation" | "engineering";

/** A cross-section of a business system, top to bottom, and which discipline covers each layer. */
const layers: { name: string; builds: string; tools: string; cover: Cover[] }[] = [
  {
    name: "Interface",
    builds: "Web apps, client portals and admin dashboards",
    tools: "React · Next.js · Tailwind",
    cover: ["engineering"],
  },
  {
    name: "Workflow & AI",
    builds: "n8n pipelines, AI qualification and routing, AI receptionists",
    tools: "n8n · OpenAI · Twilio · Make",
    cover: ["automation"],
  },
  {
    name: "CRM",
    builds: "GoHighLevel pipelines, calendars and snapshots, or a custom CRM when GHL won't fit",
    tools: "GoHighLevel · custom CRMs",
    cover: ["automation", "engineering"],
  },
  {
    name: "Integrations",
    builds: "Webhooks, REST APIs, payments and two-way data sync",
    tools: "Webhooks · REST · Stripe · PayMongo",
    cover: ["automation", "engineering"],
  },
  {
    name: "Backend & data",
    builds: "Business logic, auth and databases",
    tools: "Node.js · Laravel · Spring Boot · PostgreSQL",
    cover: ["engineering"],
  },
  {
    name: "Infrastructure",
    builds: "Deployment, CI/CD and production support",
    tools: "AWS · Vercel · Azure · VPS",
    cover: ["engineering"],
  },
];

const coverLabel: Record<Cover, string> = { automation: "Automation", engineering: "Engineering" };

export function Capabilities() {
  return (
    <section id="layers" aria-labelledby="services-title" className="shell pb-20 md:pb-28">
      <SectionHeader
        label="Capabilities"
        id="services-title"
        title={
          <>
            Every layer of the system. <Mark>One engineer.</Mark>
          </>
        }
        intro="Automation specialists usually stop at the platform. Developers usually never touch the CRM. I work across the whole stack, so nothing gets lost between the workflow and the software underneath it."
      />

      <div className="mt-14 md:mt-20">
        <div aria-hidden className="label hidden grid-cols-12 gap-6 border-b border-fg/80 pb-3 text-faint md:grid">
          <span className="col-span-3">Layer</span>
          <span className="col-span-4">What I build there</span>
          <span className="col-span-3">Tools</span>
          <span className="col-span-2 text-right">Covered by</span>
        </div>
        <ol>
          {layers.map((layer, i) => (
            <li
              key={layer.name}
              data-reveal
              style={revealDelay(i * 60)}
              className="group relative grid gap-2 border-b border-line py-5 transition-colors duration-300 hover:bg-surface md:grid-cols-12 md:items-center md:gap-6 md:px-0"
            >
              {/* Discipline bar on the left edge: lime = automation, ink = engineering. */}
              <span aria-hidden className="absolute -left-4 bottom-3 top-3 hidden w-1 flex-col gap-0.5 md:flex">
                {layer.cover.map((c) => (
                  <span key={c} className={`flex-1 rounded-full ${c === "automation" ? "bg-lime" : "bg-fg"}`} />
                ))}
              </span>
              <p className="flex items-baseline gap-3 md:col-span-3">
                <span className="label text-faint">L{i + 1}</span>
                <span className="text-xl tracking-[-0.02em] text-fg">{layer.name}</span>
              </p>
              <p className="text-muted md:col-span-4">{layer.builds}</p>
              <p className="font-mono text-[0.75rem] text-faint md:col-span-3">{layer.tools}</p>
              <p className="flex gap-1.5 md:col-span-2 md:justify-end">
                {layer.cover.map((c) => (
                  <span
                    key={c}
                    className={`label rounded-[4px] px-1.5 py-0.5 ${c === "automation" ? "bg-lime text-on-lime" : "bg-fg text-canvas"}`}
                  >
                    {coverLabel[c]}
                  </span>
                ))}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
