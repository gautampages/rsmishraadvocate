// ============================================================================
//  PRACTICE-AREA PAGES
//
//  Each entry becomes a real URL (/practice/<slug>) with its own title,
//  description and Service structured data. The point is search: one page
//  cannot rank for "divorce lawyer in Hajipur" and "bail lawyer in Hajipur"
//  and "property dispute lawyer Vaishali" at once — four pages can.
//
//  Copy is written per page rather than reused from the home-page tabs, so
//  the pages are not near-duplicates of each other in Google's eyes.
// ============================================================================

export const practiceAreas = [
  {
    slug: "divorce-family-lawyer-hajipur",
    icon: "family",
    short: "Divorce & Family",
    title: "Divorce & Family Lawyer in Hajipur, Vaishali",
    seoTitle: "Divorce & Family Lawyer in Hajipur, Vaishali (Bihar) | Adv. Ram Snehi Mishra",
    seoDescription:
      "Divorce, maintenance, child custody and domestic violence matters in Hajipur and Vaishali. Mutual-consent and contested divorce handled with discretion by a Senior Advocate with 28+ years of experience.",
    intro:
      "Family matters are the most sensitive work a chamber takes on. They are decided in the Family Court at " +
      "Hajipur and, on appeal, before the Patna High Court — but long before that, they are decided by how " +
      "carefully the first petition is drafted and how honestly the client is advised about what a court can " +
      "and cannot deliver.",
    overview: [
      "Advocate Ram Snehi Mishra has appeared in matrimonial and family matters across Vaishali district for " +
        "nearly three decades. The chamber handles both sides — the spouse seeking relief and the spouse " +
        "defending a petition — and treats every file as confidential from the first conversation.",
      "Where a settlement is possible, we will say so plainly. A mutual-consent divorce concluded in six to " +
        "eighteen months is almost always a better outcome than a contested petition that runs for years and " +
        "hardens both families against each other.",
    ],
    handles: [
      {
        title: "Divorce & judicial separation",
        desc: "Mutual-consent petitions under Section 13B of the Hindu Marriage Act, contested divorce on statutory grounds, judicial separation, and restitution of conjugal rights.",
        points: ["Mutual consent (both motions)", "Contested divorce petitions", "Defending a divorce petition", "Settlement & MoU drafting"],
      },
      {
        title: "Maintenance & alimony",
        desc: "Interim and permanent maintenance for a spouse or child, and defence where a claim is inflated or the income figures are disputed.",
        points: ["Section 144 BNSS / 125 CrPC claims", "Interim maintenance applications", "Permanent alimony", "Enforcement of arrears"],
      },
      {
        title: "Child custody & guardianship",
        desc: "Custody, visitation and guardianship applications argued on the welfare of the child, which is the only test a court finally applies.",
        points: ["Custody petitions", "Visitation arrangements", "Guardianship under the GWA", "Variation of existing orders"],
      },
      {
        title: "Domestic violence & protection",
        desc: "Relief under the Protection of Women from Domestic Violence Act, 2005, and defence where proceedings have been used tactically.",
        points: ["Protection orders", "Residence orders", "Monetary relief", "Section 498A advisory"],
      },
    ],
    localNote:
      "Family matters from Hajipur, Mahnar, Lalganj, Bidupur, Raghopur and the surrounding blocks of Vaishali " +
      "district are ordinarily filed before the Family Court at Hajipur.",
    faqs: [
      {
        q: "How long does a mutual-consent divorce take in Hajipur?",
        a: "The statute requires a six-month gap between the first and second motion, which a court may waive in a fit case. In practice a straightforward mutual-consent petition before the Family Court at Hajipur concludes in roughly six to twelve months, provided both parties attend and the terms of settlement are agreed at the outset.",
      },
      {
        q: "Can maintenance be claimed while a divorce case is still running?",
        a: "Yes. Interim maintenance can be sought during the proceedings, and a separate claim under Section 144 of the BNSS (formerly Section 125 CrPC) can be filed independently of the divorce. The two are not alternatives and are frequently pursued together.",
      },
      {
        q: "Does the mother automatically get custody of a child?",
        a: "No. There is no automatic rule. Courts decide custody on the welfare of the child, taking into account the child's age, schooling, stability and — for an older child — the child's own preference. Very young children are often, but not invariably, placed with the mother.",
      },
      {
        q: "Will my family matter stay confidential?",
        a: "Family Court proceedings are not open to the public in the way an ordinary trial is, and this chamber does not discuss any client's matter outside it. Please still avoid sharing details through the website's forms or AI assistant, and bring them to the consultation instead.",
      },
    ],
  },

  {
    slug: "criminal-lawyer-hajipur",
    icon: "shield",
    short: "Criminal Defence",
    title: "Criminal Lawyer in Hajipur, Vaishali",
    seoTitle: "Criminal Lawyer & Bail Advocate in Hajipur, Vaishali (Bihar) | Adv. Ram Snehi Mishra",
    seoDescription:
      "Bail and anticipatory bail, trial defence, criminal appeals, cheque bounce and quashing petitions before the courts at Hajipur and the Patna High Court. 28+ years of criminal practice.",
    intro:
      "In a criminal matter the first forty-eight hours usually matter more than the next four years. Whether " +
      "an anticipatory bail application is moved before or after arrest, and how the first bail petition is " +
      "framed, shapes everything that follows.",
    overview: [
      "The chamber appears in criminal matters before the Judicial Magistrates and the Sessions Court at " +
        "Hajipur, and in bail applications, appeals and quashing petitions before the Patna High Court.",
      "Defence work here is evidence-driven rather than rhetorical: reading the case diary properly, testing " +
        "the investigation on its own record, and preserving every point for appeal. Clients are told the " +
        "realistic range of outcomes at the outset, not the most optimistic one.",
    ],
    handles: [
      {
        title: "Bail & anticipatory bail",
        desc: "Regular bail, anticipatory bail before arrest, and urgent applications where custody is imminent.",
        points: ["Anticipatory bail (Sec. 482 BNSS)", "Regular bail applications", "Bail before the Sessions Court & High Court", "Opposing bail cancellation"],
      },
      {
        title: "Trial defence",
        desc: "Full representation from charge framing to final arguments, including cross-examination of prosecution witnesses.",
        points: ["Discharge & charge framing", "Cross-examination", "Defence evidence", "Final arguments"],
      },
      {
        title: "Appeals, revisions & quashing",
        desc: "Challenging conviction or sentence, revision against interlocutory orders, and quashing of an FIR or proceedings.",
        points: ["Criminal appeals", "Revision petitions", "Suspension of sentence", "FIR quashing (Sec. 528 BNSS)"],
      },
      {
        title: "Cheque bounce & economic offences",
        desc: "Complaints and defence under Section 138 of the Negotiable Instruments Act, and fraud and cheating matters.",
        points: ["Section 138 NI Act complaints", "Defending a cheque bounce case", "Cheating & criminal breach of trust", "Pre-FIR advisory"],
      },
    ],
    localNote:
      "Matters arising from police stations across Vaishali district are ordinarily tried before the courts at " +
      "Hajipur; bail thereafter lies to the Sessions Court at Hajipur and then to the Patna High Court.",
    faqs: [
      {
        q: "What is anticipatory bail and who can apply for it?",
        a: "Anticipatory bail is an order directing that if you are arrested in a specified case, you be released on bail. Anyone with a reasonable apprehension of arrest in a non-bailable offence can apply — you do not need to wait for an FIR to be formally lodged against you, only to have grounds to fear arrest. It is applied for before the Sessions Court or the High Court.",
      },
      {
        q: "What should I do if the police refuse to lodge my FIR?",
        a: "First send the complaint in writing to the Superintendent of Police, who is obliged to act on it. If that fails, an application can be moved before the Magistrate directing registration and investigation. Keep proof of dispatch of every complaint — it is often the decisive document.",
      },
      {
        q: "How quickly can bail be obtained?",
        a: "It depends on the offence, the stage and the court. An anticipatory bail application is usually listed within days. For a regular bail application after arrest, the Magistrate or Sessions Court will ordinarily hear it promptly, though serious offences take longer and may need to be carried to the High Court.",
      },
      {
        q: "Is a cheque bounce case criminal or civil?",
        a: "A complaint under Section 138 of the Negotiable Instruments Act is a criminal complaint, but it is driven by strict timelines: a demand notice within 30 days of the bank's return memo, 15 days for the drawer to pay, and a complaint within the following 30 days. Missing any of these can end the case before it starts.",
      },
    ],
  },

  {
    slug: "civil-lawyer-hajipur",
    icon: "scales",
    short: "Civil Litigation",
    title: "Civil Lawyer in Hajipur, Vaishali",
    seoTitle: "Civil Lawyer & Litigation Advocate in Hajipur, Vaishali (Bihar) | Adv. Ram Snehi Mishra",
    seoDescription:
      "Civil suits, injunctions, contract disputes, recovery matters, tort claims and civil appeals before the courts at Hajipur and Vaishali. Senior Advocate with 28+ years of civil practice.",
    intro:
      "Civil litigation is won on documents and on limitation. A suit filed a month late, or pleaded without " +
      "the document that proves the claim, cannot be rescued by argument later.",
    overview: [
      "The chamber conducts civil suits, injunction applications, recovery proceedings and appeals before the " +
        "Civil Courts at Hajipur, with appellate work before the District Judge and the Patna High Court.",
      "Every civil brief begins with the same two questions: what does the paperwork actually establish, and " +
        "is the claim within time? Where a claim is weak on either, the client hears it before money is spent " +
        "on a suit.",
    ],
    handles: [
      {
        title: "Suits & injunctions",
        desc: "Declaration, permanent and temporary injunctions, specific performance and possession suits.",
        points: ["Temporary injunction (Order 39)", "Suit for declaration", "Specific performance", "Suit for possession"],
      },
      {
        title: "Contract & commercial disputes",
        desc: "Drafting, review and enforcement of agreements, and litigation on breach.",
        points: ["Breach of contract suits", "Agreement drafting & vetting", "Commercial agreements", "Legal notices"],
      },
      {
        title: "Recovery & money claims",
        desc: "Recovery of money due under an agreement, loan or supply, including summary suits.",
        points: ["Recovery suits", "Summary suits (Order 37)", "Execution proceedings", "Attachment & realisation"],
      },
      {
        title: "Civil appeals & revisions",
        desc: "First and second appeals, revisions, and review of decrees and orders.",
        points: ["First appeal", "Second appeal", "Civil revision", "Review applications"],
      },
    ],
    localNote:
      "Civil suits from Vaishali district are ordinarily instituted before the Civil Courts at Hajipur, with " +
      "appeals lying to the District Judge, Vaishali, and thereafter to the Patna High Court.",
    faqs: [
      {
        q: "How long do I have to file a civil suit?",
        a: "It depends entirely on the type of claim. A suit on a written contract or for recovery of money is generally within three years, a suit for possession of immovable property within twelve years, and an appeal within 30 to 90 days depending on the forum. Our limitation checker gives an indicative period, but confirm it before you rely on it.",
      },
      {
        q: "What is the court fee on a civil suit in Bihar?",
        a: "Court fee in Bihar is ad valorem — it rises with the value of the suit, subject to a statutory maximum. Our court fee calculator gives an indicative figure from the value you enter; the exact fee is settled with reference to the Court Fees Act as amended for Bihar and the nature of the relief claimed.",
      },
      {
        q: "Can I get a stay to stop the other side acting while the case runs?",
        a: "Yes, that is what a temporary injunction under Order 39 of the Civil Procedure Code does. You must show a prima facie case, that the balance of convenience favours you, and that you would suffer irreparable injury without it. Applications are usually moved along with the plaint.",
      },
    ],
  },

  {
    slug: "property-lawyer-hajipur",
    icon: "home",
    short: "Property & Land",
    title: "Property & Land Lawyer in Hajipur, Vaishali",
    seoTitle: "Property & Land Dispute Lawyer in Hajipur, Vaishali (Bihar) | Adv. Ram Snehi Mishra",
    seoDescription:
      "Land title verification, partition of ancestral and HUF property, mutation and boundary disputes, sale deed drafting and registration across Hajipur, Vaishali and Bihar.",
    intro:
      "In Vaishali, as across rural Bihar, land is rarely just an asset. Most disputes that reach court began " +
      "as an oral partition nobody wrote down, or a mutation nobody checked — and by the time they are " +
      "litigated, the land is unusable to everyone.",
    overview: [
      "The chamber handles title verification, partition, mutation and boundary disputes, and the drafting and " +
        "registration of sale deeds, gift deeds and family settlements.",
      "A large part of this work is preventive. A title checked properly before purchase, a partition recorded " +
        "and registered, or a family settlement drawn up while relations are still workable, saves years of " +
        "litigation that no judgment can fully undo.",
    ],
    handles: [
      {
        title: "Title verification & due diligence",
        desc: "Searching the chain of title before a purchase, and reporting on encumbrances and defects.",
        points: ["Chain of title search", "Encumbrance verification", "Jamabandi & khatiyan checks", "Pre-purchase opinion"],
      },
      {
        title: "Partition & ancestral property",
        desc: "Partition of joint and Hindu Undivided Family property, and family settlements that avoid litigation.",
        points: ["Partition suits", "HUF & coparcenary rights", "Family settlement deeds", "Oral partition disputes"],
      },
      {
        title: "Mutation & revenue matters",
        desc: "Mutation (dakhil kharij) applications, objections and appeals before the revenue authorities.",
        points: ["Mutation applications", "Objections & appeals", "Correction of records", "Revenue court matters"],
      },
      {
        title: "Deeds, registration & disputes",
        desc: "Drafting and registration of sale, gift and lease deeds, and litigation on boundary and possession.",
        points: ["Sale & gift deed drafting", "Registration assistance", "Boundary disputes", "Cancellation of deeds"],
      },
    ],
    localNote:
      "Land and revenue matters in Vaishali district involve the Registry Office at Hajipur, the Circle Office " +
      "of the relevant block, and the Civil Courts at Hajipur for title and partition suits.",
    faqs: [
      {
        q: "What documents should I check before buying land in Bihar?",
        a: "At minimum: the chain of registered sale deeds for the last 30 years, the current jamabandi and khatiyan entries, the mutation record in the seller's name, an up-to-date rent receipt, an encumbrance position, and the land use and boundary position on the ground. Our property purchase checklist sets these out in order.",
      },
      {
        q: "What is stamp duty on a sale deed in Bihar?",
        a: "Bihar levies stamp duty at 6% with a registration fee of 2%, adjusted by the gender of the parties — 5.7% + 1.9% on a male-to-female transfer and 6.3% + 2.1% on a female-to-male transfer. It is charged on the consideration or the Minimum Value Register rate, whichever is higher. Our stamp duty calculator estimates it.",
      },
      {
        q: "My name is not in the mutation record even though I bought the land. What do I do?",
        a: "Registration and mutation are separate steps. A registered sale deed transfers title, but until mutation (dakhil kharij) is done at the Circle Office the revenue record still shows the previous holder. File a mutation application with the deed and rent receipts; if it is rejected or an objection is filed, the matter goes on appeal before the revenue authorities.",
      },
      {
        q: "Can ancestral property be sold without the consent of all coparceners?",
        a: "Not safely. In a Hindu Undivided Family every coparcener has a right by birth, and a sale of joint property without consent is open to challenge by the others. The clean route is a documented and registered partition first, so each share is defined before any transfer.",
      },
    ],
  },

  {
    slug: "patna-high-court-advocate",
    icon: "scales",
    short: "Patna High Court",
    title: "Advocate for Patna High Court Matters",
    seoTitle: "Patna High Court Advocate — Appeals, Bail & Writs",
    seoDescription:
      "Appeals, revisions, anticipatory bail and writ petitions before the Patna High Court — for matters arising from Hajipur, Vaishali and Patna. Advocate Ram Snehi Mishra, 28+ years of practice.",
    intro:
      "Most matters end in the district court. The ones that do not — an appeal against a decree, a revision, " +
      "anticipatory bail after the sessions court, a writ against a government order — go to the Patna High " +
      "Court, and they are won or lost on the record built below and the ground chosen for challenge.",
    overview: [
      "The chamber's High Court work grows out of its district practice: appeals and revisions carried from the " +
        "courts at Hajipur, anticipatory bail applications after the Sessions Court, and writ petitions against " +
        "revenue and administrative orders affecting land in Vaishali district. Clients from Patna itself are " +
        "taken for High Court matters.",
      "An appeal is not a second trial. What the High Court examines is the record — the pleadings, the " +
        "evidence and the judgment under challenge — which is why the honest first step is a reading of that " +
        "record and a plain answer on whether a challenge is worth your money.",
    ],
    handles: [
      {
        title: "Civil appeals & revisions",
        desc: "First and second appeals against decrees of the courts at Hajipur and other district courts, and civil revisions where a jurisdictional error needs correcting.",
        points: ["First appeals against decrees", "Second appeals on substantial questions of law", "Civil revisions", "Stay of execution pending appeal"],
      },
      {
        title: "Criminal appeals & bail",
        desc: "Appeals against conviction, criminal revisions, and anticipatory or regular bail before the High Court after the sessions court has refused it.",
        points: ["Anticipatory bail (Section 482 BNSS)", "Regular bail after rejection below", "Appeals against conviction", "Quashing petitions"],
      },
      {
        title: "Writ petitions",
        desc: "Petitions under Article 226 against government and revenue orders — mutation and demarcation disputes, service matters, and administrative action affecting rights.",
        points: ["Writs against revenue orders", "Land and mutation-linked writs", "Service matters", "Mandamus for inaction"],
      },
      {
        title: "From the district court to the High Court",
        desc: "The connected work an appeal actually needs: certified copies in time, limitation watched, and the record from the Hajipur file prepared for the appellate court.",
        points: ["Certified copies & limitation", "Preparation of the appeal record", "Engagement alongside existing counsel", "Advice on whether to appeal at all"],
      },
    ],
    localNote:
      "Appeals and writs arising from matters before the courts at Hajipur (Vaishali district) are heard by " +
      "the Patna High Court. The chamber appears there for its district clients and takes High Court " +
      "matters from Patna directly.",
    faqs: [
      {
        q: "Do you take cases filed in Patna?",
        a: "Yes, for High Court work — appeals, revisions, bail applications and writ petitions before the Patna High Court. Trial-level work is concentrated at the courts at Hajipur, the chamber's home court.",
      },
      {
        q: "How long do I have to appeal a decree of the Hajipur court?",
        a: "Limitation for an appeal to the High Court is generally ninety days from the decree, and the time spent obtaining the certified copy is excluded. Apply for the certified copy immediately — the copy application date is what protects you. The limitation checker on this site shows the periods; confirm your own dates with the chamber.",
      },
      {
        q: "Can I go straight to the High Court for anticipatory bail?",
        a: "The usual course is to move the Sessions Court first, and approach the High Court if it is refused. Moving the High Court directly is possible in an appropriate case, but the choice of forum is tactical and depends on the matter — take advice before filing, not after.",
      },
      {
        q: "Will my case be argued by you personally at the High Court?",
        a: "Yes. The same advocate who knows the file from the district side argues it at the High Court, engaging additional counsel only where a matter genuinely needs it and with your agreement.",
      },
    ],
  },
];

export const practiceBySlug = (slug) => practiceAreas.find((p) => p.slug === slug);
