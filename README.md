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
- **V4 (current direction)** — routes under `/v4`. Its own stylesheet
  (`app/v4/v4.css`), components in `components/v4/`, copy in `content/v4.ts`.
  Includes the scope builder, which prices a selection from the same service
  list the services page renders. Set `V4_INDEXABLE` in `content/v4.ts` to
  true to put it in the sitemap and allow indexing.
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

Environment variables are documented in `.env.example`. The important one:

- `NEXT_PUBLIC_FORM_ENDPOINT` — where the audit form delivers. **V4 hides the
  form entirely until this is set**, because a form without a destination
  accepts requests and loses them. V1–V3 fall back to `/thank-you`, which does
  exactly that; treat those as concepts, not lead capture.

Also generated automatically: `/sitemap.xml`, `/robots.txt`, the favicon
(`app/icon.tsx`), and the social preview image (`app/opengraph-image.tsx`).

## Project Layout

```
app/            routes; app/v2/ holds the V2 concept and its stylesheet
components/     ui.tsx is V1; components/v2/ is V2
content/        services, pricing, and copy shared by both concepts
public/images/  logo and service artwork
tests/          structure tests run by `npm test`
```
