import { about } from "../data/content";
import { Icon } from "./Icons";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container about">
        <Reveal className="about__media">
          <div className="about__frame">
            <div className="about__badge">
              <span className="about__badgenum">20+</span>
              <span className="about__badgetext">Years of Trusted Practice</span>
            </div>
            <div className="about__monogram">RSM</div>
          </div>
        </Reveal>

        <Reveal className="about__body" delay={120}>
          <span className="eyebrow">Who We Are</span>
          <h2 className="section__title">{about.heading}</h2>
          <p className="lead">{about.lead}</p>
          {about.paragraphs.map((p, i) => (
            <p key={i} className="muted">{p}</p>
          ))}
          <ul className="checklist">
            {about.highlights.map((h) => (
              <li key={h}>
                <Icon name="check" width={18} height={18} />
                {h}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
