"use client";

import { useState } from "react";
import { industries, type IndustryId } from "@/content/v4";

/**
 * Reframes the same services in the visitor's own vocabulary. A contractor
 * recognises "quote request"; a sales lead recognises "inbound demo". Generic
 * copy loses both, and every variant describes the same build.
 */
export function IndustrySwitch() {
  const [active, setActive] = useState<IndustryId>("contracting");
  const industry = industries.find((item) => item.id === active) ?? industries[0];

  return (
    <div className="v4-industry">
      <div className="v4-industry-tabs" role="tablist" aria-label="Choose your operation">
        {industries.map((item) => (
          <button
            aria-selected={item.id === active}
            className="v4-industry-tab"
            key={item.id}
            onClick={() => setActive(item.id)}
            role="tab"
            type="button"
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="v4-industry-panel" role="tabpanel">
        <p className="v4-industry-lede">{industry.lede}</p>

        <ol className="v4-cost-list">
          {industry.costs.map((cost, index) => (
            <li key={cost.label}>
              <span className="v4-cost-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="v4-cost-body">
                <strong>{cost.label}</strong>
                <span>{cost.detail}</span>
              </span>
            </li>
          ))}
        </ol>

        <p className="v4-industry-example">
          <span className="v4-eyebrow">With a system</span>
          {industry.example}
        </p>
      </div>
    </div>
  );
}
