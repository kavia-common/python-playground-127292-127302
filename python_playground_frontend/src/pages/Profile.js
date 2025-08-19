import React from 'react';
import { useAuth } from '../hooks/useAuth';

/**
 * Displays user profile data, with a refresh button to re-fetch.
 */
function Profile() {
  const { user, refreshUser } = useAuth();

  return (
    <div className="panel" style={{ maxWidth: 640, margin: '1rem auto' }}>
      <div className="panel-header">
        <div className="panel-title">Profile</div>
        <div className="controls">
          <button className="btn-outline" onClick={refreshUser}>Refresh</button>
        </div>
      </div>
      <div className="panel-body">
        {!user && <div className="list-item-sub">No user loaded.</div>}
        {user && (
          <div className="list">
            <div className="list-item">
              <div className="list-item-title">Name</div>
              <div className="list-item-sub">{user.name || '-'}</div>
            </div>
            <div className="list-item">
              <div className="list-item-title">Email</div>
              <div className="list-item-sub">{user.email || '-'}</div>
            </div>
            <div className="list-item">
              <div className="list-item-title">ID</div>
              <div className="list-item-sub">{user.id || '-'}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
