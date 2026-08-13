import { advocate, nav, contact, profiles } from "../data/content";
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

        <nav className="footer__nav">
          {nav.map((n) => (
            <a key={n.href} href={n.href}>{n.label}</a>
          ))}
        </nav>

        <div className="footer__contact">
          <a href={`tel:${contact.phone.replace(/\s+/g, "")}`}>{contact.phone}</a>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </div>
      </div>

      <div className="footer__bar">
        <div className="container footer__barinner">
          <span>© {new Date().getFullYear()} {advocate.name}, Advocate. All rights reserved.</span>
          <span className="footer__disclaimer">
            This website is for informational purposes only and does not constitute legal advice or solicitation.
          </span>
        </div>
      </div>
    </footer>
  );
}
