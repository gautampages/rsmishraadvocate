// ============================================================================
//  DOCUMENT CHECKLISTS
//
//  Each checklist is a real page at /checklists/<slug> AND a downloadable PDF
//  in public/checklists/. The two must always say the same thing, so the
//  groups below are transcribed from the PDFs rather than written separately.
//  If you revise a PDF, revise the matching entry here in the same commit.
//
//  Note there is no "essential" flag on any item. The source documents are
//  explicit that they are "a practical document-gathering checklist rather
//  than a statement that every item is legally required", and marking items
//  essential would contradict that.
// ============================================================================

// Repeated verbatim at the foot of every PDF, so it belongs on every page too.
export const BEFORE_CONSULTATION = {
  title: "Before your consultation",
  items: [
    "Bring originals where available and keep copies/scans for your records.",
    "Arrange documents in date order and keep important notices/orders together.",
    "Do not share Aadhaar, PAN, bank details, OTPs or passwords through an unsecured website or chat.",
    "Write down a short timeline of important events, with dates and names of people/organisations involved.",
  ],
};

export const CHECKLIST_DISCLAIMER =
  "This checklist is for general informational purposes only and is not legal advice. Documents and " +
  "requirements can vary depending on the facts, applicable law, court or authority. Do not submit " +
  "documents solely because they appear on this checklist; confirm what is required for your matter " +
  "with the relevant authority or a qualified advocate.";

export const CHECKLIST_CHECKED = "15 August 2026";

export const checklists = [
  {
    slug: "property-purchase-bihar",
    icon: "home",
    title: "Land / Property Purchase in Bihar — Due-Diligence Checklist",
    short: "Land / Property Purchase",
    tagline: "Verify before you pay, not after",
    pdf: "/checklists/land-purchase-checklist-bihar.pdf",
    pages: 2,
    seoTitle: "Land Purchase Due-Diligence Checklist for Bihar (Free PDF) | Adv. Ram Snehi Mishra",
    seoDescription:
      "Free downloadable checklist for buying land or property in Bihar — seller and ownership, jamabandi and mutation records, encumbrance checks, physical verification and RERA projects.",
    intro:
      "Use this as a preliminary document-gathering checklist before purchasing land or property in Bihar. " +
      "It is not a substitute for title due diligence by a qualified professional.",
    groups: [
      {
        title: "Seller and ownership",
        items: [
          "Seller's identity and authority to sell.",
          "Current title/registered deed available with the seller.",
          "Previous chain documents available for review.",
          "If inherited: relevant succession/inheritance documents, where applicable.",
          "If represented by another person: authority/POA documents, where applicable.",
        ],
      },
      {
        title: "Bihar revenue records",
        items: [
          "Jamabandi/revenue record available for the property.",
          "Mutation/dakhil-kharij records, where applicable.",
          "Recent rent/revenue receipt, where applicable.",
          "Khata, khesra/plot, mouza and area details.",
          "Any survey, measurement or demarcation record.",
        ],
      },
      {
        title: "Registration and encumbrance checks",
        items: [
          "Review the relevant registered documents and registration details.",
          "Check for known mortgages, charges, litigation, attachments or other claims.",
          "Verify that names, area, boundaries and property identifiers are consistent across records.",
        ],
      },
      {
        title: "Physical verification",
        items: [
          "Visit and identify the property on the ground.",
          "Compare boundaries and area with available records.",
          "Check possession and whether any third party is occupying or claiming the property.",
          "Take dated photographs for your records.",
        ],
      },
      {
        title: "If buying a RERA-covered project",
        items: [
          "Check the project's RERA-related information and applicable buyer documents.",
          "Review the agreement for sale and allotment documents.",
          "Check the project's approved/available documents and status before committing funds.",
        ],
      },
      {
        title: "Before paying or signing",
        items: [
          "Do not rely only on a broker's verbal representation.",
          "Keep copies of all documents reviewed.",
          "Have the transaction documents reviewed by an advocate before signing.",
          "Confirm the exact property description and consideration/payment terms in the document.",
        ],
      },
    ],
    sources: [
      "Bihar Department of Revenue and Land Reforms — official downloads and land-record resources.",
      "Bihar RERA — official buyer/project document resources.",
    ],
    related: "/practice/property-lawyer-hajipur",
  },

  {
    slug: "property-dispute",
    icon: "scales",
    title: "Property Dispute — Document Checklist",
    short: "Property Dispute",
    tagline: "Organise the file before the first hearing",
    pdf: "/checklists/property-dispute-checklist.pdf",
    pages: 2,
    seoTitle: "Property Dispute Document Checklist for Bihar (Free PDF) | Adv. Ram Snehi Mishra",
    seoDescription:
      "Free downloadable checklist for a property or land dispute in Bihar — title and chain documents, jamabandi and mutation records, possession and boundary evidence, notices and court filings.",
    intro:
      "Use this checklist to organise documents before discussing a property or land dispute. It is " +
      "intentionally a practical document-gathering checklist rather than a statement that every item " +
      "is legally required.",
    groups: [
      {
        title: "Ownership and title documents",
        items: [
          "Registered sale deed, gift deed, partition deed, exchange deed, settlement deed or other document by which the property was acquired, if applicable.",
          "Earlier title/chain documents available with you.",
          "Any registered document or certified copy already obtained from the registration authority.",
          "Will, probate/letters of administration or succession-related documents, where relevant.",
        ],
      },
      {
        title: "Revenue and land records — Bihar",
        items: [
          "Mutation/dakhil-kharij order or record, if available.",
          "Recent land revenue/rent receipt, if applicable.",
          "Jamabandi or other available revenue record.",
          "Khesra/plot, khata and mouza details, where applicable.",
          "Any Bihar land-record, survey or measurement document relevant to the dispute.",
        ],
      },
      {
        title: "Possession and boundary evidence",
        items: [
          "Property/site photographs and videos with dates where possible.",
          "Survey/demarcation/measurement reports, if any.",
          "Maps, plans or boundary descriptions in your possession.",
          "Electricity, water, municipal or property-tax records that help establish possession or use, where relevant.",
        ],
      },
      {
        title: "Dispute and communication records",
        items: [
          "Legal notices and replies.",
          "Police complaints, if any.",
          "Civil/revenue/court filings, orders and notices, if any.",
          "Messages, emails or letters relevant to the dispute.",
          "Details of witnesses or persons with relevant knowledge.",
        ],
      },
      {
        title: "If the property is a Bihar RERA-related project",
        items: [
          "Agreement for sale/allotment documents.",
          "Payment receipts and correspondence with the promoter.",
          "Relevant project/property documents available to you.",
          "Any RERA complaint, order or notice already received.",
        ],
      },
    ],
    sources: [
      "Bihar Department of Revenue and Land Reforms — downloads and land-record related forms.",
      "Bihar RERA — official downloads include buyer/project-related forms and documents.",
    ],
    related: "/practice/property-lawyer-hajipur",
  },

  {
    slug: "mutual-consent-divorce",
    icon: "family",
    title: "Mutual Consent Divorce — Preparation Checklist",
    short: "Mutual Consent Divorce",
    tagline: "What to prepare before the first motion",
    pdf: "/checklists/mutual-consent-divorce-checklist.pdf",
    pages: 2,
    seoTitle: "Mutual Consent Divorce Preparation Checklist (Free PDF) | Adv. Ram Snehi Mishra, Hajipur",
    seoDescription:
      "Free downloadable checklist for preparing a mutual consent divorce consultation — marriage proof, separation timeline, children, financial matters, and the Section 13B position.",
    intro:
      "This checklist is for preparing a consultation about a possible mutual-consent divorce. The " +
      "applicable law depends on the marriage and circumstances; this is not a filing form or a " +
      "substitute for legal advice.",
    groups: [
      {
        title: "Marriage details",
        items: [
          "Marriage certificate or other available proof of marriage.",
          "Date and place of marriage.",
          "Details of the law under which the marriage was solemnised, where known.",
          "Current residential addresses and contact details of both spouses.",
        ],
      },
      {
        title: "Separation and consent",
        items: [
          "A clear timeline of when the spouses started living separately.",
          "Information showing whether both spouses presently agree to seek divorce.",
          "Any prior reconciliation/mediation proceedings or relevant records, if applicable.",
        ],
      },
      {
        title: "Children",
        items: [
          "Names and dates of birth of children, if any.",
          "Existing custody, visitation or maintenance arrangements, if any.",
          "Relevant school/medical/financial information where necessary for the proposed arrangement.",
        ],
      },
      {
        title: "Financial and property matters",
        items: [
          "Information about jointly owned property/assets.",
          "Relevant loan/liability details.",
          "Income/financial documents where maintenance or settlement is being discussed.",
          "Details of any proposed settlement regarding maintenance, property, jewellery/stridhan or other financial issues.",
        ],
      },
      {
        title: "Existing legal proceedings",
        items: [
          "Copies of any existing family/civil/criminal proceedings involving either spouse that may be relevant.",
          "Court notices, orders, mediation records or settlement documents.",
          "Details of any pending complaint or case between the spouses.",
        ],
      },
      {
        title: "Important legal point",
        items: [
          "Under Section 13B of the Hindu Marriage Act, 1955, the statutory text refers to spouses living separately for one year or more, inability to live together, and mutual agreement to dissolve the marriage.",
          "The same section provides for the second motion not earlier than six months and not later than eighteen months after presentation of the petition, subject to the statutory conditions.",
          "Do not assume that the same requirements or procedure apply to every marriage; confirm the applicable law and current court procedure.",
        ],
      },
    ],
    sources: ["India Code — Hindu Marriage Act, 1955, including Section 13B."],
    related: "/practice/divorce-family-lawyer-hajipur",
  },

  {
    slug: "criminal-case",
    icon: "shield",
    title: "Criminal Case — Consultation Checklist",
    short: "Criminal Case",
    tagline: "FIR, bail and court papers to bring",
    pdf: "/checklists/criminal-case-consultation-checklist.pdf",
    pages: 2,
    seoTitle: "Criminal Case Consultation Checklist (Free PDF) | Adv. Ram Snehi Mishra, Hajipur",
    seoDescription:
      "Free downloadable checklist for a criminal-law consultation — FIR and case identification, police and investigation documents, court orders, bail papers and supporting evidence.",
    intro:
      "Use this checklist to organise information and documents before a criminal-law consultation. " +
      "The exact documents depend on the stage and nature of the matter.",
    groups: [
      {
        title: "Case identification",
        items: [
          "FIR number, police station and FIR date, if an FIR exists.",
          "Case number/CNR number and court details, if the matter has reached court.",
          "Names of accused, complainant and other relevant parties.",
          "Relevant dates: incident, complaint, FIR, arrest, notice, summons or hearing.",
        ],
      },
      {
        title: "Police and investigation documents",
        items: [
          "Copy of FIR, if available.",
          "Police notice/summons or other communication received.",
          "Bail/arrest-related documents, if applicable.",
          "Any document already provided to or received from the investigating agency.",
        ],
      },
      {
        title: "Court documents",
        items: [
          "Summons, warrants or court notices, if any.",
          "Previous orders, bail orders or other court orders.",
          "Charge-sheet/final report or complaint, if already supplied.",
          "Any existing vakalatnama or filing-related papers.",
        ],
      },
      {
        title: "Evidence and supporting material",
        items: [
          "Relevant photographs, videos, audio or electronic records in their original form where possible.",
          "Messages/emails and relevant correspondence.",
          "Documents that support the person's version of events.",
          "Names/contact details of potential witnesses.",
        ],
      },
      {
        title: "Consultation notes",
        items: [
          "Prepare a factual timeline without guessing or altering dates.",
          "Mention previous cases or proceedings that may be relevant.",
          "Bring originals for inspection and copies for reference where appropriate.",
          "Do not delete, edit or fabricate evidence.",
        ],
      },
    ],
    sources: [
      "eCourts official portal — advocate forms including case information, filing, bail bond and list of documents.",
    ],
    related: "/practice/criminal-lawyer-hajipur",
  },

  {
    slug: "consumer-complaint",
    icon: "doc",
    title: "Consumer Complaint — Document Checklist",
    short: "Consumer Complaint",
    tagline: "Build the record before you escalate",
    pdf: "/checklists/consumer-complaint-checklist.pdf",
    pages: 2,
    seoTitle: "Consumer Complaint Document Checklist (Free PDF) | Adv. Ram Snehi Mishra, Hajipur",
    seoDescription:
      "Free downloadable checklist for a consumer grievance — invoices and payment proof, evidence of the defect, complaint and resolution attempts, and National Consumer Helpline details.",
    intro:
      "Use this checklist to organise records for a consumer grievance or potential consumer dispute. " +
      "Keep the transaction history and communications in one place.",
    groups: [
      {
        title: "Purchase/service records",
        items: [
          "Invoice, bill, receipt or order confirmation.",
          "Agreement, terms and conditions or service contract, if applicable.",
          "Warranty/guarantee documents, if applicable.",
          "Payment proof such as transaction receipt or relevant statement.",
        ],
      },
      {
        title: "Problem and evidence",
        items: [
          "Photos/videos showing the defect, damage or service issue, where relevant.",
          "Inspection/service reports or technical reports, if any.",
          "Emails, chats, letters or other communications with the seller/service provider.",
          "Timeline of the purchase, complaint, promised resolution and subsequent follow-ups.",
        ],
      },
      {
        title: "Complaint and resolution attempts",
        items: [
          "Copy of the complaint/grievance submitted to the company.",
          "Complaint/ticket/reference number.",
          "Company response or refusal, if any.",
          "Any proposed refund, replacement, repair or settlement communication.",
        ],
      },
      {
        title: "Identity and transaction details",
        items: [
          "Name and contact details used for the transaction.",
          "Seller/service-provider name and available address/contact details.",
          "Order/invoice/customer/account reference numbers.",
        ],
      },
      {
        title: "Before escalation",
        items: [
          "Keep copies of every document submitted.",
          "Do not exaggerate the loss or claim facts you cannot support.",
          "Check the current procedure and appropriate forum before filing.",
        ],
      },
      {
        title: "National Consumer Helpline",
        items: [
          "The Department of Consumer Affairs states that NCH provides a pre-litigation grievance mechanism and consumers can register grievances online or through its listed channels.",
          "Official NCH contact information currently lists 1915 and 1800-11-4000, with service hours shown as 8 AM to 8 PM (except national holidays).",
        ],
      },
    ],
    sources: [
      "National Consumer Helpline, Department of Consumer Affairs — official portal and about page.",
      "NCH official contact page.",
    ],
    related: "/practice/civil-lawyer-hajipur",
  },
];

export const checklistBySlug = (slug) => checklists.find((c) => c.slug === slug);
