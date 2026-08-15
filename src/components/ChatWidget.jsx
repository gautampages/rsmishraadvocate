import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icons";
import ChatThread from "./ChatThread";
import ChatComposer from "./ChatComposer";
import { assistant } from "../data/content";
import { useAssistant } from "../lib/assistantContext";

const TEASER_DELAY_MS = 14000;
const TEASER_KEY = "rsm.assistant.teaserSeen";

const seenTeaser = () => {
  try {
    return sessionStorage.getItem(TEASER_KEY) === "1";
  } catch {
    return false;
  }
};
const markTeaserSeen = () => {
  try {
    sessionStorage.setItem(TEASER_KEY, "1");
  } catch {
    /* private browsing — the teaser simply shows again next time */
  }
};

export default function ChatWidget() {
  const { messages, busy, send, reset, started } = useAssistant();

  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false); // keeps the close animation
  const [teaser, setTeaser] = useState(false);
  const [seenCount, setSeenCount] = useState(0);
  const [inlineVisible, setInlineVisible] = useState(false);
  const panelRef = useRef(null);

  const answers = messages.filter((m) => m.role === "bot").length;
  const unread = open ? 0 : Math.max(0, answers - seenCount);

  // Step out of the way while the visitor is reading the full-size section —
  // two chat surfaces on screen at once looks like a bug.
  useEffect(() => {
    const section = document.getElementById("ask-ai");
    if (!section) return;
    const io = new IntersectionObserver(([entry]) => setInlineVisible(entry.isIntersecting), {
      threshold: 0.25,
    });
    io.observe(section);
    return () => io.disconnect();
  }, []);

  // Invite the visitor once per session, after they have had a look around.
  useEffect(() => {
    if (seenTeaser()) return;
    const id = setTimeout(() => {
      if (!open && !started) setTeaser(true);
    }, TEASER_DELAY_MS);
    return () => clearTimeout(id);
  }, [open, started]);

  useEffect(() => {
    if (open) setSeenCount(answers);
  }, [open, answers]);

  // Escape closes the panel, as in every other chat dock.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const openPanel = (question) => {
    setMounted(true);
    setOpen(true);
    setTeaser(false);
    markTeaserSeen();
    if (question) send(question);
  };

  const dismissTeaser = (e) => {
    e.stopPropagation();
    setTeaser(false);
    markTeaserSeen();
  };

  // On phones the panel is a full-width sheet, so freeze the page behind it.
  useEffect(() => {
    if (!open) return;
    const small = window.matchMedia("(max-width: 560px)");
    if (!small.matches) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const hidden = inlineVisible && !open;

  return (
    <div className={`cw ${hidden ? "cw--hidden" : ""} ${open ? "cw--open" : ""}`}>
      {teaser && !open && (
        <div className="cw__teaser" role="dialog" aria-label="Legal assistant">
          <button className="cw__teaserclose" onClick={dismissTeaser} aria-label="Dismiss">
            <Icon name="close" width={14} height={14} />
          </button>
          <p className="cw__teasertext">{assistant.teaser}</p>
          <div className="cw__teaserchips">
            {assistant.suggestions.slice(0, 2).map((s) => (
              <button key={s} type="button" className="cw__teaserchip" onClick={() => openPanel(s)}>
                {s}
              </button>
            ))}
          </div>
          <button type="button" className="cw__teaseropen" onClick={() => openPanel()}>
            Ask your own question <Icon name="arrow" width={14} height={14} />
          </button>
        </div>
      )}

      {mounted && (
        <div className={`cw__panel ${open ? "is-open" : ""}`} ref={panelRef} aria-hidden={!open}>
          <header className="cw__head">
            <span className="cw__orb">
              <Icon name="sparkle" width={20} height={20} />
            </span>
            <div className="cw__ident">
              <strong>{assistant.botName}</strong>
              <span className="cw__status">
                <i className="chat__online" aria-hidden="true" />
                {busy ? "Typing…" : assistant.botStatus}
              </span>
            </div>
            <div className="cw__actions">
              {started && (
                <button
                  type="button"
                  className="cw__iconbtn"
                  onClick={reset}
                  disabled={busy}
                  aria-label="Start a new chat"
                  title="New chat"
                >
                  <Icon name="refresh" width={17} height={17} />
                </button>
              )}
              <button
                type="button"
                className="cw__iconbtn"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                title="Close"
              >
                <Icon name="chevron" width={19} height={19} />
              </button>
            </div>
          </header>

          <ChatThread
            messages={messages}
            busy={busy}
            className="chat__thread--dock"
            afterGreeting={
              <div className="cw__quick">
                {assistant.suggestions.slice(0, 4).map((s) => (
                  <button key={s} type="button" className="chat__chip" onClick={() => send(s)} disabled={busy}>
                    {s}
                  </button>
                ))}
              </div>
            }
          />

          <ChatComposer onSend={send} busy={busy} className="chat__composer--dock" />

          <p className="cw__note">{assistant.dockNote}</p>
        </div>
      )}

      <button
        type="button"
        className={`cw__launcher ${open ? "is-open" : ""}`}
        onClick={() => (open ? setOpen(false) : openPanel())}
        aria-label={open ? "Close legal assistant" : "Ask the legal assistant"}
        aria-expanded={open}
      >
        <span className="cw__ring" aria-hidden="true" />
        <span className="cw__icon cw__icon--chat">
          <Icon name="sparkle" width={24} height={24} />
        </span>
        <span className="cw__icon cw__icon--close">
          <Icon name="close" width={22} height={22} />
        </span>
        {unread > 0 && <span className="cw__badge">{unread}</span>}
      </button>
    </div>
  );
}
