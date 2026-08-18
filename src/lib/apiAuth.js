/* =========================================================================
   Shared client header for the site's own APIs.

   Every backend (court records, case law, assistant, appointments) is meant
   to serve only requests carrying this header, on top of its Origin check.

   The value ships in the public bundle, so anyone reading the bundle or the
   network tab can copy it — an abuse filter against casual scrapers, not
   authentication.

   ⚠ A backend must list x-alt-nv in its Access-Control-Allow-Headers before
   the site sends it, or the browser's CORS preflight fails and every call to
   that backend breaks. The Vite dev proxy hides this (proxied requests are
   same-origin, no preflight), so test against production before deploying.
   ========================================================================= */

export const API_AUTH_HEADER = { "x-alt-nv": "xyjgyfhjbmsyfyhjbsjhvgv" };
