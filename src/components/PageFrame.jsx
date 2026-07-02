import { Link } from 'react-router-dom';

function PageFrame({ eyebrow, title, description, actions, children }) {
  return (
    <div className="page-content-stack">
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
    </div>
  );
}

export default PageFrame;
