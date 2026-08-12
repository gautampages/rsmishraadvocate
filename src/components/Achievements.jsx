import { achievements } from "../data/content";
import { Icon } from "./Icons";
import Counter from "./Counter";
import Reveal from "./Reveal";

export default function Achievements() {
  return (
    <section id="achievements" className="section section--dark">
      <div className="dots" aria-hidden="true" />
      <div className="container">
        <Reveal className="section__head">
          <h2 className="section__title section__title--light">{achievements.heading}</h2>
          <span className="section__rule" />
          <p className="section__subtitle section__subtitle--light">{achievements.subtext}</p>
        </Reveal>

        <div className="grid grid--achieve">
          {achievements.items.map((a, i) => (
            <Reveal key={a.label} className="achieve" delay={i * 90}>
              <span className="achieve__icon">
                <Icon name={a.icon} width={30} height={30} />
              </span>
              <Counter value={a.value} suffix={a.suffix} className="achieve__value" />
              <span className="achieve__label">{a.label}</span>
              <p className="achieve__desc">{a.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
