/* =========================================================================
   INDIAN STANDARD TIME

   Every time on this site belongs to a court or a chamber in Hajipur, so
   every time must be reckoned in IST — not in whatever zone the visitor's
   device happens to be set to.

   This is not a hypothetical. A meaningful share of an Indian chamber's
   clients are abroad: an NRI with a property dispute in Vaishali, a spouse
   in a matrimonial matter living overseas, a client travelling. Left to the
   device clock, a visitor in New York would see the office marked "Open Now"
   at 10am their time (7:30pm and closed in Hajipur), be offered booking
   slots on the wrong calendar day, and read the wrong number of days left
   before a limitation period expires.

   IST is UTC+5:30 year-round with no daylight saving, so a fixed offset is
   exact and no timezone database is needed.
   ========================================================================= */

// NOTE: modules in src/lib import this with an explicit .js extension so they
// stay loadable by bare Node for testing. Vite accepts either form.

export const IST_OFFSET_MINUTES = 330;

const MINUTE_MS = 60000;
const DAY_MS = 86400000;

/**
 * "Now", shifted so that this Date's LOCAL getters read the IST wall clock.
 *
 * ⚠ The returned Date does NOT represent the correct instant — it is offset
 * deliberately. Use it only to read wall-clock parts (getHours, getDate,
 * getDay …). Never compare it against a real Date, and never send it
 * anywhere. For calendar arithmetic use `daysBetweenISO` below, which avoids
 * timezones entirely.
 */
export function istNow(instant = new Date()) {
  return new Date(instant.getTime() + (IST_OFFSET_MINUTES + instant.getTimezoneOffset()) * MINUTE_MS);
}

/** "2026-08-18" from a Date, read via its local getters. */
export const toISODate = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

/** Today's date in India, as "YYYY-MM-DD". */
export const istToday = () => toISODate(istNow());

/** Minutes since midnight, right now, in India. */
export function istMinutesOfDay() {
  const d = istNow();
  return d.getHours() * 60 + d.getMinutes();
}

/** Day of week in India: 0 = Sunday. */
export const istDayOfWeek = () => istNow().getDay();

/* ------------------------------------------------------------------ *
 * Calendar arithmetic
 *
 * Done on date strings through Date.UTC, so it is unaffected by both the
 * device's zone and by daylight-saving transitions in it. A "day" here is a
 * calendar day, which is what "3 days until your hearing" means.
 * ------------------------------------------------------------------ */

/** Midnight UTC for a "YYYY-MM-DD", as milliseconds. */
export function isoToUTCms(iso) {
  const [y, m, d] = String(iso).slice(0, 10).split("-").map(Number);
  if (!Number.isFinite(y) || !Number.isFinite(m) || !Number.isFinite(d)) return NaN;
  return Date.UTC(y, m - 1, d);
}

/** Whole calendar days from `fromISO` to `toISO`; negative if in the past. */
export function daysBetweenISO(fromISO, toISO) {
  const a = isoToUTCms(fromISO);
  const b = isoToUTCms(toISO);
  if (Number.isNaN(a) || Number.isNaN(b)) return null;
  return Math.round((b - a) / DAY_MS);
}

/** Whole calendar days from today-in-India to `iso`. */
export const daysFromISTToday = (iso) => daysBetweenISO(istToday(), iso);

/** Add days to a "YYYY-MM-DD", returning a "YYYY-MM-DD". */
export function addDaysISO(iso, days) {
  const ms = isoToUTCms(iso);
  if (Number.isNaN(ms)) return null;
  return new Date(ms + days * DAY_MS).toISOString().slice(0, 10);
}

/** Add calendar years to a "YYYY-MM-DD" (29 Feb + 1 year → 1 Mar). */
export function addYearsISO(iso, years) {
  const [y, m, d] = String(iso).slice(0, 10).split("-").map(Number);
  if (!Number.isFinite(y)) return null;
  return new Date(Date.UTC(y + years, m - 1, d)).toISOString().slice(0, 10);
}

/**
 * Format a "YYYY-MM-DD" for display without letting the device's zone shift
 * it. Parsing a bare date as local and formatting it is safe in most zones
 * but not all, so the parts are handed to the formatter as a UTC instant.
 */
export function formatISODate(iso, options = { day: "numeric", month: "long", year: "numeric" }) {
  const ms = isoToUTCms(iso);
  if (Number.isNaN(ms)) return iso || "";
  return new Date(ms).toLocaleDateString("en-IN", { ...options, timeZone: "UTC" });
}
