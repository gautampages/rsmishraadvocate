import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Dev-only shim for the assistant worker. The deployed site talks to the
      // worker directly, which requires the CORS patch in docs/worker-cors.md.
      '/api/assistant': {
        target: 'https://cold-disk-f361.gautampages.workers.dev',
        changeOrigin: true,
        rewrite: () => '/',
      },
      // Dev-only shim for the court-records worker. Its CORS header names a
      // fixed production hostname, so localhost cannot call it directly.
      '/api/ecourts': {
        target: 'https://legal-data.gautampages.workers.dev',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api\/ecourts/, '/api'),
      },
    },
  },
})
