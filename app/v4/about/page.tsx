import type { Metadata } from "next";
import { SHOWCASE, Showcase } from "@/components/v4/showcase";
import { V4Button, V4Head, V4Section } from "@/components/v4/ui";
import { principles } from "@/content/v4";

export const metadata: Metadata = {
  title: "About",
  description:
    "YinTech studies how a business actually runs before proposing software. Workflow first, people keep the decisions, one foundation instead of five tools, and you own what gets built.",
};

export default function V4About() {
  return (
    <>
      <V4Section className="v4-page-head">
        <V4Head
          level={1}
          eyebrow="About"
          lede="Most operational software adds work before it removes any. YinTech starts from the other end: understand the operation, then build only what takes friction out of it."
          title="Technology should make a business easier to run."
        />
      </V4Section>

      <V4Section width="wide">
        <div className="v4-split" data-reveal>
          <div className="v4-split-copy">
            <h2 className="v4-h2">Hands-on operations, not slideware.</h2>
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
          <Showcase
            alt="A layered system architecture: an experience layer of web, mobile, and integrations above process, data, automation, and infrastructure layers."
            name={SHOWCASE.aboutPhilosophy}
            sizes="(max-width: 900px) 100vw, 46vw"
          />
        </div>
      </V4Section>

      <V4Section>
        <V4Head
          eyebrow="Principles"
          index="01"
          title="Four commitments that shape every build."
        />
        <ul className="v4-principles">
          {principles.map((principle) => (
            <li data-reveal key={principle.title}>
              <h3>{principle.title}</h3>
              <p>{principle.body}</p>
            </li>
          ))}
        </ul>
        <div className="v4-actions v4-actions-center" data-reveal>
          <V4Button href="/v4/contact">Book an automation audit</V4Button>
        </div>
      </V4Section>
    </>
  );
}
