import { Link } from "react-router";
import { advocate, contact, footerNav, profiles } from "../data/content";
import { istNow } from "../lib/istTime";
import { Icon } from "./Icons";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="nav__monogram">RSM</span>
          <div>
            <strong>{advocate.title} {advocate.name}</strong>
            <p className="muted">{advocate.tagline}</p>
            <p className="footer__blurb">
              {advocate.yearsExperience}+ years serving Hajipur (Vaishali), Patna, Chapra, Muzaffarpur and across Bihar.
            </p>
            <div className="footer__socials">
              {profiles.map((p) => (
                <a
                  key={p.label}
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="footer__social"
                  aria-label={p.label}
                >
                  <Icon name={p.icon} width={18} height={18} /> {p.label.replace(" Profile", "")}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer__cols">
          {footerNav.map((col) => (
            <nav key={col.title} className="footer__col">
              <h3 className="footer__coltitle">{col.title}</h3>
              {col.links.map((l) => (
                <Link key={l.href} to={l.href}>{l.label}</Link>
              ))}
            </nav>
          ))}
        </div>
      </div>

      <div className="container footer__reach">
        <a href={`tel:${contact.phone.replace(/\s+/g, "")}`}>
          <Icon name="phone" width={16} height={16} /> {contact.phone}
        </a>
        <a href={`mailto:${contact.email}`}>
          <Icon name="mail" width={16} height={16} /> {contact.email}
        </a>
        <span>
          <Icon name="pin" width={16} height={16} /> {contact.address}
        </span>
      </div>

      <div className="footer__bar">
        <div className="container footer__barinner">
          <span>© {istNow().getFullYear()} {advocate.name}, Advocate. All rights reserved.</span>
          <span className="footer__disclaimer">
            This website is for informational purposes only. It is not an advertisement or solicitation,
            and it does not constitute legal advice. See our{" "}
            <Link to="/disclaimer">Disclaimer</Link>.
          </span>
        </div>
      </div>
    </footer>
  );
}
