import { useEffect, useMemo, useState } from 'react';
import { Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import SidebarNav from './components/SidebarNav';
import ExplorePage from './pages/ExplorePage';
import NotificationsPage from './pages/NotificationsPage';
import MessagesPage from './pages/MessagesPage';
import BookmarksPage from './pages/BookmarksPage';
import ProfilePage from './pages/ProfilePage';

const starterPosts = [
  {
    id: 1,
    author: 'Ada Lovelace',
    handle: '@ada',
    time: '2h',
    content: 'Building a social feed that feels polished, calm, and genuinely useful.',
    likes: 124,
    comments: 18,
    retweets: 7,
    image: ''
  },
  {
    id: 2,
    author: 'Kai',
    handle: '@kaimakes',
    time: '4h',
    content: 'The best interfaces feel familiar instantly. This clone now leans into a clean three-column rhythm.',
    likes: 88,
    comments: 11,
    retweets: 3,
    image: ''
  }
];

const createMemoryStorage = () => {
  const store = {};
  return {
    getItem(key) {
      return Object.prototype.hasOwnProperty.call(store, key) ? store[key] : null;
    },
    setItem(key, value) {
      store[key] = String(value);
    },
    removeItem(key) {
      delete store[key];
    },
    clear() {
      Object.keys(store).forEach((key) => delete store[key]);
    }
  };
};

const getStorage = () => {
  if (typeof window !== 'undefined') {
    try {
      const existing = window.localStorage;
      if (existing && typeof existing.getItem === 'function') {
        return existing;
      }
    } catch {
      // fall back to an in-memory store below
    }

    if (!window.localStorage) {
      const fallback = createMemoryStorage();
      Object.defineProperty(window, 'localStorage', {
        configurable: true,
        value: fallback
      });
      return fallback;
    }
  }

  return createMemoryStorage();
};

function App() {
  const storage = useMemo(() => getStorage(), []);
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [posts, setPosts] = useState(() => {
    const saved = storage?.getItem('twiiiiter-posts');
    return saved ? JSON.parse(saved) : starterPosts;
  });
  const [draft, setDraft] = useState(() => {
    const saved = storage?.getItem('twiiiiter-draft');
    return saved || '';
  });
  const [imageUrl, setImageUrl] = useState(() => {
    const saved = storage?.getItem('twiiiiter-image');
    return saved || '';
  });
  const [user, setUser] = useState(() => {
    const saved = storage?.getItem('twiiiiter-user');
    return saved ? JSON.parse(saved) : null;
  });
  const [composerOpen, setComposerOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    storage?.setItem('twiiiiter-posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    if (user) {
      storage?.setItem('twiiiiter-user', JSON.stringify(user));
    } else {
      storage?.removeItem('twiiiiter-user');
    }
  }, [user]);

  const persistDraft = (value) => {
    setDraft(value);
    if (value) {
      storage.setItem('twiiiiter-draft', value);
    } else {
      storage.removeItem('twiiiiter-draft');
    }
  };

  const persistImageUrl = (value) => {
    setImageUrl(value);
    if (value) {
      storage.setItem('twiiiiter-image', value);
    } else {
      storage.removeItem('twiiiiter-image');
    }
  };

  const handlePublish = () => {
    const trimmed = draft.trim();
    if (!trimmed && !imageUrl) return;

    const newPost = {
      id: Date.now(),
      author: user?.name || 'Guest',
      handle: user ? `@${user.name.toLowerCase().replace(/\s+/g, '')}` : '@guest',
      time: 'now',
      content: trimmed,
      likes: 0,
      comments: 0,
      retweets: 0,
      image: imageUrl || '',
      photo: user?.photo || ''
    };

    setPosts((current) => [newPost, ...current]);
    persistDraft('');
    persistImageUrl('');
    setComposerOpen(false);
  };

  const handleAuthSuccess = (nextUser) => {
    setUser(nextUser);
  };

  const renderWithShell = (page) => (
    <div className="page-shell">
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
        <div className="topbar-actions">
          <button className="ghost-button" type="button" onClick={() => setDarkMode((value) => !value)}>
            {darkMode ? 'Light' : 'Dark'}
          </button>
          <Link className="notification-link" to="/notifications" aria-label="Notifications">
            <span aria-hidden="true">🔔</span>
          </Link>
          {user ? (
            <Link className="profile-link" to="/profile" aria-label={`View ${user.name} profile`}>
              {user.photo ? <img className="avatar small" src={user.photo} alt={user.name} /> : <div className="avatar small">{user.name.charAt(0)}</div>}
            </Link>
          ) : (
            <Link className="ghost-button" to="/auth">Sign in</Link>
          )}
        </div>
      </header>

      <main className="layout-grid">
        <SidebarNav
          user={user}
          onCompose={() => {
            if (!user) {
              navigate('/auth');
              return;
            }
            setComposerOpen(true);
          }}
          collapsed={sidebarCollapsed}
          toggleCollapsed={() => setSidebarCollapsed((value) => !value)}
        />
        {page}
      </main>
    </div>
  );

  return (
    <div className={`app-shell ${darkMode ? 'dark' : ''}`}>
      <Routes>
        <Route
          path="/"
          element={
            renderWithShell(
              <HomePage
                user={user}
                posts={posts}
                draft={draft}
                setDraft={persistDraft}
                imageUrl={imageUrl}
                setImageUrl={persistImageUrl}
                onPublish={handlePublish}
                onOpenComposer={() => setComposerOpen(true)}
                darkMode={darkMode}
                toggleDarkMode={() => setDarkMode((value) => !value)}
                composerOpen={composerOpen}
                setComposerOpen={setComposerOpen}
              />
            )
          }
        />
        <Route path="/auth" element={<AuthPage onAuthSuccess={handleAuthSuccess} />} />
        <Route path="/explore" element={renderWithShell(<ExplorePage />)} />
        <Route path="/notifications" element={renderWithShell(<NotificationsPage />)} />
        <Route path="/messages" element={renderWithShell(<MessagesPage />)} />
        <Route path="/bookmarks" element={renderWithShell(<BookmarksPage />)} />
        <Route path="/profile" element={renderWithShell(<ProfilePage user={user} />)} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
