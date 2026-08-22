// ============================================================================
//  HAJIPUR CIVIL COURT — the guide page for the chamber's home court.
//
//  Why this page exists: "hajipur civil court" and "vaishali district court"
//  are navigational queries with real volume, and nothing on the site owned
//  them — the advocate's LinkedIn profile ranked for them instead. This page
//  is the hub of that cluster and links out to the cause-list tool, the
//  Vaishali case-status page and the practice pages.
//
//  Accuracy rule: only stable, verifiable facts are stated. Court timings,
//  judge strengths and hall numbers change and are deliberately NOT claimed —
//  the page points at the official channels for anything that moves.
// ============================================================================

export const courtGuide = {
  path: "/hajipur-civil-court",
  eyebrow: "Court Guide",
  title: "Hajipur Civil Court (Vaishali District Court)",
  seoTitle: "Hajipur Civil Court — Vaishali District Court Guide",
  seoDescription:
    "A practical guide to the Hajipur civil court complex — the District & Sessions Court, Family Court and civil courts of Vaishali district: which cases are filed here, how to check the cause list and your case status, and when a matter goes to the Patna High Court.",
  intro:
    "The district judiciary of Vaishali sits at Hajipur — not at Vaishali village. The District & Sessions " +
    "Court, the Family Court, the civil courts and the criminal courts of the district all work from the " +
    "court complex at Hajipur, and this page explains what is decided where.",

  sections: [
    {
      heading: "What sits in the Hajipur court complex",
      paragraphs: [
        "The complex houses the District & Sessions Judge — the head of the district judiciary — together with the additional district judges, the Family Court, the civil courts (munsif and sub-judge courts) and the criminal courts of the Chief Judicial Magistrate and the judicial magistrates.",
        "Broadly: civil suits about land, title, possession, partition, contracts and injunctions are filed before the civil courts; matrimonial matters — divorce, maintenance, custody — go to the Family Court; criminal matters begin before the magistrates, and sessions cases — the serious offences — are tried by the Sessions Court. Appeals within the district lie from the munsif courts upward, and beyond the district to the Patna High Court.",
      ],
    },
    {
      heading: "Which cases are filed at Hajipur",
      paragraphs: [
        "Matters arising in Vaishali district — including Hajipur town and the Mahnar, Lalganj, Bidupur, Raghopur and Mahua blocks — are ordinarily filed before the courts at Hajipur. In court records the district is \"Vaishali\", which is what you select when searching case status, even though the court itself sits at Hajipur.",
        "Note the distinction people most often trip on: the court establishment is recorded under the district name. A search for a \"Hajipur court\" case is a search under Vaishali district.",
      ],
    },
    {
      heading: "Checking the cause list and your case status",
      paragraphs: [
        "The daily cause list — which cases are listed before which court today — is published through the judiciary's official eCourts channels; the cause-list lookup on this site explains how to find your case on it.",
        "Your case's stage, next hearing date, full hearing history and orders can be checked free with the case-status tracker on this site: search by CNR number, party name or advocate name under Vaishali district.",
      ],
    },
    {
      heading: "When a matter goes to the Patna High Court",
      paragraphs: [
        "Appeals against decrees and convictions, civil and criminal revisions, anticipatory bail after the Sessions Court, and writ petitions against government or revenue orders go from Hajipur to the Patna High Court. Limitation for an appeal runs from the decree, with the time spent obtaining the certified copy excluded — apply for the copy immediately after judgment.",
      ],
    },
    {
      heading: "The chamber",
      paragraphs: [
        "The chamber of Advocate Ram Snehi Mishra is at Reliance Tower Campus, Near Pyara Bachpan School, East Anwarpur, Hajipur — minutes from the court complex. It has appeared before the courts at Hajipur for 28+ years across civil, criminal, family and property matters, with appeals and writs at the Patna High Court.",
      ],
    },
  ],

  faqs: [
    {
      q: "Where is the Vaishali district court?",
      a: "At Hajipur, the district headquarters of Vaishali. The District & Sessions Court, the Family Court, the civil courts and the magistrates' courts all sit in the court complex at Hajipur — there is no court at Vaishali village.",
    },
    {
      q: "How do I check my Hajipur court case status?",
      a: "Use the free case-status tracker on this site: enter your 16-character CNR number, or search by party name or advocate name under Vaishali district. It returns the current stage, the next hearing date, the hearing history and the orders on record, live from public eCourts records.",
    },
    {
      q: "Which cases go to the Family Court at Hajipur?",
      a: "Matrimonial and family matters from Vaishali district — divorce petitions including mutual consent, maintenance claims, child custody and guardianship. Domestic-violence proceedings and criminal matters connected to a matrimonial dispute begin before the magistrates.",
    },
    {
      q: "What are the Hajipur civil court timings and holidays?",
      a: "Court working hours and the holiday calendar are set by the judiciary and change year to year, so this page deliberately does not state them. Check the daily cause list or the district court's official website for the current calendar, or call the chamber and ask.",
    },
    {
      q: "When does a Hajipur case go to the Patna High Court?",
      a: "On appeal or revision against a decree or conviction, for anticipatory or regular bail after the Sessions Court has refused it, and by writ petition against government or revenue orders. The trial itself stays at Hajipur; the High Court examines the record built there.",
    },
  ],

  // Onward links rendered as link cards at the foot of the guide.
  links: [
    { to: "/case-status/vaishali", label: "Vaishali (Hajipur) case status", note: "Check by CNR or name", icon: "clock" },
    { to: "/tools/cause-list", label: "Cause list lookup", note: "Find your case on the daily board", icon: "calendar" },
    { to: "/tools/court-fee-calculator", label: "Bihar court fee calculator", note: "Ad valorem fee on a civil suit", icon: "scales" },
    { to: "/tools/ipc-to-bns-converter", label: "IPC → BNS converter", note: "Old section numbers to the new codes", icon: "refresh" },
    { to: "/practice/patna-high-court-advocate", label: "Patna High Court matters", note: "Appeals, bail & writs", icon: "book" },
  ],
};
