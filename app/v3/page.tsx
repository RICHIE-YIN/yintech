import { LatticeField } from "@/components/v3/lattice-field";
import { SystemFlight } from "@/components/v3/system-flight";
import { TiltPanel } from "@/components/v3/tilt-panel";
import { V3Button, V3Section } from "@/components/v3/ui";
import { automationOsPricing, money } from "@/content/pricing";
import { v3Hero, v3Process, v3Systems } from "@/content/v3";

export default function V3Home() {
  return (
    <>
      {/* Hero — the mesh */}
      <section className="v3-hero">
        <LatticeField />
        <div className="v3-hero-scrim" aria-hidden="true" />
        <div className="v3-container v3-hero-inner">
          <p className="v3-eyebrow" data-enter="1">
            {v3Hero.eyebrow}
          </p>
          <h1 className="v3-hero-title" data-enter="2">
            {v3Hero.title}
            <br />
            <span className="v3-accent">{v3Hero.titleAccent}</span>
          </h1>
          <p className="v3-hero-body" data-enter="3">
            {v3Hero.body}
          </p>
          <div className="v3-actions" data-enter="4">
            <V3Button href={v3Hero.primary.href}>{v3Hero.primary.label}</V3Button>
            <V3Button href={v3Hero.secondary.href} variant="ghost">
              {v3Hero.secondary.label}
            </V3Button>
          </div>
          <div className="v3-hero-strip" data-enter="5">
            <span>Lead capture</span>
            <span>AI qualification</span>
            <span>CRM</span>
            <span>Follow-up</span>
            <span>Dashboard</span>
          </div>
        </div>
        <span aria-hidden="true" className="v3-scroll-cue">
          Scroll to enter
        </span>
      </section>

      {/* Architecture — the flight */}
      <SystemFlight />

      {/* Systems — tilting panels */}
      <V3Section className="v3-systems" id="systems">
        <div className="v3-section-head">
          <p className="v3-eyebrow">Systems</p>
          <h2 className="v3-section-title">Four surfaces of one operation.</h2>
        </div>
        <div className="v3-panel-grid">
          {v3Systems.map((system) => (
            <TiltPanel className="v3-panel" key={system.id}>
              <div className="v3-panel-inner">
                <h3>{system.label}</h3>
                <p>{system.body}</p>
                <ul>
                  {system.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </TiltPanel>
          ))}
        </div>
      </V3Section>

      {/* Automation OS */}
      <V3Section className="v3-os" id="os">
        <div className="v3-os-head">
          <p className="v3-eyebrow">YinTech Automation OS</p>
          <h2 className="v3-section-title">
            Five systems on one foundation, not five tools.
          </h2>
        </div>
        <div className="v3-os-figures">
          <div>
            <strong>{money(automationOsPricing.standaloneSetup)}</strong>
            <span>Bought separately</span>
            <em>{money(automationOsPricing.standaloneMonthly)}/mo</em>
          </div>
          <div data-lead="true">
            <strong>{money(automationOsPricing.osSetup)}</strong>
            <span>Automation OS</span>
            <em>{money(automationOsPricing.osMonthly)}/mo</em>
          </div>
          <div>
            <strong>{money(automationOsPricing.firstYearSavings)}</strong>
            <span>Saved in year one</span>
            <em>
              {money(automationOsPricing.setupSavings)} upfront +{" "}
              {money(automationOsPricing.monthlySavings)}/mo
            </em>
          </div>
        </div>
      </V3Section>

      {/* Process */}
      <V3Section className="v3-process" id="process">
        <div className="v3-section-head">
          <p className="v3-eyebrow">Process</p>
          <h2 className="v3-section-title">Audit, map, build, operate.</h2>
        </div>
        <ol className="v3-process-list">
          {v3Process.map((step) => (
            <li key={step.index}>
              <span className="v3-process-index">{step.index}</span>
              <h3>{step.label}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </V3Section>
    </>
  );
}
