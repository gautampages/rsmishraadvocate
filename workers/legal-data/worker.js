/**
 * Court records proxy — legal-data.gautampages.workers.dev
 *
 * Fronts the eCourts partner API so the website never sees the token.
 * Serves two endpoints, both GET:
 *
 *   /api/case/{cnr}   → full case record
 *   /api/search?…     → case search (params forwarded as-is)
 *
 * Deploy:  npx wrangler deploy
 * Secret:  npx wrangler secret put ECOURTS_TOKEN
 */

const ECOURTS_BASE_URL = "https://webapi.ecourtsindia.com/api/partner";

/** Origins allowed to call this worker from a browser. */
const ALLOWED_ORIGINS = new Set([
  "https://ramsnehimishra.in",
  "https://www.ramsnehimishra.in",
  "http://localhost:5173", // Vite dev server
]);

/** Query parameters forwarded to the search API. Anything else is dropped. */
const SEARCH_PARAMS = [
  // text search
  "query", "advocates", "judges", "petitioners", "respondents", "litigants", "nameMatchMode",
  // filters
  "courtCodes", "caseTypes", "caseStatuses", "judicialSections", "courtLevels", "caseNumbers", "cnrs",
  "existsFields", "missingFields",
  // dates
  "filingDateFrom", "filingDateTo", "nextHearingDateFrom", "nextHearingDateTo",
  "decisionDateFrom", "decisionDateTo",
  // facets & projection
  "facets", "includeFacetCounts", "maxFacetValues", "facetPrefix", "facetContains",
  "yearFacetField", "yearFacetGap", "fields",
  // sorting & paging
  "sortBy", "sortOrder", "includeExtremeDates", "page", "pageSize",
];

/** A CNR is 4 letters followed by 12 digits, e.g. DLND020047882015. */
const CNR_PATTERN = /^[A-Z]{4}\d{12}$/;

const MAX_PARAM_LENGTH = 200;
const UPSTREAM_TIMEOUT_MS = 30000;

function getCorsHeaders(request) {
  const origin = request.headers.get("Origin");

  const headers = {
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };

  // Echo the caller's origin only when it is on the allowlist. A fixed value
  // here would break every other hostname, since browsers require an exact
  // match — the apex domain and the www subdomain are different origins.
  if (ALLOWED_ORIGINS.has(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
  }

  return headers;
}

export default {
  async fetch(request, env) {
    const corsHeaders = getCorsHeaders(request);

    // Declared inside fetch() so it can see corsHeaders. As a module-level
    // function it threw "corsHeaders is not defined" on every response —
    // including from the catch block, which masked the real error.
    const jsonResponse = (data, status = 200) =>
      new Response(JSON.stringify(data), {
        status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });

    const fail = (code, message, status) =>
      jsonResponse({ error: { code, message, details: null } }, status);

    // ---------------------------------------------------------------
    // CORS preflight
    // ---------------------------------------------------------------
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method !== "GET") {
      return fail("METHOD_NOT_ALLOWED", "Only GET requests are allowed", 405);
    }

    // ---------------------------------------------------------------
    // Configuration guard — never send "Bearer undefined" upstream
    // ---------------------------------------------------------------
    if (!env.ECOURTS_TOKEN) {
      console.error("ECOURTS_TOKEN is not configured");
      return fail("SERVICE_UNAVAILABLE", "Court records are temporarily unavailable", 503);
    }

    // ---------------------------------------------------------------
    // Per-IP rate limiting
    // ---------------------------------------------------------------
    const clientIp = request.headers.get("CF-Connecting-IP") || "unknown";

    if (typeof env.MY_RATE_LIMITER?.limit === "function") {
      const { success } = await env.MY_RATE_LIMITER.limit({ key: clientIp });
      if (!success) {
        return fail("RATE_LIMIT_EXCEEDED", "Too many requests. Please try again later.", 429);
      }
    } else {
      // Missing binding used to throw on every request. Carry on unlimited,
      // but make the misconfiguration visible in the logs.
      console.warn("MY_RATE_LIMITER binding is missing — requests are not rate limited");
    }

    const url = new URL(request.url);

    try {
      // =============================================================
      // GET /api/case/{cnr}
      // =============================================================
      if (url.pathname.startsWith("/api/case/")) {
        const cnr = url.pathname.slice("/api/case/".length).trim().toUpperCase();

        if (!cnr) {
          return fail("CNR_REQUIRED", "CNR is required", 400);
        }
        if (!CNR_PATTERN.test(cnr)) {
          return fail("INVALID_CNR", "Invalid CNR format", 400);
        }

        return await proxy(`${ECOURTS_BASE_URL}/case/${encodeURIComponent(cnr)}`, "Case");
      }

      // =============================================================
      // GET /api/search
      // =============================================================
      if (url.pathname === "/api/search") {
        const search = new URLSearchParams();

        for (const name of SEARCH_PARAMS) {
          // getAll, not get: the API takes repeated keys for array params
          // (advocates=A&advocates=B), and get() would keep only the first.
          for (const value of url.searchParams.getAll(name)) {
            const trimmed = value.trim();
            if (trimmed && trimmed.length <= MAX_PARAM_LENGTH) search.append(name, trimmed);
          }
        }

        const qs = search.toString();
        return await proxy(`${ECOURTS_BASE_URL}/search${qs ? `?${qs}` : ""}`, "Search");
      }

      return fail("NOT_FOUND", "Endpoint not found", 404);
    } catch (error) {
      console.error("Worker / eCourts error:", error);
      return fail("UPSTREAM_UNAVAILABLE", "Unable to reach eCourts API", 503);
    }

    /**
     * Forward one request upstream and hand the answer back unchanged.
     *
     * Upstream failures are reported as failures. An earlier version answered
     * a 401 with a hard-coded sample case, which meant an expired token served
     * invented hearing dates that looked real — the one error a litigant must
     * never be shown.
     */
    async function proxy(apiUrl, label) {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${env.ECOURTS_TOKEN}`,
          Accept: "application/json",
        },
        signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
      });

      if (response.ok) {
        return jsonResponse(await response.json(), 200);
      }

      const errorData = await response.json().catch(() => null);
      console.error(`eCourts ${label} API failed:`, response.status, errorData);

      if (response.status === 401 || response.status === 403) {
        // Don't leak an upstream credential problem to the visitor.
        return fail("SERVICE_UNAVAILABLE", "Court records are temporarily unavailable", 503);
      }

      return jsonResponse(
        errorData || {
          error: { code: "ECOURTS_API_ERROR", message: "eCourts API request failed", details: null },
        },
        response.status
      );
    }
  },
};
