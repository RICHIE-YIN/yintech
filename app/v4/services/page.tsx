import type { Metadata } from "next";
import { SHOWCASE, Showcase, type ShowcaseName } from "@/components/v4/showcase";
import { V4Button, V4Head, V4Section } from "@/components/v4/ui";
import { money } from "@/content/pricing";
import { serviceCategories, type Service } from "@/content/services";

export const metadata: Metadata = {
  title: "What we build",
  description:
    "Every YinTech service with its published setup and monthly price: lead automation, quotes and operations, CRM and internal systems, and websites wired into the workflow.",
};

const CHAPTER_ART: Record<string, ShowcaseName> = {
  "sales-leads": SHOWCASE.salesAutomation,
  operations: SHOWCASE.quotesOperations,
  systems: SHOWCASE.crmSystems,
  websites: SHOWCASE.websites,
};

function Price({ service }: { service: Service }) {
  const setup = service.setupPrice ?? service.buildPrice;
  return (
    <p className="v4-service-price">
      {setup ? (
        <span>
          <strong>{money(setup)}</strong>
          {service.buildPrice ? " build" : " setup"}
        </span>
      ) : null}
      {service.monthlyPrice ? (
        <span>
          <strong>{money(service.monthlyPrice)}</strong>/month
        </span>
      ) : null}
    </p>
  );
}

export default function V4Services() {
  return (
    <>
      <V4Section className="v4-page-head">
        <V4Head
          level={1}
          eyebrow="What we build"
          lede="Four chapters of work most operations repeat every week. Prices are published here because scope should be a conversation about fit, not about cost."
          title="Systems, with the price on the label."
        />
      </V4Section>

      {serviceCategories.map((category, index) => (
        <V4Section
          className="v4-chapter"
          id={category.id}
          key={category.id}
          width="wide"
        >
          <V4Head
            eyebrow={category.title}
            index={String(index + 1).padStart(2, "0")}
            lede={category.intro}
            title={category.title}
          />

          <div className="v4-chapter-art" data-reveal>
            <Showcase
              alt={`${category.title} shown as one connected workspace.`}
              name={CHAPTER_ART[category.id]}
              sizes="(max-width: 900px) 100vw, 88vw"
            />
          </div>

          <ul className="v4-service-grid">
            {category.services.map((service) => (
              <li data-reveal key={service.id}>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                <Price service={service} />
              </li>
            ))}
          </ul>
        </V4Section>
      ))}

      <V4Section className="v4-page-tail">
        <V4Head
          eyebrow="Not sure where to start"
          lede="Build a scope from the same price list, or book an audit and we will map the process before recommending anything."
          title="Price it yourself, or have us map it."
        />
        <div className="v4-actions">
          <V4Button href="/v4#scope">Build your scope</V4Button>
          <V4Button href="/v4/contact" variant="secondary">
            Book an audit
          </V4Button>
        </div>
      </V4Section>
    </>
  );
}
