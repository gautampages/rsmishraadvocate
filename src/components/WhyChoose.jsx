import { whyChoose } from "../data/content";
import { Icon } from "./Icons";
import Reveal from "./Reveal";

export default function WhyChoose() {
  return (
    <section id="why" className="section">
      <div className="container">
        <Reveal className="section__head">
          <span className="eyebrow">Our Advantage</span>
          <h2 className="section__title">{whyChoose.heading}</h2>
          <span className="section__rule section__rule--center" />
          <p className="section__subtitle">{whyChoose.subtext}</p>
        </Reveal>

        <div className="grid grid--cards">
          {whyChoose.items.map((w, i) => (
            <Reveal key={w.title} as="article" className="card" delay={i * 70}>
              <div className="card__icon">
                <Icon name={w.icon} />
              </div>
              <h3 className="card__title">{w.title}</h3>
              <p className="card__desc">{w.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
