import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icons";
import RichText from "./RichText";
import { assistant, contact } from "../data/content";

const THINKING = ["Reading your question", "Checking the Indian legal context", "Writing a clear answer"];

function Thinking() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % THINKING.length), 1700);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="chat__row chat__row--bot">
      <span className="chat__avatar">
        <Icon name="sparkle" width={16} height={16} />
      </span>
      <div className="chat__bubble chat__bubble--bot chat__bubble--thinking">
        <span className="chat__dots" aria-hidden="true">
          <i /><i /><i />
        </span>
        <span className="chat__thinktext">{THINKING[step]}…</span>
      </div>
    </div>
  );
}

const whatsappHref = `https://wa.me/${contact.whatsapp.replace(/[^\d]/g, "")}?text=${encodeURIComponent(
  "Namaste, I have a legal question."
)}`;

/** The message list. Owns its own scrolling so both chat surfaces behave alike. */
export default function ChatThread({ messages, busy, className = "", afterGreeting = null }) {
  const ref = useRef(null);

  // Keep the newest turn in view. A fresh answer scrolls to its FIRST line —
  // landing at the end of a long reply and scrolling back up is disorienting.
  useEffect(() => {
    const thread = ref.current;
    if (!thread) return;

    const last = messages[messages.length - 1];
    const node = last && thread.querySelector(`[data-mid="${last.id}"]`);
    if (!busy && last?.role === "bot" && node) {
      thread.scrollTop = Math.max(0, node.offsetTop - thread.offsetTop - 8);
    } else if (messages.length || busy) {
      thread.scrollTop = thread.scrollHeight;
    }
  }, [messages, busy]);

  return (
    <div className={`chat__thread ${className}`} ref={ref} aria-live="polite">
      <div className="chat__row chat__row--bot">
        <span className="chat__avatar">
          <Icon name="sparkle" width={16} height={16} />
        </span>
        <div className="chat__bubble chat__bubble--bot">
          <p className="rt__p">{assistant.greeting}</p>
        </div>
      </div>

      {!messages.length && afterGreeting}

      {messages.map((m) => (
        <div
          key={m.id}
          data-mid={m.id}
          className={`chat__row chat__row--${m.role === "user" ? "user" : "bot"}`}
        >
          {m.role === "bot" && (
            <span className={`chat__avatar ${m.failed ? "chat__avatar--warn" : ""}`}>
              <Icon name={m.failed ? "alert" : "sparkle"} width={16} height={16} />
            </span>
          )}
          <div
            className={`chat__bubble chat__bubble--${m.role === "user" ? "user" : "bot"} ${
              m.failed ? "chat__bubble--warn" : ""
            }`}
          >
            {m.role === "bot" ? <RichText text={m.text} /> : <p className="rt__p">{m.text}</p>}
            {m.failed && (
              <a className="chat__fallback" href={whatsappHref} target="_blank" rel="noreferrer">
                Ask on WhatsApp instead <Icon name="arrow" width={14} height={14} />
              </a>
            )}
          </div>
        </div>
      ))}

      {busy && <Thinking />}
    </div>
  );
}
