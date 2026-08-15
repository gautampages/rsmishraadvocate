import { Icon } from "./Icons";
import Reveal from "./Reveal";
import ChatThread from "./ChatThread";
import ChatComposer from "./ChatComposer";
import { assistant } from "../data/content";
import { useAssistant } from "../lib/assistantContext";

export default function AskAI() {
  const { messages, busy, send, reset, started } = useAssistant();

  return (
    <section id="ask-ai" className="section section--tint askai">
      <div className="dots" aria-hidden="true" />
      <div className="container">
        <Reveal className="section__head">
          <span className="eyebrow eyebrow--chip">
            <Icon name="sparkle" width={14} height={14} /> {assistant.eyebrow}
          </span>
          <h2 className="section__title">{assistant.heading}</h2>
          <span className="section__rule section__rule--center" />
          <p className="section__subtitle">{assistant.subtext}</p>
        </Reveal>

        <Reveal className="chat" delay={70}>
          <header className="chat__head">
            <span className="chat__orb">
              <Icon name="sparkle" width={20} height={20} />
            </span>
            <div className="chat__ident">
              <strong>{assistant.botName}</strong>
              <span className="chat__status">
                <i className="chat__online" aria-hidden="true" />
                {busy ? "Typing…" : assistant.botStatus}
              </span>
            </div>
            {started && (
              <button
                type="button"
                className="chat__clear"
                onClick={reset}
                disabled={busy}
                aria-label="Start a new chat"
              >
                <Icon name="refresh" width={15} height={15} />
                <span>New chat</span>
              </button>
            )}
          </header>

          <ChatThread messages={messages} busy={busy} />

          {!started && (
            <div className="chat__suggests">
              <span className="chat__suggestlabel">Popular questions</span>
              <div className="chat__chips">
                {assistant.suggestions.map((s) => (
                  <button key={s} type="button" className="chat__chip" onClick={() => send(s)} disabled={busy}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <ChatComposer onSend={send} busy={busy} />

          <footer className="chat__foot">
            <p>{assistant.disclaimer}</p>
            <a className="chat__footlink" href="#contact">
              Speak to the advocate <Icon name="arrow" width={14} height={14} />
            </a>
          </footer>
        </Reveal>
      </div>
    </section>
  );
}
