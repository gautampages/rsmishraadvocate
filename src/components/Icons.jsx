// Inline SVG icons — no external dependencies, theme-aware via currentColor.

const base = {
  width: 28,
  height: 28,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function Icon({ name, ...props }) {
  const paths = {
    gavel: (
      <>
        <path d="m14 13-7.5 7.5a2.12 2.12 0 0 1-3-3L11 10" />
        <path d="m16 16 6-6" />
        <path d="m8 8 6-6" />
        <path d="m9 7 8 8" />
        <path d="m21 11-8-8" />
      </>
    ),
    scales: (
      <>
        <path d="M12 3v18" />
        <path d="M7 21h10" />
        <path d="M5 7h14l-3-3H8L5 7z" opacity="0" />
        <path d="M6 6h12" />
        <path d="M6 6 3 13a3 3 0 0 0 6 0L6 6z" />
        <path d="M18 6l-3 7a3 3 0 0 0 6 0l-3-7z" />
      </>
    ),
    home: (
      <>
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5 9.5V21h14V9.5" />
        <path d="M9 21v-6h6v6" />
      </>
    ),
    family: (
      <>
        <circle cx="9" cy="8" r="3" />
        <circle cx="17" cy="9" r="2.2" />
        <path d="M3.5 20v-1.5A4.5 4.5 0 0 1 8 14h2a4.5 4.5 0 0 1 4.5 4.5V20" />
        <path d="M15.5 20v-1a3.5 3.5 0 0 1 5-3.2" />
      </>
    ),
    briefcase: (
      <>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <path d="M3 12h18" />
      </>
    ),
    doc: (
      <>
        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
        <path d="M14 3v5h5" />
        <path d="M9 13h6" />
        <path d="M9 17h6" />
      </>
    ),
    phone: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    ),
    mail: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-10 6L2 7" />
      </>
    ),
    pin: (
      <>
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    quote: <path d="M7 7h4v4H8v3H5v-5a2 2 0 0 1 2-2zm10 0h4v4h-3v3h-3v-5a2 2 0 0 1 2-2z" />,
    shield: (
      <>
        <path d="M12 3 5 6v5c0 4.5 3 7.7 7 9 4-1.3 7-4.5 7-9V6l-7-3z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    trophy: (
      <>
        <path d="M8 4h8v5a4 4 0 0 1-8 0V4z" />
        <path d="M8 6H5a2 2 0 0 0 0 4h1.5" />
        <path d="M16 6h3a2 2 0 0 1 0 4h-1.5" />
        <path d="M12 13v4" />
        <path d="M9 20h6" />
        <path d="M10 17h4v3h-4z" />
      </>
    ),
    smile: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M8 14a4 4 0 0 0 8 0" />
        <path d="M9 9h.01M15 9h.01" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M3 9h18M8 3v4M16 3v4" />
      </>
    ),
    users: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3.5 20v-1.5A4.5 4.5 0 0 1 8 14h2a4.5 4.5 0 0 1 4.5 4.5V20" />
        <path d="M16 5.5a3 3 0 0 1 0 5.8" />
        <path d="M15.5 20v-1a3.5 3.5 0 0 1 5-3.2" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.3-4.3" />
      </>
    ),
    strategy: (
      <>
        <path d="M3 3v18h18" />
        <path d="m7 15 3-4 3 2 4-6" />
        <circle cx="7" cy="15" r="1" />
        <circle cx="17" cy="7" r="1" />
      </>
    ),
    chat: (
      <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    ),
    heart: (
      <path d="M12 21s-7-4.5-9.5-9A5 5 0 0 1 12 6a5 5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z" />
    ),
    book: (
      <>
        <path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z" />
        <path d="M4 5v16" />
      </>
    ),
    zap: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />,
    target: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.5" />
      </>
    ),
    building: (
      <>
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M9 8h.01M15 8h.01M9 12h.01M15 12h.01M9 16h.01M15 16h.01" />
        <path d="M4 21h16" />
      </>
    ),
    check: <path d="M20 6 9 17l-5-5" />,
    star: (
      <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 6.91-1.01L12 2z" />
    ),
    arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  };

  return (
    <svg {...base} aria-hidden="true" {...props}>
      {paths[name] || null}
    </svg>
  );
}
