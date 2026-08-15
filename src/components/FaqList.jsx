import { useState } from "react";
import { Icon } from "./Icons";
import Reveal from "./Reveal";

/**
 * Accordion FAQ list. Shared by the home page and every routed page that
 * carries its own questions, so the markup — and the inline FAQPage
 * microdata Google reads — stays identical everywhere.
 */
export default function FaqList({ items, defaultOpen = 0 }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="faq" itemScope itemType="https://schema.org/FAQPage">
      {items.map((f, i) => {
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
            <button className="faq__q" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? -1 : i)}>
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
  );
}
