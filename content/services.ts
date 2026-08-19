export type ServicePhase = 1 | 2 | 3;

export type Service = {
  id: string;
  name: string;
  phase: ServicePhase;
  category: string;
  description: string;
  setupPrice?: number;
  buildPrice?: number;
  monthlyPrice?: number;
  image?: string;
  public: boolean;
  requiresThirdParty: boolean;
  dependencies?: string[];
};

export type ServiceCategory = {
  id: string;
  title: string;
  intro: string;
  image?: string;
  services: Service[];
};

export const serviceCategories: ServiceCategory[] = [
  {
    id: "sales-leads",
    title: "Sales & Lead Automation",
    intro:
      "Capture, qualify, organize, follow up with, and reactivate leads without depending on manual handoffs.",
    image: "/images/service-sales-automation.png",
    services: [
      {
        id: "ai-lead-qualifier",
        name: "AI Lead Qualifier",
        phase: 1,
        category: "Sales & Lead Automation",
        description:
          "Applies your qualification criteria so new inquiries become useful lead records.",
        setupPrice: 500,
        monthlyPrice: 200,
        image: "/images/services/ai-lead-qualifier.png",
        public: true,
        requiresThirdParty: true,
      },
      {
        id: "email-lead-parser",
        name: "Email -> Lead Parser",
        phase: 1,
        category: "Sales & Lead Automation",
        description:
          "Turns qualified inbound emails into structured leads your team can act on.",
        setupPrice: 400,
        monthlyPrice: 150,
        image: "/images/services/email-lead-parser.png",
        public: true,
        requiresThirdParty: true,
      },
      {
        id: "live-chat-lead-parser",
        name: "Live Chat -> Lead Parser",
        phase: 1,
        category: "Sales & Lead Automation",
        description:
          "Converts chat conversations into organized follow-up opportunities.",
        setupPrice: 500,
        monthlyPrice: 200,
        image: "/images/services/live-chat-lead-parser.png",
        public: true,
        requiresThirdParty: true,
      },
      {
        id: "automated-lead-follow-up",
        name: "Automated Lead Follow-Up",
        phase: 1,
        category: "Sales & Lead Automation",
        description:
          "Keeps follow-up consistent with rule-based sequences and clear owner visibility.",
        setupPrice: 500,
        monthlyPrice: 200,
        image: "/images/services/automated-lead-follow-up.png",
        public: true,
        requiresThirdParty: true,
      },
      {
        id: "old-lead-reactivation",
        name: "Old Lead Reactivation",
        phase: 1,
        category: "Sales & Lead Automation",
        description:
          "Reopens dormant opportunities with organized lists and repeatable outreach workflows.",
        setupPrice: 600,
        monthlyPrice: 250,
        image: "/images/services/old-lead-reactivation.png",
        public: true,
        requiresThirdParty: true,
      },
    ],
  },
  {
    id: "operations",
    title: "Quotes, Proposals & Operations",
    intro:
      "Reduce repetitive document work, approvals, reporting, inventory tracking, and operational follow-through.",
    image: "/images/service-operations-automation.png",
    services: [
      {
        id: "ai-quote-generator",
        name: "AI Quote Generator",
        phase: 1,
        category: "Quotes, Proposals & Operations",
        description:
          "Turns customer details into consistent quote drafts faster.",
        setupPrice: 1000,
        monthlyPrice: 250,
        image: "/images/services/ai-quote-generator.png",
        public: true,
        requiresThirdParty: true,
      },
      {
        id: "proposal-generator",
        name: "Proposal Generator",
        phase: 1,
        category: "Quotes, Proposals & Operations",
        description:
          "Creates cleaner proposal workflows with reusable structure and fewer manual edits.",
        setupPrice: 750,
        monthlyPrice: 200,
        image: "/images/services/proposal-generator.png",
        public: true,
        requiresThirdParty: true,
      },
      {
        id: "automated-reporting",
        name: "Automated Reporting",
        phase: 1,
        category: "Quotes, Proposals & Operations",
        description:
          "Moves recurring reports from manual spreadsheet work into scheduled visibility.",
        setupPrice: 750,
        monthlyPrice: 200,
        image: "/images/services/automated-reporting.png",
        public: true,
        requiresThirdParty: true,
      },
      {
        id: "workflow-approval-automation",
        name: "Workflow / Approval Automation",
        phase: 1,
        category: "Quotes, Proposals & Operations",
        description:
          "Routes requests, decisions, and approvals through a controlled process.",
        setupPrice: 1000,
        monthlyPrice: 250,
        image: "/images/services/workflow-approval-automation.png",
        public: true,
        requiresThirdParty: true,
      },
      {
        id: "compliance-tracker",
        name: "Compliance Tracker",
        phase: 1,
        category: "Quotes, Proposals & Operations",
        description:
          "Keeps required tasks, documents, and review status in one manageable view.",
        setupPrice: 1000,
        monthlyPrice: 300,
        image: "/images/services/compliance-tracker.png",
        public: true,
        requiresThirdParty: true,
      },
      {
        id: "inventory-system",
        name: "Inventory System",
        phase: 1,
        category: "Quotes, Proposals & Operations",
        description:
          "Replaces scattered inventory lists with a purpose-built operational tracker.",
        setupPrice: 1500,
        monthlyPrice: 400,
        image: "/images/services/inventory-system.png",
        public: true,
        requiresThirdParty: true,
      },
    ],
  },
  {
    id: "systems",
    title: "CRM, Intelligence & Internal Systems",
    intro:
      "Centralize customer information, operational knowledge, dashboards, and internal workflows.",
    image: "/images/service-crm-dashboard.png",
    services: [
      {
        id: "basic-crm-center",
        name: "Basic CRM Center",
        phase: 1,
        category: "CRM, Intelligence & Internal Systems",
        description:
          "Gives leads, contacts, status, notes, and activity one reliable home.",
        setupPrice: 2000,
        monthlyPrice: 500,
        image: "/images/services/basic-crm-center.png",
        public: true,
        requiresThirdParty: true,
      },
      {
        id: "executive-dashboard",
        name: "Executive Dashboard",
        phase: 1,
        category: "CRM, Intelligence & Internal Systems",
        description:
          "Shows owners the key activity, pipeline, and operating information that matters.",
        setupPrice: 1500,
        monthlyPrice: 350,
        image: "/images/services/executive-dashboard.png",
        public: true,
        requiresThirdParty: true,
      },
      {
        id: "company-knowledge-ai",
        name: "Company Knowledge AI",
        phase: 1,
        category: "CRM, Intelligence & Internal Systems",
        description:
          "Helps teams find and use internal information without hunting through scattered files.",
        setupPrice: 1000,
        monthlyPrice: 300,
        image: "/images/services/company-knowledge-ai.png",
        public: true,
        requiresThirdParty: true,
      },
      {
        id: "internal-company-app",
        name: "Internal Company App",
        phase: 1,
        category: "CRM, Intelligence & Internal Systems",
        description:
          "Replaces fragile spreadsheets with a focused tool for the way your team works.",
        setupPrice: 2500,
        monthlyPrice: 500,
        image: "/images/services/internal-company-app.png",
        public: true,
        requiresThirdParty: false,
      },
      {
        id: "customer-employee-portal",
        name: "Customer or Employee Portal",
        phase: 1,
        category: "CRM, Intelligence & Internal Systems",
        description:
          "Creates a simple place for customers or employees to access structured workflows.",
        setupPrice: 2000,
        monthlyPrice: 400,
        image: "/images/services/customer-employee-portal.png",
        public: true,
        requiresThirdParty: false,
      },
    ],
  },
  {
    id: "websites",
    title: "Websites & Digital Systems",
    intro:
      "Build a modern public website that can later connect to lead qualification, CRM, quote requests, and other automation.",
    image: "/images/service-internal-apps.png",
    services: [
      {
        id: "custom-website",
        name: "Custom Website",
        phase: 1,
        category: "Websites & Digital Systems",
        description:
          "A polished marketing website built around clear offers and lead capture.",
        buildPrice: 1500,
        monthlyPrice: 100,
        image: "/images/services/custom-website.png",
        public: true,
        requiresThirdParty: true,
      },
      {
        id: "advanced-website",
        name: "Advanced Website",
        phase: 1,
        category: "Websites & Digital Systems",
        description:
          "A larger website or digital system with more complex content and conversion paths.",
        buildPrice: 2500,
        monthlyPrice: 150,
        image: "/images/services/advanced-website.png",
        public: true,
        requiresThirdParty: true,
      },
    ],
  },
];

export const publicServices = serviceCategories.flatMap((category) =>
  category.services.filter((service) => service.public),
);
