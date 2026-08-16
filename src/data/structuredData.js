// ============================================================================
//  STRUCTURED DATA — one JSON-LD graph per URL, built from the site's own data.
//
//  WHY THIS FILE EXISTS
//  --------------------
//  Until now every page built its own JSON-LD inside its component and handed
//  it to <Seo>, which injects it from a useEffect. Effects do not run during
//  server rendering, so none of it survived into the prerendered HTML: every
//  static file on the site shipped exactly one LegalService block inherited
//  from index.html, and the WebApplication, FAQPage, BlogPosting, Service,
//  HowTo and BreadcrumbList markup existed only after React hydrated in a
//  browser. Crawlers that parse HTML without executing JavaScript — and every
//  link-preview scraper — saw none of it, which is precisely the audience
//  structured data is for.
//
//  Now there is one pure function, jsonLdFor(path), consumed twice:
//    · scripts/prerender.mjs, via the `jsonLd` field on each route, so the
//      markup is baked into the static HTML.
//    · <Seo>, so SPA navigation swaps it correctly too.
//
//  Both therefore emit identical markup by construction, and a page can never
//  again be added with structured data that only half the world can see.
//
//  Node's ESM loader runs this at build time: keep the .js extensions.
// ============================================================================

import { ORG_ID, PERSON_ID, WEBSITE_ID, OG_IMAGE, SITE_URL, absolute } from "./site.js";
import { advocate, contact, faqs, profiles } from "./content.js";
import { practiceAreas, practiceBySlug } from "./practice.js";
import { tools, toolFor } from "./tools.js";
import { faqsForTool } from "./toolFaqs.js";
import { blogPosts, postBySlug, postText } from "./blogPosts.js";
import { checklists, checklistBySlug } from "./checklists.js";
import { feeFaqs } from "./fees.js";
import { districts, districtBySlug, courtName, placeLabel } from "./courts.js";
import { hubFaqs, districtFaqs } from "./caseStatus.js";
import { hubFaqs as caseLawFaqs, topics as caseLawTopics, topicBySlug } from "./caseLaw.js";

const G = (nodes) => ({ "@context": "https://schema.org", "@graph": nodes.filter(Boolean) });

const faqNode = (id, items) =>
  items?.length
    ? {
        "@type": "FAQPage",
        "@id": id,
        mainEntity: items.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

/** Trail always starts at Home; pass the rest as [label, path] pairs. */
const crumbs = (...pairs) => ({
  "@type": "BreadcrumbList",
  itemListElement: [["Home", "/"], ...pairs].map(([name, path], i) => ({
    "@type": "ListItem",
    position: i + 1,
    name,
    item: absolute(path),
  })),
});

const webPage = (path, name, description, extra = {}) => ({
  "@type": "WebPage",
  "@id": `${absolute(path)}#webpage`,
  url: absolute(path),
  name,
  description,
  isPartOf: { "@id": WEBSITE_ID },
  about: { "@id": ORG_ID },
  inLanguage: "en-IN",
  ...extra,
});

const BIHAR = [
  { "@type": "City", name: "Hajipur" },
  { "@type": "AdministrativeArea", name: "Vaishali" },
  { "@type": "State", name: "Bihar" },
];

// ---------------------------------------------------------------------------
//  Site-wide entity nodes. Emitted on the home page only: every other page
//  refers to them by @id, which is what tells a search engine that forty URLs
//  describe one chamber rather than forty unrelated businesses.
// ---------------------------------------------------------------------------
const websiteNode = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: `Advocate ${advocate.name}`,
  description: advocate.credentials,
  inLanguage: "en-IN",
  publisher: { "@id": ORG_ID },
};

const personNode = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: advocate.name,
  honorificPrefix: "Advocate",
  jobTitle: advocate.title,
  description: `${advocate.title} practising at Hajipur, Vaishali (Bihar) with ${advocate.yearsExperience}+ years of experience in divorce and family law, criminal defence, civil litigation and property law.`,
  image: `${SITE_URL}/advocate-ram-snehi-mishra-portrait.jpg`,
  url: `${SITE_URL}/`,
  telephone: contact.phone,
  email: contact.email,
  worksFor: { "@id": ORG_ID },
  knowsLanguage: ["Hindi", "English"],
  areaServed: BIHAR,
  sameAs: profiles.map((p) => p.url),
};

// ---------------------------------------------------------------------------
//  Per-path builders.
// ---------------------------------------------------------------------------

const home = () =>
  G([
    websiteNode,
    personNode,
    faqNode(`${SITE_URL}/#faq`, faqs.items),
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: `${SITE_URL}/`,
      name: `Advocate ${advocate.name} — ${advocate.credentials}`,
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": ORG_ID },
      primaryImageOfPage: OG_IMAGE,
      inLanguage: "en-IN",
    },
  ]);

const practicePage = (slug) => {
  const area = practiceBySlug(slug);
  if (!area) return null;
  const url = absolute(`/practice/${slug}`);

  return G([
    {
      "@type": "Service",
      "@id": `${url}#service`,
      name: area.title,
      serviceType: area.short,
      description: area.seoDescription,
      url,
      provider: { "@id": ORG_ID },
      areaServed: BIHAR,
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: area.title,
        itemListElement: area.handles.map((h) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: h.title, description: h.desc },
        })),
      },
    },
    faqNode(`${url}#faq`, area.faqs),
    crumbs(["Practice Areas", "/#services"], [area.short, `/practice/${slug}`]),
  ]);
};

const blogIndex = () =>
  G([
    {
      "@type": "Blog",
      "@id": `${absolute("/blog")}#blog`,
      url: absolute("/blog"),
      name: "Legal Insights & Updates",
      description:
        "Plain-language writing on family law, property disputes and court procedure from the chamber of Advocate Ram Snehi Mishra, Hajipur.",
      publisher: { "@id": ORG_ID },
      inLanguage: "en-IN",
      blogPost: blogPosts.map((p) => ({
        "@type": "BlogPosting",
        headline: p.title,
        url: absolute(`/blog/${p.slug}`),
        description: p.excerpt,
        author: { "@id": PERSON_ID },
        ...(p.date ? { datePublished: p.date } : {}),
      })),
    },
    crumbs(["Blog", "/blog"]),
  ]);

const blogPost = (slug) => {
  const post = postBySlug(slug);
  if (!post) return null;
  const url = absolute(`/blog/${slug}`);

  return G([
    {
      "@type": "BlogPosting",
      "@id": `${url}#post`,
      headline: post.title,
      description: post.seoDescription || post.excerpt,
      url,
      mainEntityOfPage: url,
      articleSection: post.tag,
      keywords: post.hashtags?.join(", "),
      author: { "@id": PERSON_ID },
      publisher: { "@id": ORG_ID },
      inLanguage: "en-IN",
      image: OG_IMAGE,
      wordCount: postText(post).join(" ").split(/\s+/).length,
      // datePublished is omitted rather than invented when the real date is
      // unknown — a wrong date is worse than a missing one.
      ...(post.date ? { datePublished: post.date, dateModified: post.date } : {}),
    },
    // The FAQ block mirrors the questions rendered on the page. Markup that
    // describes questions a visitor cannot see is a manual-action risk, so
    // this is driven by the same array the page renders.
    faqNode(`${url}#faq`, post.faqs),
    crumbs(["Blog", "/blog"], [post.tag, "/blog"]),
  ]);
};

const toolsIndex = () =>
  G([
    {
      "@type": "ItemList",
      "@id": `${absolute("/tools")}#list`,
      name: "Free legal calculators and lookups for Bihar",
      itemListElement: tools.map((t, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: t.name,
        url: absolute(t.path),
      })),
    },
    crumbs(["Legal Tools", "/tools"]),
  ]);

const toolPage = (path) => {
  const tool = toolFor(path);
  if (!tool) return null;
  const url = absolute(path);

  return G([
    {
      "@type": "WebApplication",
      "@id": `${url}#app`,
      name: tool.name,
      url,
      applicationCategory: "LegalService",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript",
      description: tool.description,
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      publisher: { "@id": ORG_ID },
      areaServed: BIHAR,
      isAccessibleForFree: true,
    },
    faqNode(`${url}#faq`, faqsForTool(path)),
    crumbs(["Legal Tools", "/tools"], [tool.short, path]),
  ]);
};

const checklistIndex = () =>
  G([
    {
      "@type": "ItemList",
      "@id": `${absolute("/checklists")}#list`,
      name: "Free legal document checklists",
      itemListElement: checklists.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.title,
        url: absolute(`/checklists/${c.slug}`),
      })),
    },
    crumbs(["Checklists", "/checklists"]),
  ]);

const checklistPage = (slug) => {
  const list = checklistBySlug(slug);
  if (!list) return null;
  const url = absolute(`/checklists/${slug}`);
  const groups = list.groups || [];

  return G([
    {
      "@type": "HowTo",
      "@id": `${url}#howto`,
      name: list.title,
      description: list.seoDescription,
      url,
      inLanguage: "en-IN",
      publisher: { "@id": ORG_ID },
      step: groups.map((g, i) => ({
        "@type": "HowToSection",
        position: i + 1,
        name: g.title,
        itemListElement: g.items.map((item, j) => ({
          "@type": "HowToStep",
          position: j + 1,
          text: item,
        })),
      })),
    },
    crumbs(["Checklists", "/checklists"], [list.short, `/checklists/${slug}`]),
  ]);
};

const feesPage = () =>
  G([
    webPage(
      "/fees",
      "Legal Fees & Engagement",
      "How fees are quoted and agreed at the chamber of Advocate Ram Snehi Mishra, Hajipur."
    ),
    faqNode(`${absolute("/fees")}#faq`, feeFaqs),
    crumbs(["Fees", "/fees"]),
  ]);

const bookingPage = () =>
  G([
    {
      "@type": "Service",
      "@id": `${absolute("/book")}#consultation`,
      name: "Legal consultation with Advocate Ram Snehi Mishra",
      description:
        "A confidential first consultation at the chamber in Hajipur or by telephone — an honest view of whether you have a case, the likely route, and what it will cost.",
      url: absolute("/book"),
      provider: { "@id": ORG_ID },
      areaServed: BIHAR,
      serviceType: "Legal consultation",
      availableChannel: {
        "@type": "ServiceChannel",
        serviceUrl: absolute("/book"),
        servicePhone: contact.phone,
        serviceLocation: { "@id": ORG_ID },
      },
    },
    crumbs(["Book a Consultation", "/book"]),
  ]);

// ---- Case status ----------------------------------------------------------

const caseStatusApp = (url, name, description) => ({
  "@type": "WebApplication",
  "@id": `${url}#app`,
  name,
  url,
  applicationCategory: "LegalService",
  applicationSubCategory: "Court case status lookup",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript",
  description,
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  isAccessibleForFree: true,
  publisher: { "@id": ORG_ID },
  featureList: [
    "Search by CNR number",
    "Search by party name",
    "Search by advocate name",
    "Next hearing date",
    "Complete hearing history",
    "Orders and judgments on record",
    "Plain-language case summary",
  ],
});

const caseStatusHub = () => {
  const url = absolute("/case-status");
  return G([
    caseStatusApp(
      url,
      "Court Case Status Tracker — Bihar & All India",
      "Check the status of any Indian court case by CNR number, party name or advocate name: current stage, next hearing date, hearing history and orders, drawn live from public eCourts records."
    ),
    faqNode(`${url}#faq`, hubFaqs),
    {
      "@type": "ItemList",
      "@id": `${url}#districts`,
      name: "Case status by district court in Bihar",
      itemListElement: districts.map((d, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: `${d.district} District Court case status`,
        url: absolute(`/case-status/${d.slug}`),
      })),
    },
    crumbs(["Case Status", "/case-status"]),
  ]);
};

const caseStatusDistrict = (slug) => {
  const d = districtBySlug(slug);
  if (!d) return null;
  const url = absolute(`/case-status/${slug}`);

  return G([
    caseStatusApp(
      url,
      `${d.district} District Court Case Status`,
      `Check case status for the ${courtName(d)} by CNR number, party name or advocate name — next hearing date, case stage, hearing history and orders from public eCourts records.`
    ),
    {
      "@type": "Courthouse",
      "@id": `${url}#court`,
      name: courtName(d),
      address: {
        "@type": "PostalAddress",
        addressLocality: d.hq,
        addressRegion: "Bihar",
        addressCountry: "IN",
      },
      containedInPlace: { "@type": "AdministrativeArea", name: `${d.district}, Bihar` },
    },
    faqNode(`${url}#faq`, districtFaqs(d)),
    crumbs(["Case Status", "/case-status"], [placeLabel(d), `/case-status/${slug}`]),
  ]);
};

// ---- Case law -------------------------------------------------------------

const caseLawHub = () => {
  const url = absolute("/case-law");
  return G([
    {
      "@type": "WebApplication",
      "@id": `${url}#app`,
      name: "Indian Case Law Search",
      url,
      applicationCategory: "LegalService",
      applicationSubCategory: "Legal research",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript",
      description:
        "Free full-text search of Indian judgments, orders and Acts — the Supreme Court, every High Court including Patna, and the tribunals — filtered by court, date, judge or case title.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      isAccessibleForFree: true,
      publisher: { "@id": ORG_ID },
      featureList: [
        "Full-text search of Indian judgments",
        "Filter by court, including the Patna High Court",
        "Filter by date of decision",
        "Search by case title or by the judge who wrote it",
        "Exact-phrase search",
        "Read the judgment with its citations linked",
      ],
      // The corpus belongs to Indian Kanoon and is credited as such rather
      // than presented as this chamber's own database.
      citation: "https://indiankanoon.org/",
    },
    faqNode(`${url}#faq`, caseLawFaqs),
    {
      "@type": "ItemList",
      "@id": `${url}#topics`,
      name: "Case law by subject",
      itemListElement: caseLawTopics.map((t, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: t.title,
        url: absolute(`/case-law/${t.slug}`),
      })),
    },
    crumbs(["Case Law", "/case-law"]),
  ]);
};

const caseLawTopic = (slug) => {
  const t = topicBySlug(slug);
  if (!t) return null;
  const url = absolute(`/case-law/${slug}`);

  return G([
    {
      "@type": "Article",
      "@id": `${url}#article`,
      headline: t.title,
      description: t.seoDescription,
      url,
      mainEntityOfPage: url,
      author: { "@id": PERSON_ID },
      publisher: { "@id": ORG_ID },
      inLanguage: "en-IN",
      about: t.landmarks.map((l) => ({ "@type": "Thing", name: l.case })),
      isAccessibleForFree: true,
    },
    crumbs(["Case Law", "/case-law"], [t.short, `/case-law/${slug}`]),
  ]);
};

const askPage = () => {
  const url = absolute("/ask");
  return G([
    {
      "@type": "WebApplication",
      "@id": `${url}#app`,
      name: "AI Legal Assistant — Indian law, in plain words",
      url,
      applicationCategory: "LegalService",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript",
      description:
        "Ask any question about Indian law and get a clear, plain-language explanation in English or Hindi — free, instant, and available at any hour. General legal information, not legal advice.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      isAccessibleForFree: true,
      publisher: { "@id": ORG_ID },
      inLanguage: ["en-IN", "hi-IN"],
    },
    crumbs(["Ask a Legal Question", "/ask"]),
  ]);
};

const policyPage = (path, name, description) =>
  G([webPage(path, name, description), crumbs([name, path])]);

// ---------------------------------------------------------------------------
//  Dispatch. Static paths first, then the parameterised families.
// ---------------------------------------------------------------------------
const STATIC = {
  "/": home,
  "/blog": blogIndex,
  "/tools": toolsIndex,
  "/checklists": checklistIndex,
  "/fees": feesPage,
  "/book": bookingPage,
  "/case-status": caseStatusHub,
  "/case-law": caseLawHub,
  "/ask": askPage,
  "/privacy-policy": () =>
    policyPage(
      "/privacy-policy",
      "Privacy Policy",
      "How this website collects, uses and protects personal data under the DPDP Act 2023."
    ),
  "/terms": () =>
    policyPage("/terms", "Terms of Use", "Terms governing your use of ramsnehimishra.in."),
  "/disclaimer": () =>
    policyPage(
      "/disclaimer",
      "Disclaimer",
      "This website is for information only and is not an advertisement or solicitation."
    ),
};

/** The JSON-LD graph for a route path, or null when the path has none. */
export function jsonLdFor(path) {
  const clean = path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;

  if (STATIC[clean]) return STATIC[clean]();

  const [, head, tail] = clean.split("/");
  if (!tail) return null;

  if (head === "practice") return practicePage(tail);
  if (head === "blog") return blogPost(tail);
  if (head === "checklists") return checklistPage(tail);
  if (head === "case-status") return caseStatusDistrict(tail);
  // The judgment reader is noindex and describes someone else's document;
  // it deliberately claims no structured data of its own.
  if (head === "case-law") return tail === "judgment" ? null : caseLawTopic(tail);
  if (head === "tools") return toolPage(clean);

  return null;
}

export { practiceAreas, districts };
