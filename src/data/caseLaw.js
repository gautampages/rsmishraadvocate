// ============================================================================
//  CASE-LAW RESEARCH — copy, and the topic pages that carry it in search.
//
//  HOW THIS IS STRUCTURED, AND WHY
//  -------------------------------
//  A search tool cannot rank. Nobody types "case law search"; they type
//  "section 125 CrPC judgments" or "anticipatory bail Patna High Court". So
//  the tool lives on one hub page, and around it sit topic pages that are
//  real, written pages — the settled legal position, the cases that decided
//  it, what a court actually looks for — each opening with the search already
//  run for that topic.
//
//  The judgments themselves are deliberately NOT given indexable URLs. They
//  are Indian Kanoon's copy of a public record; republishing five million of
//  them under this domain would be thin duplicate content on a scale that
//  damages the rest of the site, and it would never outrank the source. The
//  reader at /case-law/judgment is noindex and links back to the source on
//  every view.
//
//  Every case named below is a real, well-known authority. Where a proposition
//  is contested or moving, the copy says so rather than flattening it.
// ============================================================================

export const hub = {
  eyebrow: "Case Law",
  title: "Search Indian Case Law — Supreme Court, High Courts & Tribunals",
  intro:
    "Search the full text of Indian judgments, orders and bare Acts: the Supreme Court, every High Court including Patna, and the tribunals. Filter by court, by date, by the judge who wrote it, or by words that must appear in the title — then read the judgment itself, with every citation in it linked.",
  meta: "Free · No registration · Sourced from Indian Kanoon's public database",
};

export const searchNotes = [
  {
    icon: "search",
    title: "Phrase before keyword",
    text: "A phrase in quotes finds the words together and in order. \"irretrievable breakdown of marriage\" returns the cases about that doctrine; the same five words unquoted return anything mentioning marriage.",
  },
  {
    icon: "scales",
    title: "Narrow the court, not the words",
    text: "Widening your words rarely helps; narrowing the court almost always does. A point of Bihar practice is settled by the Patna High Court, and filtering to it turns thirty thousand results into thirty.",
  },
  {
    icon: "clock",
    title: "Recent is not the same as good",
    text: "The date filter is for finding what has changed, not what is authoritative. A 1987 Supreme Court judgment still binds every court in India; a High Court order from last month may bind nobody.",
  },
  {
    icon: "doc",
    title: "Read what cites it, not only it",
    text: "Every result shows how many later judgments cite it. A heavily cited case is one the courts keep returning to — and a case with no citations at all, however apt it reads, may have been quietly departed from.",
  },
];

export const hubFaqs = [
  {
    q: "Is this case law search free?",
    a: "Yes. Searching, reading judgments and following citations are all free, need no registration and no login. The judgments come from Indian Kanoon's public database, which draws on the courts' own published records.",
  },
  {
    q: "Which courts does the search cover?",
    a: "The Supreme Court of India, every High Court in India including the Patna High Court, Supreme Court daily orders, tribunals such as the NCLT, NCLAT, ITAT and SAT, and the bare text of central and state Acts. Use the court filter to search only one of them.",
  },
  {
    q: "How do I search for a particular section, such as Section 125 CrPC?",
    a: "Put the section and the Act together as a phrase — \"Section 125 CrPC\" — and choose Judgments only. Adding the subject narrows it further: \"Section 125\" maintenance daughter. Note that the criminal codes were replaced in 2024, so a current point may appear under both Section 125 CrPC and Section 144 BNSS.",
  },
  {
    q: "Can I search judgments of the Patna High Court only?",
    a: "Yes. Choose Patna High Court in the court filter. This is the appellate court for the whole of Bihar, so for any question of Bihar practice it is the most useful court to search, and its judgments bind every district court in the state.",
  },
  {
    q: "How do I find a case if I only remember the parties' names?",
    a: "Use the \"words in the title\" field, which searches only case titles. Enter both surnames — a case title reads as \"X vs Y on <date>\", so searching the title for both names will find it even when you cannot recall the year.",
  },
  {
    q: "Does a judgment I find here apply to my case?",
    a: "That is the question a search cannot answer. Whether an authority applies turns on whether its facts are close enough to yours, whether it has since been overruled or distinguished, and whether the court you are in is bound by it. Reading a favourable judgment is the easy part; knowing whether it survives is the work. Bring it to the chamber before you rely on it.",
  },
  {
    q: "Can I use a judgment from this site in court?",
    a: "Courts require a citation to a recognised report or a certified copy, not a printout from a website. Use this to find and read the authority, then obtain the proper copy or citation for filing. The equivalent citations are shown at the head of most judgments.",
  },
];

// ---------------------------------------------------------------------------
//  TOPIC PAGES — /case-law/<slug>
//
//  `query` is a live Indian Kanoon query, run when the page opens.
//  `court`  preselects the court filter.
//  Written to match the chamber's practice, because a visitor who lands on
//  "maintenance judgments" is a visitor with a maintenance problem.
// ---------------------------------------------------------------------------
export const topics = [
  {
    slug: "maintenance-section-125-crpc",
    icon: "family",
    short: "Maintenance",
    title: "Maintenance Judgments — Section 125 CrPC / Section 144 BNSS",
    seoTitle: "Section 125 CrPC Maintenance Case Law — Patna HC & Supreme Court",
    seoDescription:
      "Search Supreme Court and High Court judgments on maintenance under Section 125 CrPC and Section 144 BNSS — quantum, interim maintenance, the 25% benchmark, and enforcement of arrears. Free full-text case law search.",
    query: '"Section 125" maintenance wife children',
    court: "judgments",
    intro:
      "Maintenance is the most litigated family provision in India, and the case law on it is unusually practical: courts have laid down not only who is entitled but how much, from when, and what happens when an order is ignored.",
    landmarks: [
      {
        case: "Rajnesh v. Neha (2020)",
        holding:
          "The framework judgment. It made an Affidavit of Disclosure of Assets and Liabilities mandatory in every maintenance proceeding, directed that interim applications be decided within sixty days, held that maintenance is ordinarily payable from the date of the application, and set out how overlapping claims under different statutes are to be adjusted.",
      },
      {
        case: "Kalyan Dey Chowdhury v. Rita Dey Chowdhury (2017)",
        holding:
          "The quantum benchmark courts work around: 25% of the husband's net salary was held to be just and proper as maintenance for the wife. The Court was express that 25% of gross salary would not be permissible.",
      },
      {
        case: "Bhuwan Mohan Singh v. Meena (2015)",
        holding:
          "On delay. The Court deprecated the practice of protracted maintenance proceedings and emphasised that Section 125 is a measure of social justice meant to prevent destitution, not an ordinary civil claim to be tried at leisure.",
      },
    ],
    practice:
      "In Vaishali and across Bihar the dispute is almost never about entitlement. It is about income — a respondent whose declared salary bears no relation to the life he is visibly living. The disclosure affidavit directed by Rajnesh is the lever, and the case law on adverse inference is where these applications are actually won.",
    related: "/practice/divorce-family-lawyer-hajipur",
    relatedLabel: "Divorce & Family Law in Hajipur",
    tool: "/tools/maintenance-estimator",
    toolLabel: "Maintenance Estimator",
  },
  {
    slug: "anticipatory-bail",
    icon: "shield",
    short: "Anticipatory bail",
    title: "Anticipatory Bail Judgments — Section 438 CrPC / Section 482 BNSS",
    seoTitle: "Anticipatory Bail Case Law — Supreme Court & Patna High Court | Adv. Ram Snehi Mishra",
    seoDescription:
      "Search judgments on anticipatory bail under Section 438 CrPC and Section 482 BNSS — when it can be granted, whether it can be limited in time, and the Patna High Court's own decisions. Free full-text search.",
    query: '"anticipatory bail" grant conditions',
    court: "judgments",
    intro:
      "Anticipatory bail is where a criminal defence usually begins, and the law on it has been settled twice by Constitution Benches — which means the principles are stable and the arguments are about their application.",
    landmarks: [
      {
        case: "Gurbaksh Singh Sibbia v. State of Punjab (1980)",
        holding:
          "The foundational Constitution Bench decision. It held that the power under Section 438 is not to be read narrowly, is not confined to exceptional cases, and should not ordinarily be fettered by conditions imported into the section by the courts.",
      },
      {
        case: "Sushila Aggarwal v. State (NCT of Delhi) (2020)",
        holding:
          "A Constitution Bench held that anticipatory bail is not ordinarily limited to a fixed period and does not automatically end when the accused is summoned or charges are framed, though a court may impose limits where the facts warrant it.",
      },
      {
        case: "Arnesh Kumar v. State of Bihar (2014)",
        holding:
          "A Bihar case with nationwide effect. It curbed automatic arrest in offences punishable up to seven years, requiring police to justify the necessity of arrest against Section 41 CrPC and magistrates to record satisfaction before authorising detention.",
      },
    ],
    practice:
      "The application is won on the material, not the adjectives: the FIR read against the ingredients of the offence, the antecedents, the delay in lodging, and whether custodial interrogation is genuinely needed. Arnesh Kumar in particular remains under-used in the district courts of Bihar, which is where it was decided.",
    related: "/practice/criminal-lawyer-hajipur",
    relatedLabel: "Criminal Defence in Hajipur",
  },
  {
    slug: "partition-and-ancestral-property",
    icon: "home",
    short: "Partition",
    title: "Partition & Ancestral Property Judgments — Coparcenary and HUF",
    seoTitle: "Partition & Ancestral Property Case Law — Patna HC & Supreme Court",
    seoDescription:
      "Search judgments on partition suits, coparcenary rights, ancestral property and Hindu Undivided Family disputes — including daughters' rights after Vineeta Sharma. Free full-text case law search.",
    query: "partition coparcenary ancestral property suit",
    court: "judgments",
    intro:
      "Ancestral property litigation turns on two questions that sound simple and are not: what is joint family property, and who was a coparcener when. The answer to the second changed materially in 2020.",
    landmarks: [
      {
        case: "Vineeta Sharma v. Rakesh Sharma (2020)",
        holding:
          "A daughter is a coparcener by birth, in the same manner as a son, and her right does not depend on the father being alive on 9 September 2005 when the amendment came into force. It settled a conflict that had produced contradictory judgments for fifteen years and reopened a great many settled assumptions about who must be joined to a partition suit.",
      },
      {
        case: "Prakash v. Phulavati (2015)",
        holding:
          "Held the opposite — that the 2005 amendment applied only where the father was alive on the commencement date. It was expressly overruled by Vineeta Sharma, and is included here because judgments decided while it held the field still cite it.",
      },
      {
        case: "Adiveppa v. Bhimappa (2017)",
        holding:
          "On the presumption of jointness: property held by members of a joint Hindu family is presumed to be joint, and the burden of proving that particular property is self-acquired lies on the member who asserts it.",
      },
    ],
    practice:
      "In rural Bihar the legal position is rarely the obstacle. The obstacle is the record — jamabandi that was never updated, an oral partition nobody documented, and mutation entries that reflect possession rather than title. The case law on the evidentiary value of revenue records is what those suits turn on.",
    related: "/practice/property-lawyer-hajipur",
    relatedLabel: "Property & Land Law in Hajipur",
    tool: "/checklists/property-dispute",
    toolLabel: "Property Dispute Checklist",
  },
  {
    slug: "mutual-consent-divorce",
    icon: "family",
    short: "Divorce",
    title: "Divorce Judgments — Mutual Consent, Cruelty and Irretrievable Breakdown",
    seoTitle: "Divorce Case Law — Supreme Court & Patna High Court Judgments",
    seoDescription:
      "Search judgments on divorce under the Hindu Marriage Act — mutual consent under Section 13B, waiver of the six-month period, cruelty, desertion and irretrievable breakdown of marriage. Free case law search.",
    query: '"mutual consent" divorce "Section 13B" waiver',
    court: "judgments",
    intro:
      "Two lines of authority matter most in practice: how quickly a consented divorce can actually be concluded, and when a court will dissolve a marriage that has plainly ended but does not fit a statutory ground.",
    landmarks: [
      {
        case: "Amardeep Singh v. Harveen Kaur (2017)",
        holding:
          "The six-month waiting period between the two motions under Section 13B(2) is directory rather than mandatory, and can be waived where the parties have already lived apart long enough, mediation has failed, and the settlement is genuine. This is the judgment that lets a mutual-consent petition conclude in months rather than a year.",
      },
      {
        case: "Shilpa Sailesh v. Varun Sreenivasan (2023)",
        holding:
          "A Constitution Bench confirmed that the Supreme Court may dissolve a marriage that has irretrievably broken down by exercising its powers under Article 142, and set out the factors to be weighed — while making clear that no party can claim such a decree as of right.",
      },
      {
        case: "Samar Ghosh v. Jaya Ghosh (2007)",
        holding:
          "The leading judgment on mental cruelty, setting out an illustrative and expressly non-exhaustive list of conduct amounting to cruelty. It remains the starting point in any contested petition on that ground.",
      },
    ],
    practice:
      "Amardeep Singh is the most useful judgment in this area for a family facing a long separation, and it is still routinely not pressed. The waiver is not automatic: it has to be applied for, and supported on affidavit with the facts the judgment names.",
    related: "/practice/divorce-family-lawyer-hajipur",
    relatedLabel: "Divorce & Family Law in Hajipur",
    tool: "/checklists/mutual-consent-divorce",
    toolLabel: "Mutual Consent Divorce Checklist",
  },
  {
    slug: "cheque-bounce-section-138",
    icon: "doc",
    short: "Cheque bounce",
    title: "Cheque Bounce Judgments — Section 138, Negotiable Instruments Act",
    seoTitle: "Section 138 Cheque Bounce Case Law — Patna HC & Supreme Court",
    seoDescription:
      "Search judgments on cheque dishonour under Section 138 of the Negotiable Instruments Act — the statutory presumption, legally enforceable debt, notice periods, jurisdiction and compounding. Free case law search.",
    query: '"Section 138" "Negotiable Instruments" dishonour presumption',
    court: "judgments",
    intro:
      "A cheque bounce complaint looks mechanical until the defence starts. Everything then turns on the presumption under Section 139, and on what is enough to displace it.",
    landmarks: [
      {
        case: "Rangappa v. Sri Mohan (2010)",
        holding:
          "The presumption under Section 139 extends to the existence of a legally enforceable debt, not merely to the cheque having been issued. The accused bears the burden of rebutting it — on a preponderance of probabilities, not beyond reasonable doubt, and the rebuttal may rest on the complainant's own evidence.",
      },
      {
        case: "Basalingappa v. Mudibasappa (2019)",
        holding:
          "Consolidated the principles on rebutting the presumption, and confirmed that the accused can succeed by showing the complainant lacked the financial capacity to advance the sum claimed, without having to lead direct evidence.",
      },
      {
        case: "Dashrath Rupsingh Rathod / Bridgestone India v. Inderpal Singh",
        holding:
          "The line of authority on territorial jurisdiction, ending in the 2015 amendment: a complaint lies where the payee's bank branch that received the cheque for collection is situated. This is the first thing to check before filing.",
      },
    ],
    practice:
      "Two failures end more of these complaints than any defence: a demand notice that misses the thirty-day window or misstates the amount, and a complaint filed in the wrong court on jurisdiction. Both are fatal and both are avoidable.",
    related: "/practice/criminal-lawyer-hajipur",
    relatedLabel: "Criminal Defence in Hajipur",
  },
  {
    slug: "domestic-violence-act",
    icon: "shield",
    short: "Domestic violence",
    title: "Domestic Violence Judgments — Protection of Women from Domestic Violence Act, 2005",
    seoTitle: "Domestic Violence Act Case Law — Patna HC & Supreme Court",
    seoDescription:
      "Search judgments under the Protection of Women from Domestic Violence Act, 2005 — right to residence in a shared household, protection and monetary relief, and who may be made a respondent. Free case law search.",
    query: '"Domestic Violence Act" "shared household" residence order',
    court: "judgments",
    intro:
      "The Act is remedial and its reliefs are civil, but it is administered by criminal courts — which is why the case law on what it does and does not permit has had to be worked out judgment by judgment.",
    landmarks: [
      {
        case: "Satish Chander Ahuja v. Sneha Ahuja (2020)",
        holding:
          "Overruled the narrow reading of \"shared household\". A daughter-in-law's right of residence is not confined to property owned or tenanted by the husband, and can extend to a house belonging to a parent-in-law where the family has lived as a joint family.",
      },
      {
        case: "S.R. Batra v. Taruna Batra (2007)",
        holding:
          "The earlier, restrictive view, holding the shared household to be limited to the husband's own or the joint family's property. It was expressly overruled in Satish Chander Ahuja, and is included because orders passed under it are still being cited.",
      },
      {
        case: "Hiral P. Harsora v. Kusum Narottamdas Harsora (2016)",
        holding:
          "Struck down the words \"adult male\" in the definition of respondent, so proceedings may be brought against female relatives of the husband as well.",
      },
    ],
    practice:
      "A residence order is the relief that changes a client's life on the day it is passed, and it is frequently not asked for. Note also that proceedings under this Act run alongside, not instead of, a maintenance claim — with the amounts adjusted rather than duplicated.",
    related: "/practice/divorce-family-lawyer-hajipur",
    relatedLabel: "Divorce & Family Law in Hajipur",
  },
  {
    slug: "specific-performance-of-agreement-to-sell",
    icon: "scales",
    short: "Specific performance",
    title: "Specific Performance Judgments — Agreement to Sell and Readiness to Perform",
    seoTitle: "Specific Performance of Agreement to Sell — Case Law | Adv. Ram Snehi Mishra, Hajipur",
    seoDescription:
      "Search judgments on specific performance of an agreement to sell — readiness and willingness, the 2018 amendment to the Specific Relief Act, limitation and the discretion of the court. Free case law search.",
    query: '"specific performance" "agreement to sell" readiness willingness',
    court: "judgments",
    intro:
      "The most common civil suit over land after partition, and the one most often lost on a point that had nothing to do with the merits of the bargain.",
    landmarks: [
      {
        case: "The 2018 amendment to the Specific Relief Act",
        holding:
          "Specific performance ceased to be a discretionary remedy and became one the court is to grant subject to the statutory exceptions. Whether the amendment applies to agreements entered into before it came into force has itself generated substantial case law.",
      },
      {
        case: "J.P. Builders v. A. Ramadas Rao (2011)",
        holding:
          "On readiness and willingness under Section 16(c): readiness is about capacity to pay, willingness is about conduct, and both must be pleaded and proved continuously from the date of the agreement to the date of the decree.",
      },
      {
        case: "Saradamani Kandappan v. S. Rajalakshmi (2011)",
        holding:
          "Revisited the old assumption that time is never of the essence in a contract for immovable property, holding that steep escalation in land prices makes that presumption increasingly unrealistic — a judgment of direct relevance wherever land values have moved sharply.",
      },
    ],
    practice:
      "Two things decide these suits in Bihar: whether readiness and willingness were pleaded properly at the outset — it cannot be repaired later — and whether the suit was filed within three years of the refusal to perform. Both are settled before a word is said about the agreement itself.",
    related: "/practice/civil-lawyer-hajipur",
    relatedLabel: "Civil Litigation in Hajipur",
    tool: "/tools/limitation-checker",
    toolLabel: "Limitation Period Checker",
  },
  {
    slug: "patna-high-court",
    icon: "gavel",
    short: "Patna High Court",
    title: "Patna High Court Judgments — Search the Court that Governs Bihar",
    seoTitle: "Patna High Court Judgments Search — Free Full Text | Adv. Ram Snehi Mishra",
    seoDescription:
      "Search the full text of Patna High Court judgments and orders free — by subject, by date, by judge or by case title. The appellate court for every district court in Bihar.",
    query: "",
    court: "patna",
    intro:
      "The Patna High Court is the appellate court for every district court in Bihar, and its judgments bind them all. For any question of Bihar practice — how a provision is applied at Hajipur, Muzaffarpur or Patna — this is the court whose view actually decides the matter.",
    landmarks: [
      {
        case: "Why search this court specifically",
        holding:
          "A Supreme Court judgment states the national position; a Patna High Court judgment states how it is applied here, and often addresses local statutes — the Bihar Tenancy Act, the Bihar Land Reforms Act, the state's court-fee amendments — that no other High Court has occasion to consider.",
      },
      {
        case: "What binds whom",
        holding:
          "A judgment of the Patna High Court binds every court subordinate to it in Bihar. A judgment of another High Court, however apt, is persuasive only. A Supreme Court judgment binds everyone. It is worth knowing which of the three you are holding before you rely on it.",
      },
      {
        case: "Judgments and daily orders are different",
        holding:
          "The search covers both, but they carry different weight. A reasoned judgment decides a point; a daily order may record nothing more than an adjournment. Choose \"Judgments only\" when you are looking for authority.",
      },
    ],
    practice:
      "Start here rather than at the Supreme Court for anything procedural, anything involving a Bihar statute, and anything where you need to know what will actually happen in the district court next month.",
    related: "/case-status/vaishali",
    relatedLabel: "Vaishali (Hajipur) Case Status",
  },
];

export const topicBySlug = (slug) => topics.find((t) => t.slug === slug);
