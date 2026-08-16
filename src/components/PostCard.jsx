import { Link } from "react-router";
import { Icon } from "./Icons";
import { formatPostDate, readingTime } from "../data/blogPosts";

/** Summary card linking to a full post page. */
export default function PostCard({ post }) {
  const date = formatPostDate(post.date);

  return (
    <article className="postcard">
      <div className="postcard__top">
        <span className="post__tag">{post.tag}</span>
        <span className="postcard__meta">
          {date && <>{date} · </>}
          {readingTime(post)} min read
        </span>
      </div>

      <h3 className="postcard__title">
        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
      </h3>
      <p className="postcard__excerpt">{post.excerpt}</p>

      <div className="postcard__foot">
        <Link to={`/blog/${post.slug}`} className="card__link">
          Read the article <Icon name="arrow" width={15} height={15} />
        </Link>
        {/* Only the two original LinkedIn essays have a `source`. Rendering
            the icon unconditionally gave every article a LinkedIn link that
            pointed nowhere. */}
        {post.source && (
          <a
            href={post.source}
            target="_blank"
            rel="noreferrer noopener"
            className="postcard__li"
            aria-label={`View "${post.title}" on LinkedIn`}
          >
            <Icon name="linkedin" width={18} height={18} />
          </a>
        )}
      </div>
    </article>
  );
}
