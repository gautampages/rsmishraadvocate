# Worker CORS notes

Two workers front this site:

| Worker | Used by | CORS status |
|---|---|---|
| `legal-data.gautampages.workers.dev` | Case Status tracker | ✅ configured — but see the caveat below |
| `cold-disk-f361.gautampages.workers.dev` | Ask AI assistant | ❌ **still needs the patch below** |

## Caveat on the court-records worker

It answers preflights correctly, but `Access-Control-Allow-Origin` is a fixed
string rather than an echo of the allowed origin:

```
$ curl -i -X POST … -H 'Origin: https://ramsnehimishra.in'
access-control-allow-origin: https://www.ramsnehimishra.in     ← always this, whatever you send
```

The browser requires an **exact** match, so:

- ✅ `https://www.ramsnehimishra.in` — works
- ❌ `https://ramsnehimishra.in` (no `www`) — blocked
- ❌ `http://localhost:5173` — blocked (dev goes through the Vite proxy instead)

If the site is ever reachable without the `www.` prefix, the tracker breaks
there. Use the `corsHeaders(request)` helper below, which picks the caller's
origin out of an allowlist, on this worker too.

---

# Assistant worker — required CORS patch

The **Ask AI** section on the website calls the assistant worker directly from
the visitor's browser:

```
POST https://cold-disk-f361.gautampages.workers.dev/
Content-Type: application/json
{ "question": "<the visitor's question>" }   →   { "answer": "<reply text>" }
```

The system prompt and guard rails live inside the worker, so the browser sends
only the visitor's own words (plus a short transcript of the current chat, so
follow-up questions keep their thread).

Today the worker answers that request correctly from `curl`, but **a browser
cannot use it**:

```
$ curl -i -X OPTIONS https://cold-disk-f361.gautampages.workers.dev/ \
    -H 'Origin: https://ramsnehimishra.in' \
    -H 'Access-Control-Request-Method: POST' \
    -H 'Access-Control-Request-Headers: content-type'

HTTP/2 405
Use POST request          ← no CORS headers, preflight rejected
```

Because the request sends `Content-Type: application/json`, the browser first
sends an `OPTIONS` preflight. The worker replies `405` with no
`Access-Control-Allow-*` headers, so the browser blocks the call before the
POST is ever made. Even if the preflight passed, the browser would refuse to
hand the response to JavaScript without an `Access-Control-Allow-Origin`
header on the POST response too.

`curl` is unaffected — it does not enforce CORS. This is a browser-only rule,
which is why the endpoint looks healthy from the terminal.

## The fix

Add the two blocks marked below to the worker and redeploy. Nothing else about
the worker's behaviour changes.

```js
const ALLOWED_ORIGINS = [
  "https://ramsnehimishra.in",
  "https://www.ramsnehimishra.in",
  "http://localhost:5173",          // local development
];

function corsHeaders(request) {
  const origin = request.headers.get("Origin") || "";
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

export default {
  async fetch(request, env, ctx) {
    // ---- 1. Answer the preflight ----
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(request) });
    }

    if (request.method !== "POST") {
      return new Response("Use POST request", {
        status: 405,
        headers: corsHeaders(request),
      });
    }

    // ... your existing logic that produces `result` ...

    // ---- 2. Attach CORS headers to the real response ----
    return new Response(JSON.stringify({ answer: result }), {
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders(request),
      },
    });
  },
};
```

`ALLOWED_ORIGINS` keeps the worker from being used by arbitrary websites. If
you would rather not maintain the list, `"Access-Control-Allow-Origin": "*"`
also works, but then any site can spend your model quota.

## Verifying

After deploying, this should return `204` with the CORS headers:

```bash
curl -i -X OPTIONS https://cold-disk-f361.gautampages.workers.dev/ \
  -H 'Origin: https://ramsnehimishra.in' \
  -H 'Access-Control-Request-Method: POST' \
  -H 'Access-Control-Request-Headers: content-type'
```

and this should include `access-control-allow-origin` in its headers:

```bash
curl -i -X POST https://cold-disk-f361.gautampages.workers.dev/ \
  -H 'Content-Type: application/json' \
  -H 'Origin: https://ramsnehimishra.in' \
  --data '{"question":"hello"}'
```

## Until then

- **Local development works already** — `npm run dev` proxies `/api/assistant`
  through the Vite dev server (see `vite.config.js`), which is server-side and
  not subject to CORS.
- **The deployed site degrades gracefully** — a blocked request shows a polite
  "could not be reached" message in the chat with a WhatsApp link, instead of a
  silent failure.

## Worth considering later

- **Rate limiting.** The endpoint is public and unauthenticated; a script could
  run up the model bill. Cloudflare's rate-limiting rules or a small KV counter
  per IP would cap this. The `ALLOWED_ORIGINS` list above stops other *websites*
  from embedding it, but not direct `curl` traffic.
- **A length cap on `question`.** The site sends at most ~1,000 characters plus
  a short transcript, but nothing stops a direct caller from posting far more.
