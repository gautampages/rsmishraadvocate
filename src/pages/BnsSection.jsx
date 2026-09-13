import { Link, useLocation } from "react-router";
import PageHeader from "../components/PageHeader";
import Seo from "../components/Seo";
import ConsultCta from "../components/ConsultCta";
import FaqList from "../components/FaqList";
import { Icon } from "../components/Icons";
import NotFound from "./NotFound";
import {
  BNS_REVIEWED,
  CODE_NAMES,
  TRIABLE,
  bailableText,
  bnsRouteInfo,
  bnsSections,
  cognizableText,
  compoundableText,
  derivedFor,
  faqsForSection,
  hubPath,
  sectionMeta,
  sectionPath,
} from "../data/bnsPages";
import { blogPosts } from "../data/blogPosts";
import { topics as caseLawTopics } from "../data/caseLaw";
import { practiceAreas } from "../data/practice";
import { tools } from "../data/tools";
import { districts } from "../data/courts";

/** UI strings for the two languages. Content itself comes from the data file. */
const T = {
  en: {
    eyebrow: (c) => `${c.short} — section by section`,
    crumbHub: "BNS Sections",
    old: "Old section",
    punishment: "Punishment",
    cognizable: "Cognizable?",
    bailable: "Bailable?",
    triable: "Triable by",
    compoundable: "Compoundable?",
    classification: "Classification",
    classNote: (c) => `From the First Schedule to the BNSS and section 359 — not from blogs. ${c.full.en}, in force 1 July 2024; reviewed ${BNS_REVIEWED}.`,
    whatItMeans: "What this means in practice",
    noticeYes: (m) => `Maximum punishment ${m}: BNSS 35(3) applies. The police should issue a notice to appear rather than arrest, unless they record reasons under 35(1) — the Arnesh Kumar guidelines.`,
    noticeNo: (m) => `Maximum punishment ${m}: the BNSS 35(3) notice rule does not apply. Arrest without warrant is the norm on a cognizable FIR.`,
    defaultBail: (d) => `Default bail: if the charge sheet is not filed within ${d} days of first remand, the accused is entitled to bail under BNSS 187(3).`,
    follows: "This section carries no punishment of its own. Arrest, bail and trial follow the principal offence it is read with.",
    keyPoints: "Key points",
    watchOut: "Watch out",
    related: "Read next",
    caseStatus: "Check a Vaishali case",
    caseStatusNote: "By CNR, party or advocate name",
    otherSections: "Other sections",
    allSections: "All sections",
    faqs: "Questions people ask",
    disclaimer: "General information, not legal advice. Which section applies, and whether bail will be granted, depends on the facts and the FIR. ",
    confirm: "Speak to the chamber",
    ctaHeading: "Named in an FIR under this section?",
    ctaText: "Bring the FIR copy to the chamber at Hajipur. You will be told plainly whether arrest is likely, whether anticipatory bail is the right move, and what the first hearing will involve.",
    langSwitch: "इस पृष्ठ को हिंदी में पढ़ें",
    book: "Book a consultation",
  },
  hi: {
    eyebrow: (c) => `${c.short} — धारा-दर-धारा`,
    crumbHub: "BNS की धाराएँ",
    old: "पुरानी धारा",
    punishment: "सज़ा",
    cognizable: "संज्ञेय?",
    bailable: "ज़मानती?",
    triable: "किस अदालत में",
    compoundable: "समझौता संभव?",
    classification: "वर्गीकरण",
    classNote: (c) => `BNSS की पहली अनुसूची और धारा 359 से — ब्लॉग से नहीं। ${c.full.hi}, 1 जुलाई 2024 से लागू; ${BNS_REVIEWED} में समीक्षित।`,
    whatItMeans: "व्यवहार में इसका मतलब",
    noticeYes: (m) => `अधिकतम सज़ा ${m}: BNSS 35(3) लागू है। पुलिस को गिरफ़्तारी के बजाय पेश होने का नोटिस देना चाहिए, जब तक 35(1) के कारण दर्ज न किए जाएँ — अर्नेश कुमार दिशानिर्देश।`,
    noticeNo: (m) => `अधिकतम सज़ा ${m}: BNSS 35(3) का नोटिस-नियम लागू नहीं। संज्ञेय FIR पर बिना वारंट गिरफ़्तारी सामान्य है।`,
    defaultBail: (d) => `डिफ़ॉल्ट ज़मानत: पहली रिमांड के ${d} दिन के भीतर चार्जशीट दाख़िल न हो तो अभियुक्त BNSS 187(3) में ज़मानत का हक़दार है।`,
    follows: "इस धारा की अपनी कोई सज़ा नहीं। गिरफ़्तारी, ज़मानत और मुक़दमा उस मूल अपराध के अनुसार चलते हैं जिसके साथ यह पढ़ी जाती है।",
    keyPoints: "मुख्य बातें",
    watchOut: "सावधान",
    related: "आगे पढ़ें",
    caseStatus: "वैशाली का केस स्टेटस देखें",
    caseStatusNote: "CNR, पक्षकार या वकील के नाम से",
    otherSections: "अन्य धाराएँ",
    allSections: "सभी धाराएँ",
    faqs: "लोग क्या पूछते हैं",
    disclaimer: "यह सामान्य जानकारी है, क़ानूनी सलाह नहीं। कौन सी धारा लगेगी और ज़मानत मिलेगी या नहीं, यह तथ्यों और FIR पर निर्भर करता है। ",
    confirm: "चैंबर से बात करें",
    ctaHeading: "इस धारा में FIR में नाम है?",
    ctaText: "FIR की प्रति लेकर हाजीपुर चैंबर आइए। साफ़ बताया जाएगा कि गिरफ़्तारी की संभावना है या नहीं, अग्रिम ज़मानत सही कदम है या नहीं, और पहली सुनवाई में क्या होगा।",
    langSwitch: "Read this page in English",
    book: "परामर्श बुक करें",
  },
};

/** Human label for an internal link, looked up from the site's own data. */
function labelFor(path, lang) {
  const [, head, tail] = path.split("/");
  if (head === "blog") return blogPosts.find((p) => p.slug === tail)?.title;
  if (head === "case-law") return caseLawTopics.find((t) => t.slug === tail)?.title;
  if (head === "practice") return practiceAreas.find((p) => p.slug === tail)?.title;
  if (head === "tools") return tools.find((t) => t.path === path)?.name;
  if (head === "checklists") return tail.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase());
  if (head === "case-status") return `${districts.find((d) => d.slug === tail)?.district || tail} case status`;
  if (head === "bns" || head === "bnss") {
    const info = bnsRouteInfo(path);
    return info?.page ? `${CODE_NAMES[info.page.code].short} ${info.page.section} — ${info.page.title[lang]}` : path;
  }
  return path;
}

export default function BnsSection() {
  const { pathname } = useLocation();
  const info = bnsRouteInfo(pathname);
  if (!info?.page) return <NotFound />;

  const { page: p, lang } = info;
  const t = T[lang];
  const code = CODE_NAMES[p.code];
  const d = derivedFor(p);
  const meta = sectionMeta(p, lang);
  const faqs = faqsForSection(p, lang);
  const twin = sectionPath(p, lang === "hi" ? "en" : "hi");
  const siblings = bnsSections.filter((s) => s.chapter === p.chapter && s.slug !== p.slug).slice(0, 8);

  return (
    <div lang={lang}>
      <Seo title={meta.title} description={meta.description} />
      <PageHeader
        eyebrow={t.eyebrow(code)}
        title={`${code.short} ${lang === "hi" ? "धारा" : "Section"} ${p.section} — ${p.title[lang]}`}
        intro={p.gist[lang]}
        meta={`${t.old}: ${p.oldCode || code.old} ${p.old} · ${code.full[lang]}`}
        crumbs={[{ label: t.crumbHub, to: hubPath(lang) }, { label: `${code.short} ${p.section}` }]}
      >
        <div className="pagehead__actions">
          <Link to="/book" className="btn btn--primary">
            {t.book} <Icon name="arrow" width={18} height={18} />
          </Link>
          <Link to={twin} className="btn btn--ghost" lang={lang === "hi" ? "en" : "hi"}>
            {t.langSwitch}
          </Link>
        </div>
      </PageHeader>

      <section className="section section--tight">
        <div className="container container--narrow">
          {p.confusion && (
            <p className="prose__note secpage__confusion">
              <Icon name="alert" width={17} height={17} />
              <span>
                <strong>{t.watchOut}.</strong> {p.confusion[lang]}
              </span>
            </p>
          )}

          {p.procedural ? (
            <div className="prose">
              <h2>{t.keyPoints}</h2>
              <ul className="prose__list">
                {p.points[lang].map((pt) => (
                  <li key={pt.slice(0, 40)}>
                    <Icon name="check" width={16} height={16} />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <>
              <h2 className="section__title secpage__h2">{t.classification}</h2>
              <div className="spec">
                {p.limbs.map((l) => (
                  <article key={l.sub} className="spec__card">
                    <header className="spec__head">
                      <span className="spec__num">
                        {code.short} {l.sub}
                      </span>
                      <h3>{l.label[lang]}</h3>
                    </header>
                    <dl className="spec__grid">
                      <div className="spec__row spec__row--wide">
                        <dt>{t.punishment}</dt>
                        <dd>{l.punishment[lang]}</dd>
                      </div>
                      <div className="spec__row">
                        <dt>{t.cognizable}</dt>
                        <dd>
                          <Badge v={l.cognizable} />
                          {cognizableText(l.cognizable, lang)}
                        </dd>
                      </div>
                      <div className="spec__row">
                        <dt>{t.bailable}</dt>
                        <dd>
                          <Badge v={l.bailable} />
                          {bailableText(l.bailable, lang)}
                        </dd>
                      </div>
                      <div className="spec__row">
                        <dt>{t.triable}</dt>
                        <dd>{TRIABLE[l.triableBy][lang]}</dd>
                      </div>
                      <div className="spec__row">
                        <dt>{t.compoundable}</dt>
                        <dd>
                          <Badge v={l.compoundable ? true : false} />
                          {compoundableText(l.compoundable, lang)}
                        </dd>
                      </div>
                    </dl>
                  </article>
                ))}
              </div>
              <p className="secpage__source">
                <Icon name="book" width={15} height={15} />
                {t.classNote(code)}
              </p>

              <h2 className="section__title secpage__h2">{t.whatItMeans}</h2>
              <ul className="prose__list secpage__derived">
                {d.follows ? (
                  <li>
                    <Icon name="alert" width={16} height={16} />
                    <span>{t.follows}</span>
                  </li>
                ) : (
                  <>
                    <li>
                      <Icon name={d.notice ? "check" : "alert"} width={16} height={16} />
                      <span>{d.notice ? t.noticeYes(d.maxText[lang]) : t.noticeNo(d.maxText[lang])}</span>
                    </li>
                    <li>
                      <Icon name="clock" width={16} height={16} />
                      <span>{t.defaultBail(d.defaultBailDays)}</span>
                    </li>
                  </>
                )}
              </ul>
            </>
          )}

          <p className="prose__note">
            <Icon name="alert" width={17} height={17} />
            <span>
              {t.disclaimer}
              <Link to="/book">{t.confirm}</Link>.
            </span>
          </p>
        </div>
      </section>

      <section className="section section--alt section--tight">
        <div className="container container--narrow">
          <h2 className="section__title" style={{ fontSize: "1.35rem" }}>
            {t.faqs}
          </h2>
          <FaqList items={faqs} defaultOpen={0} />
        </div>
      </section>

      <section className="section section--tight">
        <div className="container container--narrow">
          <h2 className="section__title" style={{ fontSize: "1.35rem" }}>
            {t.related}
          </h2>
          <div className="linkcards">
            {p.related.map((r) => (
              <Link key={r} to={r} className="linkcard">
                <span className="linkcard__icon">
                  <Icon name={r.startsWith("/bns") ? "scales" : r.startsWith("/tools") ? "sliders" : "book"} width={22} height={22} />
                </span>
                <div>
                  <strong>{labelFor(r, lang)}</strong>
                </div>
                <Icon name="arrow" width={17} height={17} />
              </Link>
            ))}
            <Link to="/case-status/vaishali" className="linkcard">
              <span className="linkcard__icon">
                <Icon name="search" width={22} height={22} />
              </span>
              <div>
                <strong>{t.caseStatus}</strong>
                <span>{t.caseStatusNote}</span>
              </div>
              <Icon name="arrow" width={17} height={17} />
            </Link>
          </div>

          <h2 className="section__title secpage__h2">{t.otherSections}</h2>
          <div className="chips">
            {siblings.map((s) => (
              <Link key={s.slug} to={sectionPath(s, lang)} className="chip">
                {CODE_NAMES[s.code].short} {s.section}
                <em>{s.title[lang]}</em>
              </Link>
            ))}
            <Link to={hubPath(lang)} className="chip is-active">
              {t.allSections}
              <em>{bnsSections.length}</em>
            </Link>
          </div>
        </div>
      </section>

      <ConsultCta
        lang={lang}
        heading={t.ctaHeading}
        text={t.ctaText}
        bookLabel={t.book}
        callLabel={lang === "hi" ? "" : undefined}
      />
    </div>
  );
}

function Badge({ v }) {
  if (v === null) return null;
  return <span className={`badge ${v ? "badge--yes" : "badge--no"}`} aria-hidden="true" />;
}
