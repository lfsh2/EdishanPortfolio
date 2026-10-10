import { services } from "@/lib/content";
import { caseStudies, projects } from "@/lib/projects";
import { site } from "@/lib/site";
import { workflows } from "@/lib/workflows";

export const dynamic = "force-static";

const abs = (path: string) => new URL(path, site.url).toString();

/**
 * llms.txt (llmstxt.org): a plain-text map of the site for AI assistants and answer
 * engines. Generated from the same data as the pages, so it never drifts out of date.
 */
export function GET() {
  const live = projects.filter((p) => !p.caseStudy && p.live && p.liveUrl);
  const body = `# ${site.name}

> ${site.role}. ${site.description}

${site.name} is an independent engineer based in ${site.location}, working remotely with agencies and growing businesses worldwide (${site.timezone}). He configures platforms like GoHighLevel and n8n, and when a requirement falls outside them, engineers the custom API, database or app that fills the gap.

## Services

${services.map((s) => `- [${s.name}](${abs(`/services/${s.slug}`)}): ${s.headline}`).join("\n")}

## Featured projects (live in production)

${caseStudies.map((p) => `- [${p.title}](${abs(`/work/${p.slug}`)}): ${p.summary}`).join("\n")}

## Other live work

${live.map((p) => `- [${p.title}](${p.liveUrl}): ${p.summary}`).join("\n")}

## Automation workflows

Built in n8n and GoHighLevel. Overview: ${abs("/automations")}

${workflows.map((w) => `- [${w.title}](${abs(`/automations/${w.slug}`)}) (${w.tools.join(", ")}): ${w.pitch}`).join("\n")}

## Contact

- Email: ${site.email}
- Book a strategy call: ${site.calendar}
- LinkedIn: ${site.socials.linkedin}
- GitHub: ${site.socials.github}
- Résumé: ${abs(site.resume)}
`;
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
