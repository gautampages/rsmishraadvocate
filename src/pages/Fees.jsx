import { Link } from "react-router";
import PageHeader from "../components/PageHeader";
import Seo from "../components/Seo";
import Reveal from "../components/Reveal";
import ConsultCta from "../components/ConsultCta";
import FaqList from "../components/FaqList";
import { Icon } from "../components/Icons";
import {
  FEES_PUBLISHED,
  engagementTerms,
  feeFaqs,
  feeSchedule,
  feeScheduleNote,
  feesIntro,
  statutoryCosts,
} from "../data/fees";
import { absolute } from "../data/routes";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${absolute("/fees")}#faq`,
  mainEntity: feeFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Fees() {
  return (
    <>
      <Seo jsonLd={jsonLd} />
      <PageHeader
        eyebrow={feesIntro.eyebrow}
        title={feesIntro.title}
        intro={feesIntro.intro}
        crumbs={[{ label: "Fees" }]}
      />

      {/* ---- What the chamber charges for ---- */}
      <section className="section section--tight">
        <div className="container container--narrow">
          <div className="feegrid">
            {feeSchedule.map((f, i) => (
              <Reveal key={f.title} as="article" className="feecard" delay={i * 70}>
                <div className="feecard__head">
                  <h2>{f.title}</h2>
                  <span className={`feecard__amount ${FEES_PUBLISHED && f.amount ? "" : "is-onrequest"}`}>
                    {FEES_PUBLISHED && f.amount ? f.amount : "Quoted per matter"}
                    {FEES_PUBLISHED && f.amount && <em>{f.unit}</em>}
                  </span>
                </div>
                <p className="feecard__desc">{f.description}</p>
                <ul className="prose__list">
                  {f.includes.map((inc) => (
                    <li key={inc}>
                      <Icon name="check" width={16} height={16} />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>

          <p className="prose__note">
            <Icon name="alert" width={17} height={17} />
            <span>
              {FEES_PUBLISHED ? (
                <>
                  {feeScheduleNote} <Link to="/book">Book a consultation</Link> to get yours.
                </>
              ) : (
                <>
                  Fees depend on the forum, the stage and how much is genuinely in dispute, so they are
                  quoted for your matter rather than listed as a price list. You receive that quote in
                  writing after the consultation, and work begins only once it is agreed.{" "}
                  <Link to="/book">Book a consultation</Link> or call the chamber to ask.
                </>
              )}
            </span>
          </p>
        </div>
      </section>

      {/* ---- Statutory costs ---- */}
      <section className="section section--alt">
        <div className="container container--narrow">
          <Reveal className="section__head">
            <span className="eyebrow">Separate from professional fees</span>
            <h2 className="section__title">{statutoryCosts.title}</h2>
            <span className="section__rule section__rule--center" />
            <p className="section__subtitle">{statutoryCosts.intro}</p>
          </Reveal>

          <div className="statlist">
            {statutoryCosts.items.map((s) => (
              <div key={s.label} className="statlist__item">
                <div>
                  <strong>{s.label}</strong>
                  <p>{s.text}</p>
                </div>
                {s.tool && (
                  <Link to={s.tool} className="btn btn--sm btn--ghost">
                    {s.toolLabel} <Icon name="arrow" width={15} height={15} />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- How engagement works ---- */}
      <section className="section">
        <div className="container container--narrow">
          <Reveal className="section__head">
            <span className="eyebrow">Engagement</span>
            <h2 className="section__title">How this works</h2>
            <span className="section__rule section__rule--center" />
          </Reveal>

          <ol className="steps">
            {engagementTerms.map((t, i) => (
              <Reveal key={t.title} as="li" className="step" delay={i * 60}>
                <span className="step__num">{i + 1}</span>
                <div>
                  <strong className="step__title">{t.title}</strong>
                  <p className="step__desc">{t.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ---- FAQs ---- */}
      <section className="section section--alt">
        <div className="container container--narrow">
          <Reveal className="section__head">
            <span className="eyebrow">Questions</span>
            <h2 className="section__title">Questions about cost</h2>
            <span className="section__rule section__rule--center" />
          </Reveal>
          <FaqList items={feeFaqs} defaultOpen={-1} />
        </div>
      </section>

      <ConsultCta
        heading="Ask what your matter will cost"
        text="Describe the matter and you get an honest estimate — including where the chamber thinks litigation is not worth what it would cost you."
      />
    </>
  );
}
