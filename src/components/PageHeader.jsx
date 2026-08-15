import { Link } from "react-router";
import { Icon } from "./Icons";

/**
 * Masthead shared by every non-home page: breadcrumb, eyebrow, title and
 * a lead paragraph. The breadcrumb is also emitted as BreadcrumbList
 * structured data by the pages that pass `crumbs`.
 */
export default function PageHeader({ eyebrow, title, intro, meta, crumbs = [], children }) {
  return (
    <header className="pagehead">
      <div className="pagehead__bg" aria-hidden="true">
        <div className="hero__glow" />
      </div>
      <div className="container container--narrow">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          {crumbs.map((c) => (
            <span key={c.to || c.label}>
              <Icon name="arrow" width={13} height={13} />
              {c.to ? <Link to={c.to}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
            </span>
          ))}
        </nav>

        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1 className="pagehead__title">{title}</h1>
        <span className="section__rule" />
        {intro && <p className="pagehead__intro">{intro}</p>}
        {meta && <p className="pagehead__meta">{meta}</p>}
        {children}
      </div>
    </header>
  );
}
