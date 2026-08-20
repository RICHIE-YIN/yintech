/**
 * V4 copy. Service names and prices are never duplicated here — they come
 * from `content/services.ts` and `content/pricing.ts`, so a price change in
 * one place moves every concept.
 */

/**
 * Flip to true when V4 becomes the live site. It controls indexing and the
 * sitemap in one place rather than a robots line per route.
 */
export const V4_INDEXABLE = false;

/**
 * Direct contact routes. Env-driven so they can be filled without a code
 * change — and so nothing fabricated ever renders. Anything left blank is
 * simply not shown.
 */
export const contactChannels = {
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "",
  booking: process.env.NEXT_PUBLIC_BOOKING_URL ?? "",
};

export const v4Site = {
  base: "/v4",
  nav: [
    { label: "What we build", href: "/v4/services" },
    { label: "Automation OS", href: "/v4/automation-os" },
    { label: "How it works", href: "/v4/how-it-works" },
    { label: "About", href: "/v4/about" },
  ],
  cta: { label: "Book an audit", href: "/v4/contact" },
};

/**
 * The five services Automation OS replaces. Their prices sum to exactly the
 * standalone figures in `content/pricing.ts`, which is what lets the scope
 * builder show the saving as arithmetic rather than a claim.
 */
export const OS_BUNDLE_IDS = [
  "ai-lead-qualifier",
  "email-lead-parser",
  "automated-lead-follow-up",
  "basic-crm-center",
  "executive-dashboard",
] as const;

export type IndustryId = "contracting" | "service" | "sales";

/**
 * Same services throughout — only the vocabulary changes. A contractor
 * recognises "quote request from the website"; a sales lead recognises
 * "inbound demo request". Generic copy loses both.
 */
export const industries: Array<{
  id: IndustryId;
  label: string;
  lede: string;
  costs: Array<{ label: string; detail: string }>;
  example: string;
}> = [
  {
    id: "contracting",
    label: "Contracting & trades",
    lede: "Quote requests arrive by form, email, and phone. YinTech turns them into one queue with a score, an owner, and follow-up already scheduled.",
    costs: [
      { label: "Quote requests waiting overnight", detail: "The first company to respond usually wins the job." },
      { label: "Estimating rebuilt from scratch", detail: "The same line items retyped for every quote." },
      { label: "Job status living in text threads", detail: "Nobody can answer where a job stands without asking three people." },
      { label: "Site documents chased by hand", detail: "Insurance, permits, and licences tracked in a folder and a memory." },
    ],
    example: "A fit-out quote request comes in at 9pm, is scored against your criteria, lands in the CRM with an owner, and has a confirmation out before anyone opens a laptop.",
  },
  {
    id: "service",
    label: "Service businesses",
    lede: "Bookings, questions, and repeat customers arrive across too many channels. YinTech puts them in one system that answers, records, and follows up.",
    costs: [
      { label: "Enquiries split across channels", detail: "Form, inbox, chat, and phone, each with its own memory." },
      { label: "Scheduling done by conversation", detail: "Every booking costs two or three messages." },
      { label: "Customer history in someone's head", detail: "The last visit, the last complaint, the last price quoted." },
      { label: "Repeat work never asked for", detail: "Dormant customers who would have booked again if asked." },
    ],
    example: "A booking request is captured from chat, matched to an existing customer record, scheduled, and confirmed — with the history attached for whoever takes the job.",
  },
  {
    id: "sales",
    label: "Sales teams",
    lede: "Inbound arrives faster than it gets worked. YinTech qualifies it, routes it, and keeps the sequence running so nothing dies in an inbox.",
    costs: [
      { label: "Leads scored by whoever is free", detail: "Qualification that changes depending on the day." },
      { label: "Follow-up that stops after one try", detail: "Most replies come after the second and third touch." },
      { label: "Pipeline reported from memory", detail: "A spreadsheet rebuilt every Monday morning." },
      { label: "Old lists never reopened", detail: "Months of dormant interest sitting untouched." },
    ],
    example: "An inbound demo request is scored, routed to the right rep, entered in the CRM, and put into a sequence that stops the moment a human replies.",
  },
];

export const v4Hero = {
  eyebrow: "AI automation & business systems",
  title: "See your operation",
  titleAccent: "as a system.",
  body: "YinTech maps how your business actually runs, then builds the connected system that runs it — capture, qualification, records, follow-up, and visibility on one foundation.",
  primary: { label: "Book an automation audit", href: "/v4/contact" },
  secondary: { label: "Build your scope", href: "/v4#scope" },
};

/** What the audit actually is, so booking one is not a leap of faith. */
export const auditSteps = [
  {
    index: "01",
    label: "A working session",
    body: "Forty-five minutes on the processes that consume the most time. No deck, no pitch — we map what you already do.",
  },
  {
    index: "02",
    label: "A written system map",
    body: "Your current process end to end, then the same process redrawn as a system: what triggers each step, who owns it, what stays with a person.",
  },
  {
    index: "03",
    label: "Scope and fixed pricing",
    body: "What we would build, in what order, at the prices published on this site. You keep the map whether or not you build with us.",
  },
];

export const principles = [
  {
    title: "Workflow before software",
    body: "We study the operation before proposing anything. The process decides the system, not the other way around.",
  },
  {
    title: "People keep the decisions",
    body: "Automation drafts, routes, scores, and records. Approvals and judgement stay with your team.",
  },
  {
    title: "One foundation, not five tools",
    body: "Every build shares the same data model, so the next system extends the last instead of duplicating it.",
  },
  {
    title: "You own what we build",
    body: "The system runs on your accounts and your data. Monthly covers monitoring and refinement, not access to your own operation.",
  },
];

export const processSteps = [
  { index: "01", label: "Audit", body: "A working session on the processes that cost the most time, and what they cost each week." },
  { index: "02", label: "Map", body: "Your process documented end to end, then redrawn as the system it should be." },
  { index: "03", label: "Build", body: "Workflows, data structure, interface, and automations built against the approved map." },
  { index: "04", label: "Operate", body: "Monitoring, fixes, and refinement as volume grows and the process changes." },
];
