import type { Metadata } from "next";
import {
  AutomationOsConsole,
  Badge,
  Button,
  CTASection,
  PageHero,
  Section,
  WorkflowDiagram,
} from "@/components/ui";
import { automationOsPricing, money } from "@/content/pricing";

export const metadata: Metadata = {
  title: "Automation OS | Connected Lead & CRM Automation | YinTech",
  description:
    "Automation OS connects lead intake, qualification, follow-up, CRM, and management visibility into one shared system.",
};

const modules = [
  ["AI Lead Qualifier", "$500 + $200/mo", "Captures incoming lead information and applies your qualification criteria."],
  ["Email -> Lead Parser", "$400 + $150/mo", "Turns qualified inbound emails into structured leads."],
  ["Automated Lead Follow-Up", "$500 + $200/mo", "Triggers consistent follow-up based on lead status and rules."],
  ["Basic CRM Center", "$2,000 + $500/mo", "Central location for leads, contacts, pipeline status, notes, and activity."],
  ["Executive Dashboard", "$1,500 + $350/mo", "High-level visibility into lead flow, status, activity, and key operating information."],
];

export default function AutomationOsPage() {
  return (
    <>
      <PageHero
        copy="Automation OS connects the most important parts of your lead operation so information moves automatically instead of relying on manual handoffs."
        eyebrow="YINTECH AUTOMATION OS"
        title="Stop stacking tools. Build one connected workflow."
      >
        <div className="hero-price">{money(automationOsPricing.osSetup)} setup + {money(automationOsPricing.osMonthly)}/month</div>
        <Button href="/contact">Book an Automation Audit</Button>
      </PageHero>
      <Section className="os-band">
        <div className="os-showcase">
          <div className="section-header centered">
            <Badge>CONNECTED LEAD OPERATION</Badge>
            <h2>One workflow foundation instead of five isolated tools.</h2>
            <p>
              The modules share the same intake data, status model, follow-up
              rules, CRM records, and reporting layer.
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
        </div>
      </Section>
      <Section className="light-section">
        <SectionHeaderShim />
        <div className="grid three">
          {modules.map(([title, price, copy]) => (
            <article className="card" key={title}>
              <Badge>Standalone: {price}</Badge>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section>
        <div className="split">
          <div>
            <Badge>SHARED FOUNDATION</Badge>
            <h2>Built as one system, not five scattered automations.</h2>
            <p>
              Because Automation OS modules share the same data structure,
              workflow engine, and interface, YinTech can build them as one
              connected implementation rather than five isolated projects.
            </p>
          </div>
          <AutomationOsConsole compact />
        </div>
      </Section>
      <Section className="light-section">
        <div className="split">
          <div>
            <Badge>WHO IT IS FOR</Badge>
            <h2>Built for operations-heavy service businesses.</h2>
            <p>
              Good Phase 1 targets include contractors, home-service businesses,
              property-service companies, recruiting firms, professional
              services, local multi-location businesses, B2B service companies,
              sales organizations, and small or midsize businesses with repeated
              operational handoffs.
            </p>
          </div>
          <div>
            <Badge>NOT INCLUDED YET</Badge>
            <ul className="check-list muted">
              <li>AI phone receptionist or outbound calling</li>
              <li>Property-record and permit-data providers</li>
              <li>Deep ERP or production database integration</li>
              <li>Enterprise SSO or complex legacy migrations</li>
            </ul>
          </div>
        </div>
      </Section>
      <CTASection
        button="Book an Automation Audit"
        copy="Bring the lead workflow you have now. YinTech will map what can be connected, what should stay human-controlled, and what belongs in Phase 1."
        title="Ready to connect your lead operation?"
      />
    </>
  );
}

function SectionHeaderShim() {
  return (
    <div className="section-header">
      <h2>Five modules sharing one operational foundation.</h2>
      <p>
        Each module can stand alone, but the package works best when the same
        data and workflow model power the entire lead operation.
      </p>
    </div>
  );
}
