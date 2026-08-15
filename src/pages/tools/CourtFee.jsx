import { useState } from "react";
import ToolShell from "../../components/ToolShell";
import { Icon } from "../../components/Icons";
import { COURT_FEE, computeCourtFee, inr, rupees } from "../../lib/legalTools";
import { faqsForTool } from "../../data/toolFaqs";

// A ready-reckoner for the claim values people actually type in. Someone who
// arrived from a search for "court fee on a 5 lakh suit in Bihar" wants the
// number in the page, not a form to fill in — and a table of computed figures
// is also the shape an answer engine can quote.
const COMMON_VALUES = [50000, 100000, 200000, 500000, 1000000, 2000000, 3100000, 5000000];

export default function CourtFee() {
  const [value, setValue] = useState("");
  const result = computeCourtFee(value);
  const hasInput = result.value > 0;

  return (
    <ToolShell
      path="/tools/court-fee-calculator"
      faqs={faqsForTool("/tools/court-fee-calculator")}
      authority={
        <p>
          The Court Fees (Bihar Amendment) Act, 1995 substituted Schedule I of the Court Fees Act,
          1870 with an ad valorem scale that rises by <strong>₹{COURT_FEE.feePerStep}</strong> for
          every <strong>₹{inr(COURT_FEE.step)}</strong> of value <em>or part thereof</em>, subject to
          a ceiling of <strong>{rupees(COURT_FEE.ceiling)}</strong>. This calculator applies that
          scale to the value you enter.
        </p>
      }
      notes={[
        "The hard part is not the arithmetic but the valuation: how a suit must be valued depends on the relief claimed, and an incorrect valuation invites an objection at the threshold.",
        "Fixed court fees apply to many applications and petitions rather than this ad valorem scale — bail applications, most interlocutory applications and several classes of petition among them.",
        "Process fees, pleader's fee, and the cost of certified copies are payable in addition to court fee.",
        "Court fee is ordinarily refundable where the matter is settled through mediation or a Lok Adalat.",
      ]}
    >
      <div className="calc">
        <div className="calc__inputs">
          <div className="field">
            <label htmlFor="suitvalue">Value of the suit or claim (₹)</label>
            <input
              id="suitvalue"
              type="number"
              min="0"
              inputMode="numeric"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="e.g. 500000"
            />
            <span className="field__hint">
              For a money claim this is the amount claimed. For other reliefs, the valuation rules
              for that relief apply.
            </span>
          </div>
        </div>

        <div className={`calc__result ${hasInput ? "" : "is-empty"}`}>
          {hasInput ? (
            <>
              <span className="calc__label">Estimated court fee</span>
              <strong className="calc__big">{rupees(result.fee)}</strong>
              <span className="calc__sub">
                {result.effectivePercent.toFixed(2)}% of {rupees(result.value)}
              </span>

              {result.atCeiling && (
                <p className="calc__flag">
                  <Icon name="alert" width={16} height={16} />
                  At the statutory ceiling of {rupees(COURT_FEE.ceiling)} — the fee does not rise
                  further, however large the claim.
                </p>
              )}

              <dl className="calc__breakdown">
                <div>
                  <dt>Slabs of ₹{inr(COURT_FEE.step)} (or part)</dt>
                  <dd>{inr(result.steps)}</dd>
                </div>
                <div>
                  <dt>Fee per slab</dt>
                  <dd>₹{COURT_FEE.feePerStep}</dd>
                </div>
                <div className="calc__total">
                  <dt>Court fee</dt>
                  <dd>{rupees(result.fee)}</dd>
                </div>
              </dl>
            </>
          ) : (
            <>
              <Icon name="scales" width={30} height={30} />
              <p>Enter the value of your claim to see an estimate.</p>
            </>
          )}
        </div>
      </div>

      <div className="reckoner">
        <h2>Court fee in Bihar at common claim values</h2>
        <p className="reckoner__intro">
          Computed on the same ad valorem scale as the calculator above — ₹{COURT_FEE.feePerStep}{" "}
          per ₹{inr(COURT_FEE.step)} of value or part of it, capped at {rupees(COURT_FEE.ceiling)}.
          Notice how the effective percentage collapses once the ceiling is reached.
        </p>
        <div className="reckoner__scroll">
          <table className="reckoner__table">
            <thead>
              <tr>
                <th scope="col">Value of the suit</th>
                <th scope="col">Slabs of ₹{inr(COURT_FEE.step)}</th>
                <th scope="col">Court fee</th>
                <th scope="col">Effective rate</th>
              </tr>
            </thead>
            <tbody>
              {COMMON_VALUES.map((v) => {
                const r = computeCourtFee(v);
                return (
                  <tr key={v} className={r.atCeiling ? "is-ceiling" : ""}>
                    <th scope="row">{rupees(v)}</th>
                    <td>{inr(r.steps)}</td>
                    <td>
                      <strong>{rupees(r.fee)}</strong>
                      {r.atCeiling && <span className="reckoner__tag">ceiling</span>}
                    </td>
                    <td>{r.effectivePercent.toFixed(2)}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="reckoner__foot">
          Figures are the ad valorem court fee only. Process fee, the cost of certified copies and
          the advocate's professional fee are separate and payable in addition.
        </p>
      </div>
    </ToolShell>
  );
}
