import { googleReviews } from "../data/content";
import { Icon } from "./Icons";
import Reveal from "./Reveal";

const AVATAR_COLORS = ["#1c3a5e", "#7b4397", "#00695c", "#b1892b", "#ad1457", "#37474f"];

function GoogleLogo({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="section section--alt">
      <div className="container">
        <Reveal className="section__head">
          <span className="eyebrow">Client Voices</span>
          <h2 className="section__title">What Clients Say</h2>
          <p className="section__subtitle">
            Genuine reviews from clients on our Google Business Profile.
          </p>
        </Reveal>

        <Reveal className="greviews__bar">
          <div className="greviews__score">
            <GoogleLogo size={26} />
            <strong>{googleReviews.rating}</strong>
            <span className="quote__stars" aria-label={`Rated ${googleReviews.rating} out of 5 on Google`}>
              {Array.from({ length: 5 }).map((_, k) => (
                <Icon key={k} name="star" width={17} height={17} />
              ))}
            </span>
            <span className="greviews__count">{googleReviews.count} Google reviews</span>
          </div>
          <a href={googleReviews.url} target="_blank" rel="noreferrer" className="btn btn--sm btn--primary">
            View all on Google <Icon name="arrow" width={16} height={16} />
          </a>
        </Reveal>

        <div className="grid grid--quotes">
          {googleReviews.items.map((t, i) => (
            <Reveal key={t.author} as="figure" className="quote" delay={(i % 3) * 90}>
              <figcaption className="quote__author quote__author--top">
                <span className="quote__avatar" style={{ background: AVATAR_COLORS[i % AVATAR_COLORS.length] }}>
                  {t.avatar ? (
                    <img src={t.avatar} alt={`${t.author}'s profile photo`} width="46" height="46" loading="lazy" />
                  ) : (
                    t.author.charAt(0)
                  )}
                </span>
                <span>
                  <strong>{t.author}</strong>
                  <em>{t.meta}</em>
                </span>
                <span className="quote__gbadge" title="Posted on Google">
                  <GoogleLogo size={18} />
                </span>
              </figcaption>
              <div className="quote__stars" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Icon key={k} name="star" width={16} height={16} />
                ))}
              </div>
              <blockquote className="quote__text quote__text--review">{t.quote}</blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
