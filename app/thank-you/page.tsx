import type { Metadata } from "next";
import { Button, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Automation Audit Request Received | YinTech Solutions",
  description: "Your YinTech automation audit request has been received.",
};

export default function ThankYouPage() {
  return (
    <PageHero
      copy="Thanks - your request is in. YinTech will review the workflow information you provided before reaching out."
      title="Your automation audit request is in."
    >
      <Button href="/">Return Home</Button>
    </PageHero>
  );
}
