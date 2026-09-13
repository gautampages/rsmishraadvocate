// ============================================================================
//  BIHAR STAMP DUTY & REGISTRATION FEE — every instrument people register.
//
//  Source: "Table of Stamp Duty & Registration Fee", Government of Bihar,
//  Department of Prohibition, Excise & Registration (Registration) — the
//  official chart published on nibandhan.bihar.gov.in. Article numbers below
//  are the Indian Stamp Act (Bihar) articles and the Registration Table of
//  Fee articles that chart cites. Rates are as published there; the chart is
//  revised from time to time, so the page carries a "rates as published"
//  date and every figure is presented as an estimate.
//
//  Two conventions that trip people up, encoded here rather than explained:
//    · Conveyance-type duty (sale, gift, exchange, lease premium, non-family
//      POA) is charged on the HIGHER of the stated consideration and the
//      Minimum Value Register (MVR) valuation.
//    · The gender concession (5.7% / 1.9% male→female; 6.3% / 2.1%
//      female→male; 6% / 2% otherwise) is a conveyance rule, so it applies
//      to gifts as well as sales — Bihar gives NO separate blood-relation
//      concession on gifts.
// ============================================================================

import { roundRupee } from "./money.js";

export const STAMP_RATES_AS_OF = "September 2026";

/** Gender categories for conveyance-type instruments (Art. 23 / Fee Art. A-1). */
export const STAMP_CATEGORIES = [
  { key: "m2f", label: "Male → Female", hint: "Transferor male, transferee female", stamp: 5.7, registration: 1.9 },
  { key: "f2m", label: "Female → Male", hint: "Transferor female, transferee male", stamp: 6.3, registration: 2.1 },
  { key: "other", label: "Any other combination", hint: "Male → male, female → female, joint parties", stamp: 6, registration: 2 },
];

export const categoryFor = (key) => STAMP_CATEGORIES.find((c) => c.key === key) || STAMP_CATEGORIES[2];

/**
 * Lease tenure buckets (Art. 35(a)): the "consideration" on which conveyance
 * duty is charged is a slice of the MVR value that grows with the term.
 */
export const LEASE_TENURES = [
  { key: "lt1", label: "Less than 1 year", factor: 0.02 },
  { key: "y1to10", label: "1 to 10 years", factor: 0.05 },
  { key: "y10to30", label: "More than 10, less than 30 years", factor: 0.15 },
  { key: "y30plus", label: "30 years or more", factor: 0.5 },
];

export const MORTGAGE_KINDS = [
  { key: "possession", label: "With possession (usufructuary)", hint: "Art. 40(a)" },
  { key: "simple", label: "Simple mortgage, no possession", hint: "Art. 40(b)" },
  { key: "bank", label: "Bank / PFI loan — housing, retail, commercial, industrial", hint: "Duty capped ₹20,000, fee capped ₹5,000" },
  { key: "kcc", label: "Kisan Credit Card / agricultural loan up to ₹5 lakh", hint: "Stamp duty exempt" },
  { key: "education", label: "Education or medical-treatment loan", hint: "0.5% + 0.5%" },
];

/**
 * Deed types. `inputs` tells the page which fields to show:
 *   value      — consideration / value of the property or share
 *   mvr        — Minimum Value Register valuation (conveyance-type deeds)
 *   category   — gender of transferor/transferee
 *   tenure     — lease term bucket
 *   sharers    — number of co-sharers (non-family partition)
 *   rent       — total rent payable over the term (house/flat rent agreement)
 *   mortgage   — kind of mortgage
 */
export const DEED_TYPES = [
  {
    key: "sale",
    label: "Sale deed (kewala)",
    hindi: "बिक्री पत्र / केवाला",
    group: "Transfer",
    article: "Art. 23 conveyance · Fee Art. A-1",
    inputs: ["value", "mvr", "category"],
    valueLabel: "Sale price stated in the deed (₹)",
    mutation: true,
    tds: true,
    summary: "6% duty and 2% fee, varied by gender, on the higher of price and MVR value.",
  },
  {
    key: "gift",
    label: "Gift deed (daan patra)",
    hindi: "दान पत्र",
    group: "Transfer",
    article: "Art. 33 gift · Fee Art. A(1)",
    inputs: ["mvr", "category"],
    mutation: true,
    summary: "Charged exactly like a sale on the MVR value — Bihar has no blood-relation concession on gifts.",
  },
  {
    key: "exchange",
    label: "Exchange deed",
    hindi: "अदला-बदली पत्र",
    group: "Transfer",
    article: "Art. 31(b) exchange · Fee Art. A(1)",
    inputs: ["value", "mvr"],
    valueLabel: "Value of the more valuable property (₹)",
    mutation: true,
    summary: "6% duty and 2% fee on the greater of the two values. Agricultural land exchanged within 25% of equal area is exempt.",
  },
  {
    key: "partition-family",
    label: "Partition of inherited family property (batwara)",
    hindi: "पारिवारिक बँटवारा",
    group: "Family",
    article: "Art. 45 partition — family exemption",
    inputs: [],
    mutation: true,
    summary: "A flat ₹50 stamp duty and ₹50 registration fee — ₹100 in all — for a registered partition of inherited family property.",
  },
  {
    key: "partition-other",
    label: "Partition — any other co-owned property",
    hindi: "अन्य बँटवारा",
    group: "Family",
    article: "Art. 45 partition (as bond, Art. 15) · Fee Art. A(6)",
    inputs: ["value", "sharers"],
    valueLabel: "Total value of the property divided (₹)",
    mutation: true,
    summary: "3% duty and 2% fee on the value of the shares separated, leaving out the largest share.",
  },
  {
    key: "release-family",
    label: "Release / relinquishment to close family (ancestral property)",
    hindi: "हक़ त्याग — परिवार में",
    group: "Family",
    article: "Art. 55(A)(a) release · Fee Art. E(iii)",
    inputs: ["value"],
    valueLabel: "MVR value of the share released (₹)",
    mutation: true,
    summary: "3% of the value of the share released, plus a fixed ₹1,000 fee, when the release is between parents, children, siblings, spouse or their heirs.",
  },
  {
    key: "release-other",
    label: "Release / relinquishment — any other case",
    hindi: "हक़ त्याग — अन्य",
    group: "Family",
    article: "Art. 55(A)(b) release · Fee Art. A(1)",
    inputs: ["value"],
    valueLabel: "Value of the share released (₹)",
    mutation: true,
    summary: "Charged as a conveyance — 6% duty and 2% fee.",
  },
  {
    key: "settlement-family",
    label: "Settlement deed in favour of family",
    hindi: "पारिवारिक व्यवस्थापन",
    group: "Family",
    article: "Art. 58(A)(a) settlement · Fee Art. A(1)",
    inputs: ["value"],
    valueLabel: "Value of the property settled (₹)",
    mutation: true,
    summary: "3% duty and 2% fee when settled on parents, spouse, siblings, children, grandparents or grandchildren.",
  },
  {
    key: "will",
    label: "Will (vasiyat) — registration",
    hindi: "वसीयत",
    group: "Succession",
    article: "Fee Art. C(i)",
    inputs: [],
    summary: "No stamp duty on a will. Registration is optional; the fee for registering or cancelling a will is ₹2,000.",
  },
  {
    key: "adoption",
    label: "Adoption deed",
    hindi: "दत्तक ग्रहण पत्र",
    group: "Succession",
    article: "Art. 3 · Fee Art. E(iii)",
    inputs: [],
    summary: "₹2,000 stamp duty and ₹1,000 registration fee.",
  },
  {
    key: "agreement-sell",
    label: "Agreement to sell (ekrarnama / baynama)",
    hindi: "बयाना / इकरारनामा",
    group: "Agreements",
    article: "Art. 5(b) · Fee Art. E(iii)",
    inputs: ["value"],
    valueLabel: "Agreed sale price (₹)",
    summary: "2% of the agreed price as duty and a fixed ₹1,000 registration fee. The duty paid is not adjusted against the sale deed later.",
  },
  {
    key: "lease",
    label: "Lease of land or building (rent fixed, no premium)",
    hindi: "पट्टा / लीज़",
    group: "Agreements",
    article: "Art. 35(a) · Fee Art. A(3)(a)",
    inputs: ["mvr", "tenure"],
    summary: "Conveyance duty on a slice of the MVR value that rises with the term: 2% of value for under a year, 5% for 1–10 years, 15% to 30 years, 50% beyond.",
  },
  {
    key: "rent",
    label: "Rent agreement for a house or flat (kirayanama)",
    hindi: "किरायानामा",
    group: "Agreements",
    article: "Art. 35-A letting on rent",
    inputs: ["rent"],
    summary: "0.5% of the total rent payable over the term as stamp duty. Registration is not compulsory for a term under one year.",
  },
  {
    key: "poa-sale",
    label: "Power of attorney to sell property — to a non-family member",
    hindi: "मुख़्तारनामा (बिक्री, ग़ैर-परिवार)",
    group: "Agreements",
    article: "Art. 48(a) · Fee Art. E(ii)",
    inputs: ["mvr"],
    summary: "6% of the MVR value of the property covered, plus a ₹10,000 registration fee — the same duty as selling it.",
  },
  {
    key: "poa-family",
    label: "Power of attorney — to family, for court, or not for sale",
    hindi: "मुख़्तारनामा (परिवार / अदालत / अन्य)",
    group: "Agreements",
    article: "Art. 48(b) · Fee Art. E(iii)",
    inputs: [],
    summary: "₹1,000 stamp duty and ₹1,000 registration fee. Family means parents, spouse, children, siblings, daughter-in-law and grandchildren.",
  },
  {
    key: "mortgage",
    label: "Mortgage deed",
    hindi: "बंधक पत्र / रेहननामा",
    group: "Loans",
    article: "Art. 40 · Fee Art. A(1)",
    inputs: ["value", "mortgage"],
    valueLabel: "Amount secured by the mortgage (₹)",
    summary: "2% with possession, 1% without; bank loans capped at ₹20,000 duty and ₹5,000 fee; KCC loans up to ₹5 lakh exempt.",
  },
  {
    key: "trust",
    label: "Declaration of trust",
    hindi: "न्यास पत्र",
    group: "Other",
    article: "Art. 64(a) · Fee Art. A(1)",
    inputs: ["value"],
    valueLabel: "Value of the trust property (₹)",
    summary: "₹5,000 stamp duty plus 2% registration fee on the value.",
  },
  {
    key: "affidavit",
    label: "Affidavit (shapath patra)",
    hindi: "शपथ पत्र",
    group: "Other",
    article: "Art. 4",
    inputs: [],
    summary: "₹100 stamp duty. Affidavits are sworn before a notary or magistrate, not registered.",
  },
];

export const deedType = (key) => DEED_TYPES.find((d) => d.key === key) || DEED_TYPES[0];

/** Scanning fee charged by the registry per document (endorsement and photo pages included). */
export const scanningFee = (pages) => (pages <= 10 ? 250 : pages <= 20 ? 500 : 1000);

/** Online (e-nibandhan) rebate: 1% of the stamp duty, capped at ₹2,000 (S.O. 10/2016). */
export const onlineRebate = (stamp) => Math.min(stamp * 0.01, 2000);

/**
 * Mutation (dakhil-kharij) application fee. Mutation was free until 2026; the
 * Bihar Land Mutation (Amendment) Bill 2026 is reported (Prabhat Khabar,
 * Jul–Aug 2026) to introduce ₹200 for mutation, appeal and correction
 * applications. The figure is shown as "reported" and is NOT added to the
 * registry total until the gazette notification is seen.
 */
export const MUTATION_FEE = 200;
export const MUTATION_FEE_STATUS = "reported";

/** TDS under Section 194-IA: 1% where the consideration or stamp value is ₹50 lakh or more. */
export const TDS_THRESHOLD = 5000000;

const pct = (base, rate) => roundRupee((base * rate) / 100);

/**
 * Compute duty and fee for any deed type.
 *
 * Returns { base, basedOn, stamp, registration, stampLabel, regLabel, notes }
 * where `base` is the figure the ad valorem rate was applied to.
 */
export function computeDeed({
  deed = "sale",
  value = 0,
  mvr = 0,
  categoryKey = "other",
  tenure = "lt1",
  sharers = 2,
  rent = 0,
  mortgage = "simple",
}) {
  const v = Math.max(0, Number(value) || 0);
  const m = Math.max(0, Number(mvr) || 0);
  const cat = categoryFor(categoryKey);
  const higher = Math.max(v, m);
  const basedOn = m > v ? "mvr" : "value";
  const notes = [];

  switch (deed) {
    case "sale":
      return {
        base: higher,
        basedOn,
        stamp: pct(higher, cat.stamp),
        registration: pct(higher, cat.registration),
        stampLabel: `Stamp duty (${cat.stamp}%)`,
        regLabel: `Registration fee (${cat.registration}%)`,
        notes,
      };
    case "gift":
      return {
        base: m,
        basedOn: "mvr",
        stamp: pct(m, cat.stamp),
        registration: pct(m, cat.registration),
        stampLabel: `Stamp duty (${cat.stamp}%)`,
        regLabel: `Registration fee (${cat.registration}%)`,
        notes: ["Gifts to schools, hospitals, orphanages, panchayat bhawans and similar public institutions are exempt."],
      };
    case "exchange":
      return {
        base: higher,
        basedOn,
        stamp: pct(higher, 6),
        registration: pct(higher, 2),
        stampLabel: "Stamp duty (6%)",
        regLabel: "Registration fee (2%)",
        notes: ["Charged on the more valuable of the two properties. The gender concession of a conveyance may apply — confirm at the registry."],
      };
    case "partition-family":
      return { base: 0, stamp: 50, registration: 50, stampLabel: "Stamp duty (fixed)", regLabel: "Registration fee (fixed)", notes: ["Applies to a registered partition of inherited family property. The Circle Office's list of family members is usually asked for."] };
    case "partition-other": {
      const n = Math.max(2, Math.floor(Number(sharers) || 2));
      const base = roundRupee(v * ((n - 1) / n));
      return {
        base,
        basedOn: "shares",
        stamp: pct(base, 3),
        registration: pct(base, 2),
        stampLabel: "Stamp duty (3% of separated shares)",
        regLabel: "Registration fee (2% of separated shares)",
        notes: [`Assumes ${n} equal shares; the largest share is left out of the base, as the chart provides.`],
      };
    }
    case "release-family":
      return { base: v, stamp: pct(v, 3), registration: 1000, stampLabel: "Stamp duty (3%)", regLabel: "Registration fee (fixed)", notes: ["Between brother/sister, children of a predeceased son, parents, spouse, or their legal heirs, over ancestral property."] };
    case "release-other":
      return { base: v, stamp: pct(v, 6), registration: pct(v, 2), stampLabel: "Stamp duty (6%)", regLabel: "Registration fee (2%)", notes };
    case "settlement-family":
      return { base: v, stamp: pct(v, 3), registration: pct(v, 2), stampLabel: "Stamp duty (3%)", regLabel: "Registration fee (2%)", notes };
    case "will":
      return { base: 0, stamp: 0, registration: 2000, stampLabel: "Stamp duty", regLabel: "Registration fee (fixed)", notes: ["Registration of a will is optional but strongly advisable; the same fee applies to cancelling a registered will."] };
    case "adoption":
      return { base: 0, stamp: 2000, registration: 1000, stampLabel: "Stamp duty (fixed)", regLabel: "Registration fee (fixed)", notes };
    case "agreement-sell":
      return { base: v, stamp: pct(v, 2), registration: 1000, stampLabel: "Stamp duty (2%)", regLabel: "Registration fee (fixed)", notes };
    case "lease": {
      const t = LEASE_TENURES.find((x) => x.key === tenure) || LEASE_TENURES[0];
      const base = roundRupee(m * t.factor);
      return {
        base,
        basedOn: "mvr-slice",
        stamp: pct(base, 6),
        registration: pct(base, 2),
        stampLabel: `Stamp duty (6% of ${t.factor * 100}% of MVR value)`,
        regLabel: "Registration fee (2% of the same base)",
        notes: ["Where a premium or advance is paid, conveyance duty is charged on that amount too (Art. 35(b)–(c))."],
      };
    }
    case "rent": {
      const r = Math.max(0, Number(rent) || 0);
      return {
        base: r,
        basedOn: "rent",
        stamp: pct(r, 0.5),
        registration: 1000,
        stampLabel: "Stamp duty (0.5% of total rent)",
        regLabel: "Registration fee (fixed, if registered)",
        notes: ["A tenancy of less than one year need not be registered; an 11-month agreement is usually notarised on stamp paper instead. Confirm the registration fee at the office if you do register it."],
      };
    }
    case "poa-sale":
      return { base: m, basedOn: "mvr", stamp: pct(m, 6), registration: 10000, stampLabel: "Stamp duty (6% of MVR value)", regLabel: "Registration fee (fixed)", notes: ["The duty equals a sale because the power is treated as one. A power to a family member is ₹1,000 instead."] };
    case "poa-family":
      return { base: 0, stamp: 1000, registration: 1000, stampLabel: "Stamp duty (fixed)", regLabel: "Registration fee (fixed)", notes: ["Authenticating (rather than registering) a power costs ₹100 for a special power and ₹250 for a general power."] };
    case "mortgage": {
      const kind = mortgage;
      if (kind === "possession") return { base: v, stamp: pct(v, 2), registration: pct(v, 2), stampLabel: "Stamp duty (2%)", regLabel: "Registration fee (2%)", notes };
      if (kind === "bank") return { base: v, stamp: Math.min(pct(v, 1), 20000), registration: Math.min(pct(v, 2), 5000), stampLabel: "Stamp duty (1%, capped ₹20,000)", regLabel: "Registration fee (2%, capped ₹5,000)", notes: ["Applies to housing, retail, commercial and industrial loans from banks and public financial institutions."] };
      if (kind === "kcc") return { base: v, stamp: 0, registration: Math.min(pct(v, 2), 50), stampLabel: "Stamp duty (exempt)", regLabel: "Registration fee (capped ₹50)", notes: ["For agricultural development / Kisan Credit Card loans up to ₹5 lakh."] };
      if (kind === "education") return { base: v, stamp: pct(v, 0.5), registration: pct(v, 0.5), stampLabel: "Stamp duty (0.5%)", regLabel: "Registration fee (0.5%)", notes };
      return { base: v, stamp: pct(v, 1), registration: pct(v, 2), stampLabel: "Stamp duty (1%)", regLabel: "Registration fee (2%)", notes: ["An equitable mortgage by deposit of title deeds is charged separately under Art. 6 and is usually far cheaper."] };
    }
    case "trust":
      return { base: v, stamp: 5000, registration: pct(v, 2), stampLabel: "Stamp duty (fixed)", regLabel: "Registration fee (2%)", notes };
    case "affidavit":
      return { base: 0, stamp: 100, registration: 0, stampLabel: "Stamp duty (fixed)", regLabel: "Registration fee", notes: ["Sworn before a notary or an executive magistrate; not a registered document."] };
    default:
      return { base: 0, stamp: 0, registration: 0, stampLabel: "Stamp duty", regLabel: "Registration fee", notes };
  }
}

/**
 * Full cost at the registry: duty + fee, less the online rebate if chosen,
 * plus the scanning fee. The mutation application fee (paid later at the
 * Circle Office) and TDS (deducted by the buyer and deposited with the
 * Income-tax Department, not paid to the registry) are returned alongside so
 * the page can say "also budget for", but are kept out of `total`.
 */
export function computeRegistrationCost(params) {
  const type = deedType(params.deed);
  const core = computeDeed(params);
  const online = params.online !== false;
  const pages = Math.max(1, Math.floor(Number(params.pages) || 10));
  const rebate = online ? Math.floor(onlineRebate(core.stamp)) : 0;
  const scanning = core.registration > 0 || type.key === "will" ? scanningFee(pages) : 0;
  const mutation = type.mutation ? MUTATION_FEE : 0;
  const tds = type.tds && core.base >= TDS_THRESHOLD ? roundRupee(core.base * 0.01) : 0;
  const total = core.stamp + core.registration - rebate + scanning;
  return { type, ...core, rebate, scanning, pages, mutation, tds, total, online };
}

/** Kept for callers that only ever needed a sale-deed figure. */
export function computeStampDuty({ consideration = 0, mvr = 0, categoryKey = "other" }) {
  const r = computeDeed({ deed: "sale", value: consideration, mvr, categoryKey });
  const category = categoryFor(categoryKey);
  return {
    base: r.base,
    basedOn: r.basedOn,
    category,
    stamp: r.stamp,
    registration: r.registration,
    total: r.stamp + r.registration,
    effectiveRate: category.stamp + category.registration,
  };
}
