# Advocate Ram Snehi Mishra — Website

A modern, responsive, single-page static website for **Advocate Ram Snehi Mishra**, built with React + Vite. No backend required — deploys anywhere static files are served.

## Features

- Fixed glass navbar with smooth-scroll navigation and a mobile menu
- Cinematic hero with practice stats and an advocate profile card
- About, Practice Areas, Why Choose Us, Testimonials and Contact sections
- Scroll-reveal animations (respect `prefers-reduced-motion`)
- Automatic light/dark theme (follows the visitor's OS setting)
- Fully responsive (desktop, tablet, mobile)
- Contact form that opens the visitor's email client (static-friendly, no server)
- Navy + gold "legal" aesthetic, Fraunces + Inter typography
- SEO / Open Graph meta tags, custom scales-of-justice favicon

## Editing content

All text lives in one file — **[`src/data/content.js`](src/data/content.js)**.
Update the advocate name, bio, practice areas, testimonials and contact details there.
Fields marked `// TODO` still contain placeholder data (phone, email, chamber
address, credentials) — replace them with the real information.

## Development

```bash
npm install      # install dependencies
npm run dev      # start dev server (http://localhost:5173)
npm run build    # production build → dist/
npm run preview  # preview the production build
npm run lint     # run oxlint
```

## Deployment

The `dist/` folder is a fully static site. Deploy to any static host:

- **GitHub Pages**, **Netlify**, **Vercel**, **Cloudflare Pages**, or any web server.

For GitHub Pages served from a sub-path, set `base` in `vite.config.js` to your
repo name (e.g. `base: '/rsmishraadvocate/'`) before building.

## Tech stack

React 19 · Vite · plain CSS (design tokens, no UI framework)

---

> This website is for informational purposes only and does not constitute legal
> advice or solicitation.
