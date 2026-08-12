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
    "advocates and lawyers serving Hajipur, Vaishali and across Bihar — offering expert legal " +
    "services in criminal, civil, family, property and corporate law, ensuring justice and " +
    "favorable outcomes for every client.",
  serving: "Serving Hajipur • Vaishali • Patna • across Bihar",
  location: "Hajipur, Vaishali, Bihar",
  yearsExperience: "28",
  clientsServed: "1000",
  clientSatisfaction: "96",
};

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
      eyebrow: "Family Law Practice",
      headline: "Family Law Expertise",
      description:
        "Sensitive, discreet representation in matrimonial and family disputes, focused on " +
        "protecting your interests and those of your loved ones.",
      cases: { total: 40, running: 25, won: 12 },
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
    {
      key: "corporate",
      short: "Corporate",
      icon: "briefcase",
      title: "Corporate Law",
      subtitle: "Business Solutions",
      eyebrow: "Corporate Law Practice",
      headline: "Corporate Law Expertise",
      description:
        "Practical legal solutions for businesses — from formation and compliance to commercial " +
        "contracts and dispute resolution.",
      cases: { total: 20, running: 12, won: 8 },
      subAreas: [
        {
          title: "Company Formation & Compliance",
          desc: "Incorporation, licensing and ongoing statutory compliance",
          points: ["Company Incorporation", "Licensing & Registration", "Statutory Compliance", "Corporate Advisory"],
        },
        {
          title: "Commercial Contracts",
          desc: "Drafting and vetting of business agreements and commercial documents",
          points: ["Vendor Agreements", "Service Contracts", "MoUs & NDAs", "Contract Review"],
        },
        {
          title: "Dispute Resolution",
          desc: "Commercial litigation, arbitration and recovery of dues",
          points: ["Commercial Litigation", "Arbitration", "Recovery Suits", "Debt Recovery"],
        },
        {
          title: "Regulatory Advisory",
          desc: "Guidance on regulatory, labour and business-law obligations",
          points: ["Regulatory Compliance", "Labour Law Advisory", "Notices & Replies", "Risk Assessment"],
        },
      ],
      process: [
        { title: "Case Assessment", desc: "Evaluation of your commercial objectives and legal exposure" },
        { title: "Legal Research", desc: "Analysis of applicable corporate and commercial law" },
        { title: "Documentation", desc: "Drafting of agreements, filings and compliance documents" },
        { title: "Resolution", desc: "Representation and advisory to protect your business interests" },
      ],
      ctaHeading: "Free Consultation",
      ctaText: "Get expert legal advice for your business matter",
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

// Floating showcase cards in the hero
export const heroCards = [
  { icon: "scales", title: "Civil Law", desc: "Expert representation" },
  { icon: "shield", title: "Criminal Law", desc: "Strong defense" },
  { icon: "home", title: "Property Law", desc: "Secure transactions" },
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

// Blog / Insights
export const blog = {
  heading: "Legal Insights",
  subtext: "Articles and updates on law, rights and legal developments",
  posts: [
    {
      tag: "Criminal Law",
      title: "Understanding Bail: Your Rights and the Process",
      excerpt: "A clear guide to how bail works, the types of bail, and what to expect when applying.",
      date: "TODO — date",
    },
    {
      tag: "Property Law",
      title: "Verifying Property Title Before You Buy",
      excerpt: "Essential due-diligence steps every buyer should take to avoid disputes later.",
      date: "TODO — date",
    },
    {
      tag: "Family Law",
      title: "Maintenance & Custody: What the Law Provides",
      excerpt: "An overview of rights and obligations in matrimonial and custody matters.",
      date: "TODO — date",
    },
  ],
};

export const testimonials = [
  {
    quote:
      "Advocate Mishra handled my property dispute with remarkable clarity and patience. " +
      "He explained every step and secured a favourable outcome.",
    author: "R. Sharma",
    role: "Property Client",
  },
  {
    quote:
      "Professional, honest and always available. I felt confident throughout my case knowing " +
      "I had the right advocate by my side.",
    author: "S. Verma",
    role: "Civil Matter",
  },
  {
    quote:
      "His courtroom preparation is exceptional. He fought my case diligently and I am grateful " +
      "for his dedication and integrity.",
    author: "A. Singh",
    role: "Criminal Appeal",
  },
];

export const contact = {
  heading: "Get in Touch",
  subtext:
    "For consultations and legal enquiries, please reach out. Every enquiry is treated with " +
    "confidentiality and prompt attention.",
  phone: "+91 92845 93714",
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
  mapQuery: "Reliance Tower Campus, East Anwarpur, Hajipur, Bihar 844101",
  hoursTitle: "Office Hours",
  hours: [
    { day: "Mon - Fri", time: "9:00 AM - 6:00 PM", status: "Open" },
    { day: "Saturday", time: "9:00 AM - 2:00 PM", status: "Open" },
    { day: "Sunday", time: "By Appointment", status: "Appointment Only" },
  ],
  areasTitle: "Areas We Serve",
  areasServed: ["Hajipur", "Vaishali", "Patna", "Muzaffarpur", "Sonepur", "Bihar High Court, Patna"],
};

// Frequently Asked Questions (also emitted as FAQ structured data for SEO)
export const faqs = {
  heading: "Frequently Asked Questions",
  subtext: "Common questions about legal services in Hajipur, Vaishali and Bihar",
  items: [
    {
      q: "Who is the best advocate in Hajipur, Bihar?",
      a: "Advocate Ram Snehi Mishra is a Senior Advocate with over 28 years of experience serving Hajipur, Vaishali and across Bihar, handling criminal, civil, family, property and corporate matters with a strong track record of favorable outcomes.",
    },
    {
      q: "What legal services do you provide in Hajipur and Vaishali?",
      a: "We provide comprehensive legal services including criminal defence, civil litigation, property and real estate law, family and matrimonial law, and corporate & commercial law across Hajipur, Vaishali, Patna and Bihar.",
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
