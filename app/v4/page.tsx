import type { Metadata } from "next";
import { Estimator } from "@/components/v4/estimator";
import { IndustrySwitch } from "@/components/v4/industry-switch";
import { SHOWCASE, Showcase, resolveShowcase } from "@/components/v4/showcase";
import { V4Button, V4Head, V4Section } from "@/components/v4/ui";
import Image from "next/image";
import { automationOsPricing, money } from "@/content/pricing";
import { auditSteps, v4Hero } from "@/content/v4";

export const metadata: Metadata = {
  title: "YinTech Solutions | AI Automation & Business Systems",
};

const osModules = [
  { label: "Capture", detail: "Form, inbox, and chat arrive as one record" },
  { label: "Qualification", detail: "Your criteria applied to every enquiry" },
  { label: "CRM", detail: "One customer record with an owner" },
  { label: "Follow-Up", detail: "Sequences that stop when someone replies" },
  { label: "Dashboard", detail: "Pipeline and response time in one view" },
];

export default function V4Home() {
  const backdrop = resolveShowcase(SHOWCASE.heroBackdrop);

  return (
    <>
      {/* Hero */}
      <section className="v4-hero" data-backdrop={backdrop ? "true" : undefined}>
        {backdrop ? (
          <div aria-hidden="true" className="v4-hero-art">
            <Image alt="" fill priority sizes="100vw" src={backdrop.src} />
            <span className="v4-hero-scrim" />
          </div>
        ) : null}

        <div className="v4-container" data-width="wide">
          <div className="v4-hero-copy">
            <p className="v4-eyebrow" data-enter="1">
              {v4Hero.eyebrow}
            </p>
            <h1 className="v4-h1" data-enter="2">
              {v4Hero.title}{" "}
              <span className="v4-accent">{v4Hero.titleAccent}</span>
            </h1>
            <p className="v4-hero-lede" data-enter="3">
              {v4Hero.body}
            </p>
            <div className="v4-actions" data-enter="4">
              <V4Button href={v4Hero.primary.href}>{v4Hero.primary.label}</V4Button>
              <V4Button href={v4Hero.secondary.href} variant="secondary">
                {v4Hero.secondary.label}
              </V4Button>
            </div>
            <dl className="v4-hero-facts" data-enter="5">
              <div>
                <dt>Published pricing</dt>
                <dd>Every service, on the site</dd>
              </div>
              <div>
                <dt>Audit</dt>
                <dd>Free, no obligation</dd>
              </div>
              <div>
                <dt>Ownership</dt>
                <dd>Your accounts, your data</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* What it costs today — framed in the visitor's own vocabulary */}
      <V4Section className="v4-cost" id="cost">
        <V4Head
          eyebrow="What it costs today"
          index="01"
          lede="Pick the operation closest to yours. The systems are the same either way — the vocabulary is not."
          title="The work that quietly eats the week."
        />
        <IndustrySwitch />
      </V4Section>

      {/* The system */}
      <V4Section className="v4-system" id="system" width="wide">
        <V4Head
          eyebrow="The system"
          index="02"
          lede="Capture, qualification, records, follow-up, and visibility running as one connected operation instead of five disconnected tools."
          title="One path, from first enquiry to management visibility."
        />

        <ol className="v4-modules" data-reveal>
          {osModules.map((module, index) => (
            <li key={module.label}>
              <span className="v4-module-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <strong>{module.label}</strong>
              <span>{module.detail}</span>
            </li>
          ))}
        </ol>

        <div className="v4-system-visual" data-reveal>
          <Showcase
            alt="Automation OS: five connected modules — Lead, AI Qualification, CRM, Follow-Up, and Dashboard — above a pipeline funnel, lead sources, performance over time, and a live activity feed."
            name={SHOWCASE.automationOs}
            sizes="(max-width: 900px) 100vw, 90vw"
          />
        </div>

        <div className="v4-os-pricing" data-reveal>
          <div>
            <span className="v4-os-label">Bought separately</span>
            <strong>{money(automationOsPricing.standaloneSetup)}</strong>
            <em>{money(automationOsPricing.standaloneMonthly)}/mo</em>
          </div>
          <div data-lead="true">
            <span className="v4-os-label">Automation OS</span>
            <strong>{money(automationOsPricing.osSetup)}</strong>
            <em>{money(automationOsPricing.osMonthly)}/mo</em>
          </div>
          <div data-saving="true">
            <span className="v4-os-label">Year one saving</span>
            <strong>{money(automationOsPricing.firstYearSavings)}</strong>
            <em>
              {money(automationOsPricing.setupSavings)} upfront +{" "}
              {money(automationOsPricing.monthlySavings)}/mo
            </em>
          </div>
        </div>
      </V4Section>

      {/* Scope builder */}
      <V4Section className="v4-scope" id="scope" width="wide">
        <V4Head
          eyebrow="Build your scope"
          index="03"
          lede="Every price here is the one published on the services page. Select what you are considering and the totals update — including what the same five systems cost on Automation OS."
          title="Price it yourself, before you talk to anyone."
        />
        <Estimator />
      </V4Section>

      {/* The audit */}
      <V4Section className="v4-audit" id="audit">
        <V4Head
          eyebrow="The audit"
          index="04"
          lede="Booking an audit is not a sales call with a different name. Here is exactly what happens and what you leave with."
          title="What you get before you spend anything."
        />
        <ol className="v4-audit-steps">
          {auditSteps.map((step) => (
            <li data-reveal key={step.index}>
              <span className="v4-audit-index">{step.index}</span>
              <div>
                <h3>{step.label}</h3>
                <p>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="v4-actions v4-actions-center" data-reveal>
          <V4Button href="/v4/contact">Book an automation audit</V4Button>
          <V4Button href="/v4/how-it-works" variant="secondary">
            See the full process
          </V4Button>
        </div>
      </V4Section>
    </>
  );
}
