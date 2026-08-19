import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Shared building blocks for the coded YinTech product interfaces. */

export type Tone = "neutral" | "active" | "positive" | "pending";

export function StatusDot({ tone = "neutral" }: { tone?: Tone }) {
  return <span aria-hidden="true" className="v2-dot" data-tone={tone} />;
}

export function ProductWindow({
  children,
  className,
  footer,
  rail,
  section,
  size = "md",
  status,
  title,
}: {
  children: ReactNode;
  className?: string;
  footer?: ReactNode;
  rail?: RailItem[];
  section?: string;
  size?: "sm" | "md" | "lg";
  status?: { label: string; tone?: Tone };
  title: string;
}) {
  return (
    <figure className={cn("v2-window", className)} data-size={size}>
      <div className="v2-window-bar">
        <div className="v2-window-identity">
          <span className="v2-window-title">{title}</span>
          {section ? <span className="v2-window-section">{section}</span> : null}
        </div>
        {status ? (
          <span className="v2-window-status">
            <StatusDot tone={status.tone ?? "positive"} />
            {status.label}
          </span>
        ) : null}
      </div>
      <div className="v2-window-body" data-rail={rail ? "true" : undefined}>
        {rail ? <Rail items={rail} /> : null}
        <div className="v2-window-main">{children}</div>
      </div>
      {footer ? <figcaption className="v2-window-foot">{footer}</figcaption> : null}
    </figure>
  );
}

export type RailItem = { label: string; active?: boolean; count?: string };

export function Rail({ items }: { items: RailItem[] }) {
  return (
    <div className="v2-rail">
      {items.map((item) => (
        <span className="v2-rail-item" data-active={item.active || undefined} key={item.label}>
          <span className="v2-rail-label">{item.label}</span>
          {item.count ? <span className="v2-rail-count">{item.count}</span> : null}
        </span>
      ))}
    </div>
  );
}

export function Panel({
  children,
  className,
  meta,
  title,
}: {
  children: ReactNode;
  className?: string;
  meta?: string;
  title?: string;
}) {
  return (
    <section className={cn("v2-panel", className)}>
      {title ? (
        <header className="v2-panel-head">
          <h4>{title}</h4>
          {meta ? <span>{meta}</span> : null}
        </header>
      ) : null}
      {children}
    </section>
  );
}

export function PanelRow({ children }: { children: ReactNode }) {
  return <div className="v2-panel-row">{children}</div>;
}

export type RecordItem = {
  label: string;
  meta?: string;
  value?: string;
  tone?: Tone;
  active?: boolean;
};

export function RecordList({ items }: { items: RecordItem[] }) {
  return (
    <ul className="v2-records">
      {items.map((item) => (
        <li data-active={item.active || undefined} key={item.label}>
          <StatusDot tone={item.tone ?? (item.active ? "active" : "neutral")} />
          <span className="v2-record-label">{item.label}</span>
          {item.meta ? <span className="v2-record-meta">{item.meta}</span> : null}
          {item.value ? <span className="v2-record-value">{item.value}</span> : null}
        </li>
      ))}
    </ul>
  );
}

export function FieldGrid({
  fields,
}: {
  fields: Array<{ label: string; value: string; strong?: boolean }>;
}) {
  return (
    <dl className="v2-fields">
      {fields.map((field) => (
        <div key={field.label}>
          <dt>{field.label}</dt>
          <dd data-strong={field.strong || undefined}>{field.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function ScoreMeter({
  criteria,
  label,
  value,
}: {
  criteria: Array<{ label: string; state: "pass" | "watch" }>;
  label: string;
  value: number;
}) {
  return (
    <div className="v2-score">
      <div className="v2-score-head">
        <span>{label}</span>
        <strong>{value}%</strong>
      </div>
      <div className="v2-score-track">
        <span className="v2-score-fill" style={{ width: `${value}%` }} />
      </div>
      <ul className="v2-score-criteria">
        {criteria.map((item) => (
          <li data-state={item.state} key={item.label}>
            <StatusDot tone={item.state === "pass" ? "positive" : "pending"} />
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function FlowChain({
  direction = "vertical",
  nodes,
  tone = "system",
}: {
  direction?: "vertical" | "horizontal";
  nodes: Array<{ label: string; detail?: string; muted?: boolean }>;
  tone?: "system" | "manual";
}) {
  return (
    <ol className="v2-flow" data-direction={direction} data-tone={tone}>
      {nodes.map((node) => (
        <li key={node.label} data-muted={node.muted || undefined}>
          <span className="v2-flow-label">{node.label}</span>
          {node.detail ? <span className="v2-flow-detail">{node.detail}</span> : null}
        </li>
      ))}
    </ol>
  );
}

export function Timeline({
  items,
}: {
  items: Array<{ label: string; meta: string; state: "done" | "active" | "queued" }>;
}) {
  return (
    <ol className="v2-timeline">
      {items.map((item) => (
        <li data-state={item.state} key={item.label}>
          <span className="v2-timeline-mark" aria-hidden="true" />
          <span className="v2-timeline-label">{item.label}</span>
          <span className="v2-timeline-meta">{item.meta}</span>
        </li>
      ))}
    </ol>
  );
}

export function MetricRow({
  items,
}: {
  items: Array<{ label: string; value: string; trend?: string }>;
}) {
  return (
    <div className="v2-metrics">
      {items.map((item) => (
        <div key={item.label}>
          <strong>{item.value}</strong>
          <span>{item.label}</span>
          {item.trend ? <em>{item.trend}</em> : null}
        </div>
      ))}
    </div>
  );
}

export function RawBlock({ lines, title }: { lines: string[]; title?: string }) {
  return (
    <div className="v2-raw">
      {title ? <span className="v2-raw-title">{title}</span> : null}
      {lines.map((line) => (
        <span className="v2-raw-line" key={line}>
          {line}
        </span>
      ))}
    </div>
  );
}

export function Chart({
  bars,
  label,
}: {
  bars: Array<{ label: string; value: number }>;
  label?: string;
}) {
  return (
    <div className="v2-chart">
      {label ? <span className="v2-chart-label">{label}</span> : null}
      <div className="v2-chart-bars">
        {bars.map((bar, index) => (
          <span
            data-lead={index === bars.length - 1 || undefined}
            key={bar.label}
            style={{ height: `${bar.value}%` }}
            title={`${bar.label}: ${bar.value}`}
          >
            <em>{bar.label}</em>
          </span>
        ))}
      </div>
    </div>
  );
}
