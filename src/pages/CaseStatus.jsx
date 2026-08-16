import { Link } from "react-router";
import PageHeader from "../components/PageHeader";
import Seo from "../components/Seo";
import Reveal from "../components/Reveal";
import CaseTracker from "../components/CaseTracker";
import FaqList from "../components/FaqList";
import ConsultCta from "../components/ConsultCta";
import { Icon } from "../components/Icons";
import { DIVISIONS, ECOURTS, districts, placeLabel } from "../data/courts";
import { hub, hubFaqs, identifiers, readingResults } from "../data/caseStatus";

// Districts grouped by revenue division — a list of thirty-eight links is a
// wall; nine groups of three to six is something a person can actually scan.
const byDivision = Object.keys(DIVISIONS).map((key) => ({
  key,
  name: DIVISIONS[key],
  items: districts.filter((d) => d.division === key),
}));

export default function CaseStatus() {
  return (
    <>
      <Seo />
      <PageHeader
        eyebrow={hub.eyebrow}
        title={hub.title}
        intro={hub.intro}
        meta={hub.meta}
        crumbs={[{ label: "Case Status" }]}
      />

      <CaseTracker showHead={false} id="track" />

      {/* ---- What you need to search with ---- */}
      <section className="section section--tight">
        <div className="container container--narrow">
          <Reveal className="section__head section__head--left">
            <span className="eyebrow">Before you search</span>
            <h2 className="section__title">What identifies a case</h2>
            <span className="section__rule" />
            <p className="section__subtitle">
              Four things can find a case in the court's records. Any one of them is enough, and
              they are not equally reliable — this is the order to try them in.
            </p>
          </Reveal>

          <div className="idgrid">
            {identifiers.map((it, i) => (
              <Reveal key={it.title} as="article" className="idcard" delay={i * 60}>
                <span className="idcard__icon">
                  <Icon name={it.icon} width={22} height={22} />
                </span>
                <h3>{it.title}</h3>
                <p className="idcard__lead">{it.lead}</p>
                <p>{it.text}</p>
                <p className="idcard__where">
                  <Icon name="pin" width={15} height={15} />
                  <span>{it.where}</span>
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- What the result tells you ---- */}
      <section className="section section--alt section--tight">
        <div className="container container--narrow">
          <Reveal className="section__head section__head--left">
            <span className="eyebrow">Reading the result</span>
            <h2 className="section__title">What the record shows</h2>
            <span className="section__rule" />
          </Reveal>

          <div className="linkcards linkcards--static">
            {readingResults.map((r) => (
              <div key={r.title} className="linkcard linkcard--plain">
                <span className="linkcard__icon">
                  <Icon name={r.icon} width={22} height={22} />
                </span>
                <div>
                  <strong>{r.title}</strong>
                  <span>{r.text}</span>
                </div>
              </div>
            ))}
          </div>

          <p className="prose__note" style={{ marginTop: "24px" }}>
            <Icon name="alert" width={17} height={17} />
            <span>
              A record is not a substitute for the file. Orders are uploaded after the day's
              business and can lag; an entry that reads "disposed" may be a settlement, a
              withdrawal or a dismissal for default, which are very different outcomes. If
              anything on the record matters to a decision you are about to take,{" "}
              <Link to="/book">have it read properly</Link>.
            </span>
          </p>
        </div>
      </section>

      {/* ---- District directory ---- */}
      <section className="section section--tight" id="districts">
        <div className="container">
          <Reveal className="section__head">
            <span className="eyebrow">Bihar</span>
            <h2 className="section__title">Case status by district court</h2>
            <span className="section__rule section__rule--center" />
            <p className="section__subtitle">
              All thirty-eight districts of Bihar, grouped by revenue division. Each page explains
              where that district's judiciary actually sits — which is not always the town the
              district is named after — and searches the same live records.
            </p>
          </Reveal>

          <div className="divgrid">
            {byDivision.map((div, i) => (
              <Reveal key={div.key} as="div" className="divcard" delay={i * 40}>
                <h3 className="divcard__title">{div.name}</h3>
                <ul className="divcard__list">
                  {div.items.map((d) => (
                    <li key={d.slug}>
                      <Link to={`/case-status/${d.slug}`}>
                        {placeLabel(d)}
                        <Icon name="arrow" width={13} height={13} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Official sources ---- */}
      <section className="section section--alt section--tight">
        <div className="container container--narrow">
          <h2 className="section__title" style={{ fontSize: "1.35rem" }}>
            Official sources
          </h2>
          <p className="prose" style={{ marginTop: "8px" }}>
            This tracker reads public records published by the judiciary. Where you need the
            authoritative page itself — to download a certified copy, or to check a daily board —
            go directly to the source:
          </p>
          <div className="linkcards">
            <a href={ECOURTS.caseStatus} target="_blank" rel="noreferrer noopener" className="linkcard">
              <span className="linkcard__icon">
                <Icon name="scales" width={22} height={22} />
              </span>
              <div>
                <strong>eCourts case status portal</strong>
                <span>The judiciary's own case-status service, for all district courts</span>
              </div>
              <Icon name="arrow" width={17} height={17} />
            </a>
            <a href={ECOURTS.causeList} target="_blank" rel="noreferrer noopener" className="linkcard">
              <span className="linkcard__icon">
                <Icon name="calendar" width={22} height={22} />
              </span>
              <div>
                <strong>eCourts daily cause lists</strong>
                <span>The board of cases each court will take up on a given day</span>
              </div>
              <Icon name="arrow" width={17} height={17} />
            </a>
            <a href={ECOURTS.highCourt} target="_blank" rel="noreferrer noopener" className="linkcard">
              <span className="linkcard__icon">
                <Icon name="gavel" width={22} height={22} />
              </span>
              <div>
                <strong>Patna High Court</strong>
                <span>High Court matters carry their own numbering and portal</span>
              </div>
              <Icon name="arrow" width={17} height={17} />
            </a>
            <Link to="/tools/cause-list" className="linkcard">
              <span className="linkcard__icon">
                <Icon name="calendar" width={22} height={22} />
              </span>
              <div>
                <strong>How to read a cause list</strong>
                <span>Finding your case on the Vaishali and Hajipur daily board</span>
              </div>
              <Icon name="arrow" width={17} height={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* ---- FAQ ---- */}
      <section className="section section--tight">
        <div className="container container--narrow">
          <Reveal className="section__head">
            <span className="eyebrow">Questions</span>
            <h2 className="section__title">Case status: common questions</h2>
            <span className="section__rule section__rule--center" />
          </Reveal>
          <FaqList items={hubFaqs} />
        </div>
      </section>

      <ConsultCta
        heading="The record says pending. What does that mean for you?"
        text="A case number and a next date tell you where a file sits, not what to do about it. Bring the papers to the chamber at Hajipur (Vaishali) and get a straight answer on your position and your options."
      />
    </>
  );
}
