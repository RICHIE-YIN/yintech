import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("Automation OS pricing math is launch-ready", async () => {
  const pricing = await readFile(new URL("content/pricing.ts", root), "utf8");

  assert.match(pricing, /standaloneSetup:\s*4900/);
  assert.match(pricing, /standaloneMonthly:\s*1400/);
  assert.match(pricing, /osSetup:\s*2500/);
  assert.match(pricing, /osMonthly:\s*700/);
  assert.match(pricing, /standaloneFirstYear:\s*21700/);
  assert.match(pricing, /osFirstYear:\s*10900/);
  assert.match(pricing, /firstYearSavings:\s*10800/);
});

test("Phase 1 stays static with no backend route", async () => {
  const contact = await readFile(new URL("app/contact/page.tsx", root), "utf8");
  const page = await readFile(new URL("app/page.tsx", root), "utf8");

  assert.match(contact, /method="post"/);
  assert.match(contact, /NEXT_PUBLIC_FORM_ENDPOINT/);
  assert.doesNotMatch(contact, /server action|\/api\/contact|\/api\/audit/i);
  assert.doesNotMatch(page, /Supabase|authentication|dashboard login/i);
});

test("starter preview metadata and dependency are removed", async () => {
  const layout = await readFile(new URL("app/layout.tsx", root), "utf8");
  const packageJson = await readFile(new URL("package.json", root), "utf8");

  assert.doesNotMatch(layout, /Starter Project|codex-preview|_sites-preview/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton|drizzle/);
});

test("theme follows the YinTech monochrome enterprise system", async () => {
  const css = await readFile(new URL("app/globals.css", root), "utf8");
  const ui = await readFile(new URL("components/ui.tsx", root), "utf8");

  assert.match(css, /--theme-name:\s*yintech-monochrome-enterprise/);
  assert.match(css, /--black:\s*#0A0A0A/i);
  assert.match(css, /--charcoal:\s*#151515/i);
  assert.match(css, /--gray-dark:\s*#242424/i);
  assert.match(css, /--gray:\s*#6B6B6B/i);
  assert.match(css, /--off-white:\s*#F5F5F3/i);
  assert.match(css, /--white:\s*#FFFFFF/i);
  assert.match(css, /--blue:\s*#2F7DF6/i);
  assert.match(css, /--yt-canvas:\s*var\(--black\)/);
  assert.match(css, /--yt-surface-1:\s*var\(--charcoal\)/);
  assert.match(css, /--yt-surface-2:\s*var\(--gray-dark\)/);
  assert.match(css, /--yt-surface-3:\s*#303030/);
  assert.match(css, /--yt-text-primary:\s*#f5f7fa/i);
  assert.match(css, /--yt-text-secondary:\s*#C8C8C4/i);
  assert.match(css, /--yt-text-muted:\s*#9C9C98/i);
  assert.match(css, /--yt-text-faint:\s*#747474/i);
  assert.match(css, /--yt-text:\s*var\(--yt-text-primary\)/);
  assert.match(css, /--yt-blue:\s*var\(--blue\)/);
  assert.match(css, /--yt-blue-hover:\s*#4A91FF/i);
  assert.match(css, /--blue-deep:\s*#1F5FC8/i);
  assert.match(css, /--yt-cyan:\s*var\(--blue\)/);
  assert.match(css, /--accent-2:\s*var\(--blue-primary\)/);
  assert.match(css, /--container:\s*1180px/);
  assert.match(css, /--container-wide:\s*1240px/);
  assert.match(css, /--section-space:\s*112px/);
  assert.match(css, /font-family:\s*Geist,\s*Inter,\s*var\(--font-geist-sans\)/);
  assert.match(css, /font-size:\s*clamp\(3\.5rem,\s*6vw,\s*4\.75rem\)/);
  assert.match(css, /font-weight:\s*650/);
  assert.match(css, /letter-spacing:\s*-0\.045em/);
  assert.match(css, /font-size:\s*clamp\(2\.25rem,\s*4vw,\s*3rem\)/);
  assert.match(css, /letter-spacing:\s*-0\.035em/);
  assert.match(css, /\.proof-band/);
  assert.match(css, /\.visual-panel\s*\{/);
  assert.doesNotMatch(ui, /site-kicker|AI strategy - automation - business systems/);
  assert.doesNotMatch(
    css,
    /--paper:\s*#fbfaf7|--page:\s*#f3f0ea|background:\s*white|visual-grid|--theme-name:\s*executive-dark-saas|--theme-name:\s*yintech-visual-identity/,
  );
});

test("generated visual assets are wired into their placeholders", async () => {
  const [home, services, automationOs, about, ui, css] = await Promise.all([
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("content/services.ts", root), "utf8"),
    readFile(new URL("app/automation-os/page.tsx", root), "utf8"),
    readFile(new URL("app/about/page.tsx", root), "utf8"),
    readFile(new URL("components/ui.tsx", root), "utf8"),
    readFile(new URL("app/globals.css", root), "utf8"),
  ]);

  const images = [
    "hero-automation-consulting.png",
    "problem-workflow-friction.png",
    "automation-os-workflow.png",
    "process-consulting-table.png",
    "human-controlled-automation.png",
    "final-cta-automation-map.png",
    "about-systems-philosophy.png",
    "service-sales-automation.png",
    "service-operations-automation.png",
    "service-crm-dashboard.png",
    "service-internal-apps.png",
  ];

  await Promise.all(
    images.map((image) => access(new URL(`public/images/${image}`, root))),
  );

  assert.match(home, /<ProductShowcase variant="system-map"/);
  assert.doesNotMatch(home, /\/images\/process-consulting-table\.png/);
  assert.match(about, /\/images\/about-systems-philosophy\.png/);
  assert.match(services, /\/images\/service-sales-automation\.png/);
  assert.match(services, /\/images\/service-operations-automation\.png/);
  assert.match(services, /\/images\/service-crm-dashboard\.png/);
  assert.match(services, /\/images\/service-internal-apps\.png/);
  assert.match(css, /url\(["']?\/images\/final-cta-automation-map\.png["']?\)/);
  assert.match(ui, /<Image/);
  assert.match(ui, /className="visual-image"/);
  assert.match(ui, /unoptimized/);
  assert.doesNotMatch(ui, /visual-path|visual-grid/);
  assert.match(home, /<ProductShowcase variant="lead-qualification"/);
  assert.match(home, /<ProductShowcase variant="email-parser"/);
  assert.match(home, /<ProductShowcase variant="follow-up"/);
  assert.match(automationOs, /<AutomationOsConsole/);
});

test("brand uses the provided YinTech logo image", async () => {
  const [ui, css] = await Promise.all([
    readFile(new URL("components/ui.tsx", root), "utf8"),
    readFile(new URL("app/globals.css", root), "utf8"),
    access(new URL("public/images/yintech-logo.png", root)),
  ]);

  assert.match(ui, /src="\/images\/yintech-logo\.png"/);
  assert.match(ui, /className="brand-logo"/);
  assert.match(css, /\.site-header \.brand-logo\s*\{[^}]*width:\s*232px;[^}]*height:\s*72px;/s);
  assert.match(css, /\.footer \.brand-logo\s*\{[^}]*width:\s*240px;[^}]*height:\s*76px;/s);
  assert.doesNotMatch(ui, /<span className="brand-mark">YT<\/span>/);
  assert.match(css, /\.brand-logo/);
});

test("visual redesign applies the implementation brief structure", async () => {
  const [home, servicesPage, automationOsPage, howItWorksPage, aboutPage, css] =
    await Promise.all([
      readFile(new URL("app/page.tsx", root), "utf8"),
      readFile(new URL("app/services/page.tsx", root), "utf8"),
      readFile(new URL("app/automation-os/page.tsx", root), "utf8"),
      readFile(new URL("app/how-it-works/page.tsx", root), "utf8"),
      readFile(new URL("app/about/page.tsx", root), "utf8"),
      readFile(new URL("app/globals.css", root), "utf8"),
    ]);

  assert.match(home, /problem-list/);
  assert.match(home, /build-grid/);
  assert.match(home, /os-pricing-grid/);
  assert.match(home, /phase-preview-grid/);
  assert.doesNotMatch(home, /grid five/);

  assert.match(servicesPage, /service-category-layout/);
  assert.match(servicesPage, /service-grid/);
  assert.doesNotMatch(servicesPage, /grid two/);

  assert.match(automationOsPage, /<WorkflowDiagram/);
  assert.match(automationOsPage, /os-pricing-grid/);
  assert.match(howItWorksPage, /process-layout/);
  assert.match(aboutPage, /principles-list/);

  assert.match(css, /\.workflow-node/);
  assert.match(css, /\.service-grid/);
  assert.match(css, /\.pricing-card/);
  assert.match(css, /\.process-layout/);
});

test("problem section uses a balanced two-column visual layout", async () => {
  const [home, css] = await Promise.all([
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("app/globals.css", root), "utf8"),
  ]);

  assert.match(home, /<div className="problem-copy">/);
  assert.match(
    home,
    /problem-copy[\s\S]+problem-list[\s\S]+<ProductShowcase variant="email-parser"/,
  );
  assert.match(css, /\.problem-copy/);
  assert.match(css, /\.parser-layout/);
  assert.match(css, /\.product-parser/);
  assert.doesNotMatch(home, /problem-workflow-friction/);
});

test("service card image prompt sheet covers every Phase 1 service", async () => {
  const promptSheet = await readFile(
    new URL("docs/yintech-service-card-image-prompts.md", root),
    "utf8",
  );

  const serviceIds = [
    "ai-lead-qualifier",
    "email-lead-parser",
    "live-chat-lead-parser",
    "automated-lead-follow-up",
    "old-lead-reactivation",
    "ai-quote-generator",
    "proposal-generator",
    "automated-reporting",
    "workflow-approval-automation",
    "compliance-tracker",
    "inventory-system",
    "basic-crm-center",
    "executive-dashboard",
    "company-knowledge-ai",
    "internal-company-app",
    "customer-employee-portal",
    "custom-website",
    "advanced-website",
  ];

  assert.match(promptSheet, /Common Style Prefix/);
  assert.match(promptSheet, /Negative Prompt/);
  assert.match(promptSheet, /service logo mark/i);
  assert.match(promptSheet, /transparent background/i);
  assert.doesNotMatch(promptSheet, /thumbnail|interface card|wireframe/i);

  for (const id of serviceIds) {
    assert.match(promptSheet, new RegExp(`### ${id}\\b`));
  }
});

test("Phase 1 service cards render provided logo images", async () => {
  const [services, ui, css] = await Promise.all([
    readFile(new URL("content/services.ts", root), "utf8"),
    readFile(new URL("components/ui.tsx", root), "utf8"),
    readFile(new URL("app/globals.css", root), "utf8"),
  ]);

  const serviceIds = [
    "ai-lead-qualifier",
    "email-lead-parser",
    "live-chat-lead-parser",
    "automated-lead-follow-up",
    "old-lead-reactivation",
    "ai-quote-generator",
    "proposal-generator",
    "automated-reporting",
    "workflow-approval-automation",
    "compliance-tracker",
    "inventory-system",
    "basic-crm-center",
    "executive-dashboard",
    "company-knowledge-ai",
    "internal-company-app",
    "customer-employee-portal",
    "custom-website",
    "advanced-website",
  ];

  await Promise.all(
    serviceIds.map((id) => access(new URL(`public/images/services/${id}.png`, root))),
  );

  for (const id of serviceIds) {
    assert.match(services, new RegExp(`image:\\s*"/images/services/${id}\\.png"`));
  }

  assert.match(services, /image\?: string/);
  assert.match(ui, /service-card-icon-image/);
  assert.match(ui, /src=\{image\}/);
  assert.match(ui, /alt=""[\s\S]+aria-hidden="true"/);
  assert.match(css, /\.service-card-icon-image/);
  assert.match(
    css,
    /\.service-card-icon-image\s*\{[^}]*width:\s*52px;[^}]*height:\s*52px;[^}]*object-position:\s*center;/s,
  );
  assert.doesNotMatch(ui, /<span aria-hidden="true" className="service-card-icon" \/>/);
});

test("visual artwork is centered instead of cropped on service layouts", async () => {
  const css = await readFile(new URL("app/globals.css", root), "utf8");

  assert.match(
    css,
    /\.visual-image\s*\{[^}]*object-fit:\s*contain;[^}]*object-position:\s*center;/s,
  );
  assert.match(
    css,
    /\.service-category-layout \.visual-panel\s*\{[^}]*min-height:\s*clamp\(220px,\s*34vw,\s*360px\);[^}]*aspect-ratio:\s*16 \/ 9;/s,
  );
  assert.match(
    css,
    /@media \(max-width:\s*640px\)[\s\S]*\.service-category-layout \.visual-panel\s*\{[^}]*min-height:\s*220px;/s,
  );
  assert.doesNotMatch(css, /\.visual-image\s*\{[^}]*object-fit:\s*cover;/s);
});

test("design refinement brief is implemented with product-led UI primitives", async () => {
  const [home, automationOs, ui, css] = await Promise.all([
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("app/automation-os/page.tsx", root), "utf8"),
    readFile(new URL("components/ui.tsx", root), "utf8"),
    readFile(new URL("app/globals.css", root), "utf8"),
  ]);

  assert.match(css, /--yt-canvas:\s*var\(--black\)/);
  assert.match(css, /--yt-surface-1:\s*var\(--charcoal\)/);
  assert.match(css, /--yt-surface-2:\s*var\(--gray-dark\)/);
  assert.match(css, /--yt-surface-3:\s*#303030/);
  assert.match(css, /--yt-blue:\s*var\(--blue\)/i);
  assert.match(css, /--yt-cyan:\s*var\(--blue\)/i);
  assert.match(css, /--container:\s*1180px/);
  assert.match(css, /--container-wide:\s*1240px/);
  assert.match(css, /--section-space:\s*112px/);
  assert.match(css, /font-size:\s*clamp\(3\.5rem,\s*6vw,\s*4\.75rem\)/);
  assert.match(css, /font-weight:\s*650/);
  assert.match(css, /letter-spacing:\s*-0\.045em/);
  assert.match(css, /\.button\s*\{[^}]*min-height:\s*42px;[^}]*border-radius:\s*8px;/s);
  assert.match(css, /\.button:hover\s*\{[^}]*transform:\s*translateY\(-1px\)/s);
  assert.match(css, /\.card,[\s\S]+box-shadow:\s*none;/);

  assert.match(ui, /function ProductWindow/);
  assert.match(ui, /function ProductShowcase/);
  assert.match(ui, /function AutomationOsConsole/);
  assert.match(ui, /function StatusDot/);
  assert.match(ui, /Lead Qualification/);
  assert.match(ui, /Sarah Mitchell/);
  assert.match(ui, /Qualification[\s\S]+87%/);
  assert.match(ui, /Incoming Email/);
  assert.match(ui, /Extracted Lead/);
  assert.match(ui, /Automation OS[\s\S]+System Healthy/);
  assert.match(ui, /Last automation run: 2 minutes ago/);

  assert.match(home, /<ProductShowcase variant="lead-qualification"/);
  assert.match(home, /<ProductShowcase variant="email-parser"/);
  assert.match(home, /<AutomationOsConsole/);
  assert.match(home, /<ProductShowcase variant="follow-up"/);
  assert.match(automationOs, /<AutomationOsConsole/);
  assert.doesNotMatch(home, /image="\/images\/hero-automation-consulting\.png"/);
  assert.doesNotMatch(home, /image="\/images\/problem-workflow-friction\.png"/);
  assert.doesNotMatch(automationOs, /image="\/images\/automation-os-workflow\.png"/);
});

test("final Phase 1 polish removes template CTAs and productizes weak visuals", async () => {
  const [home, servicesPage, ui, css] = await Promise.all([
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("app/services/page.tsx", root), "utf8"),
    readFile(new URL("components/ui.tsx", root), "utf8"),
    readFile(new URL("app/globals.css", root), "utf8"),
  ]);

  assert.match(ui, /function ServiceCategoryProductVisual/);
  assert.match(ui, /Quote Builder[\s\S]+Draft/);
  assert.match(ui, /Approval Workflow[\s\S]+Manager Review/);
  assert.match(ui, /CRM Center[\s\S]+Pipeline health/);
  assert.match(ui, /Website Preview[\s\S]+Lead Capture/);
  assert.match(ui, /System Map[\s\S]+Redesigned/);
  assert.match(ui, /CURRENT PROCESS[\s\S]+YINTECH SYSTEM/);

  assert.match(servicesPage, /<ServiceCategoryProductVisual category=\{category\.id\}/);
  assert.doesNotMatch(servicesPage, /<VisualPanel image=\{category\.image\}/);
  assert.match(home, /<ProductShowcase variant="system-map"/);

  assert.match(ui, /internal-hero-actions/);
  assert.match(css, /\.internal-hero-actions\s*\{[^}]*width:\s*fit-content;[^}]*align-self:\s*flex-start;/s);
  assert.match(css, /\.internal-hero-actions \.button\s*\{[^}]*width:\s*auto;/s);
  assert.match(css, /\.service-category-layout\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*\.85fr\) minmax\(0,\s*1\.15fr\);/s);
  assert.match(css, /\.service-category-product/);
  assert.match(css, /\.quote-builder-layout/);
  assert.match(css, /\.website-lead-layout/);
  assert.match(css, /\.system-map-grid/);
  assert.match(css, /\.manual-flow/);
  assert.match(css, /\.yintech-flow/);
  assert.match(css, /\.service-card \.button-text\s*\{[^}]*color:\s*var\(--yt-text-muted\);[^}]*font-size:\s*0\.78rem;/s);
  assert.match(css, /\.price-row dt\s*\{[^}]*text-transform:\s*uppercase;[^}]*letter-spacing:\s*0\.08em;/s);
  assert.match(css, /\.price-row dd\s*\{[^}]*font-variant-numeric:\s*tabular-nums;/s);
});

test("monochrome theme balances black product sections with quiet business sections", async () => {
  const [home, servicesPage, aboutPage, howItWorksPage, automationOsPage, css] =
    await Promise.all([
      readFile(new URL("app/page.tsx", root), "utf8"),
      readFile(new URL("app/services/page.tsx", root), "utf8"),
      readFile(new URL("app/about/page.tsx", root), "utf8"),
      readFile(new URL("app/how-it-works/page.tsx", root), "utf8"),
      readFile(new URL("app/automation-os/page.tsx", root), "utf8"),
      readFile(new URL("app/globals.css", root), "utf8"),
    ]);

  assert.match(css, /--black:\s*#0A0A0A/i);
  assert.match(css, /--charcoal:\s*#151515/i);
  assert.match(css, /--gray-dark:\s*#242424/i);
  assert.match(css, /--gray:\s*#6B6B6B/i);
  assert.match(css, /--off-white:\s*#F5F5F3/i);
  assert.match(css, /--white:\s*#FFFFFF/i);
  assert.match(css, /--blue:\s*#2F7DF6/i);
  assert.match(css, /--yt-light-bg:\s*var\(--off-white\)/);
  assert.match(css, /--yt-light-surface:\s*var\(--white\)/);
  assert.match(css, /--yt-dark-text:\s*var\(--text-dark\)/);
  assert.match(css, /--yt-gray-text:\s*var\(--text-body-light\)/);
  assert.match(css, /--yt-gray-light:\s*#747B84/i);
  assert.match(css, /--yt-blue-soft:\s*rgba\(47,\s*125,\s*246,\s*0\.10\)/);

  assert.match(css, /\.light-section\s*\{[^}]*background:\s*var\(--yt-light-bg\);[^}]*color:\s*var\(--text-dark\);/s);
  assert.match(css, /\.light-section h1,[\s\S]*\.light-section h3\s*\{[^}]*color:\s*var\(--text-dark\);/);
  assert.match(css, /\.light-section p,[\s\S]*\.light-section li\s*\{[^}]*color:\s*var\(--text-body-light\);/);
  assert.match(css, /\.light-section \.card,[\s\S]*\.light-section \.notice\s*\{[^}]*background:\s*var\(--yt-light-surface\);[^}]*border-color:\s*rgba\(22,\s*32,\s*42,\s*0\.10\);/s);
  assert.match(css, /\.light-section \.button-primary\s*\{[^}]*background:\s*var\(--blue\);[^}]*color:\s*#ffffff;/s);
  assert.match(css, /\.light-section \.product-window\s*\{[^}]*background:[^}]*var\(--charcoal\);/s);
  assert.doesNotMatch(css, /rgba\(67,\s*217,\s*230,\s*0\.(?:1[2-9]|[2-9]\d*)/);
  assert.doesNotMatch(css, /rgba\(66,\s*214,\s*211,\s*0\.(?:1[2-9]|[2-9]\d*)/);

  assert.match(home, /<Section className="problem-section light-section">/);
  assert.match(home, /<Section className="light-section">[\s\S]+Practical automation/);
  assert.match(home, /<Section className="os-band">/);
  assert.match(home, /<Section className="light-section">[\s\S]+From workflow problem to working system/);

  assert.match(servicesPage, /index % 2 === 0 \? "service-section light-section" : "service-section"/);
  assert.match(aboutPage, /<Section className="light-section">[\s\S]+about-philosophy/);
  assert.match(aboutPage, /<Section>\s*<div className="split">/);
  assert.match(aboutPage, /<Section className="light-section">[\s\S]+Principles that keep automation practical/);
  assert.match(howItWorksPage, /<Section className="light-section">[\s\S]+process-layout/);
  assert.match(automationOsPage, /<Section className="os-band">/);
});

test("monochrome final fixes keep light sections readable", async () => {
  const [aboutPage, ui, css] = await Promise.all([
    readFile(new URL("app/about/page.tsx", root), "utf8"),
    readFile(new URL("components/ui.tsx", root), "utf8"),
    readFile(new URL("app/globals.css", root), "utf8"),
  ]);

  assert.match(css, /--text-dark:\s*#161616/i);
  assert.match(css, /--text-body-light:\s*#555B63/i);
  assert.match(css, /--text-light:\s*#F5F5F3/i);
  assert.match(css, /--text-muted-dark:\s*#A8AFB7/i);
  assert.match(css, /--yt-light-bg:\s*var\(--off-white\)/);

  assert.match(aboutPage, /className="workflow-first-copy"/);
  assert.match(css, /\.workflow-first-copy\s*\{[^}]*color:\s*var\(--text-dark\);/s);
  assert.doesNotMatch(css, /\.about-philosophy p\s*\{[^}]*color:\s*var\(--ink\);/s);

  assert.match(css, /\.light-section h1,[\s\S]*\.light-section h3\s*\{[^}]*color:\s*var\(--text-dark\);/s);
  assert.match(css, /\.light-section p,[\s\S]*\.light-section li\s*\{[^}]*color:\s*var\(--text-body-light\);/s);
  assert.match(css, /\.light-section small,[\s\S]*\.light-section \.meta\s*\{[^}]*color:\s*#747B84;/s);

  assert.match(ui, /className="price-label"/);
  assert.match(ui, /className="price"/);
  assert.match(css, /\.service-card \.price\s*\{[^}]*color:\s*var\(--text-dark\);[^}]*font-weight:\s*650;/s);
  assert.match(css, /\.service-card \.price-label\s*\{[^}]*color:\s*#6B7178;/s);
});

test("V2 concept ships alongside V1 without replacing it", async () => {
  const [layout, v2Layout, chromeGate, v1Home] = await Promise.all([
    readFile(new URL("app/layout.tsx", root), "utf8"),
    readFile(new URL("app/v2/layout.tsx", root), "utf8"),
    readFile(new URL("components/chrome-gate.tsx", root), "utf8"),
    readFile(new URL("app/page.tsx", root), "utf8"),
  ]);

  // V1 keeps its own chrome; only /v2 opts out of it.
  assert.match(layout, /<ChromeGate footer=\{<Footer \/>\} header=\{<Navbar \/>\}>/);
  assert.match(chromeGate, /SELF_CHROMED = \["\/v2", "\/v3"\]/);
  assert.match(v1Home, /<Section className="hero">/);

  // V2 owns its own shell, styles, and brand moment.
  assert.match(v2Layout, /import "\.\/v2\.css"/);
  assert.match(v2Layout, /<V2Nav \/>/);
  assert.match(v2Layout, /<IntroOverlay \/>/);

  await Promise.all(
    [
      "app/v2/page.tsx",
      "app/v2/services/page.tsx",
      "app/v2/automation-os/page.tsx",
      "app/v2/how-it-works/page.tsx",
      "app/v2/about/page.tsx",
      "app/v2/contact/page.tsx",
    ].map((route) => access(new URL(route, root))),
  );
});

test("V2 follows the cinematic blueprint", async () => {
  const [css, intro, introBoot, scene, home, contact] = await Promise.all([
    readFile(new URL("app/v2/v2.css", root), "utf8"),
    readFile(new URL("components/v2/intro-overlay.tsx", root), "utf8"),
    readFile(new URL("app/v2/layout.tsx", root), "utf8"),
    readFile(new URL("components/v2/sticky-scene.tsx", root), "utf8"),
    readFile(new URL("app/v2/page.tsx", root), "utf8"),
    readFile(new URL("app/v2/contact/page.tsx", root), "utf8"),
  ]);

  // Dark monochrome system, scoped so it cannot leak into V1.
  assert.match(css, /^\.v2 \{/m);
  assert.match(css, /--yt-black: #080808/);
  assert.match(css, /--yt-blue: #2f7df6/);
  assert.doesNotMatch(css, /purple|rainbow|#00f{3}/i);

  // Product windows use one frame style.
  assert.match(css, /\.v2-window \{[^}]*background: #101010;/s);
  assert.match(css, /border-radius: var\(--v2-radius\)/);

  // Brand moment: one play per session, skippable, reduced-motion aware.
  assert.match(introBoot, /sessionStorage/);
  assert.match(intro, /Escape/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /html\[data-yt-intro="play"\] \.v2-intro \{/);

  // Scroll scenes are sticky + IntersectionObserver, not scroll hijacking.
  assert.match(scene, /IntersectionObserver/);
  assert.match(css, /\.v2-scene-visual \{[^}]*position: sticky;[^}]*top: 12vh;/s);

  // Editorial pricing numbers instead of pricing cards.
  assert.match(home, /v2-pricing-figure/);

  // Static prototype: the form still posts to the shared endpoint.
  assert.match(contact, /NEXT_PUBLIC_FORM_ENDPOINT/);
  assert.doesNotMatch(contact, /server action|\/api\//i);
});

test("V3 is the V2 design plus scroll-driven scene mechanics", async () => {
  const [v3Layout, v3Home, v3HowItWorks, scene, flight, css, showcase] =
    await Promise.all([
      readFile(new URL("app/v3/layout.tsx", root), "utf8"),
      readFile(new URL("app/v3/page.tsx", root), "utf8"),
      readFile(new URL("app/v3/how-it-works/page.tsx", root), "utf8"),
      readFile(new URL("components/v3/scroll-scene.tsx", root), "utf8"),
      readFile(new URL("components/v3/flight-scene.tsx", root), "utf8"),
      readFile(new URL("app/v3/v3.css", root), "utf8"),
      readFile(new URL("components/v3/showcase.tsx", root), "utf8"),
    ]);

  // Own shell and stylesheet; nothing imported from V2.
  assert.match(v3Layout, /import "\.\/v3\.css"/);
  assert.match(v3Layout, /<V3Nav \/>/);
  for (const file of [v3Layout, v3Home, v3HowItWorks]) {
    assert.doesNotMatch(file, /components\/v2\//);
    assert.doesNotMatch(file, /@\/content\/v2/);
  }

  // Showcase renders are shared with V2 rather than duplicated on disk.
  assert.match(showcase, /ASSET_DIR = "v2-assets"/);

  // Scroll progress is published to CSS, not held in React state.
  assert.match(scene, /--scene-p/);
  assert.match(scene, /--scene-peak/);
  assert.match(scene, /prefers-reduced-motion/);

  // Stages are driven by a continuous camera, not a state crossfade.
  assert.match(flight, /const camera = progress \* \(steps\.length - 1\)/);
  assert.match(flight, /scale = 1 \/ \(1 \+ d \* DEPTH\)/);
  assert.match(flight, /scale = 1 \+ -d \* 0\.9/);
  assert.match(css, /\.v3-flight-cell/);

  // The Automation OS headline swells while pinned, then settles.
  assert.match(v3Home, /v3-os-headline-scene/);
  assert.match(css, /scale\(calc\(1 \+ [0-9.]+ \* var\(--scene-peak, 0\)\)\)/);

  // Console and pricing share a scene so one reacts to the other arriving.
  assert.match(v3Home, /v3-os-stack/);
  assert.match(css, /\.v3-os-stack \.v3-os-console/);

  // Pricing glows via text-shadow, which no other system writes.
  assert.match(css, /\.v3-os-stack \.v3-pricing-figure strong \{[^}]*text-shadow/s);

  // Both step lists get the scroll-drawn spine.
  assert.match(v3Home, /v3-steps-scene/);
  assert.match(v3HowItWorks, /v3-steps-scene/);
  assert.match(css, /height: calc\(var\(--scene-p, 0\) \* 100%\)/);

  await Promise.all(
    ["app/v3/services/page.tsx", "app/v3/about/page.tsx", "app/v3/contact/page.tsx"].map(
      (file) => access(new URL(file, root)),
    ),
  );
});
