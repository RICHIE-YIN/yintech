import type { Metadata } from "next";
import { ManualProcessVisual, ManagedVisual } from "@/components/v3/scenes";
import { SHOWCASE, Showcase } from "@/components/v3/showcase";
import { V3Button, V3PageHero, V3Section } from "@/components/v3/ui";
import { principles } from "@/content/v3";

export const metadata: Metadata = {
  title: "About | YinTech V3",
  robots: { index: false, follow: false },
};

export default function V3About() {
  return (
    <>
      <V3PageHero>
        <p className="v3-eyebrow" data-enter="1">
          About YinTech
        </p>
        <h1 className="v3-display" data-enter="2">
          Technology should make a business easier to run.
        </h1>
        <p className="v3-lede" data-enter="3">
          Most operational software adds work before it removes any. YinTech
          starts from the opposite direction: understand the operation first,
          then build only what removes friction from it.
        </p>
      </V3PageHero>

      <V3Section className="v3-manifesto">
        <div className="v3-manifesto-inner" data-reveal>
          <p className="v3-eyebrow">Workflow-First AI</p>
          <blockquote className="v3-manifesto-quote">
            Understand how the business actually runs, remove repetitive
            friction, and build systems that make the next decision clearer.
          </blockquote>
        </div>
      </V3Section>

      <V3Section className="v3-split" width="wide">
        <div className="v3-split-grid">
          <div className="v3-split-copy" data-reveal>
            <h2 className="v3-scene-title">
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
          <div className="v3-split-visual" data-reveal>
            <Showcase
              alt="A layered system architecture: an experience layer of web, mobile, and integrations above process, data, automation, and infrastructure layers, all connected vertically."
              fallback={<ManualProcessVisual />}
              name={SHOWCASE.aboutPhilosophy}
            />
          </div>
        </div>
      </V3Section>

      <V3Section>
        <div className="v3-section-head" data-reveal>
          <p className="v3-eyebrow">Principles</p>
          <h2 className="v3-scene-title">
            Four rules that keep automation practical.
          </h2>
        </div>
        <ol className="v3-steps">
          {principles.map((principle, index) => (
            <li data-reveal key={principle.title}>
              <span className="v3-step-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="v3-step-copy">
                <h3>{principle.title}</h3>
                <p>{principle.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </V3Section>

      <V3Section className="v3-split" width="wide">
        <div className="v3-split-grid v3-split-reverse">
          <div className="v3-split-copy" data-reveal>
            <h2 className="v3-scene-title">Built, then kept running.</h2>
            <p>
              A system that nobody maintains becomes the next problem. YinTech
              stays on after launch: monitoring, fixing, and refining as volume
              grows and the process changes.
            </p>
            <V3Button href="/v3/contact">Book an Automation Audit</V3Button>
          </div>
          <div className="v3-split-visual" data-reveal>
            <ManagedVisual />
          </div>
        </div>
      </V3Section>
    </>
  );
}
