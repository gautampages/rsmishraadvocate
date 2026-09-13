// ============================================================================
//  CHEQUE BOUNCE — Section 138, Negotiable Instruments Act, 1881.
//
//  The statute fixes three clocks and three multiples, and people lose cases
//  on the clocks far more often than on the merits:
//    · notice within 30 days of the return memo (proviso (b));
//    · the drawer has 15 days from receipt of the notice to pay (proviso (c));
//    · the complaint within one month of the cause of action, which arises
//      the day after those 15 days end (s.142(b); Econ Antri v. Rom
//      Industries, 2013, excludes the day the cause arose).
//  Fine up to twice the cheque amount and/or two years (s.138); interim
//  compensation up to 20% (s.143A — discretionary since Rakesh Ranjan
//  Shrivastava v. State of Jharkhand, 2024); 20% deposit on appeal (s.148);
//  compoundable at any stage (s.147) on the Damodar S. Prabhu cost ladder.
// ============================================================================

import { addDaysISO, addMonthsISO, daysFromISTToday, formatISODate, isoToUTCms, istToday } from "./istTime.js";
import { inr, roundRupee, rupeesInWords } from "./money.js";

export const S138 = {
  validityMonths: 3, // RBI: a cheque is valid for three months from its date
  noticeDays: 30,
  payDays: 15,
  complaintMonths: 1,
  maxFineMultiple: 2,
  maxJailYears: 2,
  interimCompMaxPct: 20,
  appealDepositMinPct: 20,
};

export const DISHONOUR_REASONS = [
  { key: "funds", en: "Funds insufficient", hi: "खाते में पर्याप्त राशि नहीं (Funds Insufficient)" },
  { key: "exceeds", en: "Exceeds arrangement", hi: "व्यवस्था से अधिक (Exceeds Arrangement)" },
  { key: "closed", en: "Account closed", hi: "खाता बंद (Account Closed)" },
  { key: "stopped", en: "Payment stopped by drawer", hi: "आहर्ता द्वारा भुगतान रोका गया (Payment Stopped)" },
  { key: "signature", en: "Drawer's signature differs", hi: "हस्ताक्षर मेल नहीं खाते (Signature Differs)" },
  { key: "other", en: "Other reason on the return memo", hi: "रिटर्न मेमो में अंकित अन्य कारण" },
];

export const DEBT_PURPOSES = [
  { key: "loan", en: "repayment of a friendly loan advanced by my client", hi: "मेरे मुवक्किल द्वारा दिए गए उधार की वापसी" },
  { key: "goods", en: "payment for goods supplied by my client", hi: "मेरे मुवक्किल द्वारा आपूर्ति किए गए माल के भुगतान" },
  { key: "services", en: "payment for services rendered by my client", hi: "मेरे मुवक्किल द्वारा दी गई सेवाओं के भुगतान" },
  { key: "rent", en: "payment of rent due to my client", hi: "मेरे मुवक्किल को देय किराये के भुगतान" },
  { key: "other", en: "discharge of a legally enforceable debt or liability owed to my client", hi: "मेरे मुवक्किल के प्रति विधिक रूप से प्रवर्तनीय ऋण या दायित्व के निर्वहन" },
];

const valid = (iso) => iso && !Number.isNaN(isoToUTCms(iso));

/**
 * The three deadlines. Only the dishonour date is required; the later two
 * are computed from whichever of the notice dates is known, and the result
 * says which assumption it used.
 */
export function chequeDeadlines({ dishonourISO, noticeSentISO, noticeServedISO }) {
  if (!valid(dishonourISO)) return null;
  const noticeBy = addDaysISO(dishonourISO, S138.noticeDays);

  // Receipt: the served date if known; otherwise, for a notice sent by
  // registered post, service is presumed in the ordinary course (s.27 General
  // Clauses Act; C.C. Alavi Haji, 2007) — 3 days is the working assumption.
  let served = null;
  let servedBasis = null;
  if (valid(noticeServedISO)) {
    served = noticeServedISO;
    servedBasis = "served";
  } else if (valid(noticeSentISO)) {
    served = addDaysISO(noticeSentISO, 3);
    servedBasis = "presumed";
  }

  const payBy = served ? addDaysISO(served, S138.payDays) : null;
  const causeOfAction = payBy ? addDaysISO(payBy, 1) : null;
  // One month from the cause of action, excluding the day it arose.
  const complaintBy = causeOfAction ? addMonthsISO(causeOfAction, S138.complaintMonths) : null;

  const noticeLate = valid(noticeSentISO) && isoToUTCms(noticeSentISO) > isoToUTCms(noticeBy);

  return {
    dishonourISO,
    noticeBy,
    noticeDaysLeft: daysFromISTToday(noticeBy),
    noticeLate,
    served,
    servedBasis,
    payBy,
    causeOfAction,
    complaintBy,
    complaintDaysLeft: complaintBy ? daysFromISTToday(complaintBy) : null,
  };
}

/** The Damodar S. Prabhu (2010) ladder: cost of compounding at each stage. */
export const COMPOUNDING_LADDER = [
  { stage: "At the first or second hearing", pct: 0 },
  { stage: "Later, during the trial", pct: 10 },
  { stage: "Before the Sessions Court or High Court (appeal / revision)", pct: 15 },
  { stage: "Before the Supreme Court", pct: 20 },
];

/**
 * Money figures. `years` is how long the case is expected to run; interest
 * on the cheque amount over that period is what courts typically order as
 * compensation under s.357(3) CrPC / BNSS 395 in addition to (or instead of)
 * a fine — 6% to 12% simple, 9% being the common figure.
 */
export function chequeFigures({ amount, years = 2, rate = 9 }) {
  const a = Math.max(0, Number(amount) || 0);
  if (!a) return null;
  const y = Math.max(0, Number(years) || 0);
  const r = Math.max(0, Number(rate) || 0);
  const interest = roundRupee((a * r * y) / 100);
  const likely = a + interest;
  return {
    amount: a,
    maxFine: a * S138.maxFineMultiple,
    interimMax: roundRupee((a * S138.interimCompMaxPct) / 100),
    likelyCompensation: likely,
    interest,
    years: y,
    rate: r,
    appealDeposit: roundRupee((likely * S138.appealDepositMinPct) / 100),
    ladder: COMPOUNDING_LADDER.map((l) => ({ ...l, cost: roundRupee((a * l.pct) / 100) })),
  };
}

// ---------------------------------------------------------------------------
//  Notice generator.
// ---------------------------------------------------------------------------

const fmt = (iso) => (valid(iso) ? formatISODate(iso) : "____________");
const or = (v, blank = "____________") => (String(v || "").trim() ? String(v).trim() : blank);

export function noticeText(f) {
  const lang = f.lang === "hi" ? "hi" : "en";
  const amount = Math.max(0, Number(f.amount) || 0);
  const amt = amount ? `₹${inr(amount)}/- (Rupees ${rupeesInWords(amount)} only)` : "₹________ (Rupees ____________ only)";
  const reason = DISHONOUR_REASONS.find((r) => r.key === f.reason) || DISHONOUR_REASONS[0];
  const purpose = DEBT_PURPOSES.find((p) => p.key === f.purpose) || DEBT_PURPOSES[0];
  const noticeDate = fmt(f.noticeDate || istToday());
  const viaAdvocate = f.viaAdvocate !== false;
  const sender = or(f.senderName, "[Client's name]");
  const senderAddr = or(f.senderAddress, "[Client's address]");
  const drawer = or(f.drawerName, "[Drawer's name]");
  const drawerAddr = or(f.drawerAddress, "[Drawer's address]");
  const bank = or(f.bank, "[Bank and branch]");
  const chequeNo = or(f.chequeNo, "______");
  const adv = or(f.advocateName, "[Advocate's name]");
  const court = or(f.court, "Hajipur (Vaishali)");

  if (lang === "hi") {
    const client = viaAdvocate ? "मेरे मुवक्किल" : "मुझ";
    const clientKo = viaAdvocate ? "मेरे मुवक्किल को" : "मुझे";
    const clientKe = viaAdvocate ? "मेरे मुवक्किल के" : "मेरे";
    return `परक्राम्य लिखत अधिनियम, 1881 की धारा 138 के अंतर्गत विधिक सूचना (लीगल नोटिस)
(रजिस्टर्ड डाक ए.डी. एवं स्पीड पोस्ट द्वारा)

दिनांक: ${noticeDate}

सेवा में,
${drawer}
${drawerAddr}

महोदय/महोदया,

${viaAdvocate ? `मेरे मुवक्किल ${sender}, ${senderAddr} (आगे "मेरे मुवक्किल") के निर्देश पर और उनकी ओर से` : `मैं, ${sender}, ${senderAddr},`} आपको निम्नलिखित सूचना देता/देती हूँ:

1. यह कि आपने ${purpose.hi} के लिए ${clientKe} पक्ष में ${bank} पर आहरित चेक संख्या ${chequeNo}, दिनांक ${fmt(f.chequeDate)}, राशि ${amt} जारी किया।

2. यह कि ${client}ने उक्त चेक को उसकी वैधता अवधि के भीतर अपने बैंक के माध्यम से भुगतान हेतु प्रस्तुत किया, और वह "${reason.hi}" की टिप्पणी के साथ दिनांक ${fmt(f.dishonourDate)} के रिटर्न मेमो द्वारा अनादृत (बाउंस) होकर वापस आ गया।

3. यह कि चेक का अनादरण दर्शाता है कि आपका अपने दायित्व का निर्वहन करने का कभी इरादा नहीं था, और आपने परक्राम्य लिखत अधिनियम, 1881 की धारा 138 के अंतर्गत दंडनीय अपराध किया है, जिसमें दो वर्ष तक का कारावास, या चेक की राशि के दोगुने तक जुर्माना, या दोनों हो सकते हैं।

4. अतः आपसे माँग की जाती है कि इस सूचना की प्राप्ति के 15 (पंद्रह) दिनों के भीतर ${clientKo} ${amt} की राशि का भुगतान करें, अन्यथा ${client} आपके विरुद्ध परक्राम्य लिखत अधिनियम, 1881 की धारा 138 सहपठित धारा 142 के अंतर्गत ${court} के सक्षम न्यायालय में आपराधिक परिवाद दायर करने तथा ब्याज और खर्च सहित वसूली के लिए दीवानी उपचार अपनाने को विवश होंगे/होंगी, जिसकी समस्त जोखिम और खर्च आप पर होगी।

5. यह सूचना ${clientKe} अन्य अधिकारों और उपचारों पर प्रतिकूल प्रभाव डाले बिना दी जा रही है। इस सूचना की एक प्रति अभिलेख एवं आगे की आवश्यक कार्रवाई हेतु ${viaAdvocate ? "मेरे कार्यालय में" : "मेरे पास"} रखी गई है।

${viaAdvocate ? `${adv}\nअधिवक्ता\n${sender} की ओर से` : `भवदीय,\n${sender}`}`;
  }

  const client = viaAdvocate ? "my client" : "me";
  const clientPoss = viaAdvocate ? "my client's" : "my";
  return `LEGAL NOTICE UNDER SECTION 138 OF THE NEGOTIABLE INSTRUMENTS ACT, 1881
(By Registered Post with A/D and by Speed Post)

Date: ${noticeDate}

To,
${drawer}
${drawerAddr}

Sir / Madam,

${viaAdvocate ? `Under instructions from and on behalf of my client, ${sender}, ${senderAddr} (hereinafter "my client"), I` : `I, ${sender}, ${senderAddr},`} serve upon you the following notice:

1. That, in ${purpose.en.replace("my client", client)}, you issued cheque no. ${chequeNo} dated ${fmt(f.chequeDate)} for ${amt}, drawn on ${bank}, in favour of ${client}.

2. That ${client} presented the said cheque for encashment within its period of validity through ${clientPoss} banker, and the same was returned unpaid vide return memo dated ${fmt(f.dishonourDate)} with the remark "${reason.en}".

3. That the dishonour of the cheque shows that you never intended to honour your liability, and that you have committed an offence under Section 138 of the Negotiable Instruments Act, 1881, punishable with imprisonment up to two years, or fine up to twice the amount of the cheque, or both.

4. That ${viaAdvocate ? "I" : "I"} therefore call upon you to pay ${client} the sum of ${amt} within 15 (fifteen) days of receipt of this notice, failing which ${client} shall be constrained to file a criminal complaint against you under Section 138 read with Section 142 of the Negotiable Instruments Act, 1881, before the competent court at ${court}, and to pursue civil remedies for recovery of the amount with interest and costs — all at your risk, cost and consequences.

5. That this notice is without prejudice to ${clientPoss} other rights and remedies. A copy of this notice has been retained ${viaAdvocate ? "in my office" : "by me"} for record and further necessary action.

${viaAdvocate ? `${adv}\nAdvocate\nFor ${sender}` : `Yours faithfully,\n${sender}`}`;
}
