import type { StaticImageData } from "next/image";

import w01 from "@/assets/work/workflows/w01-ai-receptionist.png";
import w02 from "@/assets/work/workflows/w02-speed-to-lead.png";
import w03 from "@/assets/work/workflows/w03-inbox-triage.png";
import w04 from "@/assets/work/workflows/w04-client-onboarding.png";
import w05 from "@/assets/work/workflows/w05-ads-reporting.png";
import w06 from "@/assets/work/workflows/w06-review-generation.png";

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
    category: "Voice AI · n8n + GoHighLevel",
    forWho: "Local service businesses: dental, med spa, HVAC",
    pitch:
      "Every missed call gets an instant text back. In business hours the front desk is pinged; after hours an AI receptionist calls the lead back and books straight into the GoHighLevel calendar.",
    steps: [
      "Missed call hits the webhook",
      "Contact upserted + instant text-back SMS",
      "Open → front desk alerted on Slack",
      "Closed → AI receptionist calls back",
      "Booked in GHL calendar, call summary on the contact",
    ],
    tools: ["n8n", "GoHighLevel", "Vapi", "ElevenLabs", "Twilio", "Slack"],
    outcome: "No caller goes unanswered, and every booking lands in the calendar with a summary attached.",
    highlight: true,
    proof: { label: "Also live: the Echo Call Solutions AI receptionist I built", href: "/work?type=automation" },
    image: {
      src: w01,
      alt: "n8n canvas: missed-call webhook, business-hours check, GoHighLevel contact upsert and instant text-back SMS, Slack alert or AI callback, then appointment booking and call-summary logging.",
    },
  },
  {
    slug: "speed-to-lead",
    title: "Speed-to-Lead & No-Show Recovery",
    category: "Lead response · n8n + GoHighLevel",
    forWho: "Agencies and service businesses running lead ads",
    pitch:
      "New leads get a text and email with a booking link in under 60 seconds, booked calls get reminders, and no-shows go straight into a rebooking sequence.",
    steps: [
      "Form, Facebook lead ad or landing page",
      "Contact + opportunity created in GHL",
      "SMS + email with booking link in under 60s",
      "24h and 2h reminder SMS",
      "No-show → rebook SMS, then a final email",
      "Showed → deal advanced, review flow (W06) starts",
    ],
    tools: ["n8n", "GoHighLevel", "Twilio", "Gmail"],
    outcome: "Leads are contacted while they're still interested, and missed appointments get a second chance automatically.",
    measures: ["Lead response time", "Appointment show rate"],
    highlight: true,
    proof: { label: "Related result: AI Lead Engine, 4–6 hrs → <5 min response", href: "/work/ai-lead-qualification" },
    image: {
      src: w02,
      alt: "n8n canvas: new-lead webhook, GoHighLevel contact and opportunity, instant SMS and welcome email, reminder sequence, no-show recovery sequence and the showed branch.",
    },
  },
  {
    slug: "inbox-triage",
    title: "AI Inbox Triage & Auto-Draft Replies",
    category: "AI agents · n8n + OpenAI",
    forWho: "Support and operations teams",
    pitch:
      "Every incoming email is classified by OpenAI, routed to the right Slack channel, and arrives with a drafted reply waiting in Gmail for a human to approve.",
    steps: [
      "Gmail checked every minute",
      "OpenAI returns category, priority, sentiment + draft",
      "Routed: Sales, Support, Billing or Spam",
      "Slack alert + Gmail draft for approval",
      "Every email logged to Google Sheets",
    ],
    tools: ["n8n", "OpenAI", "Gmail", "Slack", "Google Sheets"],
    outcome: "Nobody sorts the inbox by hand, and every message has an owner and a draft ready to send.",
    image: {
      src: w03,
      alt: "n8n canvas: Gmail trigger, email cleanup, OpenAI classifier, routing by category to Slack notifications and Gmail drafts, spam marked read, and a triage log sheet.",
    },
  },
  {
    slug: "client-onboarding",
    title: "Client Onboarding Automation",
    category: "Operations · n8n + GoHighLevel",
    forWho: "Agencies onboarding new clients",
    pitch:
      "From payment to kickoff with no manual steps: contract, sub-account, onboarding tasks, welcome email and team announcement, all in one run.",
    steps: [
      "Stripe payment received",
      "Contract sent via RabbitSign or DocuSign",
      "GHL sub-account from snapshot + ClickUp tasks",
      "Welcome email, Slack post, tracker row",
      "Contract signed → kickoff booking email",
    ],
    tools: ["n8n", "Stripe", "RabbitSign", "DocuSign", "GoHighLevel", "ClickUp", "Gmail", "Slack", "Google Sheets"],
    outcome: "Every new client is onboarded the same way, the same day, without anyone copying details between tools.",
    image: {
      src: w04,
      alt: "n8n canvas: Stripe payment trigger, client details extraction, e-signature contract, GoHighLevel sub-account, ClickUp tasks, welcome email, Slack announcement, tracker sheet and the contract-signed kickoff branch.",
    },
  },
  {
    slug: "reporting-dashboard",
    title: "Daily Ads + Pipeline KPI Report",
    category: "Reporting · n8n",
    forWho: "Agency owners",
    pitch:
      "Every morning at 7:00, ad spend is joined to real CRM outcomes, so the owner sees cost per lead, cost per booked call and ROAS without opening a spreadsheet.",
    steps: [
      "Runs every day at 7:00 AM",
      "Yesterday's Meta + Google Ads spend",
      "GHL pipeline: leads, booked calls, revenue",
      "CPL, cost per booked call and ROAS",
      "KPI sheet feeding a Looker Studio dashboard",
      "Daily email report + Slack alert on CPL spikes",
    ],
    tools: ["n8n", "Meta Ads", "Google Ads", "GoHighLevel", "Google Sheets", "Looker Studio", "Gmail", "Slack"],
    outcome: "The numbers an agency owner checks every week, calculated from real bookings and delivered every morning.",
    image: {
      src: w05,
      alt: "n8n canvas: daily 7 AM trigger, Meta Ads, Google Ads and GoHighLevel data pulls, merge and KPI calculation, KPI sheet, HTML email report and a CPL alert to Slack.",
    },
  },
  {
    slug: "review-generation",
    title: "Review Generation & Reputation Protection",
    category: "Reputation · n8n + GoHighLevel",
    forWho: "Local service businesses",
    pitch:
      "After each visit, customers rate privately first: happy ones get the Google review link, unhappy ones get an apology while the owner is alerted.",
    steps: [
      "Appointment completed (GHL or W02)",
      "Private 1–5 rating SMS two hours later",
      "One gentle reminder after two days",
      "4–5 → Google review link, tagged promoter",
      "1–3 → apology + callback, owner alerted",
    ],
    tools: ["n8n", "GoHighLevel", "Twilio", "Slack", "Gmail"],
    outcome: "More public reviews from happy customers, and problems reach the owner before they reach Google.",
    image: {
      src: w06,
      alt: "n8n canvas: appointment-completed webhook, rating request SMS, reminder, customer reply parsing, and routing by rating to a review link, owner alerts or team follow-up.",
    },
  },
];
