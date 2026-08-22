import { useState } from "react";
import ToolShell from "../../components/ToolShell";
import { Icon } from "../../components/Icons";
import { LAND_UNITS, convertLand, formatArea, landUnit } from "../../lib/legalTools";
import { faqsForTool } from "../../data/toolFaqs";

export default function LandUnits() {
  const [value, setValue] = useState("");
  const [fromKey, setFromKey] = useState("katha");

  const result = convertLand(value, fromKey);
  const from = landUnit(fromKey);
  const t = result?.traditional;

  return (
    <ToolShell
      path="/tools/land-unit-converter"
      faqs={faqsForTool("/tools/land-unit-converter")}
      authority={
        <p>
          Conversions use the <strong>Patna / Vaishali (Hajipur) standard</strong>:{" "}
          <strong>1 katha = 1,361.25 sq ft = 3.125 decimal</strong>, with 1 bigha = 20 katha,
          1 katha = 20 dhur and 1 dhur = 20 dhurki. The revenue record itself — khatiyan,
          jamabandi, MVR, registered deeds — measures in <strong>acre–decimal</strong>{" "}
          (1 acre = 100 decimal = 43,560 sq ft), which is why every figure here is anchored to the
          decimal.
        </p>
      }
      notes={[
        "The katha is a customary unit, not a statutory one, and its size varies across Bihar — roughly 750 to 2,000 sq ft by district custom. The 1,361.25 sq ft standard used here holds for Vaishali (Hajipur), Patna and most of north and central Bihar; verify locally before relying on it elsewhere.",
        "The legally operative area of a plot is the decimal figure written in the deed and the khatiyan — not a conversion of what was said in katha. If the two disagree, the record wins.",
        "A converter cannot measure land. For the position on the ground, book a government amin measurement through the e-Mapi portal (emapi.bihar.gov.in) — and where a boundary or area dispute has already started, take advice before it hardens.",
      ]}
    >
      <div className="calc">
        <div className="calc__inputs">
          <div className="field">
            <label htmlFor="land-value">Area</label>
            <input
              id="land-value"
              type="number"
              min="0"
              step="any"
              inputMode="decimal"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="e.g. 5"
            />
          </div>

          <fieldset className="field">
            <legend>Unit</legend>
            <div className="chips">
              {LAND_UNITS.map((u) => (
                <button
                  key={u.key}
                  type="button"
                  aria-pressed={fromKey === u.key}
                  className={`chip ${fromKey === u.key ? "is-active" : ""}`}
                  onClick={() => setFromKey(u.key)}
                >
                  {u.label}
                  <em>{u.hindi}</em>
                </button>
              ))}
            </div>
          </fieldset>
        </div>

        <div className={`calc__result ${result ? "" : "is-empty"}`}>
          {result ? (
            <>
              <span className="calc__label">
                {formatArea(Number(value))} {from.label} ({from.hindi}) equals
              </span>
              <strong className="calc__big">{formatArea(result.sqft)} sq ft</strong>
              {(t.bigha > 0 || t.katha > 0) && (
                <span className="calc__sub">
                  Said the local way:{" "}
                  <strong>
                    {t.bigha > 0 && `${t.bigha} bigha `}
                    {t.katha > 0 && `${t.katha} katha `}
                    {t.dhur > 0 && `${formatArea(t.dhur)} dhur`}
                  </strong>
                </span>
              )}

              <dl className="calc__breakdown">
                {result.rows
                  .filter((r) => r.unit.key !== "sqft")
                  .map((r) => (
                    <div key={r.unit.key}>
                      <dt>
                        {r.unit.label} ({r.unit.hindi})
                      </dt>
                      <dd>{formatArea(r.amount)}</dd>
                    </div>
                  ))}
              </dl>

              <p className="calc__flag">
                <Icon name="alert" width={16} height={16} />
                Patna/Vaishali standard — the katha varies by district, and the deed&rsquo;s decimal
                figure is what legally counts.
              </p>
            </>
          ) : (
            <>
              <Icon name="sliders" width={30} height={30} />
              <p>Enter an area to convert it into every Bihar land unit.</p>
            </>
          )}
        </div>
      </div>
    </ToolShell>
  );
}
