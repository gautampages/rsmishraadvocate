// ============================================================================
//  POLICY DOCUMENTS — privacy, terms and disclaimer.
//
//  Written to match what this website actually does, not from a template:
//  the booking form, the eCourts case tracker, the AI assistant and the
//  calculators each handle data differently, and the policy says so section
//  by section.
//
//  `updated` should be bumped whenever the substance changes.
// ============================================================================

import { contact } from "./content";

export const POLICY_UPDATED = "16 August 2026";

// A section is { heading, paragraphs?, list?, note? }.
export const privacyPolicy = {
  eyebrow: "Legal",
  title: "Privacy Policy",
  intro:
    "This policy explains what personal data ramsnehimishra.in collects, why it is collected, " +
    "how long it is kept and what you can ask us to do with it. It is written to meet the " +
    "Digital Personal Data Protection Act, 2023 (DPDP Act).",
  sections: [
    {
      heading: "Who is responsible for your data",
      paragraphs: [
        `The data fiduciary for this website is the chamber of Advocate Ram Snehi Mishra, ${contact.address}. ` +
          `Any question about this policy can be sent to ${contact.email} or ${contact.phone}.`,
      ],
    },
    {
      heading: "What we collect, and when",
      paragraphs: [
        "We do not ask you to create an account, and nothing on this site requires you to identify yourself in order to read it.",
      ],
      list: [
        "Appointment requests — the name, phone number, email, preferred date and description of your matter that you type in. This is collected only when you submit the form.",
        "Case-status searches — the CNR number or name you enter is sent to the court-records service to fetch that case and is not stored by this website.",
      "Case-law searches — the words you search for, and the judgment you open, are sent to the case-law service (Indian Kanoon) to fetch that result. They are not linked to you and are not stored by this website.",
        "AI assistant conversations — the text of your question is sent to a Cloudflare Workers AI model to generate an answer. Conversations are not linked to your identity and are not stored as a chat history on our servers.",
        "Calculators and checklists — stamp duty, court fee, maintenance and limitation calculations run entirely inside your browser. The figures you enter are never transmitted to us.",
        "Technical logs — our hosting provider (Cloudflare) records standard request data such as IP address, timestamp and user agent for security and rate limiting.",
      ],
    },
    {
      heading: "Why we use it",
      list: [
        "To answer your enquiry and, where you ask for one, to arrange a consultation.",
        "To carry out an initial conflict-of-interest check before accepting a matter.",
        "To keep the website secure and to prevent automated abuse of the AI assistant and case tracker.",
      ],
      note:
        "We do not sell your data, and we do not use it for advertising or profiling. We do not share " +
        "enquiry details with any third party except where we are required to by law or by an order of a court.",
    },
    {
      heading: "Professional confidentiality",
      paragraphs: [
        "Information you send through this website is treated as confidential by the chamber. Please note, " +
          "however, that sending an enquiry does not by itself create an advocate–client relationship, and " +
          "legal professional privilege attaches only once the chamber has formally accepted your matter.",
        "For that reason, please do not send confidential documents, admissions or case-sensitive details " +
          "through the website forms or the AI assistant. Bring them to the consultation instead.",
      ],
    },
    {
      heading: "How long we keep it",
      paragraphs: [
        "Enquiries that do not become matters are retained for up to 12 months and then deleted. Where the " +
          "chamber is formally engaged, the file is retained for the period required by professional and " +
          "statutory obligations. Technical logs held by our hosting provider are retained for a short " +
          "rolling window in line with their standard practice.",
      ],
    },
    {
      heading: "Cookies",
      paragraphs: [
        "This website sets no advertising or tracking cookies. Your browser may store small amounts of data " +
          "locally to remember interface state, such as an open chat panel; this never leaves your device.",
      ],
    },
    {
      heading: "Your rights under the DPDP Act",
      list: [
        "To ask what personal data of yours we hold, and to receive a summary of it.",
        "To have inaccurate or incomplete data corrected, or outdated data erased.",
        "To withdraw consent for us to hold your enquiry, at any time.",
        "To nominate another person to exercise these rights on your behalf.",
        "To raise a grievance with us, and thereafter with the Data Protection Board of India.",
      ],
      note: `To exercise any of these, write to ${contact.email} with enough detail to identify your enquiry. We respond within 30 days.`,
    },
    {
      heading: "Children",
      paragraphs: [
        "This website is intended for adults seeking legal assistance. We do not knowingly collect the " +
          "personal data of a child except where a parent or guardian provides it in the course of a matter " +
          "concerning that child, such as a custody or maintenance proceeding.",
      ],
    },
    {
      heading: "Changes",
      paragraphs: [
        "This policy may be updated as the website changes. The revision date at the top of this page always " +
          "reflects the current version.",
      ],
    },
  ],
};

export const termsOfUse = {
  eyebrow: "Legal",
  title: "Terms of Use",
  intro:
    "These terms govern your use of ramsnehimishra.in, including the case-status tracker, the AI legal " +
    "assistant, the legal calculators and the enquiry and appointment forms. By using the site you accept them.",
  sections: [
    {
      heading: "No advocate–client relationship",
      paragraphs: [
        "Nothing on this website is legal advice, and reading it, using its tools or submitting an enquiry does " +
          "not make you a client of Advocate Ram Snehi Mishra. An advocate–client relationship arises only when " +
          "the chamber has agreed in writing to act for you, after a conflict check and an agreement on fees.",
      ],
    },
    {
      heading: "Information is general, your matter is specific",
      paragraphs: [
        "The explanations, articles, checklists and FAQs on this site describe general positions under Indian " +
          "law. Outcomes turn on facts, evidence, the court and the current state of the law, all of which vary. " +
          "Do not act, or refrain from acting, on the basis of anything here without taking advice on your own facts.",
      ],
    },
    {
      heading: "The AI legal assistant",
      paragraphs: [
        "The assistant is an automated system. It produces general legal information in plain language and can " +
          "be wrong, out of date, or incomplete. It does not know the facts of your case, it is not supervised in " +
          "real time by an advocate, and its answers are not legal advice and are not privileged.",
      ],
      note: "Please do not enter confidential information, personal identifiers or case documents into the assistant.",
    },
    {
      heading: "The case-status tracker",
      paragraphs: [
        "Case data is drawn from public eCourts records maintained by the judiciary and is reproduced as received. " +
          "Records can be delayed, incomplete or updated after we fetch them. The summaries shown are generated " +
          "automatically and are for orientation only.",
      ],
      note:
        "Never rely on this page for a hearing date. Always confirm the date from the court's own cause list or " +
        "through the advocate on record before acting on it.",
    },
    {
      // Indian Kanoon's API terms require the source of their data to be
      // disclosed in a prominent place as well as beside the results
      // themselves. This is that place.
      heading: "The case-law library",
      paragraphs: [
        "The case-law search and the judgment reader are powered by Indian Kanoon (indiankanoon.org), whose " +
          "database reproduces judgments, orders and statutes published by the courts and by government. That " +
          "material is supplied by Indian Kanoon and is not the work of this chamber. Its appearance on this site " +
          "is not an endorsement of the chamber by Indian Kanoon, and no view expressed on this site should be " +
          "attributed to them.",
        "Judgments are public documents and are reproduced here for reading and research. A printout from this " +
          "website is not a substitute for a certified copy or a citation to a recognised report, and no court " +
          "will accept one in place of either.",
      ],
      note:
        "A judgment that reads in your favour may have been overruled, distinguished, or decided by a court that " +
        "does not bind yours. Have any authority checked before you rely on it.",
    },
    {
      heading: "The calculators",
      paragraphs: [
        "The stamp duty, court fee, maintenance and limitation tools give indicative estimates from the rates and " +
          "statutory periods described on each tool's page. Rates change, exemptions apply, and periods can be " +
          "extended, condoned or interrupted on facts the calculator cannot know. Treat every figure as a starting " +
          "point for a conversation, not as a computation you can file on.",
      ],
    },
    {
      heading: "Fees quoted on this site",
      paragraphs: [
        "Any consultation or professional fee shown on this website is indicative and applies to a straightforward " +
          "matter. The fee for your matter is confirmed in writing before work begins. Court fees, stamp duty, " +
          "process fees and other disbursements are payable in addition and are set by statute, not by the chamber.",
      ],
    },
    {
      heading: "Acceptable use",
      list: [
        "Do not use the case tracker or the AI assistant in an automated or bulk fashion, or attempt to extract data from them at scale.",
        "Do not use this website to harass any person, or to seek assistance in committing an offence.",
        "Do not reproduce the articles, checklists or design of this site commercially without written permission.",
      ],
    },
    {
      heading: "Third-party material",
      paragraphs: [
        "This site embeds Google Maps and links to LinkedIn, Google Maps reviews and legal directories. It draws " +
          "case records from the judiciary's eCourts system and case law from Indian Kanoon. Those services are " +
          "governed by their own terms and privacy policies, and we are not responsible for their content.",
      ],
    },
    {
      heading: "Liability",
      paragraphs: [
        "The website is provided on an as-is basis. To the extent permitted by law, the chamber is not liable for " +
          "loss arising from reliance on the general information, automated summaries or estimates on this site. " +
          "Nothing in these terms limits liability that cannot lawfully be limited, including the professional " +
          "obligations owed to an actual client.",
      ],
    },
    {
      heading: "Governing law",
      paragraphs: [
        "These terms are governed by the laws of India. The courts at Hajipur, Vaishali (Bihar) have jurisdiction " +
          "over any dispute arising out of the use of this website.",
      ],
    },
  ],
};

export const disclaimer = {
  eyebrow: "Legal",
  title: "Disclaimer",
  intro:
    "The Bar Council of India does not permit advertisement or solicitation by advocates. This website is " +
    "published as a source of information about the chamber and about general legal procedure, and not as " +
    "an advertisement.",
  sections: [
    {
      heading: "Not an advertisement or solicitation",
      paragraphs: [
        "By reading this website you acknowledge that you are seeking information about Advocate Ram Snehi Mishra " +
          "of your own accord, and that there has been no advertisement, personal communication, solicitation, " +
          "invitation or inducement of any kind from the chamber or any of its members to solicit work.",
      ],
    },
    {
      heading: "Purpose of this website",
      paragraphs: [
        "The material here is intended to help a visitor understand the chamber's areas of practice and to make " +
          "general legal procedure more accessible — through explanatory articles, document checklists, indicative " +
          "calculators and a public case-status lookup. It is provided for the visitor's own understanding.",
      ],
    },
    {
      heading: "No legal advice",
      paragraphs: [
        "Nothing on this website constitutes legal advice, and the chamber accepts no liability for any action " +
          "taken in reliance on it. Any content downloaded or relied upon from this site is at the visitor's own " +
          "volition and risk.",
      ],
    },
    {
      heading: "No advocate–client relationship",
      paragraphs: [
        "Use of this website, including submitting an enquiry or using the AI assistant, does not create an " +
          "advocate–client relationship. Such a relationship is established only upon the chamber's written " +
          "acceptance of a matter.",
      ],
    },
  ],
};
