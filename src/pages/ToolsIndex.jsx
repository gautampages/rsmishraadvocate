import { Link } from "react-router";
import PageHeader from "../components/PageHeader";
import Seo from "../components/Seo";
import Reveal from "../components/Reveal";
import ConsultCta from "../components/ConsultCta";
import { Icon } from "../components/Icons";
import { tools } from "../data/tools";
import { absolute } from "../data/routes";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Free legal tools",
  itemListElement: tools.map((t, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: t.name,
    url: absolute(t.path),
  })),
};

export default function ToolsIndex() {
  return (
    <>
      <Seo jsonLd={jsonLd} />
      <PageHeader
        eyebrow="Free Tools"
        title="Legal Calculators & Lookups"
        intro="Practical tools for people dealing with a court or a registry office in Bihar — what a registration will cost, what court fee to expect, what a maintenance claim is likely to be worth, and whether you are still in time to file."
        crumbs={[{ label: "Legal Tools" }]}
      >
        <p className="pagehead__meta">
          Everything here runs inside your browser. No figure you enter is sent anywhere.
        </p>
      </PageHeader>

      <section className="section section--tight">
        <div className="container">
          <div className="toolgrid">
            {tools.map((t, i) => (
              <Reveal key={t.path} delay={i * 70}>
                <Link to={t.path} className="toolcard">
                  <span className="toolcard__icon">
                    <Icon name={t.icon} width={26} height={26} />
                  </span>
                  <h2 className="toolcard__title">{t.short}</h2>
                  <p className="toolcard__tagline">{t.tagline}</p>
                  <p className="toolcard__desc">{t.description}</p>
                  <span className="card__link">
                    Open the tool <Icon name="arrow" width={15} height={15} />
                  </span>
                </Link>
              </Reveal>
            ))}

            <Reveal delay={tools.length * 70}>
              <Link to="/checklists" className="toolcard toolcard--alt">
                <span className="toolcard__icon">
                  <Icon name="doc" width={26} height={26} />
                </span>
                <h2 className="toolcard__title">Document Checklists</h2>
                <p className="toolcard__tagline">What to gather, before you need it</p>
                <p className="toolcard__desc">
                  Free PDF checklists of the documents to gather for a mutual consent divorce, a
                  criminal matter, a property purchase or dispute, and a consumer complaint.
                </p>
                <span className="card__link">
                  View checklists <Icon name="arrow" width={15} height={15} />
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <ConsultCta
        heading="An estimate is not advice"
        text="These tools tell you roughly where you stand. What to do about it depends on your papers and your dates — bring both to the chamber."
      />
    </>
  );
}
