function BookmarksPage() {
  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="brand-block">
          <div className="brand-mark">✦</div>
          <div className="brand-copy">
            <p className="eyebrow">Saved</p>
            <h1>Bookmarks</h1>
          </div>
        </div>
      </header>
      <main className="layout-grid single-column">
        <div className="panel">
          <h2>Your saved posts</h2>
          <p>Bookmarking now has a dedicated destination inside the same experience.</p>
        </div>
      </main>
    </div>
  );
}

export default BookmarksPage;
