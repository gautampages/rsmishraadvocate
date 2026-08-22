// ============================================================================
//  FREE LEGAL TOOLS — index metadata.
//
//  These exist for two reasons. They are genuinely useful to someone in
//  Vaishali trying to work out what a registration will cost or whether an
//  appeal is still in time; and they are the kind of page that earns search
//  traffic no amount of "best advocate in Hajipur" copy ever will.
//
//  Every calculation runs in the browser. Nothing typed into them is sent
//  anywhere — which is also what the privacy policy says.
// ============================================================================

export const tools = [
  {
    path: "/tools/stamp-duty-calculator",
    icon: "home",
    name: "Stamp Duty & Registration Calculator",
    short: "Stamp Duty Calculator",
    tagline: "Bihar rates, including the MVR trap",
    description:
      "Estimate stamp duty and registration charges on a sale deed in Bihar, at the correct rate for the gender of the buyer and seller, and on the higher of your price or the Minimum Value Register rate.",
    seoTitle: "Bihar Stamp Duty & Registration Charges Calculator (2026) | Adv. Ram Snehi Mishra",
    seoDescription:
      "Free Bihar stamp duty calculator — 6% / 5.7% / 6.3% by buyer and seller gender, plus registration fee, computed on the higher of consideration or MVR value. For property in Hajipur, Vaishali and across Bihar.",
  },
  {
    path: "/tools/land-unit-converter",
    icon: "sliders",
    name: "Bihar Land Unit Converter",
    short: "Land Unit Converter",
    tagline: "Katha, bigha, dhur, dismil — into square feet",
    description:
      "Convert between katha, bigha, dhur, dhurki, decimal (dismil), acre, hectare and square feet at the Patna/Vaishali standard — 1 katha = 1,361.25 sq ft — with the district-variation caveat stated plainly.",
    seoTitle: "Katha to Square Feet Converter — Bihar Land Units (Bigha, Dhur, Dismil)",
    seoDescription:
      "Free Bihar land unit converter: katha to square feet (1 katha = 1,361.25 sq ft in Vaishali/Patna), bigha, dhur, dhurki, decimal/dismil, acre and hectare — the units of the khatiyan, jamabandi and registry, converted both ways.",
  },
  {
    path: "/tools/ipc-to-bns-converter",
    icon: "refresh",
    name: "IPC to BNS Section Converter",
    short: "IPC → BNS Converter",
    tagline: "Old section numbers to the new codes",
    description:
      "Find the new section under the Bharatiya Nyaya Sanhita for any commonly cited IPC section — 420, 302, 376, 498A — and the BNSS equivalents of CrPC provisions like 125, 144, 154 and 438. Works in both directions.",
    seoTitle: "IPC to BNS Section Converter — 420, 302, 376, 498A & More",
    seoDescription:
      "Free IPC to BNS converter: the new section for every commonly searched IPC provision — 420→318(4), 302→103(1), 376→64, 498A→85 — plus CrPC to BNSS (125→144, 144→163, 438→482) and Evidence Act to BSA (65B→63).",
  },
  {
    path: "/tools/court-fee-calculator",
    icon: "scales",
    name: "Court Fee Calculator",
    short: "Court Fee Calculator",
    tagline: "Ad valorem fee on a civil suit in Bihar",
    description:
      "Work out the approximate ad valorem court fee payable on instituting a civil suit in Bihar from the value of your claim, including where the statutory ceiling applies.",
    seoTitle: "Bihar Court Fee Calculator for Civil Suits | Adv. Ram Snehi Mishra, Hajipur",
    seoDescription:
      "Estimate the ad valorem court fee on a civil suit in Bihar under the Court Fees (Bihar Amendment) Act, 1995 — ₹80 per ₹5,000 of value, subject to a ₹50,000 ceiling.",
  },
  {
    path: "/tools/maintenance-estimator",
    icon: "family",
    name: "Maintenance Estimator",
    short: "Maintenance Estimator",
    tagline: "Built on the Supreme Court's 25% benchmark",
    description:
      "See the range a court is likely to work within for spousal and child maintenance, anchored on the Supreme Court's guidance that 25% of net salary is just and proper.",
    seoTitle: "Maintenance & Alimony Calculator — Bihar Family Courts",
    seoDescription:
      "Estimate spousal and child maintenance under Section 125 CrPC / 144 BNSS for the family courts in Bihar, using the Supreme Court's 25%-of-net-salary benchmark and the factors from Rajnesh v. Neha.",
  },
  {
    path: "/tools/limitation-checker",
    icon: "clock",
    name: "Limitation Period Checker",
    short: "Limitation Checker",
    tagline: "How long is left to file",
    description:
      "Check the limitation period for a suit, appeal or application under the Limitation Act, 1963, and see how many days remain from the date time began to run.",
    seoTitle: "Limitation Period Checker for Bihar Courts — Suits & Appeals",
    seoDescription:
      "Free limitation period checker for suits, appeals and applications in Bihar courts under the Limitation Act, 1963 — the applicable period, the date it runs from, and the days remaining.",
  },
  {
    path: "/tools/cause-list",
    icon: "calendar",
    name: "Vaishali Cause List Lookup",
    short: "Cause List Lookup",
    tagline: "Find your case on the daily board",
    description:
      "Reach the official daily cause list for the courts at Hajipur and Vaishali, and check your own next hearing date from the case tracker on this site.",
    seoTitle: "Vaishali & Hajipur District Court Cause List — How to Check | Adv. Ram Snehi Mishra",
    seoDescription:
      "How to find your case on the daily cause list of the District Court, Vaishali (Hajipur) — direct links to the official eCourts cause list, plus a CNR lookup for your next hearing date.",
  },
];

export const toolFor = (path) => tools.find((t) => t.path === path);
