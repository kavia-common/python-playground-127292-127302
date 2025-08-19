/**
 * Auth API binding: login, register, and current user profile (me).
 */
import { apiClient, setToken } from './client';

// PUBLIC_INTERFACE
export async function login(email, password) {
  /**
   * Attempts to log in a user with email/password.
   * Returns { token, user } when successful.
   */
  const res = await apiClient.post('/auth/login', { email, password }, { auth: false });
  const token = res.access_token || res.token || res.jwt || null;
  if (token) setToken(token);

  // Fetch user profile after login
  let user = res.user || null;
  try {
    if (!user) user = await me();
  } catch {
    // ignore if /auth/me not available
  }
  return { token, user };
}

// PUBLIC_INTERFACE
export async function register(payload) {
  /**
   * Registers a new user.
   * payload: { email, password, name? }
   */
  const res = await apiClient.post('/auth/register', payload, { auth: false });
  // Some backends return token on register
  const token = res.access_token || res.token || res.jwt || null;
  if (token) setToken(token);
  return res;
}

// PUBLIC_INTERFACE
export async function me() {
  /**
   * Returns the currently authenticated user.
   */
  return apiClient.get('/auth/me');
}
