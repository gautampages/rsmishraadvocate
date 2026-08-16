import { useEffect, useMemo } from "react";
import { useLocation } from "react-router";
import { absolute, routeFor } from "../data/routes";
import { jsonLdFor } from "../data/structuredData";

/** Create the tag if it is missing, then set one attribute on it. */
function upsert(selector, create, attr, value) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
  return el;
}

const metaByName = (name) => [
  `meta[name="${name}"]`,
  () => Object.assign(document.createElement("meta"), { name }),
];

const metaByProp = (prop) => [
  `meta[property="${prop}"]`,
  () => {
    const m = document.createElement("meta");
    m.setAttribute("property", prop);
    return m;
  },
];

/**
 * Keeps the document head in step with the current route.
 *
 * The prerenderer already bakes correct tags into every generated HTML file,
 * so this only matters for in-app navigation — but without it a visitor who
 * clicks from the home page to /privacy-policy keeps the home page's title,
 * which is what social scrapers and the browser history menu would show.
 *
 * `title` / `description` override the route table, for dynamic pages whose
 * metadata is not known statically. `jsonLd` defaults to the same graph the
 * prerenderer bakes in, so a page gets correct structured data without doing
 * anything at all — see src/data/structuredData.js.
 */
export default function Seo({ title, description, canonical, jsonLd, noindex = false }) {
  const { pathname } = useLocation();

  // jsonLdFor returns a fresh object each call; without memoising it the
  // effect below would tear down and re-add the script tag on every render.
  const graph = useMemo(() => jsonLd ?? jsonLdFor(pathname), [jsonLd, pathname]);

  useEffect(() => {
    const known = routeFor(pathname) || {};
    const finalTitle = title || known.title;
    const finalDesc = description || known.description;
    const finalCanonical = canonical || absolute(pathname);

    // The prerenderer bakes the correct lang into each static file; this keeps
    // it correct when the visitor navigates between the /hi pages and the rest.
    document.documentElement.lang = known.lang || "en";

    if (finalTitle) {
      document.title = finalTitle;
      upsert(...metaByProp("og:title"), "content", finalTitle);
      upsert(...metaByName("twitter:title"), "content", finalTitle);
    }

    if (finalDesc) {
      upsert(...metaByName("description"), "content", finalDesc);
      upsert(...metaByProp("og:description"), "content", finalDesc);
      upsert(...metaByName("twitter:description"), "content", finalDesc);
    }

    upsert(...metaByName("robots"), "content", noindex ? "noindex, follow" : "index, follow, max-image-preview:large");

    // A noindex page (the 404) must not also claim a canonical URL — that is
    // how an error page ends up ranking for the address that was mistyped.
    const canonicalTag = document.head.querySelector('link[rel="canonical"]');
    if (noindex) {
      canonicalTag?.remove();
    } else {
      upsert(
        'link[rel="canonical"]',
        () => Object.assign(document.createElement("link"), { rel: "canonical" }),
        "href",
        finalCanonical
      );
      upsert(...metaByProp("og:url"), "content", finalCanonical);
    }
  }, [pathname, title, description, canonical, noindex]);

  // Page-specific structured data, replaced on every route change so a stale
  // FAQPage or BlogPosting block never trails the visitor to the next page.
  useEffect(() => {
    const id = "route-jsonld";
    document.getElementById(id)?.remove();
    if (!graph) return;
    const tag = document.createElement("script");
    tag.type = "application/ld+json";
    tag.id = id;
    tag.textContent = JSON.stringify(graph);
    document.head.appendChild(tag);
    return () => tag.remove();
  }, [graph]);

  return null;
}
