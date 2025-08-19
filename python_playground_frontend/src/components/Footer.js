import React from 'react';
import { API_BASE_URL } from '../api/config';

/**
 * Minimal footer with credits and backend URL info for quick diagnostics.
 */
function Footer() {
  return (
    <div className="footer-inner">
      <div>© {new Date().getFullYear()} Python Playground</div>
      <div className="badge">API: {API_BASE_URL}</div>
    </div>
  );
}

export default Footer;
