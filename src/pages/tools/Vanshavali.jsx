import { useEffect, useState } from "react";
import { Link } from "react-router";
import ToolShell from "../../components/ToolShell";
import { Icon } from "../../components/Icons";
import { RELATIONS, vanshavaliText } from "../../lib/vanshavali";
import { faqsForTool } from "../../data/toolFaqs";

const Field = ({ id, label, children, hint }) => (
  <div className="field">
    <label htmlFor={id}>{label}</label>
    {children}
    {hint && <span className="field__hint">{hint}</span>}
  </div>
);

let nextId = 3;

export default function Vanshavali() {
  const [lang, setLang] = useState("hi");
  const [f, setF] = useState({
    ancestor: "",
    ancestorFather: "",
    village: "",
    panchayat: "",
    anchal: "",
    district: "",
    khata: "",
    khesra: "",
    declarant: "",
    declarantRelation: "",
    declarantFather: "",
    age: "",
    mobile: "",
    aadhaar: "",
  });
  const [members, setMembers] = useState([
    { id: 1, name: "", relation: "son", parent: 0, alive: true },
    { id: 2, name: "", relation: "daughter", parent: 0, alive: true },
  ]);
  const [copied, setCopied] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }));
  const update = (id, patch) => setMembers((ms) => ms.map((m) => (m.id === id ? { ...m, ...patch } : m)));
  const add = (parent = 0) => setMembers((ms) => [...ms, { id: nextId++, name: "", relation: "son", parent, alive: true }]);
  const remove = (id) => {
    const drop = new Set([id]);
    let grew = true;
    while (grew) {
      grew = false;
      members.forEach((m) => {
        if (!drop.has(m.id) && drop.has(Number(m.parent))) {
          drop.add(m.id);
          grew = true;
        }
      });
    }
    setMembers((ms) => ms.filter((m) => !drop.has(m.id)));
  };

  const text = vanshavaliText({ ...f, lang, members });
  const nameOf = (id) => (id === 0 ? f.ancestor || (lang === "hi" ? "मूल रैयत" : "the rayat") : members.find((m) => m.id === id)?.name || `#${id}`);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* selectable textarea remains */
    }
  };
  const download = () => {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `vanshavali-prapatra-3-1-${lang}.txt`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <ToolShell
      path="/tools/vanshavali-generator"
      faqs={faqsForTool("/tools/vanshavali-generator")}
      authority={
        <>
          <p>
            For the <strong>Bihar special land survey</strong>, the vanshavali is <strong>Prapatra 3(1)</strong>: a
            genealogy from the rayat whose name stands in the khatiyan or jamabandi down to every heir alive
            today, filed with the self-declaration (Prapatra 2). The survey rules accept it{" "}
            <strong>self-attested on plain paper</strong> — no sarpanch signature, notary or kachahari attestation is
            legally required, and no stamp paper. What matters is completeness: every branch, daughters included,
            and the dead marked as such.
          </p>
          <p>
            Some offices — a Circle Office processing dakhil-kharij by inheritance, a bank, a court — ask for a
            vanshavali <em>certified</em> by the panchayat. The route reported under the Panchayati Raj
            Department's December 2023 instructions runs through the <strong>Panchayat Sachiv</strong>, with the draft
            put up on the panchayat notice board for objections before the Gram Kachahari endorses it. Confirm the
            current practice at your panchayat before relying on it; blogs contradict each other on who signs.
          </p>
        </>
      }
      notes={[
        "Daughters are heirs. Since the 2005 amendment to the Hindu Succession Act a daughter is a coparcener by birth, married or not, and a vanshavali that leaves daughters out is the commonest reason a survey entry or a mutation is later challenged.",
        "Where a branch has died out, say so; where a son died leaving children, list the children under him. The document must let an officer find every living heir from the recorded rayat.",
        "The vanshavali records who the heirs are, not who gets what. Shares are a matter of partition — by a registered partition deed (₹100 for inherited family property in Bihar) or a suit. The stamp-duty calculator on this site prices the deed.",
        "For Muslim families the heirs and shares follow personal law, not the Hindu Succession Act; the tree is the same, the shares are not. Take advice before stating shares anywhere.",
        "Nothing you type here leaves your browser. Print the text, sign it, attach Aadhaar copies of the declarant and, where asked, of the heirs.",
      ]}
    >
      <section className="gen" style={{ marginTop: 0 }}>
        <div className="calc__inputs">
          <fieldset className="field">
            <legend>Language of the document</legend>
            <div className="chips">
              <button type="button" aria-pressed={lang === "hi"} className={`chip ${lang === "hi" ? "is-active" : ""}`} onClick={() => setLang("hi")} lang="hi">
                हिंदी
                <em>as filed in the survey camp</em>
              </button>
              <button type="button" aria-pressed={lang === "en"} className={`chip ${lang === "en" ? "is-active" : ""}`} onClick={() => setLang("en")}>
                English
                <em>for banks and courts outside Bihar</em>
              </button>
            </div>
          </fieldset>

          <h3 className="gen__sub">The land and the recorded rayat</h3>
          <div className="calc__options" style={{ borderTop: 0, paddingTop: 0 }}>
            <Field id="ancestor" label="Name of the rayat on the khatiyan / jamabandi" hint="The ancestor from whom the tree starts. Usually already deceased.">
              <input id="ancestor" type="text" value={f.ancestor} onChange={set("ancestor")} placeholder="e.g. Ram Singh / राम सिंह" />
            </Field>
            <Field id="ancestorFather" label="His / her father's or husband's name">
              <input id="ancestorFather" type="text" value={f.ancestorFather} onChange={set("ancestorFather")} />
            </Field>
            <Field id="village" label="Mauza / village">
              <input id="village" type="text" value={f.village} onChange={set("village")} />
            </Field>
            <Field id="panchayat" label="Panchayat">
              <input id="panchayat" type="text" value={f.panchayat} onChange={set("panchayat")} />
            </Field>
            <Field id="anchal" label="Anchal (block)">
              <input id="anchal" type="text" value={f.anchal} onChange={set("anchal")} placeholder="e.g. Hajipur" />
            </Field>
            <Field id="district" label="District">
              <input id="district" type="text" value={f.district} onChange={set("district")} placeholder="Vaishali" />
            </Field>
            <Field id="khata" label="Khata no. (optional)">
              <input id="khata" type="text" value={f.khata} onChange={set("khata")} />
            </Field>
            <Field id="khesra" label="Khesra no. (optional)">
              <input id="khesra" type="text" value={f.khesra} onChange={set("khesra")} />
            </Field>
          </div>

          <h3 className="gen__sub">The heirs</h3>
          <p className="field__hint" style={{ marginTop: -6 }}>
            Add each child (and a surviving wife) of the rayat, then each grandchild under the right parent. Mark
            the dead as deceased; their branch still counts.
          </p>
          <ul className="tree">
            {members.map((m) => (
              <li key={m.id} className="tree__row">
                <input type="text" aria-label="Name" value={m.name} onChange={(e) => update(m.id, { name: e.target.value })} placeholder={lang === "hi" ? "नाम" : "Name"} />
                <select aria-label="Relation" value={m.relation} onChange={(e) => update(m.id, { relation: e.target.value })}>
                  {RELATIONS.map((r) => (
                    <option key={r.key} value={r.key}>
                      {lang === "hi" ? r.hi : r.en}
                    </option>
                  ))}
                </select>
                <select aria-label="Of whom" value={m.parent} onChange={(e) => update(m.id, { parent: Number(e.target.value) })}>
                  <option value={0}>{lang === "hi" ? "का/की — " : "of "}{nameOf(0)}</option>
                  {members
                    .filter((x) => x.id !== m.id && Number(x.parent) !== m.id)
                    .map((x) => (
                      <option key={x.id} value={x.id}>
                        {lang === "hi" ? "का/की — " : "of "}{nameOf(x.id)}
                      </option>
                    ))}
                </select>
                <label className="check" title="Alive">
                  <input type="checkbox" checked={m.alive} onChange={(e) => update(m.id, { alive: e.target.checked })} />
                  <span>{lang === "hi" ? "जीवित" : "alive"}</span>
                </label>
                <button type="button" className="tree__btn" onClick={() => add(m.id)} title="Add a child of this person">
                  <Icon name="users" width={15} height={15} />
                </button>
                <button type="button" className="tree__btn tree__btn--del" onClick={() => remove(m.id)} title="Remove (and their branch)">
                  <Icon name="close" width={15} height={15} />
                </button>
              </li>
            ))}
          </ul>
          <button type="button" className="btn btn--ghost btn--sm" onClick={() => add(0)}>
            <Icon name="users" width={15} height={15} /> Add a child of the rayat
          </button>

          <h3 className="gen__sub">Who is declaring</h3>
          <div className="calc__options" style={{ borderTop: 0, paddingTop: 0 }}>
            <Field id="declarant" label="Declarant's name">
              <input id="declarant" type="text" value={f.declarant} onChange={set("declarant")} />
            </Field>
            <Field id="declarantRelation" label="Son / daughter / wife of">
              <input id="declarantRelation" type="text" value={f.declarantRelation} onChange={set("declarantRelation")} placeholder={lang === "hi" ? "पुत्र / पुत्री / पत्नी" : "son / daughter / wife"} />
            </Field>
            <Field id="declarantFather" label="Father's / husband's name">
              <input id="declarantFather" type="text" value={f.declarantFather} onChange={set("declarantFather")} />
            </Field>
            <Field id="age" label="Age (for the affidavit)">
              <input id="age" type="number" min="18" max="120" value={f.age} onChange={set("age")} />
            </Field>
            <Field id="mobile" label="Mobile">
              <input id="mobile" type="tel" value={f.mobile} onChange={set("mobile")} />
            </Field>
            <Field id="aadhaar" label="Aadhaar, last 4 digits">
              <input id="aadhaar" type="text" inputMode="numeric" maxLength={4} value={f.aadhaar} onChange={set("aadhaar")} />
            </Field>
          </div>
        </div>

        <div className="gen__out">
          <div className="gen__bar">
            <span>{lang === "hi" ? "प्रपत्र 3(1) + शपथ पत्र" : "Prapatra 3(1) + affidavit"}</span>
            <div className="gen__actions">
              <button type="button" className="btn btn--ghost btn--sm" onClick={copy}>
                <Icon name={copied ? "check" : "copy"} width={15} height={15} /> {copied ? "Copied" : "Copy"}
              </button>
              <button type="button" className="btn btn--ghost btn--sm" onClick={download}>
                <Icon name="download" width={15} height={15} /> Download
              </button>
            </div>
          </div>
          <textarea className="gen__text" readOnly value={ready ? text : ""} lang={lang} aria-label="Generated vanshavali" />
          <p className="field__hint">
            Print, sign every page, and attach Aadhaar copies. Where the family disagrees about who the heirs are,{" "}
            <Link to="/book">take advice before filing</Link> — what the survey records is very hard to undo.
          </p>
        </div>
      </section>
    </ToolShell>
  );
}
