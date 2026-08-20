/**
 * V3 copy. Same business facts as V1/V2 — services and pricing are still
 * imported from `content/services.ts` and `content/pricing.ts` — but written
 * for the spatial, systems-diagram register the concept runs in.
 */

export const v3Site = {
  base: "/v3",
  nav: [
    { label: "Systems", href: "/v3#systems" },
    { label: "Architecture", href: "/v3#architecture" },
    { label: "Automation OS", href: "/v3#os" },
    { label: "Process", href: "/v3#process" },
  ],
  cta: { label: "Request Access", href: "/v3#contact" },
};

export const v3Hero = {
  eyebrow: "AI Automation · Business Systems",
  title: "Your operation,",
  titleAccent: "rendered as a system.",
  body: "YinTech maps how your business actually runs, then builds the connected system that runs it — capture, qualification, records, follow-up, and visibility on one foundation.",
  primary: { label: "Book an Automation Audit", href: "/v3#contact" },
  secondary: { label: "Explore the architecture", href: "/v3#architecture" },
};

/** Nodes on the flight path through the architecture scene. */
export const v3Nodes = [
  {
    id: "capture",
    index: "01",
    label: "Capture",
    detail: "Form, inbox, and chat arrive as one structured record instead of three inboxes.",
    metric: "128",
    metricLabel: "leads / week",
  },
  {
    id: "qualify",
    index: "02",
    label: "Qualification",
    detail: "Your criteria applied to every enquiry, with the score and the reasoning both visible.",
    metric: "87",
    metricLabel: "avg score",
  },
  {
    id: "records",
    index: "03",
    label: "Records",
    detail: "One customer record with owner, stage, activity, and documents attached to it.",
    metric: "318",
    metricLabel: "active records",
  },
  {
    id: "follow-up",
    index: "04",
    label: "Follow-Up",
    detail: "Sequences that run on schedule and stop the moment a person replies.",
    metric: "6m",
    metricLabel: "response time",
  },
  {
    id: "visibility",
    index: "05",
    label: "Visibility",
    detail: "Pipeline, response time, and workload for whoever runs the operation.",
    metric: "100%",
    metricLabel: "on schedule",
  },
];

export const v3Systems = [
  {
    id: "sales",
    label: "Sales & Lead Automation",
    body: "Qualification, parsing, follow-up, and reactivation running as one path from first enquiry to owned opportunity.",
    items: ["AI Lead Qualifier", "Email & Chat Parsing", "Automated Follow-Up", "Lead Reactivation"],
  },
  {
    id: "operations",
    label: "Quotes & Operations",
    body: "The document and approval work that quietly consumes a week: quoting, proposals, routing, reporting, compliance, stock.",
    items: ["Quote Generator", "Proposal Builder", "Approval Routing", "Automated Reporting"],
  },
  {
    id: "systems",
    label: "CRM & Internal Systems",
    body: "One workspace for customer records, operating numbers, company knowledge, and the people outside your team.",
    items: ["CRM Center", "Executive Dashboard", "Company Knowledge AI", "Portals & Internal Apps"],
  },
  {
    id: "web",
    label: "Websites & Digital Systems",
    body: "A public front door wired into the same workflow as everything else, instead of a form emailed to an inbox.",
    items: ["Custom Website", "Advanced Website", "Lead Capture", "CRM Sync"],
  },
];

export const v3Process = [
  { index: "01", label: "Audit", body: "A working session on the processes that consume the most time, and what they cost each week." },
  { index: "02", label: "Map", body: "Your current process documented end to end, then redrawn as the system it should be." },
  { index: "03", label: "Build", body: "Workflows, data structure, interface, and automations built against the approved map." },
  { index: "04", label: "Operate", body: "Monitoring, fixes, and refinement as volume grows and the operation changes." },
];
