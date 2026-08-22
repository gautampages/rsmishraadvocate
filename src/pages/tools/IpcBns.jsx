import { useMemo, useState } from "react";
import ToolShell from "../../components/ToolShell";
import { Icon } from "../../components/Icons";
import { CODE_GROUPS, HOT_SECTIONS, searchSections } from "../../data/bnsSections";
import { faqsForTool } from "../../data/toolFaqs";

const groupFor = (key) => CODE_GROUPS.find((g) => g.key === key);

export default function IpcBns() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchSections(query), [query]);
  const searching = query.trim().length > 0;

  return (
    <ToolShell
      path="/tools/ipc-to-bns-converter"
      faqs={faqsForTool("/tools/ipc-to-bns-converter")}
      authority={
        <p>
          On <strong>1 July 2024</strong> the three criminal codes were replaced: the Indian Penal
          Code by the <strong>Bharatiya Nyaya Sanhita (BNS)</strong>, the Criminal Procedure Code by
          the <strong>Bharatiya Nagarik Suraksha Sanhita (BNSS)</strong>, and the Evidence Act by
          the <strong>Bharatiya Sakshya Adhiniyam (BSA)</strong>. This table maps the sections
          people actually cite — from FIRs, charge sheets, bail orders and news reports — to their
          new numbers, and back.
        </p>
      }
      notes={[
        "The date of the offence decides the code. An offence committed before 1 July 2024 is charged under the IPC even if the FIR is registered later, and cases already pending continue under the old law.",
        "The renumbering is not always one-to-one — several provisions were merged, split or re-framed rather than renamed. Where the correspondence is not exact, the entry says so instead of pretending it is.",
        "The Negotiable Instruments Act was not replaced: a cheque bounce case is still Section 138.",
        "This table covers the commonly used sections, not every provision of the codes. For anything it does not list, ask the chamber — or the AI assistant on this site.",
      ]}
    >
      <div className="secmap">
        <div className="field">
          <label htmlFor="secmap-q">Section number or offence</label>
          <input
            id="secmap-q"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. 420, 498A, 125, cheating, bail…"
            autoComplete="off"
          />
          <span className="field__hint">
            Works in both directions — type the old IPC/CrPC number or the new BNS/BNSS number.
          </span>
        </div>

        {!searching && (
          <div className="secmap__hot">
            <span className="secmap__hotlabel">Most searched</span>
            <div className="chips">
              {HOT_SECTIONS.map((s) => {
                const g = groupFor(s.group);
                return (
                  <button
                    key={`${s.group}-${s.old}`}
                    type="button"
                    className="chip"
                    onClick={() => setQuery(s.old)}
                  >
                    {g.oldCode} {s.old}
                    <em>
                      → {g.newCode} {s.to}
                    </em>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {CODE_GROUPS.map((g) => {
          const rows = results.filter((r) => r.group === g.key);
          if (rows.length === 0) return null;
          return (
            <section key={g.key} className="secmap__group" aria-label={`${g.oldName} to ${g.newName}`}>
              <h2>
                {g.oldName} <Icon name="arrow" width={15} height={15} /> {g.newName}
              </h2>
              <ul>
                {rows.map((r) => (
                  <li key={`${g.key}-${r.old}`} className="secmap__row">
                    <span className="secmap__nums">
                      <strong>
                        {g.oldCode} {r.old}
                      </strong>
                      <Icon name="arrow" width={14} height={14} />
                      <strong className="secmap__new">
                        {r.to === "—" ? "no equivalent" : `${g.newCode} ${r.to}`}
                      </strong>
                    </span>
                    <span className="secmap__offence">{r.offence}</span>
                    {r.note && <span className="secmap__note">{r.note}</span>}
                  </li>
                ))}
              </ul>
            </section>
          );
        })}

        {searching && results.length === 0 && (
          <p className="secmap__empty">
            <Icon name="alert" width={16} height={16} /> Nothing listed matches “{query.trim()}”.
            The table covers the commonly used sections — for anything else, ask the chamber.
          </p>
        )}
      </div>
    </ToolShell>
  );
}
