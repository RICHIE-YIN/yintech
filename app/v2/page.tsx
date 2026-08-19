import Link from "next/link";
import {
  ConnectedOperationVisual,
  CrmVisual,
  HeroConsole,
  ManualProcessVisual,
  MappedProcessVisual,
  OsConsole,
  QualifierVisual,
} from "@/components/v2/scenes";
import { StickyScene } from "@/components/v2/sticky-scene";
import { V2Button, V2Section } from "@/components/v2/ui";
import { automationOsPricing, money } from "@/content/pricing";
import {
  buildChapters,
  buildLinks,
  heroCopy,
  osModules,
  painPoints,
  processSteps,
} from "@/content/v2";

export default function V2Home() {
  return (
    <>
      {/* Scene 1 — hero */}
      <V2Section className="v2-hero" width="wide">
        <div className="v2-hero-grid">
          <div className="v2-hero-copy">
            <p className="v2-eyebrow" data-enter="1">
              {heroCopy.eyebrow}
            </p>
            <h1 className="v2-hero-title" data-enter="2">
              {heroCopy.title}
            </h1>
            <p className="v2-hero-body" data-enter="3">
              {heroCopy.body}
            </p>
            <div className="v2-button-row" data-enter="5">
              <V2Button href={heroCopy.primary.href}>{heroCopy.primary.label}</V2Button>
              <V2Button href={heroCopy.secondary.href} variant="secondary">
                {heroCopy.secondary.label}
              </V2Button>
            </div>
          </div>
          <div className="v2-hero-visual" data-enter="4">
            <HeroConsole />
          </div>
        </div>
      </V2Section>

      {/* Scene 2 — problem statement */}
      <V2Section className="v2-statement">
        <h2 className="v2-statement-title" data-reveal>
          Your business should not run on repetitive work.
        </h2>
        <ol className="v2-statement-list">
          {painPoints.map((point, index) => (
            <li data-reveal key={point}>
              <span className="v2-statement-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="v2-statement-text">{point}</span>
            </li>
          ))}
        </ol>
        <p className="v2-statement-note" data-reveal>
          Each of these is a workflow problem before it is a software problem.
          We start by finding where the time actually goes.
        </p>
      </V2Section>

      {/* Scene 3 — system transformation */}
      <V2Section className="v2-scene-section" width="wide">
        <StickyScene
          body="We document the process you run today, redraw it as a system, then build it. Same operation, without the manual handoffs."
          eyebrow="System Transformation"
          numbered
          steps={[
            {
              id: "current",
              label: "Current Process",
              body: "A lead arrives by email. Someone reviews it when they get to it, copies it into a spreadsheet, and follows up if they remember.",
              visual: <ManualProcessVisual />,
            },
            {
              id: "mapping",
              label: "YinTech Mapping",
              body: "Every step is mapped: what triggers it, who owns it, what the system should decide, and what a person should still approve.",
              visual: <MappedProcessVisual />,
            },
            {
              id: "connected",
              label: "Connected Operation",
              body: "Capture, qualification, records, follow-up, and reporting run as one system. Your team works the exceptions instead of the admin.",
              visual: <ConnectedOperationVisual />,
            },
          ]}
          title="From workflow problem to working system."
        />
      </V2Section>

      {/* Scene 4 — what YinTech builds */}
      <V2Section className="v2-build" width="wide">
        <div className="v2-section-head" data-reveal>
          <p className="v2-eyebrow">What YinTech Builds</p>
          <h2 className="v2-scene-title">
            Systems for the work your team repeats every week.
          </h2>
        </div>

        <div className="v2-build-tiles">
          {buildChapters.map((chapter, index) => (
            <article className="v2-tile" data-reveal key={chapter.id}>
              <div className="v2-tile-copy">
                <h3>{chapter.title}</h3>
                <p>{chapter.body}</p>
                <Link className="v2-link" href={chapter.href}>
                  Explore this chapter
                </Link>
              </div>
              <div className="v2-tile-visual">
                {index === 0 ? <QualifierVisual /> : <CrmVisual />}
              </div>
            </article>
          ))}
        </div>

        <ul className="v2-build-links">
          {buildLinks.map((link) => (
            <li data-reveal key={link.title}>
              <Link href={link.href}>
                <strong>{link.title}</strong>
                <span>{link.body}</span>
              </Link>
            </li>
          ))}
        </ul>
      </V2Section>

      {/* Scene 5 — Automation OS */}
      <V2Section className="v2-os" width="wide">
        <div className="v2-os-head" data-reveal>
          <p className="v2-eyebrow">YinTech Automation OS</p>
          <h2 className="v2-display">
            Five connected systems. One automated sales operation.
          </h2>
          <p className="v2-lede">
            Instead of buying isolated automations, Automation OS connects lead
            intake, qualification, CRM, follow-up, and management visibility on
            one shared foundation.
          </p>
        </div>

        <ol className="v2-modules" data-reveal>
          {osModules.map((module) => (
            <li key={module.id}>
              <span className="v2-module-label">{module.label}</span>
              <span className="v2-module-detail">{module.detail}</span>
            </li>
          ))}
        </ol>

        <div className="v2-os-console" data-reveal>
          <OsConsole />
        </div>

        {/* Pricing reveal — editorial numbers, not cards */}
        <div className="v2-pricing" data-reveal>
          <div className="v2-pricing-figure">
            <strong>{money(automationOsPricing.standaloneSetup)}</strong>
            <span>Bought separately</span>
            <em>{money(automationOsPricing.standaloneMonthly)}/mo</em>
          </div>
          <div className="v2-pricing-figure" data-lead="true">
            <strong>{money(automationOsPricing.osSetup)}</strong>
            <span>Automation OS</span>
            <em>{money(automationOsPricing.osMonthly)}/mo</em>
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

        <div className="v2-button-row v2-centered" data-reveal>
          <V2Button href="/v2/automation-os" variant="secondary">
            See how Automation OS works
          </V2Button>
        </div>
      </V2Section>

      {/* Scene 6 — process */}
      <V2Section className="v2-process">
        <div className="v2-section-head" data-reveal>
          <p className="v2-eyebrow">How We Work</p>
          <h2 className="v2-scene-title">Four steps, no mystery.</h2>
        </div>
        <ol className="v2-steps">
          {processSteps.map((step) => (
            <li data-reveal key={step.number}>
              <span className="v2-step-number">{step.number}</span>
              <div className="v2-step-copy">
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </V2Section>

      {/* Scene 7 — final CTA */}
      <V2Section className="v2-final">
        <div className="v2-final-inner" data-reveal>
          <h2 className="v2-display">
            Show us the repetitive work.
            <br />
            We&rsquo;ll show you what can be automated.
          </h2>
          <V2Button href="/v2/contact">Book an Automation Audit</V2Button>
        </div>
      </V2Section>
    </>
  );
}
