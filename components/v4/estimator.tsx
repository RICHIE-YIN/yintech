"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { automationOsPricing, money } from "@/content/pricing";
import { serviceCategories, type Service } from "@/content/services";
import { OS_BUNDLE_IDS } from "@/content/v4";

const BUNDLE = new Set<string>(OS_BUNDLE_IDS);

function setupOf(service: Service): number {
  return service.setupPrice ?? service.buildPrice ?? 0;
}

/**
 * Scope builder. Every figure is computed from `content/services.ts`, so the
 * page cannot drift from the price list, and the Automation OS saving is
 * arithmetic the visitor can check rather than a claim: the five bundled
 * services sum to exactly the standalone figures in `content/pricing.ts`.
 */
export function Estimator() {
  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(OS_BUNDLE_IDS),
  );

  const all = useMemo(
    () => serviceCategories.flatMap((category) => category.services),
    [],
  );

  const chosen = useMemo(
    () => all.filter((service) => selected.has(service.id)),
    [all, selected],
  );

  const totals = useMemo(() => {
    const setup = chosen.reduce((sum, service) => sum + setupOf(service), 0);
    const monthly = chosen.reduce(
      (sum, service) => sum + (service.monthlyPrice ?? 0),
      0,
    );

    // Every bundled service selected: Automation OS replaces them outright.
    const bundleCovered = OS_BUNDLE_IDS.every((id) => selected.has(id));
    const extras = chosen.filter((service) => !BUNDLE.has(service.id));
    const extrasSetup = extras.reduce((sum, s) => sum + setupOf(s), 0);
    const extrasMonthly = extras.reduce(
      (sum, s) => sum + (s.monthlyPrice ?? 0),
      0,
    );

    const osSetup = automationOsPricing.osSetup + extrasSetup;
    const osMonthly = automationOsPricing.osMonthly + extrasMonthly;

    return {
      setup,
      monthly,
      firstYear: setup + monthly * 12,
      bundleCovered,
      osSetup,
      osMonthly,
      osFirstYear: osSetup + osMonthly * 12,
      saving: setup + monthly * 12 - (osSetup + osMonthly * 12),
    };
  }, [chosen, selected]);

  const toggle = (id: string) => {
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Hand the selection to the contact form so the audit request arrives with
  // the scope attached, no backend involved.
  const contactHref = chosen.length
    ? `/v4/contact?scope=${encodeURIComponent(chosen.map((s) => s.id).join(","))}`
    : "/v4/contact";

  return (
    <div className="v4-estimator">
      <div className="v4-estimator-picker">
        {serviceCategories.map((category) => (
          <fieldset className="v4-estimator-group" key={category.id}>
            <legend>{category.title}</legend>
            <div className="v4-estimator-options">
              {category.services.map((service) => {
                const active = selected.has(service.id);
                return (
                  <label
                    className="v4-option"
                    data-active={active || undefined}
                    key={service.id}
                  >
                    <input
                      checked={active}
                      onChange={() => toggle(service.id)}
                      type="checkbox"
                    />
                    <span className="v4-option-body">
                      <span className="v4-option-name">
                        {service.name}
                        {BUNDLE.has(service.id) ? (
                          <span className="v4-option-tag">In Automation OS</span>
                        ) : null}
                      </span>
                      <span className="v4-option-price">
                        {money(setupOf(service))}
                        <em>
                          {service.buildPrice ? " build" : " setup"} ·{" "}
                          {money(service.monthlyPrice ?? 0)}/mo
                        </em>
                      </span>
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>

      <aside aria-live="polite" className="v4-estimator-summary">
        <div className="v4-summary-card">
          <p className="v4-eyebrow">Your scope</p>
          <p className="v4-summary-count">
            {chosen.length === 0
              ? "Nothing selected yet"
              : `${chosen.length} ${chosen.length === 1 ? "system" : "systems"}`}
          </p>

          <dl className="v4-summary-figures">
            <div>
              <dt>Setup</dt>
              <dd>{money(totals.setup)}</dd>
            </div>
            <div>
              <dt>Monthly</dt>
              <dd>{money(totals.monthly)}</dd>
            </div>
            <div>
              <dt>First year</dt>
              <dd>{money(totals.firstYear)}</dd>
            </div>
          </dl>

          {totals.bundleCovered ? (
            <div className="v4-summary-os">
              <p className="v4-summary-os-head">
                These five run on Automation OS instead
              </p>
              <dl className="v4-summary-figures">
                <div>
                  <dt>Setup</dt>
                  <dd>{money(totals.osSetup)}</dd>
                </div>
                <div>
                  <dt>Monthly</dt>
                  <dd>{money(totals.osMonthly)}</dd>
                </div>
                <div>
                  <dt>First year</dt>
                  <dd>{money(totals.osFirstYear)}</dd>
                </div>
              </dl>
              <p className="v4-summary-saving">
                <strong>{money(totals.saving)}</strong>
                <span>saved in year one</span>
              </p>
            </div>
          ) : (
            <p className="v4-summary-hint">
              Select lead qualification, email parsing, follow-up, CRM, and the
              dashboard to see the Automation OS price for the same five.
            </p>
          )}

          <Link className="v4-button v4-button-primary" href={contactHref}>
            Send this scope with an audit request
          </Link>
          <p className="v4-summary-note">
            Prices are the same ones published on the services page. An audit
            confirms scope before anything is committed.
          </p>
        </div>
      </aside>
    </div>
  );
}
