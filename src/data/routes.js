// ============================================================================
//  ROUTE TABLE — the single source of truth for every URL on the site.
//
//  Consumed twice:
//    1. At runtime by <Seo> (src/components/Seo.jsx), which keeps <title>,
//       the meta description and the canonical link in sync as the visitor
//       navigates the SPA.
//    2. At build time by scripts/prerender.mjs, which renders each `path`
//       to a real HTML file so crawlers and link previews get a complete
//       document instead of an empty <div id="root">.
//
//  Adding a page = adding an entry here + a <Route> in src/App.jsx.
//  Anything listed here is automatically prerendered and put in the sitemap.
// ============================================================================

// NOTE: file extensions are mandatory in this module's import chain.
// scripts/prerender.mjs loads routes.js through Node's ESM loader, which —
// unlike Vite — does not resolve extensionless specifiers.
import { practiceAreas } from "./practice.js";
import { blogPosts, blogMeta } from "./blogPosts.js";
import { tools } from "./tools.js";
import { checklists } from "./checklists.js";

export const SITE_URL = "https://ramsnehimishra.in";

/** Absolute URL for a route path. */
export const absolute = (path) => `${SITE_URL}${path === "/" ? "/" : path}`;

// `changefreq` / `priority` feed sitemap.xml generation.
export const routes = [
  {
    path: "/",
    title: "Best Advocate & Lawyer in Hajipur, Vaishali (Bihar) | Advocate Ram Snehi Mishra",
    description:
      "Advocate Ram Snehi Mishra is a Senior Advocate in Hajipur, Vaishali, Bihar with 28+ years of experience — divorce & family disputes, criminal defence, civil and property law. Book a confidential consultation.",
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

/** Look up a route by path, for <Seo>. */
export const routeFor = (path) => routes.find((r) => r.path === path);
