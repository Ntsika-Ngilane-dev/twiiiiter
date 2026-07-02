import { Link } from 'react-router-dom';

function PageFrame({ eyebrow, title, description, actions, children }) {
  return (
    <div className="page-shell">
      <header className="topbar">
        <Link className="brand-block brand-link" to="/">
          <div className="brand-mark">✦</div>
          <div className="brand-copy">
            <p className="eyebrow">{eyebrow}</p>
            <h1>{title}</h1>
          </div>
        </Link>
        <div className="topbar-actions">
          <Link className="ghost-button" to="/">
            Back home
          </Link>
        </div>
      </header>

      <main className="layout-grid single-column">
        <section className="panel page-hero">
          <div className="page-hero-copy">
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
          <div className="page-hero-actions">
            {actions}
            <Link className="ghost-button" to="/">
              Go to home
            </Link>
          </div>
        </section>
        {children}
      </main>
    </div>
  );
}

export default PageFrame;
