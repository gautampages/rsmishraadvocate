/* =========================================================================
   LEGAL CALCULATORS

   Every function here runs entirely in the visitor's browser — no figure a
   user types is ever transmitted. That matters: people enter property
   values and salaries into these.

   All outputs are INDICATIVE. Each tool page states the authority it works
   from and the reasons the real figure can differ. Where the law gives no
   formula (maintenance, most obviously) the tool returns a band and says so
   rather than inventing a precise number.
   ========================================================================= */

import { addDaysISO, addYearsISO, daysFromISTToday, isoToUTCms } from "./istTime.js";

export const inr = (n) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(n || 0));

export const rupees = (n) => `₹${inr(n)}`;

/* ---------------------------------------------------------------------- *
 *  1. STAMP DUTY & REGISTRATION — Bihar
 *
 *  Bihar charges duty on the higher of the stated consideration or the
 *  Minimum Value Register (MVR) rate for the plot, and varies the rate by
 *  the gender of the transferor and transferee.
 * ---------------------------------------------------------------------- */

export const STAMP_CATEGORIES = [
  {
    key: "m2f",
    label: "Male → Female",
    hint: "Seller male, buyer female",
    stamp: 5.7,
    registration: 1.9,
  },
  {
    key: "f2m",
    label: "Female → Male",
    hint: "Seller female, buyer male",
    stamp: 6.3,
    registration: 2.1,
  },
  {
    key: "other",
    label: "Any other combination",
    hint: "Male → male, female → female, or joint buyers",
    stamp: 6,
    registration: 2,
  },
];

/**
 * @param consideration  price stated in the deed
 * @param mvr            Minimum Value Register valuation for the plot
 * @param categoryKey    one of STAMP_CATEGORIES
 */
export function computeStampDuty({ consideration = 0, mvr = 0, categoryKey = "other" }) {
  const category = STAMP_CATEGORIES.find((c) => c.key === categoryKey) || STAMP_CATEGORIES[2];
  const base = Math.max(Number(consideration) || 0, Number(mvr) || 0);
  const stamp = (base * category.stamp) / 100;
  const registration = (base * category.registration) / 100;

  return {
    category,
    base,
    // Which figure the duty was charged on — the commonest surprise at the
    // registry office is duty computed on MVR, not on the agreed price.
    basedOn: (Number(mvr) || 0) > (Number(consideration) || 0) ? "mvr" : "consideration",
    stamp,
    registration,
    total: stamp + registration,
    effectiveRate: category.stamp + category.registration,
  };
}

/* ---------------------------------------------------------------------- *
 *  2. COURT FEE — Bihar
 *
 *  The Court Fees (Bihar Amendment) Act, 1995 substituted Schedule I of the
 *  Court Fees Act, 1870 with an ad valorem scale that steps up by ₹80 for
 *  every ₹5,000 of value or part thereof, subject to a ceiling of ₹50,000.
 * ---------------------------------------------------------------------- */

export const COURT_FEE = {
  step: 5000,
  feePerStep: 80,
  ceiling: 50000,
};

export function computeCourtFee(suitValue) {
  const value = Math.max(0, Number(suitValue) || 0);
  if (value === 0) return { value, steps: 0, fee: 0, atCeiling: false };

  const steps = Math.ceil(value / COURT_FEE.step);
  const raw = steps * COURT_FEE.feePerStep;
  const fee = Math.min(raw, COURT_FEE.ceiling);

  return {
    value,
    steps,
    fee,
    atCeiling: raw >= COURT_FEE.ceiling,
    // Where the ceiling bites, the effective percentage falls away sharply —
    // worth showing, because people assume the fee scales forever.
    effectivePercent: (fee / value) * 100,
  };
}

/* ---------------------------------------------------------------------- *
 *  3. MAINTENANCE ESTIMATE
 *
 *  There is no statutory formula. The anchor used here is Kalyan Dey
 *  Chowdhury v. Rita Dey Chowdhury (2017), where the Supreme Court held 25%
 *  of the husband's NET salary to be just and proper as maintenance for the
 *  wife — and expressly not 25% of gross.
 *
 *  Rajnesh v. Neha (2020) then laid down the factors and the mandatory
 *  Affidavit of Disclosure of Assets and Liabilities that courts now work
 *  from, which is why the tool asks for the claimant's own income too.
 *
 *  Everything below the 25% anchor is an openly-labelled heuristic:
 *  dependent children push awards upward, and courts are markedly reluctant
 *  to leave a respondent with less than half of their net income.
 * ---------------------------------------------------------------------- */

export const MAINTENANCE = {
  anchorPercent: 25, // Kalyan Dey Chowdhury — net salary, spouse alone
  lowPercent: 20,
  highPercent: 33,
  // A child is weighted at roughly a third of a spouse-unit. This is a
  // presentational heuristic for spreading the band, not a rule of law — it
  // is set low enough that a claim for a spouse and two children does not
  // immediately saturate the ceiling and collapse the band to a single figure.
  childWeight: 0.35,
  // Total share of net income beyond which awards are rare.
  ceilingPercent: 50,
};

export function estimateMaintenance({
  respondentNetMonthly = 0,
  claimantOwnMonthly = 0,
  children = 0,
  claimingForSpouse = true,
}) {
  const net = Math.max(0, Number(respondentNetMonthly) || 0);
  const own = Math.max(0, Number(claimantOwnMonthly) || 0);
  const kids = Math.max(0, Math.floor(Number(children) || 0));

  const units = (claimingForSpouse ? 1 : 0) + kids * MAINTENANCE.childWeight;
  if (net === 0 || units === 0) {
    return { net, own, kids, units, low: 0, mid: 0, high: 0, capped: false, offset: 0 };
  }

  const pct = (base) => Math.min(base * units, MAINTENANCE.ceilingPercent);
  const lowPct = pct(MAINTENANCE.lowPercent);
  const midPct = pct(MAINTENANCE.anchorPercent);
  const highPct = pct(MAINTENANCE.highPercent);

  // The claimant's own earnings reduce need but do not extinguish it; courts
  // weigh them rather than subtracting them outright, so only half is offset.
  const offset = own * 0.5;
  const apply = (percent) => Math.max(0, (net * percent) / 100 - offset);

  return {
    net,
    own,
    kids,
    units,
    offset,
    lowPct,
    midPct,
    highPct,
    low: apply(lowPct),
    mid: apply(midPct),
    high: apply(highPct),
    capped: highPct >= MAINTENANCE.ceilingPercent,
  };
}

/* ---------------------------------------------------------------------- *
 *  4. LIMITATION PERIODS
 *
 *  Periods from the Schedule to the Limitation Act, 1963, plus the statutory
 *  timeline under Section 138 of the Negotiable Instruments Act, which is
 *  the one people miss most often.
 *
 *  `days` is the period; `from` describes the starting point, which is the
 *  part that decides most cases and the part a calculator cannot verify.
 * ---------------------------------------------------------------------- */

export const LIMITATION_ITEMS = [
  {
    key: "money-contract",
    group: "Civil suits",
    label: "Suit to recover money lent, or due under a contract",
    days: 3 * 365,
    period: "3 years",
    from: "the date the money became due, or the date of the last acknowledgement in writing",
    authority: "Limitation Act, 1963 — Articles 19–22",
  },
  {
    key: "specific-performance",
    group: "Civil suits",
    label: "Suit for specific performance of a contract",
    days: 3 * 365,
    period: "3 years",
    from: "the date fixed for performance, or when the plaintiff had notice that performance was refused",
    authority: "Limitation Act, 1963 — Article 54",
  },
  {
    key: "declaration",
    group: "Civil suits",
    label: "Suit for a declaration of right",
    days: 3 * 365,
    period: "3 years",
    from: "the date the right to sue first accrued",
    authority: "Limitation Act, 1963 — Article 58",
  },
  {
    key: "cancel-instrument",
    group: "Civil suits",
    label: "Suit to cancel or set aside a deed or instrument",
    days: 3 * 365,
    period: "3 years",
    from: "the date the facts entitling you to have the instrument set aside became known to you",
    authority: "Limitation Act, 1963 — Article 59",
  },
  {
    key: "possession-title",
    group: "Civil suits",
    label: "Suit for possession of immovable property based on title",
    days: 12 * 365,
    period: "12 years",
    from: "the date the defendant's possession became adverse to you",
    authority: "Limitation Act, 1963 — Article 65",
  },
  {
    key: "residuary-suit",
    group: "Civil suits",
    label: "Any other suit for which no period is provided",
    days: 3 * 365,
    period: "3 years",
    from: "the date the right to sue accrued",
    authority: "Limitation Act, 1963 — Article 113",
  },
  {
    key: "appeal-district",
    group: "Appeals & applications",
    label: "Appeal from a decree or order to a court other than the High Court",
    days: 30,
    period: "30 days",
    from: "the date of the decree or order appealed against",
    authority: "Limitation Act, 1963 — Article 116(b)",
  },
  {
    key: "appeal-hc",
    group: "Appeals & applications",
    label: "Appeal from a decree or order to the High Court",
    days: 90,
    period: "90 days",
    from: "the date of the decree or order appealed against",
    authority: "Limitation Act, 1963 — Article 116(a)",
  },
  {
    key: "set-aside-exparte",
    group: "Appeals & applications",
    label: "Application to set aside an ex-parte decree",
    days: 30,
    period: "30 days",
    from: "the date of the decree, or the date you learned of it if summons were not duly served",
    authority: "Limitation Act, 1963 — Article 123",
  },
  {
    key: "execution",
    group: "Appeals & applications",
    label: "Application to execute a decree",
    days: 12 * 365,
    period: "12 years",
    from: "the date the decree became enforceable",
    authority: "Limitation Act, 1963 — Article 136",
  },
  {
    key: "residuary-application",
    group: "Appeals & applications",
    label: "Any other application for which no period is provided",
    days: 3 * 365,
    period: "3 years",
    from: "the date the right to apply accrued",
    authority: "Limitation Act, 1963 — Article 137",
  },
  {
    key: "criminal-appeal-sessions",
    group: "Criminal",
    label: "Appeal against a conviction to the Sessions Court",
    days: 30,
    period: "30 days",
    from: "the date of the sentence",
    authority: "Limitation Act, 1963 — Article 115",
  },
  {
    key: "criminal-appeal-hc",
    group: "Criminal",
    label: "Appeal against a conviction to the High Court",
    days: 60,
    period: "60 days",
    from: "the date of the sentence",
    authority: "Limitation Act, 1963 — Article 115",
  },
];

export const LIMITATION_GROUPS = [...new Set(LIMITATION_ITEMS.map((i) => i.group))];

export const limitationItem = (key) => LIMITATION_ITEMS.find((i) => i.key === key);

/**
 * Deadline for a chosen head of limitation, counted from `startISO`.
 *
 * Note the tool cannot decide the one thing that decides most cases — the
 * date on which time actually began to run. It computes from the date given.
 */
export function computeDeadline(key, startISO) {
  const item = limitationItem(key);
  if (!item || !startISO) return null;

  if (Number.isNaN(isoToUTCms(startISO))) return null;

  // Periods expressed in years are counted as calendar years, not 365-day
  // blocks, so a leap year does not silently shorten them. All of it is done
  // on date strings so the answer cannot shift with the device's timezone —
  // a limitation deadline is the same date wherever you read it from.
  const deadlineISO =
    item.days % 365 === 0
      ? addYearsISO(startISO, item.days / 365)
      : addDaysISO(startISO, item.days);

  // Days remaining are counted against today in India, because that is the
  // day the court registry is working to.
  const daysLeft = daysFromISTToday(deadlineISO);

  return {
    item,
    startISO,
    deadlineISO,
    start: new Date(isoToUTCms(startISO)),
    deadline: new Date(isoToUTCms(deadlineISO)),
    daysLeft,
    expired: daysLeft < 0,
    urgent: daysLeft >= 0 && daysLeft <= 30,
  };
}

/* ---------------------------------------------------------------------- *
 *  5. CAUSE LIST — deep links
 *
 *  There is no public API for district-court cause lists; eCourts publishes
 *  them only through its web portal. Rather than scrape it, these helpers
 *  build the correct official URLs and the site explains what to select.
 * ---------------------------------------------------------------------- */

export const CAUSE_LIST_LINKS = {
  vaishaliDistrictCourt: "https://vaishali.dcourts.gov.in/",
  ecourtsCauseList: "https://services.ecourts.gov.in/ecourtindia_v6/?p=cause_list/index",
  ecourtsCaseStatus: "https://services.ecourts.gov.in/ecourtindia_v6/?p=casestatus/index",
  patnaHighCourt: "https://patnahighcourt.gov.in/",
  ecourtsApp: "https://play.google.com/store/apps/details?id=in.gov.ecourts.eCourtsServices",
};

export const VAISHALI_COURT_COMPLEXES = [
  "Civil Court, Hajipur",
  "District & Sessions Court, Vaishali (Hajipur)",
  "Family Court, Hajipur",
  "Sub-Divisional Court, Mahnar",
  "Sub-Divisional Court, Mahua",
];
