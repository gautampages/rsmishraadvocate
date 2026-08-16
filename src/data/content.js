// ============================================================================
//  SITE CONTENT — copy for the home page and the site-wide chrome.
//
//  Page-specific content lives alongside its page instead:
//    practice.js    practice-area pages    legal.js       policy documents
//    blogPosts.js   articles               fees.js        fee schedule
//    checklists.js  downloadable guides    routes.js      URLs + page SEO
//
//  NOTE: case counts (total / won / in running) were removed site-wide.
//  Outcome tallies invite comparison and sit close to the Bar Council of
//  India's restriction on advertising results, so the figures shown now
//  describe service rather than scorekeeping.
// ============================================================================

export const advocate = {
  name: "Ram Snehi Mishra",
  title: "Senior Advocate",
  tagline: "Excellence in Every Case",
  credentials: "Best Advocate & Lawyer in Hajipur, Vaishali (Bihar)",
  heroHeadline: "Trusted Legal Advocate",
  heroSubtitle: "Excellence in Every Case",
  heroSubtext:
    "With over 28 years of experience, Advocate Ram Snehi Mishra is one of the most trusted " +
    "advocates and lawyers serving Hajipur, Vaishali and across Bihar — a leading choice for " +
    "divorce and family disputes, as well as criminal, civil and property matters, " +
    "ensuring justice and favorable outcomes for every client.",
  serving: "Serving Hajipur • Vaishali • Patna • across Bihar",
  location: "Hajipur, Vaishali, Bihar",
  yearsExperience: "28",
  clientsServed: "1000",
  clientSatisfaction: "96",
  linkedin: "https://www.linkedin.com/in/ramsnehimishra/",
};

// External profiles & directory listings (highly-rated public profiles).
// Also referenced by the LegalService "sameAs" structured data in index.html.
export const profiles = [
  { icon: "linkedin", label: "LinkedIn", value: "ramsnehimishra", url: advocate.linkedin },
  { icon: "scales", label: "LawRato Profile", value: "lawrato.com", url: "https://lawrato.com/advocate-ram-snehi-mishra" },
  { icon: "gavel", label: "PathLegal Profile", value: "pathlegal.in", url: "https://www.pathlegal.in/Advocate-Ram-Snehi-Mishra--Hajipur/L000000000589704.htm" },
  { icon: "pin", label: "Google Maps", value: "4.7★ · 105 reviews", url: "https://maps.app.goo.gl/7upM6fmTUfH5nXgB7" },
];

// ---------------------------------------------------------------------------
//  Choose Your Legal Service — the tabbed overview on the home page.
//  Each category has a fuller standalone page in src/data/practice.js.
// ---------------------------------------------------------------------------
export const services = {
  heading: "Choose Your Legal Service",
  subtext: "Explore our comprehensive legal practice areas",
  processHeading: "Our Legal Process",
  categories: [
    {
      key: "civil",
      short: "Civil",
      icon: "scales",
      title: "Civil Law",
      subtitle: "Legal Excellence",
      eyebrow: "Civil Law Practice",
      headline: "Civil Law Expertise",
      href: "/practice/civil-lawyer-hajipur",
      pageLabel: "Civil Lawyer in Hajipur",
      description:
        "Comprehensive civil litigation — title, possession, injunction, recovery and specific " +
        "performance — filed and argued before the civil courts and the District Judge at " +
        "Hajipur (Vaishali district).",
      subAreas: [
        {
          title: "Property Law",
          desc: "Expert handling of property disputes, land acquisition, and real estate legal matters",
          points: ["Land Title Verification", "Property Registration", "Boundary Disputes", "Real Estate Transactions"],
        },
        {
          title: "Contract Law",
          desc: "Professional contract drafting, review, and breach of contract litigation services",
          points: ["Contract Drafting & Review", "Breach of Contract Cases", "Commercial Agreements", "Legal Documentation"],
        },
        {
          title: "Tort Claims",
          desc: "Personal injury cases, negligence claims, and comprehensive damages recovery",
          points: ["Personal Injury Cases", "Negligence Claims", "Damages Recovery", "Compensation Cases"],
        },
        {
          title: "Civil Appeals",
          desc: "Appellate court representation with strategic legal appeals and case review",
          points: ["Appeal Filing & Strategy", "Appellate Court Advocacy", "Case Review & Analysis", "Legal Research"],
        },
      ],
      process: [
        { title: "Case Assessment", desc: "Comprehensive evaluation of your legal matter and strategic planning" },
        { title: "Legal Research", desc: "Thorough research and case law analysis for strong legal foundation" },
        { title: "Documentation", desc: "Preparation and filing of all necessary legal documents" },
        { title: "Resolution", desc: "Court representation and strategic case resolution" },
      ],
      ctaHeading: "Free Consultation",
      ctaText: "Get expert legal advice for your civil law matter",
    },
    {
      key: "criminal",
      short: "Criminal",
      icon: "shield",
      title: "Criminal Defense",
      subtitle: "Legal Protection",
      eyebrow: "Criminal Law Practice",
      headline: "Criminal Defense Expertise",
      href: "/practice/criminal-lawyer-hajipur",
      pageLabel: "Criminal Lawyer in Hajipur",
      description:
        "Rigorous, evidence-driven criminal defence across bail, trial and appellate stages — " +
        "before the Magistrates and the Sessions Court at Hajipur, and the Patna High Court.",
      subAreas: [
        {
          title: "Bail & Anticipatory Bail",
          desc: "Prompt bail and anticipatory bail applications before the appropriate courts",
          points: ["Regular Bail", "Anticipatory Bail", "Bail Cancellation Defence", "Urgent Applications"],
        },
        {
          title: "Trial Defence",
          desc: "Complete defence representation through examination, evidence and arguments",
          points: ["Charge Framing", "Witness Examination", "Evidence Analysis", "Final Arguments"],
        },
        {
          title: "Criminal Appeals",
          desc: "Appeals and revisions before Sessions Court and the High Court",
          points: ["Appeal Filing", "Revision Petitions", "Suspension of Sentence", "Case Review"],
        },
        {
          title: "Economic Offences",
          desc: "Defence in cheque-bounce, fraud and white-collar criminal matters",
          points: ["Cheque Bounce (NI Act)", "Fraud & Cheating", "Quashing Petitions", "FIR Advisory"],
        },
      ],
      process: [
        { title: "Case Assessment", desc: "Comprehensive evaluation of the charges and a strategic defence plan" },
        { title: "Legal Research", desc: "Thorough research and precedent analysis for a strong defence" },
        { title: "Documentation", desc: "Preparation and filing of applications, replies and petitions" },
        { title: "Resolution", desc: "Confident court representation and pursuit of the best outcome" },
      ],
      ctaHeading: "Free Consultation",
      ctaText: "Get expert legal advice for your criminal matter",
    },
    {
      key: "family",
      short: "Family",
      icon: "family",
      title: "Family Law",
      subtitle: "Family Matters",
      eyebrow: "Family & Divorce Law Practice",
      headline: "Divorce & Family Law Expertise",
      href: "/practice/divorce-family-lawyer-hajipur",
      pageLabel: "Divorce & Family Lawyer in Hajipur",
      description:
        "A leading choice in Hajipur and Vaishali for divorce and family disputes — offering " +
        "sensitive, discreet and strategic representation in matrimonial matters, maintenance, " +
        "alimony and child custody, always protecting your interests and those of your loved ones.",
      subAreas: [
        {
          title: "Divorce & Separation",
          desc: "Mutual-consent and contested divorce, judicial separation and settlements",
          points: ["Mutual Consent Divorce", "Contested Divorce", "Judicial Separation", "Settlement Drafting"],
        },
        {
          title: "Maintenance & Alimony",
          desc: "Claims and defence for spousal and child maintenance and alimony",
          points: ["Interim Maintenance", "Permanent Alimony", "Child Maintenance", "Enforcement"],
        },
        {
          title: "Child Custody & Guardianship",
          desc: "Custody, visitation and guardianship matters focused on the child's welfare",
          points: ["Custody Petitions", "Visitation Rights", "Guardianship", "Welfare Reports"],
        },
        {
          title: "Domestic Violence",
          desc: "Protection and relief under the Domestic Violence Act",
          points: ["Protection Orders", "Residence Orders", "Monetary Relief", "Legal Advisory"],
        },
      ],
      process: [
        { title: "Case Assessment", desc: "Confidential evaluation of your situation and the best way forward" },
        { title: "Legal Research", desc: "Analysis of applicable personal laws and precedents" },
        { title: "Documentation", desc: "Careful drafting of petitions, replies and settlement deeds" },
        { title: "Resolution", desc: "Representation aimed at a fair and amicable resolution" },
      ],
      ctaHeading: "Free Consultation",
      ctaText: "Get expert legal advice for your family matter",
    },
  ],
};

// ---------------------------------------------------------------------------
//  Hero headline stats.
//
//  Case counts (total / won / in running) were deliberately removed from the
//  whole site: outcome tallies invite comparison and sit close to the Bar
//  Council of India's restriction on advertising results. What remains speaks
//  to service, not scorekeeping.
// ---------------------------------------------------------------------------
export const heroStats = [
  { value: Number(advocate.clientSatisfaction), suffix: "%", label: "Client Satisfaction" },
  { value: Number(advocate.yearsExperience), suffix: "+", label: "Years of Experience" },
  { value: Number(advocate.clientsServed), suffix: "+", label: "Clients Served" },
];

// Practice-area strip along the bottom of the hero banner
export const heroCards = [
  { icon: "gavel", title: "Civil Law", desc: "Expert representation in civil matters" },
  { icon: "family", title: "Family Law", desc: "Divorce, custody, maintenance & more" },
  { icon: "scales", title: "Criminal Law", desc: "Strong defense and legal protection" },
  { icon: "home", title: "Property Law", desc: "Property disputes, documentation & titles" },
];

// Professional Achievements (case number derived → stays consistent with hero)
export const achievements = {
  heading: "Professional Achievements",
  subtext: "Numbers that reflect our commitment to excellence and client satisfaction",
  items: [
    {
      icon: "smile",
      value: Number(advocate.clientSatisfaction),
      suffix: "%",
      label: "Client Satisfaction",
      desc: "High client satisfaction rate with positive outcomes and professional service delivery",
    },
    {
      icon: "calendar",
      value: Number(advocate.yearsExperience),
      suffix: "+",
      label: "Years Experience",
      desc: "Nearly three decades of dedicated practice in various courts and legal forums",
    },
    {
      icon: "users",
      value: Number(advocate.clientsServed),
      suffix: "+",
      label: "Clients Served",
      desc: "Trusted by thousands of clients for legal representation and consultation services",
    },
  ],
};

// Legal Philosophy & Approach
export const philosophy = {
  heading: "Legal Philosophy & Approach",
  subtext: "Our fundamental beliefs about law, justice, and client service",
  quote:
    "Every individual deserves access to quality legal representation. The law should serve " +
    "justice and protect the rights of all, regardless of their background or circumstances.",
  author: "Advocate Ram Snehi Mishra",
  paragraphs: [
    "Our approach combines thorough legal research, strategic planning, and compassionate client " +
      "service. We understand that legal issues can be overwhelming and stressful, which is why we " +
      "prioritize clear communication and keep clients informed throughout the legal process.",
    "Our commitment extends beyond individual cases to contributing to the broader legal community " +
      "through mentorship of young lawyers and participation in legal reform initiatives.",
  ],
  approaches: [
    { icon: "search", title: "Thorough Research", desc: "Comprehensive case analysis and legal research" },
    { icon: "strategy", title: "Strategic Planning", desc: "Carefully planned legal strategies for optimal outcomes" },
    { icon: "chat", title: "Clear Communication", desc: "Transparent and regular communication with clients" },
    { icon: "heart", title: "Compassionate Service", desc: "Understanding and empathetic approach to client needs" },
  ],
};

// Why Choose Our Legal Services
export const whyChoose = {
  heading: "Why Choose Our Legal Services",
  subtext: "Proven expertise, client-focused approach, and commitment to exceptional results",
  items: [
    { icon: "trophy", title: "Proven Track Record", desc: `${advocate.yearsExperience}+ years of successful legal practice with outstanding case results and client satisfaction` },
    { icon: "target", title: "Personalized Approach", desc: "Tailored legal strategies designed specifically for your unique situation and requirements" },
    { icon: "clock", title: "24/7 Support", desc: "Round-the-clock availability for urgent legal matters and continuous client communication" },
    { icon: "book", title: "Expert Knowledge", desc: "Deep expertise across multiple legal domains with continuous professional development" },
    { icon: "chat", title: "Transparent Process", desc: "Clear communication, honest fee structure, and regular updates throughout your case" },
    { icon: "zap", title: "Quick Resolution", desc: "Efficient case handling with strategic approach to achieve faster, favorable outcomes" },
  ],
};

// Blog posts moved to src/data/blogPosts.js — each is now a page at /blog/<slug>.

// Real client reviews from the Google Business Profile
// (https://maps.app.goo.gl/7upM6fmTUfH5nXgB7). Names, ratings and wording
// are as posted on Google Maps.
export const googleReviews = {
  rating: "4.7",
  count: 105,
  url: "https://maps.app.goo.gl/7upM6fmTUfH5nXgB7",
  items: [
    {
      author: "Sandeep Vadhel",
      meta: "10 months ago",
      avatar: "/reviewers/avatar-sandeep-vadhel.png",
      quote:
        "He is highly professional, knowledgeable, and dependable. They guided me with clarity, " +
        "kept me updated at every step, and handled my case with great dedication. I truly " +
        "recommend their services to anyone seeking legal help.",
    },
    {
      author: "Piyush Kumar",
      meta: "Local Guide · 10 months ago",
      avatar: "/reviewers/avatar-piyush-kumar.png",
      quote:
        "I had an excellent experience with Ram Snehi Mishra. He is knowledgeable, professional, " +
        "and very approachable. He provided clear guidance, explained complex legal matters in " +
        "simple terms, and handled my case with great attention to detail. I highly recommend " +
        "his services to anyone seeking reliable legal advice.",
    },
    {
      author: "Kiran Makwana",
      meta: "10 months ago",
      avatar: "/reviewers/avatar-kiran-makwana.png",
      quote:
        "He is true advocate for their clients. His dedication and clear communication style " +
        "made me feel empowered throughout the legal process.",
    },
    {
      author: "Veyon Infra",
      meta: "11 months ago",
      quote:
        "We, Veyon Infra, are very satisfied with the professional and timely legal support " +
        "provided by Advocate Ram Snehi Mishra. Highly recommended for legal matters.",
    },
    {
      author: "Keshav Anna",
      meta: "6 years ago",
      avatar: "/reviewers/avatar-keshav-anna.png",
      quote:
        "The personalized legal counsel I received by Ram Snehi Mishra Advocate was amazing. " +
        "He made me feel confident in my case, and was readily available for any questions I " +
        "had. I would recommend his services time and time again.",
    },
    {
      author: "Deepak Kumar",
      meta: "6 years ago",
      quote:
        "A person of indepth knowledge and experience of family as well as criminal cases, a " +
        "good listener and communicator who understands the tactics of every move by the " +
        "opposition and an expert of winning the hearts of courtroom audiences…",
    },
  ],
};

export const contact = {
  heading: "Get in Touch",
  subtext:
    "For consultations and legal enquiries, please reach out. Every enquiry is treated with " +
    "confidentiality and prompt attention.",
  phone: "+91 91232 34065",
  // WhatsApp was removed from the website. The chamber's WhatsApp line is
  // +91 94314 49994 — restore this field and the buttons if it comes back.
  email: "info@ramsnehimishra.in",
  address: "Reliance Tower Campus, Near Pyara Bachpan School, East Anwarpur, Hajipur, Bihar 844101",
  // Must agree with the office.hours table below, the JSON-LD
  // openingHoursSpecification in index.html and the noscript block there.
  hours: "Mon – Fri: 9:00 AM – 6:00 PM · Sat: 9:00 AM – 2:00 PM",
};

// Visit Our Office section
export const office = {
  heading: "Visit Our Office",
  addressTitle: "Office Address",
  addressLines: [
    "Reliance Tower Campus",
    "Near Pyara Bachpan School",
    "East Anwarpur, Hajipur",
    "Bihar - 844101, India",
  ],
  mapQuery: "Ram Snehi Mishra (Advocate), East Anwarpur, Hajipur, Bihar 844101",
  mapProfileUrl: "https://maps.app.goo.gl/7upM6fmTUfH5nXgB7",
  hoursTitle: "Office Hours",
  hours: [
    { day: "Mon - Fri", time: "9:00 AM - 6:00 PM", status: "Open" },
    { day: "Saturday", time: "9:00 AM - 2:00 PM", status: "Open" },
    { day: "Sunday", time: "By Appointment", status: "Appointment Only" },
  ],
  areasTitle: "Areas We Serve",
  areasServed: ["Hajipur", "Vaishali", "Patna", "Muzaffarpur", "Chapra (Saran)", "Sonepur", "Patna High Court"],
};

// Frequently Asked Questions (also emitted as FAQ structured data for SEO)
export const faqs = {
  heading: "Frequently Asked Questions",
  subtext: "Common questions about legal services in Hajipur, Vaishali and Bihar",
  items: [
    {
      q: "Who is the best advocate in Hajipur, Bihar?",
      a: "Advocate Ram Snehi Mishra is a Senior Advocate with over 28 years of experience serving Hajipur, Vaishali and across Bihar, handling criminal, civil, family and property matters with a strong track record of favorable outcomes.",
    },
    {
      q: "Do you handle divorce and family dispute cases in Hajipur?",
      a: "Yes. Advocate Ram Snehi Mishra is one of the most trusted divorce and family lawyers in Hajipur and Vaishali, handling mutual-consent and contested divorce, maintenance and alimony, child custody and guardianship, and domestic-violence matters with sensitivity and confidentiality.",
    },
    {
      q: "What legal services do you provide in Hajipur and Vaishali?",
      a: "We provide comprehensive legal services including divorce and family law, criminal defence, civil litigation, and property and real estate law across Hajipur, Vaishali, Patna and Bihar.",
    },
    {
      q: "Where is your law office located in Hajipur?",
      a: "Our office is located at Reliance Tower Campus, Near Pyara Bachpan School, East Anwarpur, Hajipur, Bihar - 844101, India.",
    },
    {
      q: "What are your office hours?",
      a: "Our office is open Monday to Friday from 9:00 AM to 6:00 PM, Saturday from 9:00 AM to 2:00 PM, and Sunday by appointment.",
    },
    {
      q: "How can I book a legal consultation?",
      a: "You can book a consultation by contacting our Hajipur office directly or by filling out the enquiry form on this website. Initial case assessments are handled promptly and treated with full confidentiality.",
    },
  ],
};

// Primary navigation.
//
// `href` is a real router path. Entries of the form "/#section" scroll to a
// section of the home page and work from any page — ScrollManager handles the
// cross-page case. `section` is the element id used for scroll-spy on the
// home page only.
export const nav = [
  { label: "Home", href: "/", section: "home" },
  // Points at the standalone page rather than the home-page section: the
  // tracker is the most-searched thing on this site and needs a URL of its
  // own that can be linked to, shared and ranked.
  { label: "Case Status", href: "/case-status" },
  { label: "Case Law", href: "/case-law" },
  { label: "Services", href: "/#services", section: "services" },
  { label: "Legal Tools", href: "/tools" },
  { label: "Ask AI", href: "/ask" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact", section: "contact" },
];

// Grouped links for the footer.
export const footerNav = [
  {
    title: "Practice",
    links: [
      { label: "Divorce & Family Lawyer in Hajipur", href: "/practice/divorce-family-lawyer-hajipur" },
      { label: "Criminal Lawyer in Hajipur", href: "/practice/criminal-lawyer-hajipur" },
      { label: "Civil Lawyer in Hajipur", href: "/practice/civil-lawyer-hajipur" },
      { label: "Property & Land Lawyer in Hajipur", href: "/practice/property-lawyer-hajipur" },
    ],
  },
  {
    title: "Free Tools",
    links: [
      { label: "Stamp Duty Calculator", href: "/tools/stamp-duty-calculator" },
      { label: "Court Fee Calculator", href: "/tools/court-fee-calculator" },
      { label: "Maintenance Estimator", href: "/tools/maintenance-estimator" },
      { label: "Limitation Checker", href: "/tools/limitation-checker" },
      { label: "Cause List Lookup", href: "/tools/cause-list" },
      { label: "Case Law Search", href: "/case-law" },
      { label: "Free Checklist PDFs", href: "/checklists" },
    ],
  },
  {
    title: "Chamber",
    links: [
      { label: "Case Status Tracker", href: "/case-status" },
      { label: "Ask the AI Assistant", href: "/ask" },
      { label: "Legal Insights", href: "/blog" },
      { label: "Fees & Engagement", href: "/fees" },
      { label: "Book a Consultation", href: "/book" },
      { label: "Visit the Office", href: "/#office" },
    ],
  },
  {
    title: "Case Law",
    links: [
      { label: "Search all judgments", href: "/case-law" },
      { label: "Patna High Court", href: "/case-law/patna-high-court" },
      { label: "Maintenance — S.125 CrPC", href: "/case-law/maintenance-section-125-crpc" },
      { label: "Anticipatory bail", href: "/case-law/anticipatory-bail" },
      { label: "Partition & ancestral property", href: "/case-law/partition-and-ancestral-property" },
      { label: "Cheque bounce — S.138", href: "/case-law/cheque-bounce-section-138" },
    ],
  },
  {
    title: "Case Status in Bihar",
    links: [
      { label: "Vaishali (Hajipur) Court", href: "/case-status/vaishali" },
      { label: "Patna District Court", href: "/case-status/patna" },
      { label: "Muzaffarpur Court", href: "/case-status/muzaffarpur" },
      { label: "Samastipur Court", href: "/case-status/samastipur" },
      { label: "Saran (Chhapra) Court", href: "/case-status/saran" },
      { label: "All 38 districts", href: "/case-status" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Use", href: "/terms" },
      { label: "Disclaimer", href: "/disclaimer" },
    ],
  },
];

// AI legal assistant (chat)
export const assistant = {
  eyebrow: "AI Legal Assistant",
  heading: "Ask a Legal Question",
  subtext:
    "Get a clear, plain-language answer to any legal question — day or night, in English or Hindi. " +
    "For anything specific to your matter, Advocate Ram Snehi Mishra is a call away.",
  botName: "Legal Assistant",
  botStatus: "Online · answers in seconds",
  greeting:
    "Namaste 🙏 I can explain legal procedures, documents and general rights under Indian law in simple words. " +
    "Ask me anything — or pick a question below to begin.",
  placeholder: "Type your legal question…",
  teaser:
    "Namaste 🙏 Have a legal question? Ask our AI assistant — free, instant and in simple words.",
  dockNote: "General legal information, not legal advice.",
  disclaimer:
    "This assistant gives general legal information, not legal advice. Answers can vary with the facts of your case, " +
    "the court and the nature of the matter. Please do not share confidential details here.",
  suggestions: [
    "How do I check my Vaishali (Hajipur) court case status?",
    "How do I file for divorce by mutual consent?",
    "What is stamp duty on a land purchase in Bihar?",
    "What is anticipatory bail and who can apply?",
    "दाखिल-खारिज के लिए क्या करना होगा?",
    "What should I do if the police refuse to lodge my FIR?",
  ],
};

// AI-assisted case tracker (eCourts records)
export const caseTracker = {
  eyebrow: "AI Case Intelligence",
  heading: "Track Your Case Status",
  subtext:
    "Check any Bihar court case in seconds — Vaishali (Hajipur), Patna, Muzaffarpur or any court in India. " +
    "Enter your CNR number or search by name, and get the next hearing date, complete hearing history, " +
    "orders and a plain-language summary of where your case stands.",
  note:
    "Data is drawn from public eCourts records maintained by the judiciary. Summaries are generated automatically " +
    "and are for information only — they are not legal advice.",
  samples: [
    { label: "See a sample case", cnr: "DLND020047882015" },
    { label: "Cases handled by Adv. Ram Snehi Mishra", mode: "advocates", term: "Ram Snehi Mishra" },
  ],
  features: [
    {
      icon: "calendar",
      title: "Next hearing at a glance",
      text: "See the next listed date, the purpose of listing and how many days you have to prepare.",
    },
    {
      icon: "sparkle",
      title: "Plain-language summary",
      text: "Court records are dense. We read the full history and explain the current stage in simple words.",
    },
    {
      icon: "doc",
      title: "Orders & applications",
      text: "Every interim order, judgment and interlocutory application recorded in the case file.",
    },
    {
      icon: "shield",
      title: "Private by design",
      text: "Nothing you search is stored on this website. Records are fetched fresh from the court system.",
    },
  ],
};
