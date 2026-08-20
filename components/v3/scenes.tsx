import {
  Chart,
  FieldGrid,
  FlowChain,
  MetricRow,
  Panel,
  PanelRow,
  ProductWindow,
  RawBlock,
  RecordList,
  ScoreMeter,
  StatusDot,
  Timeline,
  type RailItem,
} from "@/components/v3/product";

const OS_RAIL: RailItem[] = [
  { label: "Lead", count: "12" },
  { label: "Qualify", active: true, count: "4" },
  { label: "CRM", count: "318" },
  { label: "Follow-Up", count: "9" },
  { label: "Dashboard" },
];

const LEAD_QUEUE = [
  { label: "Sarah Mitchell", meta: "Mitchell Contracting", value: "87", active: true, tone: "active" as const },
  { label: "David Okafor", meta: "Northline Freight", value: "74" },
  { label: "Priya Raman", meta: "Raman Dental Group", value: "68" },
  { label: "Tom Alvarez", meta: "Alvarez HVAC", value: "41", tone: "pending" as const },
];

/* ---------------------------------- hero --------------------------------- */

export function HeroConsole() {
  return (
    <ProductWindow
      className="v3-console"
      footer={
        <>
          <span>
            <StatusDot tone="positive" /> Last automation run 2 minutes ago
          </span>
          <span>4 leads awaiting review · 0 errors</span>
        </>
      }
      rail={OS_RAIL}
      section="Lead Operations"
      size="lg"
      status={{ label: "System healthy" }}
      title="YinTech Automation OS"
    >
      <div className="v3-console-grid">
        <Panel className="v3-console-queue" meta="Today" title="Inbound queue">
          <RecordList items={LEAD_QUEUE} />
        </Panel>

        <div className="v3-console-detail">
          <Panel meta="Website form · 09:14" title="Sarah Mitchell">
            <FieldGrid
              fields={[
                { label: "Company", value: "Mitchell Contracting", strong: true },
                { label: "Request", value: "Commercial fit-out quote" },
                { label: "Value", value: "$40,000 – $60,000", strong: true },
                { label: "Owner", value: "James · Sales" },
              ]}
            />
          </Panel>

          <PanelRow>
            <Panel title="Qualification">
              <ScoreMeter
                criteria={[
                  { label: "Service area match", state: "pass" },
                  { label: "Budget range met", state: "pass" },
                  { label: "Timeline confirmed", state: "watch" },
                ]}
                label="Score"
                value={87}
              />
            </Panel>
            <Panel title="CRM record">
              <FieldGrid
                fields={[
                  { label: "Stage", value: "Qualified", strong: true },
                  { label: "Source", value: "Website" },
                  { label: "Created", value: "Today, 09:14" },
                ]}
              />
            </Panel>
          </PanelRow>

          <Panel meta="Automated" title="Follow-up">
            <Timeline
              items={[
                { label: "Confirmation email sent", meta: "09:14", state: "done" },
                { label: "Quote request routed to James", meta: "09:15", state: "done" },
                { label: "Reminder if no reply", meta: "Tue 09:00", state: "queued" },
              ]}
            />
          </Panel>
        </div>
      </div>
    </ProductWindow>
  );
}

/* --------------------------- system transformation ------------------------ */

export function ManualProcessVisual() {
  return (
    <ProductWindow
      section="Before"
      size="md"
      status={{ label: "4 handoffs", tone: "pending" }}
      title="Current Process"
    >
      <FlowChain
        nodes={[
          { label: "Website Lead", detail: "Email notification" },
          { label: "Manual Review", detail: "Whenever someone checks" },
          { label: "Spreadsheet", detail: "Copied by hand" },
          { label: "Manual Follow-Up", detail: "If it is remembered" },
        ]}
        tone="manual"
      />
      <Panel className="v3-flow-note">
        <RecordList
          items={[
            { label: "Average response time", value: "2 days", tone: "pending" },
            { label: "Records kept in two places", value: "Yes", tone: "pending" },
            { label: "Follow-up owner", value: "Unassigned", tone: "pending" },
          ]}
        />
      </Panel>
    </ProductWindow>
  );
}

export function MappedProcessVisual() {
  return (
    <ProductWindow
      section="Mapping"
      size="md"
      status={{ label: "Designed", tone: "active" }}
      title="YinTech System Map"
    >
      <FlowChain
        nodes={[
          { label: "Lead", detail: "Form, email, chat" },
          { label: "Qualification", detail: "Your criteria, applied every time" },
          { label: "CRM", detail: "One record, one owner" },
          { label: "Follow-Up", detail: "Scheduled, tracked, reviewable" },
          { label: "Dashboard", detail: "Pipeline and response visibility" },
        ]}
      />
    </ProductWindow>
  );
}

export function ConnectedOperationVisual() {
  return (
    <ProductWindow
      footer={
        <>
          <span>
            <StatusDot tone="positive" /> Running
          </span>
          <span>Response time 6 minutes · 0 leads unassigned</span>
        </>
      }
      rail={OS_RAIL}
      section="Connected Operation"
      size="md"
      status={{ label: "Live" }}
      title="YinTech Automation OS"
    >
      <Panel meta="Live" title="Pipeline">
        <RecordList items={LEAD_QUEUE} />
      </Panel>
      <PanelRow>
        <Panel title="This week">
          <MetricRow
            items={[
              { label: "Leads captured", value: "38" },
              { label: "Auto-qualified", value: "31" },
              { label: "Avg response", value: "6m" },
            ]}
          />
        </Panel>
        <Panel title="Activity">
          <Timeline
            items={[
              { label: "Lead qualified", meta: "2m", state: "done" },
              { label: "CRM record created", meta: "2m", state: "done" },
              { label: "Follow-up scheduled", meta: "now", state: "active" },
            ]}
          />
        </Panel>
      </PanelRow>
    </ProductWindow>
  );
}

/* ------------------------------ automation os ----------------------------- */

export function OsConsole() {
  return (
    <ProductWindow
      className="v3-console"
      footer={
        <>
          <span>
            <StatusDot tone="positive" /> All five systems connected
          </span>
          <span>Last sync 40 seconds ago</span>
        </>
      }
      rail={OS_RAIL}
      section="Operations Overview"
      size="lg"
      status={{ label: "System healthy" }}
      title="YinTech Automation OS"
    >
      <MetricRow
        items={[
          { label: "Leads this month", value: "164", trend: "+22%" },
          { label: "Qualified automatically", value: "138" },
          { label: "Average response", value: "6m", trend: "was 2 days" },
          { label: "Follow-ups on schedule", value: "100%" },
        ]}
      />
      <PanelRow>
        <Panel meta="Qualified" title="Pipeline">
          <RecordList items={LEAD_QUEUE} />
        </Panel>
        <Panel title="Lead volume">
          <Chart
            bars={[
              { label: "M", value: 46 },
              { label: "T", value: 62 },
              { label: "W", value: 54 },
              { label: "T", value: 71 },
              { label: "F", value: 88 },
            ]}
            label="Last 5 business days"
          />
        </Panel>
      </PanelRow>
      <Panel meta="Automated" title="System activity">
        <Timeline
          items={[
            { label: "Chat conversation converted to lead", meta: "40s", state: "done" },
            { label: "Lead qualified · score 87", meta: "2m", state: "done" },
            { label: "Follow-up sequence started", meta: "2m", state: "active" },
            { label: "Weekly pipeline report", meta: "Fri 08:00", state: "queued" },
          ]}
        />
      </Panel>
    </ProductWindow>
  );
}

/* ---------------------------- sales & lead scenes -------------------------- */

export function QualifierVisual() {
  return (
    <ProductWindow
      rail={OS_RAIL}
      section="AI Lead Qualifier"
      size="md"
      status={{ label: "Scored" }}
      title="YinTech Workspace"
    >
      <Panel meta="Website form · 09:14" title="Sarah Mitchell">
        <FieldGrid
          fields={[
            { label: "Company", value: "Mitchell Contracting", strong: true },
            { label: "Request", value: "Commercial fit-out quote" },
            { label: "Value", value: "$40,000 – $60,000", strong: true },
          ]}
        />
      </Panel>
      <Panel title="Qualification">
        <ScoreMeter
          criteria={[
            { label: "Service area match", state: "pass" },
            { label: "Budget range met", state: "pass" },
            { label: "Decision maker identified", state: "pass" },
            { label: "Timeline confirmed", state: "watch" },
          ]}
          label="Score"
          value={87}
        />
      </Panel>
      <Panel title="Decision">
        <RecordList
          items={[
            { label: "Route to", value: "James · Sales", active: true },
            { label: "Priority", value: "High", tone: "active" },
          ]}
        />
      </Panel>
    </ProductWindow>
  );
}

export function EmailParserVisual() {
  return (
    <ProductWindow
      rail={OS_RAIL}
      section="Email → Lead Parser"
      size="md"
      status={{ label: "Parsed" }}
      title="YinTech Workspace"
    >
      <Panel meta="inbox@company.com" title="Incoming email">
        <RawBlock
          lines={[
            "From: sarah.mitchell@mitchellcontracting.com",
            "Subject: Fit-out quote for the Rosewood site",
            "",
            "Hi — we need pricing for a 4,000 sq ft commercial",
            "fit-out. Budget is around $50k, hoping to start in",
            "March. Best number is 0412 998 220.",
          ]}
        />
      </Panel>
      <Panel meta="Structured" title="Extracted lead">
        <FieldGrid
          fields={[
            { label: "Name", value: "Sarah Mitchell", strong: true },
            { label: "Company", value: "Mitchell Contracting" },
            { label: "Phone", value: "0412 998 220" },
            { label: "Budget", value: "$50,000", strong: true },
            { label: "Timeline", value: "March" },
            { label: "Service", value: "Commercial fit-out" },
          ]}
        />
      </Panel>
    </ProductWindow>
  );
}

export function ChatParserVisual() {
  return (
    <ProductWindow
      rail={OS_RAIL}
      section="Live Chat → Lead Parser"
      size="md"
      status={{ label: "Captured" }}
      title="YinTech Workspace"
    >
      <Panel meta="Website widget" title="Conversation">
        <ol className="v3-chat">
          <li data-side="them">Do you handle warehouse racking installs?</li>
          <li data-side="us">We do. Which site is it for?</li>
          <li data-side="them">Northline Freight, Dandenong. Around 900 pallet spaces.</li>
          <li data-side="us">Best email to send pricing to?</li>
          <li data-side="them">david@northlinefreight.com</li>
        </ol>
      </Panel>
      <Panel meta="Structured" title="Extracted contact">
        <FieldGrid
          fields={[
            { label: "Name", value: "David Okafor", strong: true },
            { label: "Company", value: "Northline Freight" },
            { label: "Email", value: "david@northlinefreight.com" },
            { label: "Scope", value: "900 pallet spaces", strong: true },
          ]}
        />
      </Panel>
    </ProductWindow>
  );
}

export function FollowUpVisual() {
  return (
    <ProductWindow
      rail={OS_RAIL}
      section="Automated Follow-Up"
      size="md"
      status={{ label: "Sequence running" }}
      title="YinTech Workspace"
    >
      <Panel meta="Qualified leads · 9 active" title="Sequence">
        <Timeline
          items={[
            { label: "Confirmation email", meta: "Sent 09:14", state: "done" },
            { label: "Quote delivered", meta: "Sent Mon 11:02", state: "done" },
            { label: "Check-in reminder", meta: "Wed 09:00", state: "active" },
            { label: "Final follow-up", meta: "Fri 09:00", state: "queued" },
            { label: "Move to nurture list", meta: "If no reply", state: "queued" },
          ]}
        />
      </Panel>
      <Panel title="Owner visibility">
        <RecordList
          items={[
            { label: "James · Sales", meta: "4 open", value: "On track", active: true },
            { label: "Alicia · Estimating", meta: "3 open", value: "On track" },
            { label: "Unassigned", meta: "0 open", value: "—" },
          ]}
        />
      </Panel>
    </ProductWindow>
  );
}

export function ReactivationVisual() {
  return (
    <ProductWindow
      rail={OS_RAIL}
      section="Old Lead Reactivation"
      size="md"
      status={{ label: "Campaign live" }}
      title="YinTech Workspace"
    >
      <Panel meta="No contact in 90+ days" title="Dormant list">
        <RecordList
          items={[
            { label: "Alvarez HVAC", meta: "Last touch 143 days", value: "Reopened", tone: "active", active: true },
            { label: "Kingsway Property", meta: "Last touch 112 days", value: "Replied", tone: "positive" },
            { label: "Bayside Logistics", meta: "Last touch 96 days", value: "Queued" },
          ]}
        />
      </Panel>
      <Panel title="Result">
        <MetricRow
          items={[
            { label: "Contacted", value: "212" },
            { label: "Replied", value: "34" },
            { label: "Back in pipeline", value: "11", trend: "$96k" },
          ]}
        />
      </Panel>
    </ProductWindow>
  );
}

/* ------------------------------ operations -------------------------------- */

const OPS_RAIL: RailItem[] = [
  { label: "Quotes", active: true, count: "6" },
  { label: "Proposals", count: "3" },
  { label: "Approvals", count: "2" },
  { label: "Reporting" },
  { label: "Compliance" },
  { label: "Inventory" },
];

function opsRail(active: string): RailItem[] {
  return OPS_RAIL.map((item) => ({ ...item, active: item.label === active }));
}

export function QuoteVisual() {
  return (
    <ProductWindow
      rail={opsRail("Quotes")}
      section="Quote Builder"
      size="md"
      status={{ label: "Draft ready", tone: "active" }}
      title="YinTech Operations"
    >
      <Panel meta="Q-2481 · Mitchell Contracting" title="Quote">
        <RecordList
          items={[
            { label: "Site assessment", meta: "1 × fixed", value: "$1,200" },
            { label: "Fit-out labour", meta: "220 hrs", value: "$28,600" },
            { label: "Materials", meta: "Schedule A", value: "$16,400" },
            { label: "Contingency", meta: "5%", value: "$2,310" },
          ]}
        />
        <FieldGrid
          fields={[
            { label: "Subtotal", value: "$48,510" },
            { label: "Total", value: "$53,361", strong: true },
            { label: "Prepared in", value: "4 minutes", strong: true },
          ]}
        />
      </Panel>
    </ProductWindow>
  );
}

export function ProposalVisual() {
  return (
    <ProductWindow
      rail={opsRail("Proposals")}
      section="Proposal Generator"
      size="md"
      status={{ label: "Assembled", tone: "active" }}
      title="YinTech Operations"
    >
      <Panel meta="Reused from your library" title="Sections">
        <RecordList
          items={[
            { label: "Scope of work", meta: "Generated from quote", value: "Ready", tone: "positive" },
            { label: "Schedule", meta: "March – June", value: "Ready", tone: "positive" },
            { label: "Inclusions & exclusions", meta: "Standard clauses", value: "Ready", tone: "positive" },
            { label: "Pricing summary", meta: "Q-2481", value: "Linked", active: true },
          ]}
        />
      </Panel>
      <Panel title="Output">
        <FieldGrid
          fields={[
            { label: "Document", value: "Mitchell_Proposal_v1.pdf", strong: true },
            { label: "Manual edits", value: "2 fields" },
          ]}
        />
      </Panel>
    </ProductWindow>
  );
}

export function ApprovalVisual() {
  return (
    <ProductWindow
      rail={opsRail("Approvals")}
      section="Workflow & Approvals"
      size="md"
      status={{ label: "Awaiting manager", tone: "pending" }}
      title="YinTech Operations"
    >
      <Panel meta="Discount request · 12%" title="Routing">
        <Timeline
          items={[
            { label: "Submitted by James", meta: "Mon 14:02", state: "done" },
            { label: "Estimating check", meta: "Mon 15:20", state: "done" },
            { label: "Manager review", meta: "Waiting", state: "active" },
            { label: "Customer notified", meta: "On approval", state: "queued" },
          ]}
        />
      </Panel>
      <Panel title="Rules applied">
        <RecordList
          items={[
            { label: "Discounts over 10%", value: "Manager", active: true },
            { label: "Jobs over $75k", value: "Director" },
            { label: "Standard pricing", value: "Auto-approved", tone: "positive" },
          ]}
        />
      </Panel>
    </ProductWindow>
  );
}

export function ReportingVisual() {
  return (
    <ProductWindow
      rail={opsRail("Reporting")}
      section="Automated Reporting"
      size="md"
      status={{ label: "Scheduled" }}
      title="YinTech Operations"
    >
      <Panel meta="Delivered Monday 08:00" title="Weekly operations report">
        <Chart
          bars={[
            { label: "W1", value: 48 },
            { label: "W2", value: 57 },
            { label: "W3", value: 52 },
            { label: "W4", value: 76 },
          ]}
          label="Quotes issued"
        />
      </Panel>
      <Panel title="Included">
        <RecordList
          items={[
            { label: "Pipeline by stage", value: "Auto", tone: "positive" },
            { label: "Quote conversion", value: "Auto", tone: "positive" },
            { label: "Jobs at risk", value: "Auto", tone: "positive" },
            { label: "Spreadsheet work", value: "0 hrs", active: true },
          ]}
        />
      </Panel>
    </ProductWindow>
  );
}

export function ComplianceVisual() {
  return (
    <ProductWindow
      rail={opsRail("Compliance")}
      section="Compliance Tracker"
      size="md"
      status={{ label: "2 due this month", tone: "pending" }}
      title="YinTech Operations"
    >
      <Panel meta="Site documentation" title="Requirements">
        <RecordList
          items={[
            { label: "Insurance certificate", meta: "Renewed", value: "Current", tone: "positive" },
            { label: "Site safety plan", meta: "Rosewood", value: "Due 14 days", tone: "pending", active: true },
            { label: "Contractor licences", meta: "6 of 6", value: "Current", tone: "positive" },
            { label: "Incident register", meta: "Reviewed monthly", value: "Current", tone: "positive" },
          ]}
        />
      </Panel>
      <Panel title="Upcoming">
        <Timeline
          items={[
            { label: "Safety plan review", meta: "In 14 days", state: "active" },
            { label: "Insurance renewal", meta: "In 3 months", state: "queued" },
            { label: "Licence check", meta: "Quarterly", state: "queued" },
          ]}
        />
      </Panel>
    </ProductWindow>
  );
}

export function InventoryVisual() {
  return (
    <ProductWindow
      rail={opsRail("Inventory")}
      section="Inventory System"
      size="md"
      status={{ label: "Tracking 1,240 items" }}
      title="YinTech Operations"
    >
      <Panel meta="Warehouse A" title="Stock">
        <RecordList
          items={[
            { label: "Ceiling grid 3.6m", meta: "Reorder at 40", value: "128" },
            { label: "Acoustic panel", meta: "Reorder at 60", value: "54", tone: "pending", active: true },
            { label: "Track lighting", meta: "Reorder at 25", value: "91" },
            { label: "Fixings kit", meta: "Reorder at 100", value: "310" },
          ]}
        />
      </Panel>
      <Panel title="Movement">
        <MetricRow
          items={[
            { label: "Allocated to jobs", value: "312" },
            { label: "Low stock", value: "1" },
            { label: "Count accuracy", value: "99%" },
          ]}
        />
      </Panel>
    </ProductWindow>
  );
}

/* --------------------------------- systems -------------------------------- */

const WORKSPACE_RAIL: RailItem[] = [
  { label: "CRM", count: "318" },
  { label: "Dashboard" },
  { label: "Knowledge" },
  { label: "Internal App" },
  { label: "Portal" },
];

function workspaceRail(active: string): RailItem[] {
  return WORKSPACE_RAIL.map((item) => ({ ...item, active: item.label === active }));
}

export function CrmVisual() {
  return (
    <ProductWindow
      rail={workspaceRail("CRM")}
      section="Customer Record"
      size="md"
      status={{ label: "Synced" }}
      title="YinTech Workspace"
    >
      <Panel meta="Customer since 2021" title="Mitchell Contracting">
        <FieldGrid
          fields={[
            { label: "Owner", value: "James · Sales", strong: true },
            { label: "Stage", value: "Quote issued" },
            { label: "Lifetime value", value: "$214,000", strong: true },
            { label: "Open jobs", value: "2" },
          ]}
        />
      </Panel>
      <PanelRow>
        <Panel title="Activity">
          <Timeline
            items={[
              { label: "Quote Q-2481 sent", meta: "Mon", state: "done" },
              { label: "Site visit logged", meta: "Last week", state: "done" },
              { label: "Check-in scheduled", meta: "Wed", state: "active" },
            ]}
          />
        </Panel>
        <Panel title="Contacts">
          <RecordList
            items={[
              { label: "Sarah Mitchell", meta: "Director", value: "Primary", active: true },
              { label: "Owen Blake", meta: "Site manager", value: "Ops" },
            ]}
          />
        </Panel>
      </PanelRow>
    </ProductWindow>
  );
}

export function DashboardVisual() {
  return (
    <ProductWindow
      rail={workspaceRail("Dashboard")}
      section="Executive Dashboard"
      size="md"
      status={{ label: "Updated hourly" }}
      title="YinTech Workspace"
    >
      <MetricRow
        items={[
          { label: "Pipeline", value: "$1.2M" },
          { label: "Quotes out", value: "18" },
          { label: "Win rate", value: "38%", trend: "+6" },
          { label: "Avg response", value: "6m" },
        ]}
      />
      <Panel title="Pipeline by month">
        <Chart
          bars={[
            { label: "Jan", value: 44 },
            { label: "Feb", value: 58 },
            { label: "Mar", value: 51 },
            { label: "Apr", value: 66 },
            { label: "May", value: 83 },
          ]}
        />
      </Panel>
    </ProductWindow>
  );
}

export function KnowledgeVisual() {
  return (
    <ProductWindow
      rail={workspaceRail("Knowledge")}
      section="Company Knowledge AI"
      size="md"
      status={{ label: "Answering from your files" }}
      title="YinTech Workspace"
    >
      <Panel meta="Asked by Alicia" title="Question">
        <RawBlock lines={["What is our standard warranty on commercial fit-out work?"]} />
      </Panel>
      <Panel meta="With sources" title="Answer">
        <RawBlock
          lines={[
            "24 months on workmanship, 12 months on supplied",
            "fittings unless the manufacturer term is longer.",
          ]}
        />
        <RecordList
          items={[
            { label: "Standard Terms v4.pdf", meta: "Section 8", value: "Source", active: true },
            { label: "Fit-out Handbook.docx", meta: "Page 22", value: "Source" },
          ]}
        />
      </Panel>
    </ProductWindow>
  );
}

export function InternalAppVisual() {
  return (
    <ProductWindow
      rail={workspaceRail("Internal App")}
      section="Internal Company App"
      size="md"
      status={{ label: "12 jobs scheduled" }}
      title="YinTech Workspace"
    >
      <Panel meta="This week" title="Job board">
        <RecordList
          items={[
            { label: "Rosewood fit-out", meta: "Crew A · Mon–Thu", value: "In progress", tone: "active", active: true },
            { label: "Northline racking", meta: "Crew B · Tue", value: "Scheduled" },
            { label: "Bayside office", meta: "Crew A · Fri", value: "Scheduled" },
            { label: "Kingsway defect visit", meta: "Unassigned", value: "Needs crew", tone: "pending" },
          ]}
        />
      </Panel>
      <Panel title="Replaces">
        <RecordList
          items={[
            { label: "Job tracker spreadsheet", value: "Retired", tone: "positive" },
            { label: "Crew WhatsApp thread", value: "Retired", tone: "positive" },
          ]}
        />
      </Panel>
    </ProductWindow>
  );
}

export function PortalVisual() {
  return (
    <ProductWindow
      rail={workspaceRail("Portal")}
      section="Customer Portal"
      size="md"
      status={{ label: "3 customers active" }}
      title="YinTech Workspace"
    >
      <Panel meta="Signed in as Mitchell Contracting" title="Portal view">
        <RecordList
          items={[
            { label: "Quote Q-2481", meta: "Issued Monday", value: "Review", active: true },
            { label: "Job schedule", meta: "March start", value: "View" },
            { label: "Invoices", meta: "2 paid", value: "View" },
            { label: "Documents", meta: "Insurance, permits", value: "View" },
          ]}
        />
      </Panel>
      <Panel title="Result">
        <MetricRow
          items={[
            { label: "Status emails avoided", value: "40/mo" },
            { label: "Self-service actions", value: "83%" },
          ]}
        />
      </Panel>
    </ProductWindow>
  );
}

/* -------------------------------- websites -------------------------------- */

export function WebsiteVisual({ section = "Website" }: { section?: string }) {
  return (
    <figure className="v3-browser">
      <div className="v3-browser-bar">
        <span className="v3-browser-url">yourcompany.com/contact</span>
        <span className="v3-browser-tag">{section}</span>
      </div>
      <div className="v3-browser-body">
        <div className="v3-browser-page">
          <span className="v3-browser-eyebrow">Commercial Fit-Out</span>
          <strong className="v3-browser-headline">Request a quote</strong>
          <div className="v3-browser-form">
            <span>Name</span>
            <span>Company</span>
            <span>Project value</span>
            <span data-filled="true">Send request</span>
          </div>
        </div>
        <div className="v3-browser-wire">
          <FlowChain
            nodes={[
              { label: "Website", detail: "Form submitted" },
              { label: "Lead Capture", detail: "Structured record" },
              { label: "Qualification", detail: "Score 87" },
              { label: "CRM", detail: "Owner assigned" },
            ]}
          />
        </div>
      </div>
    </figure>
  );
}

/* ------------------------------ how it works ------------------------------ */

export function AuditVisual() {
  return (
    <ProductWindow section="Automation Audit" size="md" status={{ label: "Session notes", tone: "active" }} title="Discovery">
      <Panel meta="Recorded with your team" title="Where the time goes">
        <RecordList
          items={[
            { label: "Manual lead entry", meta: "Sales", value: "6 hrs/wk", tone: "pending", active: true },
            { label: "Quote preparation", meta: "Estimating", value: "9 hrs/wk", tone: "pending" },
            { label: "Weekly reporting", meta: "Owner", value: "3 hrs/wk", tone: "pending" },
            { label: "Chasing approvals", meta: "Admin", value: "4 hrs/wk", tone: "pending" },
          ]}
        />
      </Panel>
    </ProductWindow>
  );
}

export function BuildVisual() {
  return (
    <ProductWindow section="Build" size="md" status={{ label: "In progress", tone: "active" }} title="Delivery">
      <Panel meta="Against the approved map" title="Workstreams">
        <Timeline
          items={[
            { label: "Data structure", meta: "Complete", state: "done" },
            { label: "Lead intake & qualification", meta: "Complete", state: "done" },
            { label: "CRM and follow-up", meta: "In build", state: "active" },
            { label: "Dashboard", meta: "Queued", state: "queued" },
          ]}
        />
      </Panel>
      <Panel title="Review">
        <RecordList
          items={[
            { label: "Weekly walkthrough", value: "Scheduled", tone: "positive" },
            { label: "Change requests", meta: "Logged, scoped", value: "2 open" },
          ]}
        />
      </Panel>
    </ProductWindow>
  );
}

export function ManagedVisual() {
  return (
    <ProductWindow
      footer={
        <>
          <span>
            <StatusDot tone="positive" /> Monitored daily
          </span>
          <span>Uptime 99.9% · 0 open incidents</span>
        </>
      }
      rail={OS_RAIL}
      section="Managed System"
      size="md"
      status={{ label: "Live" }}
      title="YinTech Automation OS"
    >
      <MetricRow
        items={[
          { label: "Hours returned / month", value: "88" },
          { label: "Leads unattended", value: "0" },
          { label: "Refinements shipped", value: "14" },
        ]}
      />
      <Panel meta="Ongoing" title="Management">
        <RecordList
          items={[
            { label: "Monitoring & error handling", value: "Included", tone: "positive" },
            { label: "Workflow refinements", value: "Included", tone: "positive" },
            { label: "New automation requests", value: "Scoped", active: true },
          ]}
        />
      </Panel>
    </ProductWindow>
  );
}
