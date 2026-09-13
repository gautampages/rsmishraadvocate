// ============================================================================
//  CONSUMER FORUM — which Commission, and what fee.
//
//  Consumer Protection Act, 2019. Pecuniary jurisdiction was re-set by the
//  Consumer Protection (Jurisdiction of the District Commission, the State
//  Commission and the National Commission) Rules, 2021 (in force 30 Dec
//  2021) and turns on the VALUE OF THE GOODS OR SERVICES PAID AS
//  CONSIDERATION — not on the compensation claimed. Fees are from the
//  Consumer Protection (Consumer Commissions) Rules, 2020, Schedule.
// ============================================================================

export const CONSUMER_REVIEWED = "September 2026";
export const LIMITATION_YEARS = 2; // s.69

const L = 100000;
const CR = 10000000;

export const FORUMS = {
  district: {
    key: "district",
    name: "District Consumer Disputes Redressal Commission",
    short: "District Commission",
    upTo: 50 * L,
    authority: "s.34(1) CPA 2019 · 2021 Jurisdiction Rules, rule 3",
    appeal: "Appeal to the State Commission within 45 days (s.41); 50% of the amount ordered to be deposited by the opposite party.",
  },
  state: {
    key: "state",
    name: "State Consumer Disputes Redressal Commission, Bihar",
    short: "State Commission",
    seat: "Patna",
    upTo: 2 * CR,
    authority: "s.47(1) CPA 2019 · 2021 Jurisdiction Rules, rule 4",
    appeal: "Appeal to the National Commission within 30 days (s.51); 50% deposit.",
  },
  national: {
    key: "national",
    name: "National Consumer Disputes Redressal Commission",
    short: "National Commission",
    seat: "New Delhi",
    upTo: Infinity,
    authority: "s.58(1) CPA 2019 · 2021 Jurisdiction Rules, rule 5",
    appeal: "Appeal to the Supreme Court within 30 days (s.67); 50% deposit.",
  },
};

/** Fee schedule: [upper bound of consideration, fee]. */
export const FEE_SLABS = [
  [5 * L, 0],
  [10 * L, 200],
  [20 * L, 400],
  [50 * L, 1000],
  [1 * CR, 2000],
  [2 * CR, 2500],
  [4 * CR, 3000],
  [6 * CR, 4000],
  [8 * CR, 5000],
  [10 * CR, 6000],
  [Infinity, 7500],
];

export function forumFor(consideration) {
  const v = Math.max(0, Number(consideration) || 0);
  if (v <= FORUMS.district.upTo) return FORUMS.district;
  if (v <= FORUMS.state.upTo) return FORUMS.state;
  return FORUMS.national;
}

export function feeFor(consideration) {
  const v = Math.max(0, Number(consideration) || 0);
  const i = FEE_SLABS.findIndex(([upTo]) => v <= upTo);
  const [upTo, fee] = FEE_SLABS[i];
  const from = i === 0 ? 0 : FEE_SLABS[i - 1][0];
  return { fee, from, upTo };
}

export function computeConsumer({ consideration, districtName }) {
  const v = Math.max(0, Number(consideration) || 0);
  if (!v) return null;
  const forum = forumFor(v);
  const slab = feeFor(v);
  return {
    consideration: v,
    forum,
    fee: slab.fee,
    slab,
    where:
      forum.key === "district"
        ? `District Commission, ${districtName || "your district"}`
        : forum.key === "state"
          ? "State Commission at Patna"
          : "National Commission at New Delhi",
  };
}

export const EDAAKHIL_URL = "https://edaakhil.nic.in/";
export const NCH_URL = "https://consumerhelpline.gov.in/";
export const NCH_PHONE = "1915";
