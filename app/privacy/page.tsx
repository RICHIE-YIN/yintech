import type { Metadata } from "next";
import { PageHero, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Privacy Policy | YinTech Solutions",
  description:
    "Privacy information for the YinTech Solutions Phase 1 website and automation audit form.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        copy="This static website collects only the information submitted through the automation audit form."
        title="Privacy Policy"
      />
      <Section className="legal-copy">
        <h2>Information collected</h2>
        <p>
          YinTech collects the business contact and workflow information you
          choose to submit through the automation audit form.
        </p>
        <h2>How information is used</h2>
        <p>
          The information is used to review your request, respond to you, and
          prepare a relevant automation audit conversation.
        </p>
        <h2>Third-party form provider</h2>
        <p>
          Phase 1 form submissions are intended to be processed by a hosted form
          provider selected before launch. That provider may receive and route
          your submission to YinTech.
        </p>
        <h2>Data not requested</h2>
        <p>
          Do not submit passwords, payment information, API keys, confidential
          customer records, or production system credentials through the form.
        </p>
      </Section>
    </>
  );
}
