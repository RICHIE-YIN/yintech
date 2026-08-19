import type { Metadata } from "next";
import { PageHero, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Terms | YinTech Solutions",
  description:
    "Basic website terms for YinTech Solutions marketing content and automation audit requests.",
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        copy="These terms cover use of the public YinTech Solutions Phase 1 marketing website."
        title="Terms"
      />
      <Section className="legal-copy">
        <h2>Website content</h2>
        <p>
          Website content is provided for general business information and does
          not create a client relationship or binding proposal.
        </p>
        <h2>Pricing</h2>
        <p>
          Published pricing reflects standard Phase 1 implementations. Complex
          workflows, additional integrations, migrations, or custom scope may
          require a separate proposal.
        </p>
        <h2>Automation audit requests</h2>
        <p>
          Submitting the automation audit form authorizes YinTech to review the
          information and contact you about potential services.
        </p>
        <h2>Future review</h2>
        <p>
          These starter terms should be reviewed against the final legal entity,
          service agreement, jurisdiction, and launch domain before public use.
        </p>
      </Section>
    </>
  );
}
