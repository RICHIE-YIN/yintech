import Image from "next/image";
import Link from "next/link";
import {
  ConnectedOperationVisual,
  CrmVisual,
  HeroConsole,
  ManualProcessVisual,
  MappedProcessVisual,
  OsConsole,
  QualifierVisual,
} from "@/components/v3/scenes";
import { SHOWCASE, Showcase, resolveShowcase } from "@/components/v3/showcase";
import { ScrollScene } from "@/components/v3/scroll-scene";
import { FlightScene } from "@/components/v3/flight-scene";
import { V3Button, V3Section } from "@/components/v3/ui";
import { automationOsPricing, money } from "@/content/pricing";
import {
  buildChapters,
  buildLinks,
  heroCopy,
  osModules,
  painPoints,
  processSteps,
} from "@/content/v3";

export default function V3Home() {
  const backdrop = resolveShowcase(SHOWCASE.heroBackdrop);
  const hasBackdrop = backdrop !== null;

  return (
    <>
      {/* Scene 1 — hero */}
      <V3Section className="v3-hero" data-backdrop={hasBackdrop || undefined} width="wide">
        <div aria-hidden="true" className="v3-hero-atmosphere">
          {hasBackdrop ? (
            <>
              <Image
                alt=""
                className="v3-hero-backdrop"
                fill
                priority
                sizes="100vw"
                src={backdrop!.src}
              />
              <span className="v3-hero-scrim" />
            </>
          ) : (
            <>
              <span className="v3-hero-motif" />
              <span className="v3-hero-blueprint" />
            </>
          )}
        </div>
        <div className="v3-hero-grid">
          <div className="v3-hero-copy">
            <p className="v3-eyebrow" data-enter="1">
              {heroCopy.eyebrow}
            </p>
            <h1 className="v3-hero-title" data-enter="2">
              Build a <span className="v3-accent-word">smarter</span> way to run
              your business.
            </h1>
            <p className="v3-hero-body" data-enter="3">
              {heroCopy.body}
            </p>
            <div className="v3-button-row" data-enter="5">
              <V3Button href={heroCopy.primary.href}>{heroCopy.primary.label}</V3Button>
              <V3Button href={heroCopy.secondary.href} variant="secondary">
                {heroCopy.secondary.label}
              </V3Button>
            </div>
          </div>
          <div className="v3-hero-visual" data-enter="4">
            {hasBackdrop ? (
              <div aria-hidden="true" className="v3-hero-readouts">
                <div className="v3-hero-card" data-pos="lead">
                  <span className="v3-hero-card-label">Lead flow</span>
                  <strong className="v3-hero-card-value">128</strong>
                  <span className="v3-hero-card-meta">New leads this week</span>
                </div>
                <div className="v3-hero-card" data-pos="status">
                  <span className="v3-hero-card-label">Automation status</span>
                  <ul className="v3-hero-card-list">
                    <li>Lead qualification<span>Active</span></li>
                    <li>Follow-up sequences<span>Active</span></li>
                    <li>Quote generation<span>Active</span></li>
                    <li>Reporting<span>Active</span></li>
                  </ul>
                </div>
                <div className="v3-hero-card" data-pos="overview">
                  <span className="v3-hero-card-label">Response time</span>
                  <strong className="v3-hero-card-value">6m</strong>
                  <span className="v3-hero-card-meta">Down from 2 days</span>
                </div>
              </div>
            ) : (
              <Showcase
                alt="An inbound lead console: a scored list of new leads, a qualification score of 87, and a scheduled follow-up sequence."
                fallback={<HeroConsole />}
                name={SHOWCASE.hero}
                priority
              />
            )}
          </div>
        </div>
      </V3Section>

      {/* Scene 2 — problem statement */}
      <V3Section className="v3-statement">
        <h2 className="v3-statement-title" data-reveal>
          Your business should not run on repetitive work.
        </h2>
        <ol className="v3-statement-list">
          {painPoints.map((point, index) => (
            <li data-reveal key={point}>
              <span className="v3-statement-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="v3-statement-text">{point}</span>
            </li>
          ))}
        </ol>
        <p className="v3-statement-note" data-reveal>
          Each of these is a workflow problem before it is a software problem.
          We start by finding where the time actually goes.
        </p>
      </V3Section>

      {/* Scene 3 — system transformation */}
      <V3Section className="v3-scene-section" width="wide">
        <FlightScene
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
              visual: (
                <Showcase
                  alt="Left: a manual process scattered across an email inbox, a leads spreadsheet, and loose notes. Right: the same process as one connected system — lead capture, qualification, CRM record, follow-up, and dashboard."
                  fallback={<ConnectedOperationVisual />}
                  name={SHOWCASE.systemTransformation}
                />
              ),
            },
          ]}
          title="From workflow problem to working system."
        />
      </V3Section>

      {/* Scene 4 — what YinTech builds */}
      <V3Section className="v3-build" width="wide">
        <div className="v3-section-head" data-reveal>
          <p className="v3-eyebrow">What YinTech Builds</p>
          <h2 className="v3-scene-title">
            Systems for the work your team repeats every week.
          </h2>
        </div>

        <div className="v3-build-tiles">
          {buildChapters.map((chapter, index) => (
            <article className="v3-tile" data-reveal key={chapter.id}>
              <div className="v3-tile-copy">
                <h3>{chapter.title}</h3>
                <p>{chapter.body}</p>
                <Link className="v3-link" href={chapter.href}>
                  Explore this chapter
                </Link>
              </div>
              <div className="v3-tile-visual">
                {index === 0 ? (
                  <Showcase
                    alt="An inbound lead console: a scored list of new leads, a qualification score of 87 broken down by budget, authority, need, and timeline, and a follow-up sequence already scheduled."
                    fallback={<QualifierVisual />}
                    name={SHOWCASE.hero}
                  />
                ) : (
                  <Showcase
                    alt="A CRM workspace: a five-stage pipeline board, a contact record with its activity history, and an executive dashboard."
                    fallback={<CrmVisual />}
                    name={SHOWCASE.crmSystems}
                  />
                )}
              </div>
            </article>
          ))}
        </div>

        <ul className="v3-build-links">
          {buildLinks.map((link) => (
            <li data-reveal key={link.title}>
              <Link href={link.href}>
                <strong>{link.title}</strong>
                <span>{link.body}</span>
              </Link>
            </li>
          ))}
        </ul>
      </V3Section>

      {/* Scene 5 — Automation OS */}
      <V3Section className="v3-os" width="wide">
        <ScrollScene className="v3-os-headline-scene" mode="pin">
          <div className="v3-os-headline-pin">
            <div className="v3-os-head">
              <p className="v3-eyebrow">YinTech Automation OS</p>
              <h2 className="v3-display v3-os-headline">
                Five connected systems. One automated sales operation.
              </h2>
              <p className="v3-lede">
                Instead of buying isolated automations, Automation OS connects
                lead intake, qualification, CRM, follow-up, and management
                visibility on one shared foundation.
              </p>
            </div>
          </div>
        </ScrollScene>

        <ol className="v3-modules" data-reveal>
          {osModules.map((module) => (
            <li key={module.id}>
              <span className="v3-module-label">{module.label}</span>
              <span className="v3-module-detail">{module.detail}</span>
            </li>
          ))}
        </ol>

        <ScrollScene className="v3-os-stack" mode="enter">
        <div className="v3-os-console" data-reveal>
          <Showcase
            alt="Automation OS: five connected modules — Lead, AI Qualification, CRM, Follow-Up, and Dashboard — above a pipeline funnel, lead sources, performance over time, and a live activity feed."
            fallback={<OsConsole />}
            name={SHOWCASE.automationOs}
            sizes="(max-width: 900px) 100vw, 92vw"
          />
        </div>

        {/* Pricing reveal — editorial numbers, not cards */}
        <div className="v3-pricing" data-reveal>
          <div className="v3-pricing-figure">
            <strong>{money(automationOsPricing.standaloneSetup)}</strong>
            <span>Bought separately</span>
            <em>{money(automationOsPricing.standaloneMonthly)}/mo</em>
          </div>
          <div className="v3-pricing-figure" data-lead="true">
            <strong>{money(automationOsPricing.osSetup)}</strong>
            <span>Automation OS</span>
            <em>{money(automationOsPricing.osMonthly)}/mo</em>
          </div>
          <div className="v3-pricing-figure">
            <strong>{money(automationOsPricing.firstYearSavings)}</strong>
            <span>Saved in year one</span>
            <em>
              {money(automationOsPricing.setupSavings)} upfront +{" "}
              {money(automationOsPricing.monthlySavings)}/mo
            </em>
          </div>
        </div>

        </ScrollScene>

        <div className="v3-button-row v3-centered" data-reveal>
          <V3Button href="/v3/automation-os" variant="secondary">
            See how Automation OS works
          </V3Button>
        </div>
      </V3Section>

      {/* Scene 6 — process */}
      <V3Section className="v3-process">
        <div className="v3-section-head" data-reveal>
          <p className="v3-eyebrow">How We Work</p>
          <h2 className="v3-scene-title">Four steps, no mystery.</h2>
        </div>
        <ScrollScene as="div" className="v3-steps-scene" mode="enter">
        <ol className="v3-steps">
          {processSteps.map((step) => (
            <li data-reveal key={step.number}>
              <span className="v3-step-number">{step.number}</span>
              <div className="v3-step-copy">
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
        </ScrollScene>
      </V3Section>

      {/* Scene 7 — final CTA */}
      <V3Section className="v3-final">
        <div className="v3-final-inner" data-reveal>
          <h2 className="v3-display">
            Show us the repetitive work.
            <br />
            We&rsquo;ll show you what can be automated.
          </h2>
          <V3Button href="/v3/contact">Book an Automation Audit</V3Button>
        </div>
      </V3Section>
    </>
  );
}
