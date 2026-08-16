/* ============================================================================
   CASE-LAW CLIENT — Indian Kanoon, through the chamber's own Worker.
   ----------------------------------------------------------------------------
     GET {BASE}/legal/search?q=…&page=…&pageSize=…   → judgments, orders, acts
     GET {BASE}/legal/document/{tid}                 → the full document
     GET {BASE}/legal/document/{tid}/fragment?query= → the relevant passages

   The Indian Kanoon token lives in the Worker and is never sent from here.

   TWO THINGS THE UPSTREAM API DOES THAT SHAPE THIS FILE:

   1. It always returns ten results per page, whatever pageSize asks for —
      pageSize only truncates what the Worker passes on. So paging is done by
      `page`, and PAGE_SIZE is fixed at ten rather than offered as a setting.

   2. Filters are not parameters. They are operators inside the query string
      itself (`doctypes:`, `fromdate:`, `title:`), and an operator the API does
      not recognise is silently ignored — a search for `doctypes: patnahighcourt`
      returns unfiltered results rather than an error, which looks to the user
      exactly like a filter that does not work. Hence COURTS below: every token
      in it has been checked against the live API, and the UI can only send
      tokens from that list.
   ========================================================================== */

const env = import.meta.env || {};

// The Worker's CORS policy names the production hostname, so localhost goes
// through the dev proxy in vite.config.js — the same shim the other three
// workers use.
const WORKER = "https://kanoon.ramsnehimishra.in";
const BASE = (env.VITE_KANOON_BASE_URL || (env.DEV ? "/api/kanoon" : WORKER)).replace(/\/$/, "");

export const PAGE_SIZE = 10;

/** Where to look. `token` is the value for the API's `doctypes:` operator. */
export const COURTS = [
  { token: "", label: "Everywhere", hint: "Judgments, orders, acts and tribunal decisions" },
  { token: "judgments", label: "Judgments only", hint: "Excludes daily orders and bare acts" },
  { token: "supremecourt", label: "Supreme Court of India", hint: "Reported judgments" },
  { token: "patna", label: "Patna High Court", hint: "The appellate court for all of Bihar" },
  { token: "highcourts", label: "All High Courts", hint: "Every High Court in India" },
  { token: "scorders", label: "Supreme Court — daily orders", hint: "Orders rather than judgments" },
  { token: "tribunals", label: "Tribunals", hint: "NCLT, NCLAT, ITAT, SAT and others" },
  { token: "laws", label: "Acts & sections", hint: "Bare statutory text" },
];

export const courtLabel = (token) =>
  COURTS.find((c) => c.token === token)?.label || "Everywhere";

export class KanoonError extends Error {
  constructor(message, code) {
    super(message);
    this.name = "KanoonError";
    this.code = code || "ERROR";
  }
}

/* -------------------------------------------------------------------------- *
 * Query construction
 * -------------------------------------------------------------------------- */

/** Indian Kanoon wants d-m-yyyy; <input type="date"> gives yyyy-mm-dd. */
const toKanoonDate = (iso) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || "");
  if (!m) return null;
  return `${Number(m[3])}-${Number(m[2])}-${m[1]}`;
};

/**
 * Compose the advanced-search fields into one Indian Kanoon query.
 *
 * Order matters only for readability — the operators are position-independent —
 * but the composed string is shown back to the user under the form, so it is
 * built to read like something a person could have typed.
 */
export function buildQuery({
  terms = "",
  phrase = "",
  court = "",
  fromDate = "",
  toDate = "",
  title = "",
  author = "",
} = {}) {
  const parts = [];

  if (terms.trim()) parts.push(terms.trim());
  if (phrase.trim()) parts.push(`"${phrase.trim().replace(/"/g, "")}"`);
  if (title.trim()) parts.push(`title: ${title.trim()}`);
  if (author.trim()) parts.push(`author: ${author.trim()}`);
  if (court) parts.push(`doctypes: ${court}`);

  const from = toKanoonDate(fromDate);
  const to = toKanoonDate(toDate);
  if (from) parts.push(`fromdate: ${from}`);
  if (to) parts.push(`todate: ${to}`);

  return parts.join(" ").trim();
}

/** True when the form has something worth searching for. */
export const hasCriteria = (f) =>
  Boolean(f.terms?.trim() || f.phrase?.trim() || f.title?.trim() || f.author?.trim() || f.court);

export const EMPTY_FILTERS = {
  terms: "",
  phrase: "",
  court: "",
  fromDate: "",
  toDate: "",
  title: "",
  author: "",
};

const fromKanoonDate = (s) => {
  const m = /^(\d{1,2})-(\d{1,2})-(\d{4})$/.exec(s || "");
  return m ? `${m[3]}-${m[2].padStart(2, "0")}-${m[1].padStart(2, "0")}` : "";
};

/**
 * The inverse of buildQuery: turn a query string back into form fields.
 *
 * Needed because the query — not the form state — is what lives in the URL, so
 * a shared link, the browser's back button, and the citation links rewritten
 * inside a judgment all arrive here as a bare query that the form has to be
 * able to show.
 */
export function parseQuery(query) {
  let rest = String(query || "");
  const f = { ...EMPTY_FILTERS };

  const take = (re, apply) => {
    const m = re.exec(rest);
    if (!m) return;
    apply(m[1].trim());
    rest = rest.replace(m[0], " ");
  };

  take(/doctypes:\s*([^\s]+)/i, (v) => {
    if (COURTS.some((c) => c.token === v)) f.court = v;
  });
  take(/fromdate:\s*([\d-]+)/i, (v) => (f.fromDate = fromKanoonDate(v)));
  take(/todate:\s*([\d-]+)/i, (v) => (f.toDate = fromKanoonDate(v)));
  take(/title:\s*([^:]*?)(?=\s+\w+:|$)/i, (v) => (f.title = v));
  take(/author:\s*([^:]*?)(?=\s+\w+:|$)/i, (v) => (f.author = v));
  take(/"([^"]+)"/, (v) => (f.phrase = v));

  f.terms = rest.replace(/\s+/g, " ").trim();
  return f;
}

/* -------------------------------------------------------------------------- *
 * Transport
 * -------------------------------------------------------------------------- */

async function call(path, params) {
  const url = new URL(`${BASE}${path}`, typeof window === "undefined" ? "https://ramsnehimishra.in" : window.location.origin);
  Object.entries(params || {}).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") url.searchParams.set(k, v);
  });

  let res;
  try {
    res = await fetch(url, { headers: { Accept: "application/json" } });
  } catch {
    throw new KanoonError(
      "Could not reach the case-law service. Check your connection and try again.",
      "NETWORK"
    );
  }

  let body;
  try {
    body = await res.json();
  } catch {
    throw new KanoonError("The case-law service returned something unreadable.", "BAD_RESPONSE");
  }

  if (!res.ok || body?.success === false) {
    throw new KanoonError(
      body?.error?.message || "The case-law service could not complete that search.",
      body?.error?.code || `HTTP_${res.status}`
    );
  }

  return body;
}

/* -------------------------------------------------------------------------- *
 * Normalisers — the single place that knows the upstream wire format
 * -------------------------------------------------------------------------- */

/** "11 - 20 of 5742237" → { from: 11, to: 20, total: 5742237 } */
function parseFound(found) {
  const m = /(\d[\d,]*)\s*-\s*(\d[\d,]*)\s+of\s+(\d[\d,]*)/.exec(String(found || ""));
  if (!m) return { from: 0, to: 0, total: 0 };
  const n = (s) => Number(s.replace(/,/g, ""));
  return { from: n(m[1]), to: n(m[2]), total: n(m[3]) };
}

// Headlines arrive with <b> around the matched terms and raw newlines. Both are
// useful — the highlight especially — but the value is going into React as text,
// so it is converted to plain text plus the offsets of the emphasised runs.
const HIGHLIGHT = /<b>([\s\S]*?)<\/b>/g;

// Headlines come back with entities encoded to varying depths — &quot;, &#39;
// and &#x27; all appear in the same corpus — and an undecoded &#x27; in a
// search snippet is the sort of detail that makes a page look broken.
// &amp; is decoded last so "&amp;lt;" does not become "<".
const NAMED = { quot: '"', apos: "'", lt: "<", gt: ">", nbsp: " " };

const decode = (s) =>
  String(s || "")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&(quot|apos|lt|gt|nbsp);/g, (_, name) => NAMED[name])
    .replace(/&amp;/g, "&");

/**
 * Split a highlighted headline into [{ text, hit }] runs, so React can render
 * <mark> without dangerouslySetInnerHTML.
 */
export function highlightRuns(html) {
  const source = String(html || "");
  const runs = [];
  let last = 0;
  let m;

  HIGHLIGHT.lastIndex = 0;
  while ((m = HIGHLIGHT.exec(source))) {
    if (m.index > last) runs.push({ text: clean(source.slice(last, m.index)), hit: false });
    runs.push({ text: clean(m[1]), hit: true });
    last = m.index + m[0].length;
  }
  if (last < source.length) runs.push({ text: clean(source.slice(last)), hit: false });

  return runs.filter((r) => r.text);
}

// Strip any remaining markup, collapse the whitespace the upstream text is full of.
const clean = (s) => decode(String(s).replace(/<[^>]*>/g, "")).replace(/\s+/g, " ");

/** "Rajnesh vs Neha on 4 November, 2020" → { parties, date } */
function splitTitle(title) {
  const m = /^(.*?)\s+on\s+(\d{1,2}\s+\w+,\s+\d{4})$/.exec(title || "");
  return m ? { parties: m[1], decidedOn: m[2] } : { parties: title || "Untitled", decidedOn: null };
}

const normaliseResult = (d) => ({
  tid: d.tid,
  title: clean(d.title),
  ...splitTitle(clean(d.title)),
  court: d.docsource || "",
  date: d.publishdate || "",
  author: d.author || "",
  citation: d.citation || "",
  cites: d.numcites || 0,
  citedBy: d.numcitedby || 0,
  headline: highlightRuns(d.headline),
});

/* -------------------------------------------------------------------------- *
 * Public API
 * -------------------------------------------------------------------------- */

/** One page of results for an already-composed Indian Kanoon query. */
export async function searchCaseLaw({ query, page = 0 }) {
  if (!query || !query.trim()) throw new KanoonError("Enter something to search for.", "EMPTY");

  const body = await call("/legal/search", {
    q: query.trim(),
    page,
    pageSize: PAGE_SIZE,
  });

  const { from, to, total } = parseFound(body.found);
  const results = (body.docs || []).map(normaliseResult);

  return {
    query: query.trim(),
    page,
    from,
    to,
    total,
    results,
    // The API reports a total but will not page beyond what it holds; this is
    // what the pager needs and is cheaper than trusting `total` alone.
    hasMore: results.length === PAGE_SIZE && to < total,
  };
}

/** The full text of one judgment, act or order. */
export async function fetchJudgment(tid) {
  const body = await call(`/legal/document/${encodeURIComponent(tid)}`);
  const d = body.data || {};

  if (d.errmsg || !d.doc) {
    throw new KanoonError(
      d.errmsg === "Act/Judgment not found"
        ? "That judgment could not be found. It may have been removed, or the link may be wrong."
        : "That document could not be loaded.",
      "NOT_FOUND"
    );
  }

  const title = clean(d.title);

  return {
    tid: d.tid,
    title,
    ...splitTitle(title),
    court: d.docsource || "",
    date: d.publishdate || "",
    kind: d.divtype || "",
    cites: d.numcites || 0,
    citedBy: d.numcitedby || 0,
    html: d.doc,
    tags: (d.cats || []).map((c) => ({ label: c.value, query: c.formInput })).filter((t) => t.label),
    related: (d.relatedqs || []).map((r) => r.value).filter(Boolean),
    source: `https://indiankanoon.org/doc/${d.tid}/`,
  };
}

/**
 * The passages of a document that match a query.
 *
 * Cheaper than the full judgment — a few paragraphs rather than two hundred
 * kilobytes — which is what makes it the right thing to show first, and the
 * right thing to hand to an AI summariser later.
 */
export async function fetchFragment(tid, query) {
  const body = await call(`/legal/document/${encodeURIComponent(tid)}/fragment`, { query });
  const d = body.data || {};
  const headline = Array.isArray(d.headline) ? d.headline : [d.headline].filter(Boolean);

  return {
    tid: d.tid || tid,
    title: clean(d.title),
    passages: headline.map((h) => highlightRuns(h)).filter((runs) => runs.length),
  };
}

/* -------------------------------------------------------------------------- *
 * Rendering a judgment safely
 * -------------------------------------------------------------------------- */

// The upstream document is a small, predictable set of tags — a, p, span,
// blockquote, pre, h2, h3 — but it is still third-party HTML going into
// dangerouslySetInnerHTML, so it is rebuilt from an allowlist rather than
// filtered. Anything not named here is unwrapped, keeping its text.
const ALLOWED = new Set(["A", "P", "SPAN", "BLOCKQUOTE", "PRE", "H2", "H3", "B", "I", "EM", "STRONG", "BR", "SUP", "SUB", "DIV"]);
const ALLOWED_CLASSES = new Set(["doc_title", "doc_citations", "doc_author", "doc_bench", "citetext", "hidden_text"]);

/**
 * Sanitise a judgment for display, and rewrite Indian Kanoon's own links so
 * they lead back into this site rather than off it:
 *   /doc/1056396/                  → /case-law/judgment?id=1056396
 *   /search/?formInput=author:x    → /case-law?q=author:x
 *
 * Browser-only: it uses DOMParser. Judgments are fetched at view time and are
 * never part of the prerendered HTML, so that is not a limitation.
 */
export function sanitiseJudgment(html) {
  if (typeof window === "undefined" || !html) return "";

  const doc = new DOMParser().parseFromString(`<div id="root">${html}</div>`, "text/html");
  const root = doc.getElementById("root");

  // Depth-first over a static list: the tree is mutated as we go.
  for (const el of [...root.querySelectorAll("*")]) {
    if (!el.isConnected) continue;

    if (!ALLOWED.has(el.tagName)) {
      el.replaceWith(...el.childNodes);
      continue;
    }

    const href = el.tagName === "A" ? el.getAttribute("href") || "" : "";
    const className = el.getAttribute("class") || "";

    for (const attr of [...el.attributes]) el.removeAttribute(attr.name);

    if (className.split(/\s+/).some((c) => ALLOWED_CLASSES.has(c))) {
      el.setAttribute("class", className);
    }

    if (el.tagName !== "A") continue;

    const docMatch = /^\/doc(?:fragment)?\/(\d+)/.exec(href);
    const searchMatch = /^\/search\/\?formInput=(.*)$/.exec(href);

    if (docMatch) {
      el.setAttribute("href", `/case-law/judgment?id=${docMatch[1]}`);
      el.setAttribute("data-internal", "1");
    } else if (searchMatch) {
      el.setAttribute("href", `/case-law?q=${searchMatch[1]}`);
      el.setAttribute("data-internal", "1");
    } else if (/^https?:\/\//i.test(href)) {
      el.setAttribute("href", href);
      el.setAttribute("target", "_blank");
      // nofollow: these are third-party citations, not endorsements.
      el.setAttribute("rel", "noreferrer noopener nofollow");
    } else {
      // Relative link we do not recognise, or a javascript: URL. Drop the link
      // and keep the words.
      el.replaceWith(...el.childNodes);
    }
  }

  return root.innerHTML;
}
