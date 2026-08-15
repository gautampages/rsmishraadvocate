import { useState } from "react";
import ToolShell from "../../components/ToolShell";
import { Icon } from "../../components/Icons";
import { STAMP_CATEGORIES, computeStampDuty, rupees } from "../../lib/legalTools";

const FAQS = [
  {
    q: "What is stamp duty on a sale deed in Bihar?",
    a: "Bihar charges 6% stamp duty with a 2% registration fee as the general rate, adjusted by the gender of the parties: 5.7% + 1.9% where a male transfers to a female, and 6.3% + 2.1% where a female transfers to a male. The concession is a policy measure to encourage property being held in women's names.",
  },
  {
    q: "What is MVR, and why is my duty higher than I expected?",
    a: "The Minimum Value Register (MVR) is the government's own circle-rate valuation for the plot. Duty is charged on the consideration stated in the deed or the MVR value, whichever is higher. If the MVR rate for your area exceeds the price you agreed, duty is computed on the MVR figure — this is the single most common surprise at the registry office.",
  },
  {
    q: "Is stamp duty payable on a gift deed within the family?",
    a: "A gift deed still attracts stamp duty and registration fee, though the applicable rate can differ from an ordinary sale. Transfers between specified close relatives are treated differently in several states, so the position for your particular relationship and property should be confirmed before the deed is drawn.",
  },
  {
    q: "Are stamp duty and registration fee the same thing?",
    a: "No. Stamp duty is a tax on the instrument, paid to the State. The registration fee is charged separately for registering that instrument with the Sub-Registrar. Both are payable, which is why the effective cost of registering a sale deed in Bihar is around 8% of value rather than 6%.",
  },
];

export default function StampDuty() {
  const [consideration, setConsideration] = useState("");
  const [mvr, setMvr] = useState("");
  const [categoryKey, setCategoryKey] = useState("other");

  const result = computeStampDuty({ consideration, mvr, categoryKey });
  const hasInput = result.base > 0;

  return (
    <ToolShell
      path="/tools/stamp-duty-calculator"
      faqs={FAQS}
      authority={
        <p>
          Bihar levies stamp duty at <strong>6%</strong> with a <strong>2%</strong> registration fee,
          varied by the gender of the transferor and transferee — <strong>5.7% + 1.9%</strong> on a
          male-to-female transfer and <strong>6.3% + 2.1%</strong> on a female-to-male transfer. Duty
          is charged on the consideration stated in the deed or the Minimum Value Register (MVR)
          valuation for the plot, <strong>whichever is higher</strong>.
        </p>
      }
      notes={[
        "The MVR rate varies plot by plot and is fixed by the district administration. Get the current rate for your specific khata and plot number before relying on any estimate.",
        "Gift, lease, mortgage, partition and exchange deeds are charged differently from a sale deed. This calculator covers sale deeds.",
        "Bihar has offered a rebate for completing registration through the online process. Whether it applies to your transaction should be checked at the time of registration.",
        "Mutation (dakhil kharij) at the Circle Office is a separate step after registration, with its own fee. Registration alone does not update the revenue record.",
      ]}
    >
      <div className="calc">
        <div className="calc__inputs">
          <div className="field">
            <label htmlFor="consideration">Sale price stated in the deed (₹)</label>
            <input
              id="consideration"
              type="number"
              min="0"
              inputMode="numeric"
              value={consideration}
              onChange={(e) => setConsideration(e.target.value)}
              placeholder="e.g. 1500000"
            />
          </div>

          <div className="field">
            <label htmlFor="mvr">MVR / circle-rate value (₹)</label>
            <input
              id="mvr"
              type="number"
              min="0"
              inputMode="numeric"
              value={mvr}
              onChange={(e) => setMvr(e.target.value)}
              placeholder="Leave blank if not known"
            />
            <span className="field__hint">Duty is charged on whichever of these two is higher.</span>
          </div>

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
                  <em>{c.stamp}% + {c.registration}%</em>
                </button>
              ))}
            </div>
          </fieldset>
        </div>

        <div className={`calc__result ${hasInput ? "" : "is-empty"}`}>
          {hasInput ? (
            <>
              <span className="calc__label">Estimated total payable</span>
              <strong className="calc__big">{rupees(result.total)}</strong>
              <span className="calc__sub">
                {result.effectiveRate}% of {rupees(result.base)}
              </span>

              {result.basedOn === "mvr" && (
                <p className="calc__flag">
                  <Icon name="alert" width={16} height={16} />
                  Computed on the MVR value, which is higher than the price you entered.
                </p>
              )}

              <dl className="calc__breakdown">
                <div>
                  <dt>Stamp duty ({result.category.stamp}%)</dt>
                  <dd>{rupees(result.stamp)}</dd>
                </div>
                <div>
                  <dt>Registration fee ({result.category.registration}%)</dt>
                  <dd>{rupees(result.registration)}</dd>
                </div>
                <div className="calc__total">
                  <dt>Total</dt>
                  <dd>{rupees(result.total)}</dd>
                </div>
              </dl>
            </>
          ) : (
            <>
              <Icon name="home" width={30} height={30} />
              <p>Enter the sale price to see an estimate.</p>
            </>
          )}
        </div>
      </div>
    </ToolShell>
  );
}
