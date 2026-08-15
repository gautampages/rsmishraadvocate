import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icons";
import Reveal from "./Reveal";
import CaseResult from "./CaseResult";
import { caseTracker } from "../data/content";
import { CaseApiError, fetchCaseByCnr, normaliseCnr, searchCases } from "../lib/ecourts";
import { formatDate, statusTone } from "../lib/caseInsights";

const MODES = [
  { key: "cnr", label: "CNR number", icon: "scan", placeholder: "e.g. DLND020047882015", hint: "The 16-character CNR printed on your case papers" },
  { key: "litigants", label: "Party name", icon: "users", placeholder: "e.g. Sunita Devi", hint: "Name of the petitioner, complainant, respondent or accused" },
  { key: "advocates", label: "Advocate", icon: "scales", placeholder: "e.g. Ram Snehi Mishra", hint: "Name of the advocate on record" },
];

const STEPS = [
  "Connecting to the eCourts network",
  "Locating the case file",
  "Reading hearing history & orders",
  "Preparing your summary",
];

/* ---------------------------------------------------------------- *
 * Scanning / thinking state
 * ---------------------------------------------------------------- */

function Scanning() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setStep((s) => Math.min(s + 1, STEPS.length - 1)), 420);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="scanner" role="status" aria-live="polite">
      <div className="scanner__orb">
        <span className="scanner__ring" />
        <span className="scanner__ring scanner__ring--2" />
        <Icon name="sparkle" width={24} height={24} />
      </div>
      <ul className="scanner__steps">
        {STEPS.map((s, i) => (
          <li key={s} className={i < step ? "is-done" : i === step ? "is-active" : ""}>
            <span className="scanner__tick">
              {i < step ? <Icon name="check" width={12} height={12} strokeWidth={3} /> : null}
            </span>
            {s}
          </li>
        ))}
      </ul>
      <div className="scanner__skeleton" aria-hidden="true">
        <span /><span /><span />
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- *
 * Search-result list
 * ---------------------------------------------------------------- */

function SearchResults({ data, onOpen }) {
  if (!data.results.length) {
    return (
      <div className="cst__empty">
        <Icon name="search" width={30} height={30} />
        <h3>No matching cases found</h3>
        <p>
          Court records list names exactly as they were filed. Try a shorter name, a different spelling, or search by
          CNR number instead.
        </p>
      </div>
    );
  }

  return (
    <div className="hits">
      <p className="hits__meta">
        <strong>{data.totalHits}</strong> case{data.totalHits === 1 ? "" : "s"} matched
        {data.processingTimeMs != null && <span> · {data.processingTimeMs} ms</span>}
      </p>
      <ul className="hits__list">
        {data.results.map((r) => (
          <li key={r.cnr}>
            <button type="button" className="hit" onClick={() => onOpen(r.cnr)}>
              <div className="hit__main">
                <div className="hit__badges">
                  <span className={`pill pill--${statusTone(r.status)}`}>
                    <span className="pill__dot" aria-hidden="true" />
                    {r.statusLabel}
                  </span>
                  {r.caseTypeLabel && <span className="pill pill--soft">{r.caseTypeLabel}</span>}
                </div>
                <h4 className="hit__title">{r.title}</h4>
                <p className="hit__court">{r.courtName}</p>
                {r.keywords.length > 0 && (
                  <p className="hit__keywords">
                    <Icon name="sparkle" width={13} height={13} />
                    {r.keywords.join(" · ")}
                  </p>
                )}
              </div>
              <div className="hit__side">
                <span className="hit__cnr">{r.cnr}</span>
                <span className="hit__date">
                  {r.status === "DISPOSED" ? "Decided" : "Next hearing"}:{" "}
                  <strong>{formatDate(r.decisionDate && r.status === "DISPOSED" ? r.decisionDate : r.nextHearingDate)}</strong>
                </span>
                <span className="hit__open">
                  View full status <Icon name="arrow" width={15} height={15} />
                </span>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------------------------------------------------------- *
 * Section
 * ---------------------------------------------------------------- */

export default function CaseTracker() {
  const [mode, setMode] = useState("cnr");
  const [term, setTerm] = useState("");
  const [view, setView] = useState({ status: "idle" });
  const panelRef = useRef(null);

  const active = MODES.find((m) => m.key === mode);

  const scrollToPanel = () => {
    requestAnimationFrame(() => {
      const el = panelRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 110;
      window.scrollTo({ top, behavior: "smooth" });
    });
  };

  const openCase = async (cnr) => {
    setView({ status: "loading" });
    scrollToPanel();
    try {
      const caseData = await fetchCaseByCnr(cnr);
      setView({ status: "case", caseData });
    } catch (err) {
      setView({ status: "error", error: err instanceof CaseApiError ? err : new CaseApiError("Something went wrong.") });
    }
  };

  const runSearch = async (value, by) => {
    setView({ status: "loading" });
    scrollToPanel();
    try {
      const results = await searchCases({ term: value, by });
      setView({ status: "results", results });
    } catch (err) {
      setView({ status: "error", error: err instanceof CaseApiError ? err : new CaseApiError("Something went wrong.") });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const value = term.trim();
    if (!value) return;

    if (mode === "cnr") {
      await openCase(normaliseCnr(value));
      return;
    }

    await runSearch(value, mode);
  };

  const reset = () => {
    setView({ status: "idle" });
    setTerm("");
  };

  // A sample is either a specific CNR or a ready-made search.
  const trySample = (sample) => {
    if (sample.cnr) {
      setMode("cnr");
      setTerm(sample.cnr);
      openCase(sample.cnr);
      return;
    }
    setMode(sample.mode);
    setTerm(sample.term);
    runSearch(sample.term, sample.mode);
  };

  return (
    <section id="case-status" className="section section--dark cst">
      <div className="cst__aura" aria-hidden="true" />
      <div className="container">
        <Reveal className="section__head">
          <span className="eyebrow eyebrow--light">
            <Icon name="sparkle" width={14} height={14} /> {caseTracker.eyebrow}
          </span>
          <h2 className="section__title section__title--light">{caseTracker.heading}</h2>
          <p className="section__subtitle section__subtitle--light">{caseTracker.subtext}</p>
        </Reveal>

        <Reveal className="console" delay={80}>
          <div className="console__modes" role="tablist" aria-label="Search by">
            {MODES.map((m) => (
              <button
                key={m.key}
                type="button"
                role="tab"
                aria-selected={mode === m.key}
                className={`console__mode ${mode === m.key ? "is-active" : ""}`}
                onClick={() => setMode(m.key)}
              >
                <Icon name={m.icon} width={16} height={16} />
                {m.label}
              </button>
            ))}
          </div>

          <form className="console__form" onSubmit={onSubmit}>
            <div className={`console__field ${view.status === "loading" ? "is-busy" : ""}`}>
              <Icon name="search" width={20} height={20} />
              <input
                type="text"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder={active.placeholder}
                aria-label={`Search by ${active.label}`}
                spellCheck="false"
                autoComplete="off"
              />
              {term && (
                <button type="button" className="console__clear" onClick={() => setTerm("")} aria-label="Clear">
                  <Icon name="close" width={16} height={16} />
                </button>
              )}
            </div>
            <button type="submit" className="btn btn--primary console__submit" disabled={view.status === "loading"}>
              {view.status === "loading" ? "Searching…" : "Track case"}
              <Icon name={view.status === "loading" ? "refresh" : "arrow"} width={18} height={18} />
            </button>
          </form>

          <div className="console__foot">
            <p className="console__hint">{active.hint}</p>
            <span className="console__mode-badge is-live">
              <span className="console__pulse" aria-hidden="true" />
              Live eCourts records
            </span>
          </div>

          <div className="console__samples">
            <span>Try a sample case:</span>
            {caseTracker.samples.map((s) => (
              <button key={s.label} type="button" className="console__sample" onClick={() => trySample(s)}>
                {s.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="cst__panel" ref={panelRef}>
          {view.status === "loading" && <Scanning />}

          {view.status === "error" && (
            <div className="cst__empty cst__empty--error">
              <Icon name="alert" width={30} height={30} />
              <h3>{view.error.code === "NOT_FOUND" ? "Case not found" : "Could not fetch the case"}</h3>
              <p>{view.error.message}</p>
              <button type="button" className="btn btn--ghost btn--sm" onClick={reset}>
                Try again
              </button>
            </div>
          )}

          {view.status === "results" && <SearchResults data={view.results} onOpen={openCase} />}

          {view.status === "case" && <CaseResult caseData={view.caseData} onReset={reset} />}

          {view.status === "idle" && (
            <ul className="cst__features">
              {caseTracker.features.map((f) => (
                <li key={f.title}>
                  <span className="cst__featureicon">
                    <Icon name={f.icon} width={20} height={20} />
                  </span>
                  <div>
                    <strong>{f.title}</strong>
                    <p>{f.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <p className="cst__note">{caseTracker.note}</p>
      </div>
    </section>
  );
}
