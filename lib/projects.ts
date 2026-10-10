import type { StaticImageData } from "next/image";

import aiCanvasRouting from "@/assets/work/ai-lead-qualification/canvas-routing.png";
import aiCanvasEnrichment from "@/assets/work/ai-lead-qualification/canvas-enrichment.png";
import aiForm from "@/assets/work/ai-lead-qualification/automation1.png";
import jacksonCrm from "@/assets/work/jackson/crm-pipeline.png";
import jacksonIntake from "@/assets/work/jackson/intake-form.png";
import jacksonSite from "@/assets/work/jackson/site-hero.png";
import teethlyCover from "@/assets/work/teethly/cover.jpg";
import teethlyClinicHero from "@/assets/work/teethly/2-clinic-hero.png";
import teethlyChannels from "@/assets/work/teethly/3-patient-channels.png";
import teethlyClinicOs from "@/assets/work/teethly/4-clinic-os.png";
import teethlyPricing from "@/assets/work/teethly/5-pricing.png";
import teethlyComparison from "@/assets/work/teethly/6-comparison.png";
import meepleHome from "@/assets/work/meeplecrate/1.png";
import meepleCredits from "@/assets/work/meeplecrate/5.png";
import meepleVoting from "@/assets/work/meeplecrate/9.png";
import meepleDashboard from "@/assets/work/meeplecrate/10.png";
import meepleLocations from "@/assets/work/meeplecrate/12.png";
import meepleGames from "@/assets/work/meeplecrate/15.png";
import meepleInventory from "@/assets/work/meeplecrate/16.png";
import meepleLedger from "@/assets/work/meeplecrate/18.png";
import meepleGameDetail from "@/assets/work/meeplecrate/v21.png";
import vantrippersCover from "@/assets/work/vantrippers/cover.png";
import cozyCover from "@/assets/work/cozy-crave/cover.png";
import echoCover from "@/assets/work/echo/cover.png";
import inmCover from "@/assets/work/inm/cover.png";
import gymCover from "@/assets/work/gym/cover.png";
import jkkCover from "@/assets/work/jkk/cover.png";
import hoaCover from "@/assets/work/hoa/cover.png";

export type Discipline = "automation" | "full-stack";

export const disciplineLabel: Record<Discipline, string> = {
  automation: "Automation & CRM",
  "full-stack": "Custom Software",
};

export interface Shot {
  src: StaticImageData;
  alt: string;
  caption?: string;
}

export interface Metric {
  value: string;
  label: string;
}

/** One stage of a system diagram. Stages render left→right (desktop) / top→bottom (mobile). */
export interface Stage {
  label: string;
  title: string;
  nodes: string[];
}

export interface CaseStudy {
  kind: string;
  headline: string;
  metrics: Metric[];
  problem: string[];
  role: { title: string; scope: string[] };
  architecture: { intro: string; stages: Stage[]; crossCutting?: string[] };
  implementation: { title: string; body: string }[];
  outcome: string[];
  gallery: Shot[];
}

/** A numbered callout on a screenshot; x/y are percentages of the image box. */
export interface Note {
  x: number;
  y: number;
  label: string;
}

/** Short, outcome-led copy for the homepage flagship cards. */
export interface Pitch {
  eyebrow: string;
  headline: string;
  sub: string;
  features: string[];
  stack: string[];
}

export interface Project {
  slug: string;
  title: string;
  shortTitle: string;
  client: string;
  /** Leave empty when unknown rather than guessing; the UI hides it. */
  year: string;
  disciplines: Discipline[];
  /** Deployed and in use by the client. */
  live?: boolean;
  summary: string;
  stack: string[];
  cover: Shot;
  liveUrl?: string;
  /** Search title (site name appended) and meta description, kept within SERP limits. */
  seo?: { title: string; description: string };
  /** Homepage flagship card copy (flagship projects only). */
  pitch?: Pitch;
  /** Callouts drawn on the cover screenshot. */
  notes?: Note[];
  /** Headline result for the Work index. */
  result?: string;
  /** Only featured projects get a dedicated route at /work/[slug]. */
  caseStudy?: CaseStudy;
  /** Where an archive entry links when it has no page of its own. */
  href?: string;
}

export const projects: Project[] = [
  {
    slug: "ai-lead-qualification",
    title: "AI Lead Qualification & CRM Automation",
    shortTitle: "AI Lead Qualification",
    seo: {
      title: "AI Lead Qualification Automation (n8n)",
      description:
        "n8n + OpenAI lead qualification: 200+ leads a week scored, routed and synced to the CRM, cutting first response from 4–6 hours to under 5 minutes.",
    },
    client: "Service business (name withheld)",
    year: "2026",
    disciplines: ["automation"],
    live: true,
    summary:
      "200+ inbound leads a week, qualified by AI, routed by priority and synced to the CRM. Manual review dropped from 20 hours a week to 3, and first response from 4–6 hours to under 5 minutes.",
    stack: ["n8n", "OpenAI", "GoHighLevel", "Webhooks", "Gmail", "Google Calendar", "Google Sheets"],
    pitch: {
      eyebrow: "AI Lead Engine",
      headline: "Turn 200+ leads a week into a system that never sleeps.",
      sub: "AI Lead Qualification & CRM Automation",
      features: ["200+ leads/week", "20 hrs → 3 hrs manual review", "4–6 hrs → <5 min response"],
      stack: ["n8n", "OpenAI", "GoHighLevel", "APIs"],
    },
    notes: [
      { x: 6, y: 50, label: "Webhook intake from web forms" },
      { x: 25, y: 50, label: "AI agent returns typed score + priority" },
      { x: 38, y: 55, label: "Router splits high / medium / low" },
      { x: 79, y: 50, label: "Single CRM upsert, then analytics log" },
    ],
    cover: {
      src: aiCanvasRouting,
      alt: "n8n workflow canvas: a lead webhook feeds an AI qualification agent, a priority router splits into high, medium and low branches, and all branches converge on a CRM upsert and an analytics log.",
    },
    result: "Lead response cut from 4–6 hours to under 5 minutes",
    caseStudy: {
      kind: "Flagship automation",
      headline: "Every lead qualified, routed and answered before anyone opens the CRM.",
      metrics: [
        { value: "200+", label: "Inbound leads processed per week" },
        { value: "20 → 3", label: "Hours of manual review per week" },
        { value: "<5 min", label: "First response, down from 4–6 hours" },
      ],
      problem: [
        "A service business was manually reviewing 200+ inbound leads every week. Initial qualification alone took three to four hours a day.",
        "Each lead was typed into three separate systems (the CRM, the scheduling tool and the email platform), then routed to a sales rep by hand. Response times stretched to four to six hours, and data entry errors crept in at every hop.",
      ],
      role: {
        title: "Automation engineer, design through deployment",
        scope: [
          "Mapped the existing intake and qualification process",
          "Designed the workflow architecture and routing rules",
          "Built the AI qualification step with a typed output schema",
          "Integrated CRM, calendar, email and reporting",
          "Added logging and failure alerts for every run",
        ],
      },
      architecture: {
        intro:
          "A single n8n workflow replaces the manual chain. Business rules live in one configuration node, so thresholds and routing can change without touching the pipeline.",
        stages: [
          {
            label: "01 Intake",
            title: "Lead data webhook",
            nodes: ["Web forms (POST)", "Workflow configuration", "Contact enrichment APIs"],
          },
          {
            label: "02 Qualify",
            title: "AI qualification agent",
            nodes: ["OpenAI chat model", "Structured output parser", "Score + priority"],
          },
          { label: "03 Route", title: "Route by priority", nodes: ["High", "Medium", "Low"] },
          {
            label: "04 Act",
            title: "Per-priority follow-up",
            nodes: ["Calendar event (high)", "Tailored email sequence", "Rep assignment"],
          },
          {
            label: "05 Record",
            title: "CRM sync & logging",
            nodes: ["Create / update contact", "Analytics sheet log", "Failure notifications"],
          },
        ],
      },
      implementation: [
        {
          title: "Rules as configuration, not buried logic",
          body: "Scoring thresholds, territories and routing rules sit in a dedicated configuration node at the top of the workflow. The business can retune qualification without anyone editing the pipeline itself.",
        },
        {
          title: "Typed AI output the router can trust",
          body: "The qualification agent returns a structured object (score, priority, reasoning) validated by an output parser. Downstream nodes branch on fields, never on free text.",
        },
        {
          title: "Three paths, one write",
          body: "High, medium and low priority leads each get their own payload and follow-up. High-priority leads get a calendar event created automatically. All three paths converge on a single create-or-update contact step, so the CRM never sees duplicates.",
        },
        {
          title: "Observable by default",
          body: "Every run is appended to an analytics sheet, and failed steps raise a notification instead of failing silently. The team can see what happened to any lead, and when.",
        },
      ],
      outcome: [
        "Manual lead review reduced from 20 hours a week to 3",
        "Lead response time improved from 4–6 hours to under 5 minutes",
        "Data entry errors across systems eliminated through automated syncing",
        "Sales team freed to focus on high-value conversations instead of admin",
      ],
      gallery: [
        {
          src: aiCanvasRouting,
          alt: "n8n canvas of the lead qualification and routing workflow.",
          caption:
            "Production canvas: webhook intake → AI qualification → priority routing → CRM upsert, email, calendar and analytics log.",
        },
        {
          src: aiCanvasEnrichment,
          alt: "n8n canvas of a lead enrichment and call-booking workflow.",
          caption:
            "Related build: form intake → raw-data store → company enrichment → AI qualifier with schema → score check → calendar slots → call invitation.",
        },
        {
          src: aiForm,
          alt: "An n8n-hosted 'Request a demo' form with name, work email, company, job title, company size, challenges and timeline fields.",
          caption: "Intake form feeding the enrichment pipeline. Every field maps to a qualification signal.",
        },
      ],
    },
  },
  {
    slug: "jackson-properties",
    title: "Jackson Properties: Seller Acquisition Site & Built-in CRM",
    shortTitle: "Jackson Properties",
    seo: {
      title: "Jackson Properties: Real Estate CRM",
      description:
        "Live real estate seller-acquisition site and built-in CRM in Next.js and Laravel: lead capture, nurture automation and a 7-stage deal pipeline.",
    },
    client: "Jackson Investment Group",
    year: "2026",
    disciplines: ["full-stack", "automation"],
    live: true,
    summary:
      "A direct-purchase real estate platform for the Austin metro: a public site that turns wary homeowners into structured seller leads, and a built-in CRM where the team nurtures every lead and tracks each deal from first contact to closing.",
    stack: ["Next.js", "Laravel", "REST API", "Workflow automation", "Microsoft Clarity"],
    liveUrl: "https://jacksonproperties.us/",
    pitch: {
      eyebrow: "Jackson Properties",
      headline: "From a homeowner's first click to a signed contract.",
      sub: "Seller acquisition site + built-in CRM",
      features: ["Lead capture", "Nurture automation", "7-stage deal pipeline", "Offers & contracts"],
      stack: ["Next.js", "Laravel", "REST API"],
    },
    notes: [
      { x: 33.5, y: 14.5, label: "Pipeline health: totals, new this week, under contract, due today" },
      { x: 47.5, y: 31.4, label: "Seven stages, from new lead to closed or dead" },
      { x: 37, y: 56, label: "Drag-and-drop kanban to move deals between stages" },
      { x: 9.5, y: 66, label: "Leads segmented by source and quality" },
      { x: 88.5, y: 43.4, label: "Priority sort by lead quality and contact signals" },
    ],
    cover: {
      src: jacksonCrm,
      alt: "Jackson Properties CRM: pipeline summary cards, stage filters, and a kanban board with New, Contacted, Appointment set, Offer made, Under contract and Closed columns. Lead details are blurred for privacy.",
    },
    result: "Lead capture, nurture and deal pipeline in one system",
    caseStudy: {
      kind: "Full-stack product + automation",
      headline: "From a homeowner's first click to a signed contract, in one system.",
      metrics: [
        { value: "4 steps", label: "Seller intake, about 90 seconds" },
        { value: "7", label: "Pipeline stages, new lead to closed" },
        { value: "1", label: "System for capture, nurture and closing" },
      ],
      problem: [
        "A direct-purchase team wins deals on speed and trust. Sellers in a hurry don't wait, so every lead has to be answered fast, followed up consistently, and tracked until the house either closes or the lead goes cold.",
        'Leads arrive from different places: homeowners who find the website, and property lists the team researches itself. Generic CRMs model sales pipelines, not property deals. And the "we buy houses" category has earned homeowners\' distrust, so the public site had to win a form submission from people who are wary by default.',
      ],
      role: {
        title: "Full-stack engineer, public site, CRM and automation",
        scope: [
          "Seller-facing site and multi-step intake form",
          "Laravel backend and lead data model",
          "Internal CRM: pipeline, kanban and filters",
          "Lead nurture and follow-up automation",
          "Deployment and production support",
        ],
      },
      architecture: {
        intro:
          "A Next.js front end serves both sides: the public acquisition site and the authenticated CRM. One Laravel API owns the lead record, so a seller's form submission and a researched list entry become the same kind of deal.",
        stages: [
          {
            label: "01 Attract",
            title: "Seller site",
            nodes: ["Trust-first landing page", "Service areas and FAQs", "Behaviour analytics"],
          },
          {
            label: "02 Capture",
            title: "Property file intake",
            nodes: ["4-step form, ~90 seconds", "Live seller-record preview", "Lead created via API"],
          },
          {
            label: "03 Nurture",
            title: "Built-in automation",
            nodes: ["Lead ID + source tagging", "Follow-ups and due actions", "Priority by quality + contact"],
          },
          { label: "04 Close", title: "CRM pipeline", nodes: ["7-stage kanban", "Offers and contracts tracked", "Archive and CSV export"] },
        ],
        crossCutting: ["Next.js front end", "Laravel REST API", "Authenticated admin", "Form input hidden from analytics"],
      },
      implementation: [
        {
          title: "A form that feels like opening a file",
          body: 'Instead of a generic contact form, sellers open a "property file": four short steps that start with just the street address. A seller-intake record fills in beside the form as they type, so they can see exactly what they\'re sharing.',
        },
        {
          title: "One lead model, every source",
          body: "Website inquiries and researched property lists land in the same Laravel-backed lead record, each with a market-coded ID (AUS-2026-…) and a source tag, so the team can filter direct inquiries, scraped lists and high-quality leads.",
        },
        {
          title: "A pipeline built around how deals move",
          body: "Seven stages from New to Closed or Dead, as a drag-and-drop kanban or a board view. Quick filters surface what's due today, what's mine and what's under contract, and search is one keystroke away.",
        },
        {
          title: "Nurture that doesn't depend on memory",
          body: "Built-in automation tracks follow-ups and due actions and ranks leads by quality and contact signals, so the next call is always the right one.",
        },
        {
          title: "Privacy designed into the funnel",
          body: "What sellers type into the property form is masked from session analytics, and the site tells them plainly that their details are never sold or shared with other buyers.",
        },
      ],
      outcome: [
        "Live at jacksonproperties.us, serving Travis, Williamson and Hays counties",
        "Seller acquisition and deal management run in one system the team owns",
        "Every lead visible in a single pipeline, from intake to closing",
        "Follow-ups and due actions surfaced automatically instead of tracked by hand",
      ],
      gallery: [
        {
          src: jacksonCrm,
          alt: "Jackson Properties CRM pipeline with lead details blurred.",
          caption: "Built-in CRM. Lead details are blurred to protect the client's sellers.",
        },
        {
          src: jacksonSite,
          alt: "Jackson Properties homepage: 'Sell your Austin house as-is, on your timeline, with a number you can check.'",
          caption: "Seller site: a trust-first pitch to wary homeowners.",
        },
        {
          src: jacksonIntake,
          alt: "Four-step 'Open a property file' form beside a live seller intake record.",
          caption: "Property file intake: four steps, with a live record of what the seller is sharing.",
        },
      ],
    },
  },
  {
    slug: "teethly",
    title: "Teethly: Dental Marketplace & Clinic Platform",
    shortTitle: "Teethly",
    seo: {
      title: "Teethly: Dental Marketplace & Clinic OS",
      description:
        "Teethly.ph: a live dental marketplace plus clinic OS for scheduling, patient records, billing and revenue, built in Next.js and TypeScript.",
    },
    client: "Teethly.ph",
    year: "2026",
    disciplines: ["full-stack"],
    live: true,
    summary:
      "A two-sided platform for the Philippines: a patient marketplace for finding verified dentists, and a clinic operating system for scheduling, records, billing and revenue, plus iOS and Android apps.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Vercel"],
    liveUrl: "https://www.teethly.ph/",
    pitch: {
      eyebrow: "Teethly",
      headline: "From fragmented clinic tools to one operating system.",
      sub: "Marketplace + clinic operating platform",
      features: ["Scheduling", "Patient records", "Billing", "Revenue intelligence", "Automated reminders"],
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    },
    notes: [
      { x: 19.5, y: 33.5, label: "Scheduling with SMS reminders" },
      { x: 43, y: 33.5, label: "Patient CRM with odontogram" },
      { x: 66.5, y: 33.5, label: "E-prescription PDF generation" },
      { x: 43, y: 61.5, label: "Revenue analytics in pesos" },
    ],
    cover: {
      src: teethlyClinicOs,
      alt: "Teethly's clinic operating system page showing smart scheduling, patient records, e-prescriptions, billing, revenue intelligence and automated reviews.",
    },
    result: "Replaces four clinic tools with one system",
    caseStudy: {
      kind: "Flagship full-stack product",
      headline: "One platform for patients finding care and clinics running on it.",
      metrics: [
        { value: "4 → 1", label: "Clinic tools replaced by one system" },
        { value: "3", label: "Patient channels: chat, video call, booking" },
        { value: "4", label: "Surfaces from one codebase and design system" },
      ],
      problem: [
        "Patients in the Philippines had no reliable way to find a verified dentist nearby, compare options and get in touch without phone tag.",
        "Clinics, meanwhile, ran on legacy desktop software with no online presence and no online booking. They lost hours to manual scheduling, no-shows and paper records, and had no channel for attracting new patients.",
      ],
      role: {
        title: "Full-stack product engineering",
        scope: [
          "Marketing site and patient web app",
          "Clinic dashboard and operating system",
          "Pricing and lead-fee business logic",
          "Shared component library and design system",
          "Deployment and production on Vercel",
        ],
      },
      architecture: {
        intro:
          "Two products share one codebase: a public marketplace that generates patient demand, and a clinic OS that turns that demand into booked, billed appointments.",
        stages: [
          {
            label: "01 Discover",
            title: "Patient marketplace",
            nodes: ["Search by location & service", "PRC-verified profiles", "Real reviews"],
          },
          { label: "02 Connect", title: "Three channels", nodes: ["Chat", "Video call", "Booking"] },
          {
            label: "03 Operate",
            title: "Clinic OS",
            nodes: ["Scheduling + SMS reminders", "Patient CRM + odontogram", "Immutable clinical notes"],
          },
          {
            label: "04 Grow",
            title: "Revenue & retention",
            nodes: ["E-prescription PDFs", "Billing in pesos", "Automated review requests"],
          },
        ],
        crossCutting: ["Role-based staff access", "Per-clinic data isolation", "Encrypted records", "RA 10173 compliance"],
      },
      implementation: [
        {
          title: "Two-sided by design",
          body: "Patients search by location and service (toothache, cleaning, braces, whitening, kids, wisdom tooth) and reach a clinic by chat, video call or booking, free of charge. Every clinic in the OS gets a public profile in the marketplace.",
        },
        {
          title: "A clinic OS that removes double work",
          body: "Smart scheduling with SMS reminders and double-booking prevention; a patient CRM with an interactive odontogram and immutable clinical notes; e-prescription PDF generation; billing and revenue tracking in pesos; role-based staff access.",
        },
        {
          title: "The business model, in code",
          body: "A free clinic tier, a Pro tier with a 30-day no-card trial, and a pay-per-new-patient fee that only charges when the platform actually delivers a lead.",
        },
        {
          title: "Privacy as architecture",
          body: "Encrypted records, per-clinic data isolation with access controls, and compliance with the Philippine Data Privacy Act (RA 10173), designed in from the first schema.",
        },
      ],
      outcome: [
        "Live at teethly.ph. Launched in Davao, rolling out to Cebu, Metro Manila and more cities",
        "Replaces four separate clinic tools: marketplace listing, booking, patient records and billing",
        "Founding-clinic programme live: the first 20 clinics get new-patient leads free for a year",
        "Shipped as marketing site, patient web app, clinic dashboard and mobile apps from one codebase",
      ],
      gallery: [
        {
          src: teethlyCover,
          alt: "Teethly patient homepage: 'Find a dentist near you' with search.",
          caption: "Patient marketplace: search by service and location.",
        },
        {
          src: teethlyClinicHero,
          alt: "Teethly clinic landing page: 'Get found by new patients. Run your clinic in one place.'",
          caption: "Clinic acquisition page with the founding-clinic offer.",
        },
        {
          src: teethlyChannels,
          alt: "Teethly page explaining chat, video call and booking channels.",
          caption: "Three ways patients reach a clinic.",
        },
        {
          src: teethlyClinicOs,
          alt: "Teethly clinic OS feature grid.",
          caption: "Clinic OS: scheduling, records, e-prescriptions, billing, revenue, reviews.",
        },
        {
          src: teethlyPricing,
          alt: "Teethly pricing: Free, Pro at ₱1,500 per month, and a per-new-patient fee.",
          caption: "Pricing encoded in product logic: free, Pro, pay-per-new-patient.",
        },
        {
          src: teethlyComparison,
          alt: "Feature comparison table of Teethly versus legacy dental software.",
          caption: "Teethly vs legacy software.",
        },
      ],
    },
  },
  {
    slug: "meeplecrate",
    title: "MeepleCrate: Rental & Delivery Platform",
    shortTitle: "MeepleCrate",
    seo: {
      title: "MeepleCrate: Rental & Delivery Platform",
      description:
        "Board-game rental and delivery platform in Colorado: credit subscriptions, BoardGameGeek catalog sync, QR-tracked inventory and a 12-module admin.",
    },
    client: "MeepleCrate",
    year: "2024–25",
    disciplines: ["full-stack"],
    live: true,
    summary:
      "A board-game rental and delivery platform serving Colorado and neighboring states: a credit-based subscription storefront on top of a twelve-module operations back office for catalog, physical inventory, service areas, bookings and credits.",
    stack: ["Java Spring Boot", "Laravel", "Next.js", "TypeScript", "PostgreSQL", "Stripe", "BoardGameGeek API", "AWS"],
    notes: [
      { x: 16.5, y: 45, label: "Twelve-module operations sidebar" },
      { x: 37, y: 29, label: "Live stock: total, available, rented, maintenance" },
      { x: 37.5, y: 66, label: "Every copy tracked by serial and condition" },
      { x: 75, y: 66, label: "Generated QR code per copy" },
    ],
    cover: {
      src: meepleInventory,
      alt: "MeepleCrate admin inventory screen listing physical game copies with serial numbers, condition, warehouse location, component checks and QR codes.",
    },
    result: "Twelve-module back office for rentals, inventory and credits",
    caseStudy: {
      kind: "Complex business application",
      headline: "Rentals are not e-commerce. So the back office had to be built, not bought.",
      metrics: [
        { value: "12", label: "Operations modules in the admin portal" },
        { value: "178", label: "Titles synced into catalog & inventory" },
        { value: "5", label: "Credit tiers mapped to box size" },
      ],
      problem: [
        "A rental business has problems a storefront never models: physical copies that leave and come back, deliveries limited to specific ZIP codes, a credit economy tied to game size, and a catalog of hundreds of titles whose metadata nobody wants to type by hand.",
        "Off-the-shelf e-commerce and subscription tools could take payments, but none of them could track a specific copy of a specific game through delivery, play and return.",
      ],
      role: {
        title: "Full-stack engineer, customer site, admin portal, APIs",
        scope: [
          "Customer storefront, plans and onboarding",
          "Backend APIs and business rules",
          "BoardGameGeek and Stripe integrations",
          "Location and service-area logic",
          "Admin portal and cloud deployment",
        ],
      },
      architecture: {
        intro:
          "A public storefront and an operations portal share one API. Integrations handle the parts nobody should do by hand: catalog metadata, payments and service-area checks.",
        stages: [
          { label: "01 Acquire", title: "Customer site", nodes: ["Plans & credits", "Waitlist / pre-registration", "Game & city voting"] },
          { label: "02 Decide", title: "API & business rules", nodes: ["Auth & subscriptions", "Credit ledger", "Bookings & returns"] },
          { label: "03 Integrate", title: "External systems", nodes: ["BoardGameGeek sync", "Stripe payments", "ZIP-code service areas"] },
          { label: "04 Operate", title: "Admin portal", nodes: ["Inventory + QR codes", "Bookings & credits", "CMS & settings"] },
        ],
        crossCutting: ["Restricted admin access with logging", "Maintenance & debug modes", "Cloud deployment"],
      },
      implementation: [
        {
          title: "Catalog sync, not data entry",
          body: "Titles are pulled from the BoardGameGeek API with players, play time, weight and ratings attached. Admins sync from BGG in one action, and customers requesting a new game search BGG directly from the vote form.",
        },
        {
          title: "A credit economy with a ledger",
          body: "Five tiers by box size, from Mini at 0.25 up to Exclusive at 3 credits, sit underneath monthly plans of 2, 3 or 5 credits. A dedicated credits module tracks circulation, balances and transactions.",
        },
        {
          title: "Every physical copy is an entity",
          body: "Each copy carries a serial number, condition grade, warehouse location, component check and maintenance flag, with a generated QR code for scanning at pick, pack and return.",
        },
        {
          title: "Service areas and demand-led expansion",
          body: "Locations are modelled by city and state with ZIP-code coverage and priority: Boulder, Denver, Aurora. City and game requests from the public site feed a pre-registration pipeline that drives where the service goes next.",
        },
        {
          title: "Operators control the product",
          body: "A content module edits the hero, features, pricing, credit tiers and testimonials without a deploy. System settings expose maintenance and debug modes, and admin sign-in is restricted and logged.",
        },
      ],
      outcome: [
        "Live in production, serving Colorado and neighboring states with weekly Monday deliveries",
        "One back office covering catalog, physical inventory, service areas, bookings and credits",
        "Catalog maintained through BoardGameGeek sync instead of manual entry",
        "Expansion decisions driven by in-app city and game voting",
      ],
      gallery: [
        {
          src: meepleHome,
          alt: "MeepleCrate homepage: 'Board games, delivered to your door.'",
          caption: "Customer site, live in production.",
        },
        {
          src: meepleDashboard,
          alt: "MeepleCrate admin dashboard with users, bookings, available games and revenue.",
          caption: "Admin portal: twelve modules in one sidebar.",
        },
        {
          src: meepleInventory,
          alt: "Inventory table with serials, condition, location and QR codes.",
          caption: "Physical inventory: every copy tracked with a serial and QR code.",
        },
        { src: meepleGames, alt: "Game management screen with a 'Sync from BGG' action.", caption: "Catalog synced from BoardGameGeek." },
        {
          src: meepleLocations,
          alt: "Locations screen listing Boulder, Denver and Aurora with ZIP-code counts and priority.",
          caption: "Service areas modelled by city, ZIP codes and priority.",
        },
        {
          src: meepleLedger,
          alt: "Credit management system with credits in circulation and average balance.",
          caption: "Credit ledger: circulation, balances, transactions.",
        },
        {
          src: meepleCredits,
          alt: "Table explaining credit cost per game size, from Mini at 0.25 to Exclusive at 3 credits.",
          caption: "Credit tiers by box size.",
        },
        {
          src: meepleVoting,
          alt: "Forms for voting on a new game via BoardGameGeek search and voting for a new city.",
          caption: "Demand capture: game and city voting.",
        },
        {
          src: meepleGameDetail,
          alt: "Game detail modal for Civilization showing credits, availability and BGG metadata.",
          caption: "Game detail with live availability and BGG metadata.",
        },
      ],
    },
  },
  {
    slug: "echo-call-solutions",
    title: "Echo Call Solutions: AI Receptionist & Website",
    shortTitle: "Echo Call Solutions",
    client: "Echo Call Solutions",
    year: "",
    disciplines: ["automation", "full-stack"],
    live: true,
    summary:
      'A 24/7 AI receptionist service for small businesses. I built the voice agent on Vapi, which answers calls in a natural voice, books appointments and sends a summary after every call, plus the React marketing site with a live "Talk with AI" demo visitors can try from the browser.',
    stack: ["Vapi", "Voice AI", "React", "Vite"],
    cover: {
      src: echoCover,
      alt: "Echo Call Solutions homepage: 'Never miss a call ever again', with a 24/7 AI receptionist pitch and a Talk with AI button.",
    },
    liveUrl: "http://www.echocallsolutions.com/",
    result: "AI receptionist that answers, books and summarises calls 24/7",
  },
  {
    slug: "lead-enrichment-agent",
    title: "AI Lead Enrichment & Call-Booking Agent",
    shortTitle: "Lead Enrichment Agent",
    client: "Sales automation client",
    year: "2026",
    disciplines: ["automation"],
    live: true,
    summary:
      "Form intake, raw-data storage, company enrichment and AI qualification against a schema. Qualified leads get available calendar slots and a call invitation automatically.",
    stack: ["n8n", "OpenAI", "Enrichment API", "Google Calendar", "Email"],
    cover: { src: aiCanvasEnrichment, alt: "n8n canvas of the lead enrichment and call-booking workflow." },
    result: "Qualified leads get a booking link without a human in the loop",
    href: "/work/ai-lead-qualification#screens",
  },
  {
    slug: "vantrippers",
    title: "Vantrippers: Travel & Tours Management",
    shortTitle: "Vantrippers",
    client: "Vantrippers Travel and Tours",
    year: "2024",
    disciplines: ["full-stack"],
    live: true,
    summary:
      "Public site with an integrated CRM for bookings, scheduling, appointments and van-rental management with real-time availability.",
    stack: ["Next.js", "TypeScript", "Laravel", "MySQL", "AWS", "Payment gateway"],
    cover: { src: vantrippersCover, alt: "Vantrippers Travel and Tours homepage." },
    liveUrl: "https://vantripperstravelandtours.com/",
    result: "Booking, scheduling and fleet in one CRM",
  },
  {
    slug: "cozy-crave",
    title: "Cozy Crave Finder",
    shortTitle: "Cozy Crave",
    client: "Cozy Crave Finder",
    year: "2024",
    disciplines: ["full-stack"],
    live: true,
    summary:
      "A revenue-generating food and cafe discovery app: a preference quiz and swipe interface matched with location-based recommendations.",
    stack: ["Next.js", "TypeScript", "shadcn/ui", "Geolocation API", "Vercel"],
    cover: { src: cozyCover, alt: "Cozy Crave Finder swipe-based food discovery interface." },
    liveUrl: "https://cozy-crave-finder.vercel.app/",
    result: "Location-aware matching from a swipe interface",
  },
  {
    slug: "inm-audio",
    title: "INM Audio: 3D Product Customizer & Store",
    shortTitle: "INM Audio",
    client: "INM Audio",
    year: "2023",
    disciplines: ["full-stack"],
    live: true,
    summary:
      "E-commerce with real-time 3D in-ear monitor customization in Three.js and PayMongo payments, plus admin inventory and order management.",
    stack: ["CodeIgniter", "Three.js", "PayMongo", "PHP", "MySQL"],
    cover: { src: inmCover, alt: "INM Audio storefront homepage." },
    liveUrl: "https://www.inmaudio.com/designer",
    result: "35% reduction in cart abandonment",
  },
  {
    slug: "foreverlife-gym",
    title: "ForeverLife Gym Management System",
    shortTitle: "ForeverLife Gym",
    client: "ForeverLife Gym",
    year: "2025",
    disciplines: ["full-stack", "automation"],
    summary: "Member management, class scheduling, automated billing and real-time analytics with role-based access.",
    stack: ["Laravel", "Vue.js", "PHP", "MySQL"],
    cover: { src: gymCover, alt: "ForeverLife Gym management system landing page." },
    result: "50% reduction in admin overhead",
  },
  {
    slug: "jkk-construction",
    title: "JKK Construction: Site & Appointment System",
    shortTitle: "JKK Construction",
    client: "JKK Construction Services",
    year: "2024",
    disciplines: ["full-stack"],
    live: true,
    summary:
      "Company site with portfolio, testimonials and an appointment booking system with automated email notifications and an admin dashboard.",
    stack: ["PHP", "MySQL", "PHPMailer"],
    cover: { src: jkkCover, alt: "JKK Construction Services homepage." },
    liveUrl: "https://jkkconstructionservices.com/",
    result: "40% increase in client inquiries",
  },
  {
    slug: "hoa-management",
    title: "HOA Management System",
    shortTitle: "HOA Management",
    client: "Pagsibol Village HOA",
    year: "2024",
    disciplines: ["full-stack"],
    summary: "Homeowners-association operations: member communication, document management and dues payment processing.",
    stack: ["CodeIgniter", "PHP", "MySQL"],
    cover: { src: hoaCover, alt: "HOA management system sign-in screen." },
  },
];

export const caseStudies = projects.filter((p): p is Project & { caseStudy: CaseStudy } => Boolean(p.caseStudy));

/** The three systems featured on the homepage, in display order. */
export const flagships = ["ai-lead-qualification", "jackson-properties", "teethly"].map((slug) =>
  caseStudies.find((p) => p.slug === slug)!,
);

export function getCaseStudy(slug: string) {
  return caseStudies.find((p) => p.slug === slug);
}

/** "https://www.teethly.ph/" → "teethly.ph" */
export function liveDomain(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

export function projectHref(p: Project) {
  return p.caseStudy ? `/work/${p.slug}` : (p.href ?? p.liveUrl);
}
