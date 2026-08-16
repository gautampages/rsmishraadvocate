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
      q: "Is stamp duty payable on a gift deed within the family?",
      a: "A gift deed still attracts stamp duty and registration fee, though the applicable rate can differ from an ordinary sale. Transfers between specified close relatives are treated differently in several states, so the position for your particular relationship and property should be confirmed before the deed is drawn.",
    },
    {
      q: "Are stamp duty and registration fee the same thing?",
      a: "No. Stamp duty is a tax on the instrument, paid to the State. The registration fee is charged separately for registering that instrument with the Sub-Registrar. Both are payable, which is why the effective cost of registering a sale deed in Bihar is around 8% of value rather than 6%.",
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
