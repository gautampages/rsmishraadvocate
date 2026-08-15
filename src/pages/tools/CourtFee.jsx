import { useState } from "react";
import ToolShell from "../../components/ToolShell";
import { Icon } from "../../components/Icons";
import { COURT_FEE, computeCourtFee, inr, rupees } from "../../lib/legalTools";

const FAQS = [
  {
    q: "How is court fee calculated on a civil suit in Bihar?",
    a: "Court fee in Bihar is ad valorem — it rises with the value of the claim. Under the Court Fees (Bihar Amendment) Act, 1995, the scale steps up by ₹80 for every ₹5,000 of value or part thereof, subject to a maximum of ₹50,000. Because it is charged per part-slab, a claim of ₹5,001 attracts the same step as one of ₹10,000.",
  },
  {
    q: "Is there a maximum court fee?",
    a: "Yes. The ad valorem scale is capped at ₹50,000. Beyond a claim value of roughly ₹31 lakh the fee stops rising, so a very large suit costs the same in court fee as one at the ceiling. This is why the effective percentage falls sharply on high-value claims.",
  },
  {
    q: "Do I pay court fee on the relief claimed or on the property's market value?",
    a: "It depends on the relief. A suit for recovery of money is valued at the sum claimed; a suit for declaration or possession is valued under the rules applicable to that relief, which may look to the market value of the property or to a notional value. Getting the valuation wrong invites an objection and can delay the suit at the threshold.",
  },
  {
    q: "Is court fee refundable if the case settles?",
    a: "Where a matter is settled through mediation, Lok Adalat or a court-referred settlement, the court fee paid is ordinarily refundable. This is a deliberate statutory encouragement to settle, and it is worth factoring in before deciding to fight a matter to judgment.",
  },
];

export default function CourtFee() {
  const [value, setValue] = useState("");
  const result = computeCourtFee(value);
  const hasInput = result.value > 0;

  return (
    <ToolShell
      path="/tools/court-fee-calculator"
      faqs={FAQS}
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
    </ToolShell>
  );
}
