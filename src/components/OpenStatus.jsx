import { useEffect, useState } from "react";
import { istNow } from "../lib/istTime";

// Live open/closed badge computed from the office schedule:
// Mon–Fri 9:00–18:00, Sat 9:00–14:00, Sun by appointment.
//
// Reckoned in IST, never the device's zone — the chamber in Hajipur is open
// or shut regardless of where the person looking at this page is sitting.
function getStatus(now) {
  const day = now.getDay(); // 0 = Sunday
  const mins = now.getHours() * 60 + now.getMinutes();
  const open = 9 * 60;
  const close = day === 6 ? 14 * 60 : 18 * 60;

  if (day === 0) return { state: "appt", label: "By Appointment Today" };
  if (mins < open) return { state: "closed", label: "Closed · Opens 9:00 AM" };
  if (mins < close)
    return { state: "open", label: `Open Now · Closes ${day === 6 ? "2:00" : "6:00"} PM` };
  return { state: "closed", label: day === 6 ? "Closed · Opens Mon 9:00 AM" : "Closed · Opens 9:00 AM" };
}

export default function OpenStatus() {
  // Starts null so the prerendered HTML and the first client render agree —
  // the build machine's clock is not the visitor's. The real status appears
  // on the first effect, a frame later.
  const [status, setStatus] = useState(null);

  useEffect(() => {
    setStatus(getStatus(istNow()));
    const id = setInterval(() => setStatus(getStatus(istNow())), 60_000);
    return () => clearInterval(id);
  }, []);

  if (!status) return <span className="openstatus openstatus--pending" />;

  return (
    <span className={`openstatus openstatus--${status.state}`}>
      <span className="openstatus__dot" aria-hidden="true" />
      {status.label}
    </span>
  );
}
