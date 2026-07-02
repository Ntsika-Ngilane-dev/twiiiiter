import { Link, useLocation } from 'react-router-dom';

function SidebarNav({ user, onCompose, collapsed, toggleCollapsed }) {
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const links = [
    { path: '/', label: 'Home', icon: '⌂' },
    { path: '/explore', label: 'Explore', icon: '⌕' },
    { path: '/notifications', label: 'Notifications', icon: '🔔' },
    { path: '/messages', label: 'Messages', icon: '✉' },
    { path: '/bookmarks', label: 'Bookmarks', icon: '🔖' },
    { path: '/profile', label: 'Profile', icon: '◔' }
  ];

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="panel nav-panel">
        <button className="ghost-button sidebar-toggle" type="button" onClick={toggleCollapsed} aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
          {collapsed ? '☰' : '◀'}
        </button>

        {!collapsed && (
          <div className="nav-brand">
            <div className="brand-mark small">✦</div>
            <div>
              <p className="eyebrow">Navigate</p>
              <h3>Twiiiiter</h3>
            </div>
          </div>
        )}

        {links.map((link) => (
          <Link key={link.path} className={`nav-item ${isActive(link.path) ? 'active' : ''}`} to={link.path} title={link.label}>
            <span className="nav-icon">{link.icon}</span>
            {!collapsed && <span>{link.label}</span>}
          </Link>
        ))}

        {onCompose ? (
          <button className="primary-button" type="button" onClick={onCompose}>
            {collapsed ? '✚' : 'Compose'}
          </button>
        ) : (
          <Link className="primary-button sidebar-link" to="/">
            {collapsed ? '⌂' : 'Back home'}
          </Link>
        )}
      </div>

      {!collapsed && (
        <div className="panel profile-card">
          <p className="eyebrow">Quick access</p>
          <div className="profile-card-head">
            {user?.photo ? <img className="avatar" src={user.photo} alt={user.name} /> : <div className="avatar">{user ? user.name.charAt(0) : 'Y'}</div>}
            <div>
              <h3>{user ? `Welcome back, ${user.name.split(' ')[0]}` : 'Stay in the loop.'}</h3>
              {user && <p className="profile-card-meta">{user.email}</p>}
            </div>
          </div>
          <p>Create posts, switch themes, and keep your profile fresh.</p>
          {user ? <Link className="ghost-button" to="/profile">View profile</Link> : <Link className="ghost-button" to="/auth">Join now</Link>}
        </div>
      )}
    </aside>
  );
}

export default SidebarNav;
