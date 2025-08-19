/**
 * Code execution and history API functions.
 */
import { apiClient } from './client';

// PUBLIC_INTERFACE
export async function executeCode({ code, stdin = '' }) {
  /**
   * Execute Python code on the backend.
   * Returns { stdout, stderr, exit_code, duration, created_at?, id? }
   */
  return apiClient.post('/run', { code, stdin });
}

// PUBLIC_INTERFACE
export async function getHistory() {
  /**
   * Get code execution history for current user.
   * Returns an array of items.
   */
  return apiClient.get('/history');
}
