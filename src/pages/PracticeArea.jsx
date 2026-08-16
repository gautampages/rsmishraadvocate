import { Link, useParams } from "react-router";
import PageHeader from "../components/PageHeader";
import Seo from "../components/Seo";
import Reveal from "../components/Reveal";
import ConsultCta from "../components/ConsultCta";
import FaqList from "../components/FaqList";
import { Icon } from "../components/Icons";
import NotFound from "./NotFound";
import { practiceAreas, practiceBySlug } from "../data/practice";
import { topics as caseLawTopics } from "../data/caseLaw";
import { contact } from "../data/content";

export default function PracticeArea() {
  const { slug } = useParams();
  const area = practiceBySlug(slug);

  if (!area) return <NotFound />;

  const others = practiceAreas.filter((p) => p.slug !== slug);
  // Derived rather than duplicated: each case-law topic already names the
  // practice page it belongs to, so the link back needs no second mapping.
  const caseLaw = caseLawTopics.filter((t) => t.related === `/practice/${slug}`);

  return (
    <>
      <Seo title={area.seoTitle} description={area.seoDescription} />
      <PageHeader
        eyebrow="Practice Area"
        title={area.title}
        intro={area.intro}
        crumbs={[{ label: "Practice Areas", to: "/#services" }, { label: area.short }]}
      >
        <div className="pagehead__actions">
          <Link to="/book" className="btn btn--primary">
            Book a consultation <Icon name="arrow" width={18} height={18} />
          </Link>
          <a href={`tel:${contact.phone.replace(/\s+/g, "")}`} className="btn btn--ghost">
            <Icon name="phone" width={17} height={17} /> {contact.phone}
          </a>
        </div>
      </PageHeader>

      <section className="section section--tight">
        <div className="container container--narrow prose">
          {area.overview.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
          <p className="prose__note">
            <Icon name="pin" width={17} height={17} />
            <span>{area.localNote}</span>
          </p>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <Reveal className="section__head">
            <span className="eyebrow">Scope</span>
            <h2 className="section__title">What this chamber handles</h2>
            <span className="section__rule section__rule--center" />
          </Reveal>

          <div className="svc__areas">
            {area.handles.map((h, i) => (
              <Reveal key={h.title} as="article" className="subarea" delay={i * 70}>
                <h3 className="subarea__title">{h.title}</h3>
                <p className="subarea__desc">{h.desc}</p>
                <ul className="subarea__points">
                  {h.points.map((p) => (
                    <li key={p}>
                      <Icon name="check" width={16} height={16} />
                      {p}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container container--narrow">
          <Reveal className="section__head">
            <span className="eyebrow">Questions</span>
            <h2 className="section__title">Common questions</h2>
            <span className="section__rule section__rule--center" />
          </Reveal>
          <FaqList items={area.faqs} />
        </div>
      </section>

      <ConsultCta
        heading={`Discuss your ${area.short.toLowerCase()} matter`}
        text="A first conversation is confidential and costs nothing to arrange. Bring whatever papers you have — even incomplete ones."
      />

      {caseLaw.length > 0 && (
        <section className="section section--tight">
          <div className="container container--narrow">
            <h2 className="section__title" style={{ fontSize: "1.4rem" }}>
              The case law on this
            </h2>
            <p className="pagehead__meta" style={{ margin: "6px 0 0" }}>
              What the Supreme Court and the High Courts have decided, with the full text free to
              read.
            </p>
            <div className="linkcards">
              {caseLaw.map((t) => (
                <Link key={t.slug} to={`/case-law/${t.slug}`} className="linkcard">
                  <span className="linkcard__icon">
                    <Icon name="book" width={22} height={22} />
                  </span>
                  <div>
                    <strong>{t.short}</strong>
                    <span>{t.title}</span>
                  </div>
                  <Icon name="arrow" width={17} height={17} />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section section--alt section--tight">
        <div className="container container--narrow">
          <h2 className="section__title" style={{ fontSize: "1.4rem" }}>Other practice areas</h2>
          <div className="linkcards">
            {others.map((o) => (
              <Link key={o.slug} to={`/practice/${o.slug}`} className="linkcard">
                <span className="linkcard__icon">
                  <Icon name={o.icon} width={22} height={22} />
                </span>
                <div>
                  <strong>{o.short}</strong>
                  <span>{o.title}</span>
                </div>
                <Icon name="arrow" width={17} height={17} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
