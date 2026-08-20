import type { Metadata } from "next";
import { SHOWCASE, Showcase } from "@/components/v4/showcase";
import { V4Button, V4Head, V4Section } from "@/components/v4/ui";
import { auditSteps, processSteps } from "@/content/v4";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "Audit, map, build, operate. What happens at each stage of a YinTech engagement, what you receive, and what stays yours.",
};

export default function V4HowItWorks() {
  return (
    <>
      <V4Section className="v4-page-head">
        <V4Head
          level={1}
          eyebrow="How it works"
          lede="Nothing gets built before the process is understood and the map is approved. You always know which stage you are in and what comes next."
          title="Audit, map, build, operate."
        />
      </V4Section>

      <V4Section width="wide">
        <div data-reveal>
          <Showcase
            alt="A seven-step delivery map running from automation audit through system map, proposal, build, test, deploy, and manage, with a continuous improvement loop."
            name={SHOWCASE.howItWorksMap}
            sizes="(max-width: 900px) 100vw, 88vw"
          />
        </div>
      </V4Section>

      <V4Section>
        <V4Head
          eyebrow="The stages"
          index="01"
          title="Four stages, no mystery."
        />
        <ol className="v4-audit-steps">
          {processSteps.map((step) => (
            <li data-reveal key={step.index}>
              <span className="v4-audit-index">{step.index}</span>
              <div>
                <h3>{step.label}</h3>
                <p>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </V4Section>

      <V4Section>
        <V4Head
          eyebrow="The audit"
          index="02"
          lede="The first stage costs nothing and produces something you keep regardless of what you decide."
          title="What the first conversation actually is."
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
        </div>
      </V4Section>
    </>
  );
}
