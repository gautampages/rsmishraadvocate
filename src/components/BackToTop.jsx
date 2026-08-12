import { useEffect, useState } from "react";
import { Icon } from "./Icons";

// Floating button that appears after scrolling and returns to the top.
export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button
      className={`backtotop ${show ? "backtotop--show" : ""}`}
      onClick={toTop}
      aria-label="Back to top"
    >
      <Icon name="arrow" width={20} height={20} />
    </button>
  );
}
