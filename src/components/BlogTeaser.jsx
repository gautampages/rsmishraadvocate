import { Link } from "react-router";
import { blogMeta, blogPosts } from "../data/blogPosts";
import { Icon } from "./Icons";
import Reveal from "./Reveal";
import PostCard from "./PostCard";

/**
 * Home-page preview of the blog. The full articles now live at /blog/<slug>
 * rather than expanding inline, so each one has a shareable URL.
 */
export default function BlogTeaser() {
  return (
    <section id="blog" className="section section--alt">
      <div className="container container--narrow">
        <Reveal className="section__head">
          <span className="eyebrow">Insights</span>
          <h2 className="section__title">{blogMeta.heading}</h2>
          <span className="section__rule section__rule--center" />
          <p className="section__subtitle">{blogMeta.subtext}</p>
        </Reveal>

        <div className="postgrid">
          {blogPosts.slice(0, 3).map((p, i) => (
            <Reveal key={p.slug} delay={i * 80}>
              <PostCard post={p} />
            </Reveal>
          ))}
        </div>

        <div className="postgrid__foot">
          <Link to="/blog" className="btn btn--primary btn--sm">
            All legal insights <Icon name="arrow" width={16} height={16} />
          </Link>
          <a href={blogMeta.linkedinUrl} target="_blank" rel="noreferrer" className="btn btn--sm btn--ghost">
            <Icon name="linkedin" width={17} height={17} /> Connect on LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
