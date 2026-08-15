import { useCallback, useEffect, useMemo, useState } from "react";
import { AppointmentContext } from "../lib/appointmentContext";
import { fetchAppointmentStatus, revokeAppointment } from "../lib/appointments";

/**
 * Holds the visitor's appointment state for the whole site.
 *
 * The API allows one pending appointment per visitor and refuses a second
 * until the first is revoked. That single rule is why this is shared state
 * rather than two independent fetches: revoking from the popup has to unlock
 * the booking form immediately, and booking has to make the popup appear.
 *
 * A failed load is held quietly. Appointment status is ambient information —
 * a visitor who has never booked anything should never see an error about it.
 */
export default function AppointmentProvider({ children }) {
  const [state, setState] = useState({
    loading: true,
    hasActive: false,
    appointment: null,
    history: [],
    error: null,
  });

  const load = useCallback(async () => {
    try {
      const result = await fetchAppointmentStatus();
      setState({ loading: false, error: null, ...result });
      return result;
    } catch (err) {
      setState((s) => ({ ...s, loading: false, error: err }));
      return null;
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  /**
   * Record an appointment the server has just told us about — used when a
   * booking is refused with 409 ACTIVE_APPOINTMENT_EXISTS, which returns the
   * blocking appointment inline. Switching on it directly means the booking
   * page shows the revoke panel immediately rather than after another fetch.
   */
  const adopt = useCallback((appointment) => {
    if (!appointment) return;
    setState((s) => ({ ...s, loading: false, hasActive: true, appointment }));
  }, []);

  /**
   * Revoke the pending appointment. Throws on failure so the calling button
   * can surface the reason; on success the freed state is applied at once and
   * then reconciled with the server.
   */
  const revoke = useCallback(async () => {
    let revoked = null;
    try {
      revoked = await revokeAppointment();
    } catch (err) {
      // Nothing pending — which is the state the visitor was asking for, so
      // this is a success, not an error. Happens when a second tab revoked
      // first, or the appointment expired while the page was open.
      if (err.code !== "NO_ACTIVE_APPOINTMENT") throw err;
    }

    // Apply optimistically so the form unlocks without waiting for a round
    // trip, keeping the revoked record visible at the top of history.
    setState((s) => ({
      ...s,
      hasActive: false,
      appointment: null,
      history: revoked ? [revoked, ...s.history] : s.history,
    }));

    // Then reconcile — the server decides what the history really looks like.
    load();
    return revoked;
  }, [load]);

  const value = useMemo(
    () => ({ ...state, refresh: load, revoke, adopt }),
    [state, load, revoke, adopt]
  );

  return <AppointmentContext.Provider value={value}>{children}</AppointmentContext.Provider>;
}
