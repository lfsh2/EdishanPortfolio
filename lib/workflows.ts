import type { StaticImageData } from "next/image";

/**
 * Automation workflows Edishan builds. Each one renders as a flow diagram until a
 * real screenshot is supplied in `image`. No results are shown until real numbers exist:
 * `measures` says what the workflow is judged on, not what it achieved.
 */
export interface Workflow {
  slug: string;
  title: string;
  category: string;
  /** Who buys it. */
  forWho: string;
  pitch: string;
  steps: string[];
  tools: string[];
  outcome: string;
  measures?: string[];
  /** The two flagship workflows shown large. */
  highlight?: boolean;
  /** Related live proof elsewhere in the portfolio. */
  proof?: { label: string; href: string };
  image?: { src: StaticImageData; alt: string };
}

export const workflows: Workflow[] = [
  {
    slug: "ai-voice-receptionist",
    title: "AI Voice Receptionist & Missed-Call Text-Back",
    category: "Voice AI · GoHighLevel",
    forWho: "Local service businesses: dental, med spa, HVAC",
    pitch: "Every missed call gets an instant text back, and an AI voice agent books the appointment straight into the calendar.",
    steps: ["Missed call", "Instant SMS text-back", "AI voice agent picks up", "Books into GHL calendar", "Call summary on the contact"],
    tools: ["GoHighLevel", "Vapi", "SMS"],
    outcome: "No caller goes unanswered, and every booking lands in the calendar with a summary attached.",
    highlight: true,
    proof: { label: "Live: Echo Call Solutions runs on a Vapi agent I built", href: "/work?type=automation" },
  },
  {
    slug: "speed-to-lead",
    title: "Speed-to-Lead & No-Show Recovery",
    category: "Lead response · GoHighLevel",
    forWho: "Agencies and service businesses running lead ads",
    pitch: "New leads hear back within 60 seconds, book through an AI chat, and no-shows are pulled straight into a rebooking flow.",
    steps: [
      "Form or Facebook lead ad",
      "SMS + email within 60s",
      "AI chat books the slot",
      "Reminder sequence",
      "No-show → rebooking flow",
    ],
    tools: ["GoHighLevel", "Facebook Lead Ads", "AI chat", "SMS", "Email"],
    outcome: "Leads are contacted while they're still interested, and missed appointments get a second chance automatically.",
    measures: ["Lead response time", "Appointment show rate"],
    highlight: true,
    proof: { label: "Related result: AI Lead Engine, 4–6 hrs → <5 min response", href: "/work/ai-lead-qualification" },
  },
  {
    slug: "inbox-triage",
    title: "AI Inbox & Ticket Triage",
    category: "AI agents · n8n",
    forWho: "Support and operations teams",
    pitch: "Incoming emails and tickets are classified by AI, routed to the right person, and arrive with a drafted reply.",
    steps: [
      "Email or ticket arrives",
      "AI classifies intent + urgency",
      "Routed to owner or queue",
      "Reply drafted",
      "Logged to Sheets / Notion",
    ],
    tools: ["n8n", "LLM", "Gmail", "Google Sheets", "Notion"],
    outcome: "Nobody sorts the inbox by hand, and every message has an owner and a draft ready to send.",
  },
  {
    slug: "client-onboarding",
    title: "Client Onboarding Automation",
    category: "Operations · Agencies",
    forWho: "Agencies onboarding new clients",
    pitch: "From payment to a fully set-up client in one run: contract, workspace, welcome email and team tasks.",
    steps: [
      "Stripe payment",
      "Contract sent for e-signature",
      "GHL sub-account or Notion workspace",
      "Welcome email",
      "Slack / ClickUp tasks created",
    ],
    tools: ["Stripe", "E-signature", "GoHighLevel", "Notion", "Slack", "ClickUp"],
    outcome: "Every new client is onboarded the same way, the same day, without anyone copying details between tools.",
  },
  {
    slug: "reporting-dashboard",
    title: "Ad Spend & Pipeline Reporting",
    category: "Reporting · n8n",
    forWho: "Agency owners",
    pitch: "A nightly run pulls ad spend and pipeline data, works out cost per lead and per booked call, and reports it.",
    steps: ["Nightly n8n run", "Meta + Google ad spend", "GHL pipeline data", "Cost per lead / booked call", "Dashboard + weekly email"],
    tools: ["n8n", "Meta Ads", "Google Ads", "GoHighLevel"],
    outcome: "The numbers an agency owner checks every week, calculated and delivered without a spreadsheet session.",
  },
  {
    slug: "review-generation",
    title: "Review Generation & Reputation",
    category: "Reputation · GoHighLevel",
    forWho: "Local service businesses",
    pitch: "After every completed appointment, happy customers get a review link and unhappy ones go privately to the owner.",
    steps: ["Appointment completed", "Satisfaction SMS", "Happy → Google review link", "Unhappy → private alert to owner"],
    tools: ["GoHighLevel", "SMS", "Google Business Profile"],
    outcome: "More public reviews from happy customers, and problems reach the owner before they reach Google.",
  },
];
