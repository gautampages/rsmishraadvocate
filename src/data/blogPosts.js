// ============================================================================
//  BLOG POSTS — each one is a real page at /blog/<slug>.
//
//  Previously these lived inside content.js and were rendered inline on the
//  home page, which meant they had no URL of their own, could not be linked
//  to or shared, never appeared in the sitemap, and carried no BlogPosting
//  structured data. Long-form legal explainers are the main way a chamber
//  earns organic search traffic, so they now get proper pages.
//
//  To publish a new post: add an entry here. The route, the sitemap entry,
//  the prerendered HTML and the structured data all follow automatically.
//
//  ⚠ TODO — `date`: the original publication dates of these two LinkedIn
//  posts are not known here. While `date` is null the page shows no date and
//  `datePublished` is omitted from the structured data, which is correct but
//  weaker for search. Fill in the real dates (YYYY-MM-DD) when available.
// ============================================================================

export const blogMeta = {
  heading: "Legal Insights & Updates",
  subtext:
    "Plain-language writing on family law, property disputes and how proceedings actually work — " +
    "from the chamber of Advocate Ram Snehi Mishra.",
  linkedinUrl: "https://www.linkedin.com/in/ramsnehimishra/",
};

export const blogPosts = [
  {
    slug: "when-law-enters-a-family",
    tag: "Family Law",
    date: null,
    title: "When Law Enters a Family, Something Has Already Broken",
    seoTitle: "When Law Enters a Family, Something Has Already Broken | Adv. Ram Snehi Mishra",
    excerpt:
      "Family disputes are never just about law — they are about emotions, expectations and unspoken pain. Why mediation often protects families better than litigation.",
    seoDescription:
      "A Hajipur family lawyer on why a legal victory in a matrimonial matter rarely brings emotional closure, and why courts increasingly push mediation and settlement in family disputes.",
    body: [
      "In my experience as a legal professional, family disputes are never just about law — they are about emotions, expectations, and often, unspoken pain.",
      "By the time a matter reaches the court — whether it is divorce, maintenance, custody, or domestic disputes — the relationship has already gone through phases of silence, misunderstanding, and emotional distance.",
      "The courtroom then becomes a place where personal conversations turn into legal arguments, emotions are converted into affidavits, and relationships are reduced to case files.",
      "But one important reality often gets overlooked — a legal victory does not always mean emotional closure. A decree of divorce ends the marriage, but not the memories. A custody order decides rights, but not bonding. A maintenance order ensures support, but not respect.",
      "This is why the law today increasingly encourages mediation and settlement in family matters. Sometimes a conversation can solve what litigation cannot, understanding can prevent years of court battles, and early resolution can protect not just individuals, but entire families.",
      "As legal professionals, our duty is not only to fight cases — but also to guide clients towards the most humane and practical resolution. Because in family law, the goal should not just be “winning the case” — it should be “minimizing the damage.”",
    ],
    hashtags: ["FamilyLaw", "Mediation", "LegalAwareness", "Divorce", "Advocacy", "Justice"],
    source: "https://www.linkedin.com/in/ramsnehimishra/",
    related: "/practice/divorce-family-lawyer-hajipur",
    relatedLabel: "Divorce & Family Law in Hajipur",
  },
  {
    slug: "huf-ancestral-property-litigation",
    tag: "Property Law",
    date: null,
    title: "HUF & Ancestral Property: When Legacy Turns Into Litigation",
    seoTitle: "HUF & Ancestral Property: When Legacy Turns Into Litigation | Adv. Ram Snehi Mishra",
    excerpt:
      "Ancestral property under a Hindu Undivided Family often turns legacy into litigation. How clear partition and family settlements protect both land and relationships.",
    seoDescription:
      "Why ancestral property disputes under a Hindu Undivided Family escalate in rural Bihar — unclear records, undocumented oral partitions — and how registered partition and family settlements prevent years of litigation.",
    body: [
      "In many villages across India, land is not just an asset — it is identity, legacy, and family pride passed down through generations.",
      "But when it comes to ancestral property under a Hindu Undivided Family (HUF), what was once shared ownership often becomes the root of serious disputes. The problem usually begins with a simple assumption: “Yeh toh hum sabka hai…” Legally, that may be true — but how much belongs to whom is where conflicts arise.",
      "Under HUF, property is jointly owned by coparceners, rights are acquired by birth, and each member has a claim — but not always a clearly defined share until partition.",
      "In villages these disputes become even more complex because records are unclear or outdated, oral partitions were never legally documented, and emotional attachment is stronger than legal understanding.",
      "And then one day a sale happens without consent, a mutation is challenged, or a boundary becomes a battlefield. What follows is not just a legal fight — but a breakdown of family structure: years of litigation, strained relationships, and land that remains unusable during disputes.",
      "As legal professionals, it is important to create awareness: partition should be clearly documented and registered, family settlements can avoid years of court battles, and every coparcener's right must be understood and respected.",
      "Because in HUF matters, the law is clear — but emotions are not. The real challenge is not dividing the property… it is protecting the family while doing so.",
    ],
    hashtags: ["HUF", "AncestralProperty", "PropertyLaw", "LegalAwareness", "FamilyDisputes", "Advocacy"],
    source: "https://www.linkedin.com/in/ramsnehimishra/",
    related: "/practice/property-lawyer-hajipur",
    relatedLabel: "Property & Land Law in Hajipur",
  },
];

export const postBySlug = (slug) => blogPosts.find((p) => p.slug === slug);

/** Rough reading time, at ~200 words per minute. */
export const readingTime = (post) => {
  const words = post.body.join(" ").split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
};

/** "12 March 2026", or null when the date is not yet known. */
export const formatPostDate = (date) =>
  date
    ? new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;
