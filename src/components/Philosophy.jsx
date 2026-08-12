import { philosophy } from "../data/content";
import { Icon } from "./Icons";
import Reveal from "./Reveal";

export default function Philosophy() {
  return (
    <section id="about" className="section">
      <div className="container">
        <Reveal className="section__head">
          <h2 className="section__title">{philosophy.heading}</h2>
          <span className="section__rule section__rule--center" />
          <p className="section__subtitle">{philosophy.subtext}</p>
        </Reveal>

        <div className="philosophy">
          <div className="philosophy__main">
            <Reveal>
              <figure className="philosophy__quote">
                <Icon name="quote" width={38} height={38} />
                <blockquote>{philosophy.quote}</blockquote>
                <figcaption>— {philosophy.author}</figcaption>
              </figure>
            </Reveal>
            {philosophy.paragraphs.map((p, i) => (
              <Reveal key={i} delay={80 + i * 60}>
                <p className="muted philosophy__para">{p}</p>
              </Reveal>
            ))}
          </div>

          <div className="philosophy__aside">
            {philosophy.approaches.map((a, i) => (
              <Reveal key={a.title} className="approach" delay={i * 80}>
                <span className="approach__icon">
                  <Icon name={a.icon} width={22} height={22} />
                </span>
                <div>
                  <strong className="approach__title">{a.title}</strong>
                  <p className="approach__desc">{a.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
