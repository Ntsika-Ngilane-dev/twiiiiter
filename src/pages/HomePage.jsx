import { Link, useNavigate } from 'react-router-dom';

function HomePage({ user, posts, draft, setDraft, imageUrl, setImageUrl, onPublish, onOpenComposer, darkMode, toggleDarkMode, composerOpen, setComposerOpen }) {
  const navigate = useNavigate();

  const handleCompose = () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    onOpenComposer();
  };

  const handlePublish = () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    onPublish();
  };

  const handleImageSelect = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setImageUrl(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="page-content-stack">
      <div className="home-page-layout">
        <section className="feed-column">
          <div className="panel feed-tabs" role="tablist" aria-label="Feed filters">
            <button className="tab active" type="button">For you</button>
            <button className="tab" type="button">Following</button>
          </div>

          <div className="panel composer-card">
            <div className="composer-header">
              {user?.photo ? <img className="avatar" src={user.photo} alt={user.name} /> : <div className="avatar">{user ? user.name.charAt(0) : 'Y'}</div>}
              <div className="composer-copy">
                <h2>What is happening?</h2>
                <p>Share your ideas with a feed that feels familiar and polished.</p>
              </div>
            </div>
            {!composerOpen ? (
              <>
                <textarea
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  placeholder="Write something smart..."
                  rows="4"
                />
                <div className="composer-actions">
                  <span>{user ? `Welcome, ${user.name}` : 'Sign in to post instantly'}</span>
                  <button className="primary-button" type="button" onClick={handlePublish}>
                    Publish
                  </button>
                </div>
              </>
            ) : (
              <div className="composer-actions">
                <span>Compose in the dialog to add your post and image.</span>
              </div>
            )}
          </div>
          <div className="feed-list">
            {posts.map((post) => (
              <article className="panel post-card" key={post.id}>
                <div className="post-head">
                  {post.photo ? <img className="avatar" src={post.photo} alt={post.author} /> : <div className="avatar">{post.author.charAt(0)}</div>}
                  <div className="post-meta">
                    <div className="post-name-row">
                      <h3>{post.author}</h3>
                      <span className="meta">{post.handle} · {post.time}</span>
                    </div>
                    <p className="post-content">{post.content}</p>
                    {post.image && <img className="post-image" src={post.image} alt="Post attachment" />}
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
            <h3>Trending now</h3>
            <ul>
              <li><strong>#Frontend Craft</strong><span>24.8K posts</span></li>
              <li><strong>#AI Product Design</strong><span>19.2K posts</span></li>
              <li><strong>#Build in Public</strong><span>9.1K posts</span></li>
            </ul>
          </div>
          <div className="panel who-card">
            <h3>Who to follow</h3>
            <div className="user-row">
              <div className="avatar small">M</div>
              <div><strong>Mina Chen</strong><p>@mina</p></div>
              <button className="ghost-button small" type="button">Follow</button>
            </div>
            <div className="user-row">
              <div className="avatar small">D</div>
              <div><strong>Dario Vega</strong><p>@dario</p></div>
              <button className="ghost-button small" type="button">Follow</button>
            </div>
          </div>
        </aside>
      </div>

      {composerOpen && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" onClick={() => setComposerOpen(false)}>
          <div className="modal-card" onClick={(event) => event.stopPropagation()}>
            <div className="modal-head">
              <h3>Create post</h3>
              <button type="button" onClick={() => setComposerOpen(false)}>✕</button>
            </div>
            <textarea
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Write something smart..."
              rows="6"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
            />
            {imageUrl && <img className="post-image" src={imageUrl} alt="Selected attachment" />}
            <div className="modal-actions">
              <span>Attach an image or profile photo</span>
              <button className="primary-button" type="button" onClick={handlePublish}>Publish</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
