// ============================================================================
//  BLOG POSTS — each one is a real page at /blog/<slug>.
//
//  WHAT THESE ARE FOR
//  ------------------
//  The practice pages answer "divorce lawyer in Hajipur" — a few hundred
//  searches. These answer "the police refused to lodge my FIR", "how long does
//  a mutual consent divorce take", "how do I get a certified copy" — which is
//  where the volume actually is, and where nobody local has written anything.
//  They are also the only place on the site that demonstrates authored
//  expertise rather than marketing copy, which is what the BlogPosting/author
//  structured data exists to say.
//
//  TWO POST SHAPES
//  ---------------
//    `sections: [{ heading, paragraphs?, list? }]`  — the articles below.
//      Real H2s, because a thousand words of undifferentiated paragraphs is
//      hard to read and gives a search engine nothing to summarise.
//    `body: [paragraph, …]`                        — the two original
//      LinkedIn essays, kept as they were written.
//
//  `faqs` are rendered on the page AND emitted as FAQPage structured data by
//  src/data/structuredData.js. Do not write one without the other in mind:
//  markup that does not mirror what a visitor can see is a manual-action risk.
//
//  To publish: add an entry here. Route, sitemap entry, prerendered HTML and
//  structured data all follow automatically.
//
//  ⚠ `date`: the two LinkedIn posts predate this site and their original
//  publication dates are not known, so they carry null and `datePublished` is
//  omitted from their markup. That is correct but weaker for search — fill in
//  the real dates (YYYY-MM-DD) if they can be recovered.
// ============================================================================

export const blogMeta = {
  heading: "Legal Insights & Updates",
  subtext:
    "Plain-language writing on court procedure, family law and property disputes — what actually " +
    "happens, in what order, and what it costs you to get it wrong. From the chamber of Advocate " +
    "Ram Snehi Mishra, Hajipur.",
  linkedinUrl: "https://www.linkedin.com/in/ramsnehimishra/",
};

export const blogPosts = [
  // ---------------------------------------------------------------------------
  {
    slug: "bihar-land-survey-documents",
    tag: "Property & Land",
    date: "2026-08-22",
    title: "Bihar Land Survey: The Papers Your Family Needs Ready",
    seoTitle: "Bihar Land Survey — Vanshavali, Prapatra 2 & the Documents That Decide It",
    seoDescription:
      "What the Bihar special land survey means for your family's land: the self-declaration (Prapatra 2), the vanshavali (Prapatra 3(1)) on plain paper, the supporting papers worth digging out, what to do when ancestral land was never partitioned, and how to object when the record comes out wrong.",
    excerpt:
      "Bihar is rewriting its land records village by village. The khatiyan that comes out of this survey will be the base document for decades — and whether your family's land is recorded right depends on a few papers filed at the right time.",
    sections: [
      {
        paragraphs: [
          "Across all 38 districts, survey teams are measuring every plot and rebuilding the khatiyan — the record of rights — from scratch. Most existing khatiyans stand in the names of grandfathers and great-grandfathers; the new one will stand in the names of today's holders. That is the opportunity, and the risk: a family that files its papers in time gets its land recorded in the right names, and a family that waits inherits somebody else's mistake and years of proceedings to undo it.",
          "The government has extended the deadline for completing the survey to December 2026, but the working reality is village by village: once khanapuri — the entry of names against plots — begins in your mauza, the family that has already filed is simply in a stronger position than the family still collecting papers.",
        ],
      },
      {
        heading: "Two forms carry the whole exercise",
        paragraphs: [
          "The self-declaration, Prapatra 2, states what land you hold — khata, khesra, area, and how it came to you. The genealogy, Prapatra 3(1) or vanshavali, traces the line from the ancestor whose name is on the khatiyan or jamabandi down to the heirs alive today.",
          "Both are accepted on plain paper and self-attested. No sarpanch certificate, notary or kachahari attestation is legally required — a point on which a small industry of misinformation has grown up around the survey camps. They are submitted free at the anchal survey camp, or online through the survey directorate's portal (dlrs.bihar.gov.in). Keep the acknowledgement, whichever route you use.",
        ],
      },
      {
        heading: "The supporting papers worth digging out",
        paragraphs: [
          "Attach what exists: the old khatiyan, the registered deeds (kewala) in the chain, the current [jamabandi and lagaan receipts](/hi/dakhil-kharij-bihar), any court decree, and death certificates of the ancestors through whom the land descends. None of it needs to be complete before you start — a self-declaration filed with part of the papers beats a perfect file that never gets submitted. Old khatiyans can be obtained from the record room or online; jamabandi and rent receipts from the Bihar Bhumi portal; certified copies of old deeds from the registration office.",
        ],
      },
      {
        heading: "Write the vanshavali the court-proof way",
        paragraphs: [
          "Start from the recorded ancestor and bring every line down to the present — sons and daughters both. Leaving daughters out is the commonest mistake in the survey and the most expensive: since the 2005 amendment to the Hindu Succession Act a daughter is a coparcener by birth, equal to a son, and a genealogy that omits her is not just wrong but a standing invitation for the whole family's entry to be challenged later.",
          "Where shares are already disputed inside the family, take advice before filing — what goes into the self-declaration now is what every later claim will be argued from.",
        ],
      },
      {
        heading: "Ancestral land that was never partitioned",
        paragraphs: [
          "This is the standard Vaishali situation: the jamabandi stands in a dead ancestor's name, three branches of the family hold the land on an oral partition nobody wrote down. In the survey, the heirs are recorded jointly on the strength of the vanshavali, or by agreed shares where the family states them.",
          "This is also the cheapest moment in a generation to regularise the position. Bihar now charges a flat ₹50 stamp duty and ₹50 registration fee — ₹100 in all — on a registered partition deed of inherited family land. A partition that used to be postponed for fear of stamp duty can now be registered for less than the cost of the photocopies, and a registered partition is the cleanest basis for each branch's name to be recorded separately in the new khatiyan.",
        ],
      },
      {
        heading: "When the record comes out wrong",
        paragraphs: [
          "After khanapuri you receive a parcha — check it against your papers: name, khata, khesra, area, share. Errors are challenged by filing a claim or objection within the notified period, and there is a second window of objections when the draft khatiyan is published. File within the window and keep the receipt; corrections after final publication are a far longer road.",
          "Where the dispute is not clerical but real — two branches claiming the same plot, a deed and possession telling different stories — the matter is fought before the survey and revenue authorities, and if necessary in the civil court. The chamber handles [land and partition matters at Hajipur](/practice/property-lawyer-hajipur), including survey objections and the appeals that follow them.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the last date for the Bihar land survey?",
        a: "The State has extended the target for completing the special survey to December 2026, but each mauza moves on its own schedule of camps, khanapuri and parcha distribution. Do not plan around the final date — file the self-declaration and vanshavali as soon as the camp in your anchal is active, because objections and corrections all get harder the further the survey advances.",
      },
      {
        q: "Is a vanshavali on plain paper valid? Does the sarpanch have to attest it?",
        a: "Yes, plain paper is valid, and no — the vanshavali (Prapatra 3(1)) is accepted self-attested. No sarpanch certificate, notary or kachahari attestation is legally required. What matters is completeness: every heir from the recorded ancestor down to the present, daughters included.",
      },
      {
        q: "We have no papers for our land. Can we still file?",
        a: "File with what you can reconstruct. The old khatiyan can be obtained from the district record room or online, the jamabandi and lagaan receipts from the Bihar Bhumi portal, and certified copies of old registered deeds from the registration office. A self-declaration supported by part of the chain, filed in time, is far better than missing the window while hunting for a complete file.",
      },
      {
        q: "The survey has recorded my land in someone else's name. What do I do?",
        a: "Object, in writing, within the notified window — first against the khanapuri parcha, and again when the draft khatiyan is published. Attach your deed, jamabandi, receipts and vanshavali, and keep the acknowledgement. If the objection fails, appeals lie before the survey and revenue authorities, and a genuine title dispute ultimately goes to the civil court — but every later stage is easier if the objection was filed in time.",
      },
      {
        q: "Does the new khatiyan decide ownership?",
        a: "Not conclusively — title disputes are decided by the civil court, and a revenue record is not itself a deed of ownership. But in practice the new khatiyan will be the base document for decades: the entry every bank, registry office and later purchaser reads first. Getting it right now is the strongest practical protection your family's land can have.",
      },
    ],
    hashtags: ["BiharLandSurvey", "Vanshavali", "PropertyLaw", "LandRecords", "Bihar"],
    related: "/practice/property-lawyer-hajipur",
    relatedLabel: "Property & Land Lawyer in Hajipur",
    tool: "/tools/land-unit-converter",
    toolLabel: "Bihar land unit converter",
    checklist: "/checklists/property-purchase-bihar",
    checklistLabel: "Land purchase checklist (PDF)",
    caseLaw: "/case-law/partition-and-ancestral-property",
    caseLawLabel: "Partition & ancestral property case law",
  },

  // ---------------------------------------------------------------------------
  {
    slug: "lok-adalat-bihar",
    tag: "Court Procedure",
    date: "2026-08-22",
    title: "Lok Adalat: Settle in a Day — and Know What You Sign",
    seoTitle: "Lok Adalat in Bihar — How It Works, Bank Settlements & the Court-Fee Refund",
    seoDescription:
      "How Lok Adalat works in Bihar: which cases settle there — bank loans, cheque bounce, accident claims, maintenance — how to get a pending or pre-litigation matter listed at Hajipur, why the award is final with no appeal, the court-fee refund, and free legal aid through DLSA Vaishali and helpline 15100.",
    excerpt:
      "Every quarter, the National Lok Adalat sits at the Hajipur civil court and disposes of in one day what would otherwise take years. It is genuinely free and genuinely final — which is exactly why you should understand it before you sign.",
    sections: [
      {
        paragraphs: [
          "A Lok Adalat is not a faster court. It is a statutory settlement forum under the Legal Services Authorities Act, 1987, where a case ends only one way: both sides agree. There is no fee to pay, no evidence recorded, no judgment won or lost — and when it works, a matter that has been listed for years is over by the afternoon.",
          "The National Lok Adalat is organised every quarter across the country, and the benches at the Hajipur civil court sit with the rest. The dates are notified by the legal services authorities; the District Legal Services Authority (DLSA), Vaishali — its office is in the Hajipur court complex — is the local organiser, and courts begin marking suitable cases to the next sitting weeks in advance.",
        ],
      },
      {
        heading: "What actually settles there",
        paragraphs: [
          "The forum is built for matters where a number or a compromise can end the dispute. Bank recovery cases and one-time settlement of loans dominate the lists — banks issue pre-litigation notices inviting borrowers to settle at the Lok Adalat, often waiving a real part of the claimed amount. Cheque bounce complaints under Section 138, motor accident compensation claims, maintenance amounts, electricity and utility bill disputes, money suits and compoundable criminal cases all settle routinely.",
          "What a Lok Adalat cannot do is decide a contest. A genuine title dispute, a non-compoundable offence, a divorce itself (as opposed to its money terms) — these it can only refer back. If the other side will not agree, nothing happens to your case: it simply returns to the court it came from, no worse off.",
        ],
      },
      {
        heading: "How to get a case listed",
        paragraphs: [
          "For a pending case, apply to the court where it is running, asking that it be referred to the next Lok Adalat; courts also refer suitable matters on their own and issue notices to the parties. For a dispute not yet in court — a loan the bank is threatening to sue on, a money claim you would rather not litigate — apply directly to the DLSA, Vaishali, for the matter to be taken up pre-litigation.",
          "Then prepare, because the sitting itself moves fast. Know the figure you can actually pay or accept, bring the loan statements or the papers that prove your number, and decide your walk-away point before you enter the room — not while a bench is waiting.",
        ],
      },
      {
        heading: "Final means final",
        paragraphs: [
          "The award of a Lok Adalat is deemed a decree of a civil court. It binds both sides, it is executable like any decree, and there is no appeal against it. That is its power — the matter genuinely ends — and its danger: an award signed in haste, under pressure to finish, is one you will live with. The protection is simple and complete: do not agree, and the case merely continues where it was. Nobody can impose a settlement in a Lok Adalat.",
          "There is also a quiet financial incentive to settle: where a court case is resolved in a Lok Adalat, the court fee already paid on the plaint is refunded. On a money suit of any size that refund is real money, and it is worth weighing when you decide how firm your final number is.",
        ],
      },
      {
        heading: "The free lawyer many people are entitled to",
        paragraphs: [
          "The same Act that creates Lok Adalats creates legal aid. Women and children, members of Scheduled Castes and Tribes, persons in custody, persons with disability and those with income below the notified ceiling are entitled to a lawyer at government expense — for a Lok Adalat sitting or for a full case. Call the national helpline 15100, or apply at the DLSA front office in the Hajipur court complex.",
          "And where the stakes justify it, take your own advice before the sitting: the chamber [prepares settlement terms and appears in these matters](/practice/civil-lawyer-hajipur) — because the cheapest hearing of your life is still one where the number you sign should be the right one. What is free is the forum; the judgment about what to accept is yours, and it deserves the same care as any decree.",
        ],
      },
    ],
    faqs: [
      {
        q: "When is the next Lok Adalat in Hajipur?",
        a: "National Lok Adalats are held every quarter, on dates notified by the legal services authorities, and the benches for Vaishali district sit at the Hajipur civil court. The current schedule is published by NALSA and the Bihar State Legal Services Authority, and the DLSA office in the Hajipur court complex can confirm the next date and whether your matter can be listed for it.",
      },
      {
        q: "Can I appeal against a Lok Adalat award?",
        a: "No. The award is deemed a decree of a civil court, final and binding on the parties, with no appeal. The protection lies before signing, not after: a Lok Adalat cannot impose a settlement, so if the terms are not right, decline them — your case simply returns to the regular court and continues from where it stood.",
      },
      {
        q: "Is settling a bank loan in a Lok Adalat a good idea?",
        a: "Often, yes — banks routinely offer genuine one-time settlements there, waiving part of the outstanding amount, and the award closes the matter conclusively. But check the settlement figure against your own loan statements, understand what happens to the account's credit reporting, and get the waiver recorded clearly in the award. Once signed, it is a decree.",
      },
      {
        q: "Do I get my court fee back if my case settles?",
        a: "Yes. Where a pending court case is settled in a Lok Adalat, the court fee paid on the plaint is refunded. This is a deliberate statutory encouragement to settle, and on an ad valorem fee it can be a substantial amount — worth factoring into your decision.",
      },
      {
        q: "How do I get a free government lawyer for my case?",
        a: "Call the national legal-aid helpline 15100, or apply to the District Legal Services Authority (DLSA), Vaishali, at the Hajipur civil court complex. Women, children, members of Scheduled Castes and Tribes, persons in custody, persons with disability and those with income below the notified ceiling are entitled to legal aid by statute — it is a right, not a concession.",
      },
    ],
    hashtags: ["LokAdalat", "LegalAid", "DLSA", "BankSettlement", "CourtProcedure"],
    related: "/practice/civil-lawyer-hajipur",
    relatedLabel: "Civil Litigation in Hajipur",
    tool: "/tools/court-fee-calculator",
    toolLabel: "Court fee calculator (see what a refund is worth)",
    caseLaw: "/case-law/cheque-bounce-section-138",
    caseLawLabel: "Cheque bounce case law",
  },

  // ---------------------------------------------------------------------------
  {
    slug: "bihar-prohibition-act-bail",
    tag: "Criminal Law",
    date: "2026-08-22",
    title: "A Sharab Bandi Case: The Fine, the Bail, and the Seized Vehicle",
    seoTitle: "Bihar Prohibition Act Cases — Section 37 Fine, Bail Under Section 30 & Vehicle Release",
    seoDescription:
      "What actually happens in a Bihar liquor (sharab bandi) case: the ₹2,000–5,000 first-offence fine for consumption under Section 37, why Section 30 transport and sale cases are non-bailable, how anticipatory bail survives Section 76(2), and the separate DM proceeding to get a seized vehicle released.",
    excerpt:
      "Over eleven lakh cases and seventeen lakh arrests in ten years of prohibition — no law fills Bihar's court lists like this one. The first thing to understand about your case is which section it is under, because consumption and trade live in different worlds.",
    sections: [
      {
        paragraphs: [
          "Since total prohibition began in 2016, Bihar has registered more than 11 lakh cases and made more than 17 lakh arrests under the Bihar Prohibition and Excise Act — and the courts at Hajipur carry their share of that list every working day. The Act was softened once, in April 2022, after the Supreme Court publicly criticised what the case-load was doing to the courts; everything below describes the law as it stands after that amendment.",
        ],
      },
      {
        heading: "Caught drinking: Section 37, and a fine most people can pay",
        paragraphs: [
          "A first offence of consuming liquor, or being found drunk, is now dealt with summarily: the person is produced before the nearest Executive Magistrate within twenty-four hours and released on payment of a penalty of ₹2,000 to ₹5,000. Failure to pay means simple imprisonment of one month; a repeat offence carries up to a year. A first Section 37 case is bailable — the Act says so expressly.",
          "Two cautions. The internet still serves the pre-2022 numbers — a ₹50,000 fine and three months' imprisonment — which no longer apply. And the penalty, once paid, is not refundable; keep the receipt and the release order safely, because a second occasion is treated very differently.",
        ],
      },
      {
        heading: "Making, storing, selling, transporting: Section 30 is another world",
        paragraphs: [
          "Section 30 covers manufacture, storage, sale, purchase and transport, and it is severe: a first offence carries imprisonment of not less than five years and a fine of not less than ₹1 lakh; a second, ten years up to imprisonment for life. These offences are cognizable and non-bailable, tried by the district's Special Court under the Act, with statutory timelines — a charge sheet in 60 or 90 days and a trial meant to finish within a year.",
          "The provision that catches people who never touched a bottle is Section 32: a reverse burden. Where liquor is found in a vehicle or on premises, the owner must account for it — which is why the vehicle owner and the landlord end up arrayed as accused beside the driver, and why the defence has to be built from the seizure list onwards, not from the trial.",
        ],
      },
      {
        heading: "Bail: fought on the recovery, won on the record",
        paragraphs: [
          "Regular bail in a Section 30 case is moved before the Special Court, and after refusal, the Patna High Court. What decides it in practice: from whom and from where the recovery was actually made, whether possession was conscious, whether the antecedents are clean, and whether the search and seizure followed the procedure. In May 2025 the Patna High Court granted pre-arrest bail in exactly such a case — recovery not from the accused's conscious possession, clean record — on a bond of ₹10,000 with two sureties and the usual conditions of cooperation.",
        ],
      },
      {
        heading: "Anticipatory bail: barred on paper, alive in law",
        paragraphs: [
          "Section 76(2) of the Act bars the ordinary anticipatory bail provision, and many accused are told the door is closed. The authorities say otherwise. A Full Bench of the Patna High Court held in Ram Vinay Yadav (2019) that where the FIR on its face discloses no offence under the Act, an anticipatory bail application is maintainable despite the bar. And in Sweta Kumari v. State of Bihar (2022) the Supreme Court held that the High Court, as a constitutional court, could grant pre-arrest protection notwithstanding the embargo — and did.",
          "The route, in other words, runs through a close reading of the FIR and the seizure papers: which section is actually invoked, what the recovery memo really records, who the witnesses are. If arrest is feared, that reading needs to happen [before the arrest, not after](/practice/criminal-lawyer-hajipur).",
        ],
      },
      {
        heading: "The seized vehicle: a separate fight, on a separate clock",
        paragraphs: [
          "When liquor is found in a vehicle, the vehicle is seized under Section 56 and confiscation proceedings run before the District Collector under Section 58 — independently of the criminal case, which is why waiting for the trial is the standard, expensive mistake. There is a 15-day window to lodge a claim after notice, and the rules permit release of the vehicle on payment of a penalty — since the 2023 revision, not less than 10% of the insured value, capped at ₹5 lakh; premises are released on a penalty of not less than ₹1 lakh. The penalty is not refunded even on acquittal.",
          "Appeals run on short clocks too: sixty days to the Collector against a subordinate officer's order, ninety days to the Excise Commissioner against the Collector's final order, with no second appeal — and the Patna High Court has quashed confiscations where the procedure or the timelines were not honoured. If the vehicle matters, fight the confiscation from the first week.",
        ],
      },
      {
        heading: "Doing this from Hajipur",
        paragraphs: [
          "For a Vaishali district case this means, concretely: the Section 37 production before the Executive Magistrate; bail and trial for Section 30 matters before the Special Court at the Hajipur complex and, where needed, the Patna High Court; and the vehicle proceeding before the District Collector on its own timeline. Three forums, three clocks — and the papers of the first week decide most of what happens in all three. The chamber handles these matters across all three forums; bring the FIR and the seizure list, whatever stage the case is at.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the punishment for drinking liquor in Bihar now?",
        a: "For a first offence, after the April 2022 amendment: production before the nearest Executive Magistrate within 24 hours and release on a penalty of ₹2,000 to ₹5,000, with one month's simple imprisonment on failure to pay. A repeat offence carries up to a year. The older figures still found online — ₹50,000 or three months — are the pre-2022 law and no longer apply.",
      },
      {
        q: "Is bail possible in a Section 30 liquor case?",
        a: "Yes, but it is fought, not granted by default — the offence is non-bailable with a minimum five-year sentence. Courts look at whom the recovery was actually made from, whether possession was conscious, the antecedents, and whether the search and seizure followed procedure. The application goes to the Special Court first and the Patna High Court after; well-prepared applications succeed in deserving cases.",
      },
      {
        q: "Can I get anticipatory bail in a prohibition case?",
        a: "Section 76(2) bars the ordinary route, but a Patna High Court Full Bench (Ram Vinay Yadav, 2019) held an application maintainable where the FIR discloses no offence under the Act, and the Supreme Court in Sweta Kumari (2022) granted pre-arrest protection under the High Court's constitutional powers despite the embargo. The route depends entirely on what the FIR and seizure papers actually say — take advice before the arrest, not after.",
      },
      {
        q: "How do I get back a vehicle seized in a liquor case?",
        a: "Through the confiscation proceeding before the District Collector, which runs separately from the criminal case. Lodge the claim within 15 days of notice; the rules allow release on a penalty of not less than 10% of the vehicle's insured value, capped at ₹5 lakh (non-refundable even on acquittal). Appeals lie in 60 days to the Collector and 90 days to the Excise Commissioner. Remember the owner may also face prosecution under Section 32's reverse burden — both fronts need handling together.",
      },
    ],
    hashtags: ["SharabBandi", "BiharProhibition", "Bail", "CriminalLaw", "Section37"],
    related: "/practice/criminal-lawyer-hajipur",
    relatedLabel: "Criminal Defence in Hajipur",
    caseLaw: "/case-law/anticipatory-bail",
    caseLawLabel: "Anticipatory bail case law",
    tool: "/case-status/vaishali",
    toolLabel: "Track a Vaishali case by CNR or name",
  },

  // ---------------------------------------------------------------------------
  {
    slug: "police-refuse-to-lodge-fir",
    tag: "Criminal Law",
    date: "2026-08-16",
    title: "The Police Refuse to Lodge Your FIR. What Now?",
    seoTitle: "Police Not Filing Your FIR in Bihar? Four Steps That Work",
    seoDescription:
      "What to do when a police station refuses to register your FIR — the written complaint to the Superintendent under Section 173(4) BNSS, the application to the Magistrate under Section 175(3), zero FIR, and what Lalita Kumari settled.",
    excerpt:
      "Registration of an FIR in a cognizable case is not a favour the station house officer grants. The Supreme Court settled that in 2014 — and there are four escalations, in order, when it is refused anyway.",
    sections: [
      {
        paragraphs: [
          "It is the most common call a criminal chamber takes, and it is almost always described the same way: we went to the thana, they listened, they wrote nothing down, and they told us to come back.",
          "The legal position is not ambiguous. If the information you give discloses a cognizable offence, the officer in charge has no discretion — the FIR must be registered. What varies is how much you have to do to make that happen, and doing it in the right order matters, because each step builds the record for the next one.",
        ],
      },
      {
        heading: "First: put it in writing, and keep proof",
        paragraphs: [
          "An oral complaint leaves you with nothing to show anybody. Write it out — plainly, in the order things happened, with dates, names and places — and hand it in at the station. Ask for a receipt or an acknowledgement of some kind.",
          "If the station will not acknowledge it, send the same complaint to the same station by registered post. The postal receipt and the delivery record become your evidence that the police had the information on a particular date and did nothing with it. Every step below is easier when you can prove that date.",
        ],
      },
      {
        heading: "Second: the Superintendent of Police",
        paragraphs: [
          "Where the officer in charge refuses to record the information, the law gives you a direct route upward: send the substance of the information in writing, by post, to the Superintendent of Police. This is Section 173(4) of the Bharatiya Nagarik Suraksha Sanhita, 2023 — the provision that stood as Section 154(3) of the old Criminal Procedure Code.",
          "If the SP is satisfied that the information discloses a cognizable offence, the SP either investigates the case personally or directs a subordinate officer to do so. In practice a complaint that arrives from the district headquarters with a reference number attached is treated rather differently at the station than the same complaint handed across the counter.",
        ],
      },
      {
        heading: "Third: the Magistrate",
        paragraphs: [
          "If the SP route produces nothing either, the next step is a judicial one. Under Section 175(3) of the BNSS — Section 156(3) of the old Code — a Magistrate empowered to take cognizance can direct the police to investigate.",
          "The BNSS added two conditions that the old provision did not have, and applications are being returned for missing them. The Magistrate must be shown that you first approached the station and then the Superintendent under Section 173(4), and the application has to be supported by an affidavit. In other words, the second step above is not optional; it is now a precondition to the third.",
        ],
        list: [
          "Attach the original complaint and the postal receipt from the station.",
          "Attach the complaint sent to the Superintendent and its receipt.",
          "Support the application with an affidavit setting out both attempts and their dates.",
          "Where the case allows, a private complaint under Section 223 BNSS can be filed instead of, or alongside, asking for a police investigation.",
        ],
      },
      {
        heading: "What Lalita Kumari actually decided",
        paragraphs: [
          "In Lalita Kumari v. Government of Uttar Pradesh (2014), a Constitution Bench held that registration of an FIR is mandatory under Section 154 of the Code if the information discloses a cognizable offence, and that no preliminary inquiry is permissible before registering in such a case.",
          "The Court did allow a preliminary inquiry in a narrow set of categories — matrimonial and family disputes, commercial offences, medical negligence, corruption cases, and cases with abnormal delay in reporting — but even there the inquiry is limited to whether the information discloses a cognizable offence, not whether the allegation is true. And it was to be concluded within a defined period, with the reasons recorded.",
          "That distinction is the one to hold on to at the counter. Whether you will ultimately win is not the question at the stage of registration. Whether what you have described, if true, is a cognizable offence — that is the only question, and it is not the station's to answer by refusing to write.",
        ],
      },
      {
        heading: "Zero FIR: the wrong police station is not a reason",
        paragraphs: [
          "\"This did not happen in our area\" is not a lawful refusal. A zero FIR must be registered by any police station regardless of where the offence took place, given a serial number of zero, and transferred to the station with jurisdiction, which then renumbers it and investigates.",
          "The BNSS puts this beyond argument: information about a cognizable offence may be recorded irrespective of the area where the offence is committed. It also allows information to be given by electronic communication, though it must then be signed within three days for the FIR to be entered.",
        ],
      },
      {
        heading: "What this is worth in practice",
        paragraphs: [
          "Most refusals do not survive a written complaint with a postal receipt behind it. The ones that do are usually cases where the station has taken a view on the merits it is not entitled to take — and those are exactly the ones where the Magistrate's direction under Section 175(3) is the answer.",
          "What costs people their case is not the refusal. It is the six weeks spent going back to the counter and being told to come again, while the evidence goes cold and no document anywhere records that they ever asked.",
        ],
      },
      {
        heading: "Doing this in Vaishali district",
        paragraphs: [
          "For an offence in Vaishali district, the ladder runs: the police station concerned, then the Superintendent of Police, Vaishali, by registered post under Section 173(4), then an application before the Magistrate at the Hajipur court complex under Section 175(3) — with the written complaints and postal receipts from the first two steps attached.",
          "If an arrest is feared on the other side of the same dispute, or the police inaction is costing evidence, take advice before the weeks slip away. The chamber handles [criminal matters at Hajipur](/practice/criminal-lawyer-hajipur), including exactly this escalation.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can the police in Bihar refuse to register an FIR?",
        a: "Not where the information discloses a cognizable offence. In Lalita Kumari v. Government of Uttar Pradesh (2014) a Constitution Bench of the Supreme Court held that registration is mandatory in such a case and that no preliminary inquiry is permissible first. A preliminary inquiry is allowed only in a narrow set of categories — matrimonial disputes, commercial offences, medical negligence, corruption and cases of abnormal delay — and even then it is limited to whether a cognizable offence is disclosed, not to whether the allegation is true.",
      },
      {
        q: "What is Section 173(4) BNSS?",
        a: "It is the escalation route when the officer in charge of a police station refuses to record your information. You send the substance of the information in writing, by post, to the Superintendent of Police, who investigates personally or directs a subordinate to do so if satisfied that a cognizable offence is disclosed. It replaces Section 154(3) of the old Criminal Procedure Code.",
      },
      {
        q: "How do I file a Section 175(3) BNSS application?",
        a: "It is an application to a Magistrate empowered to take cognizance, asking that the police be directed to investigate. Under the BNSS it must be supported by an affidavit, and you must show that you first approached the police station and then the Superintendent of Police under Section 173(4). Attach the complaints and the postal receipts proving both attempts.",
      },
      {
        q: "Can I lodge an FIR at a police station outside the area where the offence happened?",
        a: "Yes. That is a zero FIR: it is registered with a serial number of zero by whichever station you reach, then transferred to the station with territorial jurisdiction, which renumbers and investigates it. The BNSS makes this explicit by providing that information about a cognizable offence may be recorded irrespective of the area where the offence was committed.",
      },
    ],
    hashtags: ["FIR", "CriminalLaw", "BNSS", "LegalAwareness", "PoliceComplaint"],
    related: "/practice/criminal-lawyer-hajipur",
    relatedLabel: "Criminal Defence in Hajipur",
    caseLaw: "/case-law/anticipatory-bail",
    caseLawLabel: "Anticipatory bail case law",
  },

  // ---------------------------------------------------------------------------
  {
    slug: "mutual-consent-divorce-how-long",
    tag: "Family Law",
    date: "2026-08-16",
    title: "How Long a Mutual Consent Divorce Actually Takes",
    seoTitle: "How Long Does a Mutual Consent Divorce Take in Bihar? | Adv. Ram Snehi Mishra",
    seoDescription:
      "The real timeline for a mutual consent divorce under Section 13B of the Hindu Marriage Act — the two motions, the six-month gap, when it can be waived after Amardeep Singh v. Harveen Kaur, and what makes a file take longer.",
    excerpt:
      "Six to eighteen months is the statutory shape of it. But the six-month gap between the two motions can be waived, and most people who wait it out were never told so.",
    sections: [
      {
        paragraphs: [
          "Everyone asks the same question first, and it is a fair one. A contested divorce can run for years; a consented one need not. The difference between six months and eighteen usually comes down to two things — whether the settlement was properly written before the petition was filed, and whether anyone asked for the waiting period to be waived.",
        ],
      },
      {
        heading: "The structure the statute sets",
        paragraphs: [
          "A mutual consent divorce under Section 13B of the Hindu Marriage Act, 1955 has two stages, called the first and second motions.",
          "The petition is presented jointly. It has to state that the parties have been living separately for a year or more, that they have not been able to live together, and that they have agreed the marriage should be dissolved. Both parties are examined and their statements recorded — that is the first motion.",
          "The second motion comes not less than six months after the first, and not later than eighteen months. Both parties appear again and confirm that they still consent. Consent has to survive to the second motion: if one party withdraws, the petition fails, and no court can dissolve the marriage on a consent that no longer exists.",
        ],
      },
      {
        heading: "The waiver most people are never told about",
        paragraphs: [
          "In Amardeep Singh v. Harveen Kaur (2017), the Supreme Court held that the six-month period under Section 13B(2) is directory and not mandatory, and that a court may waive it.",
          "The judgment sets out what a court will want to see before it does. The waiver is not automatic, and it is not granted because both sides would prefer to be finished sooner.",
        ],
        list: [
          "The statutory period of one year of separation under Section 13B(1) has already expired before the first motion.",
          "All efforts at mediation and reconciliation have failed, and there is no likelihood of success.",
          "The parties have genuinely settled their differences — maintenance, custody and any other issue between them.",
          "The waiting period would only prolong their agony.",
        ],
      },
      {
        heading: "What actually makes a file take longer",
        paragraphs: [
          "In the Family Court at Hajipur, as anywhere, the statute is rarely the constraint. These are:",
        ],
        list: [
          "A settlement agreed in conversation but never reduced to writing, so the terms are re-argued at the second motion.",
          "Maintenance and custody left to be sorted out later — which means they are sorted out in a fresh proceeding, not this one.",
          "A party living outside the district or the country, since both must appear and be examined at each motion.",
          "Documents assembled late: the marriage proof, the address proof, the photographs, the settlement itself.",
          "Dates lost to adjournment because one side's advocate was not ready.",
        ],
      },
      {
        heading: "The part that is not about time",
        paragraphs: [
          "A consented divorce is the one proceeding in family law where both parties can decide the outcome themselves rather than have it decided for them. That is worth using properly. Once the decree is passed, the terms in it are what you are left with — and a maintenance figure or a custody arrangement agreed loosely, to get the thing over with, is very hard to reopen afterwards.",
          "The honest advice, given often in this chamber, is that a settlement worth signing takes a few more weeks to draft than one worth regretting.",
        ],
      },
      {
        heading: "In the Family Court at Hajipur",
        paragraphs: [
          "Matrimonial matters from Vaishali district are heard by the Family Court at the Hajipur court complex, and the timeline above is what a straightforward file looks like there: settlement drafted before the petition, both parties present at both motions, documents complete on day one.",
          "If you are weighing this route, the [divorce and family practice page](/practice/divorce-family-lawyer-hajipur) explains how the chamber handles it, and the free preparation checklist lists the papers to gather before the first consultation.",
        ],
      },
    ],
    faqs: [
      {
        q: "How long does a mutual consent divorce take in the Hajipur Family Court?",
        a: "The statutory shape is six to eighteen months: the second motion comes not less than six months and not more than eighteen months after the first. In the Family Court at Hajipur a straightforward, well-prepared file ordinarily concludes within that window, and where the court waives the six-month period under Amardeep Singh v. Harveen Kaur (2017), in a few months instead.",
      },
      {
        q: "Can the six-month waiting period be waived?",
        a: "Yes. In Amardeep Singh v. Harveen Kaur (2017) the Supreme Court held that the six-month period under Section 13B(2) is directory, not mandatory. A court may waive it where the one-year separation under Section 13B(1) is already complete, mediation has genuinely failed, the parties have settled maintenance and custody between them, and further waiting would only prolong the agony. It has to be applied for and supported on affidavit — it is not automatic.",
      },
      {
        q: "What if one party changes their mind before the second motion?",
        a: "The petition fails. Consent must exist at the time of the second motion, and a court cannot grant a decree under Section 13B on a consent that has been withdrawn. The party who still wants a divorce would have to proceed on a contested petition under Section 13 on a statutory ground.",
      },
      {
        q: "Do both parties have to appear in court?",
        a: "Yes. Both parties are examined and their statements recorded at the first motion and again at the second. This is the usual reason a file slips when one party lives outside the district or abroad, and it should be planned for before the petition is presented rather than after.",
      },
    ],
    hashtags: ["Divorce", "FamilyLaw", "MutualConsent", "HinduMarriageAct", "LegalAwareness"],
    related: "/practice/divorce-family-lawyer-hajipur",
    relatedLabel: "Divorce & Family Law in Hajipur",
    caseLaw: "/case-law/mutual-consent-divorce",
    caseLawLabel: "Divorce case law",
    checklist: "/checklists/mutual-consent-divorce",
    checklistLabel: "Mutual Consent Divorce Checklist",
  },

  // ---------------------------------------------------------------------------
  {
    slug: "certified-copy-of-court-order",
    tag: "Court Procedure",
    date: "2026-08-16",
    title: "How to Get a Certified Copy of a Court Order — and Why the Date Matters",
    seoTitle: "Certified Copy of a Court Order in Bihar — How to Get One",
    seoDescription:
      "How to apply for a certified copy of a judgment, decree or order from a district court, what it is needed for, and why Section 12 of the Limitation Act makes the date you applied as important as the copy itself.",
    excerpt:
      "A downloaded order is for reading. A certified copy is what you file with. And the date you applied for it can be worth more to your appeal than the copy is.",
    sections: [
      {
        paragraphs: [
          "There is a document nobody explains and everybody eventually needs. You cannot appeal without it, you cannot execute a decree without it, and the bank, the registry office and the mutation clerk will all send you away without it.",
        ],
      },
      {
        heading: "What a certified copy is",
        paragraphs: [
          "A certified copy is a copy of a document on the court's record, issued by the court itself, bearing the copying section's seal, the signature of the authorised officer, and — importantly — the dates the application was made and the copy was ready.",
          "It is not the same thing as the PDF you downloaded from a court website or read on this site's case-law pages. Those are for reading and research. A court, a registry office or a bank will ask for the certified copy, and nothing else will do.",
        ],
      },
      {
        heading: "How to apply",
        paragraphs: [
          "The application is made to the copying section of the court that passed the order — the same court complex, not the High Court, unless the order is the High Court's own.",
        ],
        list: [
          "Fill the copying application form, with the case number, the year, the names of the parties, and exactly which document you want — judgment, decree, order sheet, deposition, exhibit.",
          "Affix the required court-fee stamps and pay the folio charges. These are small, but a short-paid application is returned rather than processed.",
          "Say whether you want it ordinary or urgent. Urgent costs more and is issued faster; if a limitation period is running, pay for urgent.",
          "Collect the receipt. It carries the date of application, which is the part that matters legally.",
          "A party to the case can apply as of right. A person who is not a party can usually apply too, on an application showing why they need it.",
        ],
      },
      {
        heading: "Why the date of application matters",
        paragraphs: [
          "Section 12 of the Limitation Act, 1963 excludes, when computing the period of limitation for an appeal or a revision, the time requisite for obtaining a copy of the decree or order appealed from.",
          "Read that carefully, because two words in it decide cases. The exclusion is of the time requisite — the time genuinely necessary to obtain the copy — not of all the time that happened to pass. If the order was passed in January and you applied for the copy in April, the three months you spent doing nothing are not excluded. They are counted against you.",
          "So the practical rule is the opposite of what people assume. Apply for the certified copy immediately, even if you have not yet decided whether to appeal. It is inexpensive, and the application date is what starts the clock on the exclusion. Deciding later is fine; applying later is not.",
        ],
      },
      {
        heading: "When you will need one",
        list: [
          "Filing an appeal or a revision — the certified copy of the decree or order must be filed with it.",
          "Executing a decree, including a money decree or a decree for possession.",
          "Mutation of land in the revenue records following a decree.",
          "Producing a divorce decree for remarriage, a passport, a bank or an employer.",
          "Proving in another proceeding what a court has already held.",
        ],
      },
      {
        heading: "If the copy is delayed",
        paragraphs: [
          "Delay in the copying section is common and is usually not fatal, precisely because Section 12 excludes the time requisite. What is fatal is having no receipt to prove when you applied.",
          "Keep the receipt. Note the case's CNR number on your own file at the same time, because it is the one number that will find the case again years later, whatever happens to the case number in between.",
        ],
      },
      {
        heading: "At the Hajipur court complex",
        paragraphs: [
          "For a decree or order of the courts at Hajipur (Vaishali district), the copy application goes to the copying section of the court complex — apply the day the judgment is pronounced if an appeal to the Patna High Court is even a possibility, because the appeal clock is what the application date protects.",
          "If the appeal is the plan, the chamber handles the whole chain — certified copy, limitation and the [appeal at the Patna High Court](/practice/patna-high-court-advocate) — and the [limitation checker](/tools/limitation-checker) on this site shows the periods that apply.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I get a certified copy of a court order in Bihar?",
        a: "Apply to the copying section of the court that passed the order, using the copying application form with the case number, year, party names and a description of the document you want. Affix the required court-fee stamps and folio charges, choose ordinary or urgent issue, and keep the receipt — it records the date of application, which matters for limitation.",
      },
      {
        q: "Is a downloaded judgment the same as a certified copy?",
        a: "No. A copy downloaded from a court website or read on a case-law database is for reading and research. Filing an appeal, executing a decree or producing an order to a bank or registry office requires the certified copy issued by the court itself, with the copying section's seal and signature.",
      },
      {
        q: "How does a certified copy affect my appeal deadline?",
        a: "Section 12 of the Limitation Act, 1963 excludes the time requisite for obtaining a copy of the decree or order when computing the limitation period for an appeal or revision. Only the time genuinely necessary is excluded — not any delay in applying. That is why the copy should be applied for immediately after the order, before you have even decided whether to appeal.",
      },
      {
        q: "Can someone who is not a party to the case get a certified copy?",
        a: "Usually yes, on an application setting out why the copy is needed. A party to the proceeding can apply as of right; a stranger to it applies on cause shown, and the court may allow or refuse the application.",
      },
    ],
    hashtags: ["CourtProcedure", "CertifiedCopy", "Limitation", "Appeal", "LegalAwareness"],
    related: "/practice/civil-lawyer-hajipur",
    relatedLabel: "Civil Litigation in Hajipur",
    tool: "/tools/limitation-checker",
    toolLabel: "Limitation Period Checker",
  },

  // ---------------------------------------------------------------------------
  {
    slug: "cheque-bounce-notice-deadlines",
    tag: "Criminal Law",
    date: "2026-08-16",
    title: "Cheque Bounce: The Three Deadlines That Decide the Case",
    seoTitle: "Cheque Bounce in Bihar — the 3 Deadlines (Section 138)",
    seoDescription:
      "The Section 138 Negotiable Instruments Act timeline explained: 30 days to send the demand notice, 15 days for payment, 30 days to file the complaint — and the jurisdiction rule that decides where you file.",
    excerpt:
      "More Section 138 complaints fail on the calendar than on the merits. Three periods run one after another, and missing any of them ends the case before anyone looks at the cheque.",
    sections: [
      {
        paragraphs: [
          "A dishonoured cheque case looks mechanical. The cheque bounced, the money is owed, the law makes it an offence. In practice the complaints that fail rarely fail because the debt was disproved — they fail because a date was missed, and the court never reaches the merits at all.",
          "Section 138 of the Negotiable Instruments Act, 1881 sets three periods that run one after another. Each starts when the previous one ends, and none of them is discretionary.",
        ],
      },
      {
        heading: "Thirty days to send the demand notice",
        paragraphs: [
          "The clock starts when you receive information from the bank that the cheque has been returned unpaid — the return memo, not the date on the cheque and not the day you decided to act.",
          "From that date you have thirty days to make a demand for the money by giving notice in writing to the drawer. Send it by registered post with acknowledgement due, and keep the postal receipt and the tracking record. Refusal to accept a notice is treated as service; a notice that was never dispatched is not.",
          "The notice must demand the cheque amount. A notice demanding the cheque amount plus interest and costs, without making the cheque amount clear, invites an argument that no valid demand was made at all.",
        ],
      },
      {
        heading: "Fifteen days for the drawer to pay",
        paragraphs: [
          "The offence is not complete when the cheque bounces. It is complete only when the drawer fails to pay within fifteen days of receiving the notice.",
          "This is the period people misread most often. A complaint filed on the tenth day after the notice is premature and liable to be dismissed, however clear the debt — because on that day no offence had yet been committed.",
        ],
      },
      {
        heading: "Thirty days to file the complaint",
        paragraphs: [
          "Once the fifteen days expire without payment, the cause of action arises, and the complaint must be filed within one month of that date before a Magistrate.",
          "A complaint filed after that month is out of time, though the court has the power to take cognizance of a late complaint if the complainant satisfies it that there was sufficient cause for not filing within the period. That is a discretion to be earned on affidavit, not a right — and it is a poor position to argue from when the alternative was filing on time.",
        ],
      },
      {
        heading: "Where to file: the jurisdiction rule",
        paragraphs: [
          "This changed, was litigated, and was then settled by statute. The complaint lies before the court within whose jurisdiction the branch of the payee's bank where the payee presented the cheque for collection is situated.",
          "So it is your bank branch that decides the court, not the drawer's address and not where the cheque was written. Filing in the wrong court costs months and is entirely avoidable — it is the first thing to check, before the notice is even drafted.",
        ],
      },
      {
        heading: "What the drawer has to overcome",
        paragraphs: [
          "Section 139 raises a presumption in favour of the holder that the cheque was received for the discharge of a debt or other liability. In Rangappa v. Sri Mohan (2010) the Supreme Court held that this presumption extends to the existence of a legally enforceable debt, and that the burden of rebutting it lies on the accused.",
          "That burden is discharged on a preponderance of probabilities rather than beyond reasonable doubt, and it can be discharged out of the complainant's own evidence — most often by showing that the complainant did not have the financial capacity to advance the sum claimed.",
          "Which is why the papers matter more than the cheque. A complaint backed by bank statements, an income tax return and a written record of the transaction is a very different proposition from one resting on a cheque and an assertion.",
        ],
      },
      {
        heading: "Filing from Hajipur",
        paragraphs: [
          "Apply the jurisdiction rule to Vaishali district and it reads simply: if the bank branch where you presented the cheque is in the district, the complaint lies before the Magistrates at the Hajipur court complex — wherever the drawer lives and wherever the cheque was written.",
          "The three deadlines above are unforgiving, and the notice is where most complaints are quietly lost. The chamber [drafts the notice and conducts Section 138 complaints at Hajipur](/practice/criminal-lawyer-hajipur) — bring the return memo and the cheque before the thirty days run.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the time limit to send a cheque bounce notice?",
        a: "Thirty days from the date you receive information from the bank that the cheque was returned unpaid — the date of the return memo. The notice must be in writing and must demand payment of the cheque amount. Send it by registered post with acknowledgement due and keep the receipt.",
      },
      {
        q: "When can I file a cheque bounce complaint?",
        a: "Only after the drawer has failed to pay within fifteen days of receiving your notice. The offence is complete at that point, and the complaint must then be filed within one month. A complaint filed before the fifteen days expire is premature and liable to be dismissed.",
      },
      {
        q: "Where do I file a Section 138 complaint?",
        a: "Before the court within whose jurisdiction the branch of the payee's bank at which the cheque was presented for collection is situated. It is the payee's bank branch that fixes the court — not the drawer's address, and not where the cheque was issued. For a payee whose bank branch is in Vaishali district, that means the Magistrates' courts at Hajipur.",
      },
      {
        q: "What if I miss the deadline to file the complaint?",
        a: "The court may still take cognizance of a complaint filed after the one-month period if the complainant satisfies it that there was sufficient cause for not filing in time. That is a discretion, granted on an application supported by affidavit, and it should never be relied on as a plan.",
      },
      {
        q: "Does the accused have to prove the cheque was not for a debt?",
        a: "Effectively, yes. Section 139 presumes the cheque was received for the discharge of a debt or liability, and Rangappa v. Sri Mohan (2010) held that presumption covers the existence of a legally enforceable debt. The accused must rebut it on a preponderance of probabilities, which may be done from the complainant's own evidence.",
      },
    ],
    hashtags: ["ChequeBounce", "Section138", "NegotiableInstruments", "CriminalLaw", "LegalAwareness"],
    related: "/practice/criminal-lawyer-hajipur",
    relatedLabel: "Criminal Defence in Hajipur",
    caseLaw: "/case-law/cheque-bounce-section-138",
    caseLawLabel: "Cheque bounce case law",
  },

  // ---------------------------------------------------------------------------
  {
    slug: "dakhil-kharij-mutation-bihar",
    tag: "Property Law",
    date: "2026-08-16",
    title: "Dakhil-Kharij: Why a Registered Sale Deed Is Not the End of the Purchase",
    seoTitle: "Dakhil-Kharij (Land Mutation) in Bihar — Why It Matters | Adv. Ram Snehi Mishra",
    seoDescription:
      "Mutation of land in Bihar explained: what dakhil-kharij does, why registration alone leaves you exposed, what jamabandi and a Land Possession Certificate are for, and why a mutation entry is not proof of title.",
    excerpt:
      "The deed is registered, the money is paid, the keys have changed hands — and in the revenue records the land still belongs to the seller. That gap is where most property litigation in Bihar begins.",
    sections: [
      {
        paragraphs: [
          "A registered sale deed transfers title. It does not, by itself, change a single line in the revenue records. Until mutation is done — dakhil-kharij — the jamabandi still shows the seller's name, the rent receipts still issue in the seller's name, and to every government office you deal with, the land is still theirs.",
        ],
      },
      {
        heading: "What mutation actually does",
        paragraphs: [
          "Mutation is the updating of the revenue record to substitute the new holder's name for the old one. It is what lets you pay rent in your own name and get a receipt in your own name, and it is what the revenue administration, the local authorities and most banks look at when they want to know who holds the land now.",
          "The Bihar Land Mutation Act, 2011 governs the process in this state and prescribes how applications are made and disposed of. Applications may be filed at the circle office or online, and the order is passed by the Circle Officer after notice to the interested parties.",
        ],
      },
      {
        heading: "Why leaving it undone is expensive",
        list: [
          "The seller remains the recorded holder — and a recorded holder in possession of the record can attempt a second sale to a buyer who checks the jamabandi and finds nothing wrong.",
          "Rent receipts continue in the seller's name, which is the document most often produced as evidence of possession in a title suit.",
          "A Land Possession Certificate cannot be obtained in your name, and it is asked for constantly — for loans, for construction permissions, for government schemes.",
          "Acquisition compensation is paid to the recorded holder. Being the true owner and not the recorded one is precisely the position you do not want to be in when a notification is published.",
          "When you eventually sell, your own buyer's advocate will find the gap, and the price will reflect it.",
        ],
      },
      {
        heading: "The point most people get backwards",
        paragraphs: [
          "Mutation does not create title, and a mutation entry is not proof of ownership. The Supreme Court has said this repeatedly: entries in revenue records are made for fiscal purposes — so that the state knows from whom to collect — and they neither confer title nor extinguish it.",
          "So the two propositions sit side by side, and both are true. A mutation in your favour will not save a defective title. And a title that is perfectly good will still cause you years of trouble if the record says somebody else's name.",
          "Which is why due diligence before purchase cannot be replaced by mutation after it. Check the chain of title, the jamabandi, the current rent receipts, the encumbrance position and the physical boundary before the money moves — and check that the [decimal area written in the deed](/tools/land-unit-converter) matches the katha figure that was actually agreed, because the deed's figure is the one that binds. Then mutate immediately afterwards.",
        ],
      },
      {
        heading: "If the record is wrong rather than merely out of date",
        paragraphs: [
          "An error in the jamabandi itself — a wrong khata or khesra number, a wrong area, a name spelt wrong, an entry that survived a partition it should not have — is a correction matter rather than a mutation one, and it is dealt with by the revenue authorities on an application for correction. With the [special land survey](/blog/bihar-land-survey-documents) now rewriting the khatiyan village by village, an uncorrected error is about to be copied into the record the next generation inherits — fix it before the survey reaches your mauza.",
          "Where the dispute is about who is entitled rather than about what was typed, no revenue officer can resolve it. A contested claim to title is decided by a civil court, and an order in a mutation proceeding will not bind that court.",
        ],
      },
      {
        heading: "What to do, in order",
        list: [
          "Complete the sale deed and get it registered.",
          "Apply for dakhil-kharij at once, with the registered deed, the previous holder's jamabandi details and the khata and khesra numbers.",
          "Follow the application to its order rather than assuming it went through — an application filed is not an application allowed.",
          "Once mutated, pay the rent and keep the receipts in your own name. They are the cheapest evidence of possession you will ever collect.",
          "Keep the registered deed, the mutation order and the receipts together. That is the file your own buyer, or your children, will need.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is dakhil-kharij in Bihar?",
        a: "Dakhil-kharij is mutation — the updating of the revenue record to replace the previous holder's name with the new holder's after a sale, gift, inheritance or partition. In Bihar it is governed by the Bihar Land Mutation Act, 2011, and the order is passed by the Circle Officer after notice to the interested parties.",
      },
      {
        q: "Is mutation necessary if my sale deed is registered?",
        a: "Yes, in practical terms. Registration transfers title but changes nothing in the revenue record. Until mutation is done the jamabandi and the rent receipts remain in the seller's name, you cannot obtain a Land Possession Certificate, and acquisition compensation would be paid to the recorded holder rather than to you.",
      },
      {
        q: "Does mutation give me ownership of the land?",
        a: "No. Mutation entries are made for fiscal purposes — so the state knows from whom to collect rent — and the Supreme Court has held repeatedly that they neither confer title nor extinguish it. A mutation will not cure a defective title, and a good title is not lost because mutation was not done. Both facts matter, which is why due diligence before purchase and mutation after it are separate necessities.",
      },
      {
        q: "What if the jamabandi has a wrong name, khata or area?",
        a: "An error in the record itself is a correction matter, made on an application to the revenue authorities, rather than a mutation. But where the dispute is about who is entitled rather than about what was typed, no revenue officer can decide it — a contested claim to title is for a civil court, and a mutation order will not bind it.",
      },
    ],
    hashtags: ["DakhilKharij", "Mutation", "PropertyLaw", "Bihar", "Jamabandi", "LandRecords"],
    related: "/practice/property-lawyer-hajipur",
    relatedLabel: "Property & Land Law in Hajipur",
    checklist: "/checklists/property-purchase-bihar",
    checklistLabel: "Land Purchase Due-Diligence Checklist",
    tool: "/tools/stamp-duty-calculator",
    toolLabel: "Stamp Duty & Registration Calculator",
  },

  // ---------------------------------------------------------------------------
  {
    slug: "first-date-of-a-criminal-case",
    tag: "Court Procedure",
    date: "2026-08-16",
    title: "What Actually Happens on the First Date of a Criminal Case",
    seoTitle: "First Hearing of a Criminal Case in Bihar — What to Expect",
    seoDescription:
      "What happens on the first date of a criminal case in a district court — appearance, bail bonds, supply of documents, framing of charge — and why the first date almost never involves any evidence being heard.",
    excerpt:
      "Almost nobody's case is decided, argued or even discussed on the first date. Knowing what the day is actually for is the difference between a wasted trip and a useful one.",
    sections: [
      {
        paragraphs: [
          "The summons arrives with a date on it, and the date is read as though something will be decided. It will not be. A criminal trial in a district court is a sequence of stages, and the first date exists to start the sequence, not to finish anything.",
          "This is not a criticism of the courts. It is how a trial is structured, and understanding it removes most of the anxiety — and a good deal of the pointless waiting.",
        ],
      },
      {
        heading: "Before you go",
        list: [
          "Confirm the date. Listings move. Check the case status by CNR number and confirm with the advocate on record before you travel.",
          "Take the summons or the bail order, and a photo identity document.",
          "Reach early. Court complexes are large, and finding the right court hall takes longer than people expect.",
          "Dress plainly and switch the phone off before entering the hall.",
          "Do not bring the whole family. One person to accompany you is enough, and crowded galleries help nobody.",
        ],
      },
      {
        heading: "What the first date is for",
        paragraphs: [
          "Three things, usually, and often only the first two.",
        ],
        list: [
          "Appearance. Your presence is recorded. If you are on bail, the bond and sureties are verified or furnished. If you were summoned and do not appear, the court may issue a warrant — which is why an unavoidable absence must be covered by an application, made in advance, through your advocate.",
          "Supply of documents. Before a charge can be framed, the accused must be given copies of the police report and the documents the prosecution relies on. This is not a courtesy; it is a statutory right, and a charge framed without it is open to challenge.",
          "The next date. The matter is put over for the next stage, and the purpose of that listing is recorded. That purpose is the most useful line in the whole order sheet — it tells you whether the next date needs you present.",
        ],
      },
      {
        heading: "Framing of charge — the stage that actually matters",
        paragraphs: [
          "After documents are supplied, the court considers whether a charge should be framed at all. This is where an accused's best opportunity often sits, and it is regularly wasted.",
          "At this stage the court is not deciding guilt. It is deciding whether the material on record discloses a case that requires a trial. If it does not, the accused is discharged, and it ends there. An application for discharge, argued on the papers the prosecution itself has filed, is a great deal cheaper than a trial — and where the material genuinely does not support the charge, it is also more likely to succeed than most people expect.",
          "If a charge is framed, it is read out and explained, and the accused is asked whether they plead guilty or claim to be tried. Only then does the trial proper begin, with prosecution evidence.",
        ],
      },
      {
        heading: "Why nothing seems to happen",
        paragraphs: [
          "A date can pass without progress for reasons that have nothing to do with your case: the presiding officer is on leave, a witness has not been served, the record has not come up from another court, the prosecution seeks time, or the board simply does not reach your item before the court rises.",
          "None of this means the case is going badly. What it does mean is that your own file should be ready every time, because the dates on which the court is ready and you are not are the dates that genuinely cost you.",
        ],
      },
      {
        heading: "The two questions worth asking your advocate",
        paragraphs: [
          "After every date, two questions are worth asking, and both have short answers: what stage is the case at now, and what is the next date for.",
          "Someone who cannot answer the second question is not going to be ready for it. And a client who knows the answer to the first stops measuring progress by how many times they have been to court.",
        ],
      },
      {
        heading: "At the courts at Hajipur",
        paragraphs: [
          "For a Vaishali district matter, everything above plays out at the Hajipur court complex: the first appearance before the Magistrate, committal to the Sessions Court where the offence requires it, and the stages that follow. You can watch your own case's stage and next date, free, with the [case-status tracker for Vaishali (Hajipur)](/case-status/vaishali) — search by CNR number or name.",
          "If the first date is still ahead of you, that is the right moment to take advice, not after it. The chamber [conducts criminal defence at Hajipur](/practice/criminal-lawyer-hajipur) from first appearance through trial, and appeals at the Patna High Court.",
        ],
      },
    ],
    faqs: [
      {
        q: "What happens on the first hearing of a criminal case?",
        a: "Ordinarily three things: your appearance is recorded and any bail bond verified or furnished; copies of the police report and the prosecution's documents are supplied to the accused; and the matter is adjourned to the next stage with the purpose of that listing recorded. Evidence is almost never heard on the first date.",
      },
      {
        q: "Do I have to attend every date in a criminal case?",
        a: "Not always, but you must attend when your presence is required, and non-appearance without leave can result in a warrant. The purpose recorded for the next listing tells you whether you are needed — a date for evidence usually requires you; a date for orders often does not. Confirm with the advocate on record before you decide not to go.",
      },
      {
        q: "What is framing of charge?",
        a: "It is the stage at which the court decides whether the material on record discloses a case that requires a trial. It is not a finding of guilt. If the material does not support the accusation the accused is discharged; if it does, the charge is framed, read out and explained, and the accused is asked whether they plead guilty or claim to be tried.",
      },
      {
        q: "Can I get copies of the police papers against me?",
        a: "Yes. The accused is entitled to be supplied with copies of the police report and the documents the prosecution relies on before the charge is framed. It is a statutory right rather than a concession, and a charge framed without that supply is open to challenge.",
      },
    ],
    hashtags: ["CriminalProcedure", "CourtProcedure", "FramingOfCharge", "LegalAwareness"],
    related: "/practice/criminal-lawyer-hajipur",
    relatedLabel: "Criminal Defence in Hajipur",
    checklist: "/checklists/criminal-case",
    checklistLabel: "Criminal Case Consultation Checklist",
  },

  // ---------------------------------------------------------------------------
  //  The two original LinkedIn essays, kept as written.
  // ---------------------------------------------------------------------------
  {
    slug: "when-law-enters-a-family",
    tag: "Family Law",
    date: null,
    title: "When Law Enters a Family, Something Has Already Broken",
    seoTitle: "When Law Enters a Family, Something Has Already Broken | Adv. Ram Snehi Mishra",
    excerpt:
      "Family disputes are never just about law — they are about emotions, expectations and unspoken pain. Why mediation often protects families better than litigation.",
    seoDescription:
      "A Hajipur family lawyer on why a legal victory in a matrimonial matter rarely brings emotional closure, and why courts increasingly push mediation and settlement in family disputes.",
    body: [
      "In my experience as a legal professional, family disputes are never just about law — they are about emotions, expectations, and often, unspoken pain.",
      "By the time a matter reaches the court — whether it is divorce, maintenance, custody, or domestic disputes — the relationship has already gone through phases of silence, misunderstanding, and emotional distance.",
      "The courtroom then becomes a place where personal conversations turn into legal arguments, emotions are converted into affidavits, and relationships are reduced to case files.",
      "But one important reality often gets overlooked — a legal victory does not always mean emotional closure. A decree of divorce ends the marriage, but not the memories. A custody order decides rights, but not bonding. A maintenance order ensures support, but not respect.",
      "This is why the law today increasingly encourages mediation and settlement in family matters. Sometimes a conversation can solve what litigation cannot, understanding can prevent years of court battles, and early resolution can protect not just individuals, but entire families.",
      "As legal professionals, our duty is not only to fight cases — but also to guide clients towards the most humane and practical resolution. Because in family law, the goal should not just be “winning the case” — it should be “minimizing the damage.”",
    ],
    hashtags: ["FamilyLaw", "Mediation", "LegalAwareness", "Divorce", "Advocacy", "Justice"],
    source: "https://www.linkedin.com/in/ramsnehimishra/",
    related: "/practice/divorce-family-lawyer-hajipur",
    relatedLabel: "Divorce & Family Law in Hajipur",
  },
  {
    slug: "huf-ancestral-property-litigation",
    tag: "Property Law",
    date: null,
    title: "HUF & Ancestral Property: When Legacy Turns Into Litigation",
    seoTitle: "HUF & Ancestral Property: When Legacy Turns Into Litigation | Adv. Ram Snehi Mishra",
    excerpt:
      "Ancestral property under a Hindu Undivided Family often turns legacy into litigation. How clear partition and family settlements protect both land and relationships.",
    seoDescription:
      "Why ancestral property disputes under a Hindu Undivided Family escalate in rural Bihar — unclear records, undocumented oral partitions — and how registered partition and family settlements prevent years of litigation.",
    body: [
      "In many villages across India, land is not just an asset — it is identity, legacy, and family pride passed down through generations.",
      "But when it comes to ancestral property under a Hindu Undivided Family (HUF), what was once shared ownership often becomes the root of serious disputes. The problem usually begins with a simple assumption: “Yeh toh hum sabka hai…” Legally, that may be true — but how much belongs to whom is where conflicts arise.",
      "Under HUF, property is jointly owned by coparceners, rights are acquired by birth, and each member has a claim — but not always a clearly defined share until partition.",
      "In villages these disputes become even more complex because records are unclear or outdated, oral partitions were never legally documented, and emotional attachment is stronger than legal understanding.",
      "And then one day a sale happens without consent, a mutation is challenged, or a boundary becomes a battlefield. What follows is not just a legal fight — but a breakdown of family structure: years of litigation, strained relationships, and land that remains unusable during disputes.",
      "As legal professionals, it is important to create awareness: partition should be clearly documented and registered, family settlements can avoid years of court battles, and every coparcener's right must be understood and respected.",
      "Because in HUF matters, the law is clear — but emotions are not. The real challenge is not dividing the property… it is protecting the family while doing so.",
    ],
    hashtags: ["HUF", "AncestralProperty", "PropertyLaw", "LegalAwareness", "FamilyDisputes", "Advocacy"],
    source: "https://www.linkedin.com/in/ramsnehimishra/",
    related: "/practice/property-lawyer-hajipur",
    relatedLabel: "Property & Land Law in Hajipur",
  },
];

export const postBySlug = (slug) => blogPosts.find((p) => p.slug === slug);

/** Every paragraph and list item of a post, whichever shape it is written in. */
export const postText = (post) =>
  post.body
    ? post.body
    : (post.sections || []).flatMap((s) => [
        ...(s.heading ? [s.heading] : []),
        ...(s.paragraphs || []),
        ...(s.list || []),
      ]);

/** Rough reading time, at ~200 words per minute. */
export const readingTime = (post) => {
  const words = postText(post).join(" ").split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
};

/** "12 March 2026", or null when the date is not yet known. */
export const formatPostDate = (date) =>
  date
    ? new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;
