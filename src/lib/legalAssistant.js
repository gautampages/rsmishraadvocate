/* =========================================================================
   Legal assistant client — talks to the Cloudflare Worker that fronts the model.

   Endpoint contract:
     POST { question: string }  →  { answer: string }

   The system prompt and guard rails live inside the worker, so the browser
   sends only the visitor's own words (plus a short transcript of the current
   chat, so follow-up questions keep their thread).

   ⚠ The worker must send CORS headers for the browser to be allowed to read
   the reply. See docs/worker-cors.md for the exact patch. Until that is
   deployed, requests from the website fail the preflight and the UI falls
   back to a "call the chamber" message.
   ========================================================================= */

const WORKER_URL = "https://cold-disk-f361.gautampages.workers.dev/";

// `npm run dev` routes through the Vite proxy so the chat is testable locally
// even before the worker sends CORS headers. Builds always call the worker.
const ENDPOINT =
  import.meta.env?.VITE_ASSISTANT_URL || (import.meta.env?.DEV ? "/api/assistant" : WORKER_URL);

const TIMEOUT_MS = 45000;

export class AssistantError extends Error {
  constructor(message, { code = "FAILED" } = {}) {
    super(message);
    this.name = "AssistantError";
    this.code = code;
  }
}

/** Truncate long replies so a multi-turn transcript stays cheap to send. */
const clip = (text, max) => (text.length > max ? `${text.slice(0, max).trimEnd()}…` : text);

/**
 * The worker owns the system prompt, so we send the question alone on the
 * first turn. On follow-ups we prepend a short transcript, otherwise "and how
 * long does that take?" arrives with nothing to refer back to.
 */
export function buildPrompt(question, history = []) {
  const q = question.trim();
  const recent = history.filter((m) => m.text?.trim()).slice(-4);
  if (!recent.length) return q;

  const lines = recent.map(
    (m) => `${m.role === "user" ? "User" : "Assistant"}: ${clip(m.text.trim(), 600)}`
  );
  return `Earlier in this conversation:\n${lines.join("\n")}\n\nFollow-up question: ${q}`;
}

/** Ask the assistant. Resolves to the answer text. */
export async function askAssistant(question, history = []) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  let res;
  try {
    res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: buildPrompt(question, history) }),
      signal: controller.signal,
    });
  } catch (err) {
    clearTimeout(timer);
    if (err?.name === "AbortError") {
      throw new AssistantError(
        "That took longer than expected. Please try asking again, or call the chamber.",
        { code: "TIMEOUT" }
      );
    }
    // A blocked CORS preflight surfaces here as a generic TypeError.
    throw new AssistantError(
      "The assistant could not be reached from your browser. Please try again in a moment, or call the chamber.",
      { code: "NETWORK" }
    );
  }
  clearTimeout(timer);

  if (res.status === 429) {
    throw new AssistantError("The assistant is busy right now. Please try again in a minute.", {
      code: "RATE_LIMIT",
    });
  }
  if (!res.ok) {
    throw new AssistantError(`The assistant is unavailable at the moment (error ${res.status}).`, {
      code: "HTTP",
    });
  }

  let payload;
  try {
    payload = await res.json();
  } catch {
    throw new AssistantError("The assistant sent a reply we could not read. Please try again.", {
      code: "PARSE",
    });
  }

  // { answer: "..." } is the current shape; the rest are earlier/likely
  // variants, so a worker tweak degrades to a retry rather than a blank page.
  const text =
    (typeof payload?.answer === "string" ? payload.answer : null) ??
    payload?.answer?.response ??
    payload?.answer?.text ??
    payload?.response ??
    payload?.result?.response;

  if (!text || typeof text !== "string") {
    throw new AssistantError("The assistant returned an empty answer. Please rephrase and try again.", {
      code: "EMPTY",
    });
  }

  return { text: text.trim(), usage: payload?.answer?.usage ?? null };
}
