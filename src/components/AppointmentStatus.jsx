import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { Icon } from "./Icons";
import { contact, office } from "../data/content";
import { buildICS, downloadICS } from "../lib/booking";
import { useAppointments } from "../lib/appointmentContext";
import RevokeButton from "./RevokeButton";
import {
  apptDate,
  apptTime,
  apptType,
  formatLongDate,
  formatShortDate,
  formatTime12,
  relativeDay,
  statusLabel,
  statusTone,
  timeToMinutes,
} from "../lib/appointments";

/**
 * Site-wide appointment status.
 *
 * On every page load the appointments API is asked whether this visitor (the
 * API matches on IP, so there is nothing to log in to) currently holds a
 * PENDING appointment. If they do, a popup opens with the date and time, and
 * their past appointments underneath.
 *
 * Dismissing it leaves a small chip in the corner, so someone who closes the
 * popup by reflex can still get back to it without reloading.
 *
 * A failed request is silent by design: this is an ambient nicety, and a
 * visitor who has never booked anything should never see an error about it.
 */
export default function AppointmentStatus() {
  const { loading, hasActive, appointment: appt, history } = useAppointments();
  const [open, setOpen] = useState(false);
  const [announced, setAnnounced] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const closeRef = useRef(null);
  const lastFocused = useRef(null);

  // Announce an active appointment once per page load. Guarded by `announced`
  // so that revoking and re-booking within the same visit does not make the
  // popup spring open again unprompted.
  useEffect(() => {
    if (!hasActive || announced) return;
    setOpen(true);
    setAnnounced(true);
  }, [hasActive, announced]);

  const close = useCallback(() => setOpen(false), []);

  // Escape to close, and hold the background still while the dialog is up.
  useEffect(() => {
    if (!open) return;

    lastFocused.current = document.activeElement;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      lastFocused.current?.focus?.();
    };
  }, [open, close]);

  if (loading) return null;
  if (!hasActive && history.length === 0) return null;

  const addToCalendar = () => {
    const minutes = timeToMinutes(apptTime(appt));
    if (minutes == null) return;
    downloadICS(
      buildICS({
        dateISO: apptDate(appt),
        startMinutes: minutes,
        description: [
          `Matter: ${apptType(appt) || "Legal consultation"}`,
          appt.message ? `Note: ${appt.message}` : "",
          "Please carry any documents relating to your matter.",
        ]
          .filter(Boolean)
          .join("\n"),
        location: office.addressLines.join(", "),
        organiser: contact.email,
        uidSeed: `${appt.id}`,
      })
    );
  };

  return (
    <>
      {/* Reopen chip — bottom-left, clear of the chat launcher */}
      {!open && (
        <button type="button" className="apptchip" onClick={() => setOpen(true)}>
          <span className="apptchip__dot" aria-hidden="true" />
          <Icon name="calendar" width={17} height={17} />
          <span className="apptchip__text">
            {hasActive ? (
              <>
                <strong>{relativeDay(apptDate(appt))}</strong>
                <em>{formatTime12(apptTime(appt))} · your appointment</em>
              </>
            ) : (
              <>
                <strong>Appointment history</strong>
                <em>{history.length} past booking{history.length === 1 ? "" : "s"}</em>
              </>
            )}
          </span>
        </button>
      )}

      {open && (
        <div className="apptmodal" role="presentation" onClick={(e) => e.target === e.currentTarget && close()}>
          <div
            className="apptmodal__card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="appt-title"
          >
            <button
              ref={closeRef}
              type="button"
              className="apptmodal__close"
              onClick={close}
              aria-label="Close"
            >
              <Icon name="close" width={18} height={18} />
            </button>

            {hasActive ? (
              <>
                <div className="apptmodal__head">
                  <span className="apptmodal__icon">
                    <Icon name="calendar" width={26} height={26} />
                  </span>
                  <span className="apptmodal__eyebrow">Upcoming consultation</span>
                  <h2 id="appt-title">You have an appointment</h2>
                  <p>
                    With Advocate Ram Snehi Mishra. The chamber will contact you on{" "}
                    <strong>{appt.phone}</strong> to confirm.
                  </p>
                </div>

                <div className="apptcard">
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

                <dl className="apptdetails">
                  <div>
                    <dt>Name</dt>
                    <dd>{appt.name}</dd>
                  </div>
                  <div>
                    <dt>Phone</dt>
                    <dd>{appt.phone}</dd>
                  </div>
                  {appt.email && (
                    <div>
                      <dt>Email</dt>
                      <dd>{appt.email}</dd>
                    </div>
                  )}
                  {appt.message && (
                    <div className="apptdetails__wide">
                      <dt>Your note</dt>
                      <dd>{appt.message}</dd>
                    </div>
                  )}
                </dl>

                <p className="apptmodal__note">
                  <Icon name="alert" width={16} height={16} />
                  <span>
                    This is a requested slot. Court listings move without notice — the chamber will
                    confirm before the day.
                  </span>
                </p>

                <div className="apptmodal__actions">
                  <button type="button" className="btn btn--primary btn--sm" onClick={addToCalendar}>
                    <Icon name="calendar" width={16} height={16} /> Add to calendar
                  </button>
                  <a
                    href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                    className="btn btn--ghost btn--sm"
                  >
                    <Icon name="phone" width={16} height={16} /> Call {contact.phone}
                  </a>
                </div>

                <div className="apptmodal__revoke">
                  <p>
                    Need a different date or time? Only one appointment can be pending at a time, so
                    revoke this one first — then book the slot you want.
                  </p>
                  <RevokeButton />
                </div>
              </>
            ) : (
              <div className="apptmodal__head">
                <span className="apptmodal__icon">
                  <Icon name="clock" width={26} height={26} />
                </span>
                <span className="apptmodal__eyebrow">Your appointments</span>
                <h2 id="appt-title">No upcoming appointment</h2>
                <p>You have no active booking, so the slot of your choice is free to take.</p>
                <Link to="/book" className="btn btn--primary btn--sm" onClick={close}>
                  Book a consultation <Icon name="arrow" width={15} height={15} />
                </Link>
              </div>
            )}

            {history.length > 0 && (
              <div className="appthistory">
                <button
                  type="button"
                  className="appthistory__toggle"
                  aria-expanded={showHistory}
                  onClick={() => setShowHistory((v) => !v)}
                >
                  <Icon name="clock" width={16} height={16} />
                  Appointment history ({history.length})
                  <Icon
                    name="chevron"
                    width={16}
                    height={16}
                    className={showHistory ? "is-open" : ""}
                  />
                </button>

                {showHistory && (
                  <ul className="appthistory__list">
                    {history.map((h) => (
                      <li key={h.id}>
                        <div className="appthistory__when">
                          <strong>{formatShortDate(apptDate(h))}</strong>
                          <span>{formatTime12(apptTime(h))}</span>
                        </div>
                        <div className="appthistory__what">
                          {apptType(h) && <span className="appthistory__type">{apptType(h)}</span>}
                          {h.message && <p>{h.message}</p>}
                        </div>
                        <span className={`pill pill--${statusTone(h.status)}`}>
                          <span className="pill__dot" aria-hidden="true" />
                          {statusLabel(h.status)}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
