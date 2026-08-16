import { Link, useParams } from "react-router";
import PageHeader from "../components/PageHeader";
import Seo from "../components/Seo";
import Reveal from "../components/Reveal";
import CaseTracker from "../components/CaseTracker";
import FaqList from "../components/FaqList";
import ConsultCta from "../components/ConsultCta";
import { Icon } from "../components/Icons";
import NotFound from "./NotFound";
import {
  DIVISIONS,
  ECOURTS,
  courtName,
  districtBySlug,
  nearbyDistricts,
  placeLabel,
} from "../data/courts";
import { districtFaqs } from "../data/caseStatus";
import { contact } from "../data/content";

export default function CaseStatusDistrict() {
  const { slug } = useParams();
  const d = districtBySlug(slug);

  if (!d) return <NotFound />;

  const nearby = nearbyDistricts(d);
  const place = placeLabel(d);
  const nameDiffers = d.hq !== d.district;

  return (
    <>
      <Seo />
      <PageHeader
        eyebrow="Case Status"
        title={`${d.district} District Court — Case Status Online`}
        intro={`Check the status of any case before the ${courtName(d)}. Search by CNR number, by the name of a party, or by the advocate on record, and see the next hearing date, the stage the case has reached, the full hearing history and the orders on file.`}
        meta={`${DIVISIONS[d.division]} · Free · No registration · Live eCourts records`}
        crumbs={[{ label: "Case Status", to: "/case-status" }, { label: place }]}
      />

      <CaseTracker showHead={false} id="track" />

      <section className="section section--tight">
        <div className="container container--narrow prose">
          <p>{d.lead}</p>

          {nameDiffers && (
            <p className="prose__note">
              <Icon name="alert" width={17} height={17} />
              <span>
                <strong>Search under {d.district}, not {d.hq}.</strong> The court complex is at{" "}
                {d.hq}, but eCourts records index it under the district name — {d.district}. A
                search that selects {d.hq} as the district will return nothing, and this is the
                most common reason people conclude, wrongly, that their case is not on record.
              </span>
            </p>
          )}

          <h2>Checking a {d.district} case, step by step</h2>
          <ol className="prose__steps">
            <li>
              <strong>Find your CNR.</strong> The 16-character CNR number is printed on your filing
              receipt, on the first page of most orders, and against your case in the cause list.
              It is permanent and unique across India, so it is the fastest and most reliable route.
            </li>
            <li>
              <strong>Enter it above.</strong> Type or paste it into the search box on this page and
              choose <em>CNR number</em>. Spaces and case do not matter.
            </li>
            <li>
              <strong>No CNR? Search by name.</strong> Switch to <em>Party name</em> and enter the
              petitioner, respondent, complainant or accused as the name appears on the papers. If
              nothing comes back, try a shorter fragment — records store names exactly as they were
              typed at filing, initials and misspellings included.
            </li>
            <li>
              <strong>Still nothing? Try the advocate.</strong> Every case carries the name of the
              advocate on record. Searching that name will usually surface the file even when the
              party name has been recorded differently.
            </li>
          </ol>

          <h2>Which court hears a {d.district} matter</h2>
          <p>
            The district judiciary for {d.district} sits at {d.hq}: the District & Sessions Court,
            the courts of the civil judges, the judicial magistrates, and the Family Court where
            one has been established. {d.district} falls within the {DIVISIONS[d.division]} of
            Bihar. Appeals and revisions from the district judiciary lie to the{" "}
            <a href={ECOURTS.highCourt} target="_blank" rel="noreferrer noopener">
              Patna High Court
            </a>
            , which has its own case numbering — so a matter that has gone up on appeal will have
            both a district case number and a High Court one.
          </p>
          <p>
            Where a case has been transferred between courts, the case number changes but the CNR
            does not. That is exactly what the CNR exists for, and it is why it is worth writing
            down once and keeping.
          </p>

          <h2>What it costs to file at {d.hq}</h2>
          <p>
            Court fee in Bihar is ad valorem — it rises with the value of the claim, at ₹80 for
            every ₹5,000 of value or part of it, up to a ceiling of ₹50,000. That is a statutory
            levy payable to the State and is separate from any advocate's fee. Two free
            calculators on this site work out the usual figures:
          </p>
          <div className="linkcards">
            <Link to="/tools/court-fee-calculator" className="linkcard">
              <span className="linkcard__icon">
                <Icon name="scales" width={22} height={22} />
              </span>
              <div>
                <strong>Court Fee Calculator</strong>
                <span>Ad valorem fee on a civil suit in Bihar, with the slab breakdown</span>
              </div>
              <Icon name="arrow" width={17} height={17} />
            </Link>
            <Link to="/tools/stamp-duty-calculator" className="linkcard">
              <span className="linkcard__icon">
                <Icon name="home" width={22} height={22} />
              </span>
              <div>
                <strong>Stamp Duty & Registration Calculator</strong>
                <span>Bihar rates by gender of the parties, computed against the MVR</span>
              </div>
              <Icon name="arrow" width={17} height={17} />
            </Link>
            <Link to="/tools/limitation-checker" className="linkcard">
              <span className="linkcard__icon">
                <Icon name="clock" width={22} height={22} />
              </span>
              <div>
                <strong>Limitation Period Checker</strong>
                <span>Whether there is still time to file the suit, appeal or application</span>
              </div>
              <Icon name="arrow" width={17} height={17} />
            </Link>
            <a href={ECOURTS.causeList} target="_blank" rel="noreferrer noopener" className="linkcard">
              <span className="linkcard__icon">
                <Icon name="calendar" width={22} height={22} />
              </span>
              <div>
                <strong>Daily cause list for {place}</strong>
                <span>The official board — select Bihar, then {d.district}</span>
              </div>
              <Icon name="arrow" width={17} height={17} />
            </a>
          </div>
        </div>
      </section>

      <section className="section section--alt section--tight">
        <div className="container container--narrow">
          <Reveal className="section__head">
            <span className="eyebrow">Questions</span>
            <h2 className="section__title">{d.district} case status — common questions</h2>
            <span className="section__rule section__rule--center" />
          </Reveal>
          <FaqList items={districtFaqs(d)} />
        </div>
      </section>

      <ConsultCta
        heading={
          d.home
            ? "This is the chamber's home court"
            : `Have a ${d.district} matter you want an honest view on?`
        }
        text={
          d.home
            ? `Advocate Ram Snehi Mishra has appeared before the courts at Hajipur for 28+ years, across criminal, civil, family and property matters. Call ${contact.phone} or book a consultation.`
            : "A first conversation is confidential and costs nothing to arrange. Bring whatever papers you have — even incomplete ones — and get a straight view of where you stand. The chamber sits at Hajipur (by the Vaishali district court), with appeals and writs at the Patna High Court."
        }
      />

      <section className="section section--tight">
        <div className="container container--narrow">
          <h2 className="section__title" style={{ fontSize: "1.3rem" }}>
            Nearby districts in the {DIVISIONS[d.division]}
          </h2>
          <div className="linkcards">
            {nearby.map((n) => (
              <Link key={n.slug} to={`/case-status/${n.slug}`} className="linkcard">
                <span className="linkcard__icon">
                  <Icon name="scan" width={22} height={22} />
                </span>
                <div>
                  <strong>{placeLabel(n)}</strong>
                  <span>{courtName(n)}</span>
                </div>
                <Icon name="arrow" width={17} height={17} />
              </Link>
            ))}
          </div>
          <p className="pagehead__meta">
            <Link to="/case-status">← All thirty-eight districts of Bihar</Link>
          </p>
        </div>
      </section>
    </>
  );
}
