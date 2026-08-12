import { testimonials } from "../data/content";
import { Icon } from "./Icons";
import Reveal from "./Reveal";

export default function Testimonials() {
  return (
    <section id="testimonials" className="section section--alt">
      <div className="container">
        <Reveal className="section__head">
          <span className="eyebrow">Client Voices</span>
          <h2 className="section__title">What Clients Say</h2>
          <p className="section__subtitle">
            The trust of those we represent is the truest measure of our work.
          </p>
        </Reveal>

        <div className="grid grid--quotes">
          {testimonials.map((t, i) => (
            <Reveal key={t.author} as="figure" className="quote" delay={i * 90}>
              <div className="quote__mark">
                <Icon name="quote" width={34} height={34} />
              </div>
              <div className="quote__stars" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Icon key={k} name="star" width={16} height={16} />
                ))}
              </div>
              <blockquote className="quote__text">{t.quote}</blockquote>
              <figcaption className="quote__author">
                <span className="quote__avatar">{t.author.charAt(0)}</span>
                <span>
                  <strong>{t.author}</strong>
                  <em>{t.role}</em>
                </span>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
