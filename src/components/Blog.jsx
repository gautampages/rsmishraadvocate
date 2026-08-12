import { blog } from "../data/content";
import { Icon } from "./Icons";
import Reveal from "./Reveal";

export default function Blog() {
  return (
    <section id="blog" className="section section--alt">
      <div className="container">
        <Reveal className="section__head">
          <span className="eyebrow">Insights</span>
          <h2 className="section__title">{blog.heading}</h2>
          <p className="section__subtitle">{blog.subtext}</p>
        </Reveal>

        <div className="grid grid--cards">
          {blog.posts.map((p, i) => (
            <Reveal key={p.title} as="article" className="post" delay={i * 80}>
              <div className="post__top">
                <span className="post__tag">{p.tag}</span>
                <span className="post__icon"><Icon name="book" width={20} height={20} /></span>
              </div>
              <h3 className="post__title">{p.title}</h3>
              <p className="post__excerpt">{p.excerpt}</p>
              <div className="post__meta">
                <span>{p.date}</span>
                <a href="#contact" className="card__link">
                  Read more <Icon name="arrow" width={15} height={15} />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
