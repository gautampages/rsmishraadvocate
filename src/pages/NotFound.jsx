import { Link } from "react-router";
import { Icon } from "./../components/Icons";
import Seo from "../components/Seo";

export default function NotFound() {
  return (
    <>
      {/* noindex: an unrouted URL must never be allowed to rank, and must not
          claim a canonical of its own — see <Seo>. */}
      <Seo
        title="Page not found | Advocate Ram Snehi Mishra"
        description="The page you were looking for does not exist."
        noindex
      />
      <section className="section section--tight">
        <div className="container container--narrow cst__empty">
          <Icon name="search" width={34} height={34} />
          <h1>Page not found</h1>
          <p>
            The page you were looking for has moved or never existed. The main sections of the site are
            linked below.
          </p>
          <div className="prose__siblings">
            <Link to="/" className="btn btn--primary btn--sm">
              Go to the home page <Icon name="arrow" width={15} height={15} />
            </Link>
            <Link to="/#contact" className="btn btn--ghost btn--sm">
              Contact the chamber <Icon name="arrow" width={15} height={15} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
