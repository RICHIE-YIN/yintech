# V2 Showcase Assets

Drop a file here using one of the names below and the matching section
switches from its coded mockup to the real render on the next build. No code
change needed — `components/v2/showcase.tsx` checks for these files at build
time.

`.webp` is preferred; `.png` and `.jpg` also work. Extension priority is
webp → png → jpg, so adding `name.webp` later takes precedence over an
existing `name.png` and the PNG can then be deleted.

The check runs at build time, not per request. In `npm run dev` an added or
removed file is picked up on the next rebuild — touch the page file or
restart the dev server. A deploy always rebuilds, so nothing extra is needed
there.

Source files can stay PNG: Next's image optimizer converts and resizes on
delivery. The 1536x1024 PNGs in this directory are served as ~86KB WebP.

| File name (without extension)          | Where it appears                                      | Fallback while missing        |
| -------------------------------------- | ----------------------------------------------------- | ----------------------------- |
| `hero-system-showcase`                 | Homepage hero centrepiece                             | Coded Automation OS console   |
| `home-system-transformation-showcase`  | Homepage "workflow problem to working system", step 3 | Coded connected-operation UI  |
| `automation-os-flagship-showcase`      | Homepage OS section + Automation OS page hero         | Coded OS console              |
| `services-sales-automation-showcase`   | Services chapter 01 anchor                            | *nothing — band is hidden*    |
| `services-quotes-operations-showcase`  | Services chapter 02 anchor                            | *nothing — band is hidden*    |
| `services-crm-systems-showcase`        | Services chapter 03 anchor                            | *nothing — band is hidden*    |
| `services-websites-showcase`           | Services chapter 04 anchor                            | *nothing — band is hidden*    |
| `about-workflow-philosophy-showcase`   | About page split visual                               | Coded current-process UI      |
| `how-it-works-system-map-showcase`     | How It Works anchor band                              | *nothing — band is hidden*    |
| `hero-backdrop`                        | Homepage hero, full-bleed behind the copy             | Motif + grid, no photograph   |
| `page-backdrop`                        | Shared across all five inner page heroes              | Flat black hero, as before    |

The per-service sticky states on the Services page stay coded on purpose —
they change as you scroll, which an image cannot do.

## Backdrops

`hero-backdrop` and `page-backdrop` are atmosphere, not content: they sit
full-bleed behind hero copy under a scrim that guarantees text contrast
regardless of the artwork. Keep the left 40% of the frame close to empty —
that is where the headline sits — and keep them dark enough that nothing in
the image competes with the type.

The homepage backdrop is the loud one and carries the embossed mark. The
shared inner-page backdrop should be the same architectural world, quieter,
and without the mark, so the homepage keeps its arrival moment.

Both should be at least 2560px wide: they render full-bleed, so on a retina
display a narrower source visibly softens.

## Style direction

Dark charcoal/black foundation, restrained electric-blue highlights, modern
enterprise software aesthetic, clean panels, premium lighting, subtle depth.
No cartoon style, no holograms, no cyberpunk, no neon, no purple, no robots,
no readable gibberish text walls.

Frame shape is read from the file itself at build time (`lib/image-size.ts`
parses the PNG/JPEG/WebP header), so a replacement of any dimensions fits its
frame exactly — no letterboxing, no code change, no ratio to keep in sync.
`object-fit: contain` remains as a safety net.

One dev-only gotcha: Next caches optimized images under `.next/dev/cache/images`
keyed by URL. Replacing a file while keeping its name can serve the previous
version locally — delete that directory to force a re-encode. Production builds
cache per deployment, so this does not affect the live site.

## Generation prompts

**hero-system-showcase** — A premium dark-mode enterprise software product
showcase for an AI automation and business systems company. Show a large
central interface in a sleek charcoal and black UI with subtle electric-blue
accents. The interface should visually combine lead intake, qualification
score, CRM record creation, follow-up scheduling, and dashboard visibility
into one cohesive system. Make it look like a high-end product render or
marketing showcase, not a plain dashboard screenshot. Minimal background,
cinematic lighting, clean composition, premium enterprise software aesthetic.

**services-sales-automation-showcase** — A premium enterprise software
showcase image for a sales and lead automation system. Display a modern dark
UI showing AI lead qualification, email-to-lead parsing, live chat lead
capture, automated follow-up scheduling, and old lead reactivation. The scene
should feel like one connected workflow inside a polished product ecosystem.
Cinematic presentation, dark charcoal theme, subtle blue highlights, clean
typography areas, minimal clutter, premium software marketing render style.

**services-quotes-operations-showcase** — A premium dark-mode enterprise
system showcase focused on quotes, proposals, approvals, reporting,
compliance, and inventory. Show a polished quote builder interface with line
items, proposal sections, an approval workflow, and operational reporting
panels. The scene should feel like a high-end business operations workspace
with a cinematic presentation and restrained electric-blue accents.
Monochrome charcoal palette, premium software product render, no people.

**services-crm-systems-showcase** — A premium enterprise CRM and internal
systems showcase image. Show a modern dark UI with pipeline stages, lead
records, activity feed, executive dashboard panels, knowledge system access,
and internal app or portal modules. The composition should look like one
unified business systems platform for a modern company. Charcoal and black
interface, minimal white and gray panels, subtle blue accents, premium
enterprise software marketing render style.

**services-websites-showcase** — A premium product showcase image for
websites integrated into business workflows. Show a modern website
presentation or browser-style interface connected visually to lead capture,
qualification, CRM, and follow-up flow. The image should communicate that
websites are part of a larger business system. Dark monochrome tech aesthetic
with subtle blue accents, premium software and website render style, clean
and minimal.

**home-system-transformation-showcase** — A premium visual showing
transformation from a messy manual workflow into a clean connected automated
business system. On one side, show a fragmented process like website lead,
manual review, spreadsheet, and manual follow-up. On the other side, show a
refined connected system with lead intake, qualification, CRM, follow-up, and
dashboard. Present it as a sleek enterprise system transformation graphic in
dark charcoal tones with restrained blue highlights, cinematic and minimal.

**automation-os-flagship-showcase** — A flagship premium product render for
an enterprise automation platform called Automation OS. Show five connected
modules: Lead, AI Qualification, CRM, Follow-Up, and Dashboard. Present it as
a cinematic high-end software system render with one large unified interface
and subtle connected module framing. Dark monochrome palette, premium
product-marketing quality, restrained blue highlights, clean and minimal,
enterprise software aesthetic.

**about-workflow-philosophy-showcase** — A premium editorial-style technology
visual for a workflow-first AI philosophy. Show a clean, modern, dark
enterprise systems environment or abstract system composition that suggests
process clarity, automation structure, and practical business technology.
Minimal, cinematic, monochrome, refined, with subtle blue accents. No people,
no robots, no loud UI clutter.

**how-it-works-system-map-showcase** — A premium dark-mode system map visual
for an enterprise automation implementation process. Show a clean structured
flow from automation audit to system map, proposal, build, test, deploy, and
manage. The visual should feel like a sophisticated workflow architecture
diagram or systems map, presented with a premium enterprise software
aesthetic. Charcoal palette, restrained electric-blue accents, cinematic and
minimal.
