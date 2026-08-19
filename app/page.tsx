import type { Metadata } from "next";
import {
  AutomationOsConsole,
  Badge,
  Button,
  CTASection,
  FeatureCard,
  ProductShowcase,
  Section,
  SectionHeader,
  ServiceCard,
  WorkflowDiagram,
} from "@/components/ui";
import { automationOsPricing, money } from "@/content/pricing";
import { publicServices } from "@/content/services";

export const metadata: Metadata = {
  title: "YinTech Solutions | AI Automation & Business Systems",
  description:
    "YinTech Solutions builds AI-powered automation, CRM systems, internal applications, dashboards, and custom business software designed around the way your company operates.",
};

const painPoints = [
  "Leads slipping through the cracks",
  "Repetitive admin work",
  "Disconnected customer information",
  "Slow quoting and reporting",
];

const buildCards = [
  ["Lead & Sales Automation", "Qualify, organize, follow up with, and reactivate leads.", "featured"],
  ["CRM & Business Systems", "Centralize leads, customers, activity, dashboards, and internal visibility.", "featured"],
  ["Quotes & Proposals", "Turn customer information into consistent quotes and proposals faster."],
  ["Internal Business Apps", "Replace fragile spreadsheets with purpose-built workflow tools."],
  ["Knowledge & Reporting", "Help teams find information and turn business data into usable reports."],
  ["Websites & Portals", "Modern customer-facing and internal applications built around real workflows."],
];

const process = [
  ["01", "Discover", "We learn how your business handles leads, customers, quoting, reporting, and internal processes."],
  ["02", "Design", "We identify what should be automated and map the system before development begins."],
  ["03", "Build", "YinTech builds the workflows, interface, data structure, and automations."],
  ["04", "Improve", "We monitor the system, fix issues, and refine workflows as your business changes."],
];

export default function Home() {
  const featuredServices = publicServices.filter((service) =>
    [
      "ai-lead-qualifier",
      "workflow-approval-automation",
      "basic-crm-center",
      "internal-company-app",
      "custom-website",
    ].includes(service.id),
  );

  return (
    <>
      <Section className="hero">
        <div className="hero-grid">
          <div className="hero-copy">
            <Badge>AI + AUTOMATION + BUSINESS SYSTEMS</Badge>
            <h1>Build a smarter way to run your business.</h1>
            <p>
              YinTech designs AI-powered automation and custom business systems
              that reduce repetitive work, organize your operation, and help
              your team move faster.
            </p>
            <div className="button-row">
              <Button href="/contact">Book an Automation Audit</Button>
              <Button href="/automation-os" variant="secondary">
                Explore Automation OS
              </Button>
            </div>
          </div>
          <ProductShowcase variant="lead-qualification" />
        </div>
      </Section>

      <Section className="proof-band">
        <div className="proof-strip" aria-label="YinTech proof points">
          <span>Custom-built for your workflow</span>
          <span>Human-controlled automation</span>
          <span>Built to grow with your business</span>
        </div>
      </Section>

      <Section className="problem-section light-section">
        <div className="problem-layout">
          <div className="problem-copy">
            <SectionHeader
              copy="Every manual handoff, missed lead, duplicate spreadsheet, and repetitive admin task creates friction. YinTech finds those bottlenecks and turns them into connected systems."
              title="Your business should not run on repetitive work."
            />
            <ol className="problem-list">
              {painPoints.map((point, index) => (
                <li key={point}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{point}</strong>
                </li>
              ))}
            </ol>
          </div>
          <ProductShowcase variant="email-parser" />
        </div>
      </Section>

      <Section className="light-section">
        <SectionHeader
          copy="YinTech builds practical systems around the operations your team already runs: lead intake, quoting, approvals, reporting, internal tools, and customer-facing workflows."
          title="Practical automation. Built around your business."
        />
        <div className="build-grid">
          {buildCards.map(([title, copy, scale]) => (
            <FeatureCard
              className={scale === "featured" ? "feature-card-featured" : undefined}
              key={title}
              title={title}
            >
              {copy}
            </FeatureCard>
          ))}
        </div>
        <Button href="/services" variant="secondary">
          View Services
        </Button>
      </Section>

      <Section className="os-band">
        <div className="os-showcase">
          <div className="section-header centered">
            <Badge>THE YINTECH AUTOMATION OS</Badge>
            <h2>Five connected systems. One automated sales operation.</h2>
            <p>
              Instead of buying isolated automations, Automation OS connects
              lead intake, qualification, follow-up, CRM, and management
              visibility into one shared workflow foundation.
            </p>
          </div>
          <WorkflowDiagram />
          <AutomationOsConsole />
          <div className="os-pricing-grid">
            <article className="pricing-card">
              <span>Buy Separately</span>
              <strong>{money(automationOsPricing.standaloneSetup)}</strong>
              <p>{money(automationOsPricing.standaloneMonthly)}/month</p>
              <small>{money(automationOsPricing.standaloneFirstYear)} first year</small>
            </article>
            <article className="pricing-card highlighted">
              <span>Automation OS</span>
              <strong>{money(automationOsPricing.osSetup)}</strong>
              <p>{money(automationOsPricing.osMonthly)}/month</p>
              <small>{money(automationOsPricing.osFirstYear)} first year</small>
            </article>
            <article className="pricing-card">
              <span>Savings</span>
              <strong>{money(automationOsPricing.firstYearSavings)}</strong>
              <p>First-year savings</p>
              <small>
                {money(automationOsPricing.setupSavings)} upfront +{" "}
                {money(automationOsPricing.monthlySavings)}/month
              </small>
            </article>
          </div>
          <Button href="/contact">Book an Automation Audit</Button>
        </div>
      </Section>

      <Section className="light-section">
        <div className="split">
          <div>
            <SectionHeader title="From workflow problem to working system." />
            <div className="steps">
              {process.map(([number, title, copy]) => (
                <article className="step" key={number}>
                  <span>{number}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <ProductShowcase variant="system-map" />
        </div>
      </Section>

      <Section className="light-section">
        <SectionHeader title="Phase 1 services that create immediate leverage." />
        <div className="grid three phase-preview-grid">
          {featuredServices.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </div>
        <Button href="/services" variant="secondary">
          View Services
        </Button>
      </Section>

      <Section>
        <div className="split reverse-split">
          <ProductShowcase variant="follow-up" />
          <div>
            <SectionHeader title="Automation should fit the business - not the other way around." />
            <div className="grid two compact-grid">
              {[
                ["Custom to your workflow", "We build around the way your company actually operates."],
                ["Connected, not fragmented", "Automations should work together instead of creating more software clutter."],
                ["Human controlled", "Important decisions stay reviewable and manageable."],
                ["Built to expand", "Phase 1 systems are structured so deeper integrations can be added later."],
              ].map(([title, copy]) => (
                <FeatureCard key={title} title={title}>
                  {copy}
                </FeatureCard>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <CTASection
        copy="Start with a free automation audit. We'll review your current workflow and identify practical opportunities to save time, improve follow-up, or centralize your operation."
        title="Show us the repetitive work. We'll show you what can be automated."
      />
    </>
  );
}
