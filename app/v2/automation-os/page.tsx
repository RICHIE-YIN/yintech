import type { Metadata } from "next";
import {
  ConnectedOperationVisual,
  CrmVisual,
  DashboardVisual,
  EmailParserVisual,
  FollowUpVisual,
  OsConsole,
  QualifierVisual,
} from "@/components/v2/scenes";
import { SHOWCASE, Showcase } from "@/components/v2/showcase";
import { StickyScene } from "@/components/v2/sticky-scene";
import { V2Button, V2Section } from "@/components/v2/ui";
import { automationOsPricing, money } from "@/content/pricing";
import { osModules } from "@/content/v2";

export const metadata: Metadata = {
  title: "Automation OS | YinTech V2",
  robots: { index: false, follow: false },
};

const included = [
  ["Lead capture", "Website forms, inbound email, and live chat arrive as structured records."],
  ["AI qualification", "Your criteria applied to every enquiry, with the score and reasoning visible."],
  ["CRM", "One customer record with owner, stage, activity, and documents attached."],
  ["Follow-up", "Sequences that run on schedule and stop the moment a person replies."],
  ["Dashboard", "Pipeline, response time, and workload visibility for whoever runs the operation."],
];

export default function V2AutomationOs() {
  return (
    <>
      <V2Section className="v2-page-hero" width="wide">
        <div className="v2-os-hero">
          <div className="v2-os-hero-copy">
            <p className="v2-eyebrow" data-enter="1">
              YinTech Automation OS
            </p>
            <h1 className="v2-hero-title" data-enter="2">
              Five connected systems. One automated sales operation.
            </h1>
            <p className="v2-hero-body" data-enter="3">
              Automation OS is the foundation the individual services plug
              into: capture, qualification, records, follow-up, and visibility
              sharing one data model instead of five disconnected tools.
            </p>
            <div className="v2-button-row" data-enter="5">
              <V2Button href="/v2/contact">Book an Automation Audit</V2Button>
              <V2Button href="/v2/services" variant="secondary">
                See all services
              </V2Button>
            </div>
          </div>
          <div className="v2-os-hero-visual" data-enter="4">
            <Showcase
              alt="Automation OS: five connected modules — Lead, AI Qualification, CRM, Follow-Up, and Dashboard — presented as one unified interface."
              fallback={<OsConsole />}
              name={SHOWCASE.automationOs}
              priority
              ratio="16 / 10"
            />
          </div>
        </div>
      </V2Section>

      <V2Section className="v2-os" width="wide">
        <div className="v2-section-head v2-centered-head" data-reveal>
          <p className="v2-eyebrow">The Foundation</p>
          <h2 className="v2-scene-title">
            One path, from first enquiry to management visibility.
          </h2>
        </div>
        <ol className="v2-modules" data-reveal>
          {osModules.map((module) => (
            <li key={module.id}>
              <span className="v2-module-label">{module.label}</span>
              <span className="v2-module-detail">{module.detail}</span>
            </li>
          ))}
        </ol>
      </V2Section>

      <V2Section className="v2-scene-section" width="wide">
        <StickyScene
          body="Each system does one job well, and hands the next one everything it needs."
          eyebrow="Inside Automation OS"
          numbered
          steps={[
            {
              id: "capture",
              label: "Capture",
              body: "Forms, inbound email, and chat conversations become structured lead records with no retyping.",
              visual: <EmailParserVisual />,
            },
            {
              id: "qualify",
              label: "AI Qualification",
              body: "Your criteria are applied to every enquiry. The score, the reasoning, and the routing decision stay visible.",
              visual: <QualifierVisual />,
            },
            {
              id: "crm",
              label: "CRM",
              body: "One record per customer: owner, stage, history, and documents in the place your team already works.",
              visual: <CrmVisual />,
            },
            {
              id: "follow-up",
              label: "Follow-Up",
              body: "Sequences run on schedule, stop when a person replies, and show who owns what right now.",
              visual: <FollowUpVisual />,
            },
            {
              id: "dashboard",
              label: "Dashboard",
              body: "Pipeline, response time, and conversion in one view, updated without anyone building a spreadsheet.",
              visual: <DashboardVisual />,
            },
          ]}
          title="What each system does."
        />
      </V2Section>

      <V2Section>
        <div className="v2-section-head" data-reveal>
          <p className="v2-eyebrow">Included</p>
          <h2 className="v2-scene-title">What you get with Automation OS.</h2>
        </div>
        <ul className="v2-included">
          {included.map(([title, body]) => (
            <li data-reveal key={title}>
              <strong>{title}</strong>
              <span>{body}</span>
            </li>
          ))}
        </ul>
      </V2Section>

      <V2Section className="v2-os" width="wide">
        <div className="v2-section-head v2-centered-head" data-reveal>
          <p className="v2-eyebrow">Pricing</p>
          <h2 className="v2-scene-title">
            The same five systems, bought as one.
          </h2>
        </div>

        <div className="v2-pricing" data-reveal>
          <div className="v2-pricing-figure">
            <strong>{money(automationOsPricing.standaloneSetup)}</strong>
            <span>Bought separately</span>
            <em>
              {money(automationOsPricing.standaloneMonthly)}/mo ·{" "}
              {money(automationOsPricing.standaloneFirstYear)} first year
            </em>
          </div>
          <div className="v2-pricing-figure" data-lead="true">
            <strong>{money(automationOsPricing.osSetup)}</strong>
            <span>Automation OS</span>
            <em>
              {money(automationOsPricing.osMonthly)}/mo ·{" "}
              {money(automationOsPricing.osFirstYear)} first year
            </em>
          </div>
          <div className="v2-pricing-figure">
            <strong>{money(automationOsPricing.firstYearSavings)}</strong>
            <span>Saved in year one</span>
            <em>
              {money(automationOsPricing.setupSavings)} upfront +{" "}
              {money(automationOsPricing.monthlySavings)}/mo
            </em>
          </div>
        </div>

        <div className="v2-os-console" data-reveal>
          <ConnectedOperationVisual />
        </div>
      </V2Section>

      <V2Section className="v2-final">
        <div className="v2-final-inner" data-reveal>
          <h2 className="v2-display">
            See it running against
            <br />
            your own workflow.
          </h2>
          <V2Button href="/v2/contact">Book an Automation Audit</V2Button>
        </div>
      </V2Section>
    </>
  );
}
