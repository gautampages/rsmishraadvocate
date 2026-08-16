import { useCallback, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import PageHeader from "../components/PageHeader";
import Seo from "../components/Seo";
import Reveal from "../components/Reveal";
import FaqList from "../components/FaqList";
import ConsultCta from "../components/ConsultCta";
import CaseLawSearch from "../components/CaseLawSearch";
import { Icon } from "../components/Icons";
import { hub, hubFaqs, searchNotes, topics } from "../data/caseLaw";
import { EMPTY_FILTERS, parseQuery } from "../lib/kanoon";

/**
 * The case-law hub.
 *
 * The search lives in the URL (`?q=` and `?page=`) so a result set can be
 * shared, bookmarked and stepped back through — and so the citation links
 * rewritten inside a judgment can point straight at a new search.
 *
 * A results view is noindex. The bare page is a real landing page and should
 * rank; `/case-law?q=<anything a visitor typed>` is a search results page over
 * someone else's corpus, and letting search engines index those is how a site
 * fills an index with near-duplicate pages it can never win.
 */
export default function CaseLaw() {
  const [params, setParams] = useSearchParams();
  const query = params.get("q") || "";
  const page = Math.max(0, Number(params.get("page") || 0) || 0);

  const [filters, setFilters] = useState(() => (query ? parseQuery(query) : { ...EMPTY_FILTERS }));

  // Keep the form in step when the URL changes underneath it — the back
  // button, or a citation link inside a judgment.
  useEffect(() => {
    setFilters(query ? parseQuery(query) : { ...EMPTY_FILTERS });
  }, [query]);

  const onSearch = useCallback(
    (q) => setParams(q ? { q, page: "0" } : {}, { replace: false }),
    [setParams]
  );

  const onPage = useCallback(
    (p) => setParams({ q: query, page: String(p) }, { replace: false }),
    [setParams, query]
  );

  return (
    <>
      <Seo noindex={Boolean(query)} />
      <PageHeader
        eyebrow={hub.eyebrow}
        title={hub.title}
        intro={hub.intro}
        meta={hub.meta}
        crumbs={[{ label: "Case Law" }]}
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

      {/* Everything below is the landing page proper, and is hidden once a
          search is running — at that point the visitor wants results, not an
          essay about searching. */}
      {!query && (
        <>
          <section className="section section--alt section--tight">
            <div className="container">
              <Reveal className="section__head">
                <span className="eyebrow">Start here</span>
                <h2 className="section__title">Research by subject</h2>
                <span className="section__rule section__rule--center" />
                <p className="section__subtitle">
                  The settled position, the judgments that decided it, and the search already run —
                  for the questions this chamber is asked most.
                </p>
              </Reveal>

              <div className="toolgrid">
                {topics.map((t, i) => (
                  <Reveal key={t.slug} delay={i * 60}>
                    <Link to={`/case-law/${t.slug}`} className="toolcard">
                      <span className="toolcard__icon">
                        <Icon name={t.icon} width={26} height={26} />
                      </span>
                      <h3 className="toolcard__title">{t.short}</h3>
                      <p className="toolcard__tagline">{t.title}</p>
                      <p className="toolcard__desc">{t.intro}</p>
                      <span className="card__link">
                        Open the case law <Icon name="arrow" width={15} height={15} />
                      </span>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section className="section section--tight">
            <div className="container container--narrow">
              <Reveal className="section__head section__head--left">
                <span className="eyebrow">Searching well</span>
                <h2 className="section__title">Four things that change the results</h2>
                <span className="section__rule" />
              </Reveal>

              <div className="idgrid">
                {searchNotes.map((n, i) => (
                  <Reveal key={n.title} as="article" className="idcard" delay={i * 60}>
                    <span className="idcard__icon">
                      <Icon name={n.icon} width={22} height={22} />
                    </span>
                    <h3>{n.title}</h3>
                    <p>{n.text}</p>
                  </Reveal>
                ))}
              </div>

              <p className="prose__note" style={{ marginTop: "26px" }}>
                <Icon name="alert" width={17} height={17} />
                <span>
                  Finding a judgment that helps you is the easy part. Whether it still stands,
                  whether the court you are in is bound by it, and whether its facts are close
                  enough to yours are three separate questions — and a case that has been overruled
                  reads exactly like one that has not.{" "}
                  <Link to="/book">Have it checked before you rely on it.</Link>
                </span>
              </p>
            </div>
          </section>

          <section className="section section--alt section--tight">
            <div className="container container--narrow">
              <Reveal className="section__head">
                <span className="eyebrow">Questions</span>
                <h2 className="section__title">Case law search — common questions</h2>
                <span className="section__rule section__rule--center" />
              </Reveal>
              <FaqList items={hubFaqs} />
            </div>
          </section>

          <ConsultCta
            heading="Found something that looks like your case?"
            text="Bring it in with your papers. Half an hour on whether an authority actually applies to your facts is worth more than a week of reading judgments that do not."
          />
        </>
      )}
    </>
  );
}
