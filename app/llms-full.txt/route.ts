import { services } from "@/lib/content";
import { caseStudies } from "@/lib/projects";
import { site } from "@/lib/site";
import { workflowPages } from "@/lib/workflow-details";

export const dynamic = "force-static";

const abs = (path: string) => new URL(path, site.url).toString();
const faq = (items: readonly { q: string; a: string }[]) => items.map((f) => `**${f.q}**\n${f.a}`).join("\n\n");

/**
 * llms-full.txt: the full text of the service, project and workflow pages in one
 * plain-text file, so AI assistants can read everything without crawling each page.
 */
export function GET() {
  const servicesText = services
    .map(
      (s) => `## ${s.name}

URL: ${abs(`/services/${s.slug}`)}

${s.headline} ${s.intro}

${s.offerings.map((o) => `### ${o.title}\n\n${o.body}`).join("\n\n")}

Tools: ${s.tools.join(", ")}

### Questions

${faq(s.faq)}`,
    )
    .join("\n\n---\n\n");

  const projectsText = caseStudies
    .map((p) => {
      const cs = p.caseStudy!;
      return `## ${p.title}

URL: ${abs(`/work/${p.slug}`)}${p.liveUrl ? `\nLive site: ${p.liveUrl}` : ""}
Client: ${p.client}${p.year ? ` · ${p.year}` : ""}
Stack: ${p.stack.join(", ")}

${p.summary}
${cs.metrics.length ? `\nResults:\n${cs.metrics.map((m) => `- ${m.value} ${m.label}`).join("\n")}\n` : ""}
### The problem

${cs.problem.join("\n\n")}

### Outcome

${cs.outcome.join("\n\n")}`;
    })
    .join("\n\n---\n\n");

  const workflowsText = workflowPages
    .map(
      (w) => `## ${w.h1}

URL: ${abs(`/automations/${w.slug}`)}
Built in: ${w.category} · For: ${w.forWho} · Updated: ${w.updated ?? w.published}

${w.definition}

### The problem

${w.problem}

### How it works

${w.stages.map((st, i) => `${i + 1}. **${st.title}.** ${st.body}`).join("\n")}

### Safeguards

${w.safeguards.map((g) => `- ${g}`).join("\n")}

Outcome: ${w.outcome}
Stack: ${w.tools.join(", ")}

### Questions

${faq(w.faq)}`,
    )
    .join("\n\n---\n\n");

  const body = `# ${site.name}: full site text

> ${site.role}. ${site.description}

Based in ${site.location}, working remotely worldwide (${site.timezone}).
Contact: ${site.email} · Book a call: ${site.calendar} · Overview: ${abs("/llms.txt")}

# Services

${servicesText}

# Featured projects (live in production)

${projectsText}

# Automation workflows

${workflowsText}
`;
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
