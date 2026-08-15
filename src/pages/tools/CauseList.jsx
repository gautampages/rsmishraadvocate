import { Link } from "react-router";
import ToolShell from "../../components/ToolShell";
import { Icon } from "../../components/Icons";
import { CAUSE_LIST_LINKS, VAISHALI_COURT_COMPLEXES } from "../../lib/legalTools";

const FAQS = [
  {
    q: "What is a cause list?",
    a: "A cause list — also called the daily board — is the list of cases a particular court will take up on a particular day, in the order it will take them. It is published the previous evening or the same morning. If your case is not on the board, it is not being heard that day.",
  },
  {
    q: "How do I find my case on the Vaishali cause list?",
    a: "Open the eCourts cause list page, select Bihar as the State and Vaishali as the District, then choose the court complex and the specific court establishment, and the date. You can then search the published list for your case number or the party name. Having your CNR number to hand makes this considerably faster.",
  },
  {
    q: "Why can I not search the cause list on this website directly?",
    a: "eCourts publishes cause lists only through its own web portal — there is no public data interface for them, unlike case status which this site does fetch. Rather than scrape the portal, we link to it and show you exactly what to select. The next hearing date for a specific case is available here through the case tracker.",
  },
  {
    q: "The cause list shows my case but nothing happened. Why?",
    a: "Being listed does not guarantee a hearing. Matters are commonly adjourned because the presiding officer is on leave, the other side seeks time, a witness is absent, or the board simply does not reach your item before the court rises. The case status record is updated afterwards with the next date.",
  },
  {
    q: "Should I rely on the cause list or on my advocate?",
    a: "Both, and neither alone. The cause list is the court's own record of what it will take up, but dates move, listings are transferred between courts, and an item can be advanced. Always confirm with the advocate on record before travelling to court.",
  },
];

const STEPS = [
  {
    title: "Have your CNR number ready",
    text: "The 16-character CNR is printed on your case papers and never changes, even if the case number does. Everything is faster with it.",
  },
  {
    title: "Open the official eCourts cause list",
    text: "Select State: Bihar → District: Vaishali → then the court complex and the specific court establishment.",
  },
  {
    title: "Choose the date",
    text: "Cause lists are typically published the evening before. A list for a future date may not exist yet.",
  },
  {
    title: "Search the list for your case",
    text: "Use your browser's find function for the case number or a party name. The serial number tells you roughly when your matter will be reached.",
  },
];

export default function CauseList() {
  return (
    <ToolShell
      path="/tools/cause-list"
      faqs={FAQS}
      authority={
        <p>
          Cause lists are published by the judiciary through the{" "}
          <a href={CAUSE_LIST_LINKS.ecourtsCauseList} target="_blank" rel="noreferrer">
            eCourts portal
          </a>{" "}
          and the{" "}
          <a href={CAUSE_LIST_LINKS.vaishaliDistrictCourt} target="_blank" rel="noreferrer">
            District Court, Vaishali website
          </a>
          . Unlike case status, cause lists have no public data interface, so this page links to the
          official source and shows you what to select rather than reproducing the data here.
        </p>
      }
      notes={[
        "A cause list is the court's own record of what it intends to take up. Listings still move, and being on the board does not guarantee that your matter is reached.",
        "Never travel to court on the strength of a website alone. Confirm with the advocate on record.",
        "For the next hearing date in a specific case, the case tracker on this site reads it directly from the eCourts record.",
      ]}
    >
      <div className="causelist">
        <div className="causelist__primary">
          <h2>Go straight to the official list</h2>
          <div className="linkcards">
            <a
              href={CAUSE_LIST_LINKS.ecourtsCauseList}
              target="_blank"
              rel="noreferrer"
              className="linkcard"
            >
              <span className="linkcard__icon">
                <Icon name="calendar" width={22} height={22} />
              </span>
              <div>
                <strong>eCourts Cause List</strong>
                <span>All district courts — select Bihar → Vaishali</span>
              </div>
              <Icon name="arrow" width={17} height={17} />
            </a>

            <a
              href={CAUSE_LIST_LINKS.vaishaliDistrictCourt}
              target="_blank"
              rel="noreferrer"
              className="linkcard"
            >
              <span className="linkcard__icon">
                <Icon name="building" width={22} height={22} />
              </span>
              <div>
                <strong>District Court, Vaishali</strong>
                <span>Official website — daily board & notices</span>
              </div>
              <Icon name="arrow" width={17} height={17} />
            </a>

            <a
              href={CAUSE_LIST_LINKS.patnaHighCourt}
              target="_blank"
              rel="noreferrer"
              className="linkcard"
            >
              <span className="linkcard__icon">
                <Icon name="scales" width={22} height={22} />
              </span>
              <div>
                <strong>Patna High Court</strong>
                <span>For appeals and writ matters</span>
              </div>
              <Icon name="arrow" width={17} height={17} />
            </a>

            <Link to="/#case-status" className="linkcard">
              <span className="linkcard__icon">
                <Icon name="scan" width={22} height={22} />
              </span>
              <div>
                <strong>Check your next hearing date</strong>
                <span>Enter a CNR number on this site</span>
              </div>
              <Icon name="arrow" width={17} height={17} />
            </Link>
          </div>
        </div>

        <div className="causelist__steps">
          <h2>How to find your case</h2>
          <ol className="steps">
            {STEPS.map((s, i) => (
              <li key={s.title} className="step">
                <span className="step__num">{i + 1}</span>
                <div>
                  <strong className="step__title">{s.title}</strong>
                  <p className="step__desc">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="causelist__complexes">
          <h2>Court establishments in Vaishali district</h2>
          <p>
            Cause lists are published per establishment, so you need to know which one your matter is
            before. If you are unsure, the case tracker shows the court name against your CNR.
          </p>
          <ul className="prose__list">
            {VAISHALI_COURT_COMPLEXES.map((c) => (
              <li key={c}>
                <Icon name="check" width={16} height={16} />
                <span>{c}</span>
              </li>
            ))}
          </ul>
          <p className="prose__note">
            <Icon name="alert" width={17} height={17} />
            <span>
              This list is a guide to what you will see in the eCourts dropdown. Establishments are
              reorganised from time to time — the portal's own list is authoritative.
            </span>
          </p>
        </div>
      </div>
    </ToolShell>
  );
}
