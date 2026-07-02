import { Link } from 'react-router-dom';

function ProfilePage({ user }) {
  if (!user) {
    return (
      <div className="page-shell">
        <header className="topbar">
          <div className="brand-block">
            <div className="brand-mark">✦</div>
            <div className="brand-copy">
              <p className="eyebrow">Profile</p>
              <h1>Profile</h1>
            </div>
          </div>
        </header>
        <main className="layout-grid single-column">
          <div className="panel">
            <h2>No profile found</h2>
            <p>Please sign in to view your account.</p>
            <Link className="primary-button" to="/auth">Sign in</Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="brand-block">
          <div className="brand-mark">✦</div>
          <div className="brand-copy">
            <p className="eyebrow">Profile</p>
            <h1>{user.name}</h1>
          </div>
        </div>
      </header>
      <main className="layout-grid single-column">
        <div className="panel profile-hero">
          <img className="profile-photo" src={user.photo} alt={user.name} />
          <div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <p>Profile photo and account details are now part of the experience.</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;
