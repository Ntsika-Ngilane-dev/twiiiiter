import { Link } from 'react-router-dom';
import PageFrame from '../components/PageFrame';

function MessagesPage() {
  return (
    <PageFrame
      eyebrow="Inbox"
      title="Messages"
      description="Keep private conversations and quick check-ins close at hand."
      actions={<Link className="primary-button" to="/notifications">View alerts</Link>}
    >
      <div className="panel message-list">
        <div className="message-thread">
          <strong>Alicia</strong>
          <p>Let’s sync on the new launch notes this afternoon.</p>
        </div>
        <div className="message-thread">
          <strong>Noah</strong>
          <p>Shared a draft that feels much more polished now.</p>
        </div>
        <div className="message-thread">
          <strong>Priya</strong>
          <p>Would love your feedback on the latest concept.</p>
        </div>
      </div>
    </PageFrame>
  );
}

export default MessagesPage;
