import { useEffect } from "react";
import { useLocation } from "react-router";

// Height of the fixed navbar, so an anchored section is not hidden behind it.
const NAV_OFFSET = 110;

/**
 * A single-page app keeps the scroll position across navigation, so clicking
 * "Privacy Policy" from halfway down the home page would land the visitor
 * halfway down the policy. This restores the two behaviours a browser gives
 * you for free with real documents:
 *
 *   - a new path starts at the top;
 *   - a path with a #hash scrolls that section into view, including when the
 *     link came from another page (`/#contact` from /tools).
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
      return;
    }

    // The target section may mount a frame after the route does.
    const raf = requestAnimationFrame(() => {
      const el = document.getElementById(hash.slice(1));
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
      window.scrollTo({ top, behavior: "smooth" });
    });
    return () => cancelAnimationFrame(raf);
  }, [pathname, hash]);

  return null;
}
