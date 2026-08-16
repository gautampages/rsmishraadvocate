import { advocate, heroStats, heroCards, contact } from "../data/content";
import { Icon } from "./Icons";
import Counter from "./Counter";

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__glow" />
        <div className="hero__glow hero__glow--2" />
        <div className="hero__grid" />
      </div>

      <div className="container hero__inner">
        <div className="banner">
          <div className="banner__left">
            <div className="banner__top">
              <img
                className="banner__photo"
                src="/advocate-ram-snehi-mishra-hajipur.jpg"
                alt={`Advocate ${advocate.name} in court dress — advocate in Hajipur, Vaishali (Bihar)`}
                width="575"
                height="748"
                fetchPriority="high"
              />
              <div className="banner__center">
                <Icon name="scales" width={42} height={42} className="banner__scalesicon" />
                <span className="banner__eyebrow">Advocate</span>
                <h1 className="banner__name">{advocate.name}</h1>
                <p className="banner__meta">LL.B. &middot; {advocate.yearsExperience}+ Years of Experience</p>
                <span className="banner__divider" aria-hidden="true" />
                <p className="banner__tagline">
                  Trusted Legal Advisor &amp; Advocate in Hajipur, Vaishali (Bihar)
                </p>
              </div>
            </div>

            <ul className="banner__strip">
              {heroCards.map((c) => (
                <li key={c.title}>
                  <Icon name={c.icon} width={26} height={26} />
                  <strong>{c.title}</strong>
                  <span>{c.desc}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="banner__side">
            <div className="banner__portraitcard">
              <img
                src="/advocate-ram-snehi-mishra-portrait.jpg"
                alt={`Portrait of Advocate ${advocate.name}, lawyer in Hajipur, Vaishali (Bihar)`}
                width="800"
                height="723"
              />
            </div>
            <div className="banner__about">
              <span className="banner__aboutlabel">About</span>
              <p>
                Advocate {advocate.name} is a dedicated legal professional with over{" "}
                <strong>{advocate.yearsExperience} years of experience</strong> in various areas of
                law. He is committed to providing honest, strategic and effective legal solutions
                for every client.
              </p>
            </div>
            <ul className="banner__contact">
              <li>
                <Icon name="pin" width={18} height={18} />
                {advocate.location}
              </li>
              <li>
                <a href={`tel:${contact.phone.replace(/\s/g, "")}`}>
                  <Icon name="phone" width={18} height={18} />
                  {contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`}>
                  <Icon name="mail" width={18} height={18} />
                  {contact.email}
                </a>
              </li>
            </ul>
          </aside>
        </div>

        <div className="hero__seo">
          <h2>Senior Advocate &amp; Lawyer in Hajipur, Vaishali (Bihar)</h2>
          <p>{advocate.heroSubtext}</p>
        </div>

        <div className="hero__below">
          <div className="hero__stats">
            {heroStats.map((s) => (
              <div key={s.label} className="hero__stat">
                <Counter value={s.value} suffix={s.suffix} className="hero__statval" />
                <span className="hero__statlabel">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
