import { Link } from "react-router";
import { Icon } from "./Icons";
import { contact } from "../data/content";

/** Closing call-to-action reused at the foot of every routed page. */
export default function ConsultCta({
  heading = "Speak to the chamber in Hajipur",
  text = "Every enquiry is treated confidentially. Describe your matter and we will tell you plainly whether you have one — at the chamber near the Hajipur civil court (Vaishali), by phone, or before the courts at Patna and Muzaffarpur.",
}) {
  return (
    <section className="consultcta">
      <div className="container container--narrow consultcta__inner">
        <div>
          <h2 className="consultcta__heading">{heading}</h2>
          <p className="consultcta__text">{text}</p>
        </div>
        <div className="consultcta__actions">
          <Link to="/book" className="btn btn--primary">
            Book a consultation <Icon name="arrow" width={18} height={18} />
          </Link>
          <a href={`tel:${contact.phone.replace(/\s+/g, "")}`} className="btn btn--ghost btn--ghost-light">
            <Icon name="phone" width={17} height={17} /> Call {contact.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
