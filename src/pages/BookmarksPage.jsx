import { Link } from 'react-router-dom';
import PageFrame from '../components/PageFrame';

function BookmarksPage() {
  return (
    <PageFrame
      eyebrow="Saved"
      title="Bookmarks"
      description="Collect useful ideas, thoughtful posts, and future reads in one place."
      actions={<Link className="primary-button" to="/explore">Explore more</Link>}
    >
      <div className="panel bookmark-grid">
        <div className="info-card">
          <h3>Reading list</h3>
          <p>Keep your most valuable resources visible and easy to revisit.</p>
        </div>
        <div className="info-card">
          <h3>Saved replies</h3>
          <p>Store quick ideas you can reuse when the conversation turns thoughtful.</p>
        </div>
        <div className="info-card">
          <h3>Future inspiration</h3>
          <p>Gather examples, references, and prompts that inspire your next post.</p>
        </div>
      </div>
    </PageFrame>
  );
}

export default BookmarksPage;
