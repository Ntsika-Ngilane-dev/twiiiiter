function NotificationsPage() {
  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="brand-block">
          <div className="brand-mark">✦</div>
          <div className="brand-copy">
            <p className="eyebrow">Activity</p>
            <h1>Notifications</h1>
          </div>
        </div>
      </header>
      <main className="layout-grid single-column">
        <div className="panel">
          <h2>New activity</h2>
          <p>Notifications now have their own page in the same polished layout.</p>
        </div>
      </main>
    </div>
  );
}

export default NotificationsPage;
