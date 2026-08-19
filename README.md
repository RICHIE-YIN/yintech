# YinTech Solutions

Marketing site for YinTech Solutions — AI automation, CRM, internal
applications, and custom business systems.

Built with Next.js 16 (App Router) and React 19. Static by design: no auth,
no database, no API routes. The contact form posts to an external form
endpoint.

## Site Concepts

Two concepts live in this repo and deploy together:

- **V1 (current design)** — routes at `/`, `/services`, `/automation-os`,
  `/how-it-works`, `/about`, `/contact`. Styles in `app/globals.css`,
  components in `components/ui.tsx`.
- **V2 (cinematic concept)** — routes under `/v2`. Styles in `app/v2/v2.css`
  (every rule scoped under `.v2`), components in `components/v2/`, copy in
  `content/v2.ts`. An experimental, product-led direction: session-scoped
  brand intro, sticky scroll scenes, and coded product interfaces instead of
  imagery.

Pricing and service data are shared from `content/`, so both concepts always
quote the same numbers. `components/v2/chrome-gate.tsx` keeps V1's navbar and
footer off `/v2` routes; nothing else in V1 is affected. V2 pages are marked
`noindex` while the concept is under review.

## Quick Start

```bash
npm install
npm run dev
```

The dev server runs at http://localhost:3000. V2 is at
http://localhost:3000/v2.

## Commands

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm start` — serve the production build locally
- `npm run lint` — ESLint
- `npm test` — build, then run the structure tests in `tests/`

## Deployment

Deploys to Vercel with the default Next.js settings — no build command or
output directory overrides needed.

Optional environment variable:

- `NEXT_PUBLIC_FORM_ENDPOINT` — where the contact form posts. Falls back to
  `/thank-you` when unset.

## Project Layout

```
app/            routes; app/v2/ holds the V2 concept and its stylesheet
components/     ui.tsx is V1; components/v2/ is V2
content/        services, pricing, and copy shared by both concepts
public/images/  logo and service artwork
tests/          structure tests run by `npm test`
```
