import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { advocate, nav } from "../data/content";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { pathname } = useLocation();

  const onHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy only makes sense on the home page, where the nav's section
  // links point at elements that are actually on screen.
  useEffect(() => {
    if (!onHome) return;
    const ids = nav.filter((n) => n.section).map((n) => n.section);
    const onScroll = () => {
      const y = window.scrollY + 140;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) current = id;
      }
      setActiveSection(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onHome]);

  // Close the mobile menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (item) => {
    if (item.href.startsWith("/#") || item.href === "/") {
      return onHome && item.section === activeSection;
    }
    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  };

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="container nav__inner">
        <Link to="/" className="nav__brand">
          <span className="nav__monogram">RSM</span>
          <span className="nav__brandtext">
            <strong>{advocate.name}</strong>
            <em>{advocate.title}</em>
          </span>
        </Link>

        <nav className={`nav__links ${open ? "nav__links--open" : ""}`}>
          {nav.map((n) => (
            <Link
              key={n.href}
              to={n.href}
              className={isActive(n) ? "is-active" : ""}
              aria-current={isActive(n) ? "page" : undefined}
            >
              {n.label}
            </Link>
          ))}
          <Link to="/book" className="btn btn--sm nav__cta">
            Book Consultation
          </Link>
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
