function MessagesPage() {
  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="brand-block">
          <div className="brand-mark">✦</div>
          <div className="brand-copy">
            <p className="eyebrow">Inbox</p>
            <h1>Messages</h1>
          </div>
        </div>
      </header>
      <main className="layout-grid single-column">
        <div className="panel">
          <h2>Messages ready</h2>
          <p>Use this page to host direct conversations in a social-style layout.</p>
        </div>
      </main>
    </div>
  );
}

export default MessagesPage;
