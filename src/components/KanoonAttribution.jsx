/**
 * "Powered by IKanoon" — required attribution for the case-law API.
 *
 * Indian Kanoon's API terms (https://api.indiankanoon.org/terms/) require that
 * wherever their search results or documents are shown to a user, their logo
 * appears ON TOP OF the results, and that it is "full and clearly visible,
 * never altered, resized or partially covered", with the desktop and mobile
 * variants used for their respective clients.
 *
 * Hence the specifics of this component, none of which are stylistic choices:
 *
 *   · The two PNGs are served from /public/ikanoon/ exactly as supplied. They
 *     are not recoloured, cropped, converted or re-exported.
 *   · Each is rendered at its own intrinsic size — 150×61 desktop, 28×42
 *     mobile — and CSS explicitly overrides the global `img { max-width: 100% }`
 *     rule so a narrow container can never scale one down.
 *   · <picture> swaps the file at the breakpoint rather than resizing one of
 *     them, which is what "consideration for desktop or mobile clients" asks
 *     for and what "never resized" forbids doing any other way.
 *   · It is rendered above the results, never below them.
 *
 * The link goes to Indian Kanoon itself, which is attribution rather than any
 * claim of association: the surrounding copy says the data is theirs and the
 * chamber's own views are not.
 */
export default function KanoonAttribution({ className = "" }) {
  return (
    <a
      className={`ikanoon ${className}`.trim()}
      href="https://indiankanoon.org/"
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Powered by IKanoon — opens indiankanoon.org in a new tab"
    >
      <picture>
        <source
          media="(max-width: 640px)"
          srcSet="/ikanoon/ikanoon_mobile_powered_transparent.png"
          width="28"
          height="42"
        />
        <img
          src="/ikanoon/ikanoon6_powered_transparent.png"
          alt="Powered by IKanoon"
          width="150"
          height="61"
          decoding="async"
        />
      </picture>
    </a>
  );
}
