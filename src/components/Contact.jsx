import { Link } from "react-router";
import { contact, office, profiles } from "../data/content";
import { Icon } from "./Icons";
import Reveal from "./Reveal";
import OpenStatus from "./OpenStatus";
import RevokeButton from "./RevokeButton";
import { useAppointments } from "../lib/appointmentContext";
import { buildICS, downloadICS } from "../lib/booking";
import {
  apptDate,
  apptTime,
  apptType,
  formatLongDate,
  formatTime12,
  relativeDay,
  statusLabel,
  statusTone,
  timeToMinutes,
} from "../lib/appointments";

// Booking replaced the old enquiry form entirely. That form posted through a
// `mailto:` link, which silently does nothing on the many mobile browsers with
// no mail client configured — so an unknown share of enquiries were simply
// lost. Every route out of this section now lands somewhere the chamber
// actually receives it: the booking API, the phone, or email.

const telHref = `tel:${contact.phone.replace(/\s+/g, "")}`;

/** The pitch to book, shown when the visitor holds no appointment. */
function BookPanel() {
  return (
    <>
      <span className="contact__bookicon">
        <Icon name="calendar" width={28} height={28} />
      </span>
      <h3>Book a consultation</h3>
      <p>
        Pick a date and time that suits you. Slots follow the chamber's court schedule, so what you
        see is genuinely available — and you get a reference number straight away.
      </p>

      <ul className="contact__booksteps">
        <li>
          <Icon name="check" width={16} height={16} />
          <span>Choose your slot in the next 30 days</span>
        </li>
        <li>
          <Icon name="check" width={16} height={16} />
          <span>At the chamber in Hajipur, or by telephone</span>
        </li>
        <li>
          <Icon name="check" width={16} height={16} />
          <span>Confidential, and confirmed by a call back</span>
        </li>
      </ul>

      <Link to="/book" className="btn btn--primary btn--block">
        Book an appointment <Icon name="arrow" width={18} height={18} />
      </Link>

      <div className="contact__quick">
        <a href={telHref} className="btn btn--ghost btn--sm">
          <Icon name="phone" width={17} height={17} /> Call {contact.phone}
        </a>
        <a href={`mailto:${contact.email}`} className="btn btn--ghost btn--sm">
          <Icon name="mail" width={17} height={17} /> Email
        </a>
      </div>
    </>
  );
}

/**
 * The visitor's live appointment, shown in place of the pitch.
 *
 * Someone who already holds a slot has no use for "Book a consultation" — and
 * because only one appointment may be pending at a time, that button would in
 * fact refuse them. What they want at the foot of the page is when it is.
 */
function AppointmentPanel({ appt }) {
  const addToCalendar = () => {
    const minutes = timeToMinutes(apptTime(appt));
    if (minutes == null) return;
    downloadICS(
      buildICS({
        dateISO: apptDate(appt),
        startMinutes: minutes,
        description: [
          `Matter: ${apptType(appt) || "Legal consultation"}`,
          "Please carry any documents relating to your matter.",
        ].join("\n"),
        location: office.addressLines.join(", "),
        organiser: contact.email,
        uidSeed: `${appt.id}`,
      })
    );
  };

  return (
    <>
      <span className="contact__bookicon contact__bookicon--live">
        <Icon name="check" width={28} height={28} strokeWidth={3} />
      </span>
      <h3>Your appointment</h3>
      <p>
        You have a consultation booked with Advocate Ram Snehi Mishra. The chamber will call you on{" "}
        <strong>{appt.phone}</strong> to confirm it.
      </p>

      <div className="apptcard apptcard--compact">
        <div className="apptcard__when">
          <span className="apptcard__rel">{relativeDay(apptDate(appt))}</span>
          <strong className="apptcard__time">{formatTime12(apptTime(appt))}</strong>
          <span className="apptcard__date">{formatLongDate(apptDate(appt))}</span>
        </div>
        <div className="apptcard__meta">
          <span className={`pill pill--${statusTone(appt.status)}`}>
            <span className="pill__dot" aria-hidden="true" />
            {statusLabel(appt.status)}
          </span>
          {apptType(appt) && <span className="apptcard__type">{apptType(appt)}</span>}
        </div>
      </div>

      {appt.id && (
        <p className="contact__ref">
          Reference <strong>#{appt.id}</strong>
        </p>
      )}

      <div className="contact__quick">
        <button type="button" className="btn btn--primary btn--sm" onClick={addToCalendar}>
          <Icon name="calendar" width={17} height={17} /> Add to calendar
        </button>
        <a href={telHref} className="btn btn--ghost btn--sm">
          <Icon name="phone" width={17} height={17} /> Call the chamber
        </a>
      </div>

      <div className="contact__revoke">
        <p>Need a different date or time? Revoke this one first, then book the slot you want.</p>
        <RevokeButton />
      </div>
    </>
  );
}

export default function Contact() {
  const { hasActive, appointment } = useAppointments();

  const details = [
    { icon: "phone", label: "Phone", value: contact.phone, href: telHref },
    { icon: "mail", label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    { icon: "pin", label: "Chamber", value: contact.address },
    { icon: "clock", label: "Office Hours", value: contact.hours },
    ...profiles.map((p) => ({ icon: p.icon, label: p.label, value: p.value, href: p.url, external: true })),
  ];

  const live = hasActive && appointment;

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

          <Reveal className={`contact__book ${live ? "contact__book--live" : ""}`} delay={120}>
            {live ? <AppointmentPanel appt={appointment} /> : <BookPanel />}

            <div className="contact__status">
              <OpenStatus />
            </div>

            <p className="contact__disclaimer">
              Booking a consultation does not create an advocate–client relationship. Information you
              share is treated as confidential.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
