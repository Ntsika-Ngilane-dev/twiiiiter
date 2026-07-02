import { Link } from 'react-router-dom';
import PageFrame from '../components/PageFrame';

function NotificationsPage() {
  return (
    <PageFrame
      eyebrow="Activity"
      title="Notifications"
      description="See replies, mentions, and updates from your network in one calm feed."
      actions={<Link className="primary-button" to="/messages">Open inbox</Link>}
    >
      <div className="panel notification-list">
        <div className="notification-row">
          <strong>Mina replied</strong>
          <span>Your latest post sparked a thoughtful conversation.</span>
        </div>
        <div className="notification-row">
          <strong>New follower</strong>
          <span>Jordan started following your creative updates.</span>
        </div>
        <div className="notification-row">
          <strong>Saved post</strong>
          <span>Your bookmark collection is growing with each visit.</span>
        </div>
      </div>
    </PageFrame>
  );
}

export default NotificationsPage;
