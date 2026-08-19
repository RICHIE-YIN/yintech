import type { Metadata } from "next";
import {
  AuditVisual,
  BuildVisual,
  ManagedVisual,
  MappedProcessVisual,
} from "@/components/v2/scenes";
import { StickyScene } from "@/components/v2/sticky-scene";
import { V2Button, V2Section } from "@/components/v2/ui";
import { howItWorksSteps } from "@/content/v2";

export const metadata: Metadata = {
  title: "How It Works | YinTech V2",
  robots: { index: false, follow: false },
};

export default function V2HowItWorks() {
  return (
    <>
      <V2Section className="v2-page-hero">
        <p className="v2-eyebrow" data-enter="1">
          How It Works
        </p>
        <h1 className="v2-display" data-enter="2">
          Seven steps from repetitive work to a managed system.
        </h1>
        <p className="v2-lede" data-enter="3">
          Nothing gets built before the process is understood and the map is
          approved. You always know which step you are in and what happens next.
        </p>
        <div className="v2-button-row" data-enter="5">
          <V2Button href="/v2/contact">Start with the audit</V2Button>
        </div>
      </V2Section>

      <V2Section className="v2-scene-section" width="wide">
        <StickyScene
          body="The same operation, four times: as you run it now, as it should be mapped, as it gets built, and as it is managed once live."
          eyebrow="The Arc"
          numbered
          steps={[
            {
              id: "current",
              label: "Current Process",
              body: "We sit with the people doing the work and record where the hours actually go.",
              visual: <AuditVisual />,
            },
            {
              id: "mapped",
              label: "Mapped Workflow",
              body: "Every trigger, owner, decision, and approval is written down before a line of software exists.",
              visual: <MappedProcessVisual />,
            },
            {
              id: "build",
              label: "Build",
              body: "Delivery runs against the approved map, with a weekly walkthrough so nothing drifts.",
              visual: <BuildVisual />,
            },
            {
              id: "managed",
              label: "Managed System",
              body: "Once live, the system is monitored and refined as volume and process change.",
              visual: <ManagedVisual />,
            },
          ]}
          title="From your process to a system you can rely on."
        />
      </V2Section>

      <V2Section>
        <div className="v2-section-head" data-reveal>
          <p className="v2-eyebrow">The Steps</p>
          <h2 className="v2-scene-title">What actually happens, in order.</h2>
        </div>
        <ol className="v2-steps">
          {howItWorksSteps.map((step) => (
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

      <V2Section className="v2-final">
        <div className="v2-final-inner" data-reveal>
          <h2 className="v2-display">Step one is a conversation.</h2>
          <V2Button href="/v2/contact">Book an Automation Audit</V2Button>
        </div>
      </V2Section>
    </>
  );
}
