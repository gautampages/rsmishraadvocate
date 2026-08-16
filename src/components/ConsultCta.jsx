import { Link } from "react-router";
import { Icon } from "./Icons";
import { contact } from "../data/content";

/** Closing call-to-action reused at the foot of every routed page. */
export default function ConsultCta({
  heading = "Speak to the chamber in Hajipur",
  text = "Every enquiry is treated confidentially. Describe your matter and we will tell you plainly whether you have one — at the chamber near the Hajipur civil court (Vaishali), by phone, or at the Patna High Court.",
  bookLabel = "Book a consultation",
  callLabel = "Call",
  lang,
}) {
  return (
    <section className="consultcta" lang={lang}>
      <div className="container container--narrow consultcta__inner">
        <div>
          <h2 className="consultcta__heading">{heading}</h2>
          <p className="consultcta__text">{text}</p>
        </div>
        <div className="consultcta__actions">
          <Link to="/book" className="btn btn--primary">
            {bookLabel} <Icon name="arrow" width={18} height={18} />
          </Link>
          <a href={`tel:${contact.phone.replace(/\s+/g, "")}`} className="btn btn--ghost btn--ghost-light">
            <Icon name="phone" width={17} height={17} /> {callLabel} {contact.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
