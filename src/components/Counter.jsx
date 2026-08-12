import { useEffect, useRef, useState } from "react";

// Counts up from 0 to `value` the first time it scrolls into view.
// Falls back to the final value immediately when reduced motion is preferred.
export default function Counter({ value, suffix = "", duration = 1600, className }) {
  const target = Number(value);
  const isNum = Number.isFinite(target);
  const [display, setDisplay] = useState(isNum ? 0 : value);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    if (!isNum) return;
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(target);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
          setDisplay(Math.round(target * eased));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.disconnect();
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, isNum, duration]);

  return (
    <span ref={ref} className={className}>
      {isNum ? display.toLocaleString() : value}
      {suffix && <em className="counter__suffix">{suffix}</em>}
    </span>
  );
}
