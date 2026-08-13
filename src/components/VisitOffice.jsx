import { useState } from "react";
import { office } from "../data/content";
import { Icon } from "./Icons";
import Reveal from "./Reveal";

export default function VisitOffice() {
  const [copied, setCopied] = useState(false);
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(office.mapQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(office.mapQuery)}`;

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(office.addressLines.join(", "));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="office" className="section section--alt">
      <div className="container">
        <Reveal className="section__head">
          <h2 className="section__title">{office.heading}</h2>
          <span className="section__rule section__rule--center" />
        </Reveal>

        <div className="office">
          <Reveal className="office__map">
            <iframe
              title="Office location map"
              src={mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="office__maplinks">
              <a href={directions} target="_blank" rel="noreferrer" className="office__directions">
                <Icon name="pin" width={16} height={16} /> Get Directions
              </a>
              <a href={office.mapProfileUrl} target="_blank" rel="noreferrer" className="office__directions">
                <Icon name="scales" width={16} height={16} /> View on Google Maps
              </a>
            </div>
          </Reveal>

          <div className="office__side">
            <Reveal className="office__panel">
              <h3 className="office__paneltitle">
                <Icon name="building" width={22} height={22} /> {office.addressTitle}
              </h3>
              <address className="office__address">
                <strong>{office.addressLines[0]}</strong>
                {office.addressLines.slice(1).map((l) => (
                  <span key={l}>{l}</span>
                ))}
              </address>
              <button className="btn btn--sm btn--primary" onClick={copyAddress}>
                <Icon name="doc" width={16} height={16} /> {copied ? "Copied!" : "Copy Address"}
              </button>
            </Reveal>

            <Reveal className="office__panel" delay={120}>
              <h3 className="office__paneltitle">
                <Icon name="clock" width={22} height={22} /> {office.hoursTitle}
              </h3>
              <ul className="hours">
                {office.hours.map((h) => (
                  <li key={h.day} className="hours__row">
                    <span className="hours__day">{h.day}</span>
                    <span className="hours__time">{h.time}</span>
                    <span className={`hours__badge ${h.status === "Open" ? "hours__badge--open" : "hours__badge--appt"}`}>
                      {h.status}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="office__panel" delay={200}>
              <h3 className="office__paneltitle">
                <Icon name="pin" width={22} height={22} /> {office.areasTitle}
              </h3>
              <ul className="areas">
                {office.areasServed.map((a) => (
                  <li key={a} className="areas__chip">{a}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
