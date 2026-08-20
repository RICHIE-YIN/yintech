import type { Metadata } from "next";
import {
  AuditVisual,
  BuildVisual,
  ManagedVisual,
  MappedProcessVisual,
} from "@/components/v3/scenes";
import { SHOWCASE, ShowcaseBand } from "@/components/v3/showcase";
import { ScrollScene } from "@/components/v3/scroll-scene";
import { FlightScene } from "@/components/v3/flight-scene";
import { V3Button, V3PageHero, V3Section } from "@/components/v3/ui";
import { howItWorksSteps } from "@/content/v3";

export const metadata: Metadata = {
  title: "How It Works | YinTech V3",
  robots: { index: false, follow: false },
};

export default function V3HowItWorks() {
  return (
    <>
      <V3PageHero>
        <p className="v3-eyebrow" data-enter="1">
          How It Works
        </p>
        <h1 className="v3-display" data-enter="2">
          Seven steps from repetitive work to a managed system.
        </h1>
        <p className="v3-lede" data-enter="3">
          Nothing gets built before the process is understood and the map is
          approved. You always know which step you are in and what happens next.
        </p>
        <div className="v3-button-row" data-enter="5">
          <V3Button href="/v3/contact">Start with the audit</V3Button>
        </div>
      </V3PageHero>

      <ShowcaseBand
        alt="A seven-step delivery map — Automation Audit, System Map, Proposal, Build, Test, Deploy, Manage — with a continuous improvement loop returning from the last step to the second."
        caption="The delivery arc, end to end."
        eyebrow="System Map"
        name={SHOWCASE.howItWorksMap}
      />

      <V3Section className="v3-scene-section" width="wide">
        <FlightScene
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
      </V3Section>

      <V3Section>
        <div className="v3-section-head" data-reveal>
          <p className="v3-eyebrow">The Steps</p>
          <h2 className="v3-scene-title">What actually happens, in order.</h2>
        </div>
        <ScrollScene as="div" className="v3-steps-scene" mode="enter">
        <ol className="v3-steps">
          {howItWorksSteps.map((step) => (
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

      <V3Section className="v3-final">
        <div className="v3-final-inner" data-reveal>
          <h2 className="v3-display">Step one is a conversation.</h2>
          <V3Button href="/v3/contact">Book an Automation Audit</V3Button>
        </div>
      </V3Section>
    </>
  );
}
