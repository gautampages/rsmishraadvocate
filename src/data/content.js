// ============================================================================
//  SITE CONTENT — single source of truth for the whole site.
//
//  CASE NUMBERS: edit only the `cases` object inside each services.category.
//  Every total shown elsewhere (hero stats, case breakdown, achievements)
//  is COMPUTED from those numbers, so the figures stay consistent everywhere.
//
//  Fields marked TODO still need real values (blog post dates).
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
//  Choose Your Legal Service — tabbed, detailed services.
//  The `cases` object here is the SINGLE SOURCE for all case counts.
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
      description:
        "Comprehensive civil litigation and legal representation with strategic approach to " +
        "property disputes, contracts, and civil matters.",
      cases: { total: 90, running: 50, won: 30 },
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
      description:
        "Rigorous, evidence-driven criminal defence across bail, trial and appellate stages — " +
        "protecting your rights at every step of the process.",
      cases: { total: 150, running: 78, won: 70 },
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
      description:
        "A leading choice in Hajipur and Vaishali for divorce and family disputes — offering " +
        "sensitive, discreet and strategic representation in matrimonial matters, maintenance, " +
        "alimony and child custody, always protecting your interests and those of your loved ones.",
      cases: { total: 65, running: 25, won: 32 },
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
//  DERIVED case totals — computed from services.categories[].cases.
//  Do not hand-edit; change the per-service numbers above instead.
// ---------------------------------------------------------------------------
const sumCases = (key) => services.categories.reduce((acc, c) => acc + c.cases[key], 0);

export const caseTotals = {
  total: sumCases("total"),
  running: sumCases("running"),
  won: sumCases("won"),
};

// Hero headline stats (derived)
export const heroStats = [
  { value: caseTotals.total, label: "Total Cases" },
  { value: caseTotals.won, label: "Cases Won" },
  { value: caseTotals.running, label: "Cases In Running" },
];

// Case distribution shown in the hero (derived, ordered by size)
export const caseBreakdown = services.categories
  .map((c) => ({ label: c.short, value: c.cases.total }))
  .sort((a, b) => b.value - a.value);

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
      icon: "trophy",
      value: caseTotals.total,
      suffix: "+",
      label: "Cases Handled",
      desc: "Successfully handled cases across various areas of law with favorable outcomes",
    },
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

// Blog / Insights — real posts shared by the advocate on LinkedIn.
export const blog = {
  heading: "Legal Insights & Updates",
  subtext: "Reflections on family law, property disputes and justice — shared on LinkedIn.",
  linkedinUrl: "https://www.linkedin.com/in/ramsnehimishra/",
  posts: [
    {
      tag: "Family Law",
      title: "When Law Enters a Family, Something Has Already Broken",
      excerpt:
        "Family disputes are never just about law — they are about emotions, expectations and unspoken pain. Why mediation often protects families better than litigation.",
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
    },
    {
      tag: "Property Law",
      title: "HUF & Ancestral Property: When Legacy Turns Into Litigation",
      excerpt:
        "Ancestral property under a Hindu Undivided Family often turns legacy into litigation. How clear partition and family settlements protect both land and relationships.",
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
    },
  ],
};

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
  whatsapp: "+91 94314 49994",
  email: "info@ramsnehimishra.in",
  address: "Reliance Tower Campus, Near Pyara Bachpan School, East Anwarpur, Hajipur, Bihar 844101",
  hours: "Mon – Sat: 9:00 AM – 6:00 PM",
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
  areasServed: ["Hajipur", "Vaishali", "Patna", "Muzaffarpur", "Sonepur", "Patna High Court"],
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

export const nav = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];
