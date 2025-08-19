import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

/**
 * Login form with email/password handling.
 */
function Login() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state && location.state.from) || '/play';

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err?.data?.detail || err.message || 'Login failed');
    }
  }

  return (
    <div className="panel" style={{ maxWidth: 420, margin: '1rem auto' }}>
      <div className="panel-header">
        <div className="panel-title">Login</div>
      </div>
      <div className="panel-body">
        <form className="form" onSubmit={onSubmit}>
          {!!error && <div className="result" style={{ borderColor: '#fecaca' }}>{error}</div>}
          <div className="form-row">
            <label className="field-label">Email</label>
            <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-row">
            <label className="field-label">Password</label>
            <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="controls">
            <button className="btn" type="submit" disabled={loading}>
              {loading ? 'Signing in...' : 'Login'}
            </button>
            <Link className="btn-outline nav-link" to="/register">Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
