import { useState } from "react";
import { Link } from "react-router";
import ToolShell from "../../components/ToolShell";
import { Icon } from "../../components/Icons";
import {
  CLAIM_LIMITATION_MONTHS,
  EMPLOYMENT,
  HIT_AND_RUN,
  MACT_REVIEWED,
  NO_FAULT,
  computeDeath,
  computeInjury,
  conventionalHeads,
} from "../../lib/mact";
import { rupees } from "../../lib/money";
import { faqsForTool } from "../../data/toolFaqs";

const Num = ({ id, label, value, onChange, hint, placeholder, min = "0", max }) => (
  <div className="field">
    <label htmlFor={id}>{label}</label>
    <input id={id} type="number" min={min} max={max} inputMode="numeric" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    {hint && <span className="field__hint">{hint}</span>}
  </div>
);

export default function Mact() {
  const [mode, setMode] = useState("death");
  const [age, setAge] = useState("");
  const [income, setIncome] = useState("");
  const [tax, setTax] = useState("");
  const [employment, setEmployment] = useState("self");
  const [married, setMarried] = useState(true);
  const [dependants, setDependants] = useState("3");
  const [disability, setDisability] = useState("");
  const [medical, setMedical] = useState("");
  const [months, setMonths] = useState("");
  const [attendant, setAttendant] = useState("");
  const [pain, setPain] = useState("50000");

  const heads = conventionalHeads();
  const death =
    mode === "death"
      ? computeDeath({ age, annualIncome: income, annualTax: tax, employment, married, dependants })
      : null;
  const injury =
    mode === "injury"
      ? computeInjury({ age, annualIncome: income, employment, disabilityPercent: disability, medical, treatmentMonths: months, attendant, painSuffering: pain })
      : null;
  const result = death || injury;

  return (
    <ToolShell
      path="/tools/mact-compensation-calculator"
      faqs={faqsForTool("/tools/mact-compensation-calculator")}
      authority={
        <>
          <p>
            The Motor Vehicles Act has no formula; the Supreme Court supplied one.{" "}
            <strong>Sarla Verma v. DTC (2009)</strong> fixed the multiplier by age (18 at 15–25, falling to
            5 above 65) and the deduction for the deceased's own expenses (half for a bachelor; a third, a
            quarter or a fifth for a married person by the number of dependants).{" "}
            <strong>National Insurance v. Pranay Sethi (2017)</strong> fixed the addition for future prospects
            (50 / 30 / 15% for a permanent job, 40 / 25 / 10% for the self-employed, by age band) and the
            three conventional heads — loss of estate, loss of consortium and funeral expenses — to rise 10%
            every three years. <strong>Magma v. Nanu Ram (2018)</strong> gives consortium to each dependant.
          </p>
          <p>
            Assumption stated plainly: the 10% uplift on conventional heads is reckoned to today's date ({heads.steps} uplifts
            since October 2017, so {rupees(heads.consortium)} consortium and {rupees(heads.estate)} each for estate and
            funeral). Some tribunals count from the accident date instead; the difference is small. Rules as
            reviewed {MACT_REVIEWED}.
          </p>
        </>
      }
      notes={[
        "Income is what the tribunal finds proved — salary slips, ITRs, or in their absence a notional figure often anchored on the State's minimum wage. Income tax actually paid is deducted; the tool takes it as an input.",
        "Contributory negligence reduces the award by the claimant's share of fault. Where the deceased was the driver and at fault, the claim fails under s.166 and the no-fault and hit-and-run routes below are what remain.",
        "Interest, usually 7.5% to 9% simple from the date of the claim petition, is added by the tribunal and is not shown here.",
        `File within ${CLAIM_LIMITATION_MONTHS} months of the accident (s.166(3), since 2019). Late claims need condonation and are frequently refused — use the limitation checker.`,
        "For Vaishali, the Motor Accident Claims Tribunal sits with the District Judge at Hajipur. The Detailed Accident Report (DAR) the police must now file within 90 days is the backbone of the claim — insist on it.",
      ]}
    >
      <div className="calc">
        <div className="calc__inputs">
          <fieldset className="field">
            <legend>What is the claim for?</legend>
            <div className="chips">
              {[
                ["death", "Death", "of a family member"],
                ["injury", "Injury", "to the claimant"],
              ].map(([k, l, h]) => (
                <button key={k} type="button" aria-pressed={mode === k} className={`chip ${mode === k ? "is-active" : ""}`} onClick={() => setMode(k)}>
                  {l}
                  <em>{h}</em>
                </button>
              ))}
            </div>
          </fieldset>

          <Num id="age" label={mode === "death" ? "Age of the deceased at the accident" : "Age of the injured person"} value={age} onChange={setAge} placeholder="e.g. 38" min="1" max="100" />
          <Num id="income" label="Annual income (₹)" value={income} onChange={setIncome} placeholder="e.g. 300000" hint="Gross, as it can be proved. If nothing can be proved, tribunals take a notional figure — try ₹1,50,000 to ₹2,00,000 for an unskilled worker in Bihar and adjust." />
          {mode === "death" && <Num id="tax" label="Income tax paid per year (₹)" value={tax} onChange={setTax} placeholder="0 if none" hint="Deducted from income before the calculation." />}

          <fieldset className="field">
            <legend>Nature of work</legend>
            <div className="chips">
              {EMPLOYMENT.map((e) => (
                <button key={e.key} type="button" aria-pressed={employment === e.key} className={`chip ${employment === e.key ? "is-active" : ""}`} onClick={() => setEmployment(e.key)} title={e.hint}>
                  {e.label}
                  <em>{e.hint}</em>
                </button>
              ))}
            </div>
          </fieldset>

          {mode === "death" ? (
            <>
              <fieldset className="field">
                <legend>Marital status of the deceased</legend>
                <div className="chips">
                  <button type="button" aria-pressed={married} className={`chip ${married ? "is-active" : ""}`} onClick={() => setMarried(true)}>
                    Married
                    <em>deduction by dependants</em>
                  </button>
                  <button type="button" aria-pressed={!married} className={`chip ${!married ? "is-active" : ""}`} onClick={() => setMarried(false)}>
                    Unmarried
                    <em>50% deduction</em>
                  </button>
                </div>
              </fieldset>
              <Num id="dependants" label="Number of dependants claiming" value={dependants} onChange={setDependants} min="1" max="12" hint="Spouse, children and parents who depended on the deceased. Each also gets loss of consortium." />
            </>
          ) : (
            <>
              <Num id="disability" label="Permanent disability (%)" value={disability} onChange={setDisability} placeholder="0 if none" min="0" max="100" hint="The functional disability as it affects earning, not just the medical percentage on the certificate (Raj Kumar v. Ajay Kumar, 2011)." />
              <Num id="medical" label="Medical expenses incurred (₹)" value={medical} onChange={setMedical} placeholder="bills and receipts" />
              <Num id="months" label="Months unable to work during treatment" value={months} onChange={setMonths} placeholder="e.g. 3" max="60" />
              <Num id="attendant" label="Attendant, special diet and transport (₹)" value={attendant} onChange={setAttendant} placeholder="0 if none" />
              <Num id="pain" label="Pain and suffering (₹)" value={pain} onChange={setPain} hint="A discretionary lump sum — ₹25,000 for simple fractures to several lakh for amputation or paralysis. Edit to suit." />
            </>
          )}
        </div>

        <div className={`calc__result ${result ? "" : "is-empty"}`}>
          {result ? (
            <>
              <span className="calc__label">Indicative compensation</span>
              <strong className="calc__big">{rupees(result.total)}</strong>
              <span className="calc__sub">
                {death ? `Multiplier ${death.multiplier} · future prospects ${death.fp}% · ${Math.round(death.share * 100)}% personal expenses` : `Multiplier ${injury.multiplier} · future prospects ${injury.fp}% · ${injury.disability}% disability`}
              </span>

              {death ? (
                <dl className="calc__breakdown">
                  <div>
                    <dt>Income after tax</dt>
                    <dd>{rupees(death.income)}</dd>
                  </div>
                  <div>
                    <dt>+ Future prospects ({death.fp}%)</dt>
                    <dd>{rupees(death.withProspects)}</dd>
                  </div>
                  <div>
                    <dt>− Personal expenses ({Math.round(death.share * 100)}%)</dt>
                    <dd>{rupees(death.dependency)} / yr</dd>
                  </div>
                  <div>
                    <dt>× Multiplier {death.multiplier}</dt>
                    <dd>{rupees(death.lossOfDependency)}</dd>
                  </div>
                  <div>
                    <dt>Loss of consortium × {death.claimants}</dt>
                    <dd>{rupees(death.consortium)}</dd>
                  </div>
                  <div>
                    <dt>Loss of estate</dt>
                    <dd>{rupees(death.heads.estate)}</dd>
                  </div>
                  <div>
                    <dt>Funeral expenses</dt>
                    <dd>{rupees(death.heads.funeral)}</dd>
                  </div>
                  <div className="calc__total">
                    <dt>Total (before interest)</dt>
                    <dd>{rupees(death.total)}</dd>
                  </div>
                </dl>
              ) : (
                <dl className="calc__breakdown">
                  {injury.futureLoss > 0 && (
                    <div>
                      <dt>Loss of future earning capacity</dt>
                      <dd>{rupees(injury.futureLoss)}</dd>
                    </div>
                  )}
                  {injury.treatmentLoss > 0 && (
                    <div>
                      <dt>Loss of income during treatment</dt>
                      <dd>{rupees(injury.treatmentLoss)}</dd>
                    </div>
                  )}
                  {injury.medical > 0 && (
                    <div>
                      <dt>Medical expenses</dt>
                      <dd>{rupees(injury.medical)}</dd>
                    </div>
                  )}
                  {injury.attendant > 0 && (
                    <div>
                      <dt>Attendant, diet, transport</dt>
                      <dd>{rupees(injury.attendant)}</dd>
                    </div>
                  )}
                  {injury.pain > 0 && (
                    <div>
                      <dt>Pain and suffering</dt>
                      <dd>{rupees(injury.pain)}</dd>
                    </div>
                  )}
                  <div className="calc__total">
                    <dt>Total (before interest)</dt>
                    <dd>{rupees(injury.total)}</dd>
                  </div>
                </dl>
              )}

              <dl className="calc__breakdown calc__breakdown--aside">
                <div className="calc__asidehead">
                  <dt>The floors, whatever the fault</dt>
                  <dd />
                </div>
                <div>
                  <dt>No-fault claim, s.164 ({mode === "death" ? "death" : "grievous hurt"})</dt>
                  <dd>{rupees(mode === "death" ? NO_FAULT.death : NO_FAULT.grievous)}</dd>
                </div>
                <div>
                  <dt>Hit-and-run scheme ({mode === "death" ? "death" : "grievous hurt"})</dt>
                  <dd>{rupees(mode === "death" ? HIT_AND_RUN.death : HIT_AND_RUN.grievous)}</dd>
                </div>
              </dl>

              <p className="calc__warn">
                <Icon name="clock" width={15} height={15} />
                Claim petition within {CLAIM_LIMITATION_MONTHS} months of the accident, before the MACT at the District Judge's court, Hajipur.
              </p>
              <p className="calc__warn">
                <Icon name="briefcase" width={15} height={15} />
                The chamber files and argues MACT claims at Hajipur on the DAR, the insurer's reply and the evidence of income — and appeals to the Patna High Court where the award is short.
              </p>
              <Link to="/book" className="btn btn--primary btn--block">
                Discuss the claim <Icon name="arrow" width={17} height={17} />
              </Link>
            </>
          ) : (
            <>
              <Icon name="shield" width={30} height={30} />
              <p>Enter the age and annual income to see an estimate.</p>
            </>
          )}
        </div>
      </div>
    </ToolShell>
  );
}
