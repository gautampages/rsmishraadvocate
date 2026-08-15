import { Link, useParams } from "react-router";
import PageHeader from "../components/PageHeader";
import Seo from "../components/Seo";
import Reveal from "../components/Reveal";
import ConsultCta from "../components/ConsultCta";
import FaqList from "../components/FaqList";
import { Icon } from "../components/Icons";
import NotFound from "./NotFound";
import { practiceAreas, practiceBySlug } from "../data/practice";
import { absolute } from "../data/routes";
import { contact } from "../data/content";

export default function PracticeArea() {
  const { slug } = useParams();
  const area = practiceBySlug(slug);

  if (!area) return <NotFound />;

  const others = practiceAreas.filter((p) => p.slug !== slug);
  const url = absolute(`/practice/${area.slug}`);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: area.title,
        serviceType: area.short,
        description: area.seoDescription,
        url,
        provider: { "@id": "https://ramsnehimishra.in/#organization" },
        areaServed: [
          { "@type": "City", name: "Hajipur" },
          { "@type": "AdministrativeArea", name: "Vaishali" },
          { "@type": "State", name: "Bihar" },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: area.title,
          itemListElement: area.handles.map((h) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: h.title, description: h.desc },
          })),
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: area.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absolute("/") },
          { "@type": "ListItem", position: 2, name: "Practice Areas", item: absolute("/#services") },
          { "@type": "ListItem", position: 3, name: area.short, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <Seo title={area.seoTitle} description={area.seoDescription} jsonLd={jsonLd} />
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
