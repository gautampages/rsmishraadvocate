/* =========================================================================
   Court records client.

   Talks to the site's own wrapper worker, which holds the eCourts partner
   credentials server-side — no token is ever sent from the browser.

     GET {BASE}/case/{cnr}   → full case record (+ order text and AI analysis)
     GET {BASE}/search?…     → full-text / party / advocate search

   Local development goes through the Vite proxy (see vite.config.js) because
   the worker's Access-Control-Allow-Origin is a fixed production hostname.
   ========================================================================= */

import { API_AUTH_HEADER } from "./apiAuth.js";

const WORKER_API = "https://legal-data.gautampages.workers.dev/api";

const env = import.meta.env ?? {};
const BASE = (env.VITE_ECOURTS_BASE_URL || (env.DEV ? "/api/ecourts" : WORKER_API)).replace(/\/$/, "");

const TIMEOUT_MS = 45000;

// Every successful lookup takes at least this long, even when the response
// comes straight from the browser's cache and never touches the network.
// Matches the worker's own cache-hit delay, so all lookups feel uniform.
const MIN_REQUEST_MS = 2000;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export class CaseApiError extends Error {
  constructor(message, { code = "REQUEST_FAILED", status = 0 } = {}) {
    super(message);
    this.name = "CaseApiError";
    this.code = code;
    this.status = status;
  }
}

async function request(path, params) {
  const started = Date.now();
  const url = new URL(`${BASE}${path}`, window.location.origin);
  for (const [key, val] of Object.entries(params || {})) {
    if (val == null || val === "") continue;
    for (const v of Array.isArray(val) ? val : [val]) url.searchParams.append(key, v);
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  let res;
  try {
    res = await fetch(url.toString(), {
      signal: controller.signal,
      // The worker only serves requests carrying this header. The value is
      // public (it ships in this bundle) — an abuse filter, not a secret.
      headers: { ...API_AUTH_HEADER },
    });
  } catch (err) {
    clearTimeout(timer);
    if (err?.name === "AbortError") {
      throw new CaseApiError("The court records service is taking too long. Please try again.", {
        code: "TIMEOUT",
      });
    }
    throw new CaseApiError(
      "Could not reach the court records service. Please check your connection and try again.",
      { code: "NETWORK" }
    );
  }
  clearTimeout(timer);

  if (res.status === 404) {
    throw new CaseApiError("No case found for this CNR number.", { code: "NOT_FOUND", status: 404 });
  }
  if (res.status === 400) {
    throw new CaseApiError("That CNR number was not accepted by the court records service.", {
      code: "INVALID_CNR",
      status: 400,
    });
  }
  if (res.status === 401 || res.status === 403) {
    throw new CaseApiError("Court records access is not authorised. Please contact the office.", {
      code: "UNAUTHORISED",
      status: res.status,
    });
  }
  if (res.status === 429) {
    throw new CaseApiError("Too many searches just now. Please try again in a minute.", {
      code: "RATE_LIMIT",
      status: 429,
    });
  }
  if (!res.ok) {
    throw new CaseApiError(`Court records service returned an error (${res.status}).`, {
      status: res.status,
    });
  }

  const data = await res.json();

  // Top up to the minimum only if the round trip came in under it — a
  // browser-cache hit resolves in ~0ms, a worker round trip already takes 2s+.
  const remaining = MIN_REQUEST_MS - (Date.now() - started);
  if (remaining > 0) await sleep(remaining);

  return data;
}

/* ------------------------------------------------------------------ *
 * Public API
 * ------------------------------------------------------------------ */

/** A CNR is 16 chars: 4 letters (state+court), 2 digits, 6 digits, 4-digit year. */
export const CNR_PATTERN = /^[A-Z]{4}\d{2}\d{6}\d{4}$/;

export const normaliseCnr = (raw) => (raw || "").toUpperCase().replace(/[^A-Z0-9]/g, "");

export const isValidCnr = (raw) => CNR_PATTERN.test(normaliseCnr(raw));

/** GET /case/{cnr} → normalised case view-model. */
export async function fetchCaseByCnr(rawCnr) {
  const cnr = normaliseCnr(rawCnr);
  if (!isValidCnr(cnr)) {
    throw new CaseApiError(
      "That does not look like a valid CNR. A CNR has 16 characters, e.g. DLND020047882015.",
      { code: "INVALID_CNR" }
    );
  }
  return normaliseCase(await request(`/case/${encodeURIComponent(cnr)}`));
}

/**
 * GET /search → normalised result list.
 * `by` selects which parameter carries the term: litigants | advocates | query.
 */
export async function searchCases({ term, by = "litigants", page = 1, pageSize = 12 }) {
  const value = (term || "").trim();
  if (value.length < 3) {
    throw new CaseApiError("Please enter at least 3 characters to search.", { code: "TOO_SHORT" });
  }

  const params = { page, pageSize, sortBy: "nextHearingDate desc" };
  if (by === "advocates") {
    params.advocates = value;
    params.nameMatchMode = "all";
  } else if (by === "litigants") {
    params.litigants = value;
    params.nameMatchMode = "all";
  } else {
    params.query = value;
  }

  return normaliseSearch(await request("/search", params));
}

/* ------------------------------------------------------------------ *
 * Normalisers — the single place that knows the API's wire format
 * ------------------------------------------------------------------ */

const arr = (v) => (Array.isArray(v) ? v.filter(Boolean) : v ? [v] : []);

/** The registry uses "-", "--" and "" as "not recorded". Drop them. */
const realValues = (v) => arr(v).filter((s) => String(s).replace(/[-\s.]/g, "").length > 0);

const titleise = (s) =>
  (s || "")
    .toLowerCase()
    .replace(/\b[a-z]/g, (m) => m.toUpperCase())
    .replace(/\bOrs\b/g, "Ors");

const lookup = (descriptions, field, value) => descriptions?.enumLookup?.[field]?.[value] || null;

/**
 * The API's case-type enum is national, and a few codes mean something else in
 * district courts. "COP" there is a Complaint Petition — labelling a
 * magistrate's criminal complaint a "Company Petition" (which only a High
 * Court or the NCLT would hear) misleads the very people reading this page.
 * Applied only below the High Court level, where the district reading holds.
 */
const DISTRICT_CASE_TYPES = { COP: "Complaint Petition" };

const isHigherCourt = (courtCode) => /^(SCIN|[A-Z]{2}HC)/.test(courtCode || "");

function readCaseType(code, raw, descriptions, courtCode) {
  if (!isHigherCourt(courtCode) && DISTRICT_CASE_TYPES[code]) return DISTRICT_CASE_TYPES[code];
  return lookup(descriptions, "caseType", code) || raw || code || "";
}

/** Build "A vs B" from the party arrays — the API has no case-title field. */
export function caseTitle(petitioners, respondents) {
  const side = (list) => {
    const names = realValues(list);
    if (!names.length) return "Unknown party";
    const first = titleise(names[0].replace(/\s+/g, " ").trim());
    return names.length > 1 ? `${first} & Ors.` : first;
  };
  return `${side(petitioners)} vs ${side(respondents)}`;
}

/** Pull the client-facing bits out of the API's per-order AI analysis. */
function readOrderAnalysis(ai) {
  if (!ai || typeof ai !== "object") return null;
  const insights = ai.intelligent_insights_analytics?.order_significance_and_impact_assessment;
  const core = ai.deep_legal_substance_context?.core_legal_content_analysis;
  const meta = ai.foundational_metadata?.core_case_identifiers;

  const plain = insights?.plain_language_summary_for_litigants_outcome_focused;
  const exec = insights?.ai_generated_executive_summary;
  if (!plain && !exec) return null;

  return {
    orderDate: meta?.order_date || null,
    plain: plain || exec,
    exec: exec || null,
    alerts: arr(insights?.actionable_alerts_for_parties).map((a) => ({
      action: a.action_required || "",
      deadline: a.deadline || null,
      who: a.responsible_party || "",
    })),
    issues: arr(core?.primary_legal_issues_identified),
    statutes: arr(core?.statutes_cited_and_applied).map((s) =>
      [s.act_name, s.section_article_rule].filter(Boolean).join(" — ")
    ),
    story: ai.deep_litigant_substance_context?.narrative_of_the_dispute_plain_language?.story_behind_the_case || null,
  };
}

export function normaliseCase(payload) {
  const d = payload?.data ?? payload ?? {};
  const c = d.courtCaseData ?? {};
  const descriptions = d.descriptions;
  const cnr = c.cnr || "";

  // District court names come back terse ("DJ Division"), so add the district
  // unless the name already carries it.
  const courtName = c.courtName || lookup(descriptions, "courtCode", c.cnrCourtCode) || "";
  const district = c.district || "";
  const courtDisplay =
    district && !courtName.toLowerCase().includes(district.toLowerCase())
      ? `${courtName}, ${district}`
      : courtName;

  const hearings = arr(c.historyOfCaseHearings)
    .map((h) => ({
      date: h.businessOnDate || null,
      nextDate: h.hearingDate || null,
      purpose: h.purposeOfListing || "",
      judge: realValues(h.judge)[0] || "",
    }))
    .filter((h) => h.date);

  const business = arr(c.businessOnDateEntries).reduce((map, b) => {
    const text = (b.business || "").trim();
    if (b.date && text && text !== "--") map[b.date] = text;
    return map;
  }, {});

  // Order documents: full text and, where available, the API's AI analysis.
  // files[].pdfFile is "{CNR}-order-3.pdf"; interimOrders[].orderUrl is "order-3.pdf".
  const docs = arr(d.files?.files).reduce((map, f) => {
    const name = f.pdfFile || "";
    const key = name.startsWith(`${cnr}-`) ? name.slice(cnr.length + 1) : name;
    map[key] = { text: f.markdownContent || null, ai: readOrderAnalysis(f.aiAnalysis) };
    return map;
  }, {});

  const withDoc = (o, kind) => {
    const doc = docs[o.orderUrl] || {};
    return {
      date: o.orderDate,
      title: o.orderType || o.description || (kind === "judgment" ? "Judgment" : "Interim order"),
      file: o.orderUrl || null,
      kind,
      text: doc.text || null,
      ai: doc.ai || null,
    };
  };

  const orders = [
    ...arr(c.judgmentOrders).map((o) => withDoc(o, "judgment")),
    ...arr(c.interimOrders).map((o) => withDoc(o, "interim")),
  ].sort((a, b) => String(b.date).localeCompare(String(a.date)));

  // "What this case is about" is genuinely case-level; the per-order summaries
  // describe single hearings and stay attached to their own order.
  const story = orders.find((o) => o.ai?.story)?.ai.story || null;

  return {
    cnr,
    title: caseTitle(c.petitioners, c.respondents),
    caseNumber: c.registrationNumber || c.caseNumber || "",
    filingNumber: c.filingNumber || "",
    caseType: c.caseType || "",
    caseTypeLabel: readCaseType(c.caseType, c.caseTypeRaw, descriptions, c.cnrCourtCode),
    status: (c.caseStatus || "").toUpperCase(),
    statusLabel: lookup(descriptions, "caseStatus", c.caseStatus) || titleise(c.caseStatus) || "Unknown",
    courtName: courtDisplay,
    courtCode: c.cnrCourtCode || "",
    district,
    state: c.state || "",
    judicialSection: c.judicialSectionRaw || lookup(descriptions, "judicialSection", c.judicialSection) || "",
    category: (Array.isArray(c.caseCategoryFacetPath) ? c.caseCategoryFacetPath[0] : c.caseCategoryFacetPath) || "",
    actsAndSections: c.actsAndSections || "",
    filingDate: c.filingDate || null,
    registrationDate: c.registrationDate || null,
    firstHearingDate: c.firstHearingDate || null,
    lastHearingDate: c.lastHearingDate || null,
    nextHearingDate: c.nextHearingDate || null,
    decisionDate: c.decisionDate || null,
    purpose: c.purpose || "",
    disposalType: c.disposalTypeRaw || (c.disposalType ? titleise(c.disposalType.replace(/_/g, " ")) : ""),
    contested: c.contestedStatus ? titleise(c.contestedStatus) : "",
    durationDays: c.caseDurationDays ?? null,
    judges: realValues(c.judges),
    petitioners: realValues(c.petitioners),
    respondents: realValues(c.respondents),
    petitionerAdvocates: realValues(c.petitionerAdvocates),
    respondentAdvocates: realValues(c.respondentAdvocates),
    counts: {
      hearings: c.hearingCount ?? hearings.length,
      orders: c.orderCount ?? orders.length,
      interim: c.interimOrderCount ?? 0,
      judgments: c.judgmentCount ?? 0,
      ias: c.iaCount ?? 0,
    },
    hearings,
    business,
    orders,
    story,
    ias: arr(c.interlocutoryApplications).map((ia) => ({
      number: ia.iaNumber || ia.number || "IA",
      filingDate: ia.filingDate || null,
      status: ia.status || "",
      purpose: ia.purpose || "",
    })),
    taggedMatters: arr(c.taggedMatters),
    fir: c.firDetails && Object.keys(c.firDetails).length ? c.firDetails : null,
    updatedAt: d.entityInfo?.dateModified || null,
  };
}

export function normaliseSearch(payload) {
  const d = payload?.data ?? payload ?? {};
  const descriptions = d.enumDescriptions;

  return {
    query: d.query || "",
    totalHits: d.totalHits ?? 0,
    page: d.page ?? 1,
    totalPages: d.totalPages ?? 1,
    hasNextPage: Boolean(d.hasNextPage),
    processingTimeMs: d.processingTimeMs ?? null,
    results: arr(d.results).map((r) => ({
      cnr: r.cnr,
      title: caseTitle(r.petitioners, r.respondents),
      caseType: r.caseType || "",
      caseTypeLabel: readCaseType(r.caseType, r.caseTypeRaw, descriptions, r.courtCode),
      status: (r.caseStatus || "").toUpperCase(),
      statusLabel: lookup(descriptions, "caseStatus", r.caseStatus) || titleise(r.caseStatus),
      courtName: r.courtName || lookup(descriptions, "courtCode", r.courtCode) || r.courtCode || "",
      caseNumber: r.registrationNumber || "",
      filingDate: r.filingDate || null,
      nextHearingDate: r.nextHearingDate || null,
      decisionDate: r.decisionDate || null,
      advocates: [...realValues(r.petitionerAdvocates), ...realValues(r.respondentAdvocates)],
      keywords: arr(r.aiKeywords),
      hearings: r.hearingCount ?? null,
    })),
  };
}
