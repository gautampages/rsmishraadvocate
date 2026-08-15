/* =========================================================================
   Case intelligence layer.

   Turns a normalised case into the plain-language summary, stage meter and
   highlight chips shown in the tracker. Everything here is computed from the
   record itself — dates, hearing purposes and counts — so it stays accurate
   for whatever case the API returns. If the partner plan later populates
   `caseAiAnalysis`, that text is preferred over the derived summary.
   ========================================================================= */

import { daysFromISTToday } from "./istTime.js";

const DAY = 86400000;

export const parseDate = (value) => {
  if (!value) return null;
  const d = new Date(`${String(value).slice(0, 10)}T00:00:00`);
  return Number.isNaN(d.getTime()) ? null : d;
};

export const formatDate = (value, { long = false } = {}) => {
  const d = parseDate(value);
  if (!d) return "—";
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: long ? "long" : "short",
    year: "numeric",
  });
};

/**
 * Whole days from today; negative for past dates.
 *
 * Counted against today in India — a hearing date belongs to the court's
 * calendar, so "in 3 days" must not change because the visitor is abroad.
 */
export const daysFromToday = (value) => {
  if (!value) return null;
  return daysFromISTToday(String(value).slice(0, 10));
};

export const relativeDay = (value) => {
  const diff = daysFromToday(value);
  if (diff == null) return "";
  if (diff === 0) return "today";
  if (diff === 1) return "tomorrow";
  if (diff === -1) return "yesterday";
  const n = Math.abs(diff);
  const unit =
    n < 31 ? [n, n === 1 ? "day" : "days"]
    : n < 365 ? [Math.round(n / 30), Math.round(n / 30) === 1 ? "month" : "months"]
    : [Math.floor(n / 365), Math.floor(n / 365) === 1 ? "year" : "years"];
  return diff > 0 ? `in ${unit[0]} ${unit[1]}` : `${unit[0]} ${unit[1]} ago`;
};

export const humanDuration = (days) => {
  if (days == null) return "—";
  if (days < 31) return `${days} ${days === 1 ? "day" : "days"}`;
  if (days < 365) {
    const months = Math.round(days / 30);
    return `${months} ${months === 1 ? "month" : "months"}`;
  }
  let years = Math.floor(days / 365);
  let months = Math.round((days % 365) / 30);
  if (months >= 12) {
    years += 1;
    months = 0;
  }
  return months ? `${years} yr ${months} mo` : `${years} yr`;
};

/* ------------------------------------------------------------------ *
 * Stage detection
 * ------------------------------------------------------------------ */

const STAGES = [
  { key: "filed", label: "Filed" },
  { key: "registered", label: "Registered" },
  { key: "appearance", label: "Appearance" },
  { key: "evidence", label: "Evidence" },
  { key: "arguments", label: "Arguments" },
  { key: "judgment", label: "Judgment" },
];

const stageFromPurpose = (purpose = "") => {
  const p = purpose.toLowerCase();
  if (/dispos|judg|order pronounce/.test(p)) return 5;
  if (/argument/.test(p)) return 4;
  if (/evidence|cross|witness/.test(p)) return 3;
  if (/appear|notice|written statement|framing|mediation|reconcil|charge|misc/.test(p)) return 2;
  return 2;
};

/* ------------------------------------------------------------------ *
 * Main builder
 * ------------------------------------------------------------------ */

export function buildInsights(c) {
  const disposed = c.status === "DISPOSED" || Boolean(c.decisionDate);
  const stageIndex = disposed ? 5 : Math.max(2, stageFromPurpose(c.purpose));

  const stages = STAGES.map((s, i) => ({
    ...s,
    state: i < stageIndex ? "done" : i === stageIndex ? (disposed ? "done" : "current") : "todo",
  }));

  // Pace of hearings — the mean gap between consecutive listings.
  const dates = c.hearings.map((h) => parseDate(h.date)).filter(Boolean);
  let avgGap = null;
  if (dates.length > 1) {
    const gaps = dates.slice(1).map((d, i) => Math.round((d - dates[i]) / DAY));
    avgGap = Math.round(gaps.reduce((a, b) => a + b, 0) / gaps.length);
  }

  // Adjournments the registry recorded a reason for.
  const adjournments = Object.values(c.business).filter((t) => /reason for adjournment/i.test(t)).length;

  const pendingDays =
    !disposed && c.filingDate ? Math.abs(daysFromToday(c.filingDate)) : c.durationDays ?? null;

  const nextIn = disposed ? null : daysFromToday(c.nextHearingDate);
  const nextIsUpcoming = nextIn != null && nextIn >= 0;

  /* ---- Summary paragraph ---- */
  const sentences = [];
  const court = c.courtName ? ` before the ${c.courtName}` : "";
  sentences.push(
    `${c.caseTypeLabel || "This matter"} ${c.caseNumber ? `no. ${c.caseNumber} ` : ""}was filed on ${formatDate(
      c.filingDate,
      { long: true }
    )}${court}.`
  );

  if (disposed) {
    sentences.push(
      `It was decided on ${formatDate(c.decisionDate || c.lastHearingDate, { long: true })}${
        c.disposalType ? ` and the outcome recorded by the registry is “${c.disposalType}”` : ""
      }, after ${c.counts.hearings} hearings spanning ${humanDuration(c.durationDays ?? pendingDays)}.`
    );
  } else {
    sentences.push(
      `The case is currently at the ${stages[stageIndex].label.toLowerCase()} stage${
        c.purpose ? ` — last listed for “${c.purpose}”` : ""
      }, and has been pending for ${humanDuration(pendingDays)} across ${c.counts.hearings} hearings.`
    );
    if (nextIsUpcoming) {
      sentences.push(
        `The next hearing is scheduled for ${formatDate(c.nextHearingDate, { long: true })} (${relativeDay(
          c.nextHearingDate
        )}).`
      );
    } else if (c.nextHearingDate) {
      sentences.push(
        `The last listed date was ${formatDate(c.nextHearingDate, { long: true })}; a fresh date may not yet have been uploaded by the registry.`
      );
    }
  }

  /* ---- Key points ---- */
  const points = [];
  if (c.judges.length) points.push(`Presiding: ${c.judges[0]}`);
  if (avgGap) points.push(`Hearings are listed roughly every ${avgGap} days`);
  if (adjournments) points.push(`${adjournments} hearing${adjournments > 1 ? "s were" : " was"} adjourned with a recorded reason`);
  if (c.counts.interim) points.push(`${c.counts.interim} interim order${c.counts.interim > 1 ? "s" : ""} on record`);
  if (c.counts.ias) points.push(`${c.counts.ias} interlocutory application${c.counts.ias > 1 ? "s" : ""} filed`);
  if (c.actsAndSections) points.push(`Acts invoked: ${c.actsAndSections}`);
  if (c.contested) points.push(`Registry marks the matter as ${c.contested.toLowerCase()}`);

  /* ---- Alert banner ---- */
  let alert = null;
  if (nextIsUpcoming && nextIn <= 30) {
    alert = {
      tone: nextIn <= 7 ? "urgent" : "soon",
      text:
        nextIn === 0
          ? "This case is listed today. Please reach the court complex well before the board is called."
          : `Next hearing ${relativeDay(c.nextHearingDate)} — on ${formatDate(c.nextHearingDate)}. Keep your documents and witnesses ready.`,
    };
  } else if (disposed) {
    alert = {
      tone: "done",
      text: `Matter disposed on ${formatDate(c.decisionDate || c.lastHearingDate)}${
        c.disposalType ? ` — ${c.disposalType.toLowerCase()}` : ""
      }. Certified copies can be applied for at the filing counter.`,
    };
  }

  /* ---- Stat tiles ---- */
  const stats = [
    { label: "Hearings held", value: String(c.counts.hearings || 0) },
    { label: disposed ? "Total duration" : "Pending since", value: humanDuration(pendingDays) },
    { label: "Orders on record", value: String(c.counts.orders || 0) },
    { label: "Applications (IA)", value: String(c.counts.ias || 0) },
  ];

  // The API's AI analysis is per-order and describes a single hearing, so it
  // is shown against its own order. Only the dispute narrative is case-level.
  const latestAnalysed = c.orders.find((o) => o.ai);

  return {
    disposed,
    stages,
    stageIndex,
    summary: sentences.join(" "),
    story: c.story || null,
    latestOrderInsight: latestAnalysed
      ? { date: latestAnalysed.date, title: latestAnalysed.title, ...latestAnalysed.ai }
      : null,
    points: points.slice(0, 5),
    alert,
    stats,
    avgGap,
    adjournments,
    nextIn,
  };
}

/** Colour token for a status pill. */
export const statusTone = (status) =>
  status === "PENDING" ? "live" : status === "DISPOSED" ? "closed" : "neutral";
