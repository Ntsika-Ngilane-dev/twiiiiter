import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
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

function App() {
  const storage = typeof window !== 'undefined' ? window.localStorage : null;
  const [darkMode, setDarkMode] = useState(false);
  const [posts, setPosts] = useState(() => {
    const saved = storage?.getItem('twiiiiter-posts');
    return saved ? JSON.parse(saved) : starterPosts;
  });
  const [draft, setDraft] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [user, setUser] = useState(() => {
    const saved = storage?.getItem('twiiiiter-user');
    return saved ? JSON.parse(saved) : null;
  });
  const [composerOpen, setComposerOpen] = useState(false);

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
    setDraft('');
    setImageUrl('');
    setComposerOpen(false);
  };

  const handleAuthSuccess = (nextUser) => {
    setUser(nextUser);
  };

  return (
    <div className={`app-shell ${darkMode ? 'dark' : ''}`}>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              user={user}
              posts={posts}
              draft={draft}
              setDraft={setDraft}
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              onPublish={handlePublish}
              onOpenComposer={() => setComposerOpen(true)}
              darkMode={darkMode}
              toggleDarkMode={() => setDarkMode((value) => !value)}
              composerOpen={composerOpen}
              setComposerOpen={setComposerOpen}
            />
          }
        />
        <Route path="/auth" element={<AuthPage onAuthSuccess={handleAuthSuccess} />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/bookmarks" element={<BookmarksPage />} />
        <Route path="/profile" element={<ProfilePage user={user} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
