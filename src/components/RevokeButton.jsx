import { useState } from "react";
import { Icon } from "./Icons";
import { useAppointments } from "../lib/appointmentContext";

/**
 * Revokes the pending appointment, behind a confirmation step.
 *
 * Revoking is not recoverable — the slot is given up and a new booking has to
 * be made from scratch — so the first press asks rather than acts.
 */
export default function RevokeButton({
  className = "btn btn--ghost btn--sm",
  label = "Revoke appointment",
  onRevoked,
}) {
  const { revoke } = useAppointments();
  const [phase, setPhase] = useState("idle"); // idle → confirming → working
  const [error, setError] = useState(null);

  const doRevoke = async () => {
    setPhase("working");
    setError(null);
    try {
      const revoked = await revoke();
      onRevoked?.(revoked);
      // No need to reset phase: the component unmounts with the record it
      // belongs to once the appointment is gone.
    } catch (err) {
      setError(err.message || "Could not revoke the appointment. Please try again.");
      setPhase("idle");
    }
  };

  if (phase === "confirming") {
    return (
      <div className="revoke">
        <p className="revoke__ask">
          <Icon name="alert" width={16} height={16} />
          <span>Give up this slot? You will need to book again from scratch.</span>
        </p>
        <div className="revoke__actions">
          <button type="button" className="btn btn--sm btn--danger" onClick={doRevoke}>
            Yes, revoke it
          </button>
          <button type="button" className="btn btn--sm btn--ghost" onClick={() => setPhase("idle")}>
            Keep it
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="revoke">
      <button
        type="button"
        className={className}
        disabled={phase === "working"}
        onClick={() => setPhase("confirming")}
      >
        <Icon name={phase === "working" ? "refresh" : "close"} width={15} height={15} />
        {phase === "working" ? "Revoking…" : label}
      </button>
      {error && (
        <p className="revoke__error">
          <Icon name="alert" width={15} height={15} /> {error}
        </p>
      )}
    </div>
  );
}
