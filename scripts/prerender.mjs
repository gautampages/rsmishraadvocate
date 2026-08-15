// ============================================================================
//  PRERENDER — turns the SPA into real HTML files, one per route.
//
//  Why: without this, every URL on the site serves the same index.html whose
//  body is an empty <div id="root">. Crawlers that do not execute JavaScript,
//  WhatsApp/LinkedIn link previews, and Google's first indexing pass all see
//  nothing. After this step each route is a complete document with its own
//  <title>, description, canonical URL and content, and the React bundle
//  hydrates it in the browser.
//
//  Run automatically by `npm run build`:
//     vite build                       → dist/          (client bundle)
//     vite build --ssr entry-server    → dist-ssr/      (render function)
//     node scripts/prerender.mjs       → dist/**/index.html + sitemap.xml
// ============================================================================

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");

const { render } = await import(pathToFileURL(join(root, "dist-ssr", "entry-server.js")).href);
const { routes, absolute, SITE_URL } = await import(
  pathToFileURL(join(root, "src", "data", "routes.js")).href
);

const template = await readFile(join(dist, "index.html"), "utf8");

// ---------------------------------------------------------------------------
//  Contact-number guard.
//
//  src/data/content.js is the single source for the chamber's phone number,
//  but index.html hardcodes it twice — in the LegalService structured data and
//  in the no-JS fallback — because a static shell cannot import from the app.
//  Nothing else keeps those in step, so the build refuses to produce a site
//  that quotes two different numbers.
// ---------------------------------------------------------------------------
const { contact } = await import(pathToFileURL(join(root, "src", "data", "content.js")).href);
const digits = (s) => String(s).replace(/\D/g, "");
const PHONE = digits(contact.phone);

const stray = [...template.matchAll(/\+?91[\s-]?\d{5}[\s-]?\d{5}|\b\d{10}\b/g)]
  .map((m) => digits(m[0]).replace(/^91(?=\d{10}$)/, ""))
  .filter((n) => n.length === 10 && n !== PHONE.replace(/^91/, ""));

if (stray.length) {
  console.error(
    `\n✗ index.html quotes a phone number that is not contact.phone (${contact.phone}):\n` +
      `  ${[...new Set(stray)].join(", ")}\n` +
      `  Update index.html, or change src/data/content.js if the number really has changed.\n`
  );
  process.exit(1);
}

/** Replace the content of a meta tag matched by `attr="value"`. */
function setMeta(html, attr, value, content) {
  const re = new RegExp(`(<meta\\s+${attr}="${value}"[^>]*content=")[^"]*(")`, "i");
  return re.test(html) ? html.replace(re, `$1${escapeAttr(content)}$2`) : html;
}

const escapeAttr = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;");

// The FAQPage block in index.html describes the home page's FAQ section. It
// would be inaccurate on /terms or /privacy-policy, so it is stripped there.
const FAQ_JSONLD = /\n?\s*<!-- Structured data: FAQ[\s\S]*?<\/script>/;

function buildPage(route, appHtml) {
  let html = template;

  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${route.title}</title>`);
  html = setMeta(html, "name", "description", route.description);
  html = setMeta(html, "property", "og:title", route.title);
  html = setMeta(html, "property", "og:description", route.description);
  html = setMeta(html, "property", "og:url", absolute(route.path));
  html = setMeta(html, "name", "twitter:title", route.title);
  html = setMeta(html, "name", "twitter:description", route.description);

  html = html.replace(
    /<link rel="canonical" href="[^"]*"\s*\/>/i,
    `<link rel="canonical" href="${absolute(route.path)}" />`
  );

  if (route.path !== "/") html = html.replace(FAQ_JSONLD, "");
  if (route.jsonLd) {
    html = html.replace(
      "</head>",
      `  <script type="application/ld+json">\n${JSON.stringify(route.jsonLd, null, 2)}\n    </script>\n  </head>`
    );
  }

  return html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
}

let written = 0;
for (const route of routes) {
  const appHtml = render(route.path);
  const outDir = route.path === "/" ? dist : join(dist, route.path);
  await mkdir(outDir, { recursive: true });
  await writeFile(join(outDir, "index.html"), buildPage(route, appHtml), "utf8");
  written += 1;
  console.log(`  prerendered  ${route.path}`);
}

// ---------------------------------------------------------------------------
//  sitemap.xml — generated from the same table, so a new page can never be
//  added to the site and forgotten here.
// ---------------------------------------------------------------------------
const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${absolute(r.path)}</loc>
    <lastmod>${r.lastmod || today}</lastmod>
    <changefreq>${r.changefreq || "monthly"}</changefreq>
    <priority>${r.priority || "0.5"}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;
await writeFile(join(dist, "sitemap.xml"), sitemap, "utf8");

// ---------------------------------------------------------------------------
//  404.html — the page Cloudflare serves for any URL not uploaded above.
//
//  Known routes need no rewrite rule: each one is a real dist/<path>/index.html
//  that Workers Assets serves directly. Only unknown URLs need handling, and
//  wrangler.jsonc points not_found_handling at this file.
//
//  It is deliberately NOT a _redirects rule. Workers Assets only accepts 200,
//  301, 302, 303, 307 and 308 there — a `/*  /index.html  404` line is valid on
//  Pages but makes `wrangler deploy` fail with API error 100324.
//
//  Rendering an unrouted path makes App.jsx fall through to its <Route path="*">
//  catch-all, so this is the same NotFound page a visitor sees when the SPA is
//  already loaded. Status 404 comes from Cloudflare, not from the document.
// ---------------------------------------------------------------------------
// A 404 must not claim a canonical URL or invite indexing — that is how an
// error page ends up ranking for the address that was mistyped to reach it.
// setMeta REPLACES the template's existing robots tag; appending a second one
// would leave the page carrying both "index" and "noindex".
const notFoundHtml = setMeta(
  buildPage(
    {
      path: "/404",
      title: "Page not found | Advocate Ram Snehi Mishra",
      description: "The page you were looking for does not exist.",
    },
    render("/404")
  ).replace(/\n?\s*<link rel="canonical" href="[^"]*"\s*\/>/i, ""),
  "name",
  "robots",
  "noindex, follow"
);

await writeFile(join(dist, "404.html"), notFoundHtml, "utf8");

console.log(`\n✓ ${written} routes prerendered · sitemap.xml written (${SITE_URL})`);
