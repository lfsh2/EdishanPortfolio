export const site = {
  name: "Edishan Lee Tenorio",
  shortName: "Edishan",
  wordmark: "EDISHAN.",
  role: "Automation Engineer & Full-Stack Developer",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://edishan-portfolio.vercel.app",
  description:
    "Independent engineer building AI automation, CRM systems and custom software for agencies and growing businesses. GoHighLevel, n8n, OpenAI, Next.js, Laravel.",
  email: "edishanleetenorio03@gmail.com",
  calendar: "https://calendar.app.google/tsPLERd6vJ4yJGgL9",
  phone: "+63 929 950 3384",
  phoneHref: "tel:+639299503384",
  location: "Naic, Cavite, Philippines",
  timezone: "PHT (UTC+8), overlapping US mornings and AU/NZ business hours",
  resume: "/Tenorio_EdishanLee_Resume.pdf",
  socials: {
    github: "https://github.com/lfsh2",
    linkedin: "https://www.linkedin.com/in/edishan-lee-tenorio-0b3225171/",
  },
} as const;

export const nav = [
  { href: "/work", label: "Work" },
  {
    label: "Services",
    children: [
      {
        href: "/services/ai-automation",
        label: "AI & CRM Automation",
        hint: "GoHighLevel, n8n, AI workflows",
      },
      {
        href: "/services/full-stack-development",
        label: "Full-Stack Engineering",
        hint: "Custom apps, APIs, integrations",
      },
    ],
  },
  { href: "/about", label: "About" },
] as const;

/** Figures carried over from the current portfolio. All come from shipped client work. */
export const proof = [
  { value: "17+", label: "Applications shipped to production" },
  { value: "200+", label: "Leads / week in featured automation" },
  { value: "15+", label: "Platforms connected via API & webhook" },
  { value: "<5 min", label: "Lead response, down from 4–6 hours" },
] as const;

/**
 * The homepage is laid out as a pipeline: each section is a step of a workflow,
 * mirrored by the scroll rail on the left edge.
 */
export const pipeline = [
  { id: "intro", step: "01", node: "trigger", label: "Intro" },
  { id: "services", step: "02", node: "qualify", label: "Capabilities" },
  { id: "work", step: "03", node: "route", label: "Live work" },
  { id: "platform", step: "04", node: "sync", label: "Platform + code" },
  { id: "trust", step: "05", node: "verify", label: "Track record" },
  { id: "contact", step: "06", node: "act", label: "Contact" },
] as const;

export const stepLabel = (id: (typeof pipeline)[number]["id"]) => {
  const s = pipeline.find((p) => p.id === id)!;
  return `${s.step} · ${s.node}`;
};
