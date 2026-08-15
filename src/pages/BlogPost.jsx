import { Link, useParams } from "react-router";
import PageHeader from "../components/PageHeader";
import Seo from "../components/Seo";
import ConsultCta from "../components/ConsultCta";
import PostCard from "../components/PostCard";
import { Icon } from "../components/Icons";
import NotFound from "./NotFound";
import { blogPosts, formatPostDate, postBySlug, readingTime } from "../data/blogPosts";
import { absolute } from "../data/routes";

export default function BlogPost() {
  const { slug } = useParams();
  const post = postBySlug(slug);

  if (!post) return <NotFound />;

  const url = absolute(`/blog/${post.slug}`);
  const date = formatPostDate(post.date);
  const others = blogPosts.filter((p) => p.slug !== slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#post`,
        headline: post.title,
        description: post.seoDescription || post.excerpt,
        articleSection: post.tag,
        url,
        mainEntityOfPage: url,
        // datePublished is omitted rather than guessed — see the TODO in
        // src/data/blogPosts.js.
        ...(post.date ? { datePublished: post.date } : {}),
        keywords: post.hashtags.join(", "),
        author: {
          "@type": "Person",
          name: "Ram Snehi Mishra",
          jobTitle: "Senior Advocate",
          url: "https://www.linkedin.com/in/ramsnehimishra/",
        },
        publisher: { "@id": "https://ramsnehimishra.in/#organization" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absolute("/") },
          { "@type": "ListItem", position: 2, name: "Blog", item: absolute("/blog") },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <Seo
        title={post.seoTitle || post.title}
        description={post.seoDescription || post.excerpt}
        jsonLd={jsonLd}
      />

      <PageHeader
        eyebrow={post.tag}
        title={post.title}
        meta={`${date ? `${date} · ` : ""}${readingTime(post)} min read · Advocate Ram Snehi Mishra`}
        crumbs={[{ label: "Blog", to: "/blog" }, { label: post.tag }]}
      />

      <article className="section section--tight">
        <div className="container container--narrow prose prose--article">
          {post.body.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}

          <div className="article__tags">
            {post.hashtags.map((h) => (
              <span key={h} className="article__tag">#{h}</span>
            ))}
          </div>

          <div className="prose__foot">
            {post.related && (
              <p>
                Related practice area:{" "}
                <Link to={post.related}>{post.relatedLabel}</Link>.
              </p>
            )}
            <nav className="prose__siblings">
              <a href={post.source} target="_blank" rel="noreferrer" className="btn btn--sm btn--ghost">
                <Icon name="linkedin" width={16} height={16} /> View on LinkedIn
              </a>
              <Link to="/blog" className="btn btn--sm btn--ghost">
                All articles <Icon name="arrow" width={15} height={15} />
              </Link>
            </nav>
          </div>
        </div>
      </article>

      {others.length > 0 && (
        <section className="section section--alt section--tight">
          <div className="container container--narrow">
            <h2 className="section__title" style={{ fontSize: "1.4rem", marginBottom: "18px" }}>
              Keep reading
            </h2>
            <div className="postgrid">
              {others.slice(0, 2).map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <ConsultCta
        heading="Facing this situation yourself?"
        text="This article describes the general position. What matters in your case is the paperwork, the dates and the forum — bring them to the chamber."
      />
    </>
  );
}
