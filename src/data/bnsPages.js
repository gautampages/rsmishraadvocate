// ============================================================================
//  PER-SECTION PAGES — BNS and BNSS, one URL per section, English and Hindi.
//
//  "BNS 318", "dhara 302 kya hai", "498A bailable or not", "dhara 144 kya hai"
//  are forty different queries, and the one-page converter cannot rank for
//  them all. Each entry below becomes /bns/<slug> and /hi/bns/<slug> (or
//  /bnss/…) with its own title, FAQ schema and breadcrumb — the same pattern
//  as the district case-status pages.
//
//  ACCURACY RULES
//  --------------
//  · Punishment text follows the section as enacted (Act 45 of 2023, in force
//    1 July 2024). Classification — cognizable, bailable, triable by,
//    compoundable — follows the BNSS First Schedule and BNSS s.359, not blogs.
//  · Where a section has limbs that are classified differently (318(2) vs
//    318(4)), each limb is its own row. The page shows all of them.
//  · `max` is the maximum imprisonment in years ("life" where death or life
//    imprisonment is available; null where the section carries no punishment
//    of its own). It drives two derived facts the page states in words:
//      – BNSS 35(3): a notice to appear, not arrest, is the norm where the
//        offence is punishable with up to 7 years.
//      – BNSS 187(3): default bail accrues at 90 days where the offence is
//        punishable with death, life or 10 years or more; 60 days otherwise.
//  · Nothing here is a charge sheet. The offence date decides which code
//    applies at all, and facts decide the section.
// ============================================================================

export const BNS_REVIEWED = "September 2026";

const S = "sessions"; // Court of Session
const M1 = "mfc"; // Magistrate of the first class
const ANY = "any"; // Any Magistrate

export const TRIABLE = {
  sessions: { en: "Court of Session", hi: "सत्र न्यायालय" },
  mfc: { en: "Magistrate of the first class", hi: "प्रथम श्रेणी न्यायिक मजिस्ट्रेट" },
  any: { en: "Any Magistrate", hi: "कोई भी मजिस्ट्रेट" },
  follows: { en: "As the principal offence", hi: "मूल अपराध के अनुसार" },
};

// Shorthand for a compoundable limb: who may compound, and whether the
// court's permission is needed (BNSS 359(2) offences).
const comp = (en, hi, permission = false) => ({ en, hi, permission });

// ---------------------------------------------------------------------------
//  Sections. `slug` is the URL segment; `section` is how the number is said.
// ---------------------------------------------------------------------------
export const bnsSections = [
  // ===== Offences against the person =====================================
  {
    code: "bns",
    slug: "103",
    section: "103",
    old: "302",
    chapter: "person",
    title: { en: "Murder", hi: "हत्या" },
    gist: {
      en: "Culpable homicide is murder when the act is done with the intention of causing death, or with the knowledge that it is so imminently dangerous that it must in all probability cause death.",
      hi: "जब कोई काम मृत्यु कारित करने के इरादे से, या यह जानते हुए किया जाए कि उससे मृत्यु होना लगभग तय है, तो वह आपराधिक मानव वध हत्या कहलाता है।",
    },
    limbs: [
      {
        sub: "103(1)",
        label: { en: "Murder", hi: "हत्या" },
        punishment: { en: "Death, or imprisonment for life, and fine.", hi: "मृत्युदंड या आजीवन कारावास, और जुर्माना।" },
        max: "life",
        cognizable: true,
        bailable: false,
        triableBy: S,
        compoundable: null,
      },
      {
        sub: "103(2)",
        label: { en: "Murder by a group of five or more on grounds of race, caste, community, sex, language or belief (mob lynching)", hi: "जाति, समुदाय, लिंग, भाषा या आस्था के आधार पर पाँच या अधिक लोगों द्वारा हत्या (भीड़ द्वारा हत्या)" },
        punishment: { en: "Death, or imprisonment for life, and fine — for each member of the group.", hi: "समूह के हर सदस्य को मृत्युदंड या आजीवन कारावास, और जुर्माना।" },
        max: "life",
        cognizable: true,
        bailable: false,
        triableBy: S,
        compoundable: null,
      },
    ],
    confusion: {
      en: "People still type \"BNS 302\" for murder. Under the BNS, section 302 is hurting religious feelings; murder is section 103.",
      hi: "लोग अब भी हत्या के लिए \"BNS 302\" खोजते हैं। BNS में धारा 302 धार्मिक भावनाएँ आहत करने की है; हत्या की धारा 103 है।",
    },
    related: ["/blog/first-date-of-a-criminal-case", "/case-law/anticipatory-bail", "/practice/criminal-lawyer-hajipur"],
  },
  {
    code: "bns",
    slug: "105",
    section: "105",
    old: "304",
    chapter: "person",
    title: { en: "Culpable homicide not amounting to murder", hi: "हत्या की कोटि में न आने वाला आपराधिक मानव वध" },
    gist: {
      en: "Causing death by an act done with the intention of causing death or a fatal injury, or with knowledge that death is likely — but with one of the exceptions to murder (grave and sudden provocation, private defence exceeded, sudden fight) applying.",
      hi: "मृत्यु कारित करने के इरादे या उसकी संभावना की जानकारी के साथ किया गया काम, जिसमें हत्या के अपवादों में से कोई लागू हो — गंभीर और अचानक उकसावा, आत्मरक्षा की सीमा पार, अचानक झगड़ा।",
    },
    limbs: [
      {
        sub: "105 — first part",
        label: { en: "Act done with intention of causing death or fatal injury", hi: "मृत्यु या घातक चोट कारित करने के इरादे से" },
        punishment: { en: "Imprisonment for life, or imprisonment of not less than 5 years which may extend to 10 years, and fine.", hi: "आजीवन कारावास, या कम से कम 5 वर्ष और अधिकतम 10 वर्ष का कारावास, और जुर्माना।" },
        max: "life",
        cognizable: true,
        bailable: false,
        triableBy: S,
        compoundable: null,
      },
      {
        sub: "105 — second part",
        label: { en: "Act done with knowledge that it is likely to cause death, without intention", hi: "इरादे के बिना, केवल यह जानते हुए कि मृत्यु संभावित है" },
        punishment: { en: "Imprisonment up to 10 years, and fine.", hi: "10 वर्ष तक का कारावास, और जुर्माना।" },
        max: 10,
        cognizable: true,
        bailable: false,
        triableBy: S,
        compoundable: null,
      },
    ],
    related: ["/blog/first-date-of-a-criminal-case", "/practice/criminal-lawyer-hajipur"],
  },
  {
    code: "bns",
    slug: "106",
    section: "106",
    old: "304A",
    chapter: "person",
    title: { en: "Causing death by negligence", hi: "लापरवाही से मृत्यु कारित करना" },
    gist: {
      en: "Causing the death of any person by a rash or negligent act that does not amount to culpable homicide — the section applied in most fatal road accidents and in medical negligence cases.",
      hi: "ऐसे उतावले या लापरवाह काम से किसी की मृत्यु कारित करना जो आपराधिक मानव वध नहीं है — अधिकांश घातक सड़क दुर्घटनाओं और चिकित्सकीय लापरवाही के मामलों में यही धारा लगती है।",
    },
    limbs: [
      {
        sub: "106(1)",
        label: { en: "Rash or negligent act causing death", hi: "उतावले या लापरवाह काम से मृत्यु" },
        punishment: { en: "Imprisonment up to 5 years, and fine. Where the act is by a registered medical practitioner in the course of a medical procedure: up to 2 years, and fine.", hi: "5 वर्ष तक का कारावास, और जुर्माना। पंजीकृत चिकित्सक द्वारा चिकित्सा प्रक्रिया के दौरान: 2 वर्ष तक का कारावास, और जुर्माना।" },
        max: 5,
        cognizable: true,
        bailable: true,
        triableBy: M1,
        compoundable: null,
      },
      {
        sub: "106(2)",
        label: { en: "Rash or negligent driving causing death, then escaping without reporting to the police or a Magistrate (hit and run)", hi: "उतावली गाड़ी चलाने से मृत्यु, फिर पुलिस या मजिस्ट्रेट को बताए बिना भाग जाना (हिट-एंड-रन)" },
        punishment: { en: "Imprisonment up to 10 years, and fine. Note: this sub-section was kept out of force after the January 2024 transporters' protest; confirm its current status before relying on it.", hi: "10 वर्ष तक का कारावास, और जुर्माना। ध्यान दें: जनवरी 2024 के ट्रांसपोर्टर आंदोलन के बाद इस उपधारा को लागू नहीं किया गया; भरोसा करने से पहले वर्तमान स्थिति जाँचें।" },
        max: 10,
        cognizable: true,
        bailable: false,
        triableBy: M1,
        compoundable: null,
      },
    ],
    related: ["/tools/limitation-checker", "/practice/criminal-lawyer-hajipur"],
  },
  {
    code: "bns",
    slug: "108",
    section: "108",
    old: "306",
    chapter: "person",
    title: { en: "Abetment of suicide", hi: "आत्महत्या के लिए उकसाना" },
    gist: {
      en: "Whoever abets the commission of suicide by any person. Courts require a positive act of instigation or aid close in time to the death — harassment alone is not enough.",
      hi: "जो कोई किसी व्यक्ति की आत्महत्या के लिए उकसाता है। अदालतें मृत्यु के निकट समय में उकसाने या सहायता का सकारात्मक कृत्य माँगती हैं — केवल प्रताड़ना पर्याप्त नहीं।",
    },
    limbs: [
      {
        sub: "108",
        label: { en: "Abetment of suicide", hi: "आत्महत्या का दुष्प्रेरण" },
        punishment: { en: "Imprisonment up to 10 years, and fine.", hi: "10 वर्ष तक का कारावास, और जुर्माना।" },
        max: 10,
        cognizable: true,
        bailable: false,
        triableBy: S,
        compoundable: null,
      },
    ],
    related: ["/case-law/anticipatory-bail", "/practice/criminal-lawyer-hajipur"],
  },
  {
    code: "bns",
    slug: "109",
    section: "109",
    old: "307",
    chapter: "person",
    title: { en: "Attempt to murder", hi: "हत्या का प्रयास" },
    gist: {
      en: "Doing an act with such intention or knowledge, and in such circumstances, that if death were caused the offender would be guilty of murder. Hurt need not be caused for the offence to be complete.",
      hi: "ऐसे इरादे या जानकारी और परिस्थितियों में किया गया काम कि यदि मृत्यु हो जाती तो वह हत्या होती। अपराध पूरा होने के लिए चोट लगना ज़रूरी नहीं।",
    },
    limbs: [
      {
        sub: "109(1)",
        label: { en: "Attempt to murder; where hurt is caused", hi: "हत्या का प्रयास; जहाँ चोट पहुँची हो" },
        punishment: { en: "Imprisonment up to 10 years, and fine. If hurt is caused: imprisonment for life, or the punishment above.", hi: "10 वर्ष तक का कारावास, और जुर्माना। चोट पहुँचने पर: आजीवन कारावास, या ऊपर की सज़ा।" },
        max: "life",
        cognizable: true,
        bailable: false,
        triableBy: S,
        compoundable: null,
      },
      {
        sub: "109(2)",
        label: { en: "Attempt by a person already under sentence of life imprisonment, where hurt is caused", hi: "आजीवन कारावास भुगत रहे व्यक्ति द्वारा प्रयास, जहाँ चोट पहुँची हो" },
        punishment: { en: "Death, or imprisonment for life for the remainder of natural life.", hi: "मृत्युदंड, या शेष प्राकृतिक जीवन के लिए आजीवन कारावास।" },
        max: "life",
        cognizable: true,
        bailable: false,
        triableBy: S,
        compoundable: null,
      },
    ],
    related: ["/blog/first-date-of-a-criminal-case", "/case-law/anticipatory-bail"],
  },
  {
    code: "bns",
    slug: "115",
    section: "115",
    old: "323",
    chapter: "person",
    title: { en: "Voluntarily causing hurt", hi: "जानबूझकर चोट पहुँचाना (मारपीट)" },
    gist: {
      en: "Causing bodily pain, disease or infirmity to a person on purpose — the ordinary marpeet section, the most common charge in village and family disputes.",
      hi: "किसी को जानबूझकर शारीरिक पीड़ा, रोग या अशक्तता पहुँचाना — साधारण मारपीट की धारा, गाँव और परिवार के झगड़ों में सबसे आम आरोप।",
    },
    limbs: [
      {
        sub: "115(2)",
        label: { en: "Voluntarily causing hurt", hi: "जानबूझकर चोट पहुँचाना" },
        punishment: { en: "Imprisonment up to 1 year, or fine up to ₹10,000, or both.", hi: "1 वर्ष तक का कारावास, या ₹10,000 तक जुर्माना, या दोनों।" },
        max: 1,
        cognizable: true,
        bailable: true,
        triableBy: ANY,
        compoundable: comp("the person to whom the hurt is caused", "जिस व्यक्ति को चोट पहुँची"),
      },
    ],
    related: ["/blog/police-refuse-to-lodge-fir", "/blog/lok-adalat-bihar"],
  },
  {
    code: "bns",
    slug: "117",
    section: "117",
    old: "325",
    chapter: "person",
    title: { en: "Voluntarily causing grievous hurt", hi: "जानबूझकर गंभीर चोट पहुँचाना" },
    gist: {
      en: "Grievous hurt is defined in section 116: emasculation, permanent loss of sight or hearing, loss of a limb or joint, fracture or dislocation of a bone or tooth, permanent disfigurement of the head or face, or any hurt that endangers life or keeps the victim in severe pain or unable to follow ordinary pursuits for 15 days.",
      hi: "गंभीर चोट की परिभाषा धारा 116 में है: नपुंसक बनाना, दृष्टि या श्रवण की स्थायी हानि, अंग या जोड़ की हानि, हड्डी या दाँत का टूटना या खिसकना, सिर या चेहरे का स्थायी विरूपण, या ऐसी चोट जो जीवन के लिए खतरनाक हो या 15 दिन तक तीव्र पीड़ा या काम करने में असमर्थ रखे।",
    },
    limbs: [
      {
        sub: "117(2)",
        label: { en: "Voluntarily causing grievous hurt", hi: "जानबूझकर गंभीर चोट" },
        punishment: { en: "Imprisonment up to 7 years, and fine.", hi: "7 वर्ष तक का कारावास, और जुर्माना।" },
        max: 7,
        cognizable: true,
        bailable: true,
        triableBy: M1,
        compoundable: comp("the person to whom the hurt is caused", "जिस व्यक्ति को चोट पहुँची", true),
      },
      {
        sub: "117(3)",
        label: { en: "Grievous hurt by a group of five or more on grounds of race, caste, community, sex, language or belief", hi: "जाति, समुदाय, लिंग, भाषा या आस्था के आधार पर पाँच या अधिक लोगों द्वारा गंभीर चोट" },
        punishment: { en: "Imprisonment up to 7 years, and fine — for each member of the group.", hi: "समूह के हर सदस्य को 7 वर्ष तक का कारावास, और जुर्माना।" },
        max: 7,
        cognizable: true,
        bailable: false,
        triableBy: M1,
        compoundable: null,
      },
      {
        sub: "117(4)",
        label: { en: "Grievous hurt causing permanent disability or a persistent vegetative state", hi: "स्थायी विकलांगता या स्थायी निष्क्रिय (वेजिटेटिव) अवस्था कारित करने वाली गंभीर चोट" },
        punishment: { en: "Rigorous imprisonment of not less than 10 years, which may extend to imprisonment for life (the remainder of natural life).", hi: "कम से कम 10 वर्ष का कठोर कारावास, जो शेष प्राकृतिक जीवन के आजीवन कारावास तक बढ़ सकता है।" },
        max: "life",
        cognizable: true,
        bailable: false,
        triableBy: S,
        compoundable: null,
      },
    ],
    related: ["/blog/police-refuse-to-lodge-fir", "/case-law/anticipatory-bail"],
  },
  {
    code: "bns",
    slug: "118",
    section: "118",
    old: "324 / 326",
    chapter: "person",
    title: { en: "Hurt or grievous hurt by dangerous weapons or means", hi: "खतरनाक हथियार या साधन से चोट या गंभीर चोट" },
    gist: {
      en: "Hurt caused by an instrument for shooting, stabbing or cutting, or one likely to cause death when used as a weapon; by fire or a heated substance; by poison, explosive or corrosive substance; or by an animal. The weapon, not the injury, is what lifts an ordinary marpeet into this section.",
      hi: "गोली चलाने, भोंकने या काटने वाले औज़ार से, या हथियार के रूप में प्रयुक्त होने पर मृत्यु कारित करने योग्य किसी वस्तु से; आग या गर्म पदार्थ से; ज़हर, विस्फोटक या संक्षारक पदार्थ से; या किसी जानवर से पहुँचाई गई चोट। साधारण मारपीट को इस धारा में लाने वाली चीज़ हथियार है, चोट नहीं।",
    },
    limbs: [
      {
        sub: "118(1)",
        label: { en: "Hurt by dangerous weapons or means", hi: "खतरनाक हथियार या साधन से चोट" },
        punishment: { en: "Imprisonment up to 3 years, or fine up to ₹20,000, or both.", hi: "3 वर्ष तक का कारावास, या ₹20,000 तक जुर्माना, या दोनों।" },
        max: 3,
        cognizable: true,
        bailable: false,
        triableBy: M1,
        compoundable: null,
      },
      {
        sub: "118(2)",
        label: { en: "Grievous hurt by dangerous weapons or means", hi: "खतरनाक हथियार या साधन से गंभीर चोट" },
        punishment: { en: "Imprisonment for life, or imprisonment up to 10 years, and fine.", hi: "आजीवन कारावास, या 10 वर्ष तक का कारावास, और जुर्माना।" },
        max: "life",
        cognizable: true,
        bailable: false,
        triableBy: S,
        compoundable: null,
      },
    ],
    confusion: {
      en: "Blogs disagree on whether 118(1) is bailable. On the BNSS First Schedule it is non-bailable, as IPC 324 has been since 2005 — bail is at the court's discretion, not a right.",
      hi: "ब्लॉग 118(1) की ज़मानत पर एकमत नहीं हैं। BNSS की पहली अनुसूची में यह अजमानतीय है, जैसे IPC 324 सन् 2005 से थी — ज़मानत अदालत के विवेक पर है, अधिकार नहीं।",
    },
    related: ["/case-law/anticipatory-bail", "/practice/criminal-lawyer-hajipur"],
  },
  {
    code: "bns",
    slug: "64",
    section: "64",
    old: "376",
    chapter: "women",
    title: { en: "Rape — punishment", hi: "बलात्कार — दंड" },
    gist: {
      en: "The punishment section for rape as defined in section 63. Consent given under fear, misconception, intoxication or by a woman under 18 is no consent; the identity of the victim is protected and disclosure is itself an offence (section 72).",
      hi: "धारा 63 में परिभाषित बलात्कार की दंड धारा। भय, भ्रम, नशे में या 18 वर्ष से कम आयु की स्त्री की सहमति, सहमति नहीं है; पीड़िता की पहचान संरक्षित है और उसे उजागर करना स्वयं अपराध है (धारा 72)।",
    },
    limbs: [
      {
        sub: "64(1)",
        label: { en: "Rape", hi: "बलात्कार" },
        punishment: { en: "Rigorous imprisonment of not less than 10 years, which may extend to imprisonment for life, and fine.", hi: "कम से कम 10 वर्ष का कठोर कारावास, जो आजीवन कारावास तक बढ़ सकता है, और जुर्माना।" },
        max: "life",
        cognizable: true,
        bailable: false,
        triableBy: S,
        compoundable: null,
      },
      {
        sub: "64(2)",
        label: { en: "Aggravated rape — by a police officer, public servant, armed-forces member, jail or hospital staff, relative or person in authority; during communal violence; of a pregnant woman, a woman under 16, or a woman unable to consent; repeatedly on the same woman", hi: "गंभीर बलात्कार — पुलिस, लोक सेवक, सशस्त्र बल, जेल या अस्पताल कर्मी, रिश्तेदार या प्राधिकार वाले व्यक्ति द्वारा; सांप्रदायिक हिंसा के दौरान; गर्भवती, 16 वर्ष से कम आयु की या सहमति देने में असमर्थ स्त्री पर; एक ही स्त्री पर बार-बार" },
        punishment: { en: "Rigorous imprisonment of not less than 10 years, which may extend to imprisonment for life meaning the remainder of natural life, and fine.", hi: "कम से कम 10 वर्ष का कठोर कारावास, जो शेष प्राकृतिक जीवन के आजीवन कारावास तक बढ़ सकता है, और जुर्माना।" },
        max: "life",
        cognizable: true,
        bailable: false,
        triableBy: S,
        compoundable: null,
      },
    ],
    confusion: {
      en: "Rape of a woman under 16 (section 65) and gang rape of a woman under 18 (section 70(2)) carry heavier minimums, and anticipatory bail is barred for them by BNSS 482(4). Where the victim is a child, the POCSO Act applies alongside.",
      hi: "16 वर्ष से कम आयु की स्त्री से बलात्कार (धारा 65) और 18 वर्ष से कम की स्त्री से सामूहिक बलात्कार (धारा 70(2)) में न्यूनतम सज़ा अधिक है, और BNSS 482(4) उनमें अग्रिम ज़मानत पर रोक लगाती है। पीड़िता बच्ची हो तो POCSO अधिनियम साथ में लगता है।",
    },
    related: ["/practice/criminal-lawyer-hajipur", "/blog/first-date-of-a-criminal-case"],
  },
  {
    code: "bns",
    slug: "74",
    section: "74",
    old: "354",
    chapter: "women",
    title: { en: "Assault or criminal force to a woman with intent to outrage her modesty", hi: "स्त्री की लज्जा भंग करने के इरादे से हमला या आपराधिक बल" },
    gist: {
      en: "Assaulting or using criminal force on a woman intending to outrage her modesty, or knowing it is likely to. Sexual harassment (75), disrobing (76), voyeurism (77) and stalking (78) are separate sections that are often charged with it.",
      hi: "स्त्री की लज्जा भंग करने के इरादे से, या यह जानते हुए कि ऐसा संभावित है, हमला या आपराधिक बल का प्रयोग। यौन उत्पीड़न (75), वस्त्र उतारना (76), ताक-झाँक (77) और पीछा करना (78) अलग धाराएँ हैं जो अक्सर इसके साथ लगती हैं।",
    },
    limbs: [
      {
        sub: "74",
        label: { en: "Outraging the modesty of a woman", hi: "स्त्री की लज्जा भंग करना" },
        punishment: { en: "Imprisonment of not less than 1 year, which may extend to 5 years, and fine.", hi: "कम से कम 1 वर्ष और अधिकतम 5 वर्ष का कारावास, और जुर्माना।" },
        max: 5,
        cognizable: true,
        bailable: false,
        triableBy: ANY,
        compoundable: null,
      },
    ],
    related: ["/case-law/anticipatory-bail", "/practice/criminal-lawyer-hajipur"],
  },
  {
    code: "bns",
    slug: "79",
    section: "79",
    old: "509",
    chapter: "women",
    title: { en: "Word, gesture or act intended to insult the modesty of a woman", hi: "स्त्री की लज्जा का अनादर करने के इरादे से शब्द, इशारा या कृत्य" },
    gist: {
      en: "Uttering any word, making any sound or gesture, or exhibiting any object intending that it be heard or seen by a woman and insult her modesty, or intruding on her privacy. Commonly added to eve-teasing and neighbourhood-dispute complaints.",
      hi: "किसी स्त्री की लज्जा का अनादर करने के इरादे से कोई शब्द कहना, आवाज़ या इशारा करना, या कोई वस्तु दिखाना, या उसकी निजता में दखल देना। छेड़खानी और मोहल्ले के झगड़ों की शिकायतों में आम तौर पर जोड़ी जाती है।",
    },
    limbs: [
      {
        sub: "79",
        label: { en: "Insulting the modesty of a woman", hi: "स्त्री की लज्जा का अनादर" },
        punishment: { en: "Simple imprisonment up to 3 years, and fine.", hi: "3 वर्ष तक का साधारण कारावास, और जुर्माना।" },
        max: 3,
        cognizable: true,
        bailable: true,
        triableBy: ANY,
        compoundable: comp("the woman whom it was intended to insult", "वह स्त्री जिसका अनादर करने का इरादा था"),
      },
    ],
    related: ["/blog/police-refuse-to-lodge-fir", "/blog/lok-adalat-bihar"],
  },
  {
    code: "bns",
    slug: "80",
    section: "80",
    old: "304B",
    chapter: "women",
    title: { en: "Dowry death", hi: "दहेज मृत्यु" },
    gist: {
      en: "Where a woman dies of burns, bodily injury or otherwise than in normal circumstances within 7 years of marriage, and it is shown that soon before her death she was subjected to cruelty or harassment by her husband or his relatives in connection with a demand for dowry. Section 118 of the Bharatiya Sakshya Adhiniyam then presumes the husband or relative caused the death.",
      hi: "जब विवाह के 7 वर्ष के भीतर किसी स्त्री की मृत्यु जलने, शारीरिक चोट या असामान्य परिस्थितियों में हो, और यह दिखाया जाए कि मृत्यु से कुछ पहले पति या उसके रिश्तेदारों ने दहेज की माँग को लेकर उसके साथ क्रूरता या उत्पीड़न किया। तब भारतीय साक्ष्य अधिनियम की धारा 118 यह मान लेती है कि मृत्यु पति या रिश्तेदार ने कारित की।",
    },
    limbs: [
      {
        sub: "80(2)",
        label: { en: "Dowry death", hi: "दहेज मृत्यु" },
        punishment: { en: "Imprisonment of not less than 7 years, which may extend to imprisonment for life.", hi: "कम से कम 7 वर्ष का कारावास, जो आजीवन कारावास तक बढ़ सकता है।" },
        max: "life",
        cognizable: true,
        bailable: false,
        triableBy: S,
        compoundable: null,
      },
    ],
    confusion: {
      en: "Sections 3 and 4 of the Dowry Prohibition Act, 1961 (giving/taking dowry; demanding dowry) are almost always charged alongside, and BNS 85 (cruelty) usually is too.",
      hi: "दहेज प्रतिषेध अधिनियम, 1961 की धाराएँ 3 और 4 (दहेज लेना-देना; दहेज माँगना) लगभग हमेशा साथ लगती हैं, और प्रायः BNS 85 (क्रूरता) भी।",
    },
    related: ["/case-law/anticipatory-bail", "/case-law/domestic-violence-act", "/practice/criminal-lawyer-hajipur"],
  },
  {
    code: "bns",
    slug: "85",
    section: "85",
    old: "498A",
    chapter: "women",
    title: { en: "Husband or relative of husband subjecting a woman to cruelty", hi: "पति या पति के रिश्तेदार द्वारा स्त्री के साथ क्रूरता" },
    gist: {
      en: "Section 86 defines cruelty: wilful conduct likely to drive the woman to suicide or cause grave injury to life, limb or health (mental or physical), or harassment to coerce her or her relatives to meet an unlawful demand for property. Section 85 punishes it. It is the section every 498A FIR is now registered under.",
      hi: "धारा 86 क्रूरता को परिभाषित करती है: ऐसा जानबूझकर किया आचरण जो स्त्री को आत्महत्या की ओर धकेले या उसके जीवन, अंग या स्वास्थ्य (मानसिक या शारीरिक) को गंभीर क्षति पहुँचाए, या संपत्ति की अवैध माँग पूरी कराने के लिए उसे या उसके रिश्तेदारों को प्रताड़ित करना। धारा 85 इसे दंडित करती है। हर 498A की FIR अब इसी धारा में दर्ज होती है।",
    },
    limbs: [
      {
        sub: "85",
        label: { en: "Cruelty by husband or his relatives", hi: "पति या उसके रिश्तेदारों द्वारा क्रूरता" },
        punishment: { en: "Imprisonment up to 3 years, and fine.", hi: "3 वर्ष तक का कारावास, और जुर्माना।" },
        max: 3,
        cognizable: true,
        bailable: false,
        triableBy: M1,
        compoundable: null,
      },
    ],
    confusion: {
      en: "Cognizable only on information from the woman or a relative by blood, marriage or adoption (or a notified public servant). Not compoundable under BNSS 359 — a settlement needs the High Court to quash under BNSS 528. Arrest is not automatic: the Arnesh Kumar guidelines and BNSS 35(3) require a notice to appear unless arrest is genuinely necessary.",
      hi: "केवल स्त्री या उसके रक्त, विवाह या दत्तक रिश्तेदार (या अधिसूचित लोक सेवक) की सूचना पर संज्ञेय। BNSS 359 में समझौते योग्य नहीं — समझौता होने पर हाई कोर्ट से BNSS 528 में रद्द कराना पड़ता है। गिरफ़्तारी स्वतः नहीं: अर्नेश कुमार दिशानिर्देश और BNSS 35(3) के अनुसार, जब तक गिरफ़्तारी सचमुच ज़रूरी न हो, पेश होने का नोटिस देना होगा।",
    },
    related: ["/case-law/anticipatory-bail", "/case-law/domestic-violence-act", "/practice/divorce-family-lawyer-hajipur"],
  },
  {
    code: "bns",
    slug: "87",
    section: "87",
    old: "366",
    chapter: "women",
    title: { en: "Kidnapping, abducting or inducing a woman to compel her marriage", hi: "विवाह के लिए विवश करने हेतु स्त्री का अपहरण या प्रलोभन" },
    gist: {
      en: "Kidnapping or abducting a woman with intent that she be compelled to marry against her will, or forced or seduced to illicit intercourse. It is the section registered when a family reports an adult daughter's elopement — and it collapses when she tells the Magistrate she went of her own will.",
      hi: "किसी स्त्री का इस इरादे से अपहरण कि उसे उसकी इच्छा के विरुद्ध विवाह के लिए विवश किया जाए, या अवैध संभोग के लिए बाध्य या बहलाया जाए। जब परिवार वयस्क बेटी के घर से जाने की रिपोर्ट करता है तो यही धारा दर्ज होती है — और जब वह मजिस्ट्रेट को बताती है कि वह अपनी मर्ज़ी से गई, तो यह टिकती नहीं।",
    },
    limbs: [
      {
        sub: "87",
        label: { en: "Kidnapping or abduction to compel marriage", hi: "विवाह के लिए विवश करने हेतु अपहरण" },
        punishment: { en: "Imprisonment up to 10 years, and fine.", hi: "10 वर्ष तक का कारावास, और जुर्माना।" },
        max: 10,
        cognizable: true,
        bailable: false,
        triableBy: S,
        compoundable: null,
      },
    ],
    related: ["/case-law/anticipatory-bail", "/practice/criminal-lawyer-hajipur"],
  },
  {
    code: "bns",
    slug: "137",
    section: "137",
    old: "363",
    chapter: "person",
    title: { en: "Kidnapping", hi: "अपहरण (व्यपहरण)" },
    gist: {
      en: "Kidnapping from India, or from lawful guardianship — taking or enticing a minor (a boy under 18 or a girl under 18) or a person of unsound mind out of the keeping of the lawful guardian without consent.",
      hi: "भारत से अपहरण, या विधिपूर्ण संरक्षकता से — किसी नाबालिग (18 वर्ष से कम) या विकृत-चित्त व्यक्ति को विधिपूर्ण संरक्षक की सहमति के बिना उसकी देखरेख से ले जाना या बहलाना।",
    },
    limbs: [
      {
        sub: "137(2)",
        label: { en: "Kidnapping", hi: "अपहरण" },
        punishment: { en: "Imprisonment up to 7 years, and fine.", hi: "7 वर्ष तक का कारावास, और जुर्माना।" },
        max: 7,
        cognizable: true,
        bailable: false,
        triableBy: M1,
        compoundable: null,
      },
    ],
    related: ["/case-law/anticipatory-bail", "/practice/criminal-lawyer-hajipur"],
  },
  // ===== Offences against property ========================================
  {
    code: "bns",
    slug: "303",
    section: "303",
    old: "379",
    chapter: "property",
    title: { en: "Theft", hi: "चोरी" },
    gist: {
      en: "Dishonestly taking movable property out of a person's possession without consent. Section 303(1) defines it; 303(2) punishes it, with a lighter track for first-time petty theft under ₹5,000 where the property is returned.",
      hi: "किसी के कब्ज़े से उसकी सहमति के बिना बेईमानी से चल संपत्ति ले जाना। धारा 303(1) परिभाषा है; 303(2) दंड है, जिसमें ₹5,000 से कम की पहली छोटी चोरी में संपत्ति लौटाने पर हल्का रास्ता है।",
    },
    limbs: [
      {
        sub: "303(2)",
        label: { en: "Theft", hi: "चोरी" },
        punishment: { en: "Imprisonment up to 3 years, or fine, or both. Second or subsequent conviction: rigorous imprisonment of 1 to 5 years, and fine. First conviction for theft of property under ₹5,000 where the property is returned: community service.", hi: "3 वर्ष तक का कारावास, या जुर्माना, या दोनों। दूसरी या बाद की सज़ा: 1 से 5 वर्ष का कठोर कारावास, और जुर्माना। ₹5,000 से कम की संपत्ति की पहली चोरी में संपत्ति लौटाने पर: सामुदायिक सेवा।" },
        max: 3,
        cognizable: true,
        bailable: false,
        triableBy: ANY,
        compoundable: comp("the owner of the property stolen", "चोरी गई संपत्ति का मालिक"),
      },
    ],
    confusion: {
      en: "Theft in a dwelling house or from a vehicle is section 305 (up to 7 years); snatching is a new offence, section 304 (up to 3 years).",
      hi: "घर या वाहन से चोरी धारा 305 है (7 वर्ष तक); झपटमारी नया अपराध है, धारा 304 (3 वर्ष तक)।",
    },
    related: ["/blog/police-refuse-to-lodge-fir", "/blog/lok-adalat-bihar"],
  },
  {
    code: "bns",
    slug: "308",
    section: "308",
    old: "384",
    chapter: "property",
    title: { en: "Extortion", hi: "जबरन वसूली (उद्दापन)" },
    gist: {
      en: "Intentionally putting a person in fear of injury to themselves or another, and thereby dishonestly inducing them to deliver property, a valuable security or a signed document. Rangdari — protection money demanded under threat — is charged here.",
      hi: "किसी व्यक्ति को स्वयं या किसी और को क्षति के भय में डालकर बेईमानी से संपत्ति, मूल्यवान प्रतिभूति या हस्ताक्षरित दस्तावेज़ दिलवाना। रंगदारी — धमकी देकर माँगी गई रक़म — इसी धारा में लगती है।",
    },
    limbs: [
      {
        sub: "308(2)",
        label: { en: "Extortion", hi: "जबरन वसूली" },
        punishment: { en: "Imprisonment up to 7 years, or fine, or both.", hi: "7 वर्ष तक का कारावास, या जुर्माना, या दोनों।" },
        max: 7,
        cognizable: true,
        bailable: false,
        triableBy: M1,
        compoundable: comp("the person put in fear", "जिस व्यक्ति को भय में डाला गया"),
      },
      {
        sub: "308(3)–(7)",
        label: { en: "Extortion by putting in fear of death or grievous hurt, or of an accusation of a serious offence; extortion under such fear actually committed", hi: "मृत्यु या गंभीर चोट के भय, या गंभीर अपराध के आरोप के भय से जबरन वसूली; ऐसे भय में वास्तव में की गई वसूली" },
        punishment: { en: "From 2 years up to 10 years (the highest limb: imprisonment up to 10 years, and fine).", hi: "2 वर्ष से 10 वर्ष तक (सबसे गंभीर उपधारा: 10 वर्ष तक का कारावास, और जुर्माना)।" },
        max: 10,
        cognizable: true,
        bailable: false,
        triableBy: S,
        compoundable: null,
      },
    ],
    related: ["/case-law/anticipatory-bail", "/blog/police-refuse-to-lodge-fir"],
  },
  {
    code: "bns",
    slug: "309",
    section: "309",
    old: "392",
    chapter: "property",
    title: { en: "Robbery", hi: "लूट" },
    gist: {
      en: "Theft or extortion that involves causing or threatening death, hurt or wrongful restraint in the course of it. Five or more persons together makes it dacoity (section 310).",
      hi: "ऐसी चोरी या जबरन वसूली जिसके दौरान मृत्यु, चोट या सदोष अवरोध कारित किया या धमकाया गया हो। पाँच या अधिक लोग मिलकर करें तो वह डकैती है (धारा 310)।",
    },
    limbs: [
      {
        sub: "309(4)",
        label: { en: "Robbery", hi: "लूट" },
        punishment: { en: "Rigorous imprisonment up to 10 years, and fine.", hi: "10 वर्ष तक का कठोर कारावास, और जुर्माना।" },
        max: 10,
        cognizable: true,
        bailable: false,
        triableBy: M1,
        compoundable: null,
      },
      {
        sub: "309(5)",
        label: { en: "Robbery on a highway between sunset and sunrise", hi: "सूर्यास्त और सूर्योदय के बीच राजमार्ग पर लूट" },
        punishment: { en: "Rigorous imprisonment up to 14 years, and fine.", hi: "14 वर्ष तक का कठोर कारावास, और जुर्माना।" },
        max: 14,
        cognizable: true,
        bailable: false,
        triableBy: M1,
        compoundable: null,
      },
      {
        sub: "309(6)",
        label: { en: "Attempt to commit robbery", hi: "लूट का प्रयास" },
        punishment: { en: "Rigorous imprisonment up to 7 years, and fine.", hi: "7 वर्ष तक का कठोर कारावास, और जुर्माना।" },
        max: 7,
        cognizable: true,
        bailable: false,
        triableBy: M1,
        compoundable: null,
      },
    ],
    related: ["/case-law/anticipatory-bail", "/practice/criminal-lawyer-hajipur"],
  },
  {
    code: "bns",
    slug: "316",
    section: "316",
    old: "406 / 409",
    chapter: "property",
    title: { en: "Criminal breach of trust", hi: "आपराधिक न्यासभंग (अमानत में ख़यानत)" },
    gist: {
      en: "Being entrusted with property and dishonestly misappropriating it or using it in violation of the trust. It needs entrustment first — money handed over as a loan or a price is not entrustment, which is why most business disputes do not fit here.",
      hi: "संपत्ति सौंपे जाने के बाद उसे बेईमानी से हड़प लेना या भरोसे के विरुद्ध इस्तेमाल करना। पहले सौंपा जाना (न्यास) ज़रूरी है — उधार या क़ीमत के रूप में दिया गया पैसा न्यास नहीं है, इसीलिए ज़्यादातर व्यापारिक विवाद इसमें नहीं आते।",
    },
    limbs: [
      {
        sub: "316(2)",
        label: { en: "Criminal breach of trust", hi: "आपराधिक न्यासभंग" },
        punishment: { en: "Imprisonment up to 5 years, or fine, or both.", hi: "5 वर्ष तक का कारावास, या जुर्माना, या दोनों।" },
        max: 5,
        cognizable: true,
        bailable: false,
        triableBy: M1,
        compoundable: comp("the owner of the property", "संपत्ति का मालिक"),
      },
      {
        sub: "316(3)–(4)",
        label: { en: "By a carrier, warehouse-keeper or wharfinger; by a clerk or servant", hi: "वाहक, भंडारगृह रक्षक या घाटपाल द्वारा; लिपिक या सेवक द्वारा" },
        punishment: { en: "Imprisonment up to 7 years, and fine.", hi: "7 वर्ष तक का कारावास, और जुर्माना।" },
        max: 7,
        cognizable: true,
        bailable: false,
        triableBy: M1,
        compoundable: null,
      },
      {
        sub: "316(5)",
        label: { en: "By a public servant, banker, merchant, factor, broker, attorney or agent", hi: "लोक सेवक, बैंकर, व्यापारी, अभिकर्ता, दलाल या वकील द्वारा" },
        punishment: { en: "Imprisonment for life, or imprisonment up to 10 years, and fine.", hi: "आजीवन कारावास, या 10 वर्ष तक का कारावास, और जुर्माना।" },
        max: "life",
        cognizable: true,
        bailable: false,
        triableBy: M1,
        compoundable: null,
      },
    ],
    confusion: {
      en: "BNS 316 is breach of trust, not cheating. Cheating is section 318 — the old 420 is now 318(4). The two are charged together so often that people search for the wrong number.",
      hi: "BNS 316 न्यासभंग है, धोखाधड़ी नहीं। धोखाधड़ी धारा 318 है — पुरानी 420 अब 318(4) है। दोनों इतनी बार साथ लगती हैं कि लोग ग़लत नंबर खोजते हैं।",
    },
    related: ["/case-law/anticipatory-bail", "/case-law/cheque-bounce-section-138"],
  },
  {
    code: "bns",
    slug: "317",
    section: "317",
    old: "411",
    chapter: "property",
    title: { en: "Dishonestly receiving stolen property", hi: "चोरी की संपत्ति बेईमानी से प्राप्त करना" },
    gist: {
      en: "Receiving or retaining stolen property knowing or having reason to believe it is stolen. The section under which the buyer of a stolen motorcycle or phone is booked.",
      hi: "यह जानते हुए या विश्वास का कारण होते हुए कि संपत्ति चोरी की है, उसे लेना या रखना। चोरी की मोटरसाइकिल या फ़ोन खरीदने वाले पर यही धारा लगती है।",
    },
    limbs: [
      {
        sub: "317(2)",
        label: { en: "Dishonestly receiving stolen property", hi: "चोरी की संपत्ति प्राप्त करना" },
        punishment: { en: "Imprisonment up to 3 years, or fine, or both.", hi: "3 वर्ष तक का कारावास, या जुर्माना, या दोनों।" },
        max: 3,
        cognizable: true,
        bailable: false,
        triableBy: ANY,
        compoundable: comp("the owner of the property stolen", "चोरी गई संपत्ति का मालिक"),
      },
      {
        sub: "317(3)–(4)",
        label: { en: "Receiving property stolen in a dacoity; habitually dealing in stolen property", hi: "डकैती में चुराई संपत्ति लेना; चोरी की संपत्ति का आदतन व्यापार" },
        punishment: { en: "Imprisonment for life, or rigorous imprisonment up to 10 years, and fine.", hi: "आजीवन कारावास, या 10 वर्ष तक का कठोर कारावास, और जुर्माना।" },
        max: "life",
        cognizable: true,
        bailable: false,
        triableBy: S,
        compoundable: null,
      },
    ],
    related: ["/case-law/anticipatory-bail", "/blog/first-date-of-a-criminal-case"],
  },
  {
    code: "bns",
    slug: "318",
    section: "318",
    old: "415 / 417 / 420",
    chapter: "property",
    title: { en: "Cheating", hi: "धोखाधड़ी (छल)" },
    gist: {
      en: "Deceiving a person and thereby fraudulently or dishonestly inducing them to deliver property, or to do or omit something they would not otherwise have done, causing damage. The dishonest intention must exist at the time of the promise — a promise honestly made and later broken is a civil breach, not cheating.",
      hi: "किसी को धोखा देकर कपटपूर्वक या बेईमानी से संपत्ति दिलवाना, या ऐसा कुछ करवाना या न करवाना जो वह अन्यथा नहीं करता, जिससे नुक़सान हो। बेईमान इरादा वादे के समय होना चाहिए — ईमानदारी से किया और बाद में टूटा वादा दीवानी मामला है, धोखाधड़ी नहीं।",
    },
    limbs: [
      {
        sub: "318(2)",
        label: { en: "Cheating (simple)", hi: "धोखाधड़ी (साधारण)" },
        punishment: { en: "Imprisonment up to 3 years, or fine, or both.", hi: "3 वर्ष तक का कारावास, या जुर्माना, या दोनों।" },
        max: 3,
        cognizable: false,
        bailable: true,
        triableBy: ANY,
        compoundable: comp("the person cheated", "जिस व्यक्ति के साथ धोखाधड़ी हुई"),
      },
      {
        sub: "318(3)",
        label: { en: "Cheating with knowledge that wrongful loss may be caused to a person whose interest the offender was bound to protect", hi: "यह जानते हुए धोखाधड़ी कि उस व्यक्ति को सदोष हानि हो सकती है जिसके हित की रक्षा अपराधी का दायित्व था" },
        punishment: { en: "Imprisonment up to 5 years, or fine, or both.", hi: "5 वर्ष तक का कारावास, या जुर्माना, या दोनों।" },
        max: 5,
        cognizable: false,
        bailable: true,
        triableBy: ANY,
        compoundable: comp("the person cheated", "जिस व्यक्ति के साथ धोखाधड़ी हुई"),
      },
      {
        sub: "318(4)",
        label: { en: "Cheating and dishonestly inducing delivery of property (the old 420)", hi: "धोखाधड़ी करके बेईमानी से संपत्ति दिलवाना (पुरानी 420)" },
        punishment: { en: "Imprisonment up to 7 years, and fine.", hi: "7 वर्ष तक का कारावास, और जुर्माना।" },
        max: 7,
        cognizable: true,
        bailable: false,
        triableBy: M1,
        compoundable: comp("the person cheated", "जिस व्यक्ति के साथ धोखाधड़ी हुई"),
      },
    ],
    confusion: {
      en: "\"420\" lives on as 318(4). Simple cheating (318(2)) is non-cognizable and bailable; cheating that induces delivery of property (318(4)) is cognizable and non-bailable. Which limb the FIR names decides whether the police can arrest without a warrant.",
      hi: "\"420\" अब 318(4) है। साधारण धोखाधड़ी (318(2)) असंज्ञेय और ज़मानती है; संपत्ति दिलवाने वाली धोखाधड़ी (318(4)) संज्ञेय और अजमानतीय। FIR में कौन सी उपधारा लिखी है, इसी से तय होता है कि पुलिस बिना वारंट गिरफ़्तार कर सकती है या नहीं।",
    },
    related: ["/case-law/cheque-bounce-section-138", "/case-law/anticipatory-bail", "/blog/police-refuse-to-lodge-fir"],
  },
  {
    code: "bns",
    slug: "319",
    section: "319",
    old: "419",
    chapter: "property",
    title: { en: "Cheating by personation", hi: "प्रतिरूपण (किसी और के रूप में) द्वारा धोखाधड़ी" },
    gist: {
      en: "Cheating by pretending to be some other person, or by knowingly substituting one person for another, or representing that you are someone you are not — the section for impersonation frauds, including many online and OTP frauds.",
      hi: "किसी और व्यक्ति होने का दिखावा करके, या जानबूझकर एक व्यक्ति की जगह दूसरे को रखकर, या स्वयं को कोई और बताकर धोखाधड़ी — प्रतिरूपण धोखाधड़ी की धारा, जिसमें कई ऑनलाइन और OTP धोखाधड़ी आती हैं।",
    },
    limbs: [
      {
        sub: "319(2)",
        label: { en: "Cheating by personation", hi: "प्रतिरूपण द्वारा धोखाधड़ी" },
        punishment: { en: "Imprisonment up to 5 years, or fine, or both.", hi: "5 वर्ष तक का कारावास, या जुर्माना, या दोनों।" },
        max: 5,
        cognizable: true,
        bailable: true,
        triableBy: ANY,
        compoundable: comp("the person cheated", "जिस व्यक्ति के साथ धोखाधड़ी हुई"),
      },
    ],
    related: ["/case-law/anticipatory-bail", "/blog/police-refuse-to-lodge-fir"],
  },
  {
    code: "bns",
    slug: "336",
    section: "336",
    old: "463 / 465 / 468",
    chapter: "property",
    title: { en: "Forgery", hi: "जालसाज़ी (कूटरचना)" },
    gist: {
      en: "Making a false document or electronic record with intent to cause damage or injury, to support a claim, to cause a person to part with property, or to commit fraud. The severity depends on the purpose.",
      hi: "नुक़सान या क्षति पहुँचाने, किसी दावे का समर्थन करने, किसी से संपत्ति छुड़ाने, या कपट करने के इरादे से झूठा दस्तावेज़ या इलेक्ट्रॉनिक रिकॉर्ड बनाना। गंभीरता उद्देश्य पर निर्भर है।",
    },
    limbs: [
      {
        sub: "336(2)",
        label: { en: "Forgery", hi: "जालसाज़ी" },
        punishment: { en: "Imprisonment up to 2 years, or fine, or both.", hi: "2 वर्ष तक का कारावास, या जुर्माना, या दोनों।" },
        max: 2,
        cognizable: false,
        bailable: true,
        triableBy: M1,
        compoundable: null,
      },
      {
        sub: "336(3)",
        label: { en: "Forgery for the purpose of cheating", hi: "धोखाधड़ी के उद्देश्य से जालसाज़ी" },
        punishment: { en: "Imprisonment up to 7 years, and fine.", hi: "7 वर्ष तक का कारावास, और जुर्माना।" },
        max: 7,
        cognizable: true,
        bailable: false,
        triableBy: M1,
        compoundable: null,
      },
      {
        sub: "336(4)",
        label: { en: "Forgery for the purpose of harming reputation", hi: "प्रतिष्ठा को हानि पहुँचाने के उद्देश्य से जालसाज़ी" },
        punishment: { en: "Imprisonment up to 3 years, and fine.", hi: "3 वर्ष तक का कारावास, और जुर्माना।" },
        max: 3,
        cognizable: true,
        bailable: true,
        triableBy: M1,
        compoundable: null,
      },
    ],
    related: ["/blog/police-refuse-to-lodge-fir", "/practice/property-lawyer-hajipur"],
  },
  {
    code: "bns",
    slug: "338",
    section: "338",
    old: "467",
    chapter: "property",
    title: { en: "Forgery of a valuable security, will or authority to adopt", hi: "मूल्यवान प्रतिभूति, वसीयत या दत्तक-अधिकार की जालसाज़ी" },
    gist: {
      en: "Forging a document that purports to be a valuable security, a will, an authority to adopt a son, or one giving authority to receive or transfer money or property — the section in every forged sale deed (kewala) and forged will dispute in Bihar.",
      hi: "ऐसे दस्तावेज़ की जालसाज़ी जो मूल्यवान प्रतिभूति, वसीयत, पुत्र गोद लेने का अधिकार, या धन-संपत्ति प्राप्त या हस्तांतरित करने का अधिकार होने का दावा करता हो — बिहार में हर जाली केवाला और जाली वसीयत विवाद की धारा।",
    },
    limbs: [
      {
        sub: "338",
        label: { en: "Forgery of a valuable security or will", hi: "मूल्यवान प्रतिभूति या वसीयत की जालसाज़ी" },
        punishment: { en: "Imprisonment for life, or imprisonment up to 10 years, and fine.", hi: "आजीवन कारावास, या 10 वर्ष तक का कारावास, और जुर्माना।" },
        max: "life",
        cognizable: false,
        bailable: false,
        triableBy: M1,
        compoundable: null,
      },
    ],
    confusion: {
      en: "On the Schedule this section is non-cognizable, as IPC 467 was. In practice an FIR over a forged deed is registered with 336(3) and 340(2) (using a forged document as genuine), which are cognizable, so the police investigate all three together.",
      hi: "अनुसूची में यह धारा असंज्ञेय है, जैसे IPC 467 थी। व्यवहार में जाली दस्तावेज़ की FIR 336(3) और 340(2) (जाली दस्तावेज़ को असली बताकर इस्तेमाल) के साथ दर्ज होती है, जो संज्ञेय हैं, इसलिए पुलिस तीनों की जाँच साथ करती है।",
    },
    related: ["/practice/property-lawyer-hajipur", "/case-law/partition-and-ancestral-property", "/checklists/property-dispute"],
  },
  // ===== General principles and public order ==============================
  {
    code: "bns",
    slug: "3-5",
    section: "3(5)",
    old: "34",
    chapter: "general",
    title: { en: "Act done by several persons in furtherance of common intention", hi: "सामान्य आशय से कई व्यक्तियों द्वारा किया गया कृत्य" },
    gist: {
      en: "When a criminal act is done by several persons in furtherance of a common intention, each is liable as if they had done it alone. It is a rule of joint liability, not an offence — it is always read with another section (\"103 read with 3(5)\").",
      hi: "जब कोई आपराधिक कृत्य कई व्यक्तियों द्वारा सामान्य आशय से किया जाए, तो हर व्यक्ति ऐसे उत्तरदायी है मानो उसने अकेले किया हो। यह संयुक्त दायित्व का नियम है, अपराध नहीं — हमेशा किसी और धारा के साथ पढ़ी जाती है (\"103 सहपठित 3(5)\")।",
    },
    limbs: [
      {
        sub: "3(5)",
        label: { en: "Common intention", hi: "सामान्य आशय" },
        punishment: { en: "No punishment of its own — each participant is punished as for the principal offence.", hi: "अपनी कोई सज़ा नहीं — हर सहभागी को मूल अपराध की सज़ा मिलती है।" },
        max: null,
        cognizable: null,
        bailable: null,
        triableBy: "follows",
        compoundable: null,
      },
    ],
    confusion: {
      en: "A prior meeting of minds is required, even if formed on the spot. Mere presence at the scene is not common intention — and it is the ground on which relatives named in a family FIR are most often discharged.",
      hi: "पहले से मन मिलना ज़रूरी है, भले ही मौक़े पर बना हो। केवल घटनास्थल पर मौजूद होना सामान्य आशय नहीं — और पारिवारिक FIR में नामज़द रिश्तेदार अक्सर इसी आधार पर उन्मोचित होते हैं।",
    },
    related: ["/blog/first-date-of-a-criminal-case", "/case-law/anticipatory-bail"],
  },
  {
    code: "bns",
    slug: "61",
    section: "61",
    old: "120B",
    chapter: "general",
    title: { en: "Criminal conspiracy", hi: "आपराधिक षड्यंत्र" },
    gist: {
      en: "An agreement between two or more persons to do an illegal act, or a legal act by illegal means. Where the object is an offence, no overt act is needed beyond the agreement.",
      hi: "दो या अधिक व्यक्तियों के बीच कोई अवैध कार्य, या वैध कार्य अवैध साधनों से, करने का समझौता। जहाँ उद्देश्य अपराध हो, समझौते के अलावा किसी प्रत्यक्ष कृत्य की ज़रूरत नहीं।",
    },
    limbs: [
      {
        sub: "61(2)(a)",
        label: { en: "Conspiracy to commit an offence punishable with death, life imprisonment or rigorous imprisonment of 2 years or more", hi: "मृत्युदंड, आजीवन कारावास या 2 वर्ष या अधिक के कठोर कारावास से दंडनीय अपराध का षड्यंत्र" },
        punishment: { en: "Punished as an abettor of that offence — the same punishment as the offence.", hi: "उस अपराध के दुष्प्रेरक के रूप में दंडित — अपराध के बराबर सज़ा।" },
        max: null,
        cognizable: null,
        bailable: null,
        triableBy: "follows",
        compoundable: null,
      },
      {
        sub: "61(2)(b)",
        label: { en: "Any other criminal conspiracy", hi: "कोई अन्य आपराधिक षड्यंत्र" },
        punishment: { en: "Imprisonment up to 6 months, or fine, or both.", hi: "6 माह तक का कारावास, या जुर्माना, या दोनों।" },
        max: 0.5,
        cognizable: false,
        bailable: true,
        triableBy: M1,
        compoundable: null,
      },
    ],
    related: ["/case-law/anticipatory-bail", "/practice/criminal-lawyer-hajipur"],
  },
  {
    code: "bns",
    slug: "189",
    section: "189",
    old: "141 / 143",
    chapter: "order",
    title: { en: "Unlawful assembly", hi: "विधिविरुद्ध जमाव" },
    gist: {
      en: "An assembly of five or more persons with a common object of overawing the government by force, resisting the execution of law, committing mischief or criminal trespass, taking possession of property by force, or compelling a person by force. Being a member is itself the offence.",
      hi: "पाँच या अधिक व्यक्तियों का ऐसा जमाव जिसका सामान्य उद्देश्य बल से सरकार को डराना, क़ानून के निष्पादन का प्रतिरोध, रिष्टि या आपराधिक अतिचार, बल से संपत्ति पर कब्ज़ा, या किसी को बल से विवश करना हो। सदस्य होना ही अपराध है।",
    },
    limbs: [
      {
        sub: "189(2)",
        label: { en: "Being a member of an unlawful assembly", hi: "विधिविरुद्ध जमाव का सदस्य होना" },
        punishment: { en: "Imprisonment up to 6 months, or fine, or both.", hi: "6 माह तक का कारावास, या जुर्माना, या दोनों।" },
        max: 0.5,
        cognizable: true,
        bailable: true,
        triableBy: ANY,
        compoundable: null,
      },
      {
        sub: "189(3)–(4)",
        label: { en: "Joining armed with a deadly weapon; joining or continuing after it has been commanded to disperse", hi: "घातक हथियार के साथ शामिल होना; तितर-बितर होने के आदेश के बाद शामिल होना या बने रहना" },
        punishment: { en: "Imprisonment up to 2 years, or fine, or both.", hi: "2 वर्ष तक का कारावास, या जुर्माना, या दोनों।" },
        max: 2,
        cognizable: true,
        bailable: true,
        triableBy: ANY,
        compoundable: null,
      },
    ],
    related: ["/blog/first-date-of-a-criminal-case", "/practice/criminal-lawyer-hajipur"],
  },
  {
    code: "bns",
    slug: "190",
    section: "190",
    old: "149",
    chapter: "order",
    title: { en: "Every member of an unlawful assembly guilty of an offence committed in prosecution of its common object", hi: "सामान्य उद्देश्य के लिए किए गए अपराध का हर सदस्य दोषी" },
    gist: {
      en: "If an offence is committed by any member of an unlawful assembly in prosecution of its common object, every person who was a member at the time is guilty of that offence. Like 3(5), it is a rule of joint liability read with the offence section.",
      hi: "यदि विधिविरुद्ध जमाव के किसी सदस्य द्वारा उसके सामान्य उद्देश्य की पूर्ति में कोई अपराध किया जाए, तो उस समय का हर सदस्य उस अपराध का दोषी है। 3(5) की तरह यह संयुक्त दायित्व का नियम है, जो अपराध की धारा के साथ पढ़ा जाता है।",
    },
    limbs: [
      {
        sub: "190",
        label: { en: "Constructive liability of members", hi: "सदस्यों का रचनात्मक दायित्व" },
        punishment: { en: "As for the offence committed.", hi: "किए गए अपराध के अनुसार।" },
        max: null,
        cognizable: null,
        bailable: null,
        triableBy: "follows",
        compoundable: null,
      },
    ],
    confusion: {
      en: "The commonest omnibus charge in Bihar land and village disputes: \"191, 190, 115, 351 read with 3(5)\". Membership must be proved for each accused; a general allegation against a whole family is where these cases fail.",
      hi: "बिहार के ज़मीन और गाँव के झगड़ों में सबसे आम सामूहिक आरोप: \"191, 190, 115, 351 सहपठित 3(5)\"। हर अभियुक्त की सदस्यता साबित करनी होती है; पूरे परिवार पर सामान्य आरोप वहीं टूटता है।",
    },
    related: ["/blog/first-date-of-a-criminal-case", "/practice/criminal-lawyer-hajipur"],
  },
  {
    code: "bns",
    slug: "191",
    section: "191",
    old: "146 / 147 / 148",
    chapter: "order",
    title: { en: "Rioting", hi: "बलवा (दंगा)" },
    gist: {
      en: "Force or violence used by an unlawful assembly or any member of it in prosecution of the common object. Every member is guilty of rioting; being armed with a deadly weapon aggravates it.",
      hi: "विधिविरुद्ध जमाव या उसके किसी सदस्य द्वारा सामान्य उद्देश्य की पूर्ति में बल या हिंसा का प्रयोग। हर सदस्य बलवे का दोषी है; घातक हथियार से लैस होना इसे गंभीर बनाता है।",
    },
    limbs: [
      {
        sub: "191(2)",
        label: { en: "Rioting", hi: "बलवा" },
        punishment: { en: "Imprisonment up to 2 years, or fine, or both.", hi: "2 वर्ष तक का कारावास, या जुर्माना, या दोनों।" },
        max: 2,
        cognizable: true,
        bailable: true,
        triableBy: ANY,
        compoundable: null,
      },
      {
        sub: "191(3)",
        label: { en: "Rioting armed with a deadly weapon", hi: "घातक हथियार से लैस होकर बलवा" },
        punishment: { en: "Imprisonment up to 5 years, or fine, or both.", hi: "5 वर्ष तक का कारावास, या जुर्माना, या दोनों।" },
        max: 5,
        cognizable: true,
        bailable: false,
        triableBy: M1,
        compoundable: null,
      },
    ],
    related: ["/blog/first-date-of-a-criminal-case", "/case-law/anticipatory-bail"],
  },
  {
    code: "bns",
    slug: "196",
    section: "196",
    old: "153A",
    chapter: "order",
    title: { en: "Promoting enmity between groups on grounds of religion, race, place of birth, residence, language, caste or community", hi: "धर्म, जाति, जन्मस्थान, निवास, भाषा या समुदाय के आधार पर समूहों के बीच शत्रुता फैलाना" },
    gist: {
      en: "By words, signs, visible representations or electronic communication, promoting disharmony or feelings of enmity, hatred or ill-will between groups, or organising activity that trains people to use force against a group. The section most social-media hate-speech FIRs are registered under.",
      hi: "शब्दों, संकेतों, दृश्य प्रस्तुतियों या इलेक्ट्रॉनिक संचार से समूहों के बीच वैमनस्य या शत्रुता, घृणा या दुर्भावना फैलाना, या किसी समूह के विरुद्ध बल-प्रयोग का प्रशिक्षण देने वाली गतिविधि आयोजित करना। सोशल मीडिया पर नफ़रत फैलाने वाले भाषण की अधिकांश FIR इसी धारा में दर्ज होती हैं।",
    },
    limbs: [
      {
        sub: "196(1)",
        label: { en: "Promoting enmity between groups", hi: "समूहों के बीच शत्रुता फैलाना" },
        punishment: { en: "Imprisonment up to 3 years, or fine, or both.", hi: "3 वर्ष तक का कारावास, या जुर्माना, या दोनों।" },
        max: 3,
        cognizable: true,
        bailable: false,
        triableBy: M1,
        compoundable: null,
      },
      {
        sub: "196(2)",
        label: { en: "The same offence committed in a place of worship or a religious assembly", hi: "पूजा स्थल या धार्मिक सभा में वही अपराध" },
        punishment: { en: "Imprisonment up to 5 years, and fine.", hi: "5 वर्ष तक का कारावास, और जुर्माना।" },
        max: 5,
        cognizable: true,
        bailable: false,
        triableBy: M1,
        compoundable: null,
      },
    ],
    related: ["/case-law/anticipatory-bail", "/case-law/patna-high-court"],
  },
  {
    code: "bns",
    slug: "221",
    section: "221",
    old: "186",
    chapter: "order",
    title: { en: "Obstructing a public servant in the discharge of public functions", hi: "लोक सेवक को उसके कर्तव्य में बाधा डालना" },
    gist: {
      en: "Voluntarily obstructing any public servant in the discharge of their public functions — the section added when an encroachment drive, a raid or a survey team is resisted.",
      hi: "किसी लोक सेवक को उसके लोक कर्तव्यों के निर्वहन में जानबूझकर बाधा डालना — अतिक्रमण हटाने, छापे या सर्वे टीम का विरोध होने पर जोड़ी जाने वाली धारा।",
    },
    limbs: [
      {
        sub: "221",
        label: { en: "Obstructing a public servant", hi: "लोक सेवक को बाधा" },
        punishment: { en: "Imprisonment up to 3 months, or fine up to ₹2,500, or both.", hi: "3 माह तक का कारावास, या ₹2,500 तक जुर्माना, या दोनों।" },
        max: 0.25,
        cognizable: false,
        bailable: true,
        triableBy: ANY,
        compoundable: null,
      },
    ],
    confusion: {
      en: "Non-cognizable: the police cannot investigate it without a Magistrate's order, and a court can take cognizance only on a complaint by the public servant concerned or their superior (BNSS 215). An FIR that carries only 221 is on thin ice — which is why 132 (assault to deter a public servant, cognizable) is usually added.",
      hi: "असंज्ञेय: पुलिस मजिस्ट्रेट के आदेश के बिना जाँच नहीं कर सकती, और अदालत केवल संबंधित लोक सेवक या उसके वरिष्ठ की शिकायत पर संज्ञान ले सकती है (BNSS 215)। केवल 221 वाली FIR कमज़ोर होती है — इसीलिए प्रायः 132 (लोक सेवक को रोकने के लिए हमला, संज्ञेय) जोड़ी जाती है।",
    },
    related: ["/blog/bihar-land-survey-documents", "/blog/first-date-of-a-criminal-case"],
  },
  {
    code: "bns",
    slug: "223",
    section: "223",
    old: "188",
    chapter: "order",
    title: { en: "Disobedience to an order duly promulgated by a public servant", hi: "लोक सेवक द्वारा विधिवत घोषित आदेश की अवज्ञा" },
    gist: {
      en: "Disobeying an order lawfully promulgated by a public servant — most often a BNSS 163 prohibitory order (the old \"dhara 144\") — knowing of it, where the disobedience causes or tends to cause obstruction, annoyance, injury or a risk to life, health or safety.",
      hi: "लोक सेवक द्वारा विधिपूर्वक घोषित आदेश — प्रायः BNSS 163 का निषेधाज्ञा आदेश (पुरानी \"धारा 144\") — की जानकारी होते हुए अवज्ञा, जहाँ अवज्ञा से बाधा, क्षोभ, क्षति या जीवन, स्वास्थ्य या सुरक्षा को खतरा हो या होने की प्रवृत्ति हो।",
    },
    limbs: [
      {
        sub: "223(a)",
        label: { en: "Disobedience causing or tending to cause obstruction, annoyance or injury", hi: "बाधा, क्षोभ या क्षति कारित करने वाली अवज्ञा" },
        punishment: { en: "Simple imprisonment up to 6 months, or fine up to ₹2,500, or both.", hi: "6 माह तक का साधारण कारावास, या ₹2,500 तक जुर्माना, या दोनों।" },
        max: 0.5,
        cognizable: true,
        bailable: true,
        triableBy: ANY,
        compoundable: null,
      },
      {
        sub: "223(b)",
        label: { en: "Disobedience causing or tending to cause danger to human life, health or safety, or a riot or affray", hi: "मानव जीवन, स्वास्थ्य या सुरक्षा को खतरा, या दंगा या मारपीट कारित करने वाली अवज्ञा" },
        punishment: { en: "Imprisonment up to 1 year, or fine up to ₹5,000, or both.", hi: "1 वर्ष तक का कारावास, या ₹5,000 तक जुर्माना, या दोनों।" },
        max: 1,
        cognizable: true,
        bailable: true,
        triableBy: ANY,
        compoundable: null,
      },
    ],
    confusion: {
      en: "Like 221, cognizance needs a complaint in writing by the public servant concerned (BNSS 215); a police charge sheet alone is not enough, and prosecutions under the old 188 were routinely quashed for that reason.",
      hi: "221 की तरह, संज्ञान के लिए संबंधित लोक सेवक की लिखित शिकायत ज़रूरी है (BNSS 215); केवल पुलिस की चार्जशीट पर्याप्त नहीं, और पुरानी 188 के मुक़दमे इसी कारण नियमित रूप से रद्द होते थे।",
    },
    related: ["/bnss/163", "/blog/first-date-of-a-criminal-case"],
  },
  {
    code: "bns",
    slug: "281",
    section: "281",
    old: "279",
    chapter: "order",
    title: { en: "Rash driving or riding on a public way", hi: "सार्वजनिक मार्ग पर उतावली या लापरवाही से वाहन चलाना" },
    gist: {
      en: "Driving or riding any vehicle on a public way in a manner so rash or negligent as to endanger human life or be likely to cause hurt or injury. Charged in almost every accident FIR, with 125 (act endangering life) where someone is hurt and 106 where someone dies.",
      hi: "सार्वजनिक मार्ग पर किसी वाहन को इतने उतावले या लापरवाह ढंग से चलाना कि मानव जीवन खतरे में पड़े या चोट लगने की संभावना हो। लगभग हर दुर्घटना की FIR में लगती है — चोट लगने पर 125 के साथ और मृत्यु होने पर 106 के साथ।",
    },
    limbs: [
      {
        sub: "281",
        label: { en: "Rash driving", hi: "उतावली गाड़ी चलाना" },
        punishment: { en: "Imprisonment up to 6 months, or fine up to ₹1,000, or both.", hi: "6 माह तक का कारावास, या ₹1,000 तक जुर्माना, या दोनों।" },
        max: 0.5,
        cognizable: true,
        bailable: true,
        triableBy: ANY,
        compoundable: null,
      },
    ],
    related: ["/tools/limitation-checker", "/practice/criminal-lawyer-hajipur"],
  },
  {
    code: "bns",
    slug: "302",
    section: "302",
    old: "298",
    chapter: "order",
    title: { en: "Uttering words etc. with deliberate intent to wound religious feelings", hi: "धार्मिक भावनाओं को ठेस पहुँचाने के जानबूझकर इरादे से शब्द कहना" },
    gist: {
      en: "Uttering a word, making a sound or gesture, or placing an object in the sight of a person with the deliberate intention of wounding their religious feelings. This is what section 302 means under the BNS. It is not murder.",
      hi: "किसी व्यक्ति की धार्मिक भावनाओं को ठेस पहुँचाने के जानबूझकर इरादे से कोई शब्द कहना, आवाज़ या इशारा करना, या कोई वस्तु उसकी दृष्टि में रखना। BNS में धारा 302 का यही अर्थ है। यह हत्या नहीं है।",
    },
    limbs: [
      {
        sub: "302",
        label: { en: "Wounding religious feelings", hi: "धार्मिक भावनाओं को ठेस" },
        punishment: { en: "Imprisonment up to 1 year, or fine, or both.", hi: "1 वर्ष तक का कारावास, या जुर्माना, या दोनों।" },
        max: 1,
        cognizable: false,
        bailable: true,
        triableBy: ANY,
        compoundable: comp("the person whose religious feelings are intended to be wounded", "जिस व्यक्ति की धार्मिक भावनाओं को ठेस पहुँचाने का इरादा था"),
      },
    ],
    confusion: {
      en: "If you were told a case is \"under 302\" and it is about a death, the section is BNS 103 (murder). Press reports written from the 2023 Bill's draft numbering still circulate with the wrong numbers.",
      hi: "यदि आपको बताया गया कि मामला \"302 में\" है और वह किसी मृत्यु का है, तो धारा BNS 103 (हत्या) है। 2023 के विधेयक के मसौदे की नंबरिंग से लिखी प्रेस रिपोर्टें अब भी ग़लत नंबरों के साथ घूम रही हैं।",
    },
    related: ["/bns/103", "/tools/ipc-to-bns-converter"],
  },
  {
    code: "bns",
    slug: "351",
    section: "351",
    old: "503 / 506",
    chapter: "order",
    title: { en: "Criminal intimidation", hi: "आपराधिक अभित्रास (धमकी)" },
    gist: {
      en: "Threatening a person with injury to their person, reputation or property (or to someone they care about) to cause alarm, or to make them do or omit something. The dhamki section, added to most family, land and neighbour FIRs.",
      hi: "किसी व्यक्ति को उसके शरीर, प्रतिष्ठा या संपत्ति (या उसके किसी प्रियजन) को क्षति की धमकी देना ताकि वह भयभीत हो, या कुछ करे या न करे। धमकी की धारा, जो अधिकांश पारिवारिक, ज़मीन और पड़ोसी विवादों की FIR में जोड़ी जाती है।",
    },
    limbs: [
      {
        sub: "351(2)",
        label: { en: "Criminal intimidation", hi: "आपराधिक अभित्रास" },
        punishment: { en: "Imprisonment up to 2 years, or fine, or both.", hi: "2 वर्ष तक का कारावास, या जुर्माना, या दोनों।" },
        max: 2,
        cognizable: false,
        bailable: true,
        triableBy: ANY,
        compoundable: comp("the person intimidated", "जिस व्यक्ति को धमकाया गया"),
      },
      {
        sub: "351(3)",
        label: { en: "Threat to cause death or grievous hurt, destruction of property by fire, an offence punishable with death, life or 7 years, or to impute unchastity to a woman", hi: "मृत्यु या गंभीर चोट, आग से संपत्ति के विनाश, मृत्युदंड/आजीवन/7 वर्ष से दंडनीय अपराध की धमकी, या स्त्री पर अपवित्रता का लांछन" },
        punishment: { en: "Imprisonment up to 7 years, or fine, or both.", hi: "7 वर्ष तक का कारावास, या जुर्माना, या दोनों।" },
        max: 7,
        cognizable: false,
        bailable: true,
        triableBy: M1,
        compoundable: comp("the person intimidated", "जिस व्यक्ति को धमकाया गया"),
      },
      {
        sub: "351(4)",
        label: { en: "Criminal intimidation by anonymous communication", hi: "गुमनाम संदेश से आपराधिक अभित्रास" },
        punishment: { en: "Imprisonment up to 2 years, in addition to the punishment above.", hi: "ऊपर की सज़ा के अतिरिक्त 2 वर्ष तक का कारावास।" },
        max: 2,
        cognizable: false,
        bailable: true,
        triableBy: ANY,
        compoundable: null,
      },
    ],
    confusion: {
      en: "Non-cognizable on the Schedule even at its 7-year limb — in Bihar it is investigated because it rides on a cognizable section in the same FIR. Standing alone, it goes by complaint to the Magistrate.",
      hi: "अनुसूची में 7 वर्ष वाली उपधारा में भी असंज्ञेय — बिहार में इसकी जाँच इसलिए होती है क्योंकि यह उसी FIR की किसी संज्ञेय धारा के साथ चलती है। अकेले होने पर मजिस्ट्रेट के पास परिवाद से जाती है।",
    },
    related: ["/blog/police-refuse-to-lodge-fir", "/blog/lok-adalat-bihar"],
  },
  {
    code: "bns",
    slug: "352",
    section: "352",
    old: "504",
    chapter: "order",
    title: { en: "Intentional insult with intent to provoke a breach of the peace", hi: "शांति भंग कराने के इरादे से जानबूझकर अपमान" },
    gist: {
      en: "Intentionally insulting a person, thereby provoking them, intending or knowing it likely that the provocation will cause them to break the public peace or commit another offence. Gali-galauj — abuse — is charged here, usually with 351.",
      hi: "किसी व्यक्ति का जानबूझकर अपमान करके उसे भड़काना, यह इरादा या जानकारी रखते हुए कि इससे वह शांति भंग करेगा या कोई अन्य अपराध करेगा। गाली-गलौज इसी धारा में लगती है, प्रायः 351 के साथ।",
    },
    limbs: [
      {
        sub: "352",
        label: { en: "Intentional insult", hi: "जानबूझकर अपमान" },
        punishment: { en: "Imprisonment up to 2 years, or fine, or both.", hi: "2 वर्ष तक का कारावास, या जुर्माना, या दोनों।" },
        max: 2,
        cognizable: false,
        bailable: true,
        triableBy: ANY,
        compoundable: comp("the person insulted", "जिस व्यक्ति का अपमान हुआ"),
      },
    ],
    related: ["/blog/lok-adalat-bihar", "/blog/police-refuse-to-lodge-fir"],
  },
  {
    code: "bns",
    slug: "356",
    section: "356",
    old: "499 / 500",
    chapter: "order",
    title: { en: "Defamation", hi: "मानहानि" },
    gist: {
      en: "Making or publishing an imputation about a person, by words, signs or visible representation, intending or knowing it will harm their reputation — subject to ten exceptions including truth for the public good, fair comment and good-faith accusation to a lawful authority.",
      hi: "किसी व्यक्ति के बारे में शब्दों, संकेतों या दृश्य प्रस्तुति से ऐसा लांछन लगाना या प्रकाशित करना, जिससे उसकी प्रतिष्ठा को हानि पहुँचाने का इरादा या जानकारी हो — दस अपवादों के अधीन, जिनमें लोकहित में सत्य, निष्पक्ष टिप्पणी और वैध प्राधिकारी को सद्भावपूर्ण शिकायत शामिल हैं।",
    },
    limbs: [
      {
        sub: "356(2)",
        label: { en: "Defamation", hi: "मानहानि" },
        punishment: { en: "Simple imprisonment up to 2 years, or fine, or both, or community service.", hi: "2 वर्ष तक का साधारण कारावास, या जुर्माना, या दोनों, या सामुदायिक सेवा।" },
        max: 2,
        cognizable: false,
        bailable: true,
        triableBy: M1,
        compoundable: comp("the person defamed", "जिस व्यक्ति की मानहानि हुई"),
      },
    ],
    confusion: {
      en: "No FIR: defamation is prosecuted only on a complaint by the person defamed before a Magistrate (BNSS 222), within 3 years of the publication. A civil suit for damages is the other route, and the two can run together.",
      hi: "FIR नहीं: मानहानि का मुक़दमा केवल पीड़ित व्यक्ति के मजिस्ट्रेट के समक्ष परिवाद पर चलता है (BNSS 222), प्रकाशन के 3 वर्ष के भीतर। क्षतिपूर्ति का दीवानी वाद दूसरा रास्ता है, और दोनों साथ चल सकते हैं।",
    },
    related: ["/tools/limitation-checker", "/tools/court-fee-calculator"],
  },
  // ===== BNSS — procedure people search by the old CrPC number ============
  {
    code: "bnss",
    slug: "163",
    section: "163",
    old: "144",
    oldCode: "CrPC",
    chapter: "bnss",
    procedural: true,
    title: { en: "Power to issue orders in urgent cases of nuisance or apprehended danger (the old \"dhara 144\")", hi: "न्यूसेंस या आशंकित खतरे के अत्यावश्यक मामलों में आदेश देने की शक्ति (पुरानी \"धारा 144\")" },
    gist: {
      en: "A District Magistrate, Sub-Divisional Magistrate or any executive magistrate empowered by the State may direct a person, or the public in an area, to abstain from an act or to take an order with property — where immediate action is needed to prevent obstruction, annoyance, injury, danger to life, health or safety, or a disturbance of public tranquillity or a riot. It is the order behind every \"dhara 144 lagu\" during exams, festivals, elections and land disputes.",
      hi: "ज़िला मजिस्ट्रेट, अनुमंडल मजिस्ट्रेट या राज्य द्वारा सशक्त कोई कार्यपालक मजिस्ट्रेट किसी व्यक्ति या किसी क्षेत्र की जनता को किसी कार्य से विरत रहने या संपत्ति के संबंध में कोई व्यवस्था करने का निर्देश दे सकता है — जहाँ बाधा, क्षोभ, क्षति, जीवन-स्वास्थ्य-सुरक्षा को खतरा, या लोक शांति भंग या दंगे को रोकने के लिए तत्काल कार्रवाई ज़रूरी हो। परीक्षा, त्योहार, चुनाव और ज़मीन विवाद में हर \"धारा 144 लागू\" के पीछे यही आदेश है।",
    },
    points: {
      en: [
        "An order lasts at most 2 months from the date it is made; the State Government may extend it up to 6 months in all where needed for human life, health or safety, or to prevent a riot.",
        "Disobeying it is an offence under BNS 223 — up to 6 months (or 1 year where the disobedience endangers life or causes a riot).",
        "A person affected may apply to the Magistrate to rescind or alter the order and is entitled to be heard; the order must give reasons if the application is rejected. A writ to the Patna High Court lies against a blanket or unreasoned order.",
        "It is not a curfew, and it is not the section for a land dispute between two parties — that is BNSS 164 (the old 145), which lets the Magistrate attach the disputed land and decide who was in possession.",
      ],
      hi: [
        "आदेश बनने की तारीख़ से अधिकतम 2 माह तक चलता है; मानव जीवन, स्वास्थ्य, सुरक्षा या दंगा रोकने के लिए राज्य सरकार इसे कुल 6 माह तक बढ़ा सकती है।",
        "इसकी अवज्ञा BNS 223 में अपराध है — 6 माह तक (जीवन को खतरा या दंगा होने पर 1 वर्ष तक)।",
        "प्रभावित व्यक्ति मजिस्ट्रेट से आदेश रद्द या बदलने का आवेदन कर सकता है और सुनवाई का हक़दार है; आवेदन ख़ारिज हो तो कारण देने होंगे। सामूहिक या बिना कारण के आदेश के विरुद्ध पटना हाई कोर्ट में रिट होती है।",
        "यह कर्फ़्यू नहीं है, और दो पक्षों के ज़मीन विवाद की धारा भी नहीं — वह BNSS 164 (पुरानी 145) है, जिसमें मजिस्ट्रेट विवादित ज़मीन कुर्क कर यह तय करता है कि कब्ज़ा किसका था।",
      ],
    },
    confusion: {
      en: "The number 144 now belongs to maintenance in the BNSS (the old 125). A prohibitory order is BNSS 163.",
      hi: "BNSS में नंबर 144 अब भरण-पोषण का है (पुरानी 125)। निषेधाज्ञा BNSS 163 है।",
    },
    faqs: {
      en: [
        { q: "What is dhara 144 called now?", a: "BNSS section 163. The Code of Criminal Procedure was replaced on 1 July 2024 by the Bharatiya Nagarik Suraksha Sanhita, and the prohibitory-order power moved from section 144 to section 163. Section 144 of the BNSS is now the maintenance provision, the old 125." },
        { q: "How long does a 163 order last?", a: "At most two months from the date it is made. The State Government can extend it by notification, but the total cannot exceed six months, and only where necessary to prevent danger to human life, health or safety, or a riot." },
        { q: "What happens if I break a 163 order?", a: "You can be prosecuted under BNS 223 for disobeying an order promulgated by a public servant: up to six months' simple imprisonment or a fine of ₹2,500, rising to one year or ₹5,000 where the disobedience endangers life or causes a riot. Cognizance needs a written complaint by the public servant concerned." },
        { q: "Can a 163 order be challenged?", a: "Yes. Apply to the Magistrate who made it to rescind or alter it — you must be heard, and reasons must be recorded if you are refused. A blanket order without reasons can be challenged by writ in the Patna High Court; the Supreme Court in Anuradha Bhasin (2020) held such orders must be proportionate and reasoned." },
      ],
      hi: [
        { q: "धारा 144 को अब क्या कहते हैं?", a: "BNSS की धारा 163। 1 जुलाई 2024 को दंड प्रक्रिया संहिता की जगह भारतीय नागरिक सुरक्षा संहिता आई, और निषेधाज्ञा की शक्ति धारा 144 से धारा 163 में चली गई। BNSS की धारा 144 अब भरण-पोषण की है, यानी पुरानी 125।" },
        { q: "163 का आदेश कितने समय तक चलता है?", a: "बनने की तारीख़ से अधिकतम दो माह। राज्य सरकार अधिसूचना से बढ़ा सकती है, पर कुल छह माह से अधिक नहीं, और केवल मानव जीवन, स्वास्थ्य, सुरक्षा या दंगा रोकने के लिए।" },
        { q: "163 का आदेश तोड़ने पर क्या होगा?", a: "BNS 223 में लोक सेवक के आदेश की अवज्ञा का मुक़दमा: छह माह तक साधारण कारावास या ₹2,500 जुर्माना; जीवन को खतरा या दंगा होने पर एक वर्ष या ₹5,000। संज्ञान के लिए संबंधित लोक सेवक की लिखित शिकायत ज़रूरी है।" },
        { q: "क्या 163 के आदेश को चुनौती दी जा सकती है?", a: "हाँ। जिस मजिस्ट्रेट ने आदेश दिया, उसे रद्द या बदलने का आवेदन दें — सुनवाई ज़रूरी है, और इनकार पर कारण दर्ज करने होंगे। बिना कारण के सामूहिक आदेश के विरुद्ध पटना हाई कोर्ट में रिट होती है; सुप्रीम कोर्ट ने अनुराधा भसीन (2020) में कहा कि ऐसे आदेश आनुपातिक और सकारण होने चाहिए।" },
      ],
    },
    related: ["/bns/223", "/bnss/144", "/tools/ipc-to-bns-converter"],
  },
  {
    code: "bnss",
    slug: "144",
    section: "144",
    old: "125",
    oldCode: "CrPC",
    chapter: "bnss",
    procedural: true,
    title: { en: "Order for maintenance of wives, children and parents (the old 125)", hi: "पत्नी, बच्चों और माता-पिता के भरण-पोषण का आदेश (पुरानी 125)" },
    gist: {
      en: "A person with sufficient means who neglects or refuses to maintain their wife (including a divorced wife who has not remarried), a legitimate or illegitimate minor child, an adult child unable to maintain themselves through disability, or a father or mother, can be ordered by a Magistrate of the first class to pay a monthly allowance. It is the fastest maintenance remedy in India and the one the Family Court at Hajipur hears most.",
      hi: "पर्याप्त साधन वाला व्यक्ति यदि अपनी पत्नी (तलाक़शुदा पत्नी सहित, जिसने पुनर्विवाह न किया हो), वैध या अवैध नाबालिग संतान, विकलांगता के कारण स्वयं का भरण-पोषण न कर सकने वाली वयस्क संतान, या माता-पिता के भरण-पोषण से इनकार करे, तो प्रथम श्रेणी मजिस्ट्रेट उसे मासिक भत्ता देने का आदेश दे सकता है। यह भारत में भरण-पोषण का सबसे तेज़ उपाय है और हाजीपुर फ़ैमिली कोर्ट में सबसे अधिक सुना जाने वाला मामला।",
    },
    points: {
      en: [
        "Interim maintenance and litigation expenses can be ordered while the case is pending; the application for it should be disposed of within 60 days of service of notice (144(2)).",
        "Maintenance is payable from the date of the order, or from the date of the application if the court so directs — since Rajnesh v. Neha (2020), courts normally award it from the date of application.",
        "Enforcement: a warrant to levy the amount, and imprisonment up to one month for each month's default, on an application made within one year of the amount falling due (144(3)).",
        "No allowance to a wife living in adultery, refusing without sufficient reason to live with her husband, or living separately by mutual consent (144(4)).",
        "Both spouses must file the Rajnesh v. Neha affidavit of assets, income and liabilities; the estimate on this site's maintenance tool is anchored on the 25%-of-net-income benchmark the Supreme Court has approved.",
      ],
      hi: [
        "मामला लंबित रहते अंतरिम भरण-पोषण और मुक़दमे का ख़र्च दिलाया जा सकता है; उसका आवेदन नोटिस की तामील के 60 दिन के भीतर निपटाया जाना चाहिए (144(2))।",
        "भरण-पोषण आदेश की तारीख़ से देय है, या अदालत निर्देश दे तो आवेदन की तारीख़ से — रजनेश बनाम नेहा (2020) के बाद अदालतें सामान्यतः आवेदन की तारीख़ से देती हैं।",
        "वसूली: रक़म वसूलने का वारंट, और हर माह की चूक पर एक माह तक कारावास, बशर्ते आवेदन रक़म देय होने के एक वर्ष के भीतर किया जाए (144(3))।",
        "व्यभिचार में रह रही, बिना पर्याप्त कारण पति के साथ रहने से इनकार करने वाली, या आपसी सहमति से अलग रह रही पत्नी को भत्ता नहीं (144(4))।",
        "दोनों पक्षों को रजनेश बनाम नेहा का संपत्ति, आय और देनदारी का शपथ पत्र देना होता है; इस साइट के भरण-पोषण टूल का अनुमान सुप्रीम कोर्ट द्वारा स्वीकृत शुद्ध आय के 25% के मानक पर आधारित है।",
      ],
    },
    confusion: {
      en: "Section 144 used to mean prohibitory orders. Under the BNSS, 144 is maintenance and prohibitory orders are 163.",
      hi: "पहले धारा 144 निषेधाज्ञा थी। BNSS में 144 भरण-पोषण है और निषेधाज्ञा 163।",
    },
    faqs: {
      en: [
        { q: "What is section 125 CrPC called now?", a: "BNSS section 144. The provision is substantively the same — maintenance for a wife, children and parents from a person with sufficient means who neglects them — with a 60-day target for deciding interim maintenance." },
        { q: "How much maintenance can be awarded under BNSS 144?", a: "There is no statutory cap or formula. Courts work from the Supreme Court's guidance that about 25% of the husband's net income is a just figure for a wife, adjusted for children, the claimant's own income and the standard of living during the marriage. The maintenance estimator on this site shows the likely band." },
        { q: "Where do I file a BNSS 144 case in Vaishali?", a: "In the Family Court at Hajipur, which exercises the Magistrate's jurisdiction under this section for the district. The case can be filed where the wife resides, where the husband resides, or where they last lived together." },
        { q: "What happens if the husband does not pay?", a: "Apply within one year of each default: the court issues a warrant to recover the amount as a fine and can send him to prison for up to one month for every month unpaid. Salary attachment is also ordered in practice." },
      ],
      hi: [
        { q: "धारा 125 CrPC को अब क्या कहते हैं?", a: "BNSS की धारा 144। प्रावधान मूलतः वही है — पर्याप्त साधन वाले व्यक्ति से पत्नी, बच्चों और माता-पिता का भरण-पोषण — और अंतरिम भरण-पोषण तय करने का 60 दिन का लक्ष्य जुड़ा है।" },
        { q: "BNSS 144 में कितना भरण-पोषण मिल सकता है?", a: "कोई वैधानिक सीमा या फ़ॉर्मूला नहीं। अदालतें सुप्रीम कोर्ट के इस मार्गदर्शन से चलती हैं कि पति की शुद्ध आय का लगभग 25% पत्नी के लिए उचित है, जिसे बच्चों, दावेदार की अपनी आय और विवाह के दौरान के जीवन-स्तर के अनुसार घटाया-बढ़ाया जाता है। इस साइट का भरण-पोषण अनुमानक संभावित दायरा दिखाता है।" },
        { q: "वैशाली में BNSS 144 का मुक़दमा कहाँ दायर करें?", a: "हाजीपुर की फ़ैमिली कोर्ट में, जो ज़िले के लिए इस धारा में मजिस्ट्रेट की शक्ति का प्रयोग करती है। मुक़दमा वहाँ हो सकता है जहाँ पत्नी रहती है, जहाँ पति रहता है, या जहाँ दोनों अंतिम बार साथ रहे।" },
        { q: "पति भुगतान न करे तो क्या होगा?", a: "हर चूक के एक वर्ष के भीतर आवेदन दें: अदालत रक़म जुर्माने की तरह वसूलने का वारंट जारी करती है और हर अवैतनिक माह के लिए एक माह तक जेल भेज सकती है। व्यवहार में वेतन की कुर्की का आदेश भी होता है।" },
      ],
    },
    related: ["/tools/maintenance-estimator", "/case-law/maintenance-section-125-crpc", "/practice/divorce-family-lawyer-hajipur"],
  },
  {
    code: "bnss",
    slug: "482",
    section: "482",
    old: "438",
    oldCode: "CrPC",
    chapter: "bnss",
    procedural: true,
    title: { en: "Anticipatory bail — direction to release on bail a person apprehending arrest (the old 438)", hi: "अग्रिम ज़मानत — गिरफ़्तारी की आशंका वाले व्यक्ति को ज़मानत पर छोड़ने का निर्देश (पुरानी 438)" },
    gist: {
      en: "A person who has reason to believe they may be arrested on an accusation of a non-bailable offence may apply to the Court of Session or the High Court for a direction that, if arrested, they be released on bail. In Bihar the application goes first to the Sessions Judge at the district (Hajipur for Vaishali), and on rejection to the Patna High Court.",
      hi: "जिस व्यक्ति को अजमानतीय अपराध के आरोप में गिरफ़्तारी की आशंका हो, वह सत्र न्यायालय या हाई कोर्ट में इस निर्देश के लिए आवेदन कर सकता है कि गिरफ़्तारी होने पर उसे ज़मानत पर छोड़ा जाए। बिहार में आवेदन पहले ज़िले के सत्र न्यायाधीश (वैशाली के लिए हाजीपुर) के पास जाता है, और ख़ारिज होने पर पटना हाई कोर्ट।",
    },
    points: {
      en: [
        "The court weighs the nature and gravity of the accusation, the applicant's antecedents, the possibility of flight, and whether the accusation is made to injure or humiliate (482(1)).",
        "Conditions can be imposed: to be available for interrogation, not to influence witnesses, not to leave India without permission, and any condition a regular bail order could carry (482(2)).",
        "No anticipatory bail for rape of a woman under 16 (BNS 65) or gang rape of a woman under 18 (BNS 70(2)) — 482(4). In Bihar, section 76(2) of the Prohibition and Excise Act also bars it, softened by the Patna High Court's Full Bench in Ram Vinay Yadav (2019) where the FIR discloses no offence.",
        "Sushila Aggarwal (2020): protection need not be time-limited and can continue until the end of the trial, unless the court says otherwise.",
        "The FIR copy, a certified copy of any rejection order, and the applicant's affidavit are the core papers; the chamber's criminal-defence page explains the Hajipur practice.",
      ],
      hi: [
        "अदालत आरोप की प्रकृति और गंभीरता, आवेदक का पूर्व-इतिहास, भागने की संभावना, और यह देखती है कि आरोप अपमानित या क्षति पहुँचाने के लिए तो नहीं लगाया गया (482(1))।",
        "शर्तें लगाई जा सकती हैं: पूछताछ के लिए उपलब्ध रहना, गवाहों को प्रभावित न करना, बिना अनुमति भारत न छोड़ना, और नियमित ज़मानत की कोई भी शर्त (482(2))।",
        "16 वर्ष से कम आयु की स्त्री से बलात्कार (BNS 65) या 18 वर्ष से कम की स्त्री से सामूहिक बलात्कार (BNS 70(2)) में अग्रिम ज़मानत नहीं — 482(4)। बिहार में मद्य निषेध एवं उत्पाद अधिनियम की धारा 76(2) भी रोक लगाती है, जिसे पटना हाई कोर्ट की पूर्ण पीठ ने राम विनय यादव (2019) में नरम किया — जहाँ FIR से कोई अपराध नहीं बनता।",
        "सुशीला अग्रवाल (2020): संरक्षण समय-सीमित होना ज़रूरी नहीं और अदालत अन्यथा न कहे तो मुक़दमे के अंत तक चल सकता है।",
        "FIR की प्रति, किसी ख़ारिज आदेश की प्रमाणित प्रति और आवेदक का शपथ पत्र मुख्य काग़ज़ात हैं; चैंबर का आपराधिक बचाव पृष्ठ हाजीपुर की प्रक्रिया समझाता है।",
      ],
    },
    faqs: {
      en: [
        { q: "What is section 438 CrPC called now?", a: "BNSS section 482. It is the anticipatory-bail provision, and the numbering is a common source of confusion because the old 482 was the High Court's inherent power to quash — that is now BNSS 528." },
        { q: "Where do I apply for anticipatory bail in Vaishali?", a: "First to the Court of Sessions at Hajipur. If it is rejected, to the Patna High Court. Filing directly in the High Court is possible but the court normally expects the Sessions Court to have been approached first." },
        { q: "Which offences have no anticipatory bail?", a: "BNS 65 (rape of a woman under 16) and BNS 70(2) (gang rape of a woman under 18) under BNSS 482(4). Special statutes add their own bars — the SC/ST (Prevention of Atrocities) Act section 18, and in Bihar the Prohibition and Excise Act section 76(2), each with court-made exceptions where the FIR discloses no offence." },
        { q: "How long does anticipatory bail protection last?", a: "Since Sushila Aggarwal v. State (NCT of Delhi) (2020), until the end of the trial unless the court limits it. Courts may still confine it to the investigation stage in a particular case and require regular bail on charge sheet." },
      ],
      hi: [
        { q: "धारा 438 CrPC को अब क्या कहते हैं?", a: "BNSS की धारा 482। यह अग्रिम ज़मानत का प्रावधान है, और नंबर अक्सर भ्रम पैदा करता है क्योंकि पुरानी 482 हाई कोर्ट की मुक़दमा रद्द करने की अंतर्निहित शक्ति थी — वह अब BNSS 528 है।" },
        { q: "वैशाली में अग्रिम ज़मानत कहाँ माँगें?", a: "पहले हाजीपुर के सत्र न्यायालय में। ख़ारिज हो तो पटना हाई कोर्ट में। सीधे हाई कोर्ट जाना संभव है, पर अदालत सामान्यतः अपेक्षा करती है कि पहले सत्र न्यायालय गया गया हो।" },
        { q: "किन अपराधों में अग्रिम ज़मानत नहीं मिलती?", a: "BNSS 482(4) के अनुसार BNS 65 (16 वर्ष से कम की स्त्री से बलात्कार) और BNS 70(2) (18 वर्ष से कम की स्त्री से सामूहिक बलात्कार)। विशेष क़ानून अपनी रोक जोड़ते हैं — SC/ST अधिनियम की धारा 18, और बिहार में मद्य निषेध अधिनियम की धारा 76(2) — दोनों में अदालतों ने अपवाद बनाए हैं जहाँ FIR से कोई अपराध नहीं बनता।" },
        { q: "अग्रिम ज़मानत का संरक्षण कब तक चलता है?", a: "सुशीला अग्रवाल (2020) के बाद, अदालत सीमित न करे तो मुक़दमे के अंत तक। किसी विशेष मामले में अदालत इसे जाँच तक सीमित कर चार्जशीट पर नियमित ज़मानत लेने को कह सकती है।" },
      ],
    },
    related: ["/case-law/anticipatory-bail", "/practice/criminal-lawyer-hajipur", "/blog/bihar-prohibition-act-bail"],
  },
  {
    code: "bnss",
    slug: "173",
    section: "173",
    old: "154",
    oldCode: "CrPC",
    chapter: "bnss",
    procedural: true,
    title: { en: "Information in cognizable cases — the FIR (the old 154)", hi: "संज्ञेय मामलों में सूचना — प्राथमिकी / FIR (पुरानी 154)" },
    gist: {
      en: "Every information about a cognizable offence, given orally or electronically to the officer in charge of a police station, must be reduced to writing, read over to the informant, signed, and entered in the station's book. The informant gets a copy free. Section 173 also creates the zero FIR, the e-FIR and the preliminary enquiry.",
      hi: "संज्ञेय अपराध की हर सूचना, जो थाना प्रभारी को मौखिक या इलेक्ट्रॉनिक रूप से दी जाए, लिखी जानी चाहिए, सूचनादाता को पढ़कर सुनाई जानी चाहिए, हस्ताक्षरित होकर थाने की पुस्तिका में दर्ज होनी चाहिए। सूचनादाता को प्रति निःशुल्क मिलती है। धारा 173 ज़ीरो FIR, ई-FIR और प्रारंभिक जाँच भी बनाती है।",
    },
    points: {
      en: [
        "Zero FIR: the information can be given at any police station irrespective of where the offence occurred; it is registered and transferred to the station with jurisdiction (173(1)).",
        "E-FIR: information sent electronically must be taken on record and signed by the informant within 3 days.",
        "Preliminary enquiry: for offences punishable with 3 to 7 years, the officer may, with the Deputy Superintendent's permission, conduct a preliminary enquiry within 14 days to see whether a prima facie case exists before registering (173(3)).",
        "Refusal: send the substance of the information in writing to the Superintendent of Police (173(4)); if that fails, apply to the Magistrate under BNSS 175(3) for a direction to register and investigate — the route this site's FIR-refusal guide walks through.",
        "A woman reporting rape, outraging of modesty, stalking or similar offences must be recorded by a woman officer, at her residence or a place of her choice if she is disabled, and with a videographed statement.",
      ],
      hi: [
        "ज़ीरो FIR: सूचना किसी भी थाने में दी जा सकती है, चाहे अपराध कहीं भी हुआ हो; वह दर्ज होकर क्षेत्राधिकार वाले थाने को स्थानांतरित होती है (173(1))।",
        "ई-FIR: इलेक्ट्रॉनिक रूप से भेजी सूचना रिकॉर्ड पर ली जाएगी और सूचनादाता को 3 दिन के भीतर हस्ताक्षर करने होंगे।",
        "प्रारंभिक जाँच: 3 से 7 वर्ष तक दंडनीय अपराधों में अधिकारी, पुलिस उपाधीक्षक की अनुमति से, दर्ज करने से पहले 14 दिन के भीतर प्रारंभिक जाँच कर सकता है कि प्रथम दृष्टया मामला बनता है या नहीं (173(3))।",
        "इनकार: सूचना का सार लिखित में पुलिस अधीक्षक को भेजें (173(4)); उससे भी काम न बने तो BNSS 175(3) में मजिस्ट्रेट से दर्ज कर जाँच का निर्देश माँगें — इस साइट की FIR-इनकार मार्गदर्शिका यही रास्ता समझाती है।",
        "बलात्कार, लज्जा भंग, पीछा करने जैसे अपराधों की रिपोर्ट करने वाली स्त्री का बयान महिला अधिकारी द्वारा, विकलांग होने पर उसके घर या उसकी पसंद की जगह पर, वीडियो रिकॉर्डिंग के साथ लिया जाएगा।",
      ],
    },
    faqs: {
      en: [
        { q: "What is section 154 CrPC called now?", a: "BNSS section 173. It is the FIR provision — with three additions the old section did not have: the zero FIR at any police station, the e-FIR signed within three days, and a 14-day preliminary enquiry for offences punishable with three to seven years." },
        { q: "Can the police refuse to register my FIR?", a: "For a cognizable offence, no — Lalita Kumari (2014) makes registration mandatory, and BNSS 173 codifies it, subject to the preliminary-enquiry window for 3-to-7-year offences. If the officer refuses, write to the Superintendent of Police under 173(4), and then to the Magistrate under 175(3)." },
        { q: "What is a zero FIR?", a: "An FIR registered at a police station that does not have territorial jurisdiction over the offence. It gets the number 0, is transferred to the correct station, and prevents the old excuse that \"this is not our area\". BNSS 173(1) now provides for it expressly." },
        { q: "Do I get a copy of the FIR?", a: "Yes, free of cost, immediately, under 173(2). FIRs are also uploaded on the Bihar Police portal and the CCTNS within 24 hours unless the offence is sensitive." },
      ],
      hi: [
        { q: "धारा 154 CrPC को अब क्या कहते हैं?", a: "BNSS की धारा 173। यह FIR का प्रावधान है — तीन नई बातों के साथ: किसी भी थाने में ज़ीरो FIR, तीन दिन में हस्ताक्षरित ई-FIR, और तीन से सात वर्ष तक दंडनीय अपराधों में 14 दिन की प्रारंभिक जाँच।" },
        { q: "क्या पुलिस मेरी FIR दर्ज करने से इनकार कर सकती है?", a: "संज्ञेय अपराध में नहीं — ललिता कुमारी (2014) ने दर्ज करना अनिवार्य किया और BNSS 173 ने उसे क़ानून में लिखा, बस 3 से 7 वर्ष वाले अपराधों में प्रारंभिक जाँच की छूट है। अधिकारी इनकार करे तो 173(4) में पुलिस अधीक्षक को लिखें, फिर 175(3) में मजिस्ट्रेट के पास जाएँ।" },
        { q: "ज़ीरो FIR क्या है?", a: "ऐसे थाने में दर्ज FIR जिसके क्षेत्राधिकार में अपराध नहीं हुआ। उसे नंबर 0 मिलता है, वह सही थाने को स्थानांतरित होती है, और \"यह हमारा इलाक़ा नहीं\" वाला पुराना बहाना ख़त्म करती है। BNSS 173(1) अब इसे स्पष्ट रूप से देती है।" },
        { q: "क्या मुझे FIR की प्रति मिलेगी?", a: "हाँ, 173(2) के तहत तुरंत और निःशुल्क। FIR संवेदनशील न हो तो 24 घंटे में बिहार पुलिस पोर्टल और CCTNS पर भी अपलोड होती है।" },
      ],
    },
    related: ["/blog/police-refuse-to-lodge-fir", "/blog/first-date-of-a-criminal-case", "/case-status/vaishali"],
  },
  {
    code: "bnss",
    slug: "35",
    section: "35(3)",
    old: "41A",
    oldCode: "CrPC",
    chapter: "bnss",
    procedural: true,
    title: { en: "Notice of appearance before a police officer instead of arrest (the old 41A)", hi: "गिरफ़्तारी के बजाय पुलिस अधिकारी के समक्ष उपस्थित होने का नोटिस (पुरानी 41A)" },
    gist: {
      en: "Where a cognizable offence is punishable with imprisonment up to 7 years and the police officer is satisfied that arrest is not necessary on the grounds in section 35(1) — preventing further offences, proper investigation, tampering with evidence, threatening witnesses, or securing attendance — the officer must issue a notice directing the person to appear, rather than arrest them. Compliance with the notice means no arrest unless reasons are recorded.",
      hi: "जहाँ संज्ञेय अपराध 7 वर्ष तक के कारावास से दंडनीय हो और पुलिस अधिकारी संतुष्ट हो कि धारा 35(1) के आधारों — आगे अपराध रोकना, उचित जाँच, साक्ष्य से छेड़छाड़, गवाहों को धमकी, या उपस्थिति सुनिश्चित करना — पर गिरफ़्तारी ज़रूरी नहीं, वहाँ अधिकारी को गिरफ़्तारी के बजाय उपस्थित होने का नोटिस देना होगा। नोटिस का पालन करने पर, कारण दर्ज किए बिना गिरफ़्तारी नहीं।",
    },
    points: {
      en: [
        "Arnesh Kumar v. State of Bihar (2014) — a Bihar case — made the checklist binding: no automatic arrest in offences up to 7 years, reasons to be recorded, Magistrates to check them before authorising detention; officers who ignore it face departmental action and contempt.",
        "35(7): no arrest without the prior permission of an officer not below Deputy Superintendent where the offence is punishable with less than 3 years and the person is infirm or above 60.",
        "Appear on the date and at the place stated, take an advocate along, and keep a signed acknowledgment; a written reply to the notice is not required but is often worth filing.",
        "If a notice is ignored, arrest follows — and the refusal is a ground against anticipatory bail later.",
        "Notices are routine in BNS 85 (498A), 318(4), 316, 351 and land-dispute FIRs; a notice is not a summons from a court and not a charge sheet.",
      ],
      hi: [
        "अर्नेश कुमार बनाम बिहार राज्य (2014) — बिहार का ही मामला — ने यह चेकलिस्ट बाध्यकारी बनाई: 7 वर्ष तक के अपराधों में स्वतः गिरफ़्तारी नहीं, कारण दर्ज होंगे, मजिस्ट्रेट हिरासत मंज़ूर करने से पहले उन्हें जाँचेगा; अनदेखी करने वाले अधिकारियों पर विभागीय कार्रवाई और अवमानना।",
        "35(7): जहाँ अपराध 3 वर्ष से कम दंडनीय हो और व्यक्ति अशक्त या 60 वर्ष से ऊपर हो, वहाँ पुलिस उपाधीक्षक से नीचे के अधिकारी की पूर्व अनुमति के बिना गिरफ़्तारी नहीं।",
        "बताई गई तारीख़ और जगह पर उपस्थित हों, वकील साथ ले जाएँ, और हस्ताक्षरित पावती रखें; नोटिस का लिखित जवाब ज़रूरी नहीं पर प्रायः देना उपयोगी होता है।",
        "नोटिस की अनदेखी पर गिरफ़्तारी होती है — और यह इनकार बाद में अग्रिम ज़मानत के विरुद्ध आधार बनता है।",
        "BNS 85 (498A), 318(4), 316, 351 और ज़मीन विवाद की FIR में नोटिस सामान्य है; नोटिस अदालत का समन नहीं और चार्जशीट भी नहीं।",
      ],
    },
    faqs: {
      en: [
        { q: "What is a 41A notice called now?", a: "A notice under BNSS section 35(3). The substance is the same as the old CrPC 41A: for offences punishable with up to 7 years, the police must issue a notice to appear instead of arresting, unless one of the grounds in 35(1) for arrest is recorded." },
        { q: "Do I have to go when I receive a 35(3) notice?", a: "Yes. Attend on the date given, with an advocate, and obtain an acknowledgment. If you comply, you cannot be arrested for that offence unless the officer records reasons why arrest has become necessary. Ignoring the notice invites arrest and weakens any later bail application." },
        { q: "Can I be arrested in a 498A (BNS 85) case without notice?", a: "Not lawfully, in the ordinary course. BNS 85 carries up to 3 years, so Arnesh Kumar and BNSS 35(3) apply: a notice first, arrest only with recorded reasons on the 35(1) grounds. If you are arrested without one, the Magistrate should refuse to authorise detention." },
        { q: "Should I reply to the notice in writing?", a: "It is not required, but a short reply through an advocate — confirming appearance, stating your version and offering documents — puts your position on record before any charge sheet. The chamber drafts these." },
      ],
      hi: [
        { q: "41A नोटिस को अब क्या कहते हैं?", a: "BNSS धारा 35(3) का नोटिस। सार वही है जो पुरानी CrPC 41A का था: 7 वर्ष तक दंडनीय अपराधों में पुलिस गिरफ़्तारी के बजाय उपस्थित होने का नोटिस देगी, जब तक 35(1) का कोई गिरफ़्तारी-आधार दर्ज न किया जाए।" },
        { q: "35(3) का नोटिस मिलने पर क्या जाना ज़रूरी है?", a: "हाँ। दी गई तारीख़ पर वकील के साथ जाएँ और पावती लें। पालन करने पर उस अपराध में तब तक गिरफ़्तारी नहीं हो सकती जब तक अधिकारी यह कारण दर्ज न करे कि गिरफ़्तारी क्यों ज़रूरी हो गई। नोटिस की अनदेखी गिरफ़्तारी को न्योता है और बाद की ज़मानत अर्ज़ी को कमज़ोर करती है।" },
        { q: "क्या 498A (BNS 85) में बिना नोटिस गिरफ़्तारी हो सकती है?", a: "सामान्य क्रम में विधिपूर्वक नहीं। BNS 85 में अधिकतम 3 वर्ष है, इसलिए अर्नेश कुमार और BNSS 35(3) लागू हैं: पहले नोटिस, गिरफ़्तारी केवल 35(1) के आधारों पर दर्ज कारणों से। बिना नोटिस गिरफ़्तारी हो तो मजिस्ट्रेट को हिरासत मंज़ूर नहीं करनी चाहिए।" },
        { q: "क्या नोटिस का लिखित जवाब देना चाहिए?", a: "ज़रूरी नहीं, पर वकील के माध्यम से छोटा जवाब — उपस्थिति की पुष्टि, अपना पक्ष और दस्तावेज़ देने की पेशकश — चार्जशीट से पहले आपका पक्ष रिकॉर्ड पर रखता है। चैंबर ये तैयार करता है।" },
      ],
    },
    related: ["/bns/85", "/case-law/anticipatory-bail", "/practice/criminal-lawyer-hajipur"],
  },
];

// ---------------------------------------------------------------------------
//  Chapters — for grouping on the hub page.
// ---------------------------------------------------------------------------
export const CHAPTERS = [
  { key: "person", en: "Offences against the person", hi: "शरीर के विरुद्ध अपराध" },
  { key: "women", en: "Offences against women", hi: "स्त्रियों के विरुद्ध अपराध" },
  { key: "property", en: "Property, cheating and forgery", hi: "संपत्ति, धोखाधड़ी और जालसाज़ी" },
  { key: "general", en: "Joint liability and conspiracy", hi: "संयुक्त दायित्व और षड्यंत्र" },
  { key: "order", en: "Public order, threats and defamation", hi: "लोक व्यवस्था, धमकी और मानहानि" },
  { key: "bnss", en: "BNSS — procedure (the old CrPC numbers)", hi: "BNSS — प्रक्रिया (पुराने CrPC नंबर)" },
];

export const CODE_NAMES = {
  bns: { short: "BNS", full: { en: "Bharatiya Nyaya Sanhita, 2023", hi: "भारतीय न्याय संहिता, 2023" }, old: "IPC", oldFull: { en: "Indian Penal Code, 1860", hi: "भारतीय दंड संहिता, 1860" } },
  bnss: { short: "BNSS", full: { en: "Bharatiya Nagarik Suraksha Sanhita, 2023", hi: "भारतीय नागरिक सुरक्षा संहिता, 2023" }, old: "CrPC", oldFull: { en: "Code of Criminal Procedure, 1973", hi: "दंड प्रक्रिया संहिता, 1973" } },
};

// ---------------------------------------------------------------------------
//  Paths, lookups and hreflang pairs.
// ---------------------------------------------------------------------------
export const sectionPath = (p, lang = "en") => `${lang === "hi" ? "/hi" : ""}/${p.code}/${p.slug}`;
export const hubPath = (lang = "en") => (lang === "hi" ? "/hi/bns" : "/bns");

export const sectionBy = (code, slug) => bnsSections.find((p) => p.code === code && p.slug === slug);

/** Find the page for a converter row's new number ("318(4)" → the 318 page). */
export const pageForNumber = (code, number) => {
  const base = String(number).split(/[\s(/]/)[0];
  return bnsSections.find((p) => p.code === code && (p.slug === base || p.section === base));
};

/** EN ↔ HI pairs for HREFLANG in routes.js: the hub and every section. */
export const bnsHreflangPairs = [
  [hubPath("en"), hubPath("hi")],
  ...bnsSections.map((p) => [sectionPath(p, "en"), sectionPath(p, "hi")]),
];

/**
 * Parse a path into { page, lang, hub } — used by structuredData.js and the
 * page components so the URL grammar lives in one place.
 */
export function bnsRouteInfo(path) {
  const clean = path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
  const m = /^(\/hi)?\/(bns|bnss)(?:\/([^/]+))?$/.exec(clean);
  if (!m) return null;
  const lang = m[1] ? "hi" : "en";
  const code = m[2];
  if (!m[3]) return code === "bns" ? { hub: true, lang } : null;
  const page = sectionBy(code, m[3]);
  return page ? { page, lang } : null;
}

// ---------------------------------------------------------------------------
//  Derived facts and labels — the page and the FAQ generator both use these,
//  so the markup and the visible answer can never disagree.
// ---------------------------------------------------------------------------
const yearsText = (y, lang) => {
  if (y === "life") return lang === "hi" ? "आजीवन कारावास या मृत्युदंड" : "life imprisonment or death";
  if (y === null) return lang === "hi" ? "मूल अपराध के अनुसार" : "as for the principal offence";
  if (y < 1) return lang === "hi" ? `${Math.round(y * 12)} माह` : `${Math.round(y * 12)} months`;
  return lang === "hi" ? `${y} वर्ष` : `${y} year${y === 1 ? "" : "s"}`;
};

/** The heaviest limb decides the derived flags for a section. */
const heaviest = (p) =>
  p.limbs.reduce((best, l) => {
    const rank = (x) => (x.max === "life" ? 1000 : x.max === null ? -1 : x.max);
    return rank(l) > rank(best) ? l : best;
  }, p.limbs[0]);

export function derivedFor(p) {
  if (p.procedural) return null;
  const top = heaviest(p);
  const max = top.max;
  if (max === null) return { follows: true };
  const notice = max !== "life" && max <= 7;
  const defaultBailDays = max === "life" || max >= 10 ? 90 : 60;
  return { follows: false, max, notice, defaultBailDays, maxText: { en: yearsText(max, "en"), hi: yearsText(max, "hi") } };
}

export const yesNo = (v, lang) =>
  v === null ? (lang === "hi" ? "मूल अपराध के अनुसार" : "As the principal offence") : v ? (lang === "hi" ? "हाँ" : "Yes") : lang === "hi" ? "नहीं" : "No";

export const cognizableText = (v, lang) =>
  v === null
    ? yesNo(null, lang)
    : v
      ? lang === "hi" ? "संज्ञेय — पुलिस बिना वारंट FIR दर्ज कर गिरफ़्तार कर सकती है" : "Cognizable — police can register an FIR and arrest without a warrant"
      : lang === "hi" ? "असंज्ञेय — मजिस्ट्रेट के समक्ष परिवाद; पुलिस को जाँच के लिए आदेश चाहिए" : "Non-cognizable — complaint to the Magistrate; police need an order to investigate";

export const bailableText = (v, lang) =>
  v === null
    ? yesNo(null, lang)
    : v
      ? lang === "hi" ? "ज़मानती — ज़मानत अधिकार है (BNSS 478)" : "Bailable — bail is a right (BNSS 478)"
      : lang === "hi" ? "अजमानतीय — ज़मानत अदालत के विवेक पर (BNSS 480 / 483)" : "Non-bailable — bail at the court's discretion (BNSS 480 / 483)";

export const compoundableText = (c, lang) => {
  if (!c) return lang === "hi" ? "नहीं — समझौते पर हाई कोर्ट से BNSS 528 में रद्द कराना होगा" : "No — a settlement needs quashing by the High Court under BNSS 528";
  const by = lang === "hi" ? c.hi : c.en;
  if (c.permission) return lang === "hi" ? `हाँ, अदालत की अनुमति से — ${by} द्वारा (BNSS 359(2))` : `Yes, with the court's permission — by ${by} (BNSS 359(2))`;
  return lang === "hi" ? `हाँ — ${by} द्वारा (BNSS 359(1))` : `Yes — by ${by} (BNSS 359(1))`;
};

/** FAQs for a section page — generated from the same fields the page renders. */
export function faqsForSection(p, lang) {
  if (p.procedural) return p.faqs[lang];
  const code = CODE_NAMES[p.code];
  const n = `${code.short} ${p.section}`;
  const top = heaviest(p);
  const d = derivedFor(p);
  const limbList = (f) => p.limbs.map((l) => `${l.sub}: ${f(l)}`).join(" ");

  if (lang === "hi") {
    return [
      { q: `${n} में कितनी सज़ा है?`, a: limbList((l) => l.punishment.hi) },
      { q: `क्या ${n} ज़मानती है या अजमानतीय?`, a: p.limbs.length > 1 ? limbList((l) => bailableText(l.bailable, "hi")) : bailableText(top.bailable, "hi") + "।" },
      { q: `क्या ${n} संज्ञेय अपराध है?`, a: p.limbs.length > 1 ? limbList((l) => cognizableText(l.cognizable, "hi")) : cognizableText(top.cognizable, "hi") + "।" },
      { q: `क्या ${n} में समझौता हो सकता है?`, a: p.limbs.length > 1 ? limbList((l) => compoundableText(l.compoundable, "hi")) : compoundableText(top.compoundable, "hi") + "।" },
      { q: `${n} पुरानी IPC की कौन सी धारा है?`, a: `${code.old} ${p.old}। 1 जुलाई 2024 से पहले हुए अपराध पुराने क़ानून में ही चलते हैं; अपराध की तारीख़ तय करती है कि कौन सी संहिता लागू होगी।` },
      ...(d && !d.follows
        ? [{
            q: `${n} में गिरफ़्तारी और डिफ़ॉल्ट ज़मानत का नियम क्या है?`,
            a: `${d.notice ? "अधिकतम सज़ा 7 वर्ष तक है, इसलिए BNSS 35(3) लागू है: पुलिस को गिरफ़्तारी के बजाय पेश होने का नोटिस देना चाहिए, जब तक गिरफ़्तारी के कारण दर्ज न किए जाएँ (अर्नेश कुमार दिशानिर्देश)।" : "अधिकतम सज़ा 7 वर्ष से अधिक है, इसलिए BNSS 35(3) का नोटिस-नियम लागू नहीं होता और गिरफ़्तारी सामान्य है।"} जाँच पूरी न होने पर डिफ़ॉल्ट ज़मानत BNSS 187(3) में हिरासत के ${d.defaultBailDays} दिन बाद मिलती है।`,
          }]
        : []),
    ];
  }
  return [
    { q: `What is the punishment under ${n}?`, a: limbList((l) => l.punishment.en) },
    { q: `Is ${n} bailable or non-bailable?`, a: p.limbs.length > 1 ? limbList((l) => bailableText(l.bailable, "en")) : bailableText(top.bailable, "en") + "." },
    { q: `Is ${n} a cognizable offence?`, a: p.limbs.length > 1 ? limbList((l) => cognizableText(l.cognizable, "en")) : cognizableText(top.cognizable, "en") + "." },
    { q: `Can ${n} be compounded (settled)?`, a: p.limbs.length > 1 ? limbList((l) => compoundableText(l.compoundable, "en")) : compoundableText(top.compoundable, "en") + "." },
    { q: `Which IPC section is ${n}?`, a: `${code.old} ${p.old}. Offences committed before 1 July 2024 continue under the old code; the date of the offence decides which Sanhita applies.` },
    ...(d && !d.follows
      ? [{
          q: `What are the arrest and default-bail rules for ${n}?`,
          a: `${d.notice ? "The maximum punishment is 7 years or less, so BNSS 35(3) applies: the police should issue a notice to appear rather than arrest, unless reasons for arrest are recorded (the Arnesh Kumar guidelines)." : "The maximum punishment exceeds 7 years, so the BNSS 35(3) notice rule does not apply and arrest is the norm."} If the investigation is not completed, default bail under BNSS 187(3) accrues after ${d.defaultBailDays} days in custody.`,
        }]
      : []),
  ];
}

/** Page <title> and description per language. */
export function sectionMeta(p, lang) {
  const code = CODE_NAMES[p.code];
  const top = p.procedural ? null : heaviest(p);
  if (lang === "hi") {
    return {
      title: p.procedural
        ? `${code.short} धारा ${p.section} क्या है — ${p.title.hi}`
        : `${code.short} धारा ${p.section} (${code.old} ${p.old}) — ${p.title.hi}: सज़ा, ज़मानत, संज्ञेय या नहीं`,
      description: p.procedural
        ? `${code.short} ${p.section} क्या है — पुरानी ${code.old} ${p.old} — सरल हिंदी में: ${p.gist.hi.slice(0, 120)}…`
        : `${code.short} धारा ${p.section} में सज़ा: ${top.punishment.hi} ${bailableText(top.bailable, "hi").split(" — ")[0]}, ${cognizableText(top.cognizable, "hi").split(" — ")[0]}। पुरानी ${code.old} ${p.old}। बिहार के लिए सरल हिंदी में।`,
    };
  }
  return {
    title: p.procedural
      ? `${code.short} Section ${p.section} Explained — ${p.title.en}`
      : `${code.short} Section ${p.section} — ${p.title.en}: Punishment, Bailable or Not, Cognizable | ${code.old} ${p.old}`,
    description: p.procedural
      ? `${code.short} ${p.section} explained — the old ${code.old} ${p.old} — in plain English: ${p.gist.en.slice(0, 130)}…`
      : `${code.short} ${p.section} punishment: ${top.punishment.en} ${bailableText(top.bailable, "en").split(" — ")[0]}, ${cognizableText(top.cognizable, "en").split(" — ")[0]}, triable by ${TRIABLE[top.triableBy].en}. Old ${code.old} ${p.old}. In English and Hindi.`,
  };
}

export const HUB_META = {
  en: {
    title: "BNS Sections Explained — Punishment, Bailable or Not, Cognizable, IPC Equivalent",
    description:
      "Every commonly charged section of the Bharatiya Nyaya Sanhita — 103, 109, 115, 118, 64, 74, 85, 303, 316, 318, 351 and more — with punishment, cognizable, bailable, triable-by and compoundable status from the BNSS First Schedule, plus BNSS 35(3), 144, 163, 173 and 482. English and Hindi.",
  },
  hi: {
    title: "BNS की धाराएँ हिंदी में — सज़ा, ज़मानती या अजमानतीय, संज्ञेय, IPC की पुरानी धारा",
    description:
      "भारतीय न्याय संहिता की हर आम धारा — 103, 109, 115, 118, 64, 74, 85, 303, 316, 318, 351 और अन्य — सज़ा, संज्ञेय, ज़मानती, किस अदालत में और समझौते की स्थिति के साथ, BNSS की पहली अनुसूची से; साथ में BNSS 35(3), 144, 163, 173 और 482। सरल हिंदी में।",
  },
};
