"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { money } from "@/content/pricing";
import { serviceCategories } from "@/content/services";

/**
 * The audit request form. The scope arrives as `?scope=id,id` from the
 * builder on the homepage, so a request can carry a priced selection without
 * any backend holding state between the two pages.
 */
export function AuditForm({ endpoint }: { endpoint: string }) {
  const params = useSearchParams();
  const scopeParam = params.get("scope") ?? "";

  const scoped = useMemo(() => {
    if (!scopeParam) return [];
    const ids = new Set(scopeParam.split(",").filter(Boolean));
    return serviceCategories
      .flatMap((category) => category.services)
      .filter((service) => ids.has(service.id));
  }, [scopeParam]);

  const totals = useMemo(() => {
    const setup = scoped.reduce(
      (sum, s) => sum + (s.setupPrice ?? s.buildPrice ?? 0),
      0,
    );
    const monthly = scoped.reduce((sum, s) => sum + (s.monthlyPrice ?? 0), 0);
    return { setup, monthly };
  }, [scoped]);

  return (
    <form action={endpoint} className="v4-form" method="post">
      <input
        name="_subject"
        type="hidden"
        value="New YinTech automation audit request"
      />
      <input name="_next" type="hidden" value="/thank-you" />
      {/* Honeypot: real people leave it empty, most bots do not. */}
      <input
        aria-hidden="true"
        autoComplete="off"
        className="v4-honeypot"
        name="company_website_confirm"
        tabIndex={-1}
      />

      {scoped.length > 0 ? (
        <div className="v4-form-scope">
          <p className="v4-eyebrow">Scope from the builder</p>
          <ul>
            {scoped.map((service) => (
              <li key={service.id}>{service.name}</li>
            ))}
          </ul>
          <p className="v4-form-scope-total">
            {money(totals.setup)} setup · {money(totals.monthly)}/month before
            any Automation OS saving
          </p>
          <input
            name="requested_scope"
            type="hidden"
            value={scoped.map((s) => s.name).join(", ")}
          />
        </div>
      ) : null}

      <div className="v4-form-grid">
        <Field label="Name" name="name" required />
        <Field label="Work email" name="work_email" required type="email" />
        <Field label="Company" name="company" required />
        <Field label="Phone" name="phone" type="tel" />
      </div>

      <label className="v4-field">
        <span>What process takes too much time?</span>
        <textarea name="time_consuming_process" required rows={5} />
      </label>

      <p className="v4-form-note">
        Please don&rsquo;t include passwords, API keys, payment details, or
        confidential client records.
      </p>

      <button className="v4-button v4-button-primary" type="submit">
        Request an audit
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  required,
  type = "text",
}: {
  label: string;
  name: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <label className="v4-field">
      <span>
        {label}
        {required ? <em aria-hidden="true">*</em> : null}
      </span>
      <input name={name} required={required} type={type} />
    </label>
  );
}
