import { workflows, type Workflow } from "./workflows";

/**
 * Long-form content for each workflow's own page, written from the numbered
 * stages and notes on the real n8n canvases. Kept apart from the card data in
 * workflows.ts so the cards stay short.
 */
export interface WorkflowDetail {
  /** Search title; the site name is appended. Keep under ~38 characters. */
  seoTitle: string;
  /** Meta description, under 155 characters. */
  seoDescription: string;
  /** Keyword-rich page heading. */
  h1: string;
  /** Answer-first definition: the sentence answer engines quote. */
  definition: string;
  problem: string;
  stages: { title: string; body: string; nodes: string[] }[];
  safeguards: string[];
  faq: { q: string; a: string }[];
  related: { label: string; href: string }[];
}

const details: Record<string, WorkflowDetail> = {
  "ai-voice-receptionist": {
    seoTitle: "AI Receptionist & Missed-Call Text-Back",
    seoDescription:
      "GoHighLevel missed-call text-back with an AI voice receptionist: instant SMS, after-hours AI callbacks and bookings straight into the GHL calendar.",
    h1: "AI Voice Receptionist & Missed-Call Text-Back for GoHighLevel",
    definition:
      "A missed-call text-back automatically texts anyone whose call goes unanswered, so the lead hears back in seconds instead of calling a competitor. This build adds an AI voice receptionist that calls back after hours and books the appointment into GoHighLevel.",
    problem:
      "Local service businesses miss calls every day: during appointments, at lunch and after hours. Each missed call is a lead that may book with whoever picks up first.",
    stages: [
      {
        title: "Capture the missed call",
        body: "Twilio or GoHighLevel posts every unanswered call to a webhook, and the caller's details are normalised.",
        nodes: ["Missed Call Webhook", "Normalize Caller"],
      },
      {
        title: "Save the lead and text back instantly",
        body: "Business hours are checked, the contact is created or updated in GoHighLevel, and the caller gets an SMS within seconds.",
        nodes: ["Check Business Hours", "GHL Upsert Contact", "Instant Text-Back SMS"],
      },
      {
        title: "Route the callback",
        body: "If the business is open, the front desk is pinged on Slack to call back. If it's closed, the AI receptionist calls the lead back.",
        nodes: ["Business Open?", "Alert Front Desk", "AI Callback"],
      },
      {
        title: "AI call results come back",
        body: "When the AI call ends, the transcript summary and structured booking data are sent back and parsed.",
        nodes: ["End-of-Call Webhook", "Parse Call Report", "Appointment Booked?"],
      },
      {
        title: "Book or escalate, then log everything",
        body: "A booked call becomes an appointment in the GoHighLevel calendar with a confirmation SMS. An unbooked call is tagged for follow-up and the team is alerted. Every call summary is saved as a note on the contact.",
        nodes: ["GHL Book Appointment", "Booking Confirmation SMS", "Tag Needs Follow-up", "Alert Team", "GHL Log Call Summary"],
      },
    ],
    safeguards: [
      "Business-hours check: humans call back when the office is open, the AI only after hours",
      "Calls the AI couldn't book are tagged and escalated to the team, never dropped",
      "Every call summary is logged on the contact for a full history",
    ],
    faq: [
      {
        q: "What happens when the business is open?",
        a: "The front desk gets a Slack alert to call the lead back personally. The AI receptionist only calls back outside business hours.",
      },
      {
        q: "What if the AI receptionist doesn't book an appointment?",
        a: "The contact is tagged for follow-up and the team is alerted. The call summary is still saved on the contact, so whoever calls back has the context.",
      },
      {
        q: "Does it work with an existing GoHighLevel account?",
        a: "Yes. It connects through the GoHighLevel API using your location and calendar, and texts go out through Twilio.",
      },
    ],
    related: [
      { label: "Echo Call Solutions: a live AI receptionist I built", href: "/work?type=automation" },
      { label: "Speed-to-Lead & No-Show Recovery", href: "/automations/speed-to-lead" },
    ],
  },
  "speed-to-lead": {
    seoTitle: "Speed-to-Lead & No-Show Automation",
    seoDescription:
      "GoHighLevel + n8n speed-to-lead automation: SMS and email with a booking link in under 60 seconds, reminder texts and a no-show recovery sequence.",
    h1: "Speed-to-Lead & No-Show Recovery Automation (GoHighLevel + n8n)",
    definition:
      "Speed-to-lead automation contacts every new lead within seconds of their form submission, while they're still interested. This build pairs it with appointment reminders and a no-show recovery sequence, all in n8n and GoHighLevel.",
    problem:
      "Leads go cold fast, and a booked appointment isn't a showed appointment. Without automation, response depends on someone noticing the lead, and no-shows quietly disappear from the pipeline.",
    stages: [
      {
        title: "A new lead comes in",
        body: "Any form, Facebook Lead Ad or landing page posts the lead to a webhook, and the details are normalised.",
        nodes: ["New Lead Webhook", "Normalize Lead"],
      },
      {
        title: "Into the CRM",
        body: "The contact is upserted in GoHighLevel and an opportunity is created in the sales pipeline's New Lead stage.",
        nodes: ["GHL Upsert Contact", "GHL Create Opportunity"],
      },
      {
        title: "Contact in under 60 seconds",
        body: "An SMS and an email with a booking link go out immediately.",
        nodes: ["Instant SMS (< 60s)", "Instant Welcome Email"],
      },
      {
        title: "Appointment status changes",
        body: "A GoHighLevel workflow posts every appointment status change (booked, no-show, showed) and the workflow routes it.",
        nodes: ["Appointment Status Webhook", "Route by Status"],
      },
      {
        title: "Booked: reminder sequence",
        body: "Reminder texts go out 24 hours and 2 hours before the appointment.",
        nodes: ["Wait Until 24h Before", "24h Reminder SMS", "Wait Until 2h Before", "2h Reminder SMS"],
      },
      {
        title: "No-show: recovery sequence",
        body: "A same-day rebook SMS goes out. A day later GoHighLevel is checked; if there's still no upcoming appointment, a final rebook email is sent and the contact is tagged for longer-term nurture.",
        nodes: ["We Missed You SMS", "Wait 1 Day", "GHL Get Appointments", "Final Rebook Email", "Tag no-show-lost"],
      },
      {
        title: "Showed: advance the deal",
        body: "The opportunity moves to Showed and the review workflow is triggered.",
        nodes: ["GHL Move to Showed", "Trigger Review Workflow"],
      },
    ],
    safeguards: [
      "Contact is upserted, so repeat submissions update the record instead of duplicating it",
      "Before the final email, GoHighLevel is checked so anyone who already rebooked isn't chased",
      "Unrecovered no-shows are tagged for nurture instead of being lost",
    ],
    faq: [
      {
        q: "How fast does a new lead hear back?",
        a: "The SMS and email fire as soon as the lead arrives, within 60 seconds, with a link to book.",
      },
      {
        q: "What happens if someone misses their appointment?",
        a: "They get a same-day rebook text. If they still haven't rebooked a day later, they get a final email and are tagged for longer-term nurture.",
      },
      {
        q: "Which lead sources does it accept?",
        a: "Any form, Facebook Lead Ad or landing page that can post to a webhook.",
      },
    ],
    related: [
      { label: "AI Lead Engine: 4–6 hrs → under 5 min response", href: "/work/ai-lead-qualification" },
      { label: "Review Generation & Reputation Protection", href: "/automations/review-generation" },
    ],
  },
  "inbox-triage": {
    seoTitle: "AI Email Triage with n8n & OpenAI",
    seoDescription:
      "n8n + OpenAI email triage: every email classified by category, priority and sentiment, routed to Slack, and given a draft reply for a human to approve.",
    h1: "AI Inbox Triage & Auto-Draft Replies with n8n and OpenAI",
    definition:
      "AI inbox triage uses a language model to read each incoming email, label it by category and urgency, and route it to the right person with a reply already drafted. This build runs on n8n with OpenAI, Gmail, Slack and Google Sheets.",
    problem: "Owners and support teams lose hours sorting email, and urgent messages get buried under everything else.",
    stages: [
      {
        title: "A new email arrives",
        body: "Gmail is checked every minute, and each email is cleaned up and trimmed to keep model costs low.",
        nodes: ["Gmail Trigger", "Clean Email"],
      },
      {
        title: "AI reads it",
        body: "One OpenAI call returns the category, priority, sentiment, a one-line summary and a ready-to-send draft reply.",
        nodes: ["AI Classifier", "OpenAI Chat Model", "Parse AI Output"],
      },
      {
        title: "Route, alert and draft",
        body: "Sales, Support and Billing emails post a summary to the right Slack channel and leave a draft reply in Gmail. High-priority emails are flagged. Spam is marked as read. Every email is logged to Google Sheets.",
        nodes: ["Route by Category", "Notify #sales / #support / #billing", "Draft Reply", "Mark Spam as Read", "Log to Triage Sheet"],
      },
    ],
    safeguards: [
      "Drafts only: a human reviews and sends every reply",
      "One model call per email on gpt-4o-mini, with bodies trimmed, to keep costs predictable",
      "Every email is logged, so volume and response can be reported on",
    ],
    faq: [
      {
        q: "Does the AI send replies on its own?",
        a: "No. Drafts wait in Gmail and a person reviews and sends them.",
      },
      {
        q: "What does it cost to run?",
        a: "It makes one OpenAI call per email using gpt-4o-mini, and trims each email first to keep model costs low.",
      },
      {
        q: "Can the categories match my business?",
        a: "Yes. The Slack channels and the AI's instructions, including your tone and FAQs, are configured per business.",
      },
    ],
    related: [
      { label: "AI Lead Qualification (n8n + OpenAI)", href: "/work/ai-lead-qualification" },
      { label: "Client Onboarding Automation", href: "/automations/client-onboarding" },
    ],
  },
  "client-onboarding": {
    seoTitle: "Agency Client Onboarding Automation",
    seoDescription:
      "n8n client onboarding for agencies: Stripe payment triggers the contract, GoHighLevel sub-account, ClickUp tasks, welcome email and Slack alert.",
    h1: "Client Onboarding Automation: Stripe to Contract to GoHighLevel",
    definition:
      "Client onboarding automation takes a new client from payment to kickoff without manual setup. The contract, accounts, tasks and welcome email all trigger from one Stripe payment.",
    problem:
      "Agencies lose hours to copy-paste setup for every new client, and slow, inconsistent onboarding makes a poor first impression.",
    stages: [
      {
        title: "The client pays",
        body: "A completed Stripe Checkout triggers the workflow, and the client's details are pulled from the session.",
        nodes: ["Stripe Payment Received", "Extract Client Details"],
      },
      {
        title: "The contract goes out",
        body: "The service agreement is filled in automatically and sent for e-signature through RabbitSign or DocuSign.",
        nodes: ["Send Contract (e-Sign)"],
      },
      {
        title: "Everything spins up at once",
        body: "A GoHighLevel sub-account is created from the agency snapshot, onboarding tasks with due dates are created in ClickUp, the client gets a welcome email, the team is told in Slack and the client is added to the tracker sheet.",
        nodes: [
          "GHL Create Sub-Account",
          "Build Onboarding Tasks",
          "ClickUp Create Task",
          "Welcome Email",
          "Announce in #new-clients",
          "Add to Client Tracker",
        ],
      },
      {
        title: "Contract signed: kickoff",
        body: "When the e-signature provider confirms the signature, the client gets a kickoff booking link and the team is notified.",
        nodes: ["Contract Signed Webhook", "Kickoff Booking Email", "Notify Contract Signed"],
      },
    ],
    safeguards: [
      "Every new client is added to a tracker sheet for a single source of truth",
      "The e-signature step is a swappable HTTP call, so the provider can change without a rebuild",
      "Kickoff is only booked once the contract is signed",
    ],
    faq: [
      {
        q: "Which e-signature tools does it support?",
        a: "RabbitSign or DocuSign. The contract step is an API call, so the provider can be swapped.",
      },
      {
        q: "Does it create the GoHighLevel sub-account automatically?",
        a: "Yes. It's created from your agency snapshot as soon as the payment comes through.",
      },
      {
        q: "Where do onboarding tasks go?",
        a: "Into ClickUp with due dates, and the team is notified in Slack.",
      },
    ],
    related: [
      { label: "GoHighLevel & custom CRM development", href: "/services/crm-systems" },
      { label: "Daily Ads + Pipeline KPI Report", href: "/automations/reporting-dashboard" },
    ],
  },
  "reporting-dashboard": {
    seoTitle: "Ads + GoHighLevel KPI Report (n8n)",
    seoDescription:
      "Daily n8n report joining Meta and Google Ads spend to GoHighLevel bookings: CPL, cost per booked call and ROAS in Looker Studio, email and Slack.",
    h1: "Daily Ads + Pipeline KPI Report: Meta, Google Ads & GoHighLevel",
    definition:
      "An ads-to-pipeline KPI report joins ad spend from Meta and Google with real outcomes from the CRM, so cost per lead and cost per booked call reflect actual bookings, not platform-reported conversions.",
    problem: "Agency owners log into several platforms every morning to answer one question: is the ad spend turning into booked calls?",
    stages: [
      {
        title: "Runs daily",
        body: "The workflow runs at 7:00 AM every morning.",
        nodes: ["Every Day 7:00 AM"],
      },
      {
        title: "Pull the data",
        body: "Yesterday's spend and conversions come from Meta and Google Ads, and the pipeline (new leads, booked calls, revenue won) comes from GoHighLevel.",
        nodes: ["Meta Ads (Yesterday)", "Google Ads (Yesterday)", "GHL Opportunities"],
      },
      {
        title: "Calculate KPIs",
        body: "Ad spend is joined to real CRM outcomes to calculate cost per lead, cost per booked call and ROAS.",
        nodes: ["Merge Sources", "Calculate KPIs"],
      },
      {
        title: "Deliver and alert",
        body: "A row is appended to the KPI sheet that feeds a Looker Studio dashboard, a branded HTML report is emailed, and Slack is alerted if cost per lead goes over target.",
        nodes: ["Append to KPI Sheet", "Build HTML Report", "Email Daily Report", "CPL Over Target?", "Alert: CPL Spike"],
      },
    ],
    safeguards: [
      "Uses real CRM bookings, not platform-reported leads",
      "A per-client cost-per-lead target triggers a Slack alert the moment it's exceeded",
      "Every day is appended to a sheet, building a history the dashboard reads from",
    ],
    faq: [
      {
        q: "Why not just use the numbers in Meta and Google Ads?",
        a: "Ad platforms report their own conversions, not whether a lead actually booked. This report joins spend to GoHighLevel pipeline data, so cost per booked call is real.",
      },
      {
        q: "Where do the numbers show up?",
        a: "In a Google Sheet that powers a Looker Studio dashboard, in a daily email report, and as a Slack alert when cost per lead goes over target.",
      },
      {
        q: "Can it run for several clients?",
        a: "Yes. The cost-per-lead target and report recipient are set per client.",
      },
    ],
    related: [
      { label: "Client Onboarding Automation", href: "/automations/client-onboarding" },
      { label: "AI automation services", href: "/services/ai-automation" },
    ],
  },
  "review-generation": {
    seoTitle: "GoHighLevel Review Generation Workflow",
    seoDescription:
      "GoHighLevel + Twilio review workflow: a private rating SMS after each visit, a Google review link for happy customers and instant alerts for low scores.",
    h1: "Review Generation & Reputation Protection for GoHighLevel",
    definition:
      "A review generation workflow asks customers for a rating after their visit, makes it easy for satisfied customers to post a Google review, and alerts the owner straight away when someone has a bad experience.",
    problem: "Happy customers rarely leave reviews unless asked, while unhappy customers often go straight to Google.",
    stages: [
      {
        title: "Visit completed",
        body: "Triggered by GoHighLevel, or by the speed-to-lead workflow, when an appointment is marked as showed.",
        nodes: ["Appointment Completed", "Normalize Customer"],
      },
      {
        title: "Ask for a private rating first",
        body: "Two hours after the visit, the customer is asked for a 1–5 score by SMS and tagged as review-requested.",
        nodes: ["Wait 2 Hours", "Rating Request SMS", "Tag review-requested"],
      },
      {
        title: "One gentle reminder",
        body: "If there's no rating after two days, a single follow-up is sent.",
        nodes: ["Wait 2 Days", "GHL Get Contact", "No Rating Yet?", "Gentle Reminder SMS"],
      },
      {
        title: "The customer replies",
        body: "The rating is read from the SMS reply and matched to the GoHighLevel contact by phone number.",
        nodes: ["Customer SMS Reply", "Extract Rating", "GHL Find Contact by Phone"],
      },
      {
        title: "Route by rating",
        body: "A 4–5 gets the Google review link and is tagged as a promoter. A 1–3 gets an apology and callback offer, the owner is alerted on Slack and by email, and the contact is tagged as a detractor. Unclear replies are forwarded to the team.",
        nodes: ["Route by Rating", "Send Google Review Link", "Apology + Callback SMS", "Alert Owner", "Forward Unclear Reply"],
      },
    ],
    safeguards: [
      "Only one reminder is ever sent",
      "Unclear replies go to a person instead of being guessed at",
      "Low scores reach the owner immediately, with time to make it right",
    ],
    faq: [
      {
        q: "When is the rating request sent?",
        a: "Two hours after the appointment is marked as showed in GoHighLevel.",
      },
      {
        q: "What happens with a low rating?",
        a: "The customer gets an apology and a callback offer, and the owner is alerted on Slack and by email straight away.",
      },
      {
        q: "How many messages does a customer get?",
        a: "The rating request and at most one reminder.",
      },
    ],
    related: [
      { label: "Speed-to-Lead & No-Show Recovery", href: "/automations/speed-to-lead" },
      { label: "AI Voice Receptionist & Missed-Call Text-Back", href: "/automations/ai-voice-receptionist" },
    ],
  },
};

export type WorkflowPage = Workflow & WorkflowDetail & { index: number };

export const workflowPages: WorkflowPage[] = workflows.map((w, i) => ({ ...w, ...details[w.slug], index: i }));

export function getWorkflowPage(slug: string) {
  return workflowPages.find((w) => w.slug === slug);
}
