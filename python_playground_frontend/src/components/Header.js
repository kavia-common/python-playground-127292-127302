import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

/**
 * Top navigation bar with brand, navigation links, auth controls, and theme toggle button.
 */
function Header({ theme, onToggleTheme }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div className="navbar">
      <div className="brand">
        <div className="brand-badge" />
        Python Playground
      </div>

      <nav className="nav-links" aria-label="Primary">
        <NavLink to="/play" className={({ isActive }) => `nav-link ${isActive ? 'active-link' : ''}`}>
          Playground
        </NavLink>
        <NavLink to="/snippets" className={({ isActive }) => `nav-link ${isActive ? 'active-link' : ''}`}>
          Snippets
        </NavLink>
        <NavLink to="/history" className={({ isActive }) => `nav-link ${isActive ? 'active-link' : ''}`}>
          History
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => `nav-link ${isActive ? 'active-link' : ''}`}>
          Profile
        </NavLink>
      </nav>

      <div className="controls">
        <button className="btn-outline" onClick={onToggleTheme} aria-label="Toggle theme">
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>

        {!user && (
          <>
            <NavLink to="/login" className="btn-outline nav-link">Login</NavLink>
            <NavLink to="/register" className="btn nav-link">Register</NavLink>
          </>
        )}

        {user && (
          <>
            <span className="badge" title={user.email || user.name || 'User'}>
              <span>🧑</span>
              <span>{user.name || user.email}</span>
            </span>
            <button className="btn-secondary" onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
