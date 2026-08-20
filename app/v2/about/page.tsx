import type { Metadata } from "next";
import { ManualProcessVisual, ManagedVisual } from "@/components/v2/scenes";
import { SHOWCASE, Showcase } from "@/components/v2/showcase";
import { V2Button, V2Section } from "@/components/v2/ui";
import { principles } from "@/content/v2";

export const metadata: Metadata = {
  title: "About | YinTech V2",
  robots: { index: false, follow: false },
};

export default function V2About() {
  return (
    <>
      <V2Section className="v2-page-hero">
        <p className="v2-eyebrow" data-enter="1">
          About YinTech
        </p>
        <h1 className="v2-display" data-enter="2">
          Technology should make a business easier to run.
        </h1>
        <p className="v2-lede" data-enter="3">
          Most operational software adds work before it removes any. YinTech
          starts from the opposite direction: understand the operation first,
          then build only what removes friction from it.
        </p>
      </V2Section>

      <V2Section className="v2-manifesto">
        <div className="v2-manifesto-inner" data-reveal>
          <p className="v2-eyebrow">Workflow-First AI</p>
          <blockquote className="v2-manifesto-quote">
            Understand how the business actually runs, remove repetitive
            friction, and build systems that make the next decision clearer.
          </blockquote>
        </div>
      </V2Section>

      <V2Section className="v2-split" width="wide">
        <div className="v2-split-grid">
          <div className="v2-split-copy" data-reveal>
            <h2 className="v2-scene-title">
              Hands-on operations, not slideware.
            </h2>
            <p>
              Every engagement starts on the floor of the business: the inbox
              that never empties, the spreadsheet three people edit, the quote
              that takes an afternoon. We map that reality before proposing
              anything.
            </p>
            <p>
              The result is software shaped by the operation, built and
              maintained by the same people who studied it.
            </p>
          </div>
          <div className="v2-split-visual" data-reveal>
            <Showcase
              alt="A dark enterprise systems composition suggesting process clarity and automation structure."
              fallback={<ManualProcessVisual />}
              name={SHOWCASE.aboutPhilosophy}
              ratio="3 / 2"
            />
          </div>
        </div>
      </V2Section>

      <V2Section>
        <div className="v2-section-head" data-reveal>
          <p className="v2-eyebrow">Principles</p>
          <h2 className="v2-scene-title">
            Four rules that keep automation practical.
          </h2>
        </div>
        <ol className="v2-steps">
          {principles.map((principle, index) => (
            <li data-reveal key={principle.title}>
              <span className="v2-step-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="v2-step-copy">
                <h3>{principle.title}</h3>
                <p>{principle.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </V2Section>

      <V2Section className="v2-split" width="wide">
        <div className="v2-split-grid v2-split-reverse">
          <div className="v2-split-copy" data-reveal>
            <h2 className="v2-scene-title">Built, then kept running.</h2>
            <p>
              A system that nobody maintains becomes the next problem. YinTech
              stays on after launch: monitoring, fixing, and refining as volume
              grows and the process changes.
            </p>
            <V2Button href="/v2/contact">Book an Automation Audit</V2Button>
          </div>
          <div className="v2-split-visual" data-reveal>
            <ManagedVisual />
          </div>
        </div>
      </V2Section>
    </>
  );
}
