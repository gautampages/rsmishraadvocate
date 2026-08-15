// ============================================================================
//  SITE CONSTANTS — the few values that everything else is built from.
//
//  This module exists to break an import cycle. routes.js needs the JSON-LD
//  builder (structuredData.js) so the prerenderer can bake structured data
//  into every static file; structuredData.js needs absolute URLs. Both now
//  depend on this leaf module instead of on each other.
//
//  NOTE: file extensions are mandatory throughout this import chain — it is
//  loaded by scripts/prerender.mjs through Node's ESM loader, which (unlike
//  Vite) does not resolve extensionless specifiers.
// ============================================================================

export const SITE_URL = "https://ramsnehimishra.in";

/** Absolute URL for a route path. */
export const absolute = (path) => `${SITE_URL}${path === "/" ? "/" : path}`;

// Stable @id values. Every page's structured data points at the SAME organisation
// and person node rather than re-describing the chamber, which is how search
// engines tie forty separate URLs to one real-world entity.
export const ORG_ID = `${SITE_URL}/#organization`;
export const PERSON_ID = `${SITE_URL}/#advocate`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const OG_IMAGE = `${SITE_URL}/og-image.jpg`;
