import { Link } from "react-router";
import PageHeader from "./PageHeader";
import Seo from "./Seo";
import { Icon } from "./Icons";
import { POLICY_UPDATED } from "../data/legal";
import { contact } from "../data/content";

const SIBLINGS = [
  { to: "/privacy-policy", label: "Privacy Policy" },
  { to: "/terms", label: "Terms of Use" },
  { to: "/disclaimer", label: "Disclaimer" },
];

/** Renders one policy document from the structured data in src/data/legal.js. */
export default function LegalDoc({ doc, path }) {
  return (
    <>
      <Seo />
      <PageHeader
        eyebrow={doc.eyebrow}
        title={doc.title}
        intro={doc.intro}
        meta={`Last updated: ${POLICY_UPDATED}`}
        crumbs={[{ label: doc.title }]}
      />

      <section className="section section--tight">
        <div className="container container--narrow prose">
          {doc.sections.map((s) => (
            <section key={s.heading} className="prose__block">
              <h2>{s.heading}</h2>
              {s.paragraphs?.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
              {s.list && (
                <ul className="prose__list">
                  {s.list.map((item) => (
                    <li key={item.slice(0, 40)}>
                      <Icon name="check" width={16} height={16} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
              {s.note && (
                <p className="prose__note">
                  <Icon name="alert" width={17} height={17} />
                  <span>{s.note}</span>
                </p>
              )}
            </section>
          ))}

          <div className="prose__foot">
            <p>
              Questions about this document? Write to{" "}
              <a href={`mailto:${contact.email}`}>{contact.email}</a> or call{" "}
              <a href={`tel:${contact.phone.replace(/\s+/g, "")}`}>{contact.phone}</a>.
            </p>
            <nav className="prose__siblings">
              {SIBLINGS.filter((s) => s.to !== path).map((s) => (
                <Link key={s.to} to={s.to} className="btn btn--sm btn--ghost">
                  {s.label} <Icon name="arrow" width={15} height={15} />
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </section>
    </>
  );
}
