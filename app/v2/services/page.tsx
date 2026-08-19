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
} from "@/components/v2/scenes";
import { StickyScene } from "@/components/v2/sticky-scene";
import { V2Button, V2Section } from "@/components/v2/ui";
import { money } from "@/content/pricing";
import { serviceCategories, type Service } from "@/content/services";

export const metadata: Metadata = {
  title: "Services | YinTech V2",
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
    <div className="v2-scene-meta">
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
      <a className="v2-link" href="/v2/contact">
        Discuss this service
      </a>
    </div>
  );
}

export default function V2Services() {
  return (
    <>
      <V2Section className="v2-page-hero">
        <p className="v2-eyebrow" data-enter="1">
          Services
        </p>
        <h1 className="v2-display" data-enter="2">
          Four chapters of work your team repeats every week.
        </h1>
        <p className="v2-lede" data-enter="3">
          Each chapter is a connected system rather than a menu of features.
          Scroll a chapter and the interface follows along with the service
          being described.
        </p>
        <div className="v2-button-row" data-enter="5">
          <V2Button href="/v2/contact">Book an Automation Audit</V2Button>
          <V2Button href="/v2/automation-os" variant="secondary">
            Explore Automation OS
          </V2Button>
        </div>
      </V2Section>

      {serviceCategories.map((category, index) => (
        <V2Section
          className="v2-scene-section"
          id={category.id}
          key={category.id}
          width="wide"
        >
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
        </V2Section>
      ))}

      <V2Section className="v2-final">
        <div className="v2-final-inner" data-reveal>
          <h2 className="v2-display">
            Not sure which chapter you are in?
            <br />
            Start with the audit.
          </h2>
          <V2Button href="/v2/contact">Book an Automation Audit</V2Button>
        </div>
      </V2Section>
    </>
  );
}
