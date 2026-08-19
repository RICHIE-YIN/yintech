export const site = {
  name: "YinTech Solutions",
  tagline: "AI Strategy. Automation. Results.",
  description:
    "YinTech Solutions builds AI-powered automation, CRM systems, internal applications, dashboards, and custom business software designed around the way your company operates.",
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT || "/thank-you",
  nav: [
    { label: "Services", href: "/services" },
    { label: "Automation OS", href: "/automation-os" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "About", href: "/about" },
  ],
};

export const auditServices = [
  "Lead qualification",
  "Email lead parsing",
  "Live chat",
  "Automated follow-up",
  "Lead reactivation",
  "Quote generation",
  "Proposal generation",
  "CRM",
  "Dashboard/reporting",
  "Internal app",
  "Portal",
  "Website",
  "Automation OS",
  "Not sure - recommend something",
];
