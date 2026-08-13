import { useState } from "react";
import { contact, profiles } from "../data/content";
import { Icon } from "./Icons";
import Reveal from "./Reveal";

export default function Contact() {
  const [sent, setSent] = useState(false);

  const details = [
    { icon: "phone", label: "Phone", value: contact.phone, href: `tel:${contact.phone.replace(/\s+/g, "")}` },
    { icon: "mail", label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    { icon: "pin", label: "Chamber", value: contact.address },
    { icon: "clock", label: "Office Hours", value: contact.hours },
    ...profiles.map((p) => ({ icon: p.icon, label: p.label, value: p.value, href: p.url, external: true })),
  ];

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    // Static site: open the user's email client with a prefilled message.
    const body = encodeURIComponent(
      `Name: ${data.get("name")}\nPhone: ${data.get("phone")}\n\n${data.get("message")}`
    );
    const subject = encodeURIComponent("Legal Enquiry — Website");
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <Reveal className="section__head">
          <span className="eyebrow">Consultation</span>
          <h2 className="section__title">{contact.heading}</h2>
          <p className="section__subtitle">{contact.subtext}</p>
        </Reveal>

        <div className="contact">
          <Reveal className="contact__info">
            {details.map((d) => {
              const Item = d.href ? "a" : "div";
              const linkProps = d.href
                ? { href: d.href, ...(d.external ? { target: "_blank", rel: "noreferrer" } : {}) }
                : {};
              return (
                <Item key={d.label} className="contact__item" {...linkProps}>
                  <span className="contact__icon">
                    <Icon name={d.icon} width={22} height={22} />
                  </span>
                  <div>
                    <span className="contact__label">{d.label}</span>
                    <span className="contact__value">{d.value}</span>
                  </div>
                </Item>
              );
            })}
          </Reveal>

          <Reveal className="contact__formwrap" delay={120}>
            <form className="contact__form" onSubmit={onSubmit}>
              <div className="field">
                <label htmlFor="name">Full Name</label>
                <input id="name" name="name" type="text" required placeholder="Your name" />
              </div>
              <div className="field">
                <label htmlFor="phone">Phone</label>
                <input id="phone" name="phone" type="tel" required placeholder="+91 …" />
              </div>
              <div className="field">
                <label htmlFor="message">How can we help?</label>
                <textarea id="message" name="message" rows="4" required placeholder="Briefly describe your matter" />
              </div>
              <button type="submit" className="btn btn--primary btn--block">
                Send Enquiry <Icon name="arrow" width={18} height={18} />
              </button>
              {sent && (
                <p className="contact__note">
                  Your email client should now open. If it doesn’t, email us directly at{" "}
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>.
                </p>
              )}
              <p className="contact__disclaimer">
                Submitting an enquiry does not create an advocate–client relationship.
                Information shared is treated as confidential.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
