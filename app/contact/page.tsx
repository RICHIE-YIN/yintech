import type { Metadata } from "next";
import { auditServices, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Book a Free Automation Audit | YinTech Solutions",
  description:
    "Request a free YinTech automation audit and share the repetitive workflow your business wants to improve.",
};

export default function ContactPage() {
  const formEndpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT || site.formEndpoint;

  return (
    <main className="form-page">
      <section className="contact-hero">
        <div>
          <p className="badge">AUTOMATION AUDIT</p>
          <h1>What would you automate if you could?</h1>
          <p>
            Share the workflow that takes too much time. YinTech will review
            the information before reaching out.
          </p>
        </div>
      </section>
      <form action={formEndpoint} className="audit-form" method="post">
        <input name="_subject" type="hidden" value="New YinTech Automation Audit Request" />
        <input name="_next" type="hidden" value="/thank-you" />
        <p className="form-note">
          Required fields are marked. Do not include passwords, API keys,
          payment information, or confidential client records.
        </p>
        <div className="form-grid">
          <Field label="First name" name="first_name" required />
          <Field label="Last name" name="last_name" required />
          <Field label="Work email" name="work_email" required type="email" />
          <Field label="Company" name="company" required />
          <Field label="Website" name="website" required type="url" />
          <Field label="Industry" name="industry" required />
          <Field label="Number of employees" name="employees" required />
          <label>
            Preferred contact method
            <select name="preferred_contact_method" required>
              <option value="">Select one</option>
              <option>Email</option>
              <option>Phone</option>
              <option>Video call</option>
            </select>
          </label>
        </div>
        <label>
          What process takes too much time?
          <textarea name="time_consuming_process" required rows={5} />
        </label>
        <fieldset>
          <legend>Which services are you interested in?</legend>
          <div className="checkbox-grid">
            {auditServices.map((service) => (
              <label key={service}>
                <input name="services" type="checkbox" value={service} />
                <span>{service}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className="form-grid">
          <Field label="Current CRM/software" name="current_software" />
          <Field label="Approximate monthly lead volume" name="monthly_lead_volume" />
        </div>
        <label>
          Anything else we should know?
          <textarea name="additional_context" rows={4} />
        </label>
        <button className="button button-primary" type="submit">
          Request My Automation Audit
        </button>
      </form>
    </main>
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
    <label>
      {label}
      <input name={name} required={required} type={type} />
    </label>
  );
}
