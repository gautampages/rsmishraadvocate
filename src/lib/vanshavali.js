// ============================================================================
//  VANSHAVALI (Prapatra 3(1)) — genealogy for the Bihar land survey and for
//  mutation by inheritance.
//
//  Position this site has already published (survey guide, EN + HI): for
//  the special survey, the vanshavali is a self-attested statement on plain
//  paper from the recorded rayat down to the living heirs; no sarpanch,
//  notary or kachahari attestation is legally required. Where an office
//  asks for a "certified" vanshavali (some Circle Offices for dakhil-kharij
//  by inheritance, banks, courts), the route reported under the Panchayati
//  Raj Department's December 2023 instructions runs through the Panchayat
//  Sachiv and Gram Kachahari with a notice-board window — that route is
//  described on the page as reported, and the "₹10 stamp" found on blogs
//  is not repeated because no authority supports it.
//
//  The generator lays the tree out as text, then a tabular list, then the
//  declaration — the three things every version of the form asks for.
// ============================================================================

export const RELATIONS = [
  { key: "son", hi: "पुत्र", en: "son" },
  { key: "daughter", hi: "पुत्री", en: "daughter" },
  { key: "wife", hi: "पत्नी", en: "wife" },
];

const rel = (key, lang) => (RELATIONS.find((r) => r.key === key) || RELATIONS[0])[lang];
const or = (v, blank = "____________") => (String(v || "").trim() ? String(v).trim() : blank);
const dead = (alive, lang) => (alive ? "" : lang === "hi" ? " (स्व.)" : " (late)");

/** Build the indented tree lines from the flat member list. */
function treeLines(members, lang) {
  const kids = (pid) => members.filter((m) => Number(m.parent) === Number(pid));
  const lines = [];
  const walk = (pid, prefix) => {
    const c = kids(pid);
    c.forEach((m, i) => {
      const last = i === c.length - 1;
      lines.push(`${prefix}${last ? "└─ " : "├─ "}${or(m.name)}${dead(m.alive, lang)} — ${rel(m.relation, lang)}`);
      walk(m.id, `${prefix}${last ? "   " : "│  "}`);
    });
  };
  walk(0, "");
  return lines;
}

/** The parent's name for the "father / husband" column. */
function parentName(m, members, ancestor) {
  if (Number(m.parent) === 0) return or(ancestor);
  const p = members.find((x) => Number(x.id) === Number(m.parent));
  return p ? or(p.name) : "____________";
}

export function vanshavaliText(f) {
  const lang = f.lang === "hi" ? "hi" : "en";
  const members = f.members || [];
  const ancestor = or(f.ancestor, lang === "hi" ? "[मूल रैयत का नाम]" : "[Recorded rayat's name]");
  const tree = treeLines(members, lang);
  const rows = members.map((m, i) =>
    lang === "hi"
      ? `${i + 1}. ${or(m.name)}${dead(m.alive, lang)} — ${rel(m.relation, lang)} — ${parentName(m, members, ancestor)}`
      : `${i + 1}. ${or(m.name)}${dead(m.alive, lang)} — ${rel(m.relation, lang)} of ${parentName(m, members, ancestor)}`
  );
  const place = `${or(f.village)}, ${lang === "hi" ? "पंचायत" : "Panchayat"} ${or(f.panchayat)}, ${lang === "hi" ? "अंचल" : "Anchal"} ${or(f.anchal)}, ${lang === "hi" ? "ज़िला" : "District"} ${or(f.district, "Vaishali")}`;

  if (lang === "hi") {
    return `प्रपत्र 3(1)
वंशावली
(बिहार विशेष सर्वेक्षण एवं बंदोबस्त के लिए स्व-घोषणा के साथ संलग्न)

मौजा / ग्राम: ${or(f.village)}    पंचायत: ${or(f.panchayat)}    अंचल: ${or(f.anchal)}    ज़िला: ${or(f.district, "वैशाली")}
खाता सं.: ${or(f.khata, "____")}    खेसरा सं.: ${or(f.khesra, "____")}    (जमाबंदी / खतियान के अनुसार)

मूल रैयत (जिनके नाम खतियान / जमाबंदी है): ${ancestor}${dead(false, "hi")}
पिता / पति का नाम: ${or(f.ancestorFather)}

वंश-वृक्ष
${ancestor} (स्व.)
${tree.join("\n")}

उत्तराधिकारियों की सूची
क्रम — नाम — संबंध — पिता / पति का नाम
${rows.join("\n")}

घोषणा
मैं, ${or(f.declarant, "[घोषणाकर्ता का नाम]")}, ${or(f.declarantRelation, "पुत्र/पुत्री/पत्नी")} ${or(f.declarantFather)}, निवासी ${place}, घोषणा करता/करती हूँ कि:
1. उपर्युक्त वंशावली मूल रैयत ${ancestor} से लेकर आज जीवित सभी उत्तराधिकारियों तक, पुत्रियों सहित, मेरी जानकारी और विश्वास में पूर्ण एवं सत्य है।
2. इसमें कोई उत्तराधिकारी छिपाया या छोड़ा नहीं गया है, और कोई ऐसा व्यक्ति नहीं जोड़ा गया है जो उत्तराधिकारी न हो।
3. यदि कोई तथ्य असत्य पाया जाए तो मैं विधि के अनुसार उत्तरदायी होऊँगा/होऊँगी।

स्थान: ${or(f.village)}
दिनांक: ____________

हस्ताक्षर: ____________
(${or(f.declarant, "[घोषणाकर्ता का नाम]")}, स्व-अभिप्रमाणित)
मोबाइल: ${or(f.mobile, "__________")}    आधार (अंतिम 4 अंक): ${or(f.aadhaar, "____")}

— — — — — — — — — — — — — — — — — — — —

शपथ पत्र
(जहाँ कार्यालय को स्व-घोषणा के अतिरिक्त शपथ पत्र चाहिए)

मैं, ${or(f.declarant, "[नाम]")}, ${or(f.declarantRelation, "पुत्र/पुत्री/पत्नी")} ${or(f.declarantFather)}, उम्र लगभग ${or(f.age, "___")} वर्ष, निवासी ${place}, सत्यनिष्ठा से शपथपूर्वक कथन करता/करती हूँ कि:
1. मूल रैयत ${ancestor} का देहांत हो चुका है और उनकी वंशावली उपर्युक्त प्रपत्र 3(1) में सही-सही अंकित है।
2. उक्त वंशावली में वर्णित व्यक्ति ही मूल रैयत के एकमात्र विधिक उत्तराधिकारी हैं; इसके अतिरिक्त कोई अन्य उत्तराधिकारी नहीं है।
3. यह शपथ पत्र भूमि सर्वेक्षण / दाखिल-ख़ारिज / अभिलेख सुधार के प्रयोजन से दिया जा रहा है, और इसका कोई भाग असत्य नहीं है।

शपथकर्ता का हस्ताक्षर: ____________

सत्यापन: मैं उपर्युक्त शपथकर्ता सत्यापित करता/करती हूँ कि इस शपथ पत्र के पैरा 1 से 3 तक के कथन मेरी व्यक्तिगत जानकारी में सत्य हैं, कुछ भी छिपाया नहीं गया है।
स्थान: ${or(f.village)}    दिनांक: ____________    हस्ताक्षर: ____________`;
  }

  return `PRAPATRA 3(1)
VANSHAVALI (GENEALOGICAL TABLE)
(Enclosed with the self-declaration for the Bihar Special Survey and Settlement)

Mauza / village: ${or(f.village)}    Panchayat: ${or(f.panchayat)}    Anchal: ${or(f.anchal)}    District: ${or(f.district, "Vaishali")}
Khata no.: ${or(f.khata, "____")}    Khesra no.: ${or(f.khesra, "____")}    (as per jamabandi / khatiyan)

Recorded rayat (whose name stands in the khatiyan / jamabandi): ${ancestor} (late)
Father's / husband's name: ${or(f.ancestorFather)}

Family tree
${ancestor} (late)
${tree.join("\n")}

List of heirs
No. — Name — Relation — Father's / husband's name
${rows.join("\n")}

Declaration
I, ${or(f.declarant, "[Declarant's name]")}, ${or(f.declarantRelation, "son/daughter/wife")} of ${or(f.declarantFather)}, resident of ${place}, declare that:
1. The genealogy above, from the recorded rayat ${ancestor} down to every heir alive today, daughters included, is complete and true to my knowledge and belief.
2. No heir has been concealed or omitted, and no person who is not an heir has been added.
3. If any statement is found false, I shall be liable under the law.

Place: ${or(f.village)}
Date: ____________

Signature: ____________
(${or(f.declarant, "[Declarant's name]")}, self-attested)
Mobile: ${or(f.mobile, "__________")}    Aadhaar (last 4 digits): ${or(f.aadhaar, "____")}

— — — — — — — — — — — — — — — — — — — —

AFFIDAVIT
(Where the office requires an affidavit in addition to the self-declaration)

I, ${or(f.declarant, "[Name]")}, ${or(f.declarantRelation, "son/daughter/wife")} of ${or(f.declarantFather)}, aged about ${or(f.age, "___")} years, resident of ${place}, do hereby solemnly affirm and state on oath that:
1. The recorded rayat ${ancestor} has died, and his/her genealogy is correctly set out in the Prapatra 3(1) above.
2. The persons named in it are the only legal heirs of the recorded rayat; there is no other heir.
3. This affidavit is made for the purpose of the land survey / dakhil-kharij / correction of records, and no part of it is false.

Deponent's signature: ____________

Verification: I, the above-named deponent, verify that the statements in paragraphs 1 to 3 of this affidavit are true to my personal knowledge and nothing has been concealed.
Place: ${or(f.village)}    Date: ____________    Signature: ____________`;
}
