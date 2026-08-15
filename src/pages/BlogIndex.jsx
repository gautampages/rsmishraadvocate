import PageHeader from "../components/PageHeader";
import Seo from "../components/Seo";
import Reveal from "../components/Reveal";
import PostCard from "../components/PostCard";
import ConsultCta from "../components/ConsultCta";
import { Icon } from "../components/Icons";
import { blogMeta, blogPosts } from "../data/blogPosts";

export default function BlogIndex() {

  return (
    <>
      <Seo />
      <PageHeader
        eyebrow="Insights"
        title={blogMeta.heading}
        intro={blogMeta.subtext}
        crumbs={[{ label: "Blog" }]}
      >
        <div className="pagehead__actions">
          <a href={blogMeta.linkedinUrl} target="_blank" rel="noreferrer" className="btn btn--sm btn--ghost">
            <Icon name="linkedin" width={17} height={17} /> Connect on LinkedIn
          </a>
        </div>
      </PageHeader>

      <section className="section section--tight">
        <div className="container container--narrow">
          <div className="postgrid">
            {blogPosts.map((p, i) => (
              <Reveal key={p.slug} delay={i * 70}>
                <PostCard post={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ConsultCta
        heading="A question the articles do not answer?"
        text="General writing can only take you so far. Bring the specifics of your matter to the chamber and get an answer on your own facts."
      />
    </>
  );
}
