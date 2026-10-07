import type { Discipline } from "./projects";

export interface Service {
  slug: string;
  discipline: Discipline;
  index: string;
  name: string;
  headline: string;
  intro: string;
  /** Short list for the homepage capability block. */
  highlights: string[];
  tools: string[];
  offerings: { title: string; body: string }[];
  crossover: { title: string; body: string; href: string; cta: string };
  faq: { q: string; a: string }[];
}

export const services: Service[] = [
  {
    slug: "ai-automation",
    discipline: "automation",
    index: "01",
    name: "AI Automation",
    headline: "Turn repetitive business operations into connected workflows.",
    intro:
      "I design and build automation systems for agencies and service businesses: GoHighLevel workflows, n8n pipelines, and the AI steps, APIs and webhooks that connect them. Each one is built to handle failure and stay understandable after handover.",
    highlights: [
      "GoHighLevel setup, pipelines, calendars, workflows and snapshots",
      "n8n and AI-powered workflow orchestration",
      "Lead qualification, enrichment and routing",
      "AI receptionists and appointment automation",
      "API integrations, webhooks and data synchronization",
    ],
    tools: ["GoHighLevel", "n8n", "OpenAI", "Twilio", "Make.com", "Zapier", "Webhooks", "REST APIs"],
    offerings: [
      {
        title: "CRM automation & pipeline management",
        body: "Multi-stage GoHighLevel pipelines with conditional routing, behaviour-based tagging and scheduled follow-up sequences. Workflows branch on lead source, engagement level and qualification criteria.",
      },
      {
        title: "AI qualification & routing",
        body: "LLM steps that return typed, validated output, not free text, so scoring, prioritisation and assignment can be trusted by the rest of the system.",
      },
      {
        title: "Webhook & API integrations",
        body: "Bidirectional syncs between your CRM and payment processors, scheduling tools and custom databases, with retry logic and logging so nothing is lost to rate limits or network failures.",
      },
      {
        title: "Multi-step orchestration",
        body: "n8n, Make.com and Zapier workflows that run across five or more platforms: capture → enrichment → qualification → CRM entry → notification → follow-up, with no manual hand-offs.",
      },
      {
        title: "AI receptionists & booking",
        body: "Voice and chat agents that answer, qualify and book appointments straight into the calendar, with a clean hand-off to a human when the conversation needs one.",
      },
      {
        title: "Sub-account builds & team training",
        body: "End-to-end GoHighLevel sub-accounts: pipelines, funnels, calendars, custom fields and snapshots, plus documentation and training so your team can run them.",
      },
    ],
    crossover: {
      title: "When GoHighLevel can't, I write the code.",
      body: "Most automation freelancers stop at the edge of the platform. I'm also a full-stack engineer, so a missing feature becomes a custom API, a webhook service or a small app, not a dead end.",
      href: "/services/full-stack-development",
      cta: "Custom software",
    },
    faq: [
      {
        q: "Do you only work in GoHighLevel?",
        a: "No. GoHighLevel and n8n are where I spend most of my time, but I also build in Make.com and Zapier, and I write custom code when a platform runs out of road.",
      },
      {
        q: "Can you fix or extend automations someone else built?",
        a: "Yes. I start by auditing what exists (triggers, failure points and duplicated logic), then decide with you whether to repair, refactor or rebuild.",
      },
      {
        q: "What happens when a step fails?",
        a: "Workflows I build retry transient errors, take fallback paths for missing data and alert a human when something genuinely breaks. Nothing fails silently.",
      },
    ],
  },
  {
    slug: "crm-systems",
    discipline: "automation",
    index: "02",
    name: "CRM Systems",
    headline: "A CRM that matches how your business actually sells.",
    intro:
      "GoHighLevel set up properly, or a custom CRM when your process doesn't fit a template. Pipelines, stages and follow-ups designed around how your deals really move, with the integrations to keep every system in sync.",
    highlights: [
      "GoHighLevel sub-accounts, pipelines, calendars and snapshots",
      "Custom CRMs when an off-the-shelf platform won't fit",
      "Pipeline and stage design around your real sales process",
      "Lead nurture, follow-up tasks and due-date automation",
      "Two-way data sync with forms, calendars and billing",
    ],
    tools: ["GoHighLevel", "n8n", "Next.js", "Laravel", "REST APIs", "Webhooks", "Twilio"],
    offerings: [
      {
        title: "GoHighLevel builds",
        body: "Sub-accounts configured end to end: pipelines, funnels, calendars, custom fields and snapshots, documented so your team can run them.",
      },
      {
        title: "Custom CRMs",
        body: "When your process doesn't fit a template, a CRM built around it. Jackson Properties runs its seller pipeline on one; Teethly's clinics run patient records on another.",
      },
      {
        title: "Pipeline design",
        body: "Stages, priorities and filters that mirror how deals really move, so the team always knows what's due today and what's stuck.",
      },
      {
        title: "Nurture automation",
        body: "Follow-ups, reminders and due actions that fire on their own, so leads don't go cold because someone forgot.",
      },
      {
        title: "Integrations & sync",
        body: "Forms, calendars, payments and external databases connected through webhooks and APIs, with retries and logging.",
      },
      {
        title: "Training & handover",
        body: "Documentation for every pipeline and automation, and training so your team owns the system after launch.",
      },
    ],
    crossover: {
      title: "Built by someone who can write the CRM, not just configure it.",
      body: "If GoHighLevel covers your process, I'll set it up properly. If it doesn't, I can build the missing piece or the whole CRM, on Next.js and Laravel.",
      href: "/services/full-stack-development",
      cta: "Custom software",
    },
    faq: [
      {
        q: "GoHighLevel or a custom CRM?",
        a: "GoHighLevel first, whenever it fits: it's faster and cheaper to run. A custom CRM only makes sense when your process, data or integrations genuinely outgrow it.",
      },
      {
        q: "Can you clean up the CRM we already have?",
        a: "Yes. I audit the pipelines, automations and data first, then decide with you whether to restructure, extend or rebuild.",
      },
      {
        q: "Will my team be able to use it?",
        a: "That's the point. Every build ships with documentation and training, so your team runs it day to day without me.",
      },
    ],
  },
  {
    slug: "full-stack-development",
    discipline: "full-stack",
    index: "03",
    name: "Custom Software",
    headline: "Build the applications and integration layers that automation platforms cannot.",
    intro:
      "Custom CRMs, SaaS products, dashboards and APIs, built in React and Next.js on the front and Node.js, Laravel or Java Spring Boot on the back. 17+ applications shipped to production, including revenue-generating platforms.",
    highlights: [
      "Custom CRMs and SaaS applications",
      "React and Next.js web applications",
      "Node.js, Laravel and Java backends",
      "REST APIs and third-party integrations",
      "Admin dashboards, payments and data systems",
    ],
    tools: ["TypeScript", "React", "Next.js", "Node.js", "Laravel", "Spring Boot", "PostgreSQL", "MySQL", "AWS", "Vercel"],
    offerings: [
      {
        title: "Custom CRMs & SaaS products",
        body: "Multi-tenant applications with role-based access, billing and the domain logic your business actually runs on: clinics, rentals, bookings, memberships.",
      },
      {
        title: "Web applications",
        body: "Fast, accessible React and Next.js front ends with a shared component system, so new features ship without the UI drifting.",
      },
      {
        title: "Backends & APIs",
        body: "REST APIs in Node.js, Laravel or Spring Boot, with clear contracts, authentication (JWT, OAuth, RBAC) and documentation another developer can pick up.",
      },
      {
        title: "Payments & integrations",
        body: "Stripe and PayMongo, geolocation and mapping, third-party catalogs and data feeds, wired in with idempotency and error handling.",
      },
      {
        title: "Admin dashboards & data",
        body: "Operations portals for inventory, scheduling, analytics and content: the back office that turns a product into a business.",
      },
      {
        title: "Cloud & deployment",
        body: "AWS (EC2, RDS, S3, Lambda), Vercel, Azure and VPS environments with CI/CD, plus the maintenance after launch.",
      },
    ],
    crossover: {
      title: "Software that knows it's part of a system.",
      body: "Because I build automation too, the applications I ship come with the webhooks, events and APIs your CRM and workflows need to plug straight in.",
      href: "/services/ai-automation",
      cta: "AI & CRM automation",
    },
    faq: [
      {
        q: "Which stack do you recommend?",
        a: "Usually Next.js and TypeScript on the front, and Node.js or Laravel behind it. I'll match what your team can maintain, and I'll say so when an existing platform is the better call.",
      },
      {
        q: "Can you work inside an existing codebase?",
        a: "Yes. A lot of my work is extending existing products: new modules, integrations, refactors and production support.",
      },
      {
        q: "Do you handle deployment and maintenance?",
        a: "Yes, from first deploy through long-term maintenance, on AWS, Vercel, Azure or your own servers.",
      },
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export const principles = [
  {
    title: "Reliable by design",
    body: "Retries, fallbacks and failure alerts where they matter. Systems degrade gracefully instead of breaking when a third party goes down.",
  },
  {
    title: "Built to evolve",
    body: "Business rules live in configuration, apart from locked-down core processes, so they can change without rewriting the system.",
  },
  {
    title: "Maintainable",
    body: "Documented triggers, inputs and failure points, understandable APIs and clear ownership. Someone else can change it six months from now.",
  },
];

export const process = [
  {
    step: "01",
    title: "Diagnose",
    body: "We walk through the workflow as it runs today: where time goes, where data is re-typed, where leads go cold.",
  },
  {
    step: "02",
    title: "Design",
    body: "I propose the system: which parts the platform handles, which need code, and how failures get caught.",
  },
  {
    step: "03",
    title: "Build",
    body: "Implementation in short, reviewable increments, tested against real data before anything goes live.",
  },
  {
    step: "04",
    title: "Launch",
    body: "Go-live with documentation for every trigger, input and failure point, team training, and support if you want it.",
  },
];

/** How engagements are structured. No prices published; scope is agreed per project. */
export const engagements = [
  {
    title: "Project build",
    body: "A defined system, scoped up front: an automation, a CRM build or an application, delivered and handed over with documentation.",
  },
  {
    title: "Ongoing support",
    body: "Maintenance, monitoring and improvements after launch, for teams that would rather not run the system themselves.",
  },
];

export interface Role {
  period: string;
  company: string;
  title: string;
  points?: string[];
}

export const experience: Role[] = [
  {
    period: "Nov 2025 – Aug 2026",
    company: "SoftlinkIQ",
    title: "Automation Specialist & Developer",
    points: [
      "Developed multiple CRM systems and business applications from requirements through production",
      "Designed and built APIs connecting CRM data with external services",
      "Built end-to-end automations in GoHighLevel, n8n and Make.com for lead capture, follow-ups, notifications and data sync",
      "Provided production support for deployed CRMs, apps and automations",
    ],
  },
  {
    period: "Aug 2025 – Feb 2026",
    company: "Tippler Pty Ltd",
    title: "Frontend Engineer & Mobile Developer",
    points: [
      "Developed a web and mobile CRM in TypeScript, Tailwind CSS and shadcn/ui",
      "Built a library of reusable, accessible UI components that standardised the design system",
      "Integrated multiple third-party APIs into a unified interface",
      "Owned releases, bug fixes and production maintenance",
    ],
  },
  {
    period: "2023 – Present",
    company: "Independent client work",
    title: "Automation Engineer & Full-Stack Developer",
    points: [
      "Automated workflows in GoHighLevel, n8n, Make.com and Zapier for agencies and service businesses, cutting manual tasks by up to 60%",
      "Built AI lead qualification and CRM systems connecting 15+ platforms with retry logic, fallbacks and alerts",
      "Engineered 17+ web applications in React/Next.js, Laravel and Java Spring Boot",
      "Integrated Stripe, PayMongo, geolocation and admin dashboards; deployed on AWS, Vercel, Azure and VPS",
    ],
  },
  {
    period: "Aug 2023 – Dec 2024",
    company: "Private client",
    title: "React Developer (part-time)",
    points: [
      "Built reusable UI components with React, Context API and Redux across three product modules",
      "Implemented role-based authentication, dynamic routing and modular architecture",
    ],
  },
];

export const education = [{ period: "2021 – 2025", title: "BS Information Technology", place: "Cavite State University" }];

export const testimonials = [
  {
    quote:
      "Edishan delivered exceptional work on our web application, especially in 3D customization and payment gateway integration. His technical skills and attention to detail are his assets.",
    name: "Matthew Marcelo",
    org: "Owner, INM Audio",
  },
  {
    quote:
      "His commitment to quality and his ability to deliver beyond expectations made this an easy project. I highly recommend his services.",
    name: "Jeddah Carel",
    org: "Owner & General Manager, JKK Construction Services",
  },
  {
    quote: "He managed to deliver the best solution for better output. Makes my gym operations smoother and more efficient.",
    name: "David",
    org: "Forever Fitness",
  },
];

export const faq = [
  {
    q: "Are you an agency?",
    a: "No. I'm one engineer. You talk to the person designing and building your system, from the first call to the handover.",
  },
  {
    q: "Automation or custom software: which do I need?",
    a: "Often both. I start with the platform you already pay for and only write code where it can't do the job. That keeps the system cheaper to run and easier to own.",
  },
  {
    q: "How do engagements usually start?",
    a: "With a short call about the workflow that's slowing you down. From there I map the current process and propose a system before any build work starts.",
  },
  {
    q: "What time zone do you work in?",
    a: "Philippine Time (UTC+8), which overlaps US mornings and AU/NZ business hours. I work remotely with clients worldwide.",
  },
  {
    q: "What happens after launch?",
    a: "You get documentation for every trigger, input and failure point, and training for your team. I offer ongoing maintenance if you'd rather not run it yourselves.",
  },
];

export const skills = [
  { group: "Automation", items: ["GoHighLevel", "n8n", "Make.com", "Zapier", "OpenAI / LLM workflows", "Twilio", "Webhooks"] },
  { group: "Backend", items: ["Node.js", "Laravel", "Java Spring Boot", "PHP", "PostgreSQL", "MySQL", "REST APIs"] },
  { group: "Frontend", items: ["TypeScript", "React", "Next.js", "Tailwind CSS", "shadcn/ui", "Three.js"] },
  { group: "Infrastructure", items: ["AWS (EC2, RDS, S3, Lambda)", "Vercel", "Azure", "VPS / cPanel", "CI/CD"] },
];
