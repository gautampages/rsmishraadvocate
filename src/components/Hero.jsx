import { advocate, heroStats, caseBreakdown, heroCards } from "../data/content";
import { Icon } from "./Icons";
import Counter from "./Counter";
import ScalesOfJustice from "./ScalesOfJustice";

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__glow" />
        <div className="hero__glow hero__glow--2" />
        <div className="hero__grid" />
      </div>

      <div className="container hero__inner">
        <div className="hero__content">
          <span className="pill">
            <Icon name="gavel" width={15} height={15} />
            {advocate.credentials}
          </span>
          <h1 className="hero__title">
            <span className="hero__title-shine">{advocate.heroHeadline}</span>
          </h1>
          <p className="hero__subtitle">{advocate.heroSubtitle}</p>
          <p className="hero__serving">
            <Icon name="pin" width={16} height={16} />
            {advocate.serving}
          </p>
          <p className="hero__sub">{advocate.heroSubtext}</p>

          <div className="hero__breakdown">
            <span className="hero__breakdownlabel">Case Breakdown</span>
            <ul className="hero__breakdownlist">
              {caseBreakdown.map((c) => (
                <li key={c.label}>
                  <span>{c.label}</span>
                  <strong>{c.value}</strong>
                </li>
              ))}
            </ul>
          </div>

          <div className="hero__stats">
            {heroStats.map((s) => (
              <div key={s.label} className="hero__stat">
                <Counter value={s.value} className="hero__statval" />
                <span className="hero__statlabel">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero__showcase" aria-hidden="true">
          <div className="hero__panel">
            <ScalesOfJustice className="hero__scales" />
          </div>
          {heroCards.map((c, i) => (
            <div key={c.title} className={`hero__float hero__float--${i + 1}`}>
              <span className="hero__floaticon">
                <Icon name={c.icon} width={22} height={22} />
              </span>
              <div>
                <strong>{c.title}</strong>
                <span>{c.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
