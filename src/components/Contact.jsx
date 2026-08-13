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

  const onWhatsApp = (e) => {
    const form = e.currentTarget.form;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const text = encodeURIComponent(
      `Namaste, I have a legal enquiry.\n\nName: ${data.get("name")}\nPhone: ${data.get("phone")}\n\n${data.get("message")}`
    );
    const number = contact.phone.replace(/[^\d]/g, "");
    window.open(`https://wa.me/${number}?text=${text}`, "_blank", "noopener");
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
              <button type="button" className="btn btn--whatsapp btn--block" onClick={onWhatsApp}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                  <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.89 1.22 3.09.15.2 2.11 3.22 5.1 4.51.71.31 1.27.5 1.7.63.72.23 1.37.2 1.88.12.58-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.82 9.82 0 0 1-1.51-5.25c0-5.44 4.43-9.87 9.89-9.87a9.8 9.8 0 0 1 6.98 2.9 9.8 9.8 0 0 1 2.9 6.98c-.01 5.45-4.44 9.87-9.88 9.87zm8.4-18.28A11.8 11.8 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.15 1.59 5.95L.06 24l6.3-1.65a11.87 11.87 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.9a11.82 11.82 0 0 0-3.49-8.4z" />
                </svg>
                Send via WhatsApp
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
