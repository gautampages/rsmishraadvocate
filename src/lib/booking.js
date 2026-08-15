/* =========================================================================
   Appointment booking — slot generation and calendar export.

   The office schedule is the source of truth for which slots exist:
     Mon–Fri  09:00–18:00
     Saturday 09:00–14:00
     Sunday   by appointment only (no online slots; arranged by phone)

   Submission itself lives in src/lib/appointments.js, which talks to the
   appointments API. This module only decides which slots may be offered and
   turns a booked slot into a calendar entry.
   ========================================================================= */

import { formatISODate, istNow, toISODate } from "./istTime.js";

export const SLOT_MINUTES = 30;

// Don't offer a slot starting less than this many minutes from now.
const LEAD_TIME_MINUTES = 120;

// How far ahead the calendar runs.
export const BOOKING_WINDOW_DAYS = 30;

const HOURS = {
  // day index (0 = Sunday) → [openMinute, closeMinute] or null
  0: null,
  1: [9 * 60, 18 * 60],
  2: [9 * 60, 18 * 60],
  3: [9 * 60, 18 * 60],
  4: [9 * 60, 18 * 60],
  5: [9 * 60, 18 * 60],
  6: [9 * 60, 14 * 60],
};

export const CONSULT_MODES = [
  { key: "office", label: "At the chamber", icon: "building", hint: "Reliance Tower Campus, Hajipur" },
  { key: "phone", label: "Telephone", icon: "phone", hint: "The chamber calls you at the slot time" },
];

export { toISODate };

/** Minutes-since-midnight → "9:30 AM". */
export function formatSlot(minutes) {
  const h24 = Math.floor(minutes / 60);
  const m = minutes % 60;
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${h24 < 12 ? "AM" : "PM"}`;
}

export const parseISODate = (iso) => new Date(`${iso}T00:00:00`);

export const formatLongDate = (iso) =>
  formatISODate(iso, { weekday: "long", day: "numeric", month: "long", year: "numeric" });

/**
 * The next `BOOKING_WINDOW_DAYS` days, each marked with whether the chamber
 * is open. `from` defaults to now-in-India, so a visitor abroad is offered
 * the chamber's calendar rather than their own.
 *
 * Closed days stay in the list so the visitor can see *why* a day is
 * unavailable rather than finding it silently missing.
 */
export function buildCalendar(from = istNow()) {
  const days = [];
  for (let i = 0; i < BOOKING_WINDOW_DAYS; i += 1) {
    const d = new Date(from);
    d.setDate(from.getDate() + i);
    d.setHours(0, 0, 0, 0);
    const window = HOURS[d.getDay()];
    days.push({
      iso: toISODate(d),
      date: d,
      dayLabel: d.toLocaleDateString("en-IN", { weekday: "short" }),
      dayNum: d.getDate(),
      monthLabel: d.toLocaleDateString("en-IN", { month: "short" }),
      isToday: i === 0,
      byAppointmentOnly: window === null,
      slotCount: window ? slotsFor(toISODate(d), from).length : 0,
    });
  }
  return days;
}

/**
 * Bookable slot start times for a date, as minutes since midnight IST.
 * Slots already past (or inside the lead time) are dropped for today —
 * "past" measured against the clock in Hajipur, not the visitor's.
 */
export function slotsFor(iso, now = istNow()) {
  const date = parseISODate(iso);
  const window = HOURS[date.getDay()];
  if (!window) return [];

  const [open, close] = window;
  const isToday = toISODate(now) === iso;
  const earliest = isToday ? now.getHours() * 60 + now.getMinutes() + LEAD_TIME_MINUTES : -Infinity;

  const slots = [];
  for (let t = open; t + SLOT_MINUTES <= close; t += SLOT_MINUTES) {
    if (t >= earliest) slots.push(t);
  }
  return slots;
}

/* ------------------------------------------------------------------ *
 * Calendar file
 * ------------------------------------------------------------------ */

// IST is UTC+5:30 with no daylight saving, so a fixed offset is exact.
const IST_OFFSET_MINUTES = 330;

/**
 * An appointment time is an IST wall-clock time. Converting it to the UTC
 * stamp an .ics file needs must not go through a local Date: `new Date("…
 * T00:00:00")` is midnight in *the viewer's* zone, so subtracting the IST
 * offset from it double-counts for a visitor already in India and
 * under-counts for one abroad. Date.UTC sidesteps the local zone entirely.
 */
function toICSStamp(iso, minutesSinceMidnight) {
  const [y, m, d] = String(iso).split("-").map(Number);
  const at = new Date(
    Date.UTC(y, m - 1, d) + (minutesSinceMidnight - IST_OFFSET_MINUTES) * 60000
  );
  const pad = (n) => String(n).padStart(2, "0");
  return (
    `${at.getUTCFullYear()}${pad(at.getUTCMonth() + 1)}${pad(at.getUTCDate())}` +
    `T${pad(at.getUTCHours())}${pad(at.getUTCMinutes())}00Z`
  );
}

const escapeICS = (s) => String(s).replace(/([,;\\])/g, "\\$1").replace(/\n/g, "\\n");

/**
 * An .ics file body, as a string.
 *
 * Generic on purpose: both the booking confirmation and the "you have an
 * appointment" popup produce calendar entries, and they hold their data in
 * different shapes (a form's slot minutes vs the API's "18:57").
 */
export function buildICS({
  dateISO,
  startMinutes,
  durationMinutes = SLOT_MINUTES,
  summary = "Legal consultation — Adv. Ram Snehi Mishra",
  description = "",
  location = "",
  organiser,
  uidSeed = "",
}) {
  const start = toICSStamp(dateISO, startMinutes);
  const end = toICSStamp(dateISO, startMinutes + durationMinutes);

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Advocate Ram Snehi Mishra//Consultation//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${start}-${String(uidSeed).replace(/\W/g, "") || "appt"}@ramsnehimishra.in`,
    `DTSTAMP:${start}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${escapeICS(summary)}`,
    `DESCRIPTION:${escapeICS(description)}`,
    `LOCATION:${escapeICS(location)}`,
    ...(organiser ? [`ORGANIZER;CN=Advocate Ram Snehi Mishra:mailto:${organiser}`] : []),
    "BEGIN:VALARM",
    "TRIGGER:-PT2H",
    "ACTION:DISPLAY",
    "DESCRIPTION:Legal consultation in 2 hours",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

/** Trigger a browser download of an .ics file. */
export function downloadICS(ics, filename = "consultation-adv-ram-snehi-mishra.ics") {
  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/** Minutes since midnight → "18:30", the format the appointments API wants. */
export const minutesToTime24 = (minutes) =>
  `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
