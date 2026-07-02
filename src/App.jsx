import { useMemo, useState } from 'react';

const starterPosts = [
  {
    id: 1,
    author: 'Ada Lovelace',
    handle: '@ada',
    time: '2h',
    content:
      'Building a social feed that feels polished, calm, and genuinely useful. The layout is finally feeling a lot closer to a modern timeline.',
    likes: 124,
    comments: 18,
    retweets: 7
  },
  {
    id: 2,
    author: 'Kai',
    handle: '@kaimakes',
    time: '4h',
    content:
      'The best interfaces feel familiar instantly. This clone now leans into a clean three-column rhythm, strong spacing, and a thoughtful dark mode.',
    likes: 88,
    comments: 11,
    retweets: 3
  }
];

const navItems = [
  { label: 'Home', icon: '⌂' },
  { label: 'Explore', icon: '⌕' },
  { label: 'Notifications', icon: '🔔' },
  { label: 'Messages', icon: '✉' },
  { label: 'Bookmarks', icon: '🔖' }
];

const suggestedUsers = [
  { name: 'Mina Chen', handle: '@mina', badge: 'New' },
  { name: 'Dario Vega', handle: '@dario', badge: 'Popular' }
];

const trendItems = [
  { topic: 'Frontend Craft', count: '24.8K posts' },
  { topic: 'AI Product Design', count: '19.2K posts' },
  { topic: 'Build in Public', count: '9.1K posts' }
];

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [posts, setPosts] = useState(starterPosts);
  const [draft, setDraft] = useState('');
  const [showComposer, setShowComposer] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });

  const moodLabel = useMemo(() => (darkMode ? 'Switch to light mode' : 'Switch to dark mode'), [darkMode]);

  const handleCompose = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;

    const newPost = {
      id: Date.now(),
      author: 'You',
      handle: '@you',
      time: 'now',
      content: trimmed,
      likes: 0,
      comments: 0,
      retweets: 0
    };

    setPosts((current) => [newPost, ...current]);
    setDraft('');
    setShowComposer(false);
  };

  return (
    <div className={`app-shell ${darkMode ? 'dark' : ''}`}>
      <header className="topbar">
        <div className="brand-block">
          <div className="brand-mark">✦</div>
          <div className="brand-copy">
            <p className="eyebrow">Social feed</p>
            <h1>Twiiiiter</h1>
          </div>
        </div>

        <label className="search-pill" htmlFor="search">
          <span>⌕</span>
          <input id="search" placeholder="Search" />
        </label>

        <button className="ghost-button" type="button" onClick={() => setDarkMode((value) => !value)}>
          {moodLabel}
        </button>
      </header>

      <main className="layout-grid">
        <aside className="sidebar">
          <nav className="panel nav-panel">
            <button className="primary-button" type="button" onClick={() => setShowComposer(true)}>
              Post
            </button>

            {navItems.map((item) => (
              <button key={item.label} className={`nav-item ${item.label === 'Home' ? 'active' : ''}`} type="button">
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="panel profile-card">
            <p className="eyebrow">Quick access</p>
            <h3>Stay in the loop.</h3>
            <p>Use the compose box, toggle dark mode, or sign in for a fuller experience.</p>
            <button className="ghost-button" type="button" onClick={() => setShowLogin(true)}>
              Sign in
            </button>
          </div>
        </aside>

        <section className="feed-column">
          <div className="panel feed-tabs" role="tablist" aria-label="Feed filters">
            <button className="tab active" type="button">For you</button>
            <button className="tab" type="button">Following</button>
          </div>

          <div className="panel composer-card">
            <div className="composer-header">
              <div className="avatar">Y</div>
              <div className="composer-copy">
                <h2>What is happening?</h2>
                <p>Share your ideas with a feed that feels familiar and polished.</p>
              </div>
            </div>
            <textarea
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Write something smart..."
              rows="4"
            />
            <div className="composer-actions">
              <span>✨ Manual dark mode + popup composer</span>
              <button className="primary-button" type="button" onClick={() => setShowComposer(true)}>
                Post
              </button>
            </div>
          </div>

          <div className="feed-list">
            {posts.map((post) => (
              <article className="panel post-card" key={post.id}>
                <div className="post-head">
                  <div className="avatar">{post.author.charAt(0)}</div>
                  <div className="post-meta">
                    <div className="post-name-row">
                      <h3>{post.author}</h3>
                      <span className="meta">{post.handle} · {post.time}</span>
                    </div>
                    <p className="post-content">{post.content}</p>
                    <div className="post-stats">
                      <span>💬 {post.comments}</span>
                      <span>🔁 {post.retweets}</span>
                      <span>❤ {post.likes}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="right-rail">
          <div className="panel trends-card">
            <h3>Trends for you</h3>
            <ul>
              {trendItems.map((item) => (
                <li key={item.topic}>
                  <strong>#{item.topic}</strong>
                  <span>{item.count}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="panel who-card">
            <h3>Who to follow</h3>
            {suggestedUsers.map((user) => (
              <div className="user-row" key={user.handle}>
                <div className="avatar small">{user.name.charAt(0)}</div>
                <div>
                  <strong>{user.name}</strong>
                  <p>{user.handle}</p>
                </div>
                <button className="ghost-button small" type="button">Follow</button>
              </div>
            ))}
          </div>
        </aside>
      </main>

      {showComposer && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" onClick={() => setShowComposer(false)}>
          <div className="modal-card" onClick={(event) => event.stopPropagation()}>
            <div className="modal-head">
              <h3>Create post</h3>
              <button type="button" onClick={() => setShowComposer(false)}>
                ✕
              </button>
            </div>
            <textarea
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="What would you like to say?"
              rows="6"
            />
            <div className="modal-actions">
              <span>Cursor-built pop-up composer</span>
              <button className="primary-button" type="button" onClick={handleCompose}>
                Publish
              </button>
            </div>
          </div>
        </div>
      )}

      {showLogin && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" onClick={() => setShowLogin(false)}>
          <div className="modal-card login-card" onClick={(event) => event.stopPropagation()}>
            <div className="modal-head">
              <h3>Sign in</h3>
              <button type="button" onClick={() => setShowLogin(false)}>
                ✕
              </button>
            </div>
            <label>
              Email
              <input
                type="email"
                value={loginForm.email}
                onChange={(event) => setLoginForm({ ...loginForm, email: event.target.value })}
                placeholder="you@example.com"
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={loginForm.password}
                onChange={(event) => setLoginForm({ ...loginForm, password: event.target.value })}
                placeholder="••••••••"
              />
            </label>
            <button className="primary-button" type="button" onClick={() => setShowLogin(false)}>
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
