export const site = {
  name: "Edishan Lee Tenorio",
  shortName: "Edishan",
  wordmark: "EDISHAN.",
  role: "AI Automation Specialist & CRM Developer",
  /** Secondary titles shown under the role in the sidebar. */
  titles: ["Software Engineer", "Full-Stack Developer", "Mobile Developer"],
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://edishan-portfolio.vercel.app",
  description:
    "Edishan Lee Tenorio builds GoHighLevel, n8n and AI automations that capture, qualify and book leads, plus custom software when platforms fall short.",
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

/** Figures carried over from shipped client work. Project-specific numbers say which project. */
export const proof = [
  { value: "17+", label: "Production applications" },
  { value: "200+", label: "Leads a week · AI Lead Engine" },
  { value: "<5 min", label: "Lead response · AI Lead Engine" },
  { value: "15+", label: "Platform integrations" },
] as const;
