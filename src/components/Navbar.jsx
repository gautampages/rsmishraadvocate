import { useEffect, useState } from "react";
import { advocate, nav } from "../data/content";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(nav[0].href);

  useEffect(() => {
    const ids = nav.map((n) => n.href.slice(1));
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const y = window.scrollY + 140;
      let current = nav[0].href;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) current = `#${id}`;
      }
      setActive(current);
    };
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
            <em>{advocate.title}</em>
          </span>
        </a>

        <nav className={`nav__links ${open ? "nav__links--open" : ""}`}>
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={close}
              className={active === n.href ? "is-active" : ""}
            >
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
