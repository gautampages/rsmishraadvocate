// ============================================================================
//  IPC → BNS / CrPC → BNSS / Evidence Act → BSA — section mapping table.
//
//  On 1 July 2024 the three criminal codes were replaced, and "IPC 420 in BNS",
//  "302 IPC new section", "dhara 144" became — and remain — some of the most
//  typed legal queries in India. This table answers them.
//
//  Accuracy rule: only correspondences that are settled and commonly cited are
//  listed. Where the new Act reorganised rather than renumbered (IPC 377 most
//  visibly), the entry says so instead of inventing an equivalent. The table
//  is a signpost, not a charge sheet: what section applies to a real case
//  depends on facts, and the offence DATE decides which code governs at all.
// ============================================================================

export const CODE_GROUPS = [
  {
    key: "ipc",
    oldCode: "IPC",
    newCode: "BNS",
    oldName: "Indian Penal Code, 1860",
    newName: "Bharatiya Nyaya Sanhita, 2023",
  },
  {
    key: "crpc",
    oldCode: "CrPC",
    newCode: "BNSS",
    oldName: "Code of Criminal Procedure, 1973",
    newName: "Bharatiya Nagarik Suraksha Sanhita, 2023",
  },
  {
    key: "iea",
    oldCode: "Evidence Act",
    newCode: "BSA",
    oldName: "Indian Evidence Act, 1872",
    newName: "Bharatiya Sakshya Adhiniyam, 2023",
  },
];

// `old` and `to` are section numbers as people type them; `offence` is the
// plain-language label they searched for in the first place. `hot` marks the
// sections with the most search volume, surfaced before any query is typed.
export const SECTION_MAP = [
  // ---- IPC → BNS: offences against the person -----------------------------
  { group: "ipc", old: "302", to: "103(1)", offence: "Murder — punishment", hot: true },
  { group: "ipc", old: "304", to: "105", offence: "Culpable homicide not amounting to murder" },
  { group: "ipc", old: "304A", to: "106(1)", offence: "Causing death by negligence" },
  { group: "ipc", old: "304B", to: "80(2)", offence: "Dowry death" },
  { group: "ipc", old: "306", to: "108", offence: "Abetment of suicide" },
  { group: "ipc", old: "307", to: "109", offence: "Attempt to murder", hot: true },
  { group: "ipc", old: "308", to: "110", offence: "Attempt to commit culpable homicide" },
  { group: "ipc", old: "323", to: "115(2)", offence: "Voluntarily causing hurt", hot: true },
  { group: "ipc", old: "324", to: "118(1)", offence: "Hurt by dangerous weapons or means" },
  { group: "ipc", old: "325", to: "117(2)", offence: "Voluntarily causing grievous hurt" },
  { group: "ipc", old: "326", to: "118(2)", offence: "Grievous hurt by dangerous weapons or means" },
  { group: "ipc", old: "326A", to: "124(1)", offence: "Acid attack" },
  {
    group: "ipc",
    old: "336 / 337 / 338",
    to: "125 / 125(a) / 125(b)",
    offence: "Act endangering life — simple hurt, grievous hurt",
  },
  { group: "ipc", old: "341", to: "126(2)", offence: "Wrongful restraint" },
  { group: "ipc", old: "342", to: "127(2)", offence: "Wrongful confinement" },
  { group: "ipc", old: "352", to: "131", offence: "Assault or criminal force" },
  { group: "ipc", old: "353", to: "132", offence: "Assault to deter a public servant" },
  { group: "ipc", old: "363", to: "137(2)", offence: "Kidnapping" },
  { group: "ipc", old: "366", to: "87", offence: "Kidnapping or abduction to compel marriage" },

  // ---- IPC → BNS: offences against women ---------------------------------
  { group: "ipc", old: "354", to: "74", offence: "Assault on a woman to outrage her modesty", hot: true },
  { group: "ipc", old: "354A", to: "75", offence: "Sexual harassment" },
  { group: "ipc", old: "354B", to: "76", offence: "Assault with intent to disrobe" },
  { group: "ipc", old: "354C", to: "77", offence: "Voyeurism" },
  { group: "ipc", old: "354D", to: "78", offence: "Stalking" },
  { group: "ipc", old: "376", to: "64", offence: "Rape — punishment", hot: true },
  { group: "ipc", old: "376D", to: "70(1)", offence: "Gang rape" },
  {
    group: "ipc",
    old: "377",
    to: "—",
    offence: "Unnatural offences",
    note: "No corresponding section in the BNS — the offence was not carried over.",
  },
  {
    group: "ipc",
    old: "498A",
    to: "85",
    offence: "Cruelty by husband or his relatives",
    note: "BNS 85 is the punishment; BNS 86 carries the definition of cruelty.",
    hot: true,
  },
  { group: "ipc", old: "509", to: "79", offence: "Word or gesture insulting the modesty of a woman" },
  { group: "ipc", old: "494", to: "82(1)", offence: "Bigamy — marrying again during a spouse's lifetime" },
  { group: "ipc", old: "312", to: "88", offence: "Causing miscarriage" },

  // ---- IPC → BNS: property offences --------------------------------------
  { group: "ipc", old: "379", to: "303(2)", offence: "Theft — punishment", hot: true },
  { group: "ipc", old: "380", to: "305", offence: "Theft in a dwelling house" },
  { group: "ipc", old: "384", to: "308(2)", offence: "Extortion" },
  { group: "ipc", old: "392", to: "309(4)", offence: "Robbery — punishment" },
  { group: "ipc", old: "395", to: "310(2)", offence: "Dacoity" },
  { group: "ipc", old: "406", to: "316(2)", offence: "Criminal breach of trust", hot: true },
  { group: "ipc", old: "409", to: "316(5)", offence: "Criminal breach of trust by public servant, banker, agent" },
  { group: "ipc", old: "411", to: "317(2)", offence: "Dishonestly receiving stolen property" },
  { group: "ipc", old: "415 / 417", to: "318(1) / 318(2)", offence: "Cheating — definition and simple punishment" },
  {
    group: "ipc",
    old: "420",
    to: "318(4)",
    offence: "Cheating and dishonestly inducing delivery of property",
    hot: true,
  },
  { group: "ipc", old: "425 / 426", to: "324(1) / 324(2)", offence: "Mischief" },
  { group: "ipc", old: "447", to: "329(3)", offence: "Criminal trespass" },
  { group: "ipc", old: "448", to: "329(4)", offence: "House trespass" },
  { group: "ipc", old: "452", to: "333", offence: "House trespass after preparation for hurt" },
  { group: "ipc", old: "465", to: "336(2)", offence: "Forgery" },
  { group: "ipc", old: "467", to: "338", offence: "Forgery of a valuable security or will" },
  { group: "ipc", old: "468", to: "336(3)", offence: "Forgery for the purpose of cheating" },
  { group: "ipc", old: "471", to: "340(2)", offence: "Using a forged document as genuine" },

  // ---- IPC → BNS: public order, speech, general ---------------------------
  { group: "ipc", old: "34", to: "3(5)", offence: "Acts done by several persons with common intention" },
  { group: "ipc", old: "120B", to: "61(2)", offence: "Criminal conspiracy" },
  {
    group: "ipc",
    old: "124A",
    to: "152",
    offence: "Sedition",
    note: "Sedition as such was dropped; BNS 152 creates a differently framed offence of endangering the sovereignty, unity and integrity of India.",
  },
  { group: "ipc", old: "147", to: "191(2)", offence: "Rioting" },
  { group: "ipc", old: "148", to: "191(3)", offence: "Rioting armed with a deadly weapon" },
  { group: "ipc", old: "149", to: "190", offence: "Unlawful assembly — vicarious liability" },
  { group: "ipc", old: "153A", to: "196", offence: "Promoting enmity between groups" },
  { group: "ipc", old: "193", to: "229", offence: "Giving or fabricating false evidence" },
  { group: "ipc", old: "201", to: "238", offence: "Causing disappearance of evidence of an offence" },
  { group: "ipc", old: "279", to: "281", offence: "Rash driving on a public way" },
  { group: "ipc", old: "294", to: "296", offence: "Obscene acts and songs in public" },
  { group: "ipc", old: "500", to: "356(2)", offence: "Defamation — punishment" },
  { group: "ipc", old: "504", to: "352", offence: "Intentional insult to provoke breach of the peace" },
  { group: "ipc", old: "506", to: "351(2)", offence: "Criminal intimidation", hot: true },
  { group: "ipc", old: "511", to: "62", offence: "Attempt to commit an offence" },

  // ---- CrPC → BNSS ---------------------------------------------------------
  { group: "crpc", old: "41A", to: "35(3)", offence: "Notice of appearance instead of arrest" },
  { group: "crpc", old: "91", to: "94", offence: "Summons to produce a document or thing" },
  {
    group: "crpc",
    old: "125",
    to: "144",
    offence: "Maintenance for wife, children and parents",
    hot: true,
  },
  {
    group: "crpc",
    old: "144",
    to: "163",
    offence: "Urgent prohibitory orders (the \"dhara 144\" of curfews)",
    note: "Easily confused: the number 144 now belongs to maintenance in the BNSS. Curfew-style orders are BNSS 163.",
    hot: true,
  },
  { group: "crpc", old: "154", to: "173", offence: "Registration of an FIR" },
  { group: "crpc", old: "156(3)", to: "175(3)", offence: "Magistrate directs police to investigate" },
  { group: "crpc", old: "161", to: "180", offence: "Police examination of witnesses" },
  { group: "crpc", old: "164", to: "183", offence: "Statement or confession before a Magistrate" },
  { group: "crpc", old: "173", to: "193", offence: "Police report on completion of investigation (charge sheet)" },
  { group: "crpc", old: "200", to: "223", offence: "Complaint to a Magistrate" },
  { group: "crpc", old: "313", to: "351", offence: "Examination of the accused" },
  { group: "crpc", old: "320", to: "359", offence: "Compounding of offences" },
  { group: "crpc", old: "397", to: "438", offence: "Revision — calling for records" },
  { group: "crpc", old: "436", to: "478", offence: "Bail in a bailable offence" },
  { group: "crpc", old: "437", to: "480", offence: "Bail in a non-bailable offence" },
  { group: "crpc", old: "438", to: "482", offence: "Anticipatory bail", hot: true },
  { group: "crpc", old: "439", to: "483", offence: "Bail powers of the High Court and Sessions Court" },
  { group: "crpc", old: "482", to: "528", offence: "Inherent powers of the High Court (quashing)" },

  // ---- Evidence Act → BSA --------------------------------------------------
  {
    group: "iea",
    old: "27",
    to: "23(2)",
    offence: "Discovery statements made in police custody",
  },
  { group: "iea", old: "32", to: "26", offence: "Dying declaration and related statements" },
  { group: "iea", old: "45", to: "39", offence: "Opinions of experts" },
  {
    group: "iea",
    old: "65B",
    to: "63",
    offence: "Electronic records — admissibility and certificate",
    hot: true,
  },
];

/** The rows marked hot, in table order — shown before any search. */
export const HOT_SECTIONS = SECTION_MAP.filter((s) => s.hot);

/**
 * Case-insensitive search across old number, new number and offence text.
 * "420", "318", "cheating", "ipc 420" and "bns 318" all find the same row.
 */
export function searchSections(query) {
  const q = String(query || "")
    .toLowerCase()
    .replace(/\b(ipc|bns|crpc|bnss|iea|bsa|section|dhara|धारा)\b/g, "")
    .trim();
  if (!q) return SECTION_MAP;

  return SECTION_MAP.filter(
    (s) =>
      s.old.toLowerCase().includes(q) ||
      s.to.toLowerCase().includes(q) ||
      s.offence.toLowerCase().includes(q)
  );
}
