import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import PageHeader from "../components/PageHeader";
import Seo from "../components/Seo";
import ConsultCta from "../components/ConsultCta";
import { Icon } from "../components/Icons";
import { KanoonError, fetchFragment, fetchJudgment, sanitiseJudgment } from "../lib/kanoon";

const inr = (n) => new Intl.NumberFormat("en-IN").format(n);

function longDate(iso) {
  if (!iso) return "";
  const d = new Date(`${iso}T00:00:00`);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

/**
 * The judgment reader.
 *
 * ALWAYS noindex, deliberately. This is Indian Kanoon's copy of a public
 * record; putting millions of them on this domain would be duplicate content
 * at a scale that would drag down every page that this site can legitimately
 * win, and it would never outrank the source. It is here because it is useful
 * to read a judgment without leaving — and the source is credited and linked
 * on every view.
 *
 * The document also arrives as raw third-party HTML, so it goes through the
 * allowlist sanitiser in lib/kanoon.js before it is rendered, and its internal
 * citations are rewritten to point back into this site.
 */
export default function Judgment() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const id = params.get("id");
  const query = params.get("q") || "";

  const [view, setView] = useState({ status: "loading" });
  const [passages, setPassages] = useState(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (!id) {
      setView({ status: "error", error: new KanoonError("No judgment was specified.", "NO_ID") });
      return;
    }

    let live = true;
    setView({ status: "loading" });
    setPassages(null);

    fetchJudgment(id)
      .then((doc) => live && setView({ status: "done", doc }))
      .catch((err) =>
        live &&
        setView({
          status: "error",
          error: err instanceof KanoonError ? err : new KanoonError("That judgment could not be loaded."),
        })
      );

    return () => {
      live = false;
    };
  }, [id]);

  // The matching passages are a second, much cheaper request. They are what
  // someone who arrived from a search actually wants first — the two hundred
  // kilobytes of judgment can load underneath them.
  useEffect(() => {
    if (!id || !query) return;
    let live = true;
    fetchFragment(id, query)
      .then((f) => live && setPassages(f.passages))
      .catch(() => {});
    return () => {
      live = false;
    };
  }, [id, query]);

  const doc = view.status === "done" ? view.doc : null;
  const html = useMemo(() => (doc ? sanitiseJudgment(doc.html) : ""), [doc]);

  // Citations inside the judgment were rewritten to this site's own paths.
  // Intercepting the click keeps them as SPA navigation instead of a full
  // reload for every case a judgment happens to cite.
  const onBodyClick = (e) => {
    const a = e.target.closest?.("a[data-internal]");
    if (!a) return;
    e.preventDefault();
    navigate(a.getAttribute("href"));
  };

  const backToSearch = query ? `/case-law?q=${encodeURIComponent(query)}` : "/case-law";

  return (
    <>
      <Seo
        title={doc ? `${doc.parties} — ${doc.court} | Advocate Ram Snehi Mishra` : "Judgment | Advocate Ram Snehi Mishra"}
        description={
          doc
            ? `Full text of ${doc.title}, ${doc.court}. Read free on the case-law research library of Advocate Ram Snehi Mishra, Hajipur.`
            : "Read the full text of an Indian judgment."
        }
        noindex
      />

      <PageHeader
        eyebrow={doc ? doc.court : "Judgment"}
        title={doc ? doc.parties : view.status === "loading" ? "Loading the judgment…" : "Judgment"}
        meta={
          doc
            ? [doc.decidedOn && `Decided ${doc.decidedOn}`, doc.kind].filter(Boolean).join(" · ")
            : undefined
        }
        crumbs={[
          { label: "Case Law", to: "/case-law" },
          ...(query ? [{ label: "Search results", to: backToSearch }] : []),
          { label: doc ? doc.parties.slice(0, 46) : "Judgment" },
        ]}
      >
        {doc && (
          <div className="pagehead__actions">
            <Link to={backToSearch} className="btn btn--ghost btn--sm">
              <Icon name="arrow" width={15} height={15} className="clpager__back" /> Back to search
            </Link>
            <a
              href={doc.source}
              target="_blank"
              rel="noreferrer noopener"
              className="btn btn--ghost btn--sm"
            >
              <Icon name="doc" width={15} height={15} /> View on Indian Kanoon
            </a>
          </div>
        )}
      </PageHeader>

      <section className="section section--tight">
        <div className="container container--narrow">
          {view.status === "loading" && (
            <div className="clskel" role="status" aria-live="polite">
              {Array.from({ length: 6 }).map((_, i) => (
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
              <h2>Could not open this judgment</h2>
              <p>{view.error.message}</p>
              <Link to="/case-law" className="btn btn--primary btn--sm">
                Back to case law search <Icon name="arrow" width={15} height={15} />
              </Link>
            </div>
          )}

          {doc && (
            <>
              <div className="jstats">
                <div>
                  <b>{inr(doc.citedBy)}</b>
                  <span>Later judgments citing this</span>
                </div>
                <div>
                  <b>{inr(doc.cites)}</b>
                  <span>Authorities cited within</span>
                </div>
                <div>
                  <b>{longDate(doc.date) || "—"}</b>
                  <span>Date of decision</span>
                </div>
              </div>

              {passages && passages.length > 0 && (
                <div className="jmatch">
                  <h2>
                    <Icon name="search" width={18} height={18} /> Where “{query}” appears
                  </h2>
                  <ol>
                    {passages.slice(0, 5).map((runs, i) => (
                      <li key={i}>
                        {runs.map((r, j) =>
                          r.hit ? <mark key={j}>{r.text}</mark> : <span key={j}>{r.text}</span>
                        )}
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {doc.tags.length > 0 && (
                <div className="jtags">
                  <span className="jtags__label">Subjects</span>
                  {doc.tags.slice(0, 8).map((t) => (
                    <Link key={t.label} to={`/case-law?q=${encodeURIComponent(t.query)}`} className="jtag">
                      {t.label.replace(/-/g, " ")}
                    </Link>
                  ))}
                </div>
              )}

              {/* eslint-disable-next-line react/no-danger -- sanitised through
                  an allowlist in lib/kanoon.js; see sanitiseJudgment. */}
              <article
                className="judgment"
                ref={bodyRef}
                onClick={onBodyClick}
                dangerouslySetInnerHTML={{ __html: html }}
              />

              {doc.related.length > 0 && (
                <div className="jrelated">
                  <h2>People also search for</h2>
                  <div className="jrelated__list">
                    {doc.related.slice(0, 8).map((r) => (
                      <Link key={r} to={`/case-law?q=${encodeURIComponent(r)}`}>
                        {r} <Icon name="arrow" width={13} height={13} />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <p className="jsource">
                Full text supplied by{" "}
                <a href={doc.source} target="_blank" rel="noreferrer noopener">
                  Indian Kanoon
                </a>
                , which reproduces the courts' own published record. Judgments are public
                documents; this page reproduces one for reading and research. For filing, a
                certified copy or a recognised report citation is required.
              </p>
            </>
          )}
        </div>
      </section>

      <ConsultCta
        heading="Does this judgment help your case?"
        text="Whether an authority applies turns on facts, on whether it still stands, and on the court you are in. Bring it to the chamber with your papers and find out in half an hour."
      />
    </>
  );
}
