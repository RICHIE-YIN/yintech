import type { Metadata } from "next";
import { SHOWCASE, Showcase } from "@/components/v4/showcase";
import { V4Button, V4Head, V4Section } from "@/components/v4/ui";
import { automationOsPricing, money } from "@/content/pricing";
import { serviceCategories } from "@/content/services";
import { OS_BUNDLE_IDS } from "@/content/v4";

export const metadata: Metadata = {
  title: "Automation OS",
  description:
    "Automation OS connects lead capture, AI qualification, CRM, follow-up, and reporting on one foundation for $2,500 setup and $700/month — $10,800 less than the same five bought separately in year one.",
};

const bundled = serviceCategories
  .flatMap((category) => category.services)
  .filter((service) => (OS_BUNDLE_IDS as readonly string[]).includes(service.id));

export default function V4AutomationOs() {
  return (
    <>
      <V4Section className="v4-page-head">
        <V4Head
          level={1}
          eyebrow="Automation OS"
          lede="Five systems that most businesses end up buying one at a time, built together on one data model — so each one makes the next cheaper instead of more complicated."
          title="One foundation instead of five subscriptions."
        />
        <div className="v4-actions">
          <V4Button href="/v4/contact">Book an audit</V4Button>
          <V4Button href="/v4#scope" variant="secondary">
            Compare it against your scope
          </V4Button>
        </div>
      </V4Section>

      <V4Section width="wide">
        <div data-reveal>
          <Showcase
            alt="Automation OS: five connected modules — Lead, AI Qualification, CRM, Follow-Up, and Dashboard — above a pipeline funnel, lead sources, performance over time, and a live activity feed."
            name={SHOWCASE.automationOs}
            priority
            sizes="(max-width: 900px) 100vw, 88vw"
          />
        </div>
      </V4Section>

      <V4Section>
        <V4Head
          eyebrow="What it replaces"
          index="01"
          lede="These are the same five services on the price list. Bought separately they come to the standalone figures below — the arithmetic is on the page, not in a claim."
          title="The five systems inside it."
        />
        <ul className="v4-bundle-list">
          {bundled.map((service) => (
            <li data-reveal key={service.id}>
              <div>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
              </div>
              <p className="v4-service-price">
                <span>
                  <strong>{money(service.setupPrice ?? 0)}</strong> setup
                </span>
                <span>
                  <strong>{money(service.monthlyPrice ?? 0)}</strong>/month
                </span>
              </p>
            </li>
          ))}
        </ul>

        <div className="v4-os-pricing" data-reveal>
          <div>
            <span className="v4-os-label">Bought separately</span>
            <strong>{money(automationOsPricing.standaloneSetup)}</strong>
            <em>
              {money(automationOsPricing.standaloneMonthly)}/mo ·{" "}
              {money(automationOsPricing.standaloneFirstYear)} year one
            </em>
          </div>
          <div data-lead="true">
            <span className="v4-os-label">Automation OS</span>
            <strong>{money(automationOsPricing.osSetup)}</strong>
            <em>
              {money(automationOsPricing.osMonthly)}/mo ·{" "}
              {money(automationOsPricing.osFirstYear)} year one
            </em>
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
    </>
  );
}
