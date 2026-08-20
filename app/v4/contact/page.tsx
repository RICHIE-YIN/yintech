import type { Metadata } from "next";
import { Suspense } from "react";
import { AuditForm } from "@/components/v4/audit-form";
import { V4Head, V4Section } from "@/components/v4/ui";
import { auditSteps, contactChannels } from "@/content/v4";

export const metadata: Metadata = {
  title: "Book an automation audit",
  description:
    "Tell us which process takes too much time. YinTech reviews it before getting in touch, so the first conversation is about your workflow rather than our services.",
};

export default function V4Contact() {
  const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "";
  const hasChannel = Boolean(
    contactChannels.email || contactChannels.phone || contactChannels.booking,
  );

  return (
    <>
      <V4Section className="v4-page-head">
        <V4Head
          level={1}
          eyebrow="Book an audit"
          lede="Tell us which process takes too much time. We review it before getting in touch, so the first conversation is about your workflow rather than our services."
          title="Show us the repetitive work."
        />
      </V4Section>

      <V4Section width="wide">
        <div className="v4-contact">
          <div className="v4-contact-form">
            {endpoint ? (
              <Suspense fallback={<p>Loading form…</p>}>
                <AuditForm endpoint={endpoint} />
              </Suspense>
            ) : (
              /*
               * No endpoint configured. Rendering a form here would take a
               * submission and drop it — the visitor would see a success page
               * and the request would reach nobody. Better to say so than to
               * lie about it.
               */
              <div className="v4-form-unwired" role="status">
                <p className="v4-eyebrow">Form not connected</p>
                <h2 className="v4-h2">This form isn&rsquo;t live yet.</h2>
                <p>
                  Rather than accept a request and quietly lose it, the form is
                  held back until a delivery endpoint is configured. Set{" "}
                  <code>NEXT_PUBLIC_FORM_ENDPOINT</code> to a form service URL
                  and it appears here automatically.
                </p>
                {hasChannel ? null : (
                  <p>
                    Setting <code>NEXT_PUBLIC_CONTACT_EMAIL</code> also puts a
                    direct address on this page.
                  </p>
                )}
              </div>
            )}

            {hasChannel ? (
              <div className="v4-contact-direct">
                <p className="v4-eyebrow">Or reach us directly</p>
                <ul>
                  {contactChannels.email ? (
                    <li>
                      <a href={`mailto:${contactChannels.email}`}>
                        {contactChannels.email}
                      </a>
                    </li>
                  ) : null}
                  {contactChannels.phone ? (
                    <li>
                      <a href={`tel:${contactChannels.phone.replace(/\s/g, "")}`}>
                        {contactChannels.phone}
                      </a>
                    </li>
                  ) : null}
                  {contactChannels.booking ? (
                    <li>
                      <a href={contactChannels.booking}>Pick a time directly</a>
                    </li>
                  ) : null}
                </ul>
              </div>
            ) : null}
          </div>

          <aside className="v4-contact-aside">
            <p className="v4-eyebrow">What happens next</p>
            <ol className="v4-contact-steps">
              {auditSteps.map((step) => (
                <li key={step.index}>
                  <span>{step.index}</span>
                  <div>
                    <h3>{step.label}</h3>
                    <p>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="v4-contact-promise">
              No charge, no obligation, and you keep the system map either way.
            </p>
          </aside>
        </div>
      </V4Section>
    </>
  );
}
