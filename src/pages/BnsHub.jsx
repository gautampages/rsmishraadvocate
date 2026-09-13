import { Link, useLocation } from "react-router";
import PageHeader from "../components/PageHeader";
import Seo from "../components/Seo";
import ConsultCta from "../components/ConsultCta";
import { Icon } from "../components/Icons";
import {
  BNS_REVIEWED,
  CHAPTERS,
  CODE_NAMES,
  HUB_META,
  bnsSections,
  hubPath,
  sectionPath,
} from "../data/bnsPages";

const T = {
  en: {
    eyebrow: "Bharatiya Nyaya Sanhita",
    title: "BNS Sections — punishment, bail and cognizability, one page each",
    intro:
      "The sections trial courts and police actually type, each on its own page: what the section covers, the punishment, whether it is cognizable, bailable and compoundable, which court tries it, and the IPC number it replaced — from the BNSS First Schedule, in English and Hindi.",
    meta: `In force 1 July 2024 · Reviewed ${BNS_REVIEWED} · Converter for any other number below`,
    crumb: "BNS Sections",
    cols: { section: "Section", old: "Old", cog: "Cognizable", bail: "Bailable" },
    converter: "Looking for a different number?",
    converterNote: "The IPC → BNS converter maps 86 sections both ways.",
    langSwitch: "हिंदी में पढ़ें",
    yes: "Yes",
    no: "No",
    varies: "Varies",
    follows: "As offence",
  },
  hi: {
    eyebrow: "भारतीय न्याय संहिता",
    title: "BNS की धाराएँ — सज़ा, ज़मानत और संज्ञेयता, हर धारा का अलग पृष्ठ",
    intro:
      "जो धाराएँ अदालतें और पुलिस वास्तव में लिखती हैं, हर एक अपने पृष्ठ पर: धारा किस बारे में है, सज़ा, संज्ञेय-ज़मानती-समझौते योग्य है या नहीं, किस अदालत में चलेगी, और IPC का पुराना नंबर — BNSS की पहली अनुसूची से, हिंदी और अंग्रेज़ी में।",
    meta: `1 जुलाई 2024 से लागू · ${BNS_REVIEWED} में समीक्षित · किसी और नंबर के लिए नीचे कन्वर्टर`,
    crumb: "BNS की धाराएँ",
    cols: { section: "धारा", old: "पुरानी", cog: "संज्ञेय", bail: "ज़मानती" },
    converter: "कोई और नंबर खोज रहे हैं?",
    converterNote: "IPC → BNS कन्वर्टर 86 धाराओं को दोनों दिशाओं में बदलता है।",
    langSwitch: "Read in English",
    yes: "हाँ",
    no: "नहीं",
    varies: "उपधारा पर निर्भर",
    follows: "मूल अपराध",
  },
};

const summarise = (p, key, t) => {
  if (p.procedural) return "—";
  const vals = [...new Set(p.limbs.map((l) => l[key]))];
  if (vals.length === 1) return vals[0] === null ? t.follows : vals[0] ? t.yes : t.no;
  return t.varies;
};

export default function BnsHub() {
  const { pathname } = useLocation();
  const lang = pathname.startsWith("/hi") ? "hi" : "en";
  const t = T[lang];
  const meta = HUB_META[lang];

  return (
    <div lang={lang}>
      <Seo title={meta.title} description={meta.description} />
      <PageHeader
        eyebrow={t.eyebrow}
        title={t.title}
        intro={t.intro}
        meta={t.meta}
        crumbs={lang === "hi" ? [{ label: "हिन्दी", to: "/hi" }, { label: t.crumb }] : [{ label: t.crumb }]}
      >
        <div className="pagehead__actions">
          <Link to={hubPath(lang === "hi" ? "en" : "hi")} className="btn btn--ghost" lang={lang === "hi" ? "en" : "hi"}>
            {t.langSwitch}
          </Link>
        </div>
      </PageHeader>

      <section className="section section--tight">
        <div className="container container--narrow">
          {CHAPTERS.map((ch) => {
            const rows = bnsSections.filter((p) => p.chapter === ch.key);
            if (!rows.length) return null;
            return (
              <section key={ch.key} className="seclist">
                <h2 className="section__title secpage__h2">{ch[lang]}</h2>
                <div className="seclist__head" aria-hidden="true">
                  <span>{t.cols.section}</span>
                  <span>{t.cols.old}</span>
                  <span>{t.cols.cog}</span>
                  <span>{t.cols.bail}</span>
                </div>
                <ul>
                  {rows.map((p) => (
                    <li key={p.slug}>
                      <Link to={sectionPath(p, lang)} className="seclist__row">
                        <span className="seclist__main">
                          <strong>
                            {CODE_NAMES[p.code].short} {p.section}
                          </strong>
                          <span>{p.title[lang]}</span>
                        </span>
                        <span className="seclist__old">
                          {p.oldCode || CODE_NAMES[p.code].old} {p.old}
                        </span>
                        <span className="seclist__flag">{summarise(p, "cognizable", t)}</span>
                        <span className="seclist__flag">{summarise(p, "bailable", t)}</span>
                        <Icon name="arrow" width={15} height={15} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}

          <div className="linkcards" style={{ marginTop: 34 }}>
            <Link to="/tools/ipc-to-bns-converter" className="linkcard">
              <span className="linkcard__icon">
                <Icon name="refresh" width={22} height={22} />
              </span>
              <div>
                <strong>{t.converter}</strong>
                <span>{t.converterNote}</span>
              </div>
              <Icon name="arrow" width={17} height={17} />
            </Link>
          </div>
        </div>
      </section>

      <ConsultCta lang={lang} callLabel={lang === "hi" ? "" : undefined} bookLabel={lang === "hi" ? "परामर्श बुक करें" : undefined} />
    </div>
  );
}
