/**
 * Copy for the V2 cinematic concept. V1 content stays untouched in
 * `content/site.ts` and `content/services.ts`; pricing is shared from
 * `content/services.ts` so both concepts quote identical numbers.
 */

export const v2Site = {
  name: "YinTech",
  base: "/v2",
  nav: [
    { label: "Services", href: "/v2/services" },
    { label: "Automation OS", href: "/v2/automation-os" },
    { label: "How It Works", href: "/v2/how-it-works" },
    { label: "About", href: "/v2/about" },
  ],
  cta: { label: "Book an Audit", href: "/v2/contact" },
};

export const heroCopy = {
  eyebrow: "AI + Automation + Business Systems",
  title: "Build a smarter way to run your business.",
  body: "YinTech designs practical AI automation and custom business systems around the way your company actually works.",
  primary: { label: "Book an Automation Audit", href: "/v2/contact" },
  secondary: { label: "Explore Automation OS", href: "/v2/automation-os" },
};

export const painPoints = [
  "Leads slipping through the cracks",
  "Repetitive admin work",
  "Disconnected customer information",
  "Slow quoting and reporting",
];

export const buildChapters = [
  {
    id: "lead-sales",
    title: "Lead & Sales Automation",
    body: "Every inquiry is captured, qualified against your criteria, and routed to the right owner with follow-up already scheduled.",
    href: "/v2/services#sales-leads",
  },
  {
    id: "crm-systems",
    title: "CRM & Business Systems",
    body: "One record for every customer: activity, status, documents, and the operating numbers your team reviews each week.",
    href: "/v2/services#systems",
  },
];

export const buildLinks = [
  { title: "Quotes & Proposals", body: "Consistent documents from structured customer data.", href: "/v2/services#operations" },
  { title: "Internal Business Apps", body: "Purpose-built tools that replace fragile spreadsheets.", href: "/v2/services#systems" },
  { title: "Knowledge & Reporting", body: "Answers and recurring reports without the file hunt.", href: "/v2/services#operations" },
  { title: "Websites & Portals", body: "Public and internal front doors wired into the workflow.", href: "/v2/services#websites" },
];

export const osModules = [
  { id: "lead", label: "Lead", detail: "Capture" },
  { id: "qualification", label: "AI Qualification", detail: "Score" },
  { id: "crm", label: "CRM", detail: "Record" },
  { id: "follow-up", label: "Follow-Up", detail: "Sequence" },
  { id: "dashboard", label: "Dashboard", detail: "Visibility" },
];

export const processSteps = [
  { number: "01", title: "Discover", body: "We learn how your business handles leads, customers, quoting, reporting, and internal process today." },
  { number: "02", title: "Design", body: "We map the workflow and decide what should be automated before anything gets built." },
  { number: "03", title: "Build", body: "YinTech builds the workflows, interface, data structure, and automations." },
  { number: "04", title: "Improve", body: "We monitor the system, fix issues, and refine workflows as the business changes." },
];

export const howItWorksSteps = [
  { number: "01", title: "Automation Audit", body: "A working session on the processes that consume the most time, and what they cost you each week." },
  { number: "02", title: "System Map", body: "Your current process is documented end to end, then redrawn as the system it should be." },
  { number: "03", title: "Proposal", body: "Scope, sequence, and fixed pricing. You see exactly what gets built and in what order." },
  { number: "04", title: "Build", body: "Workflows, data structure, interface, and automations are built against the approved map." },
  { number: "05", title: "Test", body: "Real records, real edge cases, and a review pass with the people who will use it daily." },
  { number: "06", title: "Deploy", body: "The system goes live alongside your current process until the handover is clean." },
  { number: "07", title: "Manage", body: "Monitoring, fixes, and refinement as volume grows and the operation changes." },
];

export const principles = [
  { title: "Workflow first", body: "We study the operation before proposing software. The process decides the system, not the other way around." },
  { title: "Human controlled", body: "Automation drafts, routes, and organizes. People keep the decisions that matter." },
  { title: "Connected, not fragmented", body: "Each build shares the same data foundation instead of adding another disconnected tool." },
  { title: "Built to expand", body: "Phase 1 systems are structured so deeper integrations can be added without a rebuild." },
];
