import { Link } from "react-router";
import PageHeader from "../components/PageHeader";
import Seo from "../components/Seo";
import AskAI from "../components/AskAI";
import ConsultCta from "../components/ConsultCta";
import FaqList from "../components/FaqList";
import { Icon } from "../components/Icons";
import { practiceAreas } from "../data/practice";
import { askFaqs } from "../data/content";

// What the assistant is for, and — more usefully — what it is not for. A page
// that only sells the feature gets asked questions it cannot answer.
const GOOD_AT = [
  "What a legal term or a section number actually means",
  "The procedure a matter of this kind normally follows",
  "Which documents are usually needed, and why",
  "Roughly how long a stage takes and what happens next",
  "What your general rights are under Indian law",
  "Which forum — police, magistrate, civil court, consumer commission — a complaint goes to",
];

const NOT_FOR = [
  "Advice on your specific case, which depends on facts and papers it cannot see",
  "Anything confidential — do not paste names, case numbers or documents",
  "Predicting an outcome, or what a particular judge will do",
  "Anything time-critical: a limitation date or a bail application needs an advocate now, not a chat",
];

export default function Ask() {
  return (
    <>
      <Seo />
      <PageHeader
        eyebrow="AI Legal Assistant"
        title="Ask a Legal Question — Free, Instant, in Plain Words"
        intro="Type any question about Indian law and get a clear explanation in English or Hindi, at any hour. Divorce and maintenance, property and land records, FIR and bail, cheque bounce, consumer complaints — explained the way they would be explained across a desk, without the jargon."
        meta="Free · No sign-up · General legal information, not legal advice"
        crumbs={[{ label: "Ask a Legal Question" }]}
      />

      {/* Heading overridden so it does not simply repeat the <h1> above it. */}
      <AskAI
        eyebrow={null}
        heading="Start with a question"
        subtext="Ask in English or Hindi, in whatever words come naturally. There is no form to fill in and nothing to sign up for."
      />

      <section className="section section--tight">
        <div className="container container--narrow">
          <div className="twocol">
            <div>
              <h2 className="section__title" style={{ fontSize: "1.3rem" }}>
                What it answers well
              </h2>
              <ul className="prose__list">
                {GOOD_AT.map((g) => (
                  <li key={g}>
                    <Icon name="check" width={16} height={16} />
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="section__title" style={{ fontSize: "1.3rem" }}>
                What it is not for
              </h2>
              <ul className="prose__list">
                {NOT_FOR.map((n) => (
                  <li key={n}>
                    <Icon name="alert" width={16} height={16} />
                    <span>{n}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="prose__note" style={{ marginTop: "26px" }}>
            <Icon name="shield" width={17} height={17} />
            <span>
              General legal information is not legal advice, and using this assistant does not make
              you a client of the chamber. Please do not share confidential details here. When the
              answer matters,{" "}
              <Link to="/book">book a consultation</Link> and have it looked at properly.
            </span>
          </p>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container container--narrow">
          <h2 className="section__title" style={{ fontSize: "1.4rem", marginBottom: "18px" }}>
            Free legal help — the honest picture
          </h2>
          <FaqList items={askFaqs} defaultOpen={0} />
        </div>
      </section>

      <section className="section section--alt section--tight">
        <div className="container container--narrow">
          <h2 className="section__title" style={{ fontSize: "1.3rem" }}>
            Would rather read than ask?
          </h2>
          <div className="linkcards">
            {practiceAreas.map((p) => (
              <Link key={p.slug} to={`/practice/${p.slug}`} className="linkcard">
                <span className="linkcard__icon">
                  <Icon name={p.icon} width={22} height={22} />
                </span>
                <div>
                  <strong>{p.short}</strong>
                  <span>{p.title}</span>
                </div>
                <Icon name="arrow" width={17} height={17} />
              </Link>
            ))}
            <Link to="/case-status" className="linkcard">
              <span className="linkcard__icon">
                <Icon name="scan" width={22} height={22} />
              </span>
              <div>
                <strong>Check a case status</strong>
                <span>Next hearing date and orders, by CNR or party name</span>
              </div>
              <Icon name="arrow" width={17} height={17} />
            </Link>
            <Link to="/checklists" className="linkcard">
              <span className="linkcard__icon">
                <Icon name="doc" width={22} height={22} />
              </span>
              <div>
                <strong>Document checklists</strong>
                <span>What to gather, as a free PDF</span>
              </div>
              <Icon name="arrow" width={17} height={17} />
            </Link>
          </div>
        </div>
      </section>

      <ConsultCta
        heading="An answer is not advice"
        text="The assistant explains how the law generally works. What it means for your matter depends on your papers and your dates — bring both to the chamber at Hajipur (Vaishali)."
      />
    </>
  );
}
