import { useState } from "react";
import { Link, useParams } from "react-router";
import PageHeader from "../components/PageHeader";
import Seo from "../components/Seo";
import ConsultCta from "../components/ConsultCta";
import { Icon } from "../components/Icons";
import NotFound from "./NotFound";
import {
  BEFORE_CONSULTATION,
  CHECKLIST_CHECKED,
  CHECKLIST_DISCLAIMER,
  checklistBySlug,
} from "../data/checklists";
import { advocate, contact } from "../data/content";

/** Plain-text rendering, for the clipboard. */
function asText(list) {
  return [
    `${list.title}`,
    `Advocate ${advocate.name}, Hajipur, Vaishali, Bihar · ${contact.phone}`,
    "",
    ...list.groups.flatMap((g) => [g.title.toUpperCase(), ...g.items.map((i) => `  [ ] ${i}`), ""]),
    BEFORE_CONSULTATION.title.toUpperCase(),
    ...BEFORE_CONSULTATION.items.map((i) => `  [ ] ${i}`),
    "",
    CHECKLIST_DISCLAIMER,
  ].join("\n");
}

export default function ChecklistDetail() {
  const { slug } = useParams();
  const list = checklistBySlug(slug);
  const [ticked, setTicked] = useState(() => new Set());
  const [copied, setCopied] = useState(false);

  if (!list) return <NotFound />;

  // The "Before your consultation" block closes every one of these documents,
  // so it is appended here rather than repeated in the data five times.
  const groups = [...list.groups, BEFORE_CONSULTATION];
  const allItems = groups.flatMap((g) => g.items);

  const toggle = (key) =>
    setTicked((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(asText(list));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <>
      <Seo title={list.seoTitle} description={list.seoDescription} />
      <PageHeader
        eyebrow="Document Checklist"
        title={list.title}
        intro={list.intro}
        crumbs={[{ label: "Checklists", to: "/checklists" }, { label: list.short }]}
      >
        <div className="pagehead__actions no-print">
          {list.pdf && (
            <a href={list.pdf} download className="btn btn--primary">
              <Icon name="download" width={17} height={17} /> Download PDF
            </a>
          )}
          <button type="button" className="btn btn--ghost" onClick={() => window.print()}>
            <Icon name="doc" width={17} height={17} /> Print
          </button>
          <button type="button" className="btn btn--ghost" onClick={copy}>
            <Icon name="copy" width={17} height={17} /> {copied ? "Copied!" : "Copy as text"}
          </button>
        </div>
      </PageHeader>

      <section className="section section--tight">
        <div className="container container--narrow">
          <p className="checklist__count no-print">
            <Icon name="check" width={16} height={16} />
            {allItems.length} items · {ticked.size} ticked
            {list.pdf && (
              <>
                {" · "}
                <a href={list.pdf} download>
                  PDF, {list.pages} page{list.pages === 1 ? "" : "s"}
                </a>
              </>
            )}
          </p>

          <div className="checklist">
            {groups.map((g) => (
              <section key={g.title} className="checklist__group">
                <h2>{g.title}</h2>
                <ul>
                  {g.items.map((item) => {
                    const key = `${g.title}::${item}`;
                    const on = ticked.has(key);
                    return (
                      <li key={key} className={on ? "is-ticked" : ""}>
                        <label>
                          <input type="checkbox" checked={on} onChange={() => toggle(key)} />
                          <span className="checklist__box" aria-hidden="true">
                            <Icon name="check" width={13} height={13} strokeWidth={3} />
                          </span>
                          <span className="checklist__text">{item}</span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </div>

          <div className="toolnote">
            <h2>
              <Icon name="alert" width={19} height={19} /> Disclaimer
            </h2>
            <p>{CHECKLIST_DISCLAIMER}</p>

            {list.sources?.length > 0 && (
              <>
                <h3 style={{ fontSize: "1rem", margin: "18px 0 8px" }}>
                  Official sources checked for this edition
                </h3>
                <ul className="prose__list">
                  {list.sources.map((s) => (
                    <li key={s}>
                      <Icon name="check" width={16} height={16} />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <p className="toolnote__disclaimer">Information checked: {CHECKLIST_CHECKED}.</p>
          </div>

          <div className="prose__foot no-print">
            {list.related && (
              <p>
                Related practice area: <Link to={list.related}>{list.short}</Link>.
              </p>
            )}
            <nav className="prose__siblings">
              {list.pdf && (
                <a href={list.pdf} download className="btn btn--sm btn--ghost">
                  <Icon name="download" width={15} height={15} /> Download PDF
                </a>
              )}
              <Link to="/checklists" className="btn btn--sm btn--ghost">
                All checklists <Icon name="arrow" width={15} height={15} />
              </Link>
              <Link to="/book" className="btn btn--sm btn--primary">
                Book a consultation <Icon name="arrow" width={15} height={15} />
              </Link>
            </nav>
          </div>
        </div>
      </section>

      <div className="no-print">
        <ConsultCta
          heading="Have most of these already?"
          text="Bring them in. If something is missing, the chamber will tell you how to obtain it and from where."
        />
      </div>
    </>
  );
}
