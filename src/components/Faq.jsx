import { useState } from "react";
import { faqs } from "../data/content";
import { Icon } from "./Icons";
import Reveal from "./Reveal";

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="section">
      <div className="container container--narrow">
        <Reveal className="section__head">
          <span className="eyebrow">FAQ</span>
          <h2 className="section__title">{faqs.heading}</h2>
          <span className="section__rule section__rule--center" />
          <p className="section__subtitle">{faqs.subtext}</p>
        </Reveal>

        <div className="faq" itemScope itemType="https://schema.org/FAQPage">
          {faqs.items.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal
                key={f.q}
                as="div"
                className={`faq__item ${isOpen ? "faq__item--open" : ""}`}
                delay={i * 50}
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <button
                  className="faq__q"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <span itemProp="name">{f.q}</span>
                  <Icon name="arrow" width={18} height={18} />
                </button>
                <div
                  className="faq__a"
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                >
                  <p itemProp="text">{f.a}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
