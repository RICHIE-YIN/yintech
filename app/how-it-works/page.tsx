import type { Metadata } from "next";
import { Button, CTASection, PageHero, Section, VisualPanel } from "@/components/ui";

export const metadata: Metadata = {
  title: "How YinTech Works | Automation Audit to Managed System",
  description:
    "YinTech starts with the workflow, maps the system, proposes clear scope, builds, tests, deploys, and manages practical automation.",
};

const steps = [
  ["01", "Automation Audit", "Understand the current process, bottlenecks, tools, and goals."],
  ["02", "System Map", "Document inputs, outputs, human decisions, repetitive steps, required data, failure scenarios, and security considerations."],
  ["03", "Proposal", "Define the current problem, proposed workflow, included modules, exclusions, pricing, timeline, and acceptance criteria."],
  ["04", "Build", "Develop the application, workflows, interface, and automation rules."],
  ["05", "Test", "Test happy paths, bad inputs, duplicate inputs, missing data, permission problems, and failed automation runs."],
  ["06", "Deploy", "Deploy the production environment and train the client."],
  ["07", "Manage", "Monthly service covers normal maintenance, monitoring, minor adjustments, and agreed support."],
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        copy="A useful business system starts with the way work actually moves through the company."
        title="We start with the workflow, not the technology."
      >
        <Button href="/contact">Book an Automation Audit</Button>
      </PageHero>
      <Section className="light-section">
        <div className="process-layout">
          <div className="timeline">
            {steps.map(([number, title, copy]) => (
              <article className="timeline-item" key={number}>
                <span>{number}</span>
                <div>
                  <h2>{title}</h2>
                  <p>{copy}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="process-visual">
            <VisualPanel
              image="/images/process-consulting-table.png"
              label="Workflow planning table with maps, notes, and dashboard"
            />
          </div>
        </div>
      </Section>
      <CTASection
        copy="Show YinTech the current process. We'll identify the repetitive work, the failure points, and the practical first system to build."
        title="A clear map comes before automation."
      />
    </>
  );
}
