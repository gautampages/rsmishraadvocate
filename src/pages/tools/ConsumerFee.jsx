import { useState } from "react";
import { Link } from "react-router";
import ToolShell from "../../components/ToolShell";
import { Icon } from "../../components/Icons";
import {
  CONSUMER_REVIEWED,
  EDAAKHIL_URL,
  FEE_SLABS,
  LIMITATION_YEARS,
  NCH_PHONE,
  NCH_URL,
  computeConsumer,
} from "../../lib/consumer";
import { rupees } from "../../lib/money";
import { districts } from "../../data/courts";
import { faqsForTool } from "../../data/toolFaqs";

export default function ConsumerFee() {
  const [consideration, setConsideration] = useState("");
  const [district, setDistrict] = useState("vaishali");
  const d = districts.find((x) => x.slug === district) || districts[0];
  const r = computeConsumer({ consideration, districtName: `${d.district}${d.hq !== d.district ? ` (${d.hq})` : ""}` });

  return (
    <ToolShell
      path="/tools/consumer-court-fee-calculator"
      faqs={faqsForTool("/tools/consumer-court-fee-calculator")}
      authority={
        <>
          <p>
            Under the <strong>Consumer Protection Act, 2019</strong> the forum is decided by the{" "}
            <strong>value of the goods or services paid as consideration</strong> — not by the compensation you
            claim. Since the 2021 Jurisdiction Rules: up to <strong>₹50 lakh</strong> the District Commission;
            above that up to <strong>₹2 crore</strong> the State Commission at Patna; above ₹2 crore the National
            Commission. The fee comes from the Schedule to the Consumer Protection (Consumer Commissions) Rules,
            2020 — <strong>nil up to ₹5 lakh</strong>, rising to ₹7,500 above ₹10 crore. Rules as reviewed{" "}
            {CONSUMER_REVIEWED}.
          </p>
        </>
      }
      notes={[
        "The mistake self-filers make: claiming ₹20 lakh compensation over a ₹3 lakh purchase and filing at the State Commission. It is the ₹3 lakh that fixes the forum — the District Commission, with no fee.",
        `You may file where you live or work, not only where the seller is (s.34(2)(d)). A Vaishali resident files at Hajipur against a Delhi seller. The complaint must be filed within ${LIMITATION_YEARS} years of the cause of action (s.69).`,
        "Filing is online through e-Daakhil, with the fee paid electronically; a paper complaint at the Commission's office is still accepted. Advocates are not required, but a complaint with the wrong parties or no proof of deficiency is dismissed at admission.",
        "Before filing, complain to the company in writing and, for a quick nudge, to the National Consumer Helpline — the Commission expects to see that the trader was given a chance.",
        "Appeals need a deposit of 50% of the amount ordered, and the appeal periods are short: 45 days to the State Commission, 30 days onward.",
      ]}
    >
      <div className="calc">
        <div className="calc__inputs">
          <div className="field">
            <label htmlFor="consideration">What you paid for the goods or service (₹)</label>
            <input
              id="consideration"
              type="number"
              min="0"
              inputMode="numeric"
              value={consideration}
              onChange={(e) => setConsideration(e.target.value)}
              placeholder="e.g. 450000"
            />
            <span className="field__hint">The price, premium, fee or booking amount — not the loss you suffered or the compensation you want.</span>
          </div>
          <div className="field">
            <label htmlFor="district">Your district (where you live or work)</label>
            <select id="district" value={district} onChange={(e) => setDistrict(e.target.value)}>
              {districts.map((x) => (
                <option key={x.slug} value={x.slug}>
                  {x.district}
                  {x.hq !== x.district ? ` — ${x.hq}` : ""}
                </option>
              ))}
            </select>
          </div>

          <div className="authority">
            <Icon name="book" width={16} height={16} />
            <span>
              <strong>Fee slabs:</strong>{" "}
              {FEE_SLABS.map(([upTo, fee], i) => (
                <span key={upTo}>
                  {i > 0 && " · "}
                  {upTo === Infinity ? `above ${rupees(FEE_SLABS[i - 1][0])}` : `to ${rupees(upTo)}`}: {fee ? rupees(fee) : "nil"}
                </span>
              ))}
            </span>
          </div>
        </div>

        <div className={`calc__result ${r ? "" : "is-empty"}`}>
          {r ? (
            <>
              <span className="calc__label">File before</span>
              <strong className="calc__big calc__big--range">{r.forum.short}</strong>
              <span className="calc__sub">{r.where}</span>

              <dl className="calc__breakdown">
                <div>
                  <dt>Forum</dt>
                  <dd>{r.forum.name}</dd>
                </div>
                <div>
                  <dt>Because the consideration is</dt>
                  <dd>
                    {rupees(r.consideration)}
                    {r.forum.key === "district" ? " (≤ ₹50 lakh)" : r.forum.key === "state" ? " (₹50 lakh – ₹2 crore)" : " (> ₹2 crore)"}
                  </dd>
                </div>
                <div>
                  <dt>Fee slab</dt>
                  <dd>
                    {rupees(r.slab.from)} – {r.slab.upTo === Infinity ? "above" : rupees(r.slab.upTo)}
                  </dd>
                </div>
                <div className="calc__total">
                  <dt>Filing fee</dt>
                  <dd>{r.fee ? rupees(r.fee) : "Nil"}</dd>
                </div>
              </dl>

              <dl className="calc__breakdown calc__breakdown--aside">
                <div className="calc__asidehead">
                  <dt>Then</dt>
                  <dd />
                </div>
                <div>
                  <dt>Time limit</dt>
                  <dd>{LIMITATION_YEARS} years from the cause of action</dd>
                </div>
                <div>
                  <dt>Appeal from this forum</dt>
                  <dd style={{ textAlign: "left" }}>{r.forum.appeal}</dd>
                </div>
                <div>
                  <dt>Authority</dt>
                  <dd style={{ textAlign: "left" }}>{r.forum.authority}</dd>
                </div>
              </dl>

              <p className="calc__warn">
                <Icon name="zap" width={15} height={15} />
                File online at{" "}
                <a href={EDAAKHIL_URL} target="_blank" rel="noopener noreferrer" style={{ color: "#fff" }}>
                  e-Daakhil
                </a>
                . Quick complaints first to the National Consumer Helpline, {NCH_PHONE} or{" "}
                <a href={NCH_URL} target="_blank" rel="noopener noreferrer" style={{ color: "#fff" }}>
                  consumerhelpline.gov.in
                </a>
                .
              </p>
              <p className="calc__warn">
                <Icon name="briefcase" width={15} height={15} />
                The chamber drafts and files consumer complaints at the District Commission, Vaishali and the State Commission, Patna — insurance repudiation, builder delay, bank and e-commerce disputes.
              </p>
              <Link to="/checklists/consumer-complaint" className="btn btn--primary btn--block">
                Document checklist for the complaint <Icon name="arrow" width={17} height={17} />
              </Link>
            </>
          ) : (
            <>
              <Icon name="scales" width={30} height={30} />
              <p>Enter what you paid to see the forum and the fee.</p>
            </>
          )}
        </div>
      </div>
    </ToolShell>
  );
}
