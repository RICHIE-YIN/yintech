import type { Metadata } from "next";
import {
  Badge,
  Button,
  FeatureCard,
  PageHero,
  Section,
  SectionHeader,
  VisualPanel,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "About YinTech Solutions | Practical Business Automation",
  description:
    "YinTech Solutions designs practical automation and internal systems around real business workflows.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        copy="YinTech Solutions was built around a simple idea: businesses should not have to accept repetitive, disconnected processes just because that is how it has always been done."
        title="Technology should make a business easier to run."
      >
        <Button href="/contact">Book an Automation Audit</Button>
      </PageHero>
      <Section className="light-section">
        <div className="about-philosophy">
          <Badge>WORKFLOW-FIRST AI</Badge>
          <p className="workflow-first-copy">
            YinTech keeps the promise simple: understand how the business
            actually runs, remove repetitive friction, and build systems that
            make the next decision clearer.
          </p>
        </div>
      </Section>
      <Section>
        <div className="split">
          <div className="narrow-copy">
            <SectionHeader title="Built from hands-on operations and technology experience." />
            <p>
              We identify workflows that waste time, slow down customers, or hide
              important information, then design practical automation and software
              around the way the business actually operates.
            </p>
            <p>
              Our approach combines AI, workflow automation, and custom software
              to create systems that are useful today and capable of growing with
              the business tomorrow.
            </p>
            <p>
              YinTech is shaped by practical experience designing automation and
              internal software concepts in engineering environments. The focus is
              intentionally restrained: understand the workflow, build the right
              first system, keep decisions reviewable, and improve the operation
              over time.
            </p>
          </div>
          <VisualPanel
            image="/images/about-systems-philosophy.png"
            label="Desk with workflow maps, dashboard, documents, and systems planning notes"
          />
        </div>
      </Section>
      <Section className="light-section">
        <SectionHeader
          copy="The goal is useful automation that supports people, keeps the business in control, and improves as the workflow becomes clearer."
          title="Principles that keep automation practical."
        />
        <div className="principles-list">
          {[
            ["Understand the workflow", "Map inputs, owners, decisions, exceptions, and handoffs before building."],
            ["Build the right system", "Solve the operating problem directly instead of adding software for its own sake."],
            ["Keep decisions reviewable", "Important steps stay visible, editable, and human-controlled."],
            ["Improve over time", "Phase 1 systems are built to evolve as the business learns what works."],
          ].map(([title, copy]) => (
            <FeatureCard key={title} title={title}>
              {copy}
            </FeatureCard>
          ))}
        </div>
      </Section>
    </>
  );
}
