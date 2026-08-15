import { createContext, useContext } from "react";

/**
 * The visitor's appointment state, shared by the site-wide popup and the
 * booking page.
 *
 * Shared rather than fetched twice on purpose: only one appointment may be
 * pending at a time, so if the visitor revokes from the popup, the booking
 * form must unlock in the same instant — and vice versa.
 */
export const AppointmentContext = createContext(null);

export function useAppointments() {
  const value = useContext(AppointmentContext);
  if (!value) throw new Error("useAppointments must be used inside <AppointmentProvider>");
  return value;
}
