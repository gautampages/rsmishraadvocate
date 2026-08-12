import { advocate } from "../data/content";
import { Icon } from "./Icons";

export default function Hero() {
  const stats = [
    { value: advocate.yearsExperience, label: "Years Experience" },
    { value: advocate.casesHandled, label: "Cases Handled" },
    { value: advocate.clientsServed, label: "Clients Served" },
    { value: advocate.courtsPracticed, label: "Courts Practiced" },
  ];

  return (
    <section id="home" className="hero">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__glow" />
        <div className="hero__grid" />
      </div>

      <div className="container hero__inner">
        <div className="hero__content">
          <span className="pill">
            <Icon name="star" width={15} height={15} />
            {advocate.credentials}
          </span>
          <h1 className="hero__title">{advocate.heroHeadline}</h1>
          <p className="hero__sub">{advocate.heroSubtext}</p>

          <div className="hero__actions">
            <a href="#contact" className="btn btn--primary">
              Book a Consultation <Icon name="arrow" width={18} height={18} />
            </a>
            <a href="#practice" className="btn btn--ghost">
              Practice Areas
            </a>
          </div>

          <div className="hero__stats">
            {stats.map((s) => (
              <div key={s.label} className="hero__stat">
                <span className="hero__statval">{s.value}</span>
                <span className="hero__statlabel">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero__card">
          <div className="portrait">
            <div className="portrait__monogram">RSM</div>
            <div className="portrait__ring" />
          </div>
          <div className="hero__cardname">
            <strong>{advocate.title} {advocate.name}</strong>
            <span>{advocate.tagline}</span>
          </div>
          <ul className="hero__cardlist">
            <li><Icon name="check" width={18} height={18} /> Free first-consultation assessment</li>
            <li><Icon name="check" width={18} height={18} /> Confidential & professional</li>
            <li><Icon name="check" width={18} height={18} /> Available across multiple courts</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
