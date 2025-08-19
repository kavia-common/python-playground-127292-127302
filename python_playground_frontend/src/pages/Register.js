import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

/**
 * Registration form with name/email/password.
 */
function Register() {
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      await register({ name, email, password });
      navigate('/play', { replace: true });
    } catch (err) {
      setError(err?.data?.detail || err.message || 'Registration failed');
    }
  }

  return (
    <div className="panel" style={{ maxWidth: 420, margin: '1rem auto' }}>
      <div className="panel-header">
        <div className="panel-title">Create account</div>
      </div>
      <div className="panel-body">
        <form className="form" onSubmit={onSubmit}>
          {!!error && <div className="result" style={{ borderColor: '#fecaca' }}>{error}</div>}
          <div className="form-row">
            <label className="field-label">Name</label>
            <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
          </div>
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
              {loading ? 'Creating...' : 'Register'}
            </button>
            <Link className="btn-outline nav-link" to="/login">Back to login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
