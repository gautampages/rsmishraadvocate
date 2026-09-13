# SEO opportunity analysis — ramsnehimishra.in (September 2026)

Scope: what to add next in **land/property, criminal law, CIBIL/credit and money
disputes, government services and documents, and calculators**, ranked by how
likely each is to earn search traffic and bring instructions to the chamber.
This started as a decision document; §0 records what has since been built.

Prepared 12 Sep 2026 from a review of the codebase (126 live URLs) and four
parallel web-research passes (~230 searches and page fetches). Read §2 on
evidence before trusting any demand tier.

---

## 0. Build status — updated 13 Sep 2026

The P0 tier was implemented in four parts on 13 Sep 2026, one commit each,
after an earlier attempt broke mid-way. The site went from 97 to **187
prerendered routes** (`npm run build` passes; `npm run lint` clean).

| Part | Item | What shipped | URLs | Commit |
|---|---|---|---|---|
| 1 | P0-1 stamp-duty deed-type selector | 17 deed types from the Registration Department chart (sale, gift, exchange, ₹100 family partition, other partition, release ×2, settlement, will, adoption, agreement to sell, lease by tenure, rent agreement, POA ×2, mortgage by kind, trust, affidavit); e-nibandhan rebate, scanning fee; reported ₹200 mutation fee and s.194-IA TDS shown as "also budget for", not added to the total; 11 FAQs | `/tools/stamp-duty-calculator` | `343dca3` |
| 2 | P0-2 per-section BNS pages | `src/data/bnsPages.js`: 37 BNS sections + BNSS 35(3), 144, 163, 173, 482, each with gist, per-limb punishment, cognizable / bailable / triable-by / compoundable (BNSS First Schedule, s.359), derived 35(3)-notice and 187(3) default-bail facts, "watch out" block (302, 316, 144/163), generated FAQ schema, hreflang EN↔HI, hub in both languages, links from converter rows | `/bns`, `/bns/<n>`, `/bnss/<n>`, `/hi/bns`, `/hi/bns/<n>`, `/hi/bnss/<n>` (86 URLs) | `0cde7f2` |
| 3 | P0-3 MACT calculator; P0-4 cheque-bounce calculator + notice; §6.3 limitation items | `src/lib/mact.js` (Sarla Verma multiplier and deductions, Pranay Sethi prospects and conventional heads uplifted to computation date — assumption stated on the page, Magma consortium per dependant, injury mode, s.164 / hit-and-run floors); `src/lib/chequeBounce.js` (three s.138 clocks with presumed service, 2× fine, 20% interim, 20% appeal deposit, likely compensation with interest, Damodar S. Prabhu ladder, EN/HI notice with rupees in words). Limitation checker: s.138 notice and complaint, MACT 6 months, consumer 2 years, SARFAESI 45 days, insurance ombudsman 1 year, DCLR mutation appeal 30 days; calendar-month periods supported | `/tools/mact-compensation-calculator`, `/tools/cheque-bounce-calculator`, `/tools/limitation-checker` | `2554ec8` |
| 4 | P0-7 vanshavali generator; P0-8 consumer-forum finder | `src/lib/vanshavali.js` (tree + heir list + declaration + affidavit, HI/EN, keeps to the survey guide's published position; Panchayat Sachiv route described as reported); `src/lib/consumer.js` (₹50 lakh / ₹2 crore thresholds of the 2021 Rules, 2020 fee Schedule, s.69 two years, s.34(2)(d) filing at residence, e-Daakhil) | `/tools/vanshavali-generator`, `/tools/consumer-court-fee-calculator` | `55984cd` |

**Not built, and why**

- **P0-5 Hindu succession share calculator** — deferred to keep the four
  parts bounded; nothing blocks it. Next candidate.
- **P0-6 legal-heir vs succession-certificate tool** — blocked on the
  succession-certificate court fee (§7). Do not build until settled at the
  Hajipur civil court.
- **P1-2 survey objection guide**, **Hindi twins for the original seven
  tools**, and everything in P1/P2 — untouched.
- **§6.6** — `FEES_PUBLISHED` is still `false`; blog dates are still null.

**Facts the built pages state as "reported" or "assumed" — recheck before
they age** (all still open in §7): ₹200 mutation fee (shown but not added to
any total); gift-deed duty = conveyance rate (per the chart; no
blood-relation concession claimed); BNS 338 shown non-cognizable on the
Schedule with a practice note; BNS 106(2) shown as held in abeyance;
Pranay Sethi uplift reckoned to computation date; s.138 service presumed
three days after posting where no A/D; vanshavali certification via
Panchayat Sachiv per the Dec 2023 PRD letter, ₹10-stamp claim omitted.

Search Console still has not been consulted; the tie-breaks in §4 remain
judgement calls.

---

## 1. Summary

**Calculators win on this site, and the research says that is not an accident.**
Across all four topic clusters the same pattern showed up: the government portal
owns the "apply / check status" head term, twenty thin Hindi blogs fight over
the how-to, and **nobody has built the tool**. The gap is widest exactly where
this site already has authority (Bihar land, BNS sections, court procedure).

Eight opportunities were surfaced independently by two or more research passes,
which is the strongest signal available without keyword-tool exports:

| # | Opportunity | Surfaced by | Format |
|---|---|---|---|
| 1 | Stamp-duty calculator: deed-type selector (gift, ₹100 family partition, lease, POA, mortgage, will) + TDS toggle | land, documents, finance | extend existing tool |
| 2 | Per-section BNS pages (~40) with punishment / bailable / cognizable / compoundable columns, Hindi | criminal (+ GSC signal) | extend existing data file |
| 3 | Motor-accident (MACT) compensation calculator | criminal, finance | new calculator |
| 4 | Cheque-bounce compensation & interest calculator + s.138 notice generator | finance (+ existing guide) | new calculator + generator |
| 5 | Legal-heir vs succession-certificate decision tool + Bihar court-fee estimator | documents, finance | new tool |
| 6 | Vanshavali (Prapatra 3(1)) generator + affidavit | land, documents | new generator |
| 7 | Consumer-forum jurisdiction & fee finder | criminal, finance | new calculator |
| 8 | Cyber-fraud golden-hour checklist + "bank account frozen, how to unfreeze" | criminal, finance | guide + template |

Add to that a **Hindu succession share calculator** (single pass, but the most
"calculator-shaped" idea found, with only two weak competitors in India) and
you have the recommended P0 list in §4.

**Two structural gaps** matter more than any single page:

- **No tool has a Hindi twin.** Every research pass reported the Hindi SERPs
  as the weakest. The nine `/hi` pages exist; the seven tools do not. Each new
  tool should ship as an English/Hindi pair with hreflang, and the existing
  seven should get twins.
- **The section converter is one page for ~40 distinct high-volume queries**
  ("BNS 318", "dhara 302 kya hai", "498A bailable or not"). One page cannot
  rank for forty queries; forty can, and the data file already exists.

---

## 2. Evidence and its limits

- **Search Console was not accessible** from this session. The owner's
  observation that calculator pages get the most traffic is taken as given.
  Before building, export the GSC "Queries" report (last 3 months) and use it as
  the tie-breaker between items in the same tier.
- **No public keyword-tool volumes exist** for Hindi/Bihar legal queries.
  Demand tiers are judgement calls anchored on proxies:
  - Similarweb/Semrush site-level figures: biharbhumi.bihar.gov.in ≈ 1.07M
    visits/month (73% organic); dlrs.bihar.gov.in ≈ 140K/month and +20%
    month-on-month (survey deadline); bhumijankari ≈ 63K/month; cibil.com ≈
    1.9M organic/month; paisabazaar ≈ 5.3M; rtps-bihar.com (a clone) ≈ 18K.
  - Clone/typosquat density: 8+ domains exist only for "rtps bihar", 5+ for
    "epds bihar", 20+ for "bihar bhumi", 5+ for BNS section lookups. A query
    that sustains a cottage industry has volume, and a clone ranking on page
    one means the SERP is beatable.
  - Mainstream Hindi press explainers (Aaj Tak, Amar Ujala, Prabhat Khabar)
    on a topic = mass demand.
  - Paid tools existing for a task (vanshavali generators at ₹8–₹49;
    gazette name-change packages at ₹4,500) = willingness to pay.
  - Two High Courts (MP, Gauhati) built official MACT calculators = demand
    the judiciary itself noticed.
- Tiers used below: **Very High** (all proxies agree, mass Hindi demand),
  **High** (several content sites compete, clones or paid tools exist),
  **Medium** (a few content pages, no dedicated domains), **Niche** (little
  competition, high intent per visitor).
- SERP labels: **Gov** (portal owns the head term, only the long tail is
  open), **Content** (LawRato/Vakilsearch/iPleaders/Hindi blogs — beatable),
  **Fintech** (Paisabazaar/Groww/ClearTax — not winnable for a law site).

---

## 3. What the site already has (so nothing below duplicates it)

| Area | Live today | Gap noticed during review |
|---|---|---|
| Tools (7 at review; 11 since 13 Sep 2026) | Stamp duty (sale deed only, 3 gender categories), land units (10 Bihar units), IPC→BNS (86 rows, 14 "hot"), court fee (ad valorem, ₹50k ceiling), maintenance estimator, limitation checker (13 items), Vaishali cause list. *Since §0:* stamp tool covers 17 deed types; limitation checker has 20 items; MACT, cheque-bounce, vanshavali and consumer-forum tools added; 42 per-section BNS/BNSS pages in EN+HI | No Hindi twins for the tools; no RERA or RTPS-appeal periods yet |
| Guides (11 EN + 9 HI) | Dakhil-kharij, land survey documents, Lok Adalat, sharab-bandi bail, FIR refusal, first date of a criminal case, cheque-bounce deadlines, certified copy, mutual-consent divorce, HUF/ancestral property, free legal aid | Dakhil-kharij guide predates the 2026 fee amendment (see §7); survey guide has no status/objection stage; no court-marriage, cyber, bail-bond or DV how-to |
| Lookups | Case status for 38 districts (eCourts), case-law search + 8 topic pages | No revenue-court (DCLR/ADM) status; no MVR lookup |
| Checklists (5) | Property purchase, property dispute, mutual divorce, criminal case, consumer complaint | No surety/bail-bond, succession or survey-objection checklist |
| Structured data | FAQPage, WebApplication, BreadcrumbList, BlogPosting, LegalService, hreflang EN↔HI on 9 pairs | Fine. New tools inherit it via `ToolShell` + `toolFaqs.js` |

---

## 4. Prioritised opportunities

Ordering within each tier weighs: demand × SERP winnability × chance the
visitor becomes a client × how much existing code it reuses. "Verify" flags
point to §7.

### P0 — build first (calculators and tools; reuse existing infrastructure)

**P0-1. Stamp-duty calculator: deed-type selector + total-outlay view**
- **Built 13 Sep 2026 — see §0.** Mutation fee shown as reported, not added.
- Add: gift, family partition (flat ₹50 + ₹50 since 2019), non-family partition,
  lease/rent by tenure, agreement to sell, power of attorney, simple mortgage,
  will (no duty; ₹100 registration), exchange, release. Add rows for TDS
  (1% when consideration or MVR ≥ ₹50 lakh), the new mutation fee, e-mapi,
  scanning/pasting, and the online e-registration rebate already in the FAQs.
- Queries: "gift deed stamp duty bihar", "बिहार में गिफ्ट डीड का खर्च",
  "partition deed stamp duty bihar", "पारिवारिक बंटवारा रजिस्ट्री खर्च",
  "power of attorney registration fee bihar", "lease deed registration bihar",
  "tds on property purchase 50 lakh".
- Demand: Very High. SERP: Content (Godrej, Bajaj, 99acres, 1acre, ezylegal all
  cover sale deed only; the official nibandhan fee chart is a PDF nobody can
  read on a phone).
- Why it fits: Prabhat Khabar reports only 1,500–2,000 ₹100 family partitions
  registered in six years because nobody knows the rule. Every deed type is
  drafting work.
- Reuse: `STAMP_CATEGORIES` in `src/lib/legalTools.js`, existing FAQ slots.
- Verify: gift-deed rate for blood relatives; lease slabs; mortgage cap (§7).

**P0-2. Per-section BNS pages + classification columns + Hindi**
- **Built 13 Sep 2026 — see §0.** 42 sections (the list below plus BNS 302); Special-Acts tab not started.
- Generate `/bns/<section>` and `/hi/bns/<section>` for the ~40 sections that
  eCourtsIndia's log analysis says trial courts and police actually type:
  103, 105, 106(1), 108, 109, 115(2), 117(2), 118, 64, 74, 79, 80, 85, 87,
  137(2), 303(2), 308(2), 309(4), 316(2), 318(2)/(4), 319(2), 317, 336, 338,
  3(5), 61(2), 189, 191, 190, 196, 221, 223, 281, 351, 352, 356 and BNSS 163
  (old 144), 144 (old 125), 482 (old 438), 173 (old 154), 35(3) (old 41A).
- Each page: old number, new number, offence in plain Hindi and English,
  punishment, cognizable, bailable, triable by, compoundable (BNSS 359),
  derived flags (BNSS 35(3) notice applies when max ≤ 7 yrs; default-bail
  clock 60 vs 90 days), FAQ schema ("BNS 318 me kitni saza hai?"), link to
  the Bihar bail guide and the district case-status lookup.
- Queries: "BNS 318", "dhara 302 kya hai", "IPC 420 in hindi", "section 85
  BNS bailable or not", "bailable non bailable offence list", "संज्ञेय
  असंज्ञेय अपराध सूची", "dhara 144 kya hai".
- Demand: Very High (Aaj Tak/Amar Ujala explainers; five micro-sites exist
  only for this; YouTube ranks #1 for "BNS 318 hindi"). SERP: Content.
- Distinctive snippet: a warning block that BNS 316 is breach of trust, not
  cheating, and BNS 302 is hurting religious feelings, not murder. The Bill's
  pre-renumbering figures are still circulating in press pieces and people
  arrive with the wrong number.
- Reuse: `src/data/bnsSections.js` (add `punishment`, `cognizable`,
  `bailable`, `triableBy`, `compoundable`, `offenceHi`); route family in
  `routes.js` + `App.jsx` like the district pages. Add a Special-Acts tab
  later (NDPS quantities, Arms Act 25, POCSO, SC/ST, Prohibition 30/37, DP Act
  3/4, NI Act 138).
- Verify: classification from the BNSS First Schedule (India Code PDF or NCRB
  CyTrain HTML), not from blogs.

**P0-3. Motor-accident compensation calculator (MACT)**
- **Built 13 Sep 2026 — see §0.** Uplift reckoned to computation date; stated on the page.
- Inputs: age, income, salaried/self-employed, dependants, death vs injury.
  Sarla Verma multiplier (18 down to 5), Pranay Sethi future prospects
  (50/30/15% salaried; 40/25/10% self-employed), personal-expense deduction
  by dependants, conventional heads with the 10%-every-three-years escalation,
  s.164 no-fault (₹5 lakh / ₹2.5 lakh), hit-and-run scheme (₹2 lakh /
  ₹50,000), 6-month limitation under s.166(3).
- Queries: "motor accident compensation calculator", "MACT claim calculator",
  "सड़क दुर्घटना मुआवजा कितना मिलता है", "accident claim kaise kare",
  "hit and run compensation 2 lakh".
- Demand: High–Very High. SERP: Content (small firms with tables, no tool;
  MP and Gauhati HC calculators are bare and unexplained; Patna HC has none).
- Why it fits: MACT claims are instructions with a clear fee model; MACT sits
  with the District Judge at Hajipur.
- Verify: whether the conventional-heads escalation runs from the accident or
  the award (courts differ). State the assumption on the page.

**P0-4. Cheque-bounce compensation & interest calculator + s.138 notice generator**
- **Built 13 Sep 2026 — see §0.** Limitation items added too.
- Calculator: cheque amount, dishonour date, expected trial length → max fine
  (2× amount), s.143A interim compensation ceiling (20%, discretionary per
  Rakesh Ranjan Shrivastava 2024), s.148 appeal deposit (20%), likely s.357 /
  BNSS 395 compensation with interest. Two modes: "I received a bounced
  cheque" / "my cheque bounced". Generator: fills a 30/15/30-day-compliant
  notice in Hindi or English.
- Queries: "cheque bounce case fine", "चेक बाउंस होने पर कितनी सजा",
  "cheque bounce notice format", "चेक बाउंस नोटिस फॉर्मेट", "cheque bounce
  case me kitna paisa milta hai", "cheque bounce case cost".
- Demand: High. SERP: Content (LawRato Q&A, Vakilsearch articles; no
  interactive tool anywhere).
- Reuse: existing deadlines guide, `/case-law/cheque-bounce-section-138`,
  limitation checker (add the three s.138 deadlines as items).

**P0-5. Hindu succession share calculator ("who gets what without a will")**
- **Not built.** Nothing blocks it; next candidate.
- Inputs: widow(s), sons, daughters, mother, predeceased children's branches;
  self-acquired vs coparcenary property; death before/after 9 Sep 2005.
  Output: shares under ss.8–10 HSA, Class I list, Vineeta Sharma (2020) note.
  Later: a Hanafi Muslim inheritance mode (spouse, parents, sons, daughters
  and radd) since Vaishali/Muzaffarpur/Darbhanga have large Muslim populations.
- Queries: "hindu succession act class 1 heirs share", "property distribution
  after father's death without will", "पिता की मृत्यु के बाद संपत्ति का
  बंटवारा", "बेटी का हिस्सा 2005", "muslim inheritance calculator india",
  "virasat me hissa".
- Demand: Medium–High. SERP: open (two weak Indian tools, no Hindi tool).
- Why it fits: partition (batwara) is the number-one rural dispute in Bihar;
  the output links to partition suit, vanshavali and dakhil-kharij pages.

**P0-6. Legal-heir vs succession-certificate decision tool + Bihar court-fee estimator**
- **Not built — blocked on the court fee (§7).**
- Wizard: asset type, value, nominee present?, disputed? → which document
  (Waris certificate from the Circle Officer vs succession certificate from the
  District Judge vs nothing, now that RBI's Sept 2025 directions let
  nominees/survivors claim without one), where, fee, time. Include the RBI
  no-nominee simplified route (up to ₹15 lakh commercial banks / ₹5 lakh
  co-ops, 15-day settlement, effective 31 Mar 2026).
- Queries: "legal heir certificate bihar", "उत्तराधिकार प्रमाण पत्र कैसे
  बनेगा", "succession certificate court fee bihar", "वारिस प्रमाण पत्र
  बिहार", "nominee vs legal heir bank account", "mrit vyakti ka bank account
  paisa kaise nikale".
- Demand: High. SERP: Content (national aggregators say "Tehsildar", which is
  wrong for Bihar; most pages predate the RBI directions).
- Verify: the succession-certificate court fee (§7 — two incompatible
  figures found). Do not ship a number until settled at the Hajipur civil court.

**P0-7. Vanshavali (Prapatra 3(1)) generator + affidavit + how-to**
- **Built 13 Sep 2026 — see §0.** Generator + affidavit; the how-to stays in the survey guide.
- Fill family tree → prints Prapatra 3(1) and the shapath patra; explains the
  Panchayat Sachiv → Gram Kachahari route, the 7-day notice-board window,
  Aadhaar copies, and where it is used (survey Prapatra 2, dakhil-kharij by
  inheritance, partition).
- Queries: "vanshavali format bihar", "वंशावली फॉर्म pdf", "vanshavali kaise
  banaye", "vanshavali sarpanch ya sachiv", "वंशावली शपथ पत्र".
- Demand: Very High and survey-driven (paid generators at ₹8–₹49 exist).
  SERP: Content (Hindi blogs contradict each other on who issues it).
- Reuse: survey guide (EN+HI) already links here conceptually; "vanshavali
  text generator" was already an idea in the backlog.
- Verify: issuing authority per the Panchayati Raj Department letter; the
  "₹10 stamp" claim is unsupported.

**P0-8. Consumer-forum jurisdiction & fee finder**
- **Built 13 Sep 2026 — see §0.** Complaint-draft generator (P1) not started.
- Consideration value + district → District/State/National Commission, fee
  slab (nil ≤ ₹5 lakh … ₹7,500 above ₹10 crore), e-Daakhil link, District
  Commission Vaishali (Hajipur) address. Explain "value of consideration, not
  compensation claimed", which trips self-filers.
- Queries: "consumer court fee", "consumer forum jurisdiction limit",
  "उपभोक्ता फोरम में शिकायत कैसे करें", "consumer complaint fee calculator",
  "e-daakhil complaint kaise kare".
- Demand: High. SERP: Content (no interactive tool).
- Reuse: consumer checklist; add a complaint-draft generator in P1.

### P1 — high demand, strong legal fit (guides, lookups, second-wave tools)

**Land and revenue**

- **P1-1. Vaishali MVR / circle-rate lookup** feeding the stamp calculator
  (registration office × thana × land type). "hajipur circle rate" currently
  returns no usable data anywhere. Very High demand, Mixed SERP. Do Vaishali
  and Patna only; statewide scraping is not worth maintaining.
- **P1-2. Land survey: status/phase lookup + objection (Prapatra 8) + hearing
  guide**, extending the existing survey pages. dlrs traffic is rising 20%
  month-on-month toward the Dec 2026 deadline. Very High, Content SERP.
  Objections and title disputes flowing from survey entries are litigation.
- **P1-3. Dakhil-kharij refresh**: the reported ₹200 fee under the 2026
  Mutation (Amendment) Bill (verify — §7), rejection reasons, DCLR appeal
  path, plus "DCLR appeal (30 days)" and "mutation filing (90 days)" as
  limitation-checker items.
- **P1-4. Revenue-court case-status lookup** (DCLR / ADM / Collector via the
  RCMS, CISBLDRA and ADMCMS endpoints) mirroring the civil case-status pages,
  plus a Jan Shikayat (bhumi vivad) how-to. Medium–High, Gov endpoints exist
  but are unfindable.
- **P1-5. "Registry rules 2026" explainer**: Supreme Court in Samiullah v.
  State of Bihar (7 Nov 2025) struck the rule making jamabandi in the
  seller's name a precondition to registration; the April 2026 process adds
  satellite-image upload and online pre-verification. High, news-driven, no
  site reconciles both correctly.
- **P1-6. Kewala (old deed) copy + 30-year title-chain guide** and
  **encumbrance certificate Bihar guide**, extending the due-diligence
  checklist. High, Content SERP, title-opinion work.
- **P1-7. Sahmati batwara panchnama generator + ₹100 registered partition
  guide** (distinguish unregistered panchnama for survey from the binding
  registered deed). High, Content SERP.
- **P1-8. Gift deed, will (vasiyat) and power-of-attorney format pages** with
  Bihar duty and registration steps; POA has a real Vaishali angle (migrant
  workers executing POA for land back home). High, Content SERP.

**Criminal and bail**

- **P1-9. Default-bail / chargesheet clock calculator (BNSS 187)**: date of
  first remand + max punishment → date default bail accrues (60/90 days),
  with the 15-day police-custody window. Only one competitor tool exists.
- **P1-10. BNSS 35(3) notice ("41A notice") guide + reply template**, linked
  to the anticipatory-bail page. High, Content SERP.
- **P1-11. Bail bond / surety (jamanatdar) Hindi guide + checklist** (who can
  stand surety, LPC/jamabandi/Aadhaar/photos/affidavit, what the Hajipur court
  asks). High; only thin Hindi blogs rank.
- **P1-12. Bihar Prohibition vehicle-release calculator** extending the
  sharab-bandi guide: insured value → 10% penalty capped ₹5 lakh (2023 Rules),
  15-day claim clock, 90-day confiscation, 60/90-day appeals. Facts already
  verified in the project memory. Local monopoly.
- **P1-13. Special-Act bail pages**: NDPS quantity → bail chart (ganja 1 kg /
  20 kg, s.37 twin conditions), Arms Act s.25 (desi katta cases), SC/ST Act
  s.18 after the 1 Sep 2025 SC ruling, POCSO s.29. High in Bihar, Content SERP.
- **P1-14. Quashing FIR at Patna HC (BNSS 528)**, **non-bailable warrant: what
  to do** (say plainly that no public warrant-by-name lookup exists and route
  to case status), **dowry sections group (BNS 80/85/86 + DP Act 3/4) with
  both-sides guides**, **Domestic Violence complaint how-to + DIR template**.
  All High, Content SERP, all bail/defence work.

**Money, credit and fraud**

- **P1-15. Loan-default legal timeline tool**: last EMI date → SMA-0/1/2 → NPA
  at 90 days → SARFAESI 13(2) 60-day notice → 13(3A) 15-day reply → 13(4) →
  DRT Patna s.17 within 45 days → DRAT 50% deposit, with "what to do at this
  step". Hindi head terms ("loan nahi chukaya to kya hoga") are Very High and
  news-owned; the tool wins the long tail. DRT Patna covers all Bihar.
- **P1-16. Recovery-agent rules checker + complaint kit** (RBI 12 Aug 2022
  circular: no calls before 8 am / after 7 pm, no contacting relatives) →
  auto-drafted complaint to the bank nodal officer, RBI CMS and police. High;
  fintech blogs and Hindi news only.
- **P1-17. Cyber-fraud golden-hour checklist** (1930, cybercrime.gov.in, RBI
  zero-liability within 3 working days, digital-arrest advisory) and
  **"bank account frozen by cyber cell — unfreeze guide + representation"**
  (Delhi/Kerala/Bombay HC 2025–26 on s.106/107 BNSS). Already P3 in the
  backlog; promote. Many Bihar accounts get lien-marked as mule recipients and
  need a magistrate's order lifted — under-served and it is legal work.
- **P1-18. Bank/RBI Ombudsman wizard**: the scheme changed on 1 Jul 2026
  (RB-IOS 2026: 90-day filing window, ₹30 lakh cap), so almost all existing
  content is stale.

**Family and civil**

- **P1-19. Court marriage + marriage registration Bihar hub** (already P3 in
  the backlog). Special Marriage Act 30-day notice, witnesses, Hajipur
  Marriage Officer; 2006 Rules make the Mukhiya/Ward Councillor the Marriage
  Registrar, which no competitor states; late-fee calculator (₹100 for 30–90
  days, ₹50/month after, cap ₹1,000). Verify fees (§7).
- **P1-20. Document generators**: affidavit / shapath patra (name, DOB,
  address, lost documents, income), 11-month rent agreement with Bihar duty
  (1% of annual rent or ₹500, whichever is less), legal notice (recovery,
  eviction under s.106 TPA, s.138). Very High national demand, Content SERP,
  Hindi long tail open. Each ends in "send it through an advocate".
- **P1-21. Senior-citizen maintenance tribunal (SDO Hajipur) guide +
  application format**. No Bihar how-to exists; high-value elder clients.

### P2 — medium demand or brand/authority value

- CIBIL dispute-letter generator + ₹100/day compensation calculator (RBI
  Oct 2023 framework: 30-day resolution). The only CIBIL angle a law site can
  win; see §5 for what to skip.
- Sahara/CRCS refund resubmission guide (≈28 lakh Bihar applications; SC
  deadline 31 Dec 2026, so time-limited).
- Parimarjan Plus, e-Mapi, LPC, khatiyan-vs-jamabandi guides (already P2 in
  the backlog; Very High demand but thin legal fit; short pages that link into
  the tools).
- Gairmajarua aam/khas, bataidari, land-ceiling explainers, and matching
  case-law topic pages (adverse possession too). Medium demand, no
  plain-language page exists, very high litigation fit.
- Capital-gains-on-land calculator (12.5% no-indexation vs 20% indexed for
  pre-23 Jul 2024 land; CII 384 for FY 2026-27) and a rural-agricultural-land
  capital-asset checker (2/6/8 km aerial tests, pre-loaded with Hajipur/Patna
  populations). Medium, differentiated.
- Interest on decree calculator (s.34 CPC pre-suit / pendente lite /
  post-decree) and MSME Samadhaan delayed-payment interest (45 days, 3× bank
  rate, monthly rests). Niche, no competition, useful to the bar.
- Application-letter generator to CO/BDO/SDO/DM in Hindi; RTI application +
  first-appeal generator (Jaankari portal, ₹10); self-declaration and NOC
  formats. High Hindi demand, thin competitors, mostly brand traffic.
- Insurance claim rejection → remedy finder (Bima Bharosa / Ombudsman ≤ ₹50
  lakh); salary-not-paid remedy finder; gratuity-not-paid complaint (Form N)
  page instead of a gratuity calculator; Bihar minimum-wages table + arrears
  (₹436/452/551/672 per day from 1 Apr 2026); gold-loan auction rights
  checker (RBI 2025 Directions, in force 1 Apr 2026).
- Hindi legal glossary (kewala, khesra, chauhaddi, jamabandi, muchalka,
  zamanat, vad, ekrarnama …): no layperson Bihar-land glossary exists; works
  as an internal-link hub.
- Character certificate, RTPS timelines and the RTPS Act appeal, EWS/OBC-NCL
  eligibility checker, late birth registration (magistrate order after one
  year): short pages only, for topical completeness.
- Land converter: district-specific katha and other-state units (UP/WB/Assam
  bigha, guntha, cent, ground, marla/kanal) plus a "value per katha" output;
  a single Bihar-vs-neighbour stamp-duty comparison table.
- Maintenance estimator: add a one-time alimony mode with the Rajnesh v. Neha
  affidavit checklist rather than a new URL.

---

## 5. Checked and not worth pursuing

| Query family | Why | Winnable adjacent angle |
|---|---|---|
| "cibil score check free", "cibil score kaise badhaye", "cibil score by pan" | Fintech + CIBIL.com own it; needs a bureau API; transactional intent | Dispute letter + ₹100/day compensation; "settled ko closed kaise karaye"; guarantor liability |
| EMI, loan-eligibility, home-loan calculators | Bank/fintech domains, zero legal intent | Interest on delayed payment (s.34 CPC), MSME interest |
| Gratuity, PF, notice-period calculators (head terms) | Groww/ClearTax/EPFO; "epfo" alone is ~24.5M searches/month | "gratuity not paid complaint", "employer not depositing PF" |
| e-challan, driving licence, RC transfer | Parivahan + aggregator wall; no legal work | none |
| RTPS "apply", ration card, pension lists, PM-Kisan, e-Shram, scholarships | Gov portal + typosquat swarm; makes the site look like a yojana blog | Only "rejected → appeal/remedy" |
| "bhulekh bihar", "bihar bhumi", bhu-naksha, bhu-lagan as tools | Gov + 20 clones; cannot replicate map or payment | Thin hub pages linking to real tools |
| Statewide MVR scraping, all-ULB property-tax calculator | High maintenance, data not published in scrapeable form | Vaishali/Patna MVR only; holding-tax formula estimator at most |
| Stamp-duty / court-fee calculators for UP, Jharkhand, WB | Established state calculators; dilutes Bihar authority | One comparison table |
| Chakbandi Bihar | Statute dormant; no programme, no demand | none |
| Land-conversion fee calculator | Act repealed 2026; nothing to calculate | Repeal explainer (P2) |
| Full IPC 511-section list | LawRato/Indian Kanoon own it; legacy law | The ~40 hot BNS sections |
| "Warrant check online by name" | No such public lookup exists; do not promise one | NBW explainer routing to case status |
| Standalone alimony calculator | Saturated with unsourced hobby apps | Mode inside the maintenance estimator |
| Advocate-fee estimator | Bar Council advertising rules; no data | none |
| Passport police verification, Aadhaar/PAN/voter-ID how-tos, UDID | Central portals own them; no conversion | Affidavit generator covers the legal slice |

---

## 6. Structural and technical notes

1. **Hindi twins for tools.** Route table and `HREFLANG` in `src/data/routes.js`
   already support pairs; `hindi.js` pages are prose. A tool twin needs the
   `ToolShell` labels and FAQ text in Hindi, not a new calculator. Start with
   the three tools that already win in GSC.
2. **Per-section pages are a route family, not a content task.** Follow the
   district case-status pattern: one data array → N prerendered routes with
   their own title, FAQ schema and breadcrumb. `bnsSections.js` needs five
   new fields per row before it can drive pages.
3. **Limitation checker is the cheapest place to add ranking surface.** Each
   new item is a few lines: s.138 notice/complaint deadlines, DCLR mutation
   appeal, survey objection, MACT 6 months, consumer 2 years, RERA, RTPS Act
   appeal, DRT 45 days, RB-IOS 90 days, insurance ombudsman 1 year.
4. **Every tool should end in a CTA keyed to its output** ("your deed will
   cost ₹X; the chamber drafts and registers partition deeds") and link to the
   matching Hindi page, checklist and case-law topic.
5. **Facts drift.** Several 2026 changes (mutation fee, registry process,
   RB-IOS 2026, gold-loan directions, Code on Social Security) invalidated
   competitor content. Dating each tool's rules ("rates as of Sep 2026") and
   keeping a `lastReviewed` field will matter more as these pages age.
6. **Fees page** still has `FEES_PUBLISHED = false`, and blog posts have null
   dates. Both were in the README's TODO list and affect trust signals on
   every page linked from a tool.
7. **Search Console.** Export the query report and check which existing tool
   queries include Hindi transliterations ("katha se square feet", "dhara
   420"). That tells you which Hindi twins to build first.

---

## 7. Facts to verify before building (conflict register)

The research found contradictory or single-source figures. None should ship
without checking the primary source named.

| Topic | What was found | Check against |
|---|---|---|
| Gift deed duty, Bihar | ezylegal: 2% blood relative / 6% others, registration 1% cap ₹15,000; Godrej: 3% + 2%; others: no concession (6% + 2%) | Registration Dept fee chart PDF at nibandhan.bihar.gov.in; CAG Bihar stamp manual |
| Succession-certificate court fee, Bihar | 2007 Amendment Act (Bihar Act 4 of 2008): probate/LoA 10%, min ₹500, max ₹3,00,000, succession certificate "as in item 3"; secondary sources: 3% capped ₹30,000 under a 2010 amendment | Court Fees (Bihar Amendment) Act 2010 text; ask at Hajipur civil court |
| Mutation fee | Bihar Land Mutation (Amendment) Bill 2026 reportedly introduces ₹200 for mutation, appeal and correction applications (Prabhat Khabar, Jul–Aug 2026); the existing guide and project memory say "free" | Gazette notification; update the guide and memory either way |
| Dakhil-kharij SLA (35/75 working days) | Project memory says verified; one research pass could not re-verify from the Act PDF | Keep, but recheck against the 2026 amendment |
| Vanshavali | Issuing authority: Panchayat Sachiv per a Dec 2023 PRD letter vs "sarpanch" in blogs; "₹10 stamp" appears nowhere authoritative | Panchayati Raj Vibhag circular on state.bihar.gov.in |
| Marriage fees | HMA ₹100 / SMA ₹150 (aggregators); "₹100–500 varies by district"; tatkal up to ₹2,100 | Hajipur Sub-Registrar / Marriage Officer |
| Lease/rent duty slabs | 6% (1–5 yrs) and 8% (>5 yrs) from a single content source; <1 yr 1% or ₹500 corroborated | nibandhan fee chart |
| Mortgage duty | 1% of loan capped ₹20,000 for banks; equitable mortgage nil — Quora only | nibandhan fee chart |
| Bihar State Gazette name change | ₹520 via RTPS, 3–4 weeks — service sites only | serviceonline.bihar.gov.in service list |
| Character certificate fee | No fee found in any source | RTPS service 1205 page |
| Gun licence validity | Arms (Amendment) Act 2019 made it 5 years; some guides still say 3 | Act text |
| Encumbrance certificate fee | ₹250–₹1,000 rising past 10 years (godigit) | bhumijankari e-services |
| Bhu-Abhilekh copy fee | ₹10 unsigned / ₹20 signed (clone sites) | portal |
| Pranay Sethi conventional heads | 10% escalation every 3 years from Oct 2017; from accident date or award date is contested | State the assumption on the calculator |
| BNS classification | Blogs disagree on a few rows (e.g. 118(1) bailability) | BNSS First Schedule, India Code PDF |
| Court marriage fee | Sources conflict | Hajipur Marriage Officer |

---

## 8. Suggested order if everything above is approved

1. ~~P0-1 stamp deed-type selector~~ — done 13 Sep 2026
2. ~~P0-2 BNS per-section pages~~ — done 13 Sep 2026
3. ~~P0-3 MACT calculator and P0-4 cheque-bounce calculator + notice~~ — done 13 Sep 2026
4. ~~P0-7 vanshavali generator~~ — done 13 Sep 2026; **P1-2 survey objection
   guide still open** (deadline-driven, Dec 2026)
5. P0-5 succession calculator (nothing blocks it); P0-6 heir/succession-
   certificate tool (after the fee is verified)
6. ~~P0-8 consumer fee finder~~ — done 13 Sep 2026; P1-15/16 loan-default
   timeline + recovery-agent kit still open
7. Hindi twins for the seven original tools (the four new tools have Hindi
   output where it matters — the notice and the vanshavali — but English
   chrome)
8. P1 guides in the order listed, then P2

---

## 9. Key sources

Land and revenue: similarweb.com/website/biharbhumi.bihar.gov.in;
similarweb.com/website/dlrs.bihar.gov.in; prabhatkhabar.com (₹100 partition;
₹200 mutation fee, Jul–Aug 2026); taxguru.in (SC Samiullah v. State of Bihar,
7 Nov 2025); indianstates.csis.org (April 2026 registration process);
nibandhan.bihar.gov.in fee chart PDF; services.india.gov.in (Parimarjan Plus);
biharbhumi.bihar.gov.in/Biharbhumi/RCMS/RCMSDefault; land.bihar.gov.in
CISBLDRA case status; emutation.bihar.gov.in ADMCMS case status.

Criminal: blogs.ecourtsindia.com/2026/08/30/ipc-to-bns-section-mapping;
cytrain.ncrb.gov.in BNSS Schedule; upload.indiacode.nic.in BNSS First
Schedule; indiankanoon.org/doc/139996215 (Pranay Sethi); mphc.gov.in
claim-calculator; scrb.bihar.gov.in/View_FIR.aspx; lawbeat.in (SC/ST s.18,
1 Sep 2025); indiatvnews.com and legalitysimplified.com (Prohibition 2023
Rules).

Money and credit: rbi.org.in notification 12378 (recovery agents, 12 Aug
2022); rbi.org.in FAQ 3407 (RB-IOS 2026); rbidocs.rbi.org.in IRAC 12 Nov 2021
(SMA/NPA); cibil.com/framework-for-compensation; rbi.org.in notification 12901
(deceased customers, 26 Sep 2025); rbi.org.in notification 12859 (gold loans);
pib.gov.in 1786342 (consumer pecuniary limits); indiankanoon.org/doc/3802336
(Court Fees (Bihar Amendment) Act 2007); pib.gov.in 2114750 (digital-arrest
advisory); scconline.com (Delhi HC account freezes); mocrefund.crcs.gov.in.

Documents and services: indiankanoon.org/doc/85157158 (Bihar Marriage
Registration Rules 2006); prsindia.org (HSA Amendment 2005);
serviceonline.bihar.gov.in; jaankari.bihar.gov.in; parimarjanplus.bihar.gov.in
affidavit format; latestlaws.com (Bihar Senior Citizens Rules 2012);
factohr.com and teamleaseregtech.com (Bihar minimum wages, Apr 2026).
