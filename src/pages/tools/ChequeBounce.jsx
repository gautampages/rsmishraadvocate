import { useEffect, useState } from "react";
import { Link } from "react-router";
import ToolShell from "../../components/ToolShell";
import { Icon } from "../../components/Icons";
import {
  DEBT_PURPOSES,
  DISHONOUR_REASONS,
  S138,
  chequeDeadlines,
  chequeFigures,
  noticeText,
} from "../../lib/chequeBounce";
import { formatISODate, istToday } from "../../lib/istTime";
import { rupees } from "../../lib/money";
import { faqsForTool } from "../../data/toolFaqs";

const Field = ({ id, label, children, hint }) => (
  <div className="field">
    <label htmlFor={id}>{label}</label>
    {children}
    {hint && <span className="field__hint">{hint}</span>}
  </div>
);

const Days = ({ n }) =>
  n < 0 ? (
    <span className="calc__flag calc__flag--danger" style={{ margin: 0, padding: "4px 8px", display: "inline-flex" }}>expired {Math.abs(n)} days ago</span>
  ) : (
    <span>{n} days left</span>
  );

export default function ChequeBounce() {
  const [mode, setMode] = useState("payee");
  const [amount, setAmount] = useState("");
  const [dishonour, setDishonour] = useState("");
  const [sent, setSent] = useState("");
  const [served, setServed] = useState("");
  const [years, setYears] = useState("2");
  const [rate, setRate] = useState("9");

  // Notice generator
  const [lang, setLang] = useState("en");
  const [viaAdvocate, setViaAdvocate] = useState(true);
  const [n, setN] = useState({
    senderName: "",
    senderAddress: "",
    drawerName: "",
    drawerAddress: "",
    chequeNo: "",
    chequeDate: "",
    bank: "",
    reason: "funds",
    purpose: "loan",
    advocateName: "",
    court: "Hajipur (Vaishali)",
  });
  const [copied, setCopied] = useState(false);
  // Today's date is filled in after mount so the prerendered HTML and the
  // hydrated page do not disagree about it.
  const [noticeDate, setNoticeDate] = useState("");
  useEffect(() => setNoticeDate(istToday()), []);
  const set = (k) => (e) => setN((s) => ({ ...s, [k]: e.target.value }));

  const deadlines = chequeDeadlines({ dishonourISO: dishonour, noticeSentISO: sent, noticeServedISO: served });
  const figures = chequeFigures({ amount, years, rate });
  const text = noticeText({ ...n, lang, viaAdvocate, amount, dishonourDate: dishonour, noticeDate });

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — the textarea is selectable */
    }
  };
  const download = () => {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `section-138-notice-${lang}.txt`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const payee = mode === "payee";

  return (
    <ToolShell
      path="/tools/cheque-bounce-calculator"
      faqs={faqsForTool("/tools/cheque-bounce-calculator")}
      authority={
        <>
          <p>
            <strong>Section 138 of the Negotiable Instruments Act, 1881</strong> fixes the clocks: the demand notice
            within <strong>30 days</strong> of the return memo, <strong>15 days</strong> for the drawer to pay from
            receipt of the notice, and the complaint within <strong>one month</strong> of the cause of action, which
            arises the day after those 15 days end (s.142(b); <em>Econ Antri v. Rom Industries</em>, 2013). It fixes
            the money too: fine up to <strong>twice the cheque amount</strong> and imprisonment up to two years
            (s.138); interim compensation up to <strong>20%</strong> (s.143A, discretionary since{" "}
            <em>Rakesh Ranjan Shrivastava</em>, 2024); a minimum <strong>20% deposit</strong> when the drawer appeals a
            conviction (s.148).
          </p>
          <p>
            What courts actually order on conviction is usually compensation of the cheque amount with interest under
            s.357(3) CrPC / BNSS 395 — the "likely compensation" line uses the rate and duration you set. Service of a
            notice sent by registered post is presumed in the ordinary course (s.27 General Clauses Act;{" "}
            <em>C.C. Alavi Haji</em>, 2007); the tool assumes three days where you have no acknowledgment.
          </p>
        </>
      }
      notes={[
        "The cheque must have been presented within three months of its date, to the drawee bank, and for a legally enforceable debt. A cheque given as a gift, a security cheque with no debt due, or a time-barred debt does not sustain a prosecution — those are the drawer's defences.",
        "Where the notice is returned \"refused\" or \"not claimed\", service is presumed and the 15 days run from the date of the postal remark. Keep the postal receipt, the tracking printout and the returned envelope unopened.",
        "Jurisdiction (s.142(2)): the complaint is filed where the payee's bank branch is — the branch where the cheque was deposited — not where the drawer lives.",
        "The offence is compoundable at any stage (s.147); the cost of settling late follows the Damodar S. Prabhu ladder shown in the result. A Lok Adalat settlement is a decree and ends the criminal case.",
        "A civil suit for recovery, or a summary suit under Order XXXVII CPC, runs in parallel and is not barred by the criminal complaint.",
      ]}
    >
      <div className="calc">
        <div className="calc__inputs">
          <fieldset className="field">
            <legend>Which side are you on?</legend>
            <div className="chips">
              <button type="button" aria-pressed={payee} className={`chip ${payee ? "is-active" : ""}`} onClick={() => setMode("payee")}>
                I received a bounced cheque
                <em>what to do, by when, and what to expect</em>
              </button>
              <button type="button" aria-pressed={!payee} className={`chip ${!payee ? "is-active" : ""}`} onClick={() => setMode("drawer")}>
                My cheque bounced
                <em>what I am exposed to</em>
              </button>
            </div>
          </fieldset>

          <Field id="amount" label="Cheque amount (₹)">
            <input id="amount" type="number" min="0" inputMode="numeric" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g. 250000" />
          </Field>
          <Field id="dishonour" label="Date of the bank's return memo (dishonour)" hint="The date the bank returned the cheque unpaid — the 30-day notice clock runs from the day the payee receives this memo.">
            <input id="dishonour" type="date" value={dishonour} onChange={(e) => setDishonour(e.target.value)} />
          </Field>
          <Field id="sent" label="Date the demand notice was sent (if sent)">
            <input id="sent" type="date" value={sent} onChange={(e) => setSent(e.target.value)} />
          </Field>
          <Field id="served" label="Date the drawer received it (if known)" hint="From the A/D card or tracking. Leave blank to presume service three days after posting.">
            <input id="served" type="date" value={served} onChange={(e) => setServed(e.target.value)} />
          </Field>
          <div className="calc__options">
            <Field id="years" label="Expected length of the case (years)">
              <input id="years" type="number" min="0" max="10" step="0.5" value={years} onChange={(e) => setYears(e.target.value)} />
            </Field>
            <Field id="rate" label="Interest rate for compensation (% p.a.)" hint="Courts commonly award 6–12% simple; 9% is typical.">
              <input id="rate" type="number" min="0" max="24" step="0.5" value={rate} onChange={(e) => setRate(e.target.value)} />
            </Field>
          </div>
        </div>

        <div className={`calc__result ${figures || deadlines ? "" : "is-empty"}`}>
          {figures || deadlines ? (
            <>
              {figures && (
                <>
                  <span className="calc__label">{payee ? "Likely compensation on conviction" : "Likely order against you on conviction"}</span>
                  <strong className="calc__big">{rupees(figures.likelyCompensation)}</strong>
                  <span className="calc__sub">
                    Cheque amount + {figures.rate}% simple interest over {figures.years} year{figures.years === 1 ? "" : "s"} · maximum fine {rupees(figures.maxFine)}
                  </span>
                </>
              )}

              {deadlines && (
                <dl className="calc__breakdown">
                  <div className="calc__asidehead">
                    <dt>The three clocks</dt>
                    <dd />
                  </div>
                  <div>
                    <dt>Demand notice must be sent by</dt>
                    <dd>
                      {formatISODate(deadlines.noticeBy)}
                      {!sent && (
                        <>
                          {" "}
                          · <Days n={deadlines.noticeDaysLeft} />
                        </>
                      )}
                    </dd>
                  </div>
                  {deadlines.noticeLate && (
                    <div>
                      <dt />
                      <dd style={{ color: "#ffb1a6" }}>Sent after 30 days — re-present the cheque (within its validity) and issue a fresh notice on the fresh dishonour.</dd>
                    </div>
                  )}
                  {deadlines.payBy && (
                    <>
                      <div>
                        <dt>Drawer must pay by ({deadlines.servedBasis === "presumed" ? "service presumed 3 days after posting" : "from the date received"})</dt>
                        <dd>{formatISODate(deadlines.payBy)}</dd>
                      </div>
                      <div>
                        <dt>Complaint must be filed by</dt>
                        <dd>
                          {formatISODate(deadlines.complaintBy)} · <Days n={deadlines.complaintDaysLeft} />
                        </dd>
                      </div>
                    </>
                  )}
                </dl>
              )}

              {figures && (
                <dl className="calc__breakdown calc__breakdown--aside">
                  <div className="calc__asidehead">
                    <dt>The statutory figures</dt>
                    <dd />
                  </div>
                  <div>
                    <dt>Maximum fine (2× cheque) and/or 2 years' imprisonment</dt>
                    <dd>{rupees(figures.maxFine)}</dd>
                  </div>
                  <div>
                    <dt>Interim compensation the trial court may order (s.143A, up to {S138.interimCompMaxPct}%)</dt>
                    <dd>{rupees(figures.interimMax)}</dd>
                  </div>
                  <div>
                    <dt>Deposit for the drawer to appeal a conviction (s.148, min {S138.appealDepositMinPct}%)</dt>
                    <dd>{rupees(figures.appealDeposit)}</dd>
                  </div>
                  <div className="calc__asidehead" style={{ marginTop: 6 }}>
                    <dt>Cost of settling late (Damodar S. Prabhu)</dt>
                    <dd />
                  </div>
                  {figures.ladder.map((l) => (
                    <div key={l.stage}>
                      <dt>{l.stage}</dt>
                      <dd>{l.pct ? `${rupees(l.cost)} (${l.pct}%)` : "no cost"}</dd>
                    </div>
                  ))}
                </dl>
              )}

              <p className="calc__warn">
                <Icon name="briefcase" width={15} height={15} />
                {payee
                  ? "The chamber sends the notice, files the complaint at Hajipur within the month, and presses for interim compensation on the first date."
                  : "Paying within the 15 days ends the matter. If the debt is disputed — a security cheque, an altered amount, a paid loan — the defence must be built before the first date."}
              </p>
              <Link to="/book" className="btn btn--primary btn--block">
                {payee ? "Have the chamber act on it" : "Get the defence assessed"} <Icon name="arrow" width={17} height={17} />
              </Link>
            </>
          ) : (
            <>
              <Icon name="doc" width={30} height={30} />
              <p>Enter the cheque amount or the dishonour date to begin.</p>
            </>
          )}
        </div>
      </div>

      <section className="gen" aria-labelledby="gen-title">
        <div className="calc__inputs">
          <h2 id="gen-title" className="gen__title">
            <Icon name="doc" width={19} height={19} /> Section 138 demand notice — generator
          </h2>
          <p className="field__hint" style={{ marginTop: -8 }}>
            Fills the statutory notice with your particulars. Nothing you type leaves your browser. Send it by registered
            post with A/D and by speed post, within 30 days of the return memo, and keep every receipt.
          </p>
          <fieldset className="field">
            <legend>Language</legend>
            <div className="chips">
              <button type="button" aria-pressed={lang === "en"} className={`chip ${lang === "en" ? "is-active" : ""}`} onClick={() => setLang("en")}>
                English
              </button>
              <button type="button" aria-pressed={lang === "hi"} className={`chip ${lang === "hi" ? "is-active" : ""}`} onClick={() => setLang("hi")} lang="hi">
                हिंदी
              </button>
            </div>
          </fieldset>
          <label className="check">
            <input type="checkbox" checked={viaAdvocate} onChange={(e) => setViaAdvocate(e.target.checked)} />
            <span>Sent through an advocate (recommended — the notice is then signed by the advocate for the client)</span>
          </label>
          {viaAdvocate && (
            <Field id="advocateName" label="Advocate's name">
              <input id="advocateName" type="text" value={n.advocateName} onChange={set("advocateName")} placeholder="e.g. Ram Snehi Mishra, Advocate, Hajipur" />
            </Field>
          )}
          <Field id="senderName" label={viaAdvocate ? "Client (payee) name" : "Your name (payee)"}>
            <input id="senderName" type="text" value={n.senderName} onChange={set("senderName")} />
          </Field>
          <Field id="senderAddress" label="Payee's address">
            <input id="senderAddress" type="text" value={n.senderAddress} onChange={set("senderAddress")} />
          </Field>
          <Field id="drawerName" label="Drawer's name (who signed the cheque)">
            <input id="drawerName" type="text" value={n.drawerName} onChange={set("drawerName")} />
          </Field>
          <Field id="drawerAddress" label="Drawer's address (as on record)">
            <input id="drawerAddress" type="text" value={n.drawerAddress} onChange={set("drawerAddress")} />
          </Field>
          <div className="calc__options" style={{ borderTop: 0, paddingTop: 0 }}>
            <Field id="chequeNo" label="Cheque number">
              <input id="chequeNo" type="text" inputMode="numeric" value={n.chequeNo} onChange={set("chequeNo")} />
            </Field>
            <Field id="chequeDate" label="Cheque date">
              <input id="chequeDate" type="date" value={n.chequeDate} onChange={set("chequeDate")} />
            </Field>
          </div>
          <Field id="bank" label="Drawee bank and branch">
            <input id="bank" type="text" value={n.bank} onChange={set("bank")} placeholder="e.g. State Bank of India, Hajipur Main Branch" />
          </Field>
          <Field id="reason" label="Reason on the return memo">
            <select id="reason" value={n.reason} onChange={set("reason")}>
              {DISHONOUR_REASONS.map((r) => (
                <option key={r.key} value={r.key}>
                  {r.en}
                </option>
              ))}
            </select>
          </Field>
          <Field id="purpose" label="What the cheque was for">
            <select id="purpose" value={n.purpose} onChange={set("purpose")}>
              {DEBT_PURPOSES.map((p) => (
                <option key={p.key} value={p.key}>
                  {p.en.replace("my client", "the payee")}
                </option>
              ))}
            </select>
          </Field>
          <Field id="court" label="Court the complaint will go to" hint="Where the payee's bank branch is (s.142(2)).">
            <input id="court" type="text" value={n.court} onChange={set("court")} />
          </Field>
          <p className="field__hint">The amount and dishonour date are taken from the calculator above; today's date is used as the notice date.</p>
        </div>

        <div className="gen__out">
          <div className="gen__bar">
            <span>{lang === "hi" ? "नोटिस का मसौदा" : "Draft notice"}</span>
            <div className="gen__actions">
              <button type="button" className="btn btn--ghost btn--sm" onClick={copy}>
                <Icon name={copied ? "check" : "copy"} width={15} height={15} /> {copied ? "Copied" : "Copy"}
              </button>
              <button type="button" className="btn btn--ghost btn--sm" onClick={download}>
                <Icon name="download" width={15} height={15} /> Download
              </button>
            </div>
          </div>
          <textarea className="gen__text" readOnly value={text} lang={lang} aria-label="Generated notice text" />
          <p className="field__hint">
            A draft for orientation. Blanks are marked with underscores. Have it checked and sent through an advocate —
            a defective notice is the commonest reason a Section 138 case is dismissed.
          </p>
        </div>
      </section>
    </ToolShell>
  );
}
