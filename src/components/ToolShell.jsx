import { Link } from "react-router";
import PageHeader from "./PageHeader";
import Seo from "./Seo";
import ConsultCta from "./ConsultCta";
import FaqList from "./FaqList";
import { Icon } from "./Icons";
import { toolFor, tools } from "../data/tools";

/**
 * Chrome shared by every calculator: masthead, the calculator itself, the
 * "how this is worked out" note, FAQs, and links to the other tools.
 *
 * The `authority` block is not decoration. These pages put numbers in front
 * of people who may act on them, so each one states what rule it applied and
 * what it cannot know.
 */
export default function ToolShell({ path, children, authority, notes = [], faqs = [] }) {
  const tool = toolFor(path);
  const others = tools.filter((t) => t.path !== path);


  return (
    <>
      <Seo title={tool.seoTitle} description={tool.seoDescription} />
      <PageHeader
        eyebrow="Free Legal Tool"
        title={tool.name}
        intro={tool.description}
        crumbs={[{ label: "Legal Tools", to: "/tools" }, { label: tool.short }]}
      />

      <section className="section section--tight">
        <div className="container container--narrow">
          {children}

          <div className="toolnote">
            <h2>
              <Icon name="book" width={19} height={19} /> How this is worked out
            </h2>
            {authority}
            {notes.length > 0 && (
              <ul className="prose__list">
                {notes.map((n) => (
                  <li key={n.slice(0, 40)}>
                    <Icon name="alert" width={16} height={16} />
                    <span>{n}</span>
                  </li>
                ))}
              </ul>
            )}
            <p className="toolnote__disclaimer">
              This is an estimate for orientation, not a computation you can file on. Rates,
              exemptions and statutory periods change, and the figure that applies to your matter
              depends on facts this page cannot know.{" "}
              <Link to="/book">Confirm it with the chamber</Link> before you act on it.
            </p>
          </div>

          {faqs.length > 0 && (
            <div className="toolfaq">
              <h2 className="section__title" style={{ fontSize: "1.4rem", marginBottom: "18px" }}>
                Questions
              </h2>
              <FaqList items={faqs} defaultOpen={-1} />
            </div>
          )}

          <div className="toolother">
            <h2 className="section__title" style={{ fontSize: "1.3rem", marginBottom: "6px" }}>
              Other free tools
            </h2>
            <div className="linkcards">
              {others.map((t) => (
                <Link key={t.path} to={t.path} className="linkcard">
                  <span className="linkcard__icon">
                    <Icon name={t.icon} width={22} height={22} />
                  </span>
                  <div>
                    <strong>{t.short}</strong>
                    <span>{t.tagline}</span>
                  </div>
                  <Icon name="arrow" width={17} height={17} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ConsultCta
        heading="Need the real figure, not an estimate?"
        text="Bring your papers to the chamber and get the number that actually applies — along with what to do about it."
      />
    </>
  );
}
