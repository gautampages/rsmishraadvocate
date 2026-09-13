/** Indian-style digit grouping: 1234567 → "12,34,567". */
export const inr = (n) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(Number(n) || 0));

export const rupees = (n) => `₹${inr(n)}`;

/** Round to the rupee — the Court-Fees (Bihar Amendment) Act, 2010 requires it for court fee. */
export const roundRupee = (n) => Math.round(Number(n) || 0);
