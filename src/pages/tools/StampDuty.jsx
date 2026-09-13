import { useState } from "react";
import { Link } from "react-router";
import ToolShell from "../../components/ToolShell";
import { Icon } from "../../components/Icons";
import {
  DEED_TYPES,
  LEASE_TENURES,
  MORTGAGE_KINDS,
  STAMP_CATEGORIES,
  STAMP_RATES_AS_OF,
  TDS_THRESHOLD,
  computeRegistrationCost,
  deedType,
} from "../../lib/stampDuty";
import { rupees } from "../../lib/money";
import { faqsForTool } from "../../data/toolFaqs";

const GROUPS = [...new Set(DEED_TYPES.map((d) => d.group))];

/** What the chamber does with each kind of deed — the CTA is keyed to the output. */
const CTA = {
  Transfer: "The chamber drafts sale, gift and exchange deeds, checks the title chain and attends the registration at Hajipur.",
  Family: "The chamber drafts family partitions, release deeds and settlements — and registers the ₹100 family partition that most families never get round to.",
  Succession: "The chamber drafts wills and adoption deeds and advises on whether to register them.",
  Agreements: "The chamber drafts agreements to sell, leases, rent agreements and powers of attorney that will stand up at the registry and in court.",
  Loans: "The chamber drafts and registers mortgage deeds and advises on the bank's paperwork.",
  Other: "The chamber drafts trust deeds and affidavits and can have them sworn or registered the same day.",
};

export default function StampDuty() {
  const [deed, setDeed] = useState("sale");
  const [value, setValue] = useState("");
  const [mvr, setMvr] = useState("");
  const [categoryKey, setCategoryKey] = useState("other");
  const [tenure, setTenure] = useState("lt1");
  const [sharers, setSharers] = useState("2");
  const [rent, setRent] = useState("");
  const [mortgage, setMortgage] = useState("simple");
  const [online, setOnline] = useState(true);
  const [pages, setPages] = useState("10");

  const type = deedType(deed);
  const show = (k) => type.inputs.includes(k);
  const result = computeRegistrationCost({
    deed,
    value,
    mvr,
    categoryKey,
    tenure,
    sharers,
    rent,
    mortgage,
    online,
    pages,
  });

  // Fixed-fee deeds have an answer before anything is typed; ad valorem ones
  // need a figure first.
  const needsFigure = type.inputs.some((k) => ["value", "mvr", "rent"].includes(k));
  const hasInput = !needsFigure || result.base > 0;

  return (
    <ToolShell
      path="/tools/stamp-duty-calculator"
      faqs={faqsForTool("/tools/stamp-duty-calculator")}
      authority={
        <p>
          Rates are taken from the Registration Department's published{" "}
          <strong>Table of Stamp Duty &amp; Registration Fee</strong> for Bihar, as revised to{" "}
          <strong>{STAMP_RATES_AS_OF}</strong>. Conveyance-type deeds — sale, gift, exchange, lease
          and a power to sell — are charged on the consideration or the Minimum Value Register (MVR)
          valuation, <strong>whichever is higher</strong>, at <strong>6% + 2%</strong>, varied by
          the gender of the parties (5.7% + 1.9% male→female; 6.3% + 2.1% female→male). Every other
          deed type here names the article it is charged under.
        </p>
      }
      notes={[
        "The MVR rate varies plot by plot and is fixed by the district administration. Get the current rate for your specific khata and plot number before relying on any estimate.",
        "Gift deeds are charged like a sale in Bihar; there is no separate blood-relation concession on the published chart. If a registry office offers a different figure, ask which article it is applying.",
        "Registering through the online (e-nibandhan) process earns a rebate of 1% of the stamp duty, capped at ₹2,000 (S.O. 10/2016). The scanning fee is charged per document: ₹250 up to 10 pages, ₹500 up to 20, ₹1,000 beyond.",
        "Mutation (dakhil kharij) at the Circle Office is a separate step after registration. It was free until 2026; the Bihar Land Mutation (Amendment) Bill 2026 is reported to introduce a ₹200 application fee. Confirm at the Circle Office — the figure is shown here as reported, not as gazetted.",
        "TDS under Section 194-IA of the Income-tax Act is 1% where the price or the stamp-duty value is ₹50 lakh or more. It is deducted by the buyer and deposited against the seller's PAN, not paid at the registry — and it is not extra cost to the buyer, but the registry will ask for the challan.",
      ]}
    >
      <div className="calc">
        <div className="calc__inputs">
          <div className="field">
            <label htmlFor="deed">What are you registering?</label>
            <select id="deed" value={deed} onChange={(e) => setDeed(e.target.value)}>
              {GROUPS.map((g) => (
                <optgroup key={g} label={g}>
                  {DEED_TYPES.filter((d) => d.group === g).map((d) => (
                    <option key={d.key} value={d.key}>
                      {d.label}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            <span className="field__hint" lang="hi">
              {type.hindi} · <span lang="en">{type.summary}</span>
            </span>
          </div>

          {show("value") && (
            <div className="field">
              <label htmlFor="value">{type.valueLabel || "Value (₹)"}</label>
              <input
                id="value"
                type="number"
                min="0"
                inputMode="numeric"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="e.g. 1500000"
              />
            </div>
          )}

          {show("mvr") && (
            <div className="field">
              <label htmlFor="mvr">MVR / circle-rate value of the property (₹)</label>
              <input
                id="mvr"
                type="number"
                min="0"
                inputMode="numeric"
                value={mvr}
                onChange={(e) => setMvr(e.target.value)}
                placeholder={show("value") ? "Leave blank if not known" : "e.g. 1200000"}
              />
              <span className="field__hint">
                {show("value")
                  ? "Duty is charged on whichever of the two figures is higher."
                  : "Duty on this deed is charged on the government valuation, not on any price."}
              </span>
            </div>
          )}

          {show("rent") && (
            <div className="field">
              <label htmlFor="rent">Total rent payable over the whole term (₹)</label>
              <input
                id="rent"
                type="number"
                min="0"
                inputMode="numeric"
                value={rent}
                onChange={(e) => setRent(e.target.value)}
                placeholder="e.g. 11 months × ₹8,000 = 88000"
              />
            </div>
          )}

          {show("sharers") && (
            <div className="field">
              <label htmlFor="sharers">Number of co-sharers</label>
              <input
                id="sharers"
                type="number"
                min="2"
                max="20"
                inputMode="numeric"
                value={sharers}
                onChange={(e) => setSharers(e.target.value)}
              />
              <span className="field__hint">Equal shares are assumed; the largest share is left out of the base.</span>
            </div>
          )}

          {show("tenure") && (
            <div className="field">
              <label htmlFor="tenure">Term of the lease</label>
              <select id="tenure" value={tenure} onChange={(e) => setTenure(e.target.value)}>
                {LEASE_TENURES.map((t) => (
                  <option key={t.key} value={t.key}>
                    {t.label} — duty on {t.factor * 100}% of value
                  </option>
                ))}
              </select>
            </div>
          )}

          {show("mortgage") && (
            <div className="field">
              <label htmlFor="mortgage">Kind of mortgage</label>
              <select id="mortgage" value={mortgage} onChange={(e) => setMortgage(e.target.value)}>
                {MORTGAGE_KINDS.map((m) => (
                  <option key={m.key} value={m.key}>
                    {m.label}
                  </option>
                ))}
              </select>
              <span className="field__hint">{MORTGAGE_KINDS.find((m) => m.key === mortgage)?.hint}</span>
            </div>
          )}

          {show("category") && (
            <fieldset className="field">
              <legend>Who is transferring to whom?</legend>
              <div className="chips">
                {STAMP_CATEGORIES.map((c) => (
                  <button
                    key={c.key}
                    type="button"
                    aria-pressed={categoryKey === c.key}
                    className={`chip ${categoryKey === c.key ? "is-active" : ""}`}
                    onClick={() => setCategoryKey(c.key)}
                    title={c.hint}
                  >
                    {c.label}
                    <em>
                      {c.stamp}% + {c.registration}%
                    </em>
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          {result.registration > 0 && (
            <div className="calc__options">
              <label className="check">
                <input type="checkbox" checked={online} onChange={(e) => setOnline(e.target.checked)} />
                <span>Registering online (e-nibandhan) — 1% rebate on duty, capped ₹2,000</span>
              </label>
              <div className="field field--inline">
                <label htmlFor="pages">Pages in the document</label>
                <select id="pages" value={pages} onChange={(e) => setPages(e.target.value)}>
                  <option value="10">Up to 10 — ₹250 scanning</option>
                  <option value="20">11 to 20 — ₹500 scanning</option>
                  <option value="30">More than 20 — ₹1,000 scanning</option>
                </select>
              </div>
            </div>
          )}

          <div className="authority">
            <Icon name="book" width={16} height={16} />
            <span>
              <strong>{type.article}</strong> · Bihar table of stamp duty and registration fee
            </span>
          </div>
        </div>

        <div className={`calc__result ${hasInput ? "" : "is-empty"}`}>
          {hasInput ? (
            <>
              <span className="calc__label">Estimated cost at the registry</span>
              <strong className="calc__big">{rupees(result.total)}</strong>
              <span className="calc__sub">
                {type.label}
                {result.base > 0 && <> · on {rupees(result.base)}</>}
              </span>

              {result.basedOn === "mvr" && show("value") && (
                <p className="calc__flag">
                  <Icon name="alert" width={16} height={16} />
                  Computed on the MVR value, which is higher than the price you entered.
                </p>
              )}

              <dl className="calc__breakdown">
                <div>
                  <dt>{result.stampLabel}</dt>
                  <dd>{rupees(result.stamp)}</dd>
                </div>
                <div>
                  <dt>{result.regLabel}</dt>
                  <dd>{rupees(result.registration)}</dd>
                </div>
                {result.rebate > 0 && (
                  <div>
                    <dt>Online registration rebate</dt>
                    <dd>− {rupees(result.rebate)}</dd>
                  </div>
                )}
                {result.scanning > 0 && (
                  <div>
                    <dt>Scanning fee ({result.pages <= 10 ? "≤10" : result.pages <= 20 ? "≤20" : ">20"} pages)</dt>
                    <dd>{rupees(result.scanning)}</dd>
                  </div>
                )}
                <div className="calc__total">
                  <dt>Payable at registration</dt>
                  <dd>{rupees(result.total)}</dd>
                </div>
              </dl>

              {(result.mutation > 0 || result.tds > 0 || type.tds) && (
                <dl className="calc__breakdown calc__breakdown--aside">
                  <div className="calc__asidehead">
                    <dt>Also budget for</dt>
                    <dd />
                  </div>
                  {result.mutation > 0 && (
                    <div>
                      <dt>Mutation application at the Circle Office (reported 2026 fee)</dt>
                      <dd>{rupees(result.mutation)}</dd>
                    </div>
                  )}
                  {type.tds && (
                    <div>
                      <dt>
                        TDS, s.194-IA — 1% {result.tds > 0 ? "deducted from the seller" : `applies from ${rupees(TDS_THRESHOLD)}`}
                      </dt>
                      <dd>{result.tds > 0 ? rupees(result.tds) : "nil"}</dd>
                    </div>
                  )}
                </dl>
              )}

              {result.notes.map((n) => (
                <p key={n.slice(0, 30)} className="calc__warn">
                  <Icon name="alert" width={15} height={15} />
                  {n}
                </p>
              ))}

              <p className="calc__warn">
                <Icon name="briefcase" width={15} height={15} />
                {CTA[type.group]}
              </p>
              <Link to="/book" className="btn btn--primary btn--block">
                Get the deed drafted <Icon name="arrow" width={17} height={17} />
              </Link>
            </>
          ) : (
            <>
              <Icon name="home" width={30} height={30} />
              <p>Enter the {show("rent") ? "rent" : "value"} to see an estimate.</p>
            </>
          )}
        </div>
      </div>
    </ToolShell>
  );
}
