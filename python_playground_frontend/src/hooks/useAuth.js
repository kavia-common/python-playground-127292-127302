/**
 * Convenience hook to access AuthContext.
 */
import { useAuthContext } from '../context/AuthContext';

// PUBLIC_INTERFACE
export function useAuth() {
  /** Returns { user, loading, login, logout, register, refreshUser }. */
  return useAuthContext();
}
