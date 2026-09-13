// ============================================================================
//  MOTOR ACCIDENT COMPENSATION — the Sarla Verma / Pranay Sethi method.
//
//  The Motor Vehicles Act gives no formula; the Supreme Court did. Sarla Verma
//  v. DTC (2009) fixed the multiplier by age and the deduction for personal
//  expenses; National Insurance v. Pranay Sethi (2017, Constitution Bench)
//  fixed the addition for future prospects and the three conventional heads,
//  with a 10% uplift every three years; Magma General Insurance v. Nanu Ram
//  (2018) allowed consortium to each dependant. Tribunals across India,
//  including the MACT at Hajipur, compute death claims exactly this way.
//
//  Everything here is indicative. The tribunal decides the income, the
//  dependants, negligence and contributory negligence — and the interest.
// ============================================================================

import { roundRupee } from "./money.js";

export const MACT_REVIEWED = "September 2026";

/** Sarla Verma multiplier by age of the deceased (or the injured claimant). */
const MULTIPLIER = [
  [15, 15],
  [20, 18],
  [25, 18],
  [30, 17],
  [35, 16],
  [40, 15],
  [45, 14],
  [50, 13],
  [55, 11],
  [60, 9],
  [65, 7],
  [Infinity, 5],
];

export const multiplierFor = (age) => {
  const a = Math.max(0, Number(age) || 0);
  return MULTIPLIER.find(([upTo]) => a <= upTo)[1];
};

export const EMPLOYMENT = [
  { key: "permanent", label: "Permanent salaried job", hint: "Government or private employer, regular salary" },
  { key: "self", label: "Self-employed or fixed wages", hint: "Farming, business, daily wages, contract work" },
];

/** Pranay Sethi: percentage of income added for future prospects. */
export function futureProspects(age, employment) {
  const a = Number(age) || 0;
  const perm = employment === "permanent";
  if (a < 40) return perm ? 50 : 40;
  if (a < 50) return perm ? 30 : 25;
  if (a <= 60) return perm ? 15 : 10;
  return 0;
}

/**
 * Sarla Verma: share of income the deceased would have spent on themselves.
 * A bachelor: half. Married, by the number of dependants: 1/3 for two or
 * three, 1/4 for four to six, 1/5 beyond six; a lone dependant is treated
 * as the bachelor case.
 */
export function personalExpenseShare(married, dependants) {
  const d = Math.max(0, Math.floor(Number(dependants) || 0));
  if (!married || d <= 1) return 1 / 2;
  if (d <= 3) return 1 / 3;
  if (d <= 6) return 1 / 4;
  return 1 / 5;
}

/**
 * Conventional heads (Pranay Sethi, 31 Oct 2017), uplifted 10% every three
 * years. ASSUMPTION stated on the page: the uplift is reckoned to the date
 * of computation (the award-date reading), which is what most tribunals do;
 * some count from the accident date. The tool takes an `asOf` date so the
 * page can say which.
 */
const CONVENTIONAL_BASE = { estate: 15000, consortium: 40000, funeral: 15000 };
const SETHI_DATE = Date.UTC(2017, 9, 31);

export function conventionalHeads(asOf = new Date()) {
  const ms = (asOf instanceof Date ? asOf : new Date(asOf)).getTime();
  const years = Math.max(0, (ms - SETHI_DATE) / (365.25 * 24 * 3600 * 1000));
  const steps = Math.floor(years / 3);
  const factor = 1.1 ** steps;
  return {
    steps,
    estate: roundRupee(CONVENTIONAL_BASE.estate * factor),
    consortium: roundRupee(CONVENTIONAL_BASE.consortium * factor),
    funeral: roundRupee(CONVENTIONAL_BASE.funeral * factor),
  };
}

/** Statutory no-fault and scheme amounts, for the "also" block. */
export const NO_FAULT = { death: 500000, grievous: 250000, authority: "Section 164, Motor Vehicles Act (from 1 April 2022)" };
export const HIT_AND_RUN = { death: 200000, grievous: 50000, authority: "Compensation to Victims of Hit and Run Motor Accidents Scheme, 2022" };
export const CLAIM_LIMITATION_MONTHS = 6; // s.166(3), inserted by the 2019 amendment

/**
 * Death claim.
 *  annualIncome  — gross annual income (tribunals deduct income tax actually
 *                  paid; pass `annualTax` to do so)
 */
export function computeDeath({
  age = 0,
  annualIncome = 0,
  annualTax = 0,
  employment = "self",
  married = true,
  dependants = 1,
  consortiumClaimants,
  asOf = new Date(),
}) {
  const income = Math.max(0, (Number(annualIncome) || 0) - (Number(annualTax) || 0));
  if (!income || !age) return null;
  const fp = futureProspects(age, employment);
  const withProspects = roundRupee(income * (1 + fp / 100));
  const share = personalExpenseShare(married, dependants);
  const dependency = roundRupee(withProspects * (1 - share));
  const multiplier = multiplierFor(age);
  const lossOfDependency = dependency * multiplier;
  const heads = conventionalHeads(asOf);
  const claimants = Math.max(1, Math.floor(Number(consortiumClaimants ?? dependants) || 1));
  const consortium = heads.consortium * claimants;
  const conventional = heads.estate + heads.funeral + consortium;
  return {
    income,
    fp,
    withProspects,
    share,
    dependency,
    multiplier,
    lossOfDependency,
    heads,
    claimants,
    consortium,
    conventional,
    total: lossOfDependency + conventional,
  };
}

/**
 * Injury claim. Loss of future earning capacity follows the same multiplier
 * method scaled by functional disability (Raj Kumar v. Ajay Kumar, 2011);
 * the rest are actuals the claimant proves, plus a pain-and-suffering figure
 * the tribunal fixes in its discretion.
 */
export function computeInjury({
  age = 0,
  annualIncome = 0,
  employment = "self",
  disabilityPercent = 0,
  medical = 0,
  treatmentMonths = 0,
  attendant = 0,
  painSuffering = 0,
}) {
  const income = Math.max(0, Number(annualIncome) || 0);
  const disability = Math.min(100, Math.max(0, Number(disabilityPercent) || 0));
  const fp = futureProspects(age, employment);
  const multiplier = multiplierFor(age);
  const futureLoss = disability > 0 && income > 0 ? roundRupee(income * (1 + fp / 100) * (disability / 100) * multiplier) : 0;
  const treatmentLoss = roundRupee((income / 12) * Math.max(0, Number(treatmentMonths) || 0));
  const med = Math.max(0, Number(medical) || 0);
  const att = Math.max(0, Number(attendant) || 0);
  const pain = Math.max(0, Number(painSuffering) || 0);
  const total = futureLoss + treatmentLoss + med + att + pain;
  if (!total) return null;
  return { income, disability, fp, multiplier, futureLoss, treatmentLoss, medical: med, attendant: att, pain, total };
}
