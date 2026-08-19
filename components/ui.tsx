import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";
import { money } from "@/content/pricing";

type ButtonProps = {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary" | "ghost" | "text";
  className?: string;
};

export function Button({
  children,
  href,
  variant = "primary",
  className,
}: ButtonProps) {
  return (
    <Link className={cn("button", `button-${variant}`, className)} href={href}>
      {children}
    </Link>
  );
}

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("container", className)}>{children}</div>;
}

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section className={cn("section", className)} id={id}>
      <Container>{children}</Container>
    </section>
  );
}

export function Badge({ children }: { children: ReactNode }) {
  return <p className="badge">{children}</p>;
}

export function SectionHeader({
  eyebrow,
  title,
  copy,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("section-header", align === "center" && "centered")}>
      {eyebrow ? <Badge>{eyebrow}</Badge> : null}
      <h2>{title}</h2>
      {copy ? <p>{copy}</p> : null}
    </div>
  );
}

export function Navbar() {
  return (
    <header className="site-header">
      <Container className="nav-shell">
        <Link aria-label="YinTech Solutions home" className="brand" href="/">
          <Image
            alt="YinTech Solutions"
            className="brand-logo"
            height={72}
            src="/images/yintech-logo.png"
            unoptimized
            width={240}
          />
        </Link>
        <nav aria-label="Primary navigation" className="desktop-nav">
          {site.nav.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Button className="desktop-cta" href="/contact">
          Book an Automation Audit
        </Button>
        <details className="mobile-nav">
          <summary aria-label="Open navigation">Menu</summary>
          <div className="mobile-nav-panel">
            {site.nav.map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
            <Button href="/contact">Book an Automation Audit</Button>
          </div>
        </details>
      </Container>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <Container className="footer-grid">
        <div className="footer-brand">
          <Link className="brand" href="/">
            <Image
              alt="YinTech Solutions"
              className="brand-logo"
              height={72}
              src="/images/yintech-logo.png"
              unoptimized
              width={240}
            />
          </Link>
          <p>
            AI strategy, automation, and custom business systems built around
            real operational workflows.
          </p>
        </div>
        <nav aria-label="Footer navigation">
          {site.nav.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="footer-cta">
          <p>Start with a free workflow review.</p>
          <Button href="/contact" variant="secondary">
            Book an Automation Audit
          </Button>
        </div>
        <div className="footer-bottom">
          <span>© 2026 YinTech Solutions. All rights reserved.</span>
          <span>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </span>
        </div>
      </Container>
    </footer>
  );
}

export function PageHero({
  eyebrow,
  title,
  copy,
  children,
}: {
  eyebrow?: string;
  title: string;
  copy: string;
  children?: ReactNode;
}) {
  return (
    <Section className="page-hero">
      <div className="page-hero-copy">
        {eyebrow ? <Badge>{eyebrow}</Badge> : null}
        <h1>{title}</h1>
        <p>{copy}</p>
        {children ? <div className="internal-hero-actions">{children}</div> : null}
      </div>
    </Section>
  );
}

export function FeatureCard({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <article className={cn("card feature-card", className)}>
      <h3>{title}</h3>
      <p>{children}</p>
    </article>
  );
}

export function ServiceCard({
  name,
  description,
  setupPrice,
  buildPrice,
  monthlyPrice,
  image,
}: {
  name: string;
  description: string;
  setupPrice?: number;
  buildPrice?: number;
  monthlyPrice?: number;
  image?: string;
}) {
  return (
    <article className="card service-card">
      <div className="service-card-header">
        <span aria-hidden="true" className={cn("service-card-icon", image && "has-image")}>
          {image ? (
            <Image
              alt=""
              aria-hidden="true"
              className="service-card-icon-image"
              height={64}
              src={image}
              unoptimized
              width={64}
            />
          ) : null}
        </span>
        <h3>{name}</h3>
      </div>
      <div>
        <p>{description}</p>
      </div>
      <dl className="price-row">
        <div>
          <dt className="price-label">{buildPrice ? "Build" : "Setup"}</dt>
          <dd className="price">{money(buildPrice ?? setupPrice ?? 0)}</dd>
        </div>
        {monthlyPrice ? (
          <div>
            <dt className="price-label">Monthly</dt>
            <dd className="price">{money(monthlyPrice)}/mo</dd>
          </div>
        ) : null}
      </dl>
      <Button href="/contact" variant="text">
        Discuss This Service
      </Button>
    </article>
  );
}

export function StatusDot({
  tone = "cyan",
}: {
  tone?: "cyan" | "blue" | "muted" | "warning";
}) {
  return <span aria-hidden="true" className={cn("status-dot", `status-dot-${tone}`)} />;
}

export function ProductWindow({
  title,
  status,
  children,
  className,
}: {
  title: string;
  status?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <article className={cn("product-window", className)}>
      <div className="product-window-bar">
        <div>
          <span>YinTech</span>
          <strong>{title}</strong>
        </div>
        {status ? (
          <p>
            {status}
            <StatusDot />
          </p>
        ) : (
          <span className="product-menu">...</span>
        )}
      </div>
      <div className="product-window-body">{children}</div>
    </article>
  );
}

function FieldRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="product-field-row">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function ProductActionRow() {
  return (
    <div className="product-actions">
      <span>Review Lead</span>
      <span>Send to CRM</span>
    </div>
  );
}

function FlowColumn({
  className,
  items,
  title,
}: {
  className?: string;
  items: string[];
  title: string;
}) {
  return (
    <div className={cn("flow-column", className)}>
      <h3>{title}</h3>
      <div>
        {items.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </div>
  );
}

export function ProductShowcase({
  variant,
}: {
  variant: "lead-qualification" | "email-parser" | "crm-center" | "follow-up" | "system-map";
}) {
  if (variant === "system-map") {
    return (
      <ProductWindow
        className="product-showcase product-system-map"
        title="System Map"
        status="Redesigned"
      >
        <div className="system-map-grid">
          <FlowColumn
            className="manual-flow"
            items={["Website Lead", "Manual Review", "Spreadsheet", "Manual Email"]}
            title="CURRENT PROCESS"
          />
          <FlowColumn
            className="yintech-flow"
            items={["Lead", "AI Qualification", "CRM", "Follow-Up", "Dashboard"]}
            title="YINTECH SYSTEM"
          />
        </div>
      </ProductWindow>
    );
  }

  if (variant === "email-parser") {
    return (
      <ProductWindow
        className="product-showcase product-parser"
        status="Confidence 96%"
        title="Email Parser"
      >
        <div className="parser-layout">
          <section className="product-panel">
            <h3>Incoming Email</h3>
            <FieldRow label="From" value="jason@example.com" />
            <FieldRow label="Subject" value="Need estimate for backyard pergola" />
            <p>
              Hi, I would like pricing for a backyard pergola. Timeline is
              probably 2-4 weeks if the scope works.
            </p>
          </section>
          <div className="parser-connector" aria-hidden="true">
            <StatusDot tone="blue" />
          </div>
          <section className="product-panel highlighted-panel">
            <h3>Extracted Lead</h3>
            <FieldRow label="Name" value="Jason Miller" />
            <FieldRow label="Service" value="Pergola" />
            <FieldRow label="Location" value="Bellevue, WA" />
            <FieldRow label="Timeline" value="2-4 weeks" />
            <FieldRow label="Budget" value="Not provided" />
            <div className="product-actions single-action">
              <span>Create Lead</span>
            </div>
          </section>
        </div>
      </ProductWindow>
    );
  }

  if (variant === "crm-center") {
    return (
      <ProductWindow
        className="product-showcase product-crm"
        status="Live Pipeline"
        title="CRM Center"
      >
        <div className="pipeline-summary">
          {[
            ["New", "12"],
            ["Qualified", "8"],
            ["Proposal", "4"],
            ["Won", "6"],
          ].map(([label, value]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
        <div className="lead-table">
          {[
            ["Sarah Mitchell", "Qualified", "$48k"],
            ["Jason Miller", "New", "-"],
            ["Northstar LLC", "Proposal", "$22k"],
          ].map(([name, state, value]) => (
            <div key={name}>
              <strong>{name}</strong>
              <span>{state}</span>
              <b>{value}</b>
            </div>
          ))}
        </div>
        <div className="activity-feed">
          {["Follow-up sent", "Quote viewed", "Lead qualified"].map((item) => (
            <span key={item}>
              <StatusDot tone="blue" />
              {item}
            </span>
          ))}
        </div>
        <div className="pipeline-health">
          <span>Pipeline health</span>
          <strong>82%</strong>
          <div className="progress-track" aria-hidden="true">
            <span style={{ width: "82%" }} />
          </div>
        </div>
      </ProductWindow>
    );
  }

  if (variant === "follow-up") {
    return (
      <ProductWindow
        className="product-showcase product-follow-up"
        status="Active"
        title="Follow-Up Sequence"
      >
        <div className="sequence-list">
          {[
            ["Day 0", "Confirmation", "done"],
            ["Day 2", "Project follow-up", "done"],
            ["Day 5", "Scheduled", "active"],
            ["Day 10", "Pending", "muted"],
          ].map(([day, label, state]) => (
            <div className={cn("sequence-step", `sequence-${state}`)} key={day}>
              <span>{day}</span>
              <strong>{label}</strong>
            </div>
          ))}
        </div>
        <div className="pause-rules">
          <span>Pause when:</span>
          <strong>Lead replies</strong>
          <strong>Meeting booked</strong>
          <strong>Opportunity closed</strong>
        </div>
      </ProductWindow>
    );
  }

  return (
    <ProductWindow
      className="product-showcase product-lead-qualifier"
      status="Qualified"
      title="Lead Qualification"
    >
      <div className="lead-profile">
        <div>
          <strong>Sarah Mitchell</strong>
          <span>Acme Roofing</span>
        </div>
        <div className="score-ring">
          <span>87</span>
        </div>
      </div>
      <div className="product-field-grid">
        <FieldRow label="Project" value="Commercial roof replacement" />
        <FieldRow label="Budget" value="$40k-$60k" />
        <FieldRow label="Timeline" value="30-60 days" />
        <FieldRow label="Source" value="Website" />
      </div>
      <div className="qualification-block">
        <div>
          <span>Qualification</span>
          <strong>87%</strong>
        </div>
        <div className="progress-track" aria-hidden="true">
          <span style={{ width: "87%" }} />
        </div>
      </div>
      <div className="criteria-list">
        {[
          "Service match",
          "Budget threshold",
          "Valid service area",
          "Decision maker",
        ].map((item) => (
          <span key={item}>
            <StatusDot tone="cyan" />
            {item}
          </span>
        ))}
      </div>
      <ProductActionRow />
    </ProductWindow>
  );
}

function QuoteBuilderVisual() {
  return (
    <ProductWindow
      className="product-showcase product-quote-builder"
      title="Quote Builder"
      status="Draft"
    >
      <div className="quote-builder-layout">
        <section className="product-panel customer-panel">
          <h3>Customer</h3>
          <FieldRow label="Name" value="Sarah Mitchell" />
          <FieldRow label="Location" value="Bellevue, WA" />
          <FieldRow label="Service" value="Pergola Build" />
          <FieldRow label="Project size" value="16 x 20 ft" />
        </section>
        <section className="product-panel highlighted-panel quote-panel">
          <h3>Quote</h3>
          <FieldRow label="Project" value="Pergola Installation" />
          <FieldRow label="Materials" value="$8,400" />
          <FieldRow label="Labor" value="$4,200" />
          <FieldRow label="Permits" value="$650" />
          <FieldRow label="Total" value="$13,250" />
          <FieldRow label="Margin" value="28%" />
        </section>
      </div>
      <div className="approval-flow">
        <h3>Approval Workflow</h3>
        <div>
          <span className="complete">Sales Review</span>
          <span className="active">Manager Review</span>
          <span>Send to Client</span>
        </div>
      </div>
      <div className="product-actions">
        <span>Save Draft</span>
        <span>Approve Quote</span>
      </div>
    </ProductWindow>
  );
}

function WebsiteLeadVisual() {
  return (
    <ProductWindow
      className="product-showcase product-website-lead"
      title="Website Preview"
      status="Lead Capture"
    >
      <div className="website-lead-layout">
        <section className="website-preview-card">
          <span>ACME HOME SERVICES</span>
          <strong>Premium Outdoor Living</strong>
          <p>Design, estimates, and project updates in one clear workflow.</p>
          <b>Request an Estimate</b>
        </section>
        <section className="product-panel highlighted-panel">
          <h3>New Lead</h3>
          <FieldRow label="Name" value="Jason Miller" />
          <FieldRow label="Service" value="Pergola" />
          <FieldRow label="Location" value="Bellevue, WA" />
          <FieldRow label="Source" value="Website" />
          <FieldRow label="Status" value="Qualified" />
        </section>
      </div>
    </ProductWindow>
  );
}

export function ServiceCategoryProductVisual({ category }: { category: string }) {
  return (
    <div className="service-category-product">
      {category === "operations" ? <QuoteBuilderVisual /> : null}
      {category === "systems" ? <ProductShowcase variant="crm-center" /> : null}
      {category === "websites" ? <WebsiteLeadVisual /> : null}
      {category === "sales-leads" ? <ProductShowcase variant="email-parser" /> : null}
    </div>
  );
}

export function AutomationOsConsole({ compact = false }: { compact?: boolean }) {
  return (
    <ProductWindow
      className={cn("automation-console", compact && "automation-console-compact")}
      title="Automation OS"
      status="System Healthy"
    >
      <div className="automation-console-grid">
        <nav aria-label="Automation OS modules" className="automation-rail">
          {["Lead", "Qualify", "CRM", "Follow-Up", "Dashboard"].map((item, index) => (
            <span className={index === 1 ? "active" : undefined} key={item}>
              {item}
            </span>
          ))}
        </nav>
        <div className="automation-detail">
          <div className="lead-profile compact-profile">
            <div>
              <strong>Sarah Mitchell</strong>
              <span>Lead created from website intake</span>
            </div>
            <div className="score-ring small-score">
              <span>87</span>
            </div>
          </div>
          <div className="system-state-list">
            <FieldRow label="Qualification" value="87%" />
            <div className="progress-track" aria-hidden="true">
              <span style={{ width: "87%" }} />
            </div>
            <FieldRow label="CRM Record" value="Created" />
            <FieldRow label="Follow-Up" value="Scheduled" />
            <FieldRow label="Owner" value="Alex" />
          </div>
        </div>
      </div>
      <p className="automation-run">Last automation run: 2 minutes ago</p>
    </ProductWindow>
  );
}

export function WorkflowDiagram({ compact = false }: { compact?: boolean }) {
  const steps = [
    ["Lead", "Intake received"],
    ["AI Qualification", "87% match"],
    ["CRM", "Record created"],
    ["Follow-Up", "Scheduled"],
    ["Dashboard", "Owner visible"],
  ];
  return (
    <div className={cn("workflow", compact && "workflow-compact")}>
      {steps.map(([step, detail], index) => (
        <div className="workflow-node" key={step} tabIndex={0}>
          <span aria-hidden="true" className="workflow-dot" />
          <small>{String(index + 1).padStart(2, "0")}</small>
          <strong>{step}</strong>
          <span className="workflow-detail">{detail}</span>
        </div>
      ))}
    </div>
  );
}

export function CTASection({
  title,
  copy,
  button = "Book an Automation Audit",
}: {
  title: string;
  copy: string;
  button?: string;
}) {
  return (
    <Section className="final-cta">
      <div className="cta-panel">
        <div>
          <Badge>FREE AUTOMATION AUDIT</Badge>
          <h2>{title}</h2>
          <p>{copy}</p>
        </div>
        <Button href="/contact">{button}</Button>
      </div>
    </Section>
  );
}

export function VisualPanel({
  label,
  image,
}: {
  label: string;
  image: string;
}) {
  return (
    <div className="visual-panel">
      <Image
        alt={label}
        className="visual-image"
        fill
        sizes="(max-width: 980px) 100vw, 46vw"
        src={image}
        unoptimized
      />
    </div>
  );
}
