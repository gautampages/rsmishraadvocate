import { useEffect } from "react";
import { useLocation } from "react-router";
import { absolute, routeFor } from "../data/routes";

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

/**
 * Keeps the document head in step with the current route.
 *
 * The prerenderer already bakes correct tags into every generated HTML file,
 * so this only matters for in-app navigation — but without it a visitor who
 * clicks from the home page to /privacy-policy keeps the home page's title,
 * which is what social scrapers and the browser history menu would show.
 *
 * `title` / `description` override the route table, for dynamic pages such as
 * individual blog posts whose metadata is not known statically.
 */
export default function Seo({ title, description, canonical, jsonLd }) {
  const { pathname } = useLocation();

  useEffect(() => {
    const known = routeFor(pathname) || {};
    const finalTitle = title || known.title;
    const finalDesc = description || known.description;
    const finalCanonical = canonical || absolute(pathname);

    if (finalTitle) document.title = finalTitle;

    if (finalDesc) {
      upsert(
        'meta[name="description"]',
        () => Object.assign(document.createElement("meta"), { name: "description" }),
        "content",
        finalDesc
      );
      upsert(
        'meta[property="og:description"]',
        () => {
          const m = document.createElement("meta");
          m.setAttribute("property", "og:description");
          return m;
        },
        "content",
        finalDesc
      );
    }

    if (finalTitle) {
      upsert(
        'meta[property="og:title"]',
        () => {
          const m = document.createElement("meta");
          m.setAttribute("property", "og:title");
          return m;
        },
        "content",
        finalTitle
      );
    }

    upsert(
      'link[rel="canonical"]',
      () => Object.assign(document.createElement("link"), { rel: "canonical" }),
      "href",
      finalCanonical
    );
    upsert(
      'meta[property="og:url"]',
      () => {
        const m = document.createElement("meta");
        m.setAttribute("property", "og:url");
        return m;
      },
      "content",
      finalCanonical
    );
  }, [pathname, title, description, canonical]);

  // Page-specific structured data, replaced on every route change so a stale
  // FAQPage or BlogPosting block never trails the visitor to the next page.
  useEffect(() => {
    const id = "route-jsonld";
    document.getElementById(id)?.remove();
    if (!jsonLd) return;
    const tag = document.createElement("script");
    tag.type = "application/ld+json";
    tag.id = id;
    tag.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(tag);
    return () => tag.remove();
  }, [jsonLd]);

  return null;
}
