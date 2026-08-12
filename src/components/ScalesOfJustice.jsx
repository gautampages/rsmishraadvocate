// Animated scales of justice — pure SVG + CSS. The beam sways gently and the
// two pans counter-sway to settle, evoking a balancing scale. Decorative only.
export default function ScalesOfJustice({ className = "" }) {
  return (
    <svg
      className={`scales ${className}`}
      viewBox="0 0 220 220"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Base + central pillar */}
      <path d="M110 44v120" />
      <path d="M86 178h48" />
      <path d="M92 178c0-10 8-14 18-14s18 4 18 14" />
      <circle cx="110" cy="40" r="5" fill="currentColor" stroke="none" />

      {/* Swaying beam with hanging pans */}
      <g className="scales__beam">
        <path d="M50 60h120" />
        <path d="M110 44v16" />

        {/* Left assembly */}
        <g className="scales__pan scales__pan--left">
          <path d="M50 60 34 96M50 60 66 96" />
          <path d="M28 96a22 22 0 0 0 44 0z" />
        </g>

        {/* Right assembly */}
        <g className="scales__pan scales__pan--right">
          <path d="M170 60 154 96M170 60 186 96" />
          <path d="M148 96a22 22 0 0 0 44 0z" />
        </g>
      </g>
    </svg>
  );
}
