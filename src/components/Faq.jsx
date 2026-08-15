import { faqs } from "../data/content";
import Reveal from "./Reveal";
import FaqList from "./FaqList";

export default function Faq() {
  return (
    <section id="faq" className="section">
      <div className="container container--narrow">
        <Reveal className="section__head">
          <span className="eyebrow">FAQ</span>
          <h2 className="section__title">{faqs.heading}</h2>
          <span className="section__rule section__rule--center" />
          <p className="section__subtitle">{faqs.subtext}</p>
        </Reveal>

        <FaqList items={faqs.items} />
      </div>
    </section>
  );
}
