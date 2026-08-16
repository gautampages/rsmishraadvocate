import { useState } from "react";
import { Link } from "react-router";
import { services } from "../data/content";
import { Icon } from "./Icons";
import Reveal from "./Reveal";

export default function Services() {
  const [active, setActive] = useState(0);
  const cat = services.categories[active];

  return (
    <section id="services" className="section section--alt">
      <div className="container">
        <Reveal className="section__head">
          <span className="eyebrow">Services</span>
          <h2 className="section__title">{services.heading}</h2>
          <span className="section__rule section__rule--center" />
          <p className="section__subtitle">{services.subtext}</p>
        </Reveal>

        {/* Tabs */}
        <div className="tabs" role="tablist" aria-label="Legal services">
          {services.categories.map((c, i) => (
            <button
              key={c.key}
              role="tab"
              aria-selected={i === active}
              className={`tab ${i === active ? "tab--active" : ""}`}
              onClick={() => setActive(i)}
            >
              <span className="tab__icon"><Icon name={c.icon} width={22} height={22} /></span>
              <span className="tab__text">
                <strong>{c.title}</strong>
                <em>{c.subtitle}</em>
              </span>
            </button>
          ))}
        </div>

        {/* Active service detail */}
        <div className="svc" key={cat.key}>
          <div className="svc__header">
            <span className="svc__badge"><Icon name={cat.icon} width={30} height={30} /></span>
            <div>
              <span className="eyebrow">{cat.eyebrow}</span>
              <h3 className="svc__headline">{cat.headline}</h3>
              <p className="svc__desc">{cat.description}</p>
            </div>
          </div>

          <div className="svc__body">
            <div className="svc__areas">
              {cat.subAreas.map((s) => (
                <article key={s.title} className="subarea">
                  <h4 className="subarea__title">{s.title}</h4>
                  <p className="subarea__desc">{s.desc}</p>
                  <ul className="subarea__points">
                    {s.points.map((p) => (
                      <li key={p}><Icon name="check" width={16} height={16} />{p}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <aside className="svc__process">
              <h4 className="svc__processtitle">{services.processHeading}</h4>
              <p className="svc__processsub">Strategic approach to {cat.title.toLowerCase()} matters</p>
              <ol className="steps">
                {cat.process.map((p, i) => (
                  <li key={p.title} className="step">
                    <span className="step__num">{i + 1}</span>
                    <div>
                      <strong className="step__title">{p.title}</strong>
                      <p className="step__desc">{p.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="svc__cta">
                <strong>{cat.ctaHeading}</strong>
                <p>{cat.ctaText}</p>
                {cat.href && (
                  <Link to={cat.href} className="btn btn--ghost btn--block">
                    {cat.pageLabel} <Icon name="arrow" width={18} height={18} />
                  </Link>
                )}
                <a href="#contact" className="btn btn--primary btn--block">
                  Book Consultation <Icon name="arrow" width={18} height={18} />
                </a>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
