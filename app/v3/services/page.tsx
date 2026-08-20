import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  ApprovalVisual,
  ChatParserVisual,
  ComplianceVisual,
  CrmVisual,
  DashboardVisual,
  EmailParserVisual,
  FollowUpVisual,
  InternalAppVisual,
  InventoryVisual,
  KnowledgeVisual,
  PortalVisual,
  ProposalVisual,
  QualifierVisual,
  QuoteVisual,
  ReactivationVisual,
  ReportingVisual,
  WebsiteVisual,
} from "@/components/v3/scenes";
import { SHOWCASE, ShowcaseBand, type ShowcaseName } from "@/components/v3/showcase";
import { StickyScene } from "@/components/v3/sticky-scene";
import { V3Button, V3PageHero, V3Section } from "@/components/v3/ui";
import { money } from "@/content/pricing";
import { serviceCategories, type Service } from "@/content/services";

export const metadata: Metadata = {
  title: "Services | YinTech V3",
  robots: { index: false, follow: false },
};

const VISUALS: Record<string, ReactNode> = {
  "ai-lead-qualifier": <QualifierVisual />,
  "email-lead-parser": <EmailParserVisual />,
  "live-chat-lead-parser": <ChatParserVisual />,
  "automated-lead-follow-up": <FollowUpVisual />,
  "old-lead-reactivation": <ReactivationVisual />,
  "ai-quote-generator": <QuoteVisual />,
  "proposal-generator": <ProposalVisual />,
  "automated-reporting": <ReportingVisual />,
  "workflow-approval-automation": <ApprovalVisual />,
  "compliance-tracker": <ComplianceVisual />,
  "inventory-system": <InventoryVisual />,
  "basic-crm-center": <CrmVisual />,
  "executive-dashboard": <DashboardVisual />,
  "company-knowledge-ai": <KnowledgeVisual />,
  "internal-company-app": <InternalAppVisual />,
  "customer-employee-portal": <PortalVisual />,
  "custom-website": <WebsiteVisual section="Custom Website" />,
  "advanced-website": <WebsiteVisual section="Advanced Website" />,
};

const CHAPTER_SHOWCASE: Record<string, ShowcaseName> = {
  "sales-leads": SHOWCASE.salesAutomation,
  operations: SHOWCASE.quotesOperations,
  systems: SHOWCASE.crmSystems,
  websites: SHOWCASE.websites,
};

const CHAPTER_ALT: Record<string, string> = {
  "sales-leads":
    "A sales automation workspace: a lead qualification score, an email parsed into structured fields, a live chat captured as a contact, a scheduled follow-up sequence, and a table of scored leads.",
  operations:
    "An operations workspace: a quote with line items and totals, a five-stage approval workflow, quote volume and revenue charts, and an inventory table with stock levels.",
  systems:
    "A CRM workspace: a five-stage pipeline board of deals, a contact record with its activity history, and an executive dashboard of leads, opportunities, and pipeline value.",
  websites:
    "A website quote form flowing into a captured contact, a qualification score, a created customer record, and a scheduled follow-up sequence.",
};

const CHAPTER_LEDE: Record<string, string> = {
  "sales-leads":
    "Capture, qualification, follow-up, and reactivation running as one connected path from first enquiry to owned opportunity.",
  operations:
    "The document and approval work that quietly consumes a week: quoting, proposals, routing, reporting, compliance, and stock.",
  systems:
    "One workspace for customer records, operating numbers, company knowledge, internal tools, and the people outside your team.",
  websites:
    "A public front door that is wired into the same workflow as everything else, instead of emailing a form to an inbox.",
};

function ServicePricing({ service }: { service: Service }) {
  const setup = service.setupPrice ?? service.buildPrice;

  return (
    <div className="v3-scene-meta">
      {setup ? (
        <span>
          <strong>{money(setup)}</strong> {service.buildPrice ? "build" : "setup"}
        </span>
      ) : null}
      {service.monthlyPrice ? (
        <span>
          <strong>{money(service.monthlyPrice)}</strong>/month
        </span>
      ) : null}
      <a className="v3-link" href="/v3/contact">
        Discuss this service
      </a>
    </div>
  );
}

export default function V3Services() {
  return (
    <>
      <V3PageHero>
        <p className="v3-eyebrow" data-enter="1">
          Services
        </p>
        <h1 className="v3-display" data-enter="2">
          Four chapters of work your team repeats every week.
        </h1>
        <p className="v3-lede" data-enter="3">
          Each chapter is a connected system rather than a menu of features.
          Scroll a chapter and the interface follows along with the service
          being described.
        </p>
        <div className="v3-button-row" data-enter="5">
          <V3Button href="/v3/contact">Book an Automation Audit</V3Button>
          <V3Button href="/v3/automation-os" variant="secondary">
            Explore Automation OS
          </V3Button>
        </div>
      </V3PageHero>

      {serviceCategories.map((category, index) => (
        <div key={category.id}>
          <ShowcaseBand
            alt={CHAPTER_ALT[category.id] ?? `${category.title} shown as one connected workspace.`}
            eyebrow={`Chapter ${String(index + 1).padStart(2, "0")}`}
            name={CHAPTER_SHOWCASE[category.id]}
          />
          <V3Section className="v3-scene-section" id={category.id} width="wide">
            <StickyScene
              align={index % 2 === 1 ? "visual-left" : "visual-right"}
              body={CHAPTER_LEDE[category.id] ?? category.intro}
              eyebrow={`Chapter ${String(index + 1).padStart(2, "0")}`}
              id={`${category.id}-scene`}
              steps={category.services.map((service) => ({
                id: service.id,
                label: service.name,
                body: service.description,
                meta: <ServicePricing service={service} />,
                visual: VISUALS[service.id] ?? <CrmVisual />,
              }))}
              title={category.title}
            />
          </V3Section>
        </div>
      ))}

      <V3Section className="v3-final">
        <div className="v3-final-inner" data-reveal>
          <h2 className="v3-display">
            Not sure which chapter you are in?
            <br />
            Start with the audit.
          </h2>
          <V3Button href="/v3/contact">Book an Automation Audit</V3Button>
        </div>
      </V3Section>
    </>
  );
}
