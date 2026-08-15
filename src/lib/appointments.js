/* =========================================================================
   Appointments API client.

   The API identifies the visitor by their IP address, so there is nothing to
   authenticate and nothing to store in the browser: a GET simply returns
   whatever appointment that IP currently holds.

     GET  /appointment?status=PENDING
       → { success, hasActiveAppointment, appointment | null, history[] }

     POST /appointment
       → { success, message, appointment }
       → 400 { error: { code: "PAST_APPOINTMENT", message } }
       → 409 { success: false, code: "ACTIVE_APPOINTMENT_EXISTS", message, appointment }
       → 429 { success: false, code: "APPOINTMENT_LIMIT_EXCEEDED", message, limit,
               appointmentsLast24Hours }   — max 3 bookings per 24 hours

     POST /appointment/revoke
       → { success, code: "APPOINTMENT_REVOKED", message, appointment }
       → 404 { success: false, code: "NO_ACTIVE_APPOINTMENT", message }

   Only one appointment may be pending per visitor. A second booking is
   refused until the pending one is revoked, which is why the booking page
   checks for an existing appointment before showing its form.

   Records use snake_case (`appointment_date`) on the way out and camelCase
   (`appointmentDate`) on the way in. Both shapes are handled here so no
   component has to think about it.
   ========================================================================= */

import { daysFromISTToday, formatISODate } from "./istTime.js";

// The API's CORS policy names the production hostname, so localhost cannot
// call it directly. In `npm run dev` requests go through the /api/appointment
// proxy defined in vite.config.js, which supplies an allowed Origin.
const BASE = import.meta.env?.VITE_APPOINTMENTS_API || "";
const ENDPOINT = BASE
  ? `${BASE.replace(/\/$/, "")}/appointment`
  : import.meta.env?.DEV
    ? "/api/appointment"
    : "https://api.ramsnehimishra.in/appointment";

const TIMEOUT_MS = 15000;

export class AppointmentError extends Error {
  constructor(message, { code = "FAILED", status, appointment = null } = {}) {
    super(message);
    this.name = "AppointmentError";
    this.code = code;
    this.status = status;
    // A 409 ACTIVE_APPOINTMENT_EXISTS carries the blocking appointment, which
    // saves the caller a round trip to find out what it is.
    this.appointment = appointment;
  }
}

async function request(url, init = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  let res;
  try {
    res = await fetch(url, { ...init, signal: controller.signal });
  } catch (err) {
    clearTimeout(timer);
    throw new AppointmentError(
      err?.name === "AbortError"
        ? "That took longer than expected. Please try again."
        : "Could not reach the booking service. Please check your connection and try again, or call the chamber.",
      { code: err?.name === "AbortError" ? "TIMEOUT" : "NETWORK" }
    );
  }
  clearTimeout(timer);

  let payload = null;
  try {
    payload = await res.json();
  } catch {
    payload = null;
  }

  if (!res.ok) {
    // The API uses two failure shapes, so both are read:
    //   POST /appointment         → { error: { code, message } }
    //   POST /appointment/revoke  → { success: false, code, message }
    // Surfacing the server's own wording matters — "You cannot book an
    // appointment for a past date or time" beats any generic message.
    throw new AppointmentError(
      payload?.error?.message ||
        payload?.message ||
        `The booking service returned an error (${res.status}).`,
      {
        code: payload?.error?.code || payload?.code || "HTTP",
        status: res.status,
        appointment: payload?.appointment || null,
      }
    );
  }

  return payload;
}

/* ------------------------------------------------------------------ *
 * Reading
 * ------------------------------------------------------------------ */

/**
 * Current appointment for this visitor, plus their history.
 * Always resolves to a usable shape, even on an unexpected payload.
 */
export async function fetchAppointmentStatus({ status = "PENDING" } = {}) {
  const data = await request(`${ENDPOINT}?status=${encodeURIComponent(status)}`, {
    method: "GET",
    headers: { Accept: "application/json" },
  });

  return {
    hasActive: Boolean(data?.hasActiveAppointment && data?.appointment),
    appointment: data?.appointment || null,
    history: Array.isArray(data?.history) ? data.history : [],
    message: data?.message || "",
  };
}

/* ------------------------------------------------------------------ *
 * Writing
 * ------------------------------------------------------------------ */

/**
 * Submit a new appointment request.
 * @throws {AppointmentError} with the API's own `code` (e.g. PAST_APPOINTMENT)
 */
export async function createAppointment({
  name,
  phone,
  email,
  appointmentDate,
  appointmentTime,
  consultationType,
  message,
}) {
  const data = await request(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      name,
      phone,
      email: email || "",
      appointmentDate,
      appointmentTime,
      consultationType,
      message: message || "",
    }),
  });

  return data?.appointment || null;
}

/**
 * Revoke the visitor's pending appointment.
 *
 * Takes no body — the API resolves the caller by IP, exactly as the GET does.
 * Resolves to the revoked appointment record (now status REVOKED), which the
 * caller can drop straight into history without another round trip.
 *
 * Throws AppointmentError with code NO_ACTIVE_APPOINTMENT (HTTP 404) when
 * there is nothing pending. Callers should treat that as success — it means
 * the visitor is already free to book, which is all they were asking for.
 */
export async function revokeAppointment() {
  const data = await request(`${ENDPOINT}/revoke`, {
    method: "POST",
    headers: { Accept: "application/json" },
  });
  return data?.appointment || null;
}

/* ------------------------------------------------------------------ *
 * Record helpers — normalise the snake_case API shape
 * ------------------------------------------------------------------ */

export const apptDate = (a) => a?.appointment_date || a?.appointmentDate || "";
export const apptTime = (a) => a?.appointment_time || a?.appointmentTime || "";
export const apptType = (a) => a?.consultation_type || a?.consultationType || "";

/** "18:57" → 1137 minutes since midnight. */
export function timeToMinutes(time) {
  const [h, m] = String(time || "").split(":").map(Number);
  if (!Number.isFinite(h) || !Number.isFinite(m)) return null;
  return h * 60 + m;
}

/** 1137 → "6:57 PM". */
export function formatTime12(time) {
  const mins = timeToMinutes(time);
  if (mins == null) return time || "";
  const h24 = Math.floor(mins / 60);
  const m = mins % 60;
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${h24 < 12 ? "AM" : "PM"}`;
}

export const formatLongDate = (iso) =>
  iso ? formatISODate(iso, { weekday: "long", day: "numeric", month: "long", year: "numeric" }) : "";

export const formatShortDate = (iso) =>
  iso ? formatISODate(iso, { day: "numeric", month: "short", year: "numeric" }) : "";

/**
 * "Today", "Tomorrow", "In 4 days", "Yesterday" — counted in whole calendar
 * days rather than by elapsed hours, so an appointment later today never
 * reads as "in 0 days".
 */
export function relativeDay(iso) {
  if (!iso) return "";
  // Counted against today in India: an appointment is "today" because it is
  // today in Hajipur, not because it is still today where the visitor is.
  const days = daysFromISTToday(iso);
  if (days == null) return "";

  if (days === 0) return "Today";
  if (days === 1) return "Tomorrow";
  if (days === -1) return "Yesterday";
  if (days > 1) return `In ${days} days`;
  return `${Math.abs(days)} days ago`;
}

/** Visual tone for a status badge. Unknown statuses fall back to neutral. */
export function statusTone(status) {
  switch (String(status || "").toUpperCase()) {
    case "CONFIRMED":
    case "COMPLETED":
      return "ok";
    case "PENDING":
      return "warn";
    case "CANCELLED":
    case "REJECTED":
      return "danger";
    case "EXPIRED":
    // Revoked by the visitor themselves, so it is shown neutrally rather
    // than in the red reserved for a refusal by the chamber.
    case "REVOKED":
      return "muted";
    default:
      return "muted";
  }
}

/**
 * PENDING is the API's word for "booked, awaiting the chamber's call back".
 * To a client "Pending" reads as limbo — as though nothing has happened — so
 * the UI calls it Active. The gold pill still keeps it visually distinct from
 * a CONFIRMED appointment, which is a different and stronger statement.
 */
const STATUS_LABELS = {
  PENDING: "Active",
};

export function statusLabel(status) {
  const s = String(status || "").toUpperCase();
  if (!s) return "Unknown";
  return STATUS_LABELS[s] || s.charAt(0) + s.slice(1).toLowerCase();
}
