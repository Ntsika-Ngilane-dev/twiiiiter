import { Link } from 'react-router-dom';
import PageFrame from '../components/PageFrame';

function ExplorePage() {
  return (
    <PageFrame
      eyebrow="Discover"
      title="Explore"
      description="Browse fresh conversations, creator spotlights, and ideas curated for modern product teams and curious readers."
      actions={<Link className="primary-button" to="/auth">Join the conversation</Link>}
    >
      <div className="panel info-stack">
        <div className="info-card">
          <h3>Trending topics</h3>
          <ul>
            <li>#Productivity rituals</li>
            <li>#Design systems</li>
            <li>#AI workflows</li>
          </ul>
        </div>
        <div className="info-card">
          <h3>Creator highlights</h3>
          <p>Follow makers sharing calm, useful content with a polished, editorial feel.</p>
        </div>
        <div className="info-card">
          <h3>Popular now</h3>
          <p>New posts are surfacing every minute, so the feed stays active and dynamic.</p>
        </div>
      </div>
    </PageFrame>
  );
}

export default ExplorePage;
