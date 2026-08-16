// ============================================================================
//  ROUTE TABLE — the single source of truth for every URL on the site.
//
//  Consumed twice:
//    1. At runtime by <Seo> (src/components/Seo.jsx), which keeps <title>,
//       the meta description and the canonical link in sync as the visitor
//       navigates the SPA.
//    2. At build time by scripts/prerender.mjs, which renders each `path`
//       to a real HTML file so crawlers and link previews get a complete
//       document instead of an empty <div id="root">, and which bakes in the
//       `jsonLd` graph attached to each entry below.
//
//  Adding a page = adding an entry here + a <Route> in src/App.jsx.
//  Anything listed here is automatically prerendered, given its structured
//  data, and put in the sitemap.
// ============================================================================

// NOTE: file extensions are mandatory in this module's import chain.
// scripts/prerender.mjs loads routes.js through Node's ESM loader, which —
// unlike Vite — does not resolve extensionless specifiers.
import { SITE_URL, absolute } from "./site.js";
import { jsonLdFor } from "./structuredData.js";
import { practiceAreas } from "./practice.js";
import { blogPosts, blogMeta } from "./blogPosts.js";
import { tools } from "./tools.js";
import { checklists } from "./checklists.js";
import { districts, courtName, placeLabel } from "./courts.js";
import { topics as caseLawTopics } from "./caseLaw.js";
import { hindiPages, hindiPath } from "./hindi.js";
import { courtGuide } from "./courtGuide.js";

// Re-exported so the many pages that already import them from here keep
// working; the definitions themselves live in site.js to break an import
// cycle with structuredData.js.
export { SITE_URL, absolute };

// `changefreq` / `priority` feed sitemap.xml generation.
const table = [
  {
    path: "/",
    title: "Best Advocate & Lawyer in Hajipur, Vaishali (Bihar) | Advocate Ram Snehi Mishra",
    description:
      "Advocate Ram Snehi Mishra is a Senior Advocate in Hajipur, Vaishali (Bihar) with 28+ years in divorce & family, criminal, civil and property law. Book a consultation.",
    priority: "1.0",
    changefreq: "monthly",
  },

  // ---- Practice areas (one URL each, generated from src/data/practice.js) ---
  ...practiceAreas.map((p) => ({
    path: `/practice/${p.slug}`,
    title: p.seoTitle,
    description: p.seoDescription,
    priority: "0.9",
    changefreq: "monthly",
  })),

  // ---- The home court's own page --------------------------------------------
  //
  //  "hajipur civil court" / "vaishali district court" are navigational
  //  queries nothing on the site owned; this guide page is their hub.
  {
    path: courtGuide.path,
    title: courtGuide.seoTitle,
    description: courtGuide.seoDescription,
    priority: "0.9",
    changefreq: "monthly",
  },

  // ---- Hindi pages (/hi pilot, generated from src/data/hindi.js) ------------
  //
  //  `lang` makes the prerenderer emit <html lang="hi"> and og:locale hi_IN;
  //  hreflang pairing with the English counterparts is attached below via
  //  HREFLANG so the two language versions point at each other.
  ...hindiPages.map((p) => ({
    path: hindiPath(p),
    title: p.seoTitle,
    description: p.seoDescription,
    lang: "hi",
    priority: p.slug ? "0.8" : "0.85",
    changefreq: "monthly",
  })),

  // ---- Case status ----------------------------------------------------------
  //
  //  The hub plus one page per Bihar district. "Case status" is the single
  //  highest-volume legal query in the state and it is asked district by
  //  district — "Hajipur court case status", "Muzaffarpur case number" — so
  //  it is answered district by district.
  {
    path: "/case-status",
    title: "Bihar Court Case Status — Check Online by CNR or Name",
    description:
      "Free case status check for every Bihar district court — Vaishali (Hajipur), Patna and all 38 districts — by CNR, party or advocate name. Works for any Indian court too.",
    priority: "0.8",
    changefreq: "daily",
  },
  // The town people actually search for leads the title: "Hajipur Court Case
  // Status", "Sasaram Court Case Status" — with the district name kept for the
  // records-facing query form. Where town and district share a name, the
  // "X District Court" phrasing is itself the query.
  ...districts.map((d) => ({
    path: `/case-status/${d.slug}`,
    title:
      d.hq === d.district
        ? `${d.district} District Court Case Status — by CNR or Name`
        : `${d.hq} Court Case Status — ${d.district} District, by CNR or Name`,
    description: `Check ${courtName(d)} case status free — by CNR, party or advocate name. Next hearing date, stage and orders from live eCourts records. ${placeLabel(d)}, Bihar.`,
    priority: d.home ? "0.9" : d.target ? "0.8" : "0.5",
    changefreq: d.home || d.target ? "weekly" : "monthly",
  })),

  // ---- Case-law research ----------------------------------------------------
  //
  //  The hub and the subject pages are real pages and are indexed. Result sets
  //  (/case-law?q=…) and the judgment reader are not: they are views over
  //  someone else's corpus, and indexing five million of them would bury this
  //  site's own pages under near-duplicate content it could never win with.
  //  The reader is still prerendered — the shell has to exist as a file for a
  //  direct link to it to resolve at all — but it is noindex and stays out of
  //  the sitemap.
  {
    path: "/case-law",
    title: "Patna High Court & Supreme Court Judgments — Free Search",
    description:
      "Free full-text search of judgments, orders and Acts — the Patna High Court, Supreme Court, every High Court and the tribunals. Filter by court, date, judge or case title.",
    priority: "0.7",
    changefreq: "weekly",
  },
  ...caseLawTopics.map((t) => ({
    path: `/case-law/${t.slug}`,
    title: t.seoTitle,
    description: t.seoDescription,
    priority: "0.8",
    changefreq: "monthly",
  })),
  {
    path: "/case-law/judgment",
    title: "Judgment | Advocate Ram Snehi Mishra",
    description: "Read the full text of an Indian judgment, with every citation in it linked.",
    noindex: true,
  },

  // ---- AI legal assistant ---------------------------------------------------
  {
    path: "/ask",
    title: "Ask a Legal Question Free — AI Legal Assistant for Bihar",
    description:
      "Ask any legal question and get a plain answer in English or Hindi — divorce, maintenance, dakhil-kharij, bail, cheque bounce and court procedure in Bihar explained simply. Free, instant, any hour.",
    priority: "0.6",
    changefreq: "monthly",
  },

  // ---- Blog (index + one URL per post) --------------------------------------
  {
    path: "/blog",
    title: "Legal Insights & Updates | Advocate Ram Snehi Mishra, Hajipur",
    description: blogMeta.subtext,
    priority: "0.7",
    changefreq: "weekly",
  },
  ...blogPosts.map((p) => ({
    path: `/blog/${p.slug}`,
    title: p.seoTitle || p.title,
    description: p.seoDescription || p.excerpt,
    lastmod: p.date || undefined,
    ogType: "article",
    published: p.date || undefined,
    priority: "0.6",
    changefreq: "yearly",
  })),

  // ---- Consultation booking -------------------------------------------------
  {
    path: "/book",
    title: "Book a Legal Consultation in Hajipur | Advocate Ram Snehi Mishra",
    description:
      "Choose a date and time for a confidential consultation with Advocate Ram Snehi Mishra — at the chamber in Hajipur or by telephone. Slots follow the chamber's court schedule.",
    priority: "0.9",
    changefreq: "monthly",
  },

  // ---- Free legal tools -----------------------------------------------------
  {
    path: "/tools",
    title: "Free Legal Calculators & Lookups for Bihar | Advocate Ram Snehi Mishra",
    description:
      "Free tools for court users in Bihar — Bihar stamp duty and registration calculator, civil suit court fee calculator, maintenance estimator, limitation period checker and Vaishali cause list lookup.",
    priority: "0.8",
    changefreq: "monthly",
  },
  ...tools.map((t) => ({
    path: t.path,
    title: t.seoTitle,
    description: t.seoDescription,
    priority: "0.8",
    changefreq: "monthly",
  })),

  // ---- Document checklists --------------------------------------------------
  {
    path: "/checklists",
    title: "Free Legal Document Checklists (PDF) — Divorce, Criminal, Property, Consumer | Adv. Ram Snehi Mishra",
    description:
      "Free downloadable PDF checklists for a mutual consent divorce, a criminal case, buying land in Bihar, a property dispute and a consumer complaint — from the chamber of Advocate Ram Snehi Mishra.",
    priority: "0.8",
    changefreq: "monthly",
  },
  ...checklists.map((c) => ({
    path: `/checklists/${c.slug}`,
    title: c.seoTitle,
    description: c.seoDescription,
    priority: "0.7",
    changefreq: "yearly",
  })),

  // ---- Fees -----------------------------------------------------------------
  {
    path: "/fees",
    title: "Legal Fees & Engagement | Advocate Ram Snehi Mishra, Hajipur",
    description:
      "How fees are quoted and agreed at the chamber of Advocate Ram Snehi Mishra, and which costs — court fee, stamp duty, process fee — are set by statute and payable separately.",
    priority: "0.7",
    changefreq: "monthly",
  },

  // ---- Legal / policy pages -------------------------------------------------
  {
    path: "/privacy-policy",
    title: "Privacy Policy | Advocate Ram Snehi Mishra",
    description:
      "How this website collects, uses and protects your personal data, including enquiry details, case-status searches and AI assistant conversations, under the DPDP Act 2023.",
    priority: "0.3",
    changefreq: "yearly",
  },
  {
    path: "/terms",
    title: "Terms of Use | Advocate Ram Snehi Mishra",
    description:
      "Terms governing your use of ramsnehimishra.in — the case-status tracker, AI legal assistant, legal calculators and enquiry forms.",
    priority: "0.3",
    changefreq: "yearly",
  },
  {
    path: "/disclaimer",
    title: "Disclaimer | Advocate Ram Snehi Mishra",
    description:
      "This website is for information only and is not an advertisement or solicitation. No advocate–client relationship is created by using it.",
    priority: "0.3",
    changefreq: "yearly",
  },
];

// English ↔ Hindi hreflang pairs. Attached to BOTH sides below, so each
// language version declares the other (hreflang must be reciprocal to count);
// x-default points at the English page.
const HREFLANG = [
  ["/", "/hi"],
  ["/practice/divorce-family-lawyer-hajipur", "/hi/talak-ka-vakil-hajipur"],
  ["/practice/criminal-lawyer-hajipur", "/hi/jamanat-ka-vakil-hajipur"],
  ["/blog/dakhil-kharij-mutation-bihar", "/hi/dakhil-kharij-bihar"],
];

const alternatesFor = (path) => {
  const pair = HREFLANG.find(([en, hi]) => en === path || hi === path);
  if (!pair) return undefined;
  const [en, hi] = pair;
  return { "en-IN": en, "hi-IN": hi, "x-default": en };
};

// Structured data is attached here rather than written out by hand on every
// entry: one builder, one graph per URL, and the prerenderer and <Seo> cannot
// disagree about what a page claims to be.
export const routes = table.map((r) => ({
  ...r,
  jsonLd: jsonLdFor(r.path),
  alternates: alternatesFor(r.path),
}));

/** Look up a route by path, for <Seo>. */
export const routeFor = (path) => routes.find((r) => r.path === path);
