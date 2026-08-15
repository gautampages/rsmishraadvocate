import { contact } from "../data/content";

const number = contact.whatsapp.replace(/[^\d]/g, "");
const message = encodeURIComponent(
  "Namaste, I found your website and would like a legal consultation with Advocate Ram Snehi Mishra."
);

export default function WhatsAppButton() {
  return (
    <a
      className="whatsapp"
      href={`https://wa.me/${number}?text=${message}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <span className="whatsapp__pulse" aria-hidden="true" />
      <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true">
        <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.89 1.22 3.09.15.2 2.11 3.22 5.1 4.51.71.31 1.27.5 1.7.63.72.23 1.37.2 1.88.12.58-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.82 9.82 0 0 1-1.51-5.25c0-5.44 4.43-9.87 9.89-9.87a9.8 9.8 0 0 1 6.98 2.9 9.8 9.8 0 0 1 2.9 6.98c-.01 5.45-4.44 9.87-9.88 9.87zm8.4-18.28A11.8 11.8 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.15 1.59 5.95L.06 24l6.3-1.65a11.87 11.87 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.9a11.82 11.82 0 0 0-3.49-8.4z" />
      </svg>
      <span className="whatsapp__label">WhatsApp Us</span>
    </a>
  );
}
