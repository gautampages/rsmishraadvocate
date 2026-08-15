import { useMemo, useState } from "react";
import { Icon } from "./Icons";
import RichText from "./RichText";
import { contact } from "../data/content";
import { buildInsights, formatDate, humanDuration, relativeDay, statusTone } from "../lib/caseInsights";

/* ---------------------------------------------------------------- *
 * Small building blocks
 * ---------------------------------------------------------------- */

function CopyChip({ value }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button type="button" className="csr__cnr" onClick={copy} title="Copy CNR number">
      <span className="csr__cnrlabel">CNR</span>
      <span className="csr__cnrval">{value}</span>
      <Icon name={copied ? "check" : "copy"} width={15} height={15} />
      <span className="csr__cnrtoast" data-show={copied}>Copied</span>
    </button>
  );
}

function StageMeter({ stages }) {
  const done = stages.filter((s) => s.state === "done").length;
  const pct = Math.min(100, Math.round(((done + 0.5) / stages.length) * 100));

  return (
    <div className="stagemeter">
      <div className="stagemeter__track">
        <span className="stagemeter__fill" style={{ width: `${pct}%` }} />
      </div>
      <ol className="stagemeter__list">
        {stages.map((s) => (
          <li key={s.key} className={`stagemeter__step is-${s.state}`}>
            <span className="stagemeter__dot">
              {s.state === "done" ? <Icon name="check" width={12} height={12} strokeWidth={2.6} /> : null}
            </span>
            <span className="stagemeter__label">{s.label}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function DetailRow({ label, children }) {
  if (!children || (Array.isArray(children) && !children.length)) return null;
  return (
    <div className="csr__row">
      <dt>{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

function PartyBlock({ side, names, advocates }) {
  return (
    <div className="csr__party">
      <span className="csr__partyrole">{side}</span>
      <ul className="csr__partynames">
        {(names.length ? names : ["Not recorded"]).map((n, i) => (
          <li key={`${n}-${i}`}>{n}</li>
        ))}
      </ul>
      {advocates.length > 0 && (
        <p className="csr__partyadv">
          <Icon name="scales" width={14} height={14} /> {advocates.join(", ")}
        </p>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- *
 * Tab panels
 * ---------------------------------------------------------------- */

function Overview({ c }) {
  return (
    <div className="csr__overview">
      <div className="csr__parties">
        <PartyBlock side="Petitioner / Complainant" names={c.petitioners} advocates={c.petitionerAdvocates} />
        <span className="csr__vs">vs</span>
        <PartyBlock side="Respondent / Accused" names={c.respondents} advocates={c.respondentAdvocates} />
      </div>

      <dl className="csr__rows">
        <DetailRow label="Court">{c.courtName}</DetailRow>
        <DetailRow label="Judge">{c.judges.join(", ")}</DetailRow>
        <DetailRow label="Case type">{c.caseTypeLabel}</DetailRow>
        <DetailRow label="Case number">{c.caseNumber}</DetailRow>
        <DetailRow label="Filing number">{c.filingNumber}</DetailRow>
        <DetailRow label="Filed on">{formatDate(c.filingDate, { long: true })}</DetailRow>
        <DetailRow label="Registered on">{formatDate(c.registrationDate, { long: true })}</DetailRow>
        <DetailRow label="First hearing">{formatDate(c.firstHearingDate, { long: true })}</DetailRow>
        <DetailRow label="Last hearing">{formatDate(c.lastHearingDate, { long: true })}</DetailRow>
        <DetailRow label="Acts &amp; sections">{c.actsAndSections}</DetailRow>
        <DetailRow label="Category">{c.category}</DetailRow>
        <DetailRow label="Nature of disposal">{c.disposalType}</DetailRow>
        {c.fir && (
          <DetailRow label="FIR">
            {[c.fir.firNumber, c.fir.firYear, c.fir.policeStation].filter(Boolean).join(" / ")}
          </DetailRow>
        )}
      </dl>
    </div>
  );
}

function Hearings({ c }) {
  const [expanded, setExpanded] = useState(false);
  const ordered = useMemo(() => [...c.hearings].reverse(), [c.hearings]);
  const visible = expanded ? ordered : ordered.slice(0, 6);

  if (!ordered.length) return <p className="csr__empty">No hearing history has been published for this case yet.</p>;

  return (
    <>
      <ol className="timeline">
        {visible.map((h, i) => {
          const note = c.business[h.date];
          const isLatest = i === 0 && !expanded;
          return (
            <li key={`${h.date}-${i}`} className={`timeline__item ${isLatest ? "timeline__item--latest" : ""}`}>
              <span className="timeline__marker" />
              <div className="timeline__body">
                <div className="timeline__top">
                  <time className="timeline__date">{formatDate(h.date)}</time>
                  {h.purpose && <span className="timeline__purpose">{h.purpose}</span>}
                </div>
                {h.judge && <p className="timeline__judge">{h.judge}</p>}
                {note && <p className="timeline__note">{note}</p>}
                {h.nextDate && (
                  <p className="timeline__next">
                    Next date fixed: <strong>{formatDate(h.nextDate)}</strong>
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
      {ordered.length > 6 && (
        <button type="button" className="csr__more" onClick={() => setExpanded((v) => !v)}>
          {expanded ? "Show fewer hearings" : `Show all ${ordered.length} hearings`}
          <Icon name="chevron" width={16} height={16} style={{ transform: expanded ? "rotate(180deg)" : "none" }} />
        </button>
      )}
    </>
  );
}

function OrderItem({ order, cnr }) {
  const [open, setOpen] = useState(false);
  const hasDetail = Boolean(order.text || order.ai);

  // Requesting a copy is an email now: it needs the order date and the CNR,
  // which are easier to get right in writing than read out over the phone.
  const requestHref = `mailto:${contact.email}?subject=${encodeURIComponent(
    `Certified copy request — CNR ${cnr}`
  )}&body=${encodeURIComponent(
    `Namaste, I would like a certified copy of the order dated ${formatDate(order.date)} in case CNR ${cnr}.`
  )}`;

  return (
    <li className={`orders__item ${open ? "orders__item--open" : ""}`}>
      <div className="orders__row">
        <span className={`orders__kind orders__kind--${order.kind}`}>
          <Icon name="doc" width={18} height={18} />
        </span>
        <div className="orders__body">
          <p className="orders__title">{order.title}</p>
          <p className="orders__date">
            {formatDate(order.date, { long: true })}
            <span className="orders__tag">{order.kind === "judgment" ? "Judgment" : "Interim order"}</span>
            {order.ai && (
              <span className="orders__tag orders__tag--ai">
                <Icon name="sparkle" width={11} height={11} /> Explained
              </span>
            )}
          </p>
        </div>
        {hasDetail ? (
          <button type="button" className="orders__btn orders__btn--ghost" onClick={() => setOpen((v) => !v)}>
            {open ? "Hide" : "Read order"}
            <Icon name="chevron" width={15} height={15} style={{ transform: open ? "rotate(180deg)" : "none" }} />
          </button>
        ) : (
          <a className="orders__btn orders__btn--ghost" href={requestHref}>
            Request copy
          </a>
        )}
      </div>

      {open && (
        <div className="orders__detail">
          {order.ai && (
            <div className="orders__ai">
              <p className="orders__aihead">
                <Icon name="sparkle" width={14} height={14} /> What this order means
              </p>
              <p className="orders__aitext">{order.ai.plain}</p>
              {order.ai.alerts.length > 0 && (
                <ul className="orders__alerts">
                  {order.ai.alerts.map((a, i) => (
                    <li key={i}>
                      <Icon name="calendar" width={14} height={14} />
                      <span>
                        <strong>{a.action}</strong>
                        {a.deadline ? ` — by ${formatDate(a.deadline)}` : ""}
                        {a.who ? ` (${a.who})` : ""}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              {order.ai.statutes.length > 0 && (
                <p className="orders__statutes">Provisions referred to: {order.ai.statutes.join("; ")}</p>
              )}
            </div>
          )}

          {order.text && (
            <div className="orders__text">
              <p className="orders__texthead">Order as recorded by the court</p>
              <RichText text={order.text} />
            </div>
          )}

          <a className="orders__copylink" href={requestHref}>
            Request a certified copy <Icon name="arrow" width={14} height={14} />
          </a>
        </div>
      )}
    </li>
  );
}

function Orders({ c }) {
  if (!c.orders.length) return <p className="csr__empty">No orders or judgments have been uploaded for this case.</p>;

  return (
    <ul className="orders">
      {c.orders.map((o, i) => (
        <OrderItem key={`${o.date}-${o.file || i}`} order={o} cnr={c.cnr} />
      ))}
    </ul>
  );
}

function Applications({ c }) {
  if (!c.ias.length) return <p className="csr__empty">No interlocutory applications are recorded in this case.</p>;
  return (
    <ul className="ias">
      {c.ias.map((ia) => (
        <li key={ia.number} className="ias__item">
          <div>
            <p className="ias__num">{ia.number}</p>
            <p className="ias__purpose">{ia.purpose}</p>
          </div>
          <div className="ias__meta">
            <span className={`pill pill--${statusTone(ia.status.toUpperCase())}`}>{ia.status || "—"}</span>
            <span className="ias__date">Filed {formatDate(ia.filingDate)}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

/* ---------------------------------------------------------------- *
 * Result shell
 * ---------------------------------------------------------------- */

const TABS = [
  { key: "overview", label: "Overview" },
  { key: "hearings", label: "Hearings" },
  { key: "orders", label: "Orders" },
  { key: "ias", label: "Applications" },
];

export default function CaseResult({ caseData: c, onReset }) {
  const [tab, setTab] = useState("overview");
  const ai = useMemo(() => buildInsights(c), [c]);

  const nextLabel = ai.disposed ? "Decided on" : "Next hearing";
  const nextValue = ai.disposed ? c.decisionDate || c.lastHearingDate : c.nextHearingDate;

  const counts = { hearings: c.counts.hearings, orders: c.orders.length, ias: c.ias.length };

  return (
    <article className="csr">
      <header className="csr__head">
        <div className="csr__headmain">
          <div className="csr__badges">
            <span className={`pill pill--${statusTone(c.status)}`}>
              <span className="pill__dot" aria-hidden="true" />
              {c.statusLabel}
            </span>
            {c.caseTypeLabel && <span className="pill pill--soft">{c.caseTypeLabel}</span>}
            {c.judicialSection && <span className="pill pill--soft">{c.judicialSection}</span>}
          </div>
          <h3 className="csr__title">{c.title}</h3>
          <p className="csr__court">
            <Icon name="building" width={16} height={16} /> {c.courtName}
          </p>
          <div className="csr__idrow">
            <CopyChip value={c.cnr} />
            {c.caseNumber && <span className="csr__idchip">Case no. {c.caseNumber}</span>}
            {c.filingNumber && <span className="csr__idchip">Filing no. {c.filingNumber}</span>}
          </div>
        </div>

        <div className={`csr__next ${ai.disposed ? "csr__next--closed" : ""}`}>
          <span className="csr__nextlabel">{nextLabel}</span>
          <strong className="csr__nextdate">{formatDate(nextValue)}</strong>
          <span className="csr__nextrel">{relativeDay(nextValue)}</span>
          {!ai.disposed && c.purpose && <span className="csr__nextpurpose">For: {c.purpose}</span>}
        </div>
      </header>

      {ai.alert && (
        <div className={`csr__alert csr__alert--${ai.alert.tone}`}>
          <Icon name={ai.alert.tone === "done" ? "check" : "alert"} width={18} height={18} />
          <p>{ai.alert.text}</p>
        </div>
      )}

      <section className="aicard">
        <div className="aicard__glow" aria-hidden="true" />
        <header className="aicard__head">
          <span className="aicard__icon">
            <Icon name="sparkle" width={18} height={18} />
          </span>
          <h4>AI Case Summary</h4>
          <span className="aicard__src">Generated from the court record</span>
        </header>
        {ai.story && (
          <p className="aicard__story">
            <strong>What this case is about — </strong>
            {ai.story}
          </p>
        )}
        <p className="aicard__text">{ai.summary}</p>

        {ai.latestOrderInsight && (
          <div className="aicard__order">
            <p className="aicard__orderhead">
              Latest order explained · {formatDate(ai.latestOrderInsight.date)}
            </p>
            <p className="aicard__ordertext">{ai.latestOrderInsight.plain}</p>
          </div>
        )}

        {ai.points.length > 0 && (
          <ul className="aicard__points">
            {ai.points.map((p, i) => (
              <li key={i}>
                <Icon name="check" width={14} height={14} strokeWidth={2.4} />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="csr__stats">
        {ai.stats.map((s) => (
          <div key={s.label} className="csr__stat">
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>

      <div className="csr__stageblock">
        <span className="csr__blocklabel">Case progress</span>
        <StageMeter stages={ai.stages} />
        {ai.avgGap && (
          <p className="csr__stagenote">
            Average gap between hearings: <strong>{humanDuration(ai.avgGap)}</strong>
            {ai.adjournments > 0 && ` · ${ai.adjournments} adjournment${ai.adjournments > 1 ? "s" : ""} recorded`}
          </p>
        )}
      </div>

      <nav className="csr__tabs" role="tablist">
        {TABS.map((t) => {
          const count = counts[t.key];
          return (
            <button
              key={t.key}
              role="tab"
              aria-selected={tab === t.key}
              className={`csr__tab ${tab === t.key ? "is-active" : ""}`}
              onClick={() => setTab(t.key)}
            >
              {t.label}
              {count > 0 && <span className="csr__tabcount">{count}</span>}
            </button>
          );
        })}
      </nav>

      <div className="csr__panel">
        {tab === "overview" && <Overview c={c} />}
        {tab === "hearings" && <Hearings c={c} />}
        {tab === "orders" && <Orders c={c} />}
        {tab === "ias" && <Applications c={c} />}
      </div>

      <footer className="csr__foot">
        <p className="csr__disclaimer">
          Information is sourced from public eCourts records and may lag behind the court board — always confirm the
          next date with the court or the chamber. For advice on your matter, please speak to the chamber.
        </p>
        <div className="csr__footactions">
          <button type="button" className="btn btn--ghost btn--sm" onClick={onReset}>
            <Icon name="search" width={16} height={16} /> New search
          </button>
          <a className="btn btn--primary btn--sm" href="#contact">
            Discuss this case <Icon name="arrow" width={16} height={16} />
          </a>
        </div>
      </footer>
    </article>
  );
}
