import { useEffect, useState } from "react";
import { advocate, nav } from "../data/content";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="container nav__inner">
        <a href="#home" className="nav__brand" onClick={close}>
          <span className="nav__monogram">RSM</span>
          <span className="nav__brandtext">
            <strong>{advocate.name}</strong>
            <em>{advocate.tagline}</em>
          </span>
        </a>

        <nav className={`nav__links ${open ? "nav__links--open" : ""}`}>
          {nav.map((n) => (
            <a key={n.href} href={n.href} onClick={close}>
              {n.label}
            </a>
          ))}
          <a href="#contact" className="btn btn--sm nav__cta" onClick={close}>
            Book Consultation
          </a>
        </nav>

        <button
          className={`nav__toggle ${open ? "is-open" : ""}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
