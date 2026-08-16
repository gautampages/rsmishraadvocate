import { Link, useParams } from "react-router";
import PageHeader from "../components/PageHeader";
import Seo from "../components/Seo";
import ConsultCta from "../components/ConsultCta";
import FaqList from "../components/FaqList";
import { Icon } from "../components/Icons";
import NotFound from "./NotFound";
import { hindiBySlug } from "../data/hindi";
import { contact } from "../data/content";

/** Renders every /hi page from src/data/hindi.js. */
export default function HindiPage() {
  const { slug } = useParams();
  const page = hindiBySlug(slug);

  if (!page) return <NotFound />;

  return (
    <>
      <Seo title={page.seoTitle} description={page.seoDescription} />
      <PageHeader
        eyebrow={page.eyebrow}
        title={page.title}
        intro={page.intro}
        crumbs={[{ label: "हिन्दी", to: "/hi" }, ...(page.slug ? [{ label: page.eyebrow }] : [])]}
      >
        <div className="pagehead__actions">
          <Link to="/book" className="btn btn--primary">
            परामर्श बुक करें <Icon name="arrow" width={18} height={18} />
          </Link>
          <a href={`tel:${contact.phone.replace(/\s+/g, "")}`} className="btn btn--ghost">
            <Icon name="phone" width={17} height={17} /> {contact.phone}
          </a>
        </div>
      </PageHeader>

      <article className="section section--tight" lang="hi">
        <div className="container container--narrow prose prose--article">
          {page.sections.map((s) => (
            <section key={s.heading}>
              <h2>{s.heading}</h2>
              {s.paragraphs.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </section>
          ))}
          <p className="prose__note">
            <Icon name="alert" width={17} height={17} />
            <span>
              यह पृष्ठ सामान्य जानकारी देता है, क़ानूनी सलाह नहीं। आपके मामले में क्या सही है, यह
              काग़ज़ात और तथ्यों पर निर्भर करता है — <Link to="/book">परामर्श में पुष्टि करें</Link>।
            </span>
          </p>
        </div>
      </article>

      {page.links?.length > 0 && (
        <section className="section section--tight" lang="hi">
          <div className="container container--narrow">
            <h2 className="section__title" style={{ fontSize: "1.35rem" }}>
              आगे देखें
            </h2>
            <div className="linkcards">
              {page.links.map((l) => (
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
      )}

      <section className="section section--alt section--tight" lang="hi">
        <div className="container container--narrow">
          <h2 className="section__title" style={{ fontSize: "1.35rem" }}>
            अक्सर पूछे जाने वाले सवाल
          </h2>
          <FaqList items={page.faqs} defaultOpen={0} />
        </div>
      </section>

      <ConsultCta
        lang="hi"
        heading="हाजीपुर में चैंबर से बात करें"
        text="हर बात गोपनीय रहती है। अपना मामला बताइए — साफ़ शब्दों में जवाब मिलेगा कि केस बनता है या नहीं। चैंबर: रिलायंस टावर कैंपस, ईस्ट अनवरपुर, हाजीपुर (वैशाली)।"
        bookLabel="परामर्श बुक करें"
        callLabel=""
      />
    </>
  );
}
