import { useCallback, useMemo, useRef, useState } from "react";
import { AssistantContext } from "../lib/assistantContext";
import { AssistantError, askAssistant } from "../lib/legalAssistant";

let seq = 0;
const nextId = () => `m${++seq}`;

/**
 * Holds the single chat thread for the whole site. The inline "Ask a Legal
 * Question" section and the floating widget both read and write it, so a
 * visitor can start in one and carry on in the other.
 */
export default function AssistantProvider({ children }) {
  const [messages, setMessages] = useState([]);
  const [busy, setBusy] = useState(false);

  // Mirror of `messages` so `send` can read the thread without being
  // re-created on every message (which would restart callers' effects).
  const historyRef = useRef([]);
  const inFlight = useRef(false);

  const send = useCallback(async (question) => {
    const text = (question || "").trim();
    if (!text || inFlight.current) return;

    const history = historyRef.current.map((m) => ({ role: m.role, text: m.text }));
    const userMsg = { id: nextId(), role: "user", text };
    historyRef.current = [...historyRef.current, userMsg];
    setMessages(historyRef.current);

    inFlight.current = true;
    setBusy(true);

    let reply;
    try {
      const { text: answer } = await askAssistant(text, history);
      reply = { id: nextId(), role: "bot", text: answer };
    } catch (err) {
      reply = {
        id: nextId(),
        role: "bot",
        text: err instanceof AssistantError ? err.message : "Something went wrong. Please try again.",
        failed: true,
      };
    }

    historyRef.current = [...historyRef.current, reply];
    setMessages(historyRef.current);
    inFlight.current = false;
    setBusy(false);
  }, []);

  const reset = useCallback(() => {
    if (inFlight.current) return;
    historyRef.current = [];
    setMessages([]);
  }, []);

  const value = useMemo(
    () => ({ messages, busy, send, reset, started: messages.length > 0 }),
    [messages, busy, send, reset]
  );

  return <AssistantContext.Provider value={value}>{children}</AssistantContext.Provider>;
}
