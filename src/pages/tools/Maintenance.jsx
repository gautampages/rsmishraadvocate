import { useState } from "react";
import ToolShell from "../../components/ToolShell";
import { Icon } from "../../components/Icons";
import { MAINTENANCE, estimateMaintenance, rupees } from "../../lib/legalTools";
import { faqsForTool } from "../../data/toolFaqs";

export default function Maintenance() {
  const [respondentNetMonthly, setNet] = useState("");
  const [claimantOwnMonthly, setOwn] = useState("");
  const [children, setChildren] = useState(0);
  const [claimingForSpouse, setForSpouse] = useState(true);

  const r = estimateMaintenance({
    respondentNetMonthly,
    claimantOwnMonthly,
    children,
    claimingForSpouse,
  });
  const hasInput = r.net > 0 && r.units > 0;

  return (
    <ToolShell
      path="/tools/maintenance-estimator"
      faqs={faqsForTool("/tools/maintenance-estimator")}
      authority={
        <>
          <p>
            There is no statutory formula for maintenance. The anchor used here is{" "}
            <strong>Kalyan Dey Chowdhury v. Rita Dey Chowdhury (2017)</strong>, where the Supreme
            Court held that <strong>25% of the husband's net salary</strong> would be just and proper
            as maintenance for the wife — and that 25% of <em>gross</em> salary was not permissible.
          </p>
          <p>
            The band shown spans {MAINTENANCE.lowPercent}% to {MAINTENANCE.highPercent}% of net
            income around that benchmark. Where children are also dependent, the band is widened,
            capped at {MAINTENANCE.ceilingPercent}% of net income — courts are markedly reluctant to
            leave a respondent with less than half of what they earn. That widening is a
            presentational heuristic, not a rule of law.
          </p>
          <p>
            The factors a court actually weighs come from <strong>Rajnesh v. Neha (2020)</strong>,
            which also made an Affidavit of Disclosure of Assets and Liabilities mandatory in every
            maintenance proceeding.
          </p>
        </>
      }
      notes={[
        "This estimator cannot know the standard of living during the marriage, the claimant's qualifications and earning capacity, the respondent's genuine liabilities, or the needs of a child with particular medical or educational requirements — all of which move the figure.",
        "The claimant's own income reduces need but does not extinguish the claim. This tool offsets only half of it, which reflects how courts weigh rather than subtract it.",
        "Maintenance is ordinarily awarded from the date of the application, so arrears accumulate while a case runs.",
        "A one-time settlement in lieu of monthly maintenance is calculated on an entirely different basis and is not modelled here.",
      ]}
    >
      <div className="calc">
        <div className="calc__inputs">
          <div className="field">
            <label htmlFor="net">Respondent's net monthly income (₹)</label>
            <input
              id="net"
              type="number"
              min="0"
              inputMode="numeric"
              value={respondentNetMonthly}
              onChange={(e) => setNet(e.target.value)}
              placeholder="e.g. 40000"
            />
            <span className="field__hint">After statutory deductions — not gross salary.</span>
          </div>

          <div className="field">
            <label htmlFor="own">Claimant's own monthly income (₹)</label>
            <input
              id="own"
              type="number"
              min="0"
              inputMode="numeric"
              value={claimantOwnMonthly}
              onChange={(e) => setOwn(e.target.value)}
              placeholder="0 if none"
            />
          </div>

          <fieldset className="field">
            <legend>Who is the claim for?</legend>
            <div className="chips">
              <button
                type="button"
                aria-pressed={claimingForSpouse}
                className={`chip ${claimingForSpouse ? "is-active" : ""}`}
                onClick={() => setForSpouse((v) => !v)}
              >
                Spouse
                <em>{claimingForSpouse ? "included" : "not included"}</em>
              </button>
            </div>
          </fieldset>

          <div className="field">
            <label htmlFor="children">Number of dependent children</label>
            <input
              id="children"
              type="number"
              min="0"
              max="10"
              inputMode="numeric"
              value={children}
              onChange={(e) => setChildren(e.target.value)}
            />
          </div>
        </div>

        <div className={`calc__result ${hasInput ? "" : "is-empty"}`}>
          {hasInput ? (
            <>
              <span className="calc__label">Likely monthly range</span>
              <strong className="calc__big calc__big--range">
                {rupees(r.low)} – {rupees(r.high)}
              </strong>
              <span className="calc__sub">
                Benchmark figure: <strong>{rupees(r.mid)}</strong> ({Math.round(r.midPct)}% of net
                income)
              </span>

              {r.capped && (
                <p className="calc__flag">
                  <Icon name="alert" width={16} height={16} />
                  Capped at {MAINTENANCE.ceilingPercent}% of net income — awards beyond this are
                  uncommon.
                </p>
              )}

              <dl className="calc__breakdown">
                <div>
                  <dt>Respondent's net income</dt>
                  <dd>{rupees(r.net)}</dd>
                </div>
                <div>
                  <dt>Dependants claimed for</dt>
                  <dd>
                    {claimingForSpouse ? "Spouse" : "—"}
                    {r.kids > 0 && `${claimingForSpouse ? " + " : ""}${r.kids} child${r.kids > 1 ? "ren" : ""}`}
                  </dd>
                </div>
                {r.offset > 0 && (
                  <div>
                    <dt>Offset for claimant's income</dt>
                    <dd>− {rupees(r.offset)}</dd>
                  </div>
                )}
                <div className="calc__total">
                  <dt>Benchmark award</dt>
                  <dd>{rupees(r.mid)}</dd>
                </div>
              </dl>

              <p className="calc__warn">
                <Icon name="alert" width={16} height={16} />
                No court is bound by any of this. Two cases with identical incomes routinely produce
                different orders.
              </p>
            </>
          ) : (
            <>
              <Icon name="family" width={30} height={30} />
              <p>Enter the respondent's net monthly income to see a range.</p>
            </>
          )}
        </div>
      </div>
    </ToolShell>
  );
}
