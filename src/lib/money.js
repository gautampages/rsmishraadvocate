/** Indian-style digit grouping: 1234567 → "12,34,567". */
export const inr = (n) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(Number(n) || 0));

export const rupees = (n) => `₹${inr(n)}`;

/** Round to the rupee — the Court-Fees (Bihar Amendment) Act, 2010 requires it for court fee. */
export const roundRupee = (n) => Math.round(Number(n) || 0);

/**
 * Rupees in words, Indian style: 1234567 → "Twelve Lakh Thirty-Four Thousand
 * Five Hundred Sixty-Seven". Used by the notice generators, where the figure
 * must appear in words as well as digits.
 */
const ONES = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
const TENS = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

const below100 = (n) => (n < 20 ? ONES[n] : `${TENS[Math.floor(n / 10)]}${n % 10 ? `-${ONES[n % 10]}` : ""}`);
const below1000 = (n) =>
  [n >= 100 ? `${ONES[Math.floor(n / 100)]} Hundred` : "", below100(n % 100)].filter(Boolean).join(" ");

export function rupeesInWords(n) {
  let v = Math.round(Number(n) || 0);
  if (v === 0) return "Zero";
  const parts = [];
  const crore = Math.floor(v / 1e7);
  v %= 1e7;
  const lakh = Math.floor(v / 1e5);
  v %= 1e5;
  const thousand = Math.floor(v / 1e3);
  v %= 1e3;
  if (crore) parts.push(`${below100(crore)} Crore`);
  if (lakh) parts.push(`${below100(lakh)} Lakh`);
  if (thousand) parts.push(`${below100(thousand)} Thousand`);
  if (v) parts.push(below1000(v));
  return parts.join(" ");
}
