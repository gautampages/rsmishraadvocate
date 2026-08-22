# Advocate Ram Snehi Mishra — Website

A multi-page website for **Advocate Ram Snehi Mishra**, built with React + Vite and
**prerendered to static HTML** — every URL is a complete document before any
JavaScript runs, then hydrates into a single-page app.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Home — hero, live case-status tracker, practice overview, AI assistant, contact |
| `/practice/<slug>` | Four practice-area pages (divorce & family, criminal, civil, property) |
| `/blog`, `/blog/<slug>` | Legal insight articles, one URL each |
| `/book` | Appointment booking with real slots, calendar export and WhatsApp fallback |
| `/tools`, `/tools/<slug>` | Seven free calculators and lookups |
| `/checklists`, `/checklists/<slug>` | Printable document checklists |
| `/fees` | Fees and engagement terms |
| `/privacy-policy`, `/terms`, `/disclaimer` | Policy documents |

## Features

- Prerendered HTML per route, with per-page `<title>`, description, canonical URL
  and JSON-LD; `sitemap.xml` generated at build time from the same route table
- Live eCourts case-status tracker and an AI legal assistant (Cloudflare Workers)
- Free legal tools: Bihar stamp duty, katha–sq ft land unit converter, IPC→BNS
  section converter, Bihar court fee, maintenance estimator, limitation
  checker, Vaishali cause-list lookup — all computed in the browser
- Appointment booking against the chamber's real office hours, with `.ics` export
- Scroll-reveal animations (respect `prefers-reduced-motion`), print stylesheet
- Navy + gold aesthetic, Fraunces + Inter typography, fully responsive

## Editing content

Content is split by concern, all under [`src/data/`](src/data/):

| File | Holds |
| --- | --- |
| `content.js` | Home page copy, navigation, contact details, office hours |
| `routes.js` | **Every URL** + its page title and description (drives prerender + sitemap) |
| `practice.js` | Practice-area pages |
| `blogPosts.js` | Articles — add an entry to publish a new one |
| `tools.js` | Tool index metadata |
| `checklists.js` | Document checklists |
| `fees.js` | Fee schedule and engagement terms |
| `legal.js` | Privacy policy, terms, disclaimer |

Calculation logic for the tools lives in [`src/lib/legalTools.js`](src/lib/legalTools.js).

### Outstanding TODOs

- **`src/data/fees.js`** — set `FEES_PUBLISHED = true` and fill in the `amount`
  fields. Until then the page reads "Quoted per matter" rather than showing
  invented figures.
- **`src/data/blogPosts.js`** — fill in each post's `date`. While it is null the
  page shows no date and `datePublished` is omitted from the structured data.

## Adding a page

1. Add an entry to `src/data/routes.js` (path, title, description).
2. Add a `<Route>` in `src/App.jsx`.

Prerendering and the sitemap follow automatically.

## Development

```bash
npm install         # install dependencies
npm run dev         # start dev server (http://localhost:5173)
npm run build       # client build + SSR build + prerender → dist/
npm run build:client # client bundle only (no prerender)
npm run preview     # preview the production build
npm run lint        # run oxlint
```

`npm run build` runs three steps: the client bundle, an SSR bundle of
`src/entry-server.jsx`, and then [`scripts/prerender.mjs`](scripts/prerender.mjs),
which renders every route in `src/data/routes.js` to its own `index.html` and
regenerates `sitemap.xml`.

## Deployment

The `dist/` folder is a fully static site — each route is a real directory with
its own `index.html`, so any static host serves it correctly with no SPA rewrite
rules. Deploy to **Cloudflare Pages**, **Netlify**, **Vercel**, GitHub Pages or
any web server.

## Backend services

| Service | Powers | Without it |
| --- | --- | --- |
| `api.ramsnehimishra.in` | `/book` submissions + the appointment status popup | Booking falls back to WhatsApp |
| `workers/legal-data` | Case-status tracker | Tracker shows an error |
| `ikanoon.gautampages.workers.dev` | Case-law search + judgment reader | Search shows an error |
| (assistant worker) | AI legal assistant | Chat suggests WhatsApp instead |

### Case-law API (Indian Kanoon) — attribution is contractual

Judgments, orders and Acts come from **Indian Kanoon**, and their
[API terms](https://api.indiankanoon.org/terms/) require the *powered by
IKanoon* mark to be shown **on top of** any results or documents taken from
them, "full and clearly visible, never altered, resized or partially covered",
with separate desktop and mobile variants.

[`KanoonAttribution`](src/components/KanoonAttribution.jsx) is the only correct
way to render it. It serves the two supplied PNGs from `public/ikanoon/`
untouched, at their intrinsic sizes (150×61 and 28×42), swapping files at the
breakpoint rather than scaling either. **Do not** restyle it, wrap it in
something that clips it, apply a filter or opacity to it, or lazy-load it.
`.ikanoon img` sets `max-width: none` on purpose — the global
`img { max-width: 100% }` reset would otherwise shrink the mark in a narrow
container and put the site in breach without anything looking wrong.

The source is also disclosed in the Terms of Use (`src/data/legal.js`), which
is what the same terms ask for when the data is used indirectly. **If the data
is ever fed to the AI assistant — the `/fragment` endpoint is designed for
exactly that — the attribution has to appear in the assistant's UI too.**

The API is **prepaid**: every call is deducted from a balance, and when the
balance runs out the service returns no results rather than an error. Two
consequences: watch the balance, and note that
[`lib/kanoon.js`](src/lib/kanoon.js) caches responses for 30 minutes and
de-duplicates in-flight requests to keep the bill down. Server-side caching in
the Worker would cut it much further — see the SEO notes.

### Appointments API

`GET /appointment?status=PENDING` returns the visitor's current appointment and
their history. The API identifies visitors **by IP address**, so there is
nothing to authenticate and nothing stored in the browser.
[`AppointmentStatus`](src/components/AppointmentStatus.jsx) calls it on every
page load and opens a popup when an appointment is active; a failed call is
silent, since a visitor who never booked anything should not see an error.

`POST /appointment` submits a booking. Validation failures (e.g.
`PAST_APPOINTMENT`) are shown inline for the visitor to correct; only an
unreachable service falls through to the WhatsApp hand-off.

The API's CORS policy names the production hostname, so `npm run dev` routes
through the `/api/appointment` proxy in `vite.config.js`.

## Tech stack

React 19 · Vite · plain CSS (design tokens, no UI framework)

---

> This website is for informational purposes only and does not constitute legal
> advice or solicitation.
