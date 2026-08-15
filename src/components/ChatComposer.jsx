import { useRef, useState } from "react";
import { Icon } from "./Icons";
import { assistant } from "../data/content";

/** Question box shared by the inline section and the floating widget. */
export default function ChatComposer({ onSend, busy, autoFocus = false, className = "" }) {
  const [draft, setDraft] = useState("");
  const ref = useRef(null);

  const submit = () => {
    const text = draft.trim();
    if (!text || busy) return;
    onSend(text);
    setDraft("");
    if (ref.current) ref.current.style.height = "";
  };

  // Grow the box with the question, up to the max-height set in CSS.
  const onChange = (e) => {
    setDraft(e.target.value);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <form
      className={`chat__composer ${className}`}
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <textarea
        ref={ref}
        rows={1}
        value={draft}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={assistant.placeholder}
        aria-label="Ask a legal question"
        maxLength={1000}
        autoFocus={autoFocus}
      />
      <button type="submit" className="chat__send" disabled={busy || !draft.trim()} aria-label="Send question">
        <Icon name={busy ? "refresh" : "arrow"} width={20} height={20} />
      </button>
    </form>
  );
}
