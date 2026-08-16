import { Link, useParams } from "react-router";
import PageHeader from "../components/PageHeader";
import Seo from "../components/Seo";
import ConsultCta from "../components/ConsultCta";
import PostCard from "../components/PostCard";
import FaqList from "../components/FaqList";
import { Icon } from "../components/Icons";
import NotFound from "./NotFound";
import { blogPosts, formatPostDate, postBySlug, readingTime } from "../data/blogPosts";

/** The onward links a post declares — practice area, case law, tool, checklist. */
function furtherReading(post) {
  return [
    post.related && { to: post.related, label: post.relatedLabel, icon: "scales", note: "Practice area" },
    post.caseLaw && { to: post.caseLaw, label: post.caseLawLabel, icon: "book", note: "Read the judgments" },
    post.tool && { to: post.tool, label: post.toolLabel, icon: "clock", note: "Free tool" },
    post.checklist && { to: post.checklist, label: post.checklistLabel, icon: "doc", note: "Free PDF checklist" },
  ].filter(Boolean);
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = postBySlug(slug);

  if (!post) return <NotFound />;

  const date = formatPostDate(post.date);
  const others = blogPosts.filter((p) => p.slug !== slug);
  const onward = furtherReading(post);

  return (
    <>
      <Seo title={post.seoTitle || post.title} description={post.seoDescription || post.excerpt} />

      <PageHeader
        eyebrow={post.tag}
        title={post.title}
        intro={post.excerpt}
        meta={`${date ? `${date} · ` : ""}${readingTime(post)} min read · Advocate Ram Snehi Mishra`}
        crumbs={[{ label: "Blog", to: "/blog" }, { label: post.tag }]}
      />

      <article className="section section--tight">
        <div className="container container--narrow prose prose--article">
          {/* Two shapes: `sections` for the articles, flat `body` for the two
              original LinkedIn essays. See src/data/blogPosts.js. */}
          {post.sections
            ? post.sections.map((s, i) => (
                <section key={s.heading || `s${i}`}>
                  {s.heading && <h2>{s.heading}</h2>}
                  {(s.paragraphs || []).map((p) => (
                    <p key={p.slice(0, 40)}>{p}</p>
                  ))}
                  {s.list && (
                    <ul className="prose__list">
                      {s.list.map((item) => (
                        <li key={item.slice(0, 40)}>
                          <Icon name="check" width={16} height={16} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))
            : post.body.map((p) => <p key={p.slice(0, 40)}>{p}</p>)}

          {post.hashtags && (
            <div className="article__tags">
              {post.hashtags.map((h) => (
                <span key={h} className="article__tag">#{h}</span>
              ))}
            </div>
          )}

          <p className="prose__note">
            <Icon name="alert" width={17} height={17} />
            <span>
              This article describes the general position and is not legal advice. Procedure varies
              with the forum and the facts, and statutes change.{" "}
              <Link to="/book">Confirm your own position with the chamber</Link> before acting on
              anything here.
            </span>
          </p>
        </div>
      </article>

      {onward.length > 0 && (
        <section className="section section--tight">
          <div className="container container--narrow">
            <h2 className="section__title" style={{ fontSize: "1.35rem" }}>
              Go deeper
            </h2>
            <div className="linkcards">
              {onward.map((l) => (
                <Link key={l.to} to={l.to} className="linkcard">
                  <span className="linkcard__icon">
                    <Icon name={l.icon} width={22} height={22} />
                  </span>
                  <div>
                    <strong>{l.label}</strong>
                    <span>{l.note}</span>
                  </div>
                  <Icon name="arrow" width={17} height={17} />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {post.faqs?.length > 0 && (
        <section className="section section--alt section--tight">
          <div className="container container--narrow">
            <h2 className="section__title" style={{ fontSize: "1.4rem", marginBottom: "18px" }}>
              Questions
            </h2>
            <FaqList items={post.faqs} defaultOpen={0} />
          </div>
        </section>
      )}

      <ConsultCta
        heading="Facing this situation yourself?"
        text="This article describes the general position. What matters in your case is the paperwork, the dates and the forum — bring them to the chamber."
      />

      {others.length > 0 && (
        <section className="section section--tight">
          <div className="container container--narrow">
            <h2 className="section__title" style={{ fontSize: "1.4rem", marginBottom: "18px" }}>
              Keep reading
            </h2>
            <div className="postgrid">
              {others.slice(0, 2).map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
            {/* The LinkedIn original, only where there is one. */}
            {post.source && (
              <p className="pagehead__meta" style={{ marginTop: "18px" }}>
                <a href={post.source} target="_blank" rel="noreferrer noopener">
                  View the original post on LinkedIn
                </a>
              </p>
            )}
          </div>
        </section>
      )}
    </>
  );
}
