import { whyChoose } from "../data/content";
import Reveal from "./Reveal";

export default function WhyChoose() {
  return (
    <section id="why" className="section">
      <div className="container">
        <Reveal className="section__head">
          <span className="eyebrow">Our Commitment</span>
          <h2 className="section__title">Why Clients Choose Us</h2>
          <p className="section__subtitle">
            A practice built on trust, preparation and results.
          </p>
        </Reveal>

        <div className="grid grid--why">
          {whyChoose.map((w, i) => (
            <Reveal key={w.title} className="why" delay={i * 80}>
              <span className="why__num">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="why__title">{w.title}</h3>
              <p className="why__desc">{w.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
