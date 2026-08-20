import type { Metadata } from "next";
import { V3PageHero, V3Section } from "@/components/v3/ui";
import { auditServices, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Book an Automation Audit | YinTech V3",
  robots: { index: false, follow: false },
};

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
    <label className="v3-field">
      <span>{label}</span>
      <input name={name} required={required} type={type} />
    </label>
  );
}

export default function V3Contact() {
  const formEndpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT || site.formEndpoint;

  return (
    <>
      <V3PageHero>
        <p className="v3-eyebrow" data-enter="1">
          Automation Audit
        </p>
        <h1 className="v3-display" data-enter="2">
          Show us the repetitive work.
        </h1>
        <p className="v3-lede" data-enter="3">
          Tell us which process takes too much time. We review it before we get
          in touch, so the first conversation is about your workflow rather than
          our services.
        </p>
      </V3PageHero>

      <V3Section className="v3-form-section">
        <form action={formEndpoint} className="v3-form" method="post">
          <input
            name="_subject"
            type="hidden"
            value="New YinTech Automation Audit Request"
          />
          <input name="_next" type="hidden" value="/thank-you" />

          <p className="v3-form-note">
            Do not include passwords, API keys, payment information, or
            confidential client records.
          </p>

          <div className="v3-form-grid">
            <Field label="First name" name="first_name" required />
            <Field label="Last name" name="last_name" required />
            <Field label="Work email" name="work_email" required type="email" />
            <Field label="Company" name="company" required />
            <Field label="Website" name="website" type="url" />
            <Field label="Industry" name="industry" />
            <Field label="Number of employees" name="employees" />
            <label className="v3-field">
              <span>Preferred contact method</span>
              <select name="preferred_contact_method">
                <option value="">Select one</option>
                <option>Email</option>
                <option>Phone</option>
                <option>Video call</option>
              </select>
            </label>
          </div>

          <label className="v3-field">
            <span>What process takes too much time?</span>
            <textarea name="time_consuming_process" required rows={5} />
          </label>

          <fieldset className="v3-fieldset">
            <legend>Which services are you interested in?</legend>
            <div className="v3-checkboxes">
              {auditServices.map((service) => (
                <label key={service}>
                  <input name="services" type="checkbox" value={service} />
                  <span>{service}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <button className="v3-button v3-button-primary" type="submit">
            Send audit request
          </button>
        </form>
      </V3Section>
    </>
  );
}
