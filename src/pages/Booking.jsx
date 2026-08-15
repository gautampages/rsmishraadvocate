import { useMemo, useState } from "react";
import { Link } from "react-router";
import PageHeader from "../components/PageHeader";
import Seo from "../components/Seo";
import { Icon } from "../components/Icons";
import { contact, office } from "../data/content";
import { practiceAreas } from "../data/practice";
import {
  BOOKING_WINDOW_DAYS,
  CONSULT_MODES,
  SLOT_MINUTES,
  buildCalendar,
  buildICS,
  downloadICS,
  formatLongDate,
  formatSlot,
  minutesToTime24,
  slotsFor,
} from "../lib/booking";
import { istNow } from "../lib/istTime";
import {
  apptDate,
  apptTime,
  apptType,
  createAppointment,
  formatLongDate as formatApptDate,
  formatTime12,
  relativeDay,
  statusLabel,
  statusTone,
} from "../lib/appointments";
import { useAppointments } from "../lib/appointmentContext";
import RevokeButton from "../components/RevokeButton";

const MATTERS = [...practiceAreas.map((p) => p.short), "Cheque bounce / recovery", "Other / not sure"];


const modeLabel = (key) => CONSULT_MODES.find((m) => m.key === key)?.label || key;

export default function Booking() {
  // Only one appointment may be pending per visitor, so the form is gated on
  // this rather than letting someone fill it in and be refused at the end.
  const { hasActive, appointment: pending, refresh, adopt } = useAppointments();

  // The calendar is computed once per mount so slot availability does not
  // shift under the visitor mid-form, and in IST so the days and cut-off
  // times shown are the chamber's, not the visitor's device's.
  const now = useMemo(() => istNow(), []);
  const days = useMemo(() => buildCalendar(now), [now]);

  const firstOpen = days.find((d) => d.slotCount > 0);
  const [date, setDate] = useState(firstOpen?.iso || days[0].iso);
  const [slot, setSlot] = useState(null);
  const [mode, setMode] = useState("office");
  const [matter, setMatter] = useState(MATTERS[0]);
  const [form, setForm] = useState({ name: "", phone: "", email: "", details: "" });
  const [state, setState] = useState({ status: "idle" });

  const slots = useMemo(() => slotsFor(date, now), [date, now]);
  const selectedDay = days.find((d) => d.iso === date);


  const onSubmit = async (e) => {
    e.preventDefault();
    if (slot == null) {
      setState({ status: "error", message: "Please choose a time slot." });
      return;
    }
    setState({ status: "sending" });

    // The API has no field for how the visitor wants to meet, so it rides
    // along in the message where the chamber will actually read it.
    const message = [form.details.trim(), `Preferred consultation mode: ${modeLabel(mode)}`]
      .filter(Boolean)
      .join("\n\n");

    try {
      const created = await createAppointment({
        name: form.name,
        phone: form.phone,
        email: form.email,
        appointmentDate: date,
        appointmentTime: minutesToTime24(slot),
        consultationType: matter,
        message,
      });
      setState({ status: "confirmed", appointment: created });
      refresh();
    } catch (err) {
      // A validation failure from the API (a past date, a bad phone number) is
      // the visitor's to fix, so it is shown inline with the server's wording.
      setState({ status: "error", message: err.message, code: err.code });
      // A 409 means an appointment is already pending — booked in another tab,
      // or created since this page loaded. The response carries it, so the
      // revoke panel can replace the form at once; otherwise re-read status
      // rather than leaving the visitor to submit into the same wall.
      if (err.appointment) adopt(err.appointment);
      else if (err.code !== "NETWORK" && err.code !== "TIMEOUT") refresh();
    }
  };

  const addToCalendar = () => {
    downloadICS(
      buildICS({
        dateISO: date,
        startMinutes: slot,
        description: [
          `Matter: ${matter}`,
          `Mode: ${modeLabel(mode)}`,
          "Please carry any documents relating to your matter.",
        ].join("\n"),
        location: mode === "office" ? office.addressLines.join(", ") : modeLabel(mode),
        organiser: contact.email,
        uidSeed: form.phone,
      })
    );
  };

  /* ---------------- Blocked: an appointment is already pending ---------------- */

  // Deliberately NOT gated on `loading`. Blocking the form behind a spinner
  // would mean the prerendered page — the one crawlers and no-JS visitors
  // get — contains no booking form at all, and it would delay the form for
  // the overwhelming majority who have nothing pending.
  //
  // So the form renders straight away and the panel below replaces it if the
  // status check comes back with an active appointment. If the check has not
  // landed before someone submits, the API answers 409 with the blocking
  // appointment attached, which lands them here anyway.
  if (hasActive && state.status !== "confirmed") {
    return (
      <>
        <Seo />
        <PageHeader
          eyebrow="Consultation"
          title="You already have an appointment"
          intro="Only one appointment can be pending at a time. Revoke this one to free the slot, and you can book a new date straight away."
          crumbs={[{ label: "Book a Consultation" }]}
        />

        <section className="section section--tight">
          <div className="container container--narrow">
            <div className="bookblock">
              <div className="apptcard">
                <div className="apptcard__when">
                  <span className="apptcard__rel">{relativeDay(apptDate(pending))}</span>
                  <strong className="apptcard__time">{formatTime12(apptTime(pending))}</strong>
                  <span className="apptcard__date">{formatApptDate(apptDate(pending))}</span>
                </div>
                <div className="apptcard__meta">
                  <span className={`pill pill--${statusTone(pending.status)}`}>
                    <span className="pill__dot" aria-hidden="true" />
                    {statusLabel(pending.status)}
                  </span>
                  {apptType(pending) && <span className="apptcard__type">{apptType(pending)}</span>}
                </div>
              </div>

              <dl className="apptdetails">
                <div>
                  <dt>Name</dt>
                  <dd>{pending.name}</dd>
                </div>
                <div>
                  <dt>Phone</dt>
                  <dd>{pending.phone}</dd>
                </div>
                {pending.email && (
                  <div>
                    <dt>Email</dt>
                    <dd>{pending.email}</dd>
                  </div>
                )}
              </dl>

              <div className="bookblock__choice">
                <div>
                  <h2>Keep this appointment</h2>
                  <p>
                    Nothing to do — the chamber will contact you on {pending.phone} to confirm. If you
                    only need a small change, it is quicker to call than to rebook.
                  </p>
                  <div className="bookblock__actions">
                    <a href={`tel:${contact.phone.replace(/\s+/g, "")}`} className="btn btn--primary btn--sm">
                      <Icon name="phone" width={16} height={16} /> Call {contact.phone}
                    </a>
                    <a href={`mailto:${contact.email}`} className="btn btn--ghost btn--sm">
                      <Icon name="mail" width={16} height={16} /> Email
                    </a>
                  </div>
                </div>

                <div>
                  <h2>Book a different slot</h2>
                  <p>
                    Revoke the appointment above to release it, then choose a new date and time. This
                    cannot be undone — the slot is given up immediately.
                  </p>
                  <div className="bookblock__actions">
                    <RevokeButton
                      className="btn btn--danger btn--sm"
                      label="Revoke and book again"
                    />
                  </div>
                </div>
              </div>

              <p className="contact__disclaimer">
                Revoking withdraws your request to the chamber. It does not cancel any hearing, notice
                or court date.
              </p>
            </div>
          </div>
        </section>
      </>
    );
  }

  /* ---------------- Confirmation states ---------------- */

  if (state.status === "confirmed") {
    return (
      <>
        <Seo />
        <PageHeader
          eyebrow="Consultation"
          title="Appointment requested"
          crumbs={[{ label: "Book a Consultation" }]}
        />
        <section className="section section--tight">
          <div className="container container--narrow">
            <div className="bookdone">
              <span className="bookdone__icon">
                <Icon name="check" width={30} height={30} strokeWidth={3} />
              </span>

              <h2>We have your request</h2>
              <p>
                The chamber will contact you on <strong>{form.phone}</strong> to confirm.
                {state.appointment?.id && (
                  <> Your reference number is <strong>#{state.appointment.id}</strong>.</>
                )}
              </p>

              <dl className="bookdone__summary">
                <div><dt>Date</dt><dd>{formatLongDate(date)}</dd></div>
                <div><dt>Time</dt><dd>{formatSlot(slot)} ({SLOT_MINUTES} min)</dd></div>
                <div><dt>Mode</dt><dd>{modeLabel(mode)}</dd></div>
                <div><dt>Matter</dt><dd>{matter}</dd></div>
              </dl>

              <p className="bookdone__note">
                This slot is a request, not a confirmed appointment, until the chamber contacts you.
                Court listings can move without notice.
              </p>

              <div className="prose__siblings">
                <button type="button" className="btn btn--sm btn--ghost" onClick={addToCalendar}>
                  <Icon name="calendar" width={16} height={16} /> Add to calendar
                </button>
                <a href={`tel:${contact.phone.replace(/\s+/g, "")}`} className="btn btn--sm btn--ghost">
                  <Icon name="phone" width={16} height={16} /> Call the chamber
                </a>
                <Link to="/" className="btn btn--sm btn--ghost">
                  Back to home <Icon name="arrow" width={15} height={15} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  /* ---------------- Booking form ---------------- */

  return (
    <>
      <Seo />
      <PageHeader
        eyebrow="Consultation"
        title="Book a Consultation"
        intro={`Choose a time that suits you within the next ${BOOKING_WINDOW_DAYS} days. Slots follow the chamber's court schedule, so what you see here is genuinely available.`}
        crumbs={[{ label: "Book a Consultation" }]}
      />

      <section className="section section--tight">
        <div className="container container--narrow">
          <form className="book" onSubmit={onSubmit}>
            {/* Step 1 — date */}
            <fieldset className="book__step">
              <legend><span className="book__num">1</span> Pick a date</legend>
              <div className="daystrip" role="radiogroup" aria-label="Consultation date">
                {days.map((d) => {
                  const disabled = d.slotCount === 0;
                  return (
                    <button
                      key={d.iso}
                      type="button"
                      role="radio"
                      aria-checked={date === d.iso}
                      disabled={disabled}
                      title={
                        d.byAppointmentOnly
                          ? "Sunday — by appointment only, please call the chamber"
                          : disabled
                            ? "No slots left on this day"
                            : undefined
                      }
                      className={`day ${date === d.iso ? "is-active" : ""} ${disabled ? "is-closed" : ""}`}
                      onClick={() => {
                        setDate(d.iso);
                        setSlot(null);
                      }}
                    >
                      <span className="day__dow">{d.isToday ? "Today" : d.dayLabel}</span>
                      <span className="day__num">{d.dayNum}</span>
                      <span className="day__mon">{d.monthLabel}</span>
                    </button>
                  );
                })}
              </div>
              {selectedDay?.byAppointmentOnly && (
                <p className="book__hint">
                  Sundays are by appointment only.{" "}
                  <a href={`tel:${contact.phone.replace(/\s+/g, "")}`}>Call the chamber</a> to arrange one.
                </p>
              )}
            </fieldset>

            {/* Step 2 — slot */}
            <fieldset className="book__step">
              <legend><span className="book__num">2</span> Pick a time</legend>
              {slots.length === 0 ? (
                <p className="book__hint">
                  No slots remain on {formatLongDate(date)}. Please choose another day.
                </p>
              ) : (
                <div className="slots" role="radiogroup" aria-label="Consultation time">
                  {slots.map((s) => (
                    <button
                      key={s}
                      type="button"
                      role="radio"
                      aria-checked={slot === s}
                      className={`slot ${slot === s ? "is-active" : ""}`}
                      onClick={() => setSlot(s)}
                    >
                      {formatSlot(s)}
                    </button>
                  ))}
                </div>
              )}
              <p className="book__hint">
                Each consultation is {SLOT_MINUTES} minutes. Office hours: {office.hours[0].time} Mon–Fri,{" "}
                {office.hours[1].time} Saturday.
              </p>
            </fieldset>

            {/* Step 3 — how */}
            <fieldset className="book__step">
              <legend><span className="book__num">3</span> How would you like to meet?</legend>
              <div className="modes">
                {CONSULT_MODES.map((m) => (
                  <button
                    key={m.key}
                    type="button"
                    aria-pressed={mode === m.key}
                    className={`mode ${mode === m.key ? "is-active" : ""}`}
                    onClick={() => setMode(m.key)}
                  >
                    <Icon name={m.icon} width={20} height={20} />
                    <strong>{m.label}</strong>
                    <span>{m.hint}</span>
                  </button>
                ))}
              </div>
            </fieldset>

            {/* Step 4 — details */}
            <fieldset className="book__step">
              <legend><span className="book__num">4</span> Your details</legend>
              <div className="book__grid">
                <div className="field">
                  <label htmlFor="bname">Full name</label>
                  <input
                    id="bname"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    autoComplete="name"
                  />
                </div>
                <div className="field">
                  <label htmlFor="bphone">Phone</label>
                  <input
                    id="bphone"
                    type="tel"
                    required
                    pattern="[0-9+\s-]{10,15}"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 …"
                    autoComplete="tel"
                  />
                </div>
                <div className="field">
                  <label htmlFor="bemail">Email <span className="field__opt">(optional)</span></label>
                  <input
                    id="bemail"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                </div>
                <div className="field">
                  <label htmlFor="bmatter">Type of matter</label>
                  <select id="bmatter" value={matter} onChange={(e) => setMatter(e.target.value)}>
                    {MATTERS.map((m) => (
                      <option key={m}>{m}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="field">
                <label htmlFor="bdetails">Briefly, what is it about? (optional)</label>
                <textarea
                  id="bdetails"
                  rows="3"
                  value={form.details}
                  onChange={(e) => setForm({ ...form, details: e.target.value })}
                  placeholder="A sentence or two is enough — please leave out confidential details."
                />
              </div>
            </fieldset>

            {state.status === "error" && (
              <div className="book__error">
                <Icon name="alert" width={17} height={17} />
                <div>
                  <p>
                    {state.message}
                    {state.code === "PAST_APPOINTMENT" && (
                      <> Please pick a later date or time above.</>
                    )}
                  </p>
                  {/* The daily cap closes online booking entirely, so the
                      visitor is handed a channel that still works rather than
                      a dead end. */}
                  {(state.code === "APPOINTMENT_LIMIT_EXCEEDED" ||
                    state.code === "NETWORK" ||
                    state.code === "TIMEOUT") && (
                    <div className="book__erroractions">
                      <a
                        href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                        className="btn btn--primary btn--sm"
                      >
                        <Icon name="phone" width={16} height={16} /> Call {contact.phone}
                      </a>
                      <a href={`mailto:${contact.email}`} className="btn btn--ghost btn--sm">
                        <Icon name="mail" width={16} height={16} /> Email the chamber
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="book__submit">
              <button type="submit" className="btn btn--primary" disabled={state.status === "sending"}>
                {state.status === "sending" ? "Requesting…" : "Request this slot"}
                <Icon name={state.status === "sending" ? "refresh" : "arrow"} width={18} height={18} />
              </button>
            </div>

            <p className="contact__disclaimer">
              Requesting a consultation does not create an advocate–client relationship, and the slot is
              confirmed only when the chamber contacts you. Please do not send confidential documents
              through this form — see our <Link to="/privacy-policy">Privacy Policy</Link>.
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
