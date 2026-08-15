import { useState } from "react";
import { Link } from "react-router";
import ToolShell from "../../components/ToolShell";
import { Icon } from "../../components/Icons";
import { LIMITATION_GROUPS, LIMITATION_ITEMS, computeDeadline } from "../../lib/legalTools";
import { formatISODate } from "../../lib/istTime";
import { faqsForTool } from "../../data/toolFaqs";

export default function Limitation() {
  const [key, setKey] = useState(LIMITATION_ITEMS[0].key);
  const [start, setStart] = useState("");

  const result = computeDeadline(key, start);
  const item = LIMITATION_ITEMS.find((i) => i.key === key);

  return (
    <ToolShell
      path="/tools/limitation-checker"
      faqs={faqsForTool("/tools/limitation-checker")}
      authority={
        <p>
          Periods are taken from the Schedule to the <strong>Limitation Act, 1963</strong>. Each head
          below names the Article it comes from and the event time runs from. Periods expressed in
          years are counted as calendar years from the starting date, which is how courts compute
          them.
        </p>
      }
      notes={[
        "The starting date is the crux, and this tool takes it from you rather than determining it. If the date time began to run is wrong, so is the deadline.",
        "Section 12 excludes the time requisite for obtaining a certified copy of the decree or order when computing the period for an appeal — so an appeal may still be in time even where this page shows it as expired.",
        "An acknowledgement of liability in writing (Section 18) or a part payment (Section 19) can start a fresh period running from the date of that acknowledgement.",
        "Delay in an appeal or application may be condoned under Section 5 for sufficient cause. That is not available for suits.",
        "Where the last day falls on a court holiday, Section 4 allows filing on the day the court reopens.",
      ]}
    >
      <div className="calc">
        <div className="calc__inputs">
          <div className="field">
            <label htmlFor="head">What are you filing?</label>
            <select id="head" value={key} onChange={(e) => setKey(e.target.value)}>
              {LIMITATION_GROUPS.map((g) => (
                <optgroup key={g} label={g}>
                  {LIMITATION_ITEMS.filter((i) => i.group === g).map((i) => (
                    <option key={i.key} value={i.key}>
                      {i.label} — {i.period}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="start">Date time began to run</label>
            <input
              id="start"
              type="date"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />
            <span className="field__hint">For this head, that is {item.from}.</span>
          </div>

          <div className="authority">
            <Icon name="book" width={16} height={16} />
            <span>
              <strong>{item.period}</strong> · {item.authority}
            </span>
          </div>
        </div>

        <div className={`calc__result ${result ? "" : "is-empty"}`}>
          {result ? (
            <>
              <span className="calc__label">Last date to file</span>
              <strong className="calc__big">{formatISODate(result.deadlineISO)}</strong>

              {result.expired ? (
                <p className="calc__flag calc__flag--danger">
                  <Icon name="alert" width={16} height={16} />
                  This period expired {Math.abs(result.daysLeft)} days ago. Do not assume the matter
                  is closed — ask about exclusion under Section 12 and condonation under Section 5.
                </p>
              ) : result.urgent ? (
                <p className="calc__flag calc__flag--danger">
                  <Icon name="alert" width={16} height={16} />
                  Only {result.daysLeft} day{result.daysLeft === 1 ? "" : "s"} remain. Speak to the
                  chamber now — drafting and certified copies take time.
                </p>
              ) : (
                <p className="calc__flag">
                  <Icon name="clock" width={16} height={16} />
                  {result.daysLeft} days remaining.
                </p>
              )}

              <dl className="calc__breakdown">
                <div>
                  <dt>Head of limitation</dt>
                  <dd>{item.label}</dd>
                </div>
                <div>
                  <dt>Period</dt>
                  <dd>{item.period}</dd>
                </div>
                <div>
                  <dt>Runs from</dt>
                  <dd>{formatISODate(result.startISO)}</dd>
                </div>
                <div className="calc__total">
                  <dt>Expires</dt>
                  <dd>
                    {formatISODate(result.deadlineISO, {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </dd>
                </div>
              </dl>

              {(result.expired || result.urgent) && (
                <Link to="/book" className="btn btn--primary btn--block">
                  Book an urgent consultation <Icon name="arrow" width={17} height={17} />
                </Link>
              )}
            </>
          ) : (
            <>
              <Icon name="clock" width={30} height={30} />
              <p>Choose the date time began to run to see your deadline.</p>
            </>
          )}
        </div>
      </div>
    </ToolShell>
  );
}
