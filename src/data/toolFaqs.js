// ============================================================================
//  TOOL PAGE FAQs.
//
//  These used to live inside each calculator's component. They were moved here
//  because the build-time prerenderer needs them to emit FAQPage structured
//  data, and the prerenderer loads plain data modules, not React components.
//  One copy, rendered on the page and described in the markup — they can no
//  longer drift apart.
// ============================================================================

export const toolFaqs = {
  "/tools/stamp-duty-calculator": [
    {
      q: "What is stamp duty on a sale deed in Bihar?",
      a: "Bihar charges 6% stamp duty with a 2% registration fee as the general rate, adjusted by the gender of the parties: 5.7% + 1.9% where a male transfers to a female, and 6.3% + 2.1% where a female transfers to a male. The concession is a policy measure to encourage property being held in women's names.",
    },
    {
      q: "What is MVR, and why is my duty higher than I expected?",
      a: "The Minimum Value Register (MVR) is the government's own circle-rate valuation for the plot. Duty is charged on the consideration stated in the deed or the MVR value, whichever is higher. If the MVR rate for your area exceeds the price you agreed, duty is computed on the MVR figure — this is the single most common surprise at the registry office.",
    },
    {
      q: "How much does a gift deed cost to register in Bihar?",
      a: "The same as a sale. On the Registration Department's published chart a gift (Article 33) is charged like a conveyance — 6% duty and 2% fee on the MVR value of the property, with the same gender concession (5.7% + 1.9% or 6.3% + 2.1%). Bihar does not give a separate blood-relation concession on gifts, whatever a national portal may say. Gifts to schools, hospitals, orphanages and similar public institutions are exempt.",
    },
    {
      q: "How much does a family partition deed cost to register in Bihar?",
      a: "Far less than people assume. A registered partition deed of inherited family property attracts a flat ₹50 stamp duty and ₹50 registration fee — ₹100 in all — rather than the ad valorem rates that apply to a sale. Partition of any other co-owned property is 3% + 2% on the value of the shares separated, leaving out the largest share. With the land survey rewriting the khatiyan, registering a long-pending family partition is one of the cheapest and most valuable pieces of paperwork in Bihar.",
    },
    {
      q: "What is the stamp duty on a lease or rent agreement in Bihar?",
      a: "For a lease of land or a building at a fixed rent, conveyance duty (6% + 2%) is charged on a slice of the MVR value that grows with the term — 2% of value for under a year, 5% for one to ten years, 15% up to thirty years and 50% beyond. A house or flat rent agreement (kirayanama) is charged at 0.5% of the total rent for the term. An 11-month tenancy need not be registered at all and is usually notarised on stamp paper instead.",
    },
    {
      q: "How much does a power of attorney cost to register in Bihar?",
      a: "It depends entirely on who receives it and what it allows. A power to sell property given to someone outside the family is charged as if it were the sale — 6% of the MVR value plus a ₹10,000 registration fee. A power to a family member (parents, spouse, children, siblings, daughter-in-law, grandchildren), or one that is for a court case or not for sale, is ₹1,000 duty and ₹1,000 fee. This is the trap migrant families fall into when they hand a general power over village land to an outsider.",
    },
    {
      q: "Is there stamp duty on a will in Bihar?",
      a: "No. A will (vasiyat) attracts no stamp duty, and registering it is optional. If you do register it — which is strongly advisable, because a registered will is very hard to challenge as forged — the registration fee is ₹2,000, and the same fee applies to cancelling a registered will.",
    },
    {
      q: "Is there a discount for registering online in Bihar?",
      a: "Yes. Completing the registration through Bihar's online e-registration process earns a rebate of 1% of the stamp duty, capped at ₹2,000, under S.O. 10/2016. A scanning fee applies separately — ₹250 for a document up to 10 pages, ₹500 up to 20 pages and ₹1,000 beyond that. The rebate is worth claiming on almost every sale deed.",
    },
    {
      q: "Do I have to pay TDS when buying property worth ₹50 lakh or more?",
      a: "Yes. Under Section 194-IA of the Income-tax Act the buyer must deduct 1% of the price — or of the stamp-duty value, if that is higher — where either is ₹50 lakh or more, deposit it against the seller's PAN through Form 26QB within 30 days of the end of the month, and give the seller Form 16B. It is not an extra cost to the buyer; it comes out of what the seller receives. The registry will ask to see the challan. Agricultural land is exempt.",
    },
    {
      q: "Is the mutation (dakhil kharij) fee included in these figures?",
      a: "It is shown separately, because it is paid later at the Circle Office and not at the registry. Mutation applications in Bihar were free until 2026; the Bihar Land Mutation (Amendment) Bill 2026 is reported to introduce a ₹200 fee for mutation, appeal and correction applications. The calculator shows that figure as reported. Confirm at the Circle Office before budgeting for it.",
    },
    {
      q: "Are stamp duty and registration fee the same thing?",
      a: "No. Stamp duty is a tax on the instrument, paid to the State. The registration fee is charged separately for registering that instrument with the Sub-Registrar. Both are payable, which is why the effective cost of registering a sale deed in Bihar is around 8% of value rather than 6%.",
    },
  ],

  "/tools/land-unit-converter": [
    {
      q: "How many square feet is 1 katha in Bihar?",
      a: "In the Patna/Vaishali (Hajipur) standard — which also holds across most of north and central Bihar — 1 katha is 1,361.25 square feet, which is exactly 3.125 decimal. But the katha is a customary unit and varies by district, from roughly 750 to about 2,000 square feet. The figure that legally defines a plot is the decimal area written in the deed and the khatiyan, not the katha it is spoken of in.",
    },
    {
      q: "How many katha are there in a bigha, and a bigha in an acre?",
      a: "Across Bihar, 1 bigha = 20 katha, 1 katha = 20 dhur and 1 dhur = 20 dhurki. At the Patna/Vaishali standard that makes 1 bigha = 27,225 sq ft = 62.5 decimal, so 1 acre (100 decimal, 43,560 sq ft) works out to exactly 1.6 bigha, or 32 katha.",
    },
    {
      q: "What is a decimal (dismil) of land?",
      a: "One hundredth of an acre — 435.6 square feet, about 40.47 square metres. It is the unit Bihar's revenue records actually use: khatiyan and jamabandi entries, MVR (circle rate) tables and registered deeds all state area in acre and decimal. Everyday conversation happens in katha and dhur, and this converter is the bridge between the two.",
    },
    {
      q: "Why does the katha have different sizes in different districts?",
      a: "Because it was never fixed by statute — it is a customary measure that settled differently district by district under the old surveys. That is why a deed drawn anywhere in Bihar records the area in decimal, and why, when a sale discussed in katha is written up, the decimal figure in the document is the one that binds. Always check what the katha means in the specific mauza before agreeing a price per katha.",
    },
    {
      q: "Can this converter tell me my plot's actual area or boundary?",
      a: "No. It converts units; it cannot measure land. For the position on the ground you need a measurement by the government amin, which is booked online through Bihar's e-Mapi portal (₹500 per plot for rural land, ₹1,000 for urban, with a Tatkal option). If a boundary or area dispute has already surfaced, take legal advice before it hardens into possession.",
    },
  ],

  "/tools/ipc-to-bns-converter": [
    {
      q: "What replaced the IPC, CrPC and the Evidence Act?",
      a: "From 1 July 2024, the Indian Penal Code was replaced by the Bharatiya Nyaya Sanhita (BNS), the Code of Criminal Procedure by the Bharatiya Nagarik Suraksha Sanhita (BNSS), and the Indian Evidence Act by the Bharatiya Sakshya Adhiniyam (BSA). The offences and procedures largely continue, but almost every section number changed — which is why FIRs, bail orders and news reports now cite numbers that look unfamiliar.",
    },
    {
      q: "IPC 420 is now which section in the BNS?",
      a: "Section 318(4) of the Bharatiya Nyaya Sanhita — cheating and dishonestly inducing delivery of property. Cheating generally is Section 318: the definition is 318(1) and the aggravated form that used to be the famous '420' is 318(4).",
    },
    {
      q: "Does my old case now run under the BNS?",
      a: "No. The date of the offence decides the code: an offence committed before 1 July 2024 is charged under the IPC even if the FIR is registered afterwards, and cases already pending on that date continue under the old law. The new codes apply to offences committed on or after 1 July 2024.",
    },
    {
      q: "What is 'Dhara 144' now?",
      a: "This is the conversion people get caught by. The old CrPC Section 144 — the urgent prohibitory orders imposed during tension, what newspapers called 'Dhara 144' — is now Section 163 of the BNSS. Meanwhile the number 144 in the BNSS belongs to maintenance for wife, children and parents, which used to be Section 125 CrPC. Same number, completely different subject.",
    },
    {
      q: "Is Section 498A still there for cruelty cases?",
      a: "The offence continues, renumbered. Cruelty by a husband or his relatives is punished under Section 85 of the BNS, with Section 86 carrying the definition of cruelty. It remains cognizable and non-bailable, so anticipatory bail — now Section 482 BNSS, formerly 438 CrPC — remains the immediate remedy where arrest is feared.",
    },
    {
      q: "Is cheque bounce still Section 138?",
      a: "Yes. The Negotiable Instruments Act was not part of the 2024 replacement, so a cheque dishonour case is still Section 138 NI Act, with the same notice-and-15-days timeline as before. Only the three criminal codes — IPC, CrPC and the Evidence Act — were replaced.",
    },
  ],

  "/tools/court-fee-calculator": [
    {
      q: "How is court fee calculated on a civil suit in Bihar?",
      a: "Court fee in Bihar is ad valorem — it rises with the value of the claim. Under the Court Fees (Bihar Amendment) Act, 1995, the scale steps up by ₹80 for every ₹5,000 of value or part thereof, subject to a maximum of ₹50,000. Because it is charged per part-slab, a claim of ₹5,001 attracts the same step as one of ₹10,000.",
    },
    {
      q: "How much court fee do I pay on a suit worth ₹5 lakh in Bihar?",
      a: "A claim of ₹5,00,000 falls into 100 slabs of ₹5,000, so the ad valorem court fee works out to ₹8,000 — that is 1.6% of the claim. Enter your own figure in the calculator above to see the equivalent for your suit, including the slab breakdown.",
    },
    {
      q: "Is there a maximum court fee?",
      a: "Yes. The ad valorem scale is capped at ₹50,000. Beyond a claim value of roughly ₹31 lakh the fee stops rising, so a very large suit costs the same in court fee as one at the ceiling. This is why the effective percentage falls sharply on high-value claims.",
    },
    {
      q: "Do I pay court fee on the relief claimed or on the property's market value?",
      a: "It depends on the relief. A suit for recovery of money is valued at the sum claimed; a suit for declaration or possession is valued under the rules applicable to that relief, which may look to the market value of the property or to a notional value. Getting the valuation wrong invites an objection and can delay the suit at the threshold.",
    },
    {
      q: "How is court fee paid — stamp paper or online?",
      a: "Court fee is paid by way of judicial stamps affixed to the plaint, or through the electronic court-fee system where the court accepts it. The receipt or the e-stamp certificate must be filed with the plaint; a suit presented without the correct court fee is liable to be returned for deficiency at the registry stage.",
    },
    {
      q: "Is court fee refundable if the case settles?",
      a: "Where a matter is settled through mediation, Lok Adalat or a court-referred settlement, the court fee paid is ordinarily refundable. This is a deliberate statutory encouragement to settle, and it is worth factoring in before deciding to fight a matter to judgment.",
    },
    {
      q: "Is court fee the same as the advocate's fee?",
      a: "No, and they are unrelated. Court fee is a statutory levy payable to the State on instituting the proceeding; the advocate's professional fee is separate and is agreed between you and the chamber. Process fee, the cost of certified copies and expenses of service are further separate items.",
    },
  ],

  "/tools/maintenance-estimator": [
    {
      q: "Is there a formula for maintenance in India?",
      a: "No. No statute prescribes a percentage. What exists is judicial guidance: in Kalyan Dey Chowdhury v. Rita Dey Chowdhury (2017) the Supreme Court held that 25% of the husband's net salary would be just and proper as maintenance for the wife — and expressly said 25% of gross salary was not permissible. Courts work around that benchmark, not to it.",
    },
    {
      q: "What does a court actually look at?",
      a: "In Rajnesh v. Neha (2020) the Supreme Court set out the framework: the status of the parties, the reasonable needs of the claimant and the children, the claimant's own qualifications and earning capacity, the respondent's income and liabilities, and the standard of living enjoyed during the marriage. It also made an Affidavit of Disclosure of Assets and Liabilities mandatory in every maintenance proceeding.",
    },
    {
      q: "Is maintenance calculated on gross or net income?",
      a: "Net. The Supreme Court's 25% benchmark is expressly on net salary, after statutory deductions. Courts do scrutinise what is claimed as a deduction, however — voluntary deductions such as loan instalments taken on after the proceedings began are frequently added back to net income.",
    },
    {
      q: "Can maintenance be claimed while the divorce case is still running?",
      a: "Yes. Interim maintenance can be sought during the proceedings, and a claim under Section 144 of the BNSS (formerly Section 125 CrPC) is available independently of any divorce petition. Rajnesh v. Neha directs that interim applications be decided within 60 days, and maintenance is ordinarily awarded from the date of the application.",
    },
    {
      q: "What if the respondent hides their real income?",
      a: "This is the usual battleground. The mandatory disclosure affidavit exists precisely for it, and a court can draw an adverse inference where disclosure is evasive, look at lifestyle and standard of living rather than declared income, and in appropriate cases direct production of bank statements, income tax returns and employer records.",
    },
    {
      q: "Where is maintenance decided for a Vaishali district matter?",
      a: "Before the Family Court at the Hajipur court complex, which hears matrimonial and maintenance matters for Vaishali district. The same Supreme Court framework — the 25% net-salary benchmark and the Rajnesh v. Neha disclosure affidavit — is what that court applies.",
    },
  ],

  "/tools/limitation-checker": [
    {
      q: "What happens if I file after the limitation period expires?",
      a: "The suit or appeal is liable to be dismissed as barred by limitation, and the court is bound to take the point even if the other side does not raise it. Section 5 of the Limitation Act allows delay in appeals and applications (not ordinarily in suits) to be condoned where sufficient cause is shown — but that is a discretion to be earned on affidavit, not a right.",
    },
    {
      q: "When does limitation actually start running?",
      a: "This is the question that decides most limitation disputes, and it is the one a calculator cannot answer. The starting point differs by the nature of the claim: the date a debt fell due, the date possession became adverse, the date you learned of a fraud, the date of the decree. Getting the starting date wrong makes every calculation downstream of it wrong.",
    },
    {
      q: "Can the period be extended?",
      a: "It can be interrupted or extended in defined situations — a fresh acknowledgement of liability in writing signed by the debtor starts time afresh under Section 18, a part payment can have the same effect under Section 19, and time during which the plaintiff was under a legal disability or was prosecuting proceedings in a wrong court in good faith may be excluded.",
    },
    {
      q: "Is time spent getting a certified copy excluded when filing an appeal?",
      a: "Yes. Section 12 excludes the time requisite for obtaining a copy of the decree or order appealed from. This routinely gives an appellant more working time than the bare period suggests, but only the time genuinely requisite is excluded — not delay in applying for the copy in the first place.",
    },
    {
      q: "Does limitation work the same way in Bihar courts?",
      a: "Yes — the Limitation Act, 1963 is central law and applies in the courts at Hajipur and across Bihar exactly as it does elsewhere in India. What is local is practice: apply for the certified copy at the copying section the day judgment is pronounced, and keep the receipt, because that date is what Section 12 protects on an appeal to the Patna High Court.",
    },
  ],

  "/tools/mact-compensation-calculator": [
    {
      q: "How is motor accident compensation calculated in India?",
      a: "For a death claim: take the deceased's annual income, add a percentage for future prospects (50%, 30% or 15% for a permanent job and 40%, 25% or 10% for the self-employed, depending on whether the deceased was under 40, 40 to 50, or 50 to 60), deduct the share the deceased would have spent on themselves (half for a bachelor; a third, a quarter or a fifth for a married person with up to three, up to six, or more dependants), and multiply by the Sarla Verma multiplier for the deceased's age. Add the conventional heads — loss of consortium to each dependant, loss of estate and funeral expenses — and interest from the date of the claim. That is the Sarla Verma / Pranay Sethi method every tribunal applies.",
    },
    {
      q: "What is the multiplier in a MACT case?",
      a: "A number from the Supreme Court's table in Sarla Verma v. DTC (2009) that stands for the years of dependency the family has lost: 18 for a deceased aged 15 to 25, 17 for 26 to 30, 16 for 31 to 35, 15 for 36 to 40, 14 for 41 to 45, 13 for 46 to 50, 11 for 51 to 55, 9 for 56 to 60, 7 for 61 to 65 and 5 above 65. It is applied to the deceased's age, not the age of the dependants.",
    },
    {
      q: "How much compensation is paid for death in a road accident if fault cannot be proved?",
      a: "Section 164 of the Motor Vehicles Act, as amended from 1 April 2022, gives a no-fault claim of ₹5 lakh for death and ₹2.5 lakh for grievous hurt against the insurer of the vehicle, without proving negligence. Where the vehicle cannot be traced at all, the Hit and Run Scheme, 2022 pays ₹2 lakh for death and ₹50,000 for grievous hurt through the District Claims Enquiry Officer (the SDO). Neither prevents a full claim under s.166 if fault can be shown.",
    },
    {
      q: "What is the time limit for filing a motor accident claim?",
      a: "Six months from the date of the accident, under section 166(3) as inserted by the 2019 amendment. Before 2019 there was no limit, and older articles still say so. A late petition needs an application to condone the delay, which tribunals do not grant routinely — file within the six months.",
    },
    {
      q: "Where is the MACT for Vaishali district?",
      a: "The Motor Accident Claims Tribunal for Vaishali sits at the civil court at Hajipur, presided by the District Judge or an Additional District Judge. A claim can be filed where the accident happened, where the claimant resides, or where the defendant resides — so a Vaishali family can file at Hajipur even for an accident elsewhere.",
    },
    {
      q: "Is compensation reduced if the victim was also at fault?",
      a: "Yes, in proportion to the victim's share of the negligence — commonly 25% or 50% where the tribunal finds both drivers rash. Where the victim was the driver and solely at fault, the s.166 claim fails; the family is left with the personal-accident cover on the vehicle's own policy and, if the other vehicle is untraced, nothing under the hit-and-run scheme either.",
    },
  ],

  "/tools/cheque-bounce-calculator": [
    {
      q: "What is the punishment for a cheque bounce case?",
      a: "Imprisonment up to two years, or a fine up to twice the cheque amount, or both, under section 138 of the Negotiable Instruments Act, 1881. In practice most convictions end in an order to pay the cheque amount with interest as compensation under s.357(3) CrPC (now BNSS 395), with imprisonment held in default of payment. The offence is compoundable at any stage, so paying up ends the case.",
    },
    {
      q: "What are the deadlines in a Section 138 case?",
      a: "Three, and missing any one is fatal. The demand notice must be sent within 30 days of receiving the bank's return memo. The drawer then has 15 days from receipt of the notice to pay. If he does not, the cause of action arises the next day and the complaint must be filed within one month of that date. The cheque itself must have been presented within three months of the date written on it.",
    },
    {
      q: "Can I get money before the case is decided?",
      a: "The trial court can order interim compensation of up to 20% of the cheque amount under section 143A, payable within 60 days. Since Rakesh Ranjan Shrivastava v. State of Jharkhand (2024) this is discretionary, not automatic — the court must record a prima facie view. If the drawer is convicted and appeals, the appellate court ordinarily requires him to deposit at least 20% of the fine or compensation under section 148.",
    },
    {
      q: "Where do I file a cheque bounce complaint?",
      a: "In the court of the Judicial Magistrate of the first class within whose jurisdiction the bank branch where you deposited the cheque is located (section 142(2), after the 2015 amendment). For a cheque deposited in a Hajipur branch, that is the Chief Judicial Magistrate's court at Hajipur. Where the drawer lives does not matter.",
    },
    {
      q: "What must a cheque bounce notice contain?",
      a: "The cheque's number, date, amount and bank; that it was presented within validity and returned unpaid, with the return-memo date and the bank's reason; the debt or liability it was issued for; a demand for the cheque amount within 15 days of receipt; and a statement that a complaint under section 138 will follow. Send it by registered post with acknowledgment due, and by speed post, and keep the receipts. Demanding more than the cheque amount as one lump sum, or omitting the demand, are the classic defects.",
    },
    {
      q: "What defences does the drawer have?",
      a: "That the cheque was not for a legally enforceable debt — a security cheque with nothing due, a gift, a time-barred loan; that the notice was late, defective or not served; that the cheque was presented after three months; that the signature was forged; or that the complaint was filed early or late. The presumption under section 139 is against the drawer, so each defence needs evidence, not just a denial.",
    },
    {
      q: "Does settling the case cost anything?",
      a: "Settling at the first or second hearing costs nothing beyond what you agree. The Supreme Court in Damodar S. Prabhu (2010) directed graded costs for later compounding: 10% of the cheque amount if settled during the trial, 15% at the Sessions or High Court stage and 20% in the Supreme Court, paid to the Legal Services Authority. Settlement in a Lok Adalat is a decree and closes the criminal case.",
    },
  ],

  "/tools/vanshavali-generator": [
    {
      q: "What is a vanshavali and why does the Bihar survey need it?",
      a: "A vanshavali is a genealogical table — the family tree from the person whose name stands in the khatiyan or jamabandi down to the heirs alive today. The Bihar special survey asks for it as Prapatra 3(1), alongside the self-declaration (Prapatra 2), because most land in the State is still recorded in the name of an ancestor who died decades ago and the survey has to write in the living heirs.",
    },
    {
      q: "Who signs the vanshavali — the sarpanch, the mukhiya or the panchayat sachiv?",
      a: "For the survey, nobody but you: Prapatra 3(1) is self-attested on plain paper, and the survey rules do not require a sarpanch, notary or kachahari signature. Where an office insists on a certified vanshavali — some Circle Offices for dakhil-kharij by inheritance, banks, courts — the route reported under the Panchayati Raj Department's December 2023 instructions runs through the Panchayat Sachiv, with the draft displayed on the panchayat notice board for objections before the Gram Kachahari endorses it. Confirm at your panchayat; practice varies and blogs contradict each other.",
    },
    {
      q: "Is a vanshavali valid on plain paper, or does it need stamp paper?",
      a: "Plain paper. No stamp duty is chargeable on a genealogical statement, and the survey accepts it self-attested. The \"₹10 stamp\" mentioned on some websites has no basis in any rule. If an office asks for an affidavit as well, that is sworn before a notary or magistrate on the affidavit stamp — the generator produces the affidavit text too.",
    },
    {
      q: "Do daughters have to be included in the vanshavali?",
      a: "Yes, always — married or unmarried. Since the 2005 amendment to the Hindu Succession Act a daughter is a coparcener by birth with the same rights as a son, and the Supreme Court in Vineeta Sharma (2020) confirmed it applies whether or not the father was alive in 2005. A vanshavali that omits daughters is incomplete, and it is the commonest ground on which a survey entry or a mutation is challenged later.",
    },
    {
      q: "What documents go with the vanshavali?",
      a: "For the survey: the self-declaration (Prapatra 2), the jamabandi or khatiyan copy and the latest rent receipt, any deed of purchase or partition, death certificates of the ancestor and any deceased heir where available, and Aadhaar copies of the declarant. For dakhil-kharij by inheritance at the Circle Office: the same, plus the mutation application on the portal and, where asked, the affidavit.",
    },
    {
      q: "Does the vanshavali decide who gets how much land?",
      a: "No. It records who the heirs are. Shares are fixed by succession law and settled by partition — a registered partition deed (a flat ₹100 in Bihar for inherited family property) or, if the family cannot agree, a partition suit. Where the family holds the land jointly without partition, the survey records all the heirs jointly on the strength of the vanshavali.",
    },
  ],

  "/tools/consumer-court-fee-calculator": [
    {
      q: "Which consumer court do I file in — District, State or National?",
      a: "It depends on the value of the goods or services you paid for, not on the compensation you claim. Since the 2021 Jurisdiction Rules: up to ₹50 lakh, the District Commission; above ₹50 lakh and up to ₹2 crore, the State Commission (at Patna for Bihar); above ₹2 crore, the National Commission in New Delhi. A ₹4 lakh phone with a ₹15 lakh compensation claim goes to the District Commission.",
    },
    {
      q: "What is the fee for filing a consumer complaint?",
      a: "Nil where the consideration is up to ₹5 lakh. Then ₹200 up to ₹10 lakh, ₹400 up to ₹20 lakh, ₹1,000 up to ₹50 lakh, ₹2,000 up to ₹1 crore, ₹2,500 up to ₹2 crore, ₹3,000 up to ₹4 crore, ₹4,000 up to ₹6 crore, ₹5,000 up to ₹8 crore, ₹6,000 up to ₹10 crore and ₹7,500 above that — the Schedule to the Consumer Protection (Consumer Commissions) Rules, 2020. Paid online on e-Daakhil or by demand draft.",
    },
    {
      q: "Can I file a consumer complaint where I live, against a company in another city?",
      a: "Yes. Section 34(2)(d) of the 2019 Act lets you file where you reside or personally work for gain, in addition to where the opposite party is or where the cause of action arose. A Hajipur buyer of a defective product from a Delhi online seller files at the District Commission, Vaishali.",
    },
    {
      q: "What is the time limit for a consumer complaint?",
      a: "Two years from the date the cause of action arose — the defect, the deficiency, the repudiation of the claim — under section 69. A later complaint needs an application to condone the delay with reasons, which Commissions do not grant lightly.",
    },
    {
      q: "How do I file on e-Daakhil?",
      a: "Register on edaakhil.nic.in, choose the Commission the calculator shows, upload the complaint, an affidavit, the index of documents and the documents themselves (invoice, correspondence, the company's reply), pay the fee online, and note the case number. The Commission scrutinises it, may return it for defects, and then issues notice to the opposite party.",
    },
    {
      q: "Do I need a lawyer at the consumer forum?",
      a: "Not by law — the Act was written for self-representation. In practice complaints fail at admission for wrong parties, missing proof of deficiency, or a claim outside the two years, and insurers and builders always appear through counsel. For anything beyond a small refund, drafting by an advocate pays for itself.",
    },
  ],

  "/tools/cause-list": [
    {
      q: "What is a cause list?",
      a: "A cause list — also called the daily board — is the list of cases a particular court will take up on a particular day, in the order it will take them. It is published the previous evening or the same morning. If your case is not on the board, it is not being heard that day.",
    },
    {
      q: "How do I find my case on the Vaishali cause list?",
      a: "Open the eCourts cause list page, select Bihar as the State and Vaishali as the District, then choose the court complex and the specific court establishment, and the date. You can then search the published list for your case number or the party name. Having your CNR number to hand makes this considerably faster.",
    },
    {
      q: "Why can I not search the cause list on this website directly?",
      a: "eCourts publishes cause lists only through its own web portal — there is no public data interface for them, unlike case status which this site does fetch. Rather than scrape the portal, we link to it and show you exactly what to select. The next hearing date for a specific case is available here through the case tracker.",
    },
    {
      q: "The cause list shows my case but nothing happened. Why?",
      a: "Being listed does not guarantee a hearing. Matters are commonly adjourned because the presiding officer is on leave, the other side seeks time, a witness is absent, or the board simply does not reach your item before the court rises. The case status record is updated afterwards with the next date.",
    },
    {
      q: "Should I rely on the cause list or on my advocate?",
      a: "Both, and neither alone. The cause list is the court's own record of what it will take up, but dates move, listings are transferred between courts, and an item can be advanced. Always confirm with the advocate on record before travelling to court.",
    },
  ],
};

export const faqsForTool = (path) => toolFaqs[path] || [];
