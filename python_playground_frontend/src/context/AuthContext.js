/**
 * Authentication context providing user info and token state across the app.
 * Handles login, register, logout, and loading the current user.
 */
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { clearToken, getToken, setToken } from '../api/client';
import { login as apiLogin, register as apiRegister, me } from '../api/auth';

const AuthContext = createContext({
  user: null,
  loading: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  refreshUser: async () => {},
});

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  /**
   * Provides authentication state for children.
   * Loads user if token is present at mount.
   */
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadUserIfToken() {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const u = await me();
      setUser(u);
    } catch {
      // token invalid, clear it
      clearToken();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUserIfToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // PUBLIC_INTERFACE
  async function login(email, password) {
    /**
     * Logs in the user and updates context state.
     */
    setLoading(true);
    try {
      const { token, user: u } = await apiLogin(email, password);
      if (token) setToken(token);
      if (u) setUser(u);
      else {
        const meResp = await me().catch(() => null);
        if (meResp) setUser(meResp);
      }
      return true;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  }

  // PUBLIC_INTERFACE
  async function register(payload) {
    /**
     * Registers a user. Some backends also authenticate immediately.
     */
    setLoading(true);
    try {
      await apiRegister(payload);
      // attempt to load user if token present
      const u = await me().catch(() => null);
      if (u) setUser(u);
      return true;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  }

  // PUBLIC_INTERFACE
  function logout() {
    /** Clears token and user state. */
    clearToken();
    setUser(null);
  }

  // PUBLIC_INTERFACE
  async function refreshUser() {
    /** Fetches and replaces the current user in state. */
    try {
      const u = await me();
      setUser(u);
    } catch (e) {
      // no-op
    }
  }

  const value = useMemo(
    () => ({ user, loading, login, register, logout, refreshUser }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// PUBLIC_INTERFACE
export function useAuthContext() {
  /** Shorthand hook to access AuthContext. */
  return useContext(AuthContext);
}
