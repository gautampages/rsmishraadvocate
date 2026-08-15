import { Link } from "react-router";
import PageHeader from "../components/PageHeader";
import Seo from "../components/Seo";
import Reveal from "../components/Reveal";
import ConsultCta from "../components/ConsultCta";
import { Icon } from "../components/Icons";
import { checklists } from "../data/checklists";
import { absolute } from "../data/routes";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Legal document checklists",
  itemListElement: checklists.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.title,
    url: absolute(`/checklists/${c.slug}`),
  })),
};

export default function Checklists() {
  return (
    <>
      <Seo jsonLd={jsonLd} />
      <PageHeader
        eyebrow="Free Resources"
        title="Document Checklists"
        intro="What to gather before you file, before you buy, or before you walk into a chamber. Every checklist is free to download as a PDF, or tick through it here in your browser."
        crumbs={[{ label: "Checklists" }]}
      />

      <section className="section section--tight">
        <div className="container">
          <div className="toolgrid">
            {checklists.map((c, i) => (
              <Reveal key={c.slug} delay={i * 70}>
                <article className="toolcard">
                  <span className="toolcard__icon">
                    <Icon name={c.icon} width={26} height={26} />
                  </span>
                  <h2 className="toolcard__title">
                    <Link to={`/checklists/${c.slug}`}>{c.short}</Link>
                  </h2>
                  <p className="toolcard__tagline">{c.tagline}</p>
                  <p className="toolcard__desc">{c.intro}</p>
                  <div className="toolcard__actions">
                    <a href={c.pdf} download className="btn btn--sm btn--primary">
                      <Icon name="download" width={15} height={15} /> PDF
                    </a>
                    <Link to={`/checklists/${c.slug}`} className="card__link">
                      Open checklist <Icon name="arrow" width={15} height={15} />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ConsultCta
        heading="Not sure which papers apply to you?"
        text="Bring whatever you have, even if it is incomplete. Half the work of a first consultation is telling you what is missing."
      />
    </>
  );
}
