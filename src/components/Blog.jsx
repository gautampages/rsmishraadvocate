import { useState } from "react";
import { blog } from "../data/content";
import { Icon } from "./Icons";
import Reveal from "./Reveal";

export default function Blog() {
  const [open, setOpen] = useState(null);

  return (
    <section id="blog" className="section section--alt">
      <div className="container container--narrow">
        <Reveal className="section__head">
          <span className="eyebrow">Insights</span>
          <h2 className="section__title">{blog.heading}</h2>
          <span className="section__rule section__rule--center" />
          <p className="section__subtitle">{blog.subtext}</p>
          <a
            href={blog.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn--sm btn--ghost linkedin-btn"
          >
            <Icon name="linkedin" width={18} height={18} /> Connect on LinkedIn
          </a>
        </Reveal>

        <div className="blogfeed">
          {blog.posts.map((p, i) => {
            const isOpen = open === i;
            return (
              <Reveal
                key={p.title}
                as="article"
                className={`article ${isOpen ? "article--open" : ""}`}
                delay={i * 80}
              >
                <div className="article__top">
                  <span className="post__tag">{p.tag}</span>
                  <a
                    href={p.source}
                    target="_blank"
                    rel="noreferrer"
                    className="article__li"
                    aria-label="View on LinkedIn"
                  >
                    <Icon name="linkedin" width={20} height={20} />
                  </a>
                </div>

                <h3 className="article__title">{p.title}</h3>

                <div className="article__body">
                  {p.body.map((para, k) => (
                    <p key={k}>{para}</p>
                  ))}
                  <div className="article__tags">
                    {p.hashtags.map((h) => (
                      <span key={h} className="article__tag">#{h}</span>
                    ))}
                  </div>
                </div>

                <div className="article__foot">
                  <button className="article__more" onClick={() => setOpen(isOpen ? null : i)}>
                    {isOpen ? "Show less" : "Read full article"}
                    <Icon name="arrow" width={16} height={16} />
                  </button>
                  <a href={p.source} target="_blank" rel="noreferrer" className="card__link">
                    View on LinkedIn <Icon name="arrow" width={15} height={15} />
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
