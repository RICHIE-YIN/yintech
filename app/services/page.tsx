import type { Metadata } from "next";
import {
  Button,
  PageHero,
  Section,
  SectionHeader,
  ServiceCard,
  ServiceCategoryProductVisual,
} from "@/components/ui";
import { serviceCategories } from "@/content/services";

export const metadata: Metadata = {
  title: "Business Automation Services | YinTech Solutions",
  description:
    "Phase 1 automation services for lead systems, operations workflows, CRM dashboards, internal applications, and business websites.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        copy="Start with one workflow or build several connected systems. Every Phase 1 service can operate independently or become part of a larger YinTech automation environment."
        title="Automation built for real business workflows."
      >
        <Button href="/contact">Book an Automation Audit</Button>
      </PageHero>
      {serviceCategories.map((category, index) => (
        <Section
          className={index % 2 === 0 ? "service-section light-section" : "service-section"}
          key={category.id}
        >
          <div className="service-category-layout">
            <div>
              <SectionHeader title={category.title} copy={category.intro} />
            </div>
            <ServiceCategoryProductVisual category={category.id} />
          </div>
          <div className="grid three service-grid">
            {category.services.map((service) => (
              <ServiceCard key={service.id} {...service} />
            ))}
          </div>
        </Section>
      ))}
      <Section>
        <div className="notice">
          Pricing reflects standard Phase 1 implementations. Complex workflows,
          unusually large data migrations, extensive custom functionality, or
          additional integrations may require a custom scope. Third-party usage
          fees are not included unless explicitly stated in the proposal.
        </div>
      </Section>
    </>
  );
}
