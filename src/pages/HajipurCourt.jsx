import { Link } from "react-router";
import PageHeader from "../components/PageHeader";
import Seo from "../components/Seo";
import ConsultCta from "../components/ConsultCta";
import FaqList from "../components/FaqList";
import { Icon } from "../components/Icons";
import { courtGuide } from "../data/courtGuide";
import { contact } from "../data/content";

/** Guide page for the chamber's home court — /hajipur-civil-court. */
export default function HajipurCourt() {
  const g = courtGuide;

  return (
    <>
      <Seo title={g.seoTitle} description={g.seoDescription} />
      <PageHeader
        eyebrow={g.eyebrow}
        title={g.title}
        intro={g.intro}
        crumbs={[{ label: "Hajipur Civil Court" }]}
      >
        <div className="pagehead__actions">
          <Link to="/case-status/vaishali" className="btn btn--primary">
            Check a case at this court <Icon name="arrow" width={18} height={18} />
          </Link>
          <a href={`tel:${contact.phone.replace(/\s+/g, "")}`} className="btn btn--ghost">
            <Icon name="phone" width={17} height={17} /> {contact.phone}
          </a>
        </div>
      </PageHeader>

      <article className="section section--tight">
        <div className="container container--narrow prose prose--article">
          {g.sections.map((s) => (
            <section key={s.heading}>
              <h2>{s.heading}</h2>
              {s.paragraphs.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </section>
          ))}
        </div>
      </article>

      <section className="section section--tight">
        <div className="container container--narrow">
          <h2 className="section__title" style={{ fontSize: "1.35rem" }}>
            For court users
          </h2>
          <div className="linkcards">
            {g.links.map((l) => (
              <Link key={l.to} to={l.to} className="linkcard">
                <span className="linkcard__icon">
                  <Icon name={l.icon} width={22} height={22} />
                </span>
                <div>
                  <strong>{l.label}</strong>
                  <span>{l.note}</span>
                </div>
                <Icon name="arrow" width={17} height={17} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt section--tight">
        <div className="container container--narrow">
          <h2 className="section__title" style={{ fontSize: "1.35rem" }}>
            Common questions
          </h2>
          <FaqList items={g.faqs} defaultOpen={0} />
        </div>
      </section>

      <ConsultCta
        heading="Have a matter before the courts at Hajipur?"
        text="The chamber is minutes from the court complex and has appeared before it for 28+ years. Bring your papers and get a plain answer on where you stand and what to do next."
      />
    </>
  );
}
