// ============================================================================
//  BIHAR DISTRICT JUDICIARY — one landing page per district.
//
//  Why this file exists
//  --------------------
//  The case-status tracker on this site works for any case anywhere in India,
//  but nobody searches for "case status tracker". They search for "Hajipur
//  court case status", "Muzaffarpur district court case number", "Patna civil
//  court next hearing date". Those are thirty-eight different queries and one
//  page cannot rank for all of them — thirty-eight can.
//
//  Every entry below becomes /case-status/<slug>: a real prerendered page with
//  its own title, description, breadcrumb, FAQ and the live CNR/party-name
//  lookup embedded in it.
//
//  Accuracy rules for this file
//  ---------------------------
//  Only facts that are stable and verifiable are recorded here: the district
//  name, the town where the district judiciary sits, and the revenue division
//  the district belongs to. Court-hall counts, judge strengths and the exact
//  roster of sub-divisional courts change constantly and are deliberately NOT
//  claimed. Case data itself is never hardcoded — it is fetched live from the
//  eCourts records at request time.
// ============================================================================

/** The nine revenue divisions of Bihar, used to relate neighbouring districts. */
export const DIVISIONS = {
  patna: "Patna Division",
  tirhut: "Tirhut Division",
  saran: "Saran Division",
  darbhanga: "Darbhanga Division",
  kosi: "Kosi Division",
  purnia: "Purnia Division",
  bhagalpur: "Bhagalpur Division",
  munger: "Munger Division",
  magadh: "Magadh Division",
};

/**
 * `district` — the district as named in court records.
 * `hq`       — the town where the District & Sessions Court sits.
 * `division` — key into DIVISIONS above; also drives "nearby districts".
 * `lead`     — one line of genuinely district-specific context. Not filler:
 *              a page that says the same thing as thirty-seven others is a
 *              page Google is right to ignore.
 */
export const districts = [
  // ---- Patna Division -------------------------------------------------------
  {
    slug: "patna",
    district: "Patna",
    hq: "Patna",
    division: "patna",
    lead:
      "Patna carries the heaviest civil and criminal filing load in the state, and is also the seat of the Patna High Court — so a Patna matter may be listed either before the district judiciary at the Civil Court campus or before the High Court, and the two use different case numbers.",
  },
  {
    slug: "nalanda",
    district: "Nalanda",
    hq: "Biharsharif",
    division: "patna",
    lead:
      "The district judiciary for Nalanda sits at Biharsharif. Land and partition matters from the Rajgir and Hilsa belt form a large share of the civil board here.",
  },
  {
    slug: "bhojpur",
    district: "Bhojpur",
    hq: "Ara",
    division: "patna",
    lead:
      "Bhojpur cases are heard at Ara. Because the district adjoins both Patna and Buxar, parties frequently confuse the establishment a case was filed in — the CNR settles it, since its first four characters identify the court complex itself.",
  },
  {
    slug: "buxar",
    district: "Buxar",
    hq: "Buxar",
    division: "patna",
    lead:
      "Buxar's district judiciary sits at Buxar town, close to the Uttar Pradesh border, and its files often involve parties or property across the state line.",
  },
  {
    slug: "rohtas",
    district: "Rohtas",
    hq: "Sasaram",
    division: "patna",
    lead:
      "Rohtas district cases are listed at Sasaram. The district name and the court town differ, which is the single most common reason a search for \"Sasaram court case status\" returns nothing under the district dropdown.",
  },
  {
    slug: "kaimur",
    district: "Kaimur",
    hq: "Bhabua",
    division: "patna",
    lead:
      "Kaimur is recorded as Kaimur (Bhabua) in court records, with the district judiciary at Bhabua. Search under Kaimur, not Bhabua, when selecting the district.",
  },

  // ---- Tirhut Division ------------------------------------------------------
  {
    slug: "vaishali",
    district: "Vaishali",
    hq: "Hajipur",
    division: "tirhut",
    lead:
      "Vaishali's District & Sessions Court, the Family Court and the civil courts all sit at Hajipur — not at Vaishali village. This is the chamber's home court, and matters from Mahnar, Lalganj, Bidupur, Raghopur and Mahua are ordinarily filed here.",
    home: true,
  },
  {
    slug: "muzaffarpur",
    district: "Muzaffarpur",
    hq: "Muzaffarpur",
    division: "tirhut",
    lead:
      "Muzaffarpur is the divisional headquarters of Tirhut and one of the busiest court complexes in north Bihar, drawing appeals and sessions work from across the division.",
  },
  {
    slug: "east-champaran",
    district: "East Champaran",
    hq: "Motihari",
    division: "tirhut",
    lead:
      "East Champaran appears in court records as Purbi Champaran, with the district judiciary at Motihari. Both spellings are worth trying if a district search comes up empty.",
  },
  {
    slug: "west-champaran",
    district: "West Champaran",
    hq: "Bettiah",
    division: "tirhut",
    lead:
      "West Champaran — Pashchim Champaran in the records — is heard at Bettiah, with a large volume of land and tenancy litigation from the Bagaha and Narkatiaganj belt.",
  },
  {
    slug: "sitamarhi",
    district: "Sitamarhi",
    hq: "Dumra",
    division: "tirhut",
    lead:
      "Sitamarhi's district judiciary sits at Dumra, just outside Sitamarhi town, and serves a border district where cross-border and land-boundary matters are common.",
  },
  {
    slug: "sheohar",
    district: "Sheohar",
    hq: "Sheohar",
    division: "tirhut",
    lead:
      "Sheohar is one of Bihar's smallest districts, carved out of Sitamarhi. Older files may still sit under the Sitamarhi establishment, so check both when an old case number will not resolve.",
  },

  // ---- Saran Division -------------------------------------------------------
  {
    slug: "saran",
    district: "Saran",
    hq: "Chhapra",
    division: "saran",
    lead:
      "Saran district cases are heard at Chhapra. Searching for \"Chhapra court case status\" and selecting Chhapra as the district will fail — the district is recorded as Saran.",
  },
  {
    slug: "siwan",
    district: "Siwan",
    hq: "Siwan",
    division: "saran",
    lead:
      "Siwan's district judiciary sits at Siwan town, serving a district with heavy migration abroad — which makes service of summons and representation by power of attorney a recurring procedural issue.",
  },
  {
    slug: "gopalganj",
    district: "Gopalganj",
    hq: "Gopalganj",
    division: "saran",
    lead:
      "Gopalganj sits on the Uttar Pradesh border in the Saran division, with a civil board dominated by land, partition and mutation-linked disputes.",
  },

  // ---- Darbhanga Division ---------------------------------------------------
  {
    slug: "darbhanga",
    district: "Darbhanga",
    hq: "Darbhanga",
    division: "darbhanga",
    lead:
      "Darbhanga is a divisional headquarters, so its court complex hears both district-level matters and appellate work drawn from Madhubani and Samastipur.",
  },
  {
    slug: "madhubani",
    district: "Madhubani",
    hq: "Madhubani",
    division: "darbhanga",
    lead:
      "Madhubani's district judiciary sits at Madhubani town. Ancestral property and joint-family partition matters make up a large part of its civil filing.",
  },
  {
    slug: "samastipur",
    district: "Samastipur",
    hq: "Samastipur",
    division: "darbhanga",
    lead:
      "Samastipur adjoins Vaishali, and families with land on both sides of the district line often find related matters running in two different establishments at once.",
  },

  // ---- Kosi Division --------------------------------------------------------
  {
    slug: "saharsa",
    district: "Saharsa",
    hq: "Saharsa",
    division: "kosi",
    lead:
      "Saharsa is the divisional headquarters of Kosi. Flood-affected land records make title and boundary litigation unusually document-heavy here.",
  },
  {
    slug: "madhepura",
    district: "Madhepura",
    hq: "Madhepura",
    division: "kosi",
    lead:
      "Madhepura's district judiciary sits at Madhepura town, in a district separated from Saharsa relatively recently — older files may be traceable only under the parent establishment.",
  },
  {
    slug: "supaul",
    district: "Supaul",
    hq: "Supaul",
    division: "kosi",
    lead:
      "Supaul lies along the Kosi embankment and the Nepal border, and its board carries a steady volume of land acquisition and compensation matters.",
  },

  // ---- Purnia Division ------------------------------------------------------
  {
    slug: "purnia",
    district: "Purnia",
    hq: "Purnia",
    division: "purnia",
    lead:
      "Purnia is the divisional headquarters for the Seemanchal districts, and its court complex handles sessions and appellate work drawn from across the division.",
  },
  {
    slug: "katihar",
    district: "Katihar",
    hq: "Katihar",
    division: "purnia",
    lead:
      "Katihar's district judiciary sits at Katihar town, a major rail junction whose commercial and consumer disputes are proportionately higher than its neighbours'.",
  },
  {
    slug: "araria",
    district: "Araria",
    hq: "Araria",
    division: "purnia",
    lead:
      "Araria is a border district in the Purnia division; matters here frequently involve parties resident outside the state or the country, which affects service and appearance.",
  },
  {
    slug: "kishanganj",
    district: "Kishanganj",
    hq: "Kishanganj",
    division: "purnia",
    lead:
      "Kishanganj is Bihar's easternmost district, close to West Bengal, and cause-list entries there routinely mix Hindi, Urdu and Bengali transliterations of the same party name.",
  },

  // ---- Bhagalpur Division ---------------------------------------------------
  {
    slug: "bhagalpur",
    district: "Bhagalpur",
    hq: "Bhagalpur",
    division: "bhagalpur",
    lead:
      "Bhagalpur is a divisional headquarters with one of the older court complexes in the state, hearing sessions and appellate work alongside its own district board.",
  },
  {
    slug: "banka",
    district: "Banka",
    hq: "Banka",
    division: "bhagalpur",
    lead:
      "Banka was separated from Bhagalpur, and pre-separation files are sometimes still traceable only under the Bhagalpur establishment.",
  },

  // ---- Munger Division ------------------------------------------------------
  {
    slug: "munger",
    district: "Munger",
    hq: "Munger",
    division: "munger",
    lead:
      "Munger is a divisional headquarters, and its sessions board draws serious criminal matters from across the districts of the division.",
  },
  {
    slug: "begusarai",
    district: "Begusarai",
    hq: "Begusarai",
    division: "munger",
    lead:
      "Begusarai's industrial belt gives its court complex a heavier commercial, labour and compensation docket than most districts of its size.",
  },
  {
    slug: "jamui",
    district: "Jamui",
    hq: "Jamui",
    division: "munger",
    lead:
      "Jamui's district judiciary sits at Jamui town, serving a largely rural district where land and tenancy matters dominate the civil board.",
  },
  {
    slug: "khagaria",
    district: "Khagaria",
    hq: "Khagaria",
    division: "munger",
    lead:
      "Khagaria lies between the Ganga and the Kosi, and shifting river boundaries make diara land disputes a recurring feature of its civil litigation.",
  },
  {
    slug: "lakhisarai",
    district: "Lakhisarai",
    hq: "Lakhisarai",
    division: "munger",
    lead:
      "Lakhisarai was carved out of Munger; matters filed before separation may still be listed under the Munger establishment.",
  },
  {
    slug: "sheikhpura",
    district: "Sheikhpura",
    hq: "Sheikhpura",
    division: "munger",
    lead:
      "Sheikhpura is among the smallest districts in Bihar by filing volume, which usually means shorter cause lists and faster listing than the divisional headquarters.",
  },

  // ---- Magadh Division ------------------------------------------------------
  {
    slug: "gaya",
    district: "Gaya",
    hq: "Gaya",
    division: "magadh",
    lead:
      "Gaya is the divisional headquarters of Magadh and one of the largest court complexes in south Bihar, hearing sessions and appellate matters from the division.",
  },
  {
    slug: "nawada",
    district: "Nawada",
    hq: "Nawada",
    division: "magadh",
    lead:
      "Nawada's district judiciary sits at Nawada town, with a criminal board that carries a substantial share of the district's filing.",
  },
  {
    slug: "aurangabad",
    district: "Aurangabad",
    hq: "Aurangabad",
    division: "magadh",
    lead:
      "Aurangabad in Bihar is a distinct district from Aurangabad in Maharashtra — select the state before the district, or a CNR search will look in the wrong establishment entirely.",
  },
  {
    slug: "jehanabad",
    district: "Jehanabad",
    hq: "Jehanabad",
    division: "magadh",
    lead:
      "Jehanabad sits between Patna and Gaya, and its proximity to both means parties often hold connected matters in more than one district.",
  },
  {
    slug: "arwal",
    district: "Arwal",
    hq: "Arwal",
    division: "magadh",
    lead:
      "Arwal is Bihar's newest and smallest district, separated from Jehanabad — older files are frequently found only under the Jehanabad establishment.",
  },
];

export const districtBySlug = (slug) => districts.find((d) => d.slug === slug);

/** Other districts of the same revenue division — used for internal linking. */
export const nearbyDistricts = (d) =>
  districts.filter((x) => x.division === d.division && x.slug !== d.slug);

/** "District & Sessions Court, Hajipur (Vaishali)" — or just the town when they match. */
export const courtName = (d) =>
  d.hq === d.district
    ? `District & Sessions Court, ${d.hq}`
    : `District & Sessions Court, ${d.hq} (${d.district})`;

/** How the place is most often searched for: "Vaishali (Hajipur)" / "Patna". */
export const placeLabel = (d) => (d.hq === d.district ? d.district : `${d.district} (${d.hq})`);

// ---------------------------------------------------------------------------
//  Official sources.
//
//  Only the national eCourts endpoints are linked. Per-district portal URLs
//  change hosts periodically and a page full of dead links to a court website
//  is worse than one honest link that always works.
// ---------------------------------------------------------------------------
export const ECOURTS = {
  caseStatus: "https://services.ecourts.gov.in/ecourtindia_v6/",
  causeList: "https://services.ecourts.gov.in/ecourtindia_v6/?p=causelist/index",
  highCourt: "https://patnahighcourt.gov.in/",
  njdg: "https://njdg.ecourts.gov.in/",
};
