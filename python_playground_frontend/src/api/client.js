/**
 * Lightweight API client using Fetch for JSON endpoints and JWT injection.
 * Centralizes request/response handling and 401 recovery.
 */
import { API_BASE_URL } from './config';

const TOKEN_KEY = 'token';

// PUBLIC_INTERFACE
export function getToken() {
  /** Returns the JWT token stored in localStorage or null if missing. */
  return localStorage.getItem(TOKEN_KEY);
}

// PUBLIC_INTERFACE
export function setToken(token) {
  /** Persists JWT token to localStorage (string). */
  if (token) localStorage.setItem(TOKEN_KEY, token);
}

// PUBLIC_INTERFACE
export function clearToken() {
  /** Removes JWT token from localStorage. */
  localStorage.removeItem(TOKEN_KEY);
}

async function parseJsonResponse(res) {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    return text;
  }
}

async function request(path, { method = 'GET', body, headers = {}, auth = true } = {}) {
  const url = path.startsWith('http') ? path : `${API_BASE_URL}${path}`;

  const baseHeaders = {
    'Content-Type': 'application/json',
    ...headers,
  };

  const init = {
    method,
    headers: baseHeaders,
  };

  if (auth) {
    const token = getToken();
    if (token) {
      init.headers['Authorization'] = `Bearer ${token}`;
    }
  }

  if (body !== undefined) {
    init.body = typeof body === 'string' ? body : JSON.stringify(body);
  }

  const res = await fetch(url, init);

  const data = await parseJsonResponse(res);
  if (!res.ok) {
    const error = new Error((data && data.detail) || res.statusText);
    error.status = res.status;
    error.data = data;
    throw error;
  }

  return data;
}

// PUBLIC_INTERFACE
export const apiClient = {
  /** Performs a GET request. */
  get: (path, options = {}) => request(path, { ...options, method: 'GET' }),
  /** Performs a POST request. */
  post: (path, body, options = {}) => request(path, { ...options, method: 'POST', body }),
  /** Performs a PUT request. */
  put: (path, body, options = {}) => request(path, { ...options, method: 'PUT', body }),
  /** Performs a DELETE request. */
  delete: (path, options = {}) => request(path, { ...options, method: 'DELETE' }),
};
