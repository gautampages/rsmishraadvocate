// ============================================================================
//  CASE-STATUS LANDING PAGES — copy.
//
//  /case-status is the hub; /case-status/<district> is one page per Bihar
//  district (see courts.js). The tracker component is identical on all of
//  them; what differs is the surrounding explanation, which is the part a
//  search engine actually reads.
//
//  Everything here is procedural information about how court records work.
//  It is not legal advice and does not depend on any individual case.
// ============================================================================

import { DIVISIONS, courtName, placeLabel } from "./courts.js";

export const hub = {
  eyebrow: "Case Status",
  title: "Check Your Bihar Court Case Status Online",
  intro:
    "Enter a CNR number, a party's name or an advocate's name and get the current stage of the case, the next hearing date, the full hearing history and every order on record — drawn live from the eCourts system that the district judiciary itself maintains, for every district court in Bihar (and any court in India).",
  meta:
    "Free · No registration · Every district court in Bihar — works across India too",
};

// ---------------------------------------------------------------------------
//  How a case is identified. This is the single thing most people searching
//  for "case status" actually need explained, and no court website explains it.
// ---------------------------------------------------------------------------
export const identifiers = [
  {
    icon: "scan",
    title: "CNR number",
    lead: "16 characters, e.g. BRVS010012342024",
    text:
      "The Case Number Record is permanent and unique to your case across all of India. It never changes — not when the case is transferred, not when it goes on appeal, not when the court reorganises its numbering. The first four characters identify the state and the court establishment, the next four the court hall, then a six-digit serial and the four-digit year. If you have this, nothing else is needed.",
    where:
      "Printed on the filing receipt, on the first page of most orders, and on any cause list entry for your case. Your advocate's clerk will have it.",
  },
  {
    icon: "doc",
    title: "Case number",
    lead: "e.g. Title Suit 245/2023",
    text:
      "The registration number given when the case was admitted, made up of a case type, a serial number and a year. It is unique only within one court establishment, so it must always be used together with the district and the court.",
    where: "On the summons, on the vakalatnama, and on every order sheet.",
  },
  {
    icon: "users",
    title: "Party name",
    lead: "e.g. Sunita Devi",
    text:
      "Court records store names exactly as they were typed at filing — including spelling variants, missing surnames and initials in place of full names. Searching by name works, but expect to scan several results, and try a shorter fragment before concluding a case does not exist.",
    where: "Use the petitioner's, respondent's, complainant's or accused's name as it appears on the papers.",
  },
  {
    icon: "scales",
    title: "Advocate name",
    lead: "e.g. Ram Snehi Mishra",
    text:
      "Every case carries the name of the advocate on record. If you know who is appearing but not the case number, this is often the fastest route back to your file.",
    where: "On the vakalatnama you signed, and in the appearance column of the cause list.",
  },
];

export const readingResults = [
  {
    icon: "calendar",
    title: "Next hearing date",
    text:
      "The date the case is next listed, together with the purpose of listing — appearance, framing of issues, evidence, arguments, or judgment. The purpose tells you whether your attendance is actually required.",
  },
  {
    icon: "clock",
    title: "Case stage",
    text:
      "Where the matter stands procedurally. \"Pending\" alone means little; the stage tells you whether pleadings are complete, whether evidence has begun, and how much of the case is left.",
  },
  {
    icon: "doc",
    title: "Orders & judgments",
    text:
      "Every interim order, interlocutory application and final judgment recorded on the file, with its date. An order that does not appear here has usually not yet been uploaded rather than not been passed.",
  },
  {
    icon: "shield",
    title: "Disposal status",
    text:
      "Whether the case is pending or disposed, and if disposed, the date and the nature of disposal. A disposal does not always mean a decision on merits — settlement, withdrawal and default disposals all appear the same way at a glance.",
  },
];

export const hubFaqs = [
  {
    q: "How do I check my court case status online in Bihar?",
    a: "Enter your 16-character CNR number in the search box on this page, or search by the name of a party or the advocate on record. The tracker queries the eCourts records maintained by the district judiciary and returns the current stage, the next hearing date, the complete hearing history and the orders on file. It covers every district court in Bihar — Patna, Muzaffarpur, Vaishali (Hajipur), Gaya, Darbhanga, Bhagalpur, Purnia and the rest — and works for courts across India as well.",
  },
  {
    q: "What is a CNR number and where do I find it?",
    a: "CNR stands for Case Number Record. It is a permanent 16-character code that uniquely identifies your case anywhere in India — for example BRVS010012342024. It is printed on your filing receipt, on the first page of most orders, and against your case in the daily cause list. Unlike a case number, a CNR never changes, even if the case is transferred to another court.",
  },
  {
    q: "Can I check case status without a CNR number?",
    a: "Yes. Search by the name of any party to the case, or by the name of the advocate on record. Court records store names exactly as they were entered at the time of filing, so try a shorter fragment of the name if the full spelling returns nothing — \"Sunita\" will often find a case that \"Sunita Devi Singh\" does not.",
  },
  {
    q: "Is this case status service free?",
    a: "Yes. The tracker is free, needs no registration and no login. It reads the same public records that the judiciary publishes through the eCourts system, and nothing you search for is stored on this website.",
  },
  {
    q: "How current is the information shown?",
    a: "Records are fetched live at the moment you search, so you see exactly what the court's own system holds. Bear in mind that the courts themselves update entries after the day's proceedings — an order passed this morning may appear only later in the day, or the next working day.",
  },
  {
    q: "My case does not appear in the search. What now?",
    a: "The usual causes are a mistyped CNR, a name spelt differently in the record than on your papers, a case filed under a district name that differs from the town where the court sits (Saran rather than Chhapra, Rohtas rather than Sasaram), or a very recently filed matter that has not yet been digitised. Try the party name instead of the CNR, then the advocate's name. If it still does not appear, the filing counter of the court concerned can confirm the correct number.",
  },
  {
    q: "Does checking case status here create an advocate–client relationship?",
    a: "No. This tracker is a free public utility. Using it does not make you a client of Advocate Ram Snehi Mishra and does not amount to legal advice. If you want your case reviewed and advised on, book a consultation with the chamber.",
  },
  {
    q: "Can I see the next hearing date for a case in the Patna High Court?",
    a: "The tracker covers case records published through the eCourts system, which is strongest for the district judiciary. High Court matters carry their own numbering and are best checked on the Patna High Court's own portal. If you have the CNR, try it here first — many High Court records are available through the same system.",
  },
];

/** FAQs for a single district page — the questions people actually type. */
export const districtFaqs = (d) => {
  const place = placeLabel(d);
  const court = courtName(d);

  return [
    {
      q: `How can I check my case status in ${d.district} district court?`,
      a: `Enter your 16-character CNR number in the search box on this page, or search by the name of a party or the advocate on record. The tracker reads the live eCourts records for the ${court} and shows the current stage, the next hearing date, the full hearing history and the orders on file. It is free and needs no registration.`,
    },
    {
      q: `Where does the ${d.district} district court sit?`,
      a:
        d.hq === d.district
          ? `The District & Sessions Court for ${d.district} sits at ${d.hq}, along with the civil courts and the courts of the judicial magistrates. ${d.district} falls within the ${DIVISIONS[d.division]} of Bihar, and appeals from it lie to the Patna High Court.`
          : `The district judiciary for ${d.district} sits at ${d.hq}, not at a town of the same name as the district. This trips people up constantly: in court records the district is ${d.district}, while the court complex is at ${d.hq}. Appeals lie to the Patna High Court.`,
    },
    {
      q: `Can I find my next hearing date at ${d.hq} court online?`,
      a: `Yes. The next listed date, and the purpose for which the case is listed, are part of what the tracker returns for any case whose record has been digitised. The purpose matters as much as the date — a listing for evidence needs you present, a listing for orders usually does not. The daily cause list for ${place} is the authoritative board for the day's business.`,
    },
    {
      q: `What if I do not have the CNR number for my ${d.district} case?`,
      a: `Search by party name or by the name of the advocate on record instead. Names in court records are stored exactly as they were entered at filing, so a shorter fragment of the name often works better than the full one. The CNR itself is printed on your filing receipt, on most orders, and in the cause list entry for your case.`,
    },
    {
      q: `Does Advocate Ram Snehi Mishra appear in ${d.district}?`,
      a: d.home
        ? `Yes. The chamber is based at Hajipur and appears before the courts at Vaishali as its home court, across criminal, civil, family and property matters, with 28+ years of practice.`
        : `The chamber is based at Hajipur in Vaishali district and appears principally before the courts at Vaishali, Patna and Muzaffarpur, and before the Patna High Court. For a matter at ${d.hq}, the chamber can advise on the case and, where appropriate, arrange appearance or work with your local counsel. A first conversation is confidential and costs nothing to arrange.`,
    },
  ];
};
