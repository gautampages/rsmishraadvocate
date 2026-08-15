// ============================================================================
//  FEES & ENGAGEMENT
//
//  Figures supplied by the chamber. Every professional fee here is a starting
//  point rather than a quotation: three of the four are ranges precisely
//  because the work is not fixed, and the page says so plainly. The written
//  estimate given after the consultation is what actually binds.
//
//  Set an `amount` to null to take an item back to "Quoted per matter"
//  without touching anything else, or set FEES_PUBLISHED = false to hide all
//  figures at once.
// ============================================================================

export const FEES_PUBLISHED = true;

export const feesIntro = {
  eyebrow: "Fees",
  title: "Fees & Engagement",
  intro:
    "Most people who call a chamber for the first time want to know two things: whether they have a " +
    "case, and what it will cost. The first is answered in the consultation. This page answers the " +
    "second as far as it can be answered in advance.",
};

export const feeSchedule = [
  {
    title: "First consultation",
    amount: "₹1,000",
    unit: "per consultation",
    description:
      "A confidential discussion of your matter, an honest view of whether you have a case, and what the realistic routes and timelines are. Bring whatever papers you have.",
    includes: [
      "Review of the documents you bring",
      "A plain view of your position, including where it is weak",
      "The likely forum, route and timeline",
      "An estimate of professional fees and statutory costs for your matter",
    ],
  },
  {
    title: "Drafting & documentation",
    amount: "₹2,000 – ₹5,000",
    unit: "per document, by complexity",
    description:
      "Notices, agreements, deeds, settlements and affidavits drafted or vetted. Priced by the document, so you know the cost before it is drawn.",
    includes: [
      "Legal notices and replies",
      "Sale, gift and settlement deeds",
      "Agreements and their vetting",
      "Affidavits and undertakings",
    ],
  },
  {
    title: "Court representation",
    amount: "₹2,000 – ₹5,000",
    unit: "per appearance",
    description:
      "Conduct of a matter before the courts at Hajipur, the District Court at Vaishali, or the Patna High Court. Longer matters can also be quoted as a single fee for the whole proceeding rather than per appearance — ask at the consultation which works out better for you.",
    includes: [
      "Drafting and filing of the petition or plaint",
      "Appearances before the court",
      "Interlocutory applications arising in the matter",
      "Regular updates on listings and orders",
    ],
  },
  {
    title: "Urgent & out-of-hours work",
    amount: "₹2,000 – ₹5,000",
    unit: "by urgency and criticality",
    description:
      "Anticipatory bail, urgent injunctions and matters where an application must be moved within days. The range reflects how critical and how immediate the work is, given the priority it displaces.",
    includes: [
      "Same-day or next-day drafting",
      "Urgent mentioning before the court",
      "Out-of-hours availability where custody is imminent",
    ],
  },
];

// Shown beneath the schedule once figures are published. The ranges are the
// honest part of this page — a one-page notice and a contested settlement
// deed are not the same job, and pretending otherwise invites a dispute.
export const feeScheduleNote =
  "These are indicative starting figures. Where a range is shown, the fee within it depends on the " +
  "complexity of the work, the forum and how much is genuinely in dispute — and where a matter falls " +
  "outside the ordinary run, it is quoted separately. You receive a written estimate for your own " +
  "matter after the consultation, and work begins only once you have agreed it.";

// Statutory costs are set by law, not by the chamber. Stating this plainly
// prevents the commonest fee dispute there is.
export const statutoryCosts = {
  title: "Costs set by law, not by the chamber",
  intro:
    "These are payable in addition to professional fees, and they go to the State or the court — not " +
    "to the advocate. They are fixed by statute and no chamber can reduce them.",
  items: [
    {
      label: "Court fee",
      text: "Ad valorem on the value of a civil suit, subject to a statutory ceiling.",
      tool: "/tools/court-fee-calculator",
      toolLabel: "Estimate it",
    },
    {
      label: "Stamp duty & registration fee",
      text: "On deeds and instruments, charged on the consideration or the MVR value, whichever is higher.",
      tool: "/tools/stamp-duty-calculator",
      toolLabel: "Estimate it",
    },
    {
      label: "Process fee",
      text: "Payable for service of summons and notices on the opposite party and witnesses.",
    },
    {
      label: "Certified copies",
      text: "Charged per page by the court for copies of orders, judgments and the record.",
    },
    {
      label: "Miscellaneous disbursements",
      text: "Typing, notarisation, courier, and travel where a matter is outside Hajipur.",
    },
  ],
};

export const engagementTerms = [
  {
    title: "The fee is agreed before work begins",
    text: "After the consultation you receive a fee estimate for your matter in writing. Work starts once it is agreed — never before, and never on an open-ended basis.",
  },
  {
    title: "Statutory costs are quoted separately",
    text: "Court fee, stamp duty, process fee and certified copies are shown as separate line items, not folded into the professional fee, so you can see what goes where.",
  },
  {
    title: "You are told when the estimate changes",
    text: "Litigation takes turns nobody predicts — an appeal, an unexpected application, a transferred matter. If the work required moves materially beyond the estimate, you hear about it before the work is done.",
  },
  {
    title: "No fee for an enquiry",
    text: "Asking whether the chamber can help you at all — by phone, by email, or by requesting a slot on this site — costs nothing. The consultation fee applies to the consultation itself.",
  },
  {
    title: "No promise of outcome, at any price",
    text: "No advocate can guarantee a result, and one who does should worry you. What is promised is preparation, appearance and an honest assessment throughout.",
  },
];

export const feeFaqs = [
  {
    q: "How much is the first consultation?",
    a: "₹1,000 for a consultation, at the chamber in Hajipur or by telephone. That covers a review of the papers you bring, an honest view of your position including where it is weak, and an estimate of what your matter will cost to run. You are told the fee before you attend, so a first meeting never produces a surprise bill.",
  },
  {
    q: "Why is court representation shown as a range?",
    a: "Because the work is not fixed. A mutual consent divorce where both sides agree the terms is a fraction of the work of a contested petition with maintenance, custody and a domestic violence proceeding running alongside it. A fee quoted without knowing which of those you have would be meaningless. That is what the consultation is for.",
  },
  {
    q: "Is court fee part of your fee?",
    a: "No. Court fee is a tax paid to the court on instituting a suit, fixed by the Court Fees Act as amended for Bihar. It goes to the State, not to the chamber. The same is true of stamp duty, process fees and the cost of certified copies.",
  },
  {
    q: "Can fees be paid in instalments?",
    a: "For longer matters, fees are commonly structured in stages that track the progress of the case rather than being payable in full at the outset. Discuss it at the consultation — it is a normal request, not an awkward one.",
  },
  {
    q: "What if I cannot afford a lawyer at all?",
    a: "Free legal aid is a statutory right for those who qualify, including women, children, members of Scheduled Castes and Scheduled Tribes, and anyone below the prescribed income limit. The District Legal Services Authority at Vaishali provides it. If you qualify, the chamber will tell you so and point you there.",
  },
];
