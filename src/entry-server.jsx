import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import App from "./App.jsx";

/**
 * Build-time entry point used by scripts/prerender.mjs.
 * Renders one route to an HTML string; no browser APIs are touched because
 * every component confines them to effects, which do not run on the server.
 */
export function render(path) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={path}>
        <App />
      </StaticRouter>
    </StrictMode>
  );
}
