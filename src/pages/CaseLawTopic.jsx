import { useCallback, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router";
import PageHeader from "../components/PageHeader";
import Seo from "../components/Seo";
import Reveal from "../components/Reveal";
import ConsultCta from "../components/ConsultCta";
import CaseLawSearch from "../components/CaseLawSearch";
import { Icon } from "../components/Icons";
import NotFound from "./NotFound";
import { topicBySlug, topics } from "../data/caseLaw";
import { EMPTY_FILTERS, buildQuery, parseQuery } from "../lib/kanoon";

/**
 * A subject page: written law first, live search second.
 *
 * The search opens pre-composed for the topic and runs on arrival, so someone
 * who searched for "section 125 maintenance judgments" gets the judgments
 * without touching the form — but every field stays editable, because the
 * next thing they will want is to narrow it to their own court or decade.
 */
export default function CaseLawTopic() {
  const { slug } = useParams();
  const topic = topicBySlug(slug);
  const [params, setParams] = useSearchParams();

  const preset = topic
    ? { ...EMPTY_FILTERS, terms: topic.query, court: topic.court || "" }
    : EMPTY_FILTERS;

  // ?q= overrides the preset, so a visitor's own search on this page is
  // shareable and survives the back button — same contract as the hub.
  const query = params.get("q") || (topic ? buildQuery(preset) : "");
  const page = Math.max(0, Number(params.get("page") || 0) || 0);

  const [filters, setFilters] = useState(() =>
    params.get("q") ? parseQuery(params.get("q")) : preset
  );

  const onSearch = useCallback((q) => setParams(q ? { q, page: "0" } : {}), [setParams]);
  const onPage = useCallback((p) => setParams({ q: query, page: String(p) }), [setParams, query]);

  if (!topic) return <NotFound />;

  const others = topics.filter((t) => t.slug !== slug);

  return (
    <>
      {/* The page itself is indexable; a visitor's own search on it is not. */}
      <Seo noindex={Boolean(params.get("q"))} />
      <PageHeader
        eyebrow="Case Law"
        title={topic.title}
        intro={topic.intro}
        meta="Live full-text search of Indian judgments · free · no registration"
        crumbs={[{ label: "Case Law", to: "/case-law" }, { label: topic.short }]}
      />

      <section className="section section--tight">
        <div className="container container--narrow">
          <CaseLawSearch
            filters={filters}
            onFiltersChange={setFilters}
            query={query}
            page={page}
            onSearch={onSearch}
            onPage={onPage}
          />
        </div>
      </section>

      <section className="section section--alt section--tight">
        <div className="container container--narrow">
          <Reveal className="section__head section__head--left">
            <span className="eyebrow">The authorities</span>
            <h2 className="section__title">What the courts have decided</h2>
            <span className="section__rule" />
          </Reveal>

          <div className="authlist">
            {topic.landmarks.map((l, i) => (
              <Reveal key={l.case} as="article" className="auth" delay={i * 60}>
                <h3 className="auth__case">{l.case}</h3>
                <p className="auth__holding">{l.holding}</p>
              </Reveal>
            ))}
          </div>

          <div className="prose__note" style={{ marginTop: "28px" }}>
            <Icon name="pin" width={17} height={17} />
            <span>
              <strong>In practice.</strong> {topic.practice}
            </span>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container container--narrow">
          <h2 className="section__title" style={{ fontSize: "1.3rem" }}>
            Related on this site
          </h2>
          <div className="linkcards">
            <Link to={topic.related} className="linkcard">
              <span className="linkcard__icon">
                <Icon name={topic.icon} width={22} height={22} />
              </span>
              <div>
                <strong>{topic.relatedLabel}</strong>
                <span>How this chamber handles these matters</span>
              </div>
              <Icon name="arrow" width={17} height={17} />
            </Link>
            {topic.tool && (
              <Link to={topic.tool} className="linkcard">
                <span className="linkcard__icon">
                  <Icon name="scales" width={22} height={22} />
                </span>
                <div>
                  <strong>{topic.toolLabel}</strong>
                  <span>Free, and works out the figures for you</span>
                </div>
                <Icon name="arrow" width={17} height={17} />
              </Link>
            )}
            <Link to="/ask" className="linkcard">
              <span className="linkcard__icon">
                <Icon name="sparkle" width={22} height={22} />
              </span>
              <div>
                <strong>Ask a legal question</strong>
                <span>Plain-language answers, free, in English or Hindi</span>
              </div>
              <Icon name="arrow" width={17} height={17} />
            </Link>
          </div>
        </div>
      </section>

      <ConsultCta
        heading={`Have a ${topic.short.toLowerCase()} matter of your own?`}
        text="Reading the case law tells you what courts have decided. What it means for your facts, your papers and your dates is a different question — and the one worth half an hour at the chamber in Hajipur, after 28+ years of arguing these matters."
      />

      <section className="section section--alt section--tight">
        <div className="container container--narrow">
          <h2 className="section__title" style={{ fontSize: "1.3rem" }}>
            Other subjects
          </h2>
          <div className="linkcards">
            {others.map((o) => (
              <Link key={o.slug} to={`/case-law/${o.slug}`} className="linkcard">
                <span className="linkcard__icon">
                  <Icon name={o.icon} width={22} height={22} />
                </span>
                <div>
                  <strong>{o.short}</strong>
                  <span>{o.title}</span>
                </div>
                <Icon name="arrow" width={17} height={17} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
