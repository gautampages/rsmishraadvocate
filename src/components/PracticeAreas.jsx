import { practiceAreas } from "../data/content";
import { Icon } from "./Icons";
import Reveal from "./Reveal";

export default function PracticeAreas() {
  return (
    <section id="practice" className="section section--alt">
      <div className="container">
        <Reveal className="section__head">
          <span className="eyebrow">What We Do</span>
          <h2 className="section__title">Practice Areas</h2>
          <p className="section__subtitle">
            Comprehensive legal services across a wide range of matters, delivered with
            diligence and a deep understanding of the law.
          </p>
        </Reveal>

        <div className="grid grid--cards">
          {practiceAreas.map((p, i) => (
            <Reveal key={p.title} as="article" className="card" delay={i * 70}>
              <div className="card__icon">
                <Icon name={p.icon} />
              </div>
              <h3 className="card__title">{p.title}</h3>
              <p className="card__desc">{p.desc}</p>
              <a href="#contact" className="card__link">
                Enquire <Icon name="arrow" width={16} height={16} />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
