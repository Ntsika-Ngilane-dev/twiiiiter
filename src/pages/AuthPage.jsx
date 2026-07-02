import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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

function AuthPage({ onAuthSuccess }) {
  const [mode, setMode] = useState('signup');
  const [form, setForm] = useState({ name: '', email: '', password: '', photo: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handlePhotoSelect = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setForm((current) => ({ ...current, photo: reader.result }));
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.email || !form.password || (mode === 'signup' && !form.name)) {
      setError('Please complete the form.');
      return;
    }

    const storage = getStorage();
    const savedUsers = JSON.parse(storage.getItem('twiiiiter-users') || '[]');

    if (mode === 'signup') {
      const existing = savedUsers.find((user) => user.email.toLowerCase() === form.email.toLowerCase());
      if (existing) {
        setError('An account already exists for that email.');
        return;
      }

      const user = {
        id: Date.now(),
        name: form.name,
        email: form.email.toLowerCase(),
        password: form.password,
        photo: form.photo || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'
      };

      savedUsers.push(user);
      storage.setItem('twiiiiter-users', JSON.stringify(savedUsers));
      onAuthSuccess(user);
      navigate('/');
      return;
    }

    const existingUser = savedUsers.find((user) => user.email.toLowerCase() === form.email.toLowerCase() && user.password === form.password);
    if (!existingUser) {
      setError('No matching account found.');
      return;
    }

    onAuthSuccess(existingUser);
    navigate('/');
  };

  return (
    <div className="auth-page">
      <div className="panel auth-card">
        <div className="auth-toggle">
          <button className={mode === 'signup' ? 'tab active' : 'tab'} type="button" onClick={() => setMode('signup')}>
            Create account
          </button>
          <button className={mode === 'login' ? 'tab active' : 'tab'} type="button" onClick={() => setMode('login')}>
            Sign in
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <p className="error-text">{error}</p>}
          {mode === 'signup' && (
            <>
              <label htmlFor="name">Full name</label>
              <input id="name" name="name" value={form.name} onChange={handleChange} placeholder="Ava" />
            </>
          )}
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="ava@example.com" />
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" value={form.password} onChange={handleChange} placeholder="••••••••" />
          {mode === 'signup' && (
            <>
              <label htmlFor="photo">Profile photo</label>
              <input id="photo" name="photo" type="file" accept="image/*" onChange={handlePhotoSelect} />
              {form.photo && <img className="profile-photo" src={form.photo} alt="Preview" />}
            </>
          )}
          <button className="primary-button" type="submit">{mode === 'signup' ? 'Sign up' : 'Log in'}</button>
        </form>

        <Link className="ghost-button" to="/">Back home</Link>
      </div>
    </div>
  );
}

export default AuthPage;
