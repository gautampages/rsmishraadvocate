import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Dev-only shim for the assistant worker. The deployed site talks to the
      // worker directly, which requires the CORS patch in docs/worker-cors.md.
      //
      // The worker now rejects any request whose Origin is not an allowed
      // production host, and a proxied call carries localhost's Origin, so we
      // override it here — same shim as /api/ecourts below.
      '/api/assistant': {
        target: 'https://cold-disk-f361.gautampages.workers.dev',
        changeOrigin: true,
        headers: { Origin: 'https://ramsnehimishra.in' },
        rewrite: () => '/',
      },
      // Dev-only shim for the appointments API (booking + the status popup).
      // Its CORS policy names the production hostname, so a direct call from
      // localhost is rejected at the preflight. Note the API identifies the
      // visitor by IP, and a proxied call still carries this machine's public
      // IP — so dev sees the same appointments a browser here would.
      '/api/appointment': {
        target: 'https://api.ramsnehimishra.in',
        changeOrigin: true,
        headers: { Origin: 'https://ramsnehimishra.in' },
        rewrite: (p) => p.replace(/^\/api\/appointment/, '/appointment'),
      },
      // Dev-only shim for the court-records worker. Its CORS header names a
      // fixed production hostname, so localhost cannot call it directly.
      //
      // The worker now also *requires* an allowed Origin on every request, and
      // a proxied call carries none, so we set one here. That this works with
      // one line is the point: Origin filtering deters other sites and casual
      // scrapers, it does not authenticate anyone.
      // Dev-only shim for the case-law worker (Indian Kanoon). Same story as
      // the others: its CORS header names the production hostname, so a call
      // from localhost is refused at the preflight.
      '/api/kanoon': {
        target: 'https://kanoon.ramsnehimishra.in',
        changeOrigin: true,
        headers: { Origin: 'https://ramsnehimishra.in' },
        rewrite: (p) => p.replace(/^\/api\/kanoon/, ''),
      },
      '/api/ecourts': {
        target: 'https://legal-data.gautampages.workers.dev',
        changeOrigin: true,
        headers: { Origin: 'https://ramsnehimishra.in' },
        rewrite: (p) => p.replace(/^\/api\/ecourts/, '/api'),
      },
    },
  },
})
