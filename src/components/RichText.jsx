/* =========================================================================
   Minimal, safe renderer for the assistant's lightly-formatted replies.

   The model answers in plain text with **bold** spans, numbered lists and
   bullet lists. We build React elements rather than injecting HTML, so no
   model output can ever become markup on the page.
   ========================================================================= */

const NUMBERED = /^\s*(\d+)[.)]\s+(.*)$/;
const BULLET = /^\s*[-*•]\s+(.*)$/;
const HEADING = /^\s*#{1,4}\s+(.*)$/;

/** **bold** → <strong>, everything else stays literal text. */
function inline(text, keyPrefix) {
  const parts = String(text).split(/(\*\*[^*]+\*\*)/g);
  return parts
    .filter((p) => p !== "")
    .map((part, i) => {
      const match = /^\*\*([^*]+)\*\*$/.exec(part);
      const key = `${keyPrefix}-${i}`;
      return match ? <strong key={key}>{match[1]}</strong> : <span key={key}>{part}</span>;
    });
}

export default function RichText({ text }) {
  const lines = String(text ?? "").split("\n");
  const blocks = [];
  let list = null; // { type: "ol" | "ul", items: [] }
  let para = [];

  const flushPara = () => {
    if (!para.length) return;
    blocks.push({ type: "p", text: para.join(" ") });
    para = [];
  };
  const flushList = () => {
    if (!list) return;
    blocks.push(list);
    list = null;
  };

  for (const raw of lines) {
    const line = raw.trimEnd();

    if (!line.trim()) {
      flushPara();
      flushList();
      continue;
    }

    const heading = HEADING.exec(line);
    if (heading) {
      flushPara();
      flushList();
      blocks.push({ type: "h", text: heading[1] });
      continue;
    }

    const numbered = NUMBERED.exec(line);
    if (numbered) {
      flushPara();
      if (list?.type !== "ol") {
        flushList();
        // Carry the source ordinal across, so a list interrupted by a nested
        // bullet block resumes at 4 instead of restarting at 1.
        list = { type: "ol", items: [], start: Number(numbered[1]) || 1 };
      }
      list.items.push(numbered[2]);
      continue;
    }

    const bullet = BULLET.exec(line);
    if (bullet) {
      flushPara();
      if (list?.type !== "ul") {
        flushList();
        list = { type: "ul", items: [] };
      }
      list.items.push(bullet[1]);
      continue;
    }

    // A wrapped continuation of the previous list item.
    if (list && /^\s{2,}/.test(raw)) {
      list.items[list.items.length - 1] += ` ${line.trim()}`;
      continue;
    }

    flushList();
    para.push(line.trim());
  }
  flushPara();
  flushList();

  return (
    <>
      {blocks.map((b, i) => {
        if (b.type === "h") return <h5 key={i} className="rt__h">{inline(b.text, `h${i}`)}</h5>;
        if (b.type === "p") return <p key={i} className="rt__p">{inline(b.text, `p${i}`)}</p>;
        if (b.type === "ol") {
          return (
            <ol key={i} className="rt__list rt__list--ol" start={b.start > 1 ? b.start : undefined}>
              {b.items.map((item, j) => (
                <li key={j}>{inline(item, `l${i}-${j}`)}</li>
              ))}
            </ol>
          );
        }
        return (
          <ul key={i} className="rt__list rt__list--ul">
            {b.items.map((item, j) => (
              <li key={j}>{inline(item, `l${i}-${j}`)}</li>
            ))}
          </ul>
        );
      })}
    </>
  );
}
