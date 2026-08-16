import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { Icon } from "./Icons";
import KanoonAttribution from "./KanoonAttribution";
import {
  COURTS,
  EMPTY_FILTERS,
  KanoonError,
  PAGE_SIZE,
  buildQuery,
  courtLabel,
  hasCriteria,
  searchCaseLaw,
} from "../lib/kanoon";

const inr = (n) => new Intl.NumberFormat("en-IN").format(n);

/** "2020-11-04" → "4 November 2020" */
function longDate(iso) {
  if (!iso) return "";
  const d = new Date(`${iso}T00:00:00`);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

/* ---------------------------------------------------------------- *
 * One result
 * ---------------------------------------------------------------- */

function Result({ doc, query }) {
  const href = `/case-law/judgment?id=${doc.tid}${query ? `&q=${encodeURIComponent(query)}` : ""}`;

  return (
    <li className="cldoc">
      <div className="cldoc__meta">
        <span className="pill pill--soft">{doc.court || "Unreported"}</span>
        {doc.date && <span className="cldoc__date">{longDate(doc.date)}</span>}
        {doc.citation && <span className="cldoc__cite">{doc.citation}</span>}
      </div>

      <h3 className="cldoc__title">
        <Link to={href}>{doc.parties}</Link>
      </h3>

      {doc.headline.length > 0 && (
        <p className="cldoc__snippet">
          {doc.headline.map((run, i) =>
            run.hit ? <mark key={i}>{run.text}</mark> : <span key={i}>{run.text}</span>
          )}
        </p>
      )}

      <div className="cldoc__foot">
        {doc.author && (
          <span>
            <Icon name="gavel" width={14} height={14} /> {doc.author}
          </span>
        )}
        {/* How often a judgment is relied on later is the fastest available
            proxy for how much weight it carries. */}
        {doc.citedBy > 0 && (
          <span title="Number of later judgments that cite this one">
            <Icon name="scales" width={14} height={14} /> Cited by {inr(doc.citedBy)}
          </span>
        )}
        {doc.cites > 0 && (
          <span title="Number of authorities cited inside this judgment">
            <Icon name="book" width={14} height={14} /> Cites {inr(doc.cites)}
          </span>
        )}
        <Link to={href} className="cldoc__open">
          Read judgment <Icon name="arrow" width={14} height={14} />
        </Link>
      </div>
    </li>
  );
}

/* ---------------------------------------------------------------- *
 * The search
 * ---------------------------------------------------------------- */

/**
 * Advanced case-law search over the Indian Kanoon corpus.
 *
 * `query` and `page` are owned by the parent, which keeps them in the URL — so
 * a search can be linked to, bookmarked, and walked back through with the
 * browser's own back button. This component owns only the form.
 */
export default function CaseLawSearch({
  filters,
  onFiltersChange,
  query,
  page,
  onSearch,
  onPage,
  openAdvanced = false,
}) {
  // A search composed from the advanced fields must not run with those fields
  // hidden: a visitor arriving on ?q="anticipatory bail" would see an empty
  // search box above ten results and conclude the page was broken.
  const usesAdvanced = Boolean(
    filters.phrase || filters.title || filters.author || filters.fromDate || filters.toDate
  );
  const [advanced, setAdvanced] = useState(openAdvanced || usesAdvanced);

  useEffect(() => {
    if (usesAdvanced) setAdvanced(true);
  }, [usesAdvanced]);
  const [view, setView] = useState({ status: "idle" });
  const resultsRef = useRef(null);
  // Guards against a stale response from a slow earlier search overwriting a
  // faster later one.
  const runId = useRef(0);

  const set = (patch) => onFiltersChange({ ...filters, ...patch });

  const run = useCallback(async (q, p) => {
    const id = ++runId.current;
    setView({ status: "loading" });
    try {
      const data = await searchCaseLaw({ query: q, page: p });
      if (id === runId.current) setView({ status: "done", data });
    } catch (err) {
      if (id === runId.current) {
        setView({
          status: "error",
          error: err instanceof KanoonError ? err : new KanoonError("Something went wrong."),
        });
      }
    }
  }, []);

  useEffect(() => {
    if (!query) {
      setView({ status: "idle" });
      return;
    }
    run(query, page);
  }, [query, page, run]);

  const submit = (e) => {
    e.preventDefault();
    if (!hasCriteria(filters)) return;
    onSearch(buildQuery(filters));
  };

  const clear = () => {
    onFiltersChange({ ...EMPTY_FILTERS });
    onSearch("");
  };

  const goto = (p) => {
    onPage(p);
    requestAnimationFrame(() => {
      const el = resultsRef.current;
      if (!el) return;
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 100, behavior: "smooth" });
    });
  };

  const data = view.status === "done" ? view.data : null;
  const busy = view.status === "loading";

  return (
    <div className="cl">
      <form className="clform" onSubmit={submit}>
        <div className="clform__main">
          <div className="clform__field">
            <Icon name="search" width={20} height={20} />
            <input
              type="text"
              value={filters.terms}
              onChange={(e) => set({ terms: e.target.value })}
              placeholder="Words anywhere in the judgment — e.g. anticipatory bail economic offence"
              aria-label="Search terms"
              autoComplete="off"
            />
            {filters.terms && (
              <button type="button" className="clform__clear" onClick={() => set({ terms: "" })} aria-label="Clear">
                <Icon name="close" width={16} height={16} />
              </button>
            )}
          </div>
          <button type="submit" className="btn btn--primary clform__submit" disabled={busy}>
            {busy ? "Searching…" : "Search case law"}
            <Icon name={busy ? "refresh" : "arrow"} width={18} height={18} />
          </button>
        </div>

        <div className="clform__row">
          <label className="clform__inline">
            <span>Court</span>
            <select value={filters.court} onChange={(e) => set({ court: e.target.value })}>
              {COURTS.map((c) => (
                <option key={c.token || "all"} value={c.token}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>

          <button
            type="button"
            className={`clform__toggle ${advanced ? "is-open" : ""}`}
            onClick={() => setAdvanced((v) => !v)}
            aria-expanded={advanced}
          >
            <Icon name="sliders" width={16} height={16} />
            {advanced ? "Fewer options" : "More options"}
          </button>

          {query && (
            <button type="button" className="clform__reset" onClick={clear}>
              Clear search
            </button>
          )}
        </div>

        {advanced && (
          <div className="clform__adv">
            <div className="field">
              <label htmlFor="cl-phrase">Exact phrase</label>
              <input
                id="cl-phrase"
                type="text"
                value={filters.phrase}
                onChange={(e) => set({ phrase: e.target.value })}
                placeholder="irretrievable breakdown of marriage"
              />
              <span className="field__hint">These words, together and in this order.</span>
            </div>

            <div className="field">
              <label htmlFor="cl-title">Words in the case title</label>
              <input
                id="cl-title"
                type="text"
                value={filters.title}
                onChange={(e) => set({ title: e.target.value })}
                placeholder="Rajnesh Neha"
              />
              <span className="field__hint">Best way to find a case when you remember the parties.</span>
            </div>

            <div className="field">
              <label htmlFor="cl-author">Judge who wrote it</label>
              <input
                id="cl-author"
                type="text"
                value={filters.author}
                onChange={(e) => set({ author: e.target.value })}
                placeholder="Chandrachud"
              />
              <span className="field__hint">Surname is usually enough.</span>
            </div>

            <div className="field field--split">
              <div>
                <label htmlFor="cl-from">Decided after</label>
                <input
                  id="cl-from"
                  type="date"
                  value={filters.fromDate}
                  onChange={(e) => set({ fromDate: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="cl-to">Decided before</label>
                <input
                  id="cl-to"
                  type="date"
                  value={filters.toDate}
                  onChange={(e) => set({ toDate: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}

        {/* Showing the composed query is not debug output. It is how someone
            learns the syntax, and it is the thing to copy when they want to
            run the same search on the source database. */}
        {query && (
          <p className="clform__echo">
            <span>Searching</span> <code>{query}</code>
          </p>
        )}
      </form>

      <div className="cl__results" ref={resultsRef}>
        {/* Required by Indian Kanoon's API terms: their logo goes on top of
            the results, not beneath them. Rendered as soon as a search is in
            flight, so it is never absent while their data is on screen. */}
        {(busy || data) && (
          <div className="cl__attrib">
            <KanoonAttribution />
            <p>
              Judgments, orders and Acts are supplied by Indian Kanoon, which reproduces the
              courts' own published record. They are not the work of this chamber, and nothing
              here is an endorsement by Indian Kanoon.
            </p>
          </div>
        )}

        {busy && (
          <div className="clskel" role="status" aria-live="polite">
            <span className="visually-hidden">Searching case law…</span>
            {Array.from({ length: 4 }).map((_, i) => (
              <div className="clskel__row" key={i} aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
            ))}
          </div>
        )}

        {view.status === "error" && (
          <div className="cst__empty cst__empty--error">
            <Icon name="alert" width={30} height={30} />
            <h3>Could not run that search</h3>
            <p>{view.error.message}</p>
          </div>
        )}

        {data && data.results.length === 0 && (
          <div className="cst__empty">
            <Icon name="search" width={30} height={30} />
            <h3>Nothing matched</h3>
            <p>
              Try fewer words, drop the exact phrase, or widen the court to
              <em> Everywhere</em>. Legal databases match words, not meaning — the term used in the
              judgment may not be the term you would use.
            </p>
          </div>
        )}

        {data && data.results.length > 0 && (
          <>
            <p className="cl__count">
              <strong>{inr(data.total)}</strong> {data.total === 1 ? "document" : "documents"} ·
              showing {inr(data.from)}–{inr(data.to)}
              {filters.court && <span> in {courtLabel(filters.court)}</span>}
            </p>

            <ol className="cl__list">
              {data.results.map((doc) => (
                <Result key={doc.tid} doc={doc} query={data.query} />
              ))}
            </ol>

            <nav className="clpager" aria-label="Search results pages">
              <button
                type="button"
                className="btn btn--ghost btn--sm"
                onClick={() => goto(page - 1)}
                disabled={page === 0 || busy}
              >
                <Icon name="arrow" width={15} height={15} className="clpager__back" /> Previous
              </button>
              <span>
                Page {page + 1} of about {inr(Math.max(1, Math.ceil(data.total / PAGE_SIZE)))}
              </span>
              <button
                type="button"
                className="btn btn--ghost btn--sm"
                onClick={() => goto(page + 1)}
                disabled={!data.hasMore || busy}
              >
                Next <Icon name="arrow" width={15} height={15} />
              </button>
            </nav>
          </>
        )}
      </div>
    </div>
  );
}
