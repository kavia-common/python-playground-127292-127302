/**
 * API base URL configuration.
 * Uses environment variable REACT_APP_API_BASE_URL. Provide this via .env.
 * If not present, falls back to http://localhost:3001 for local development.
 */
export const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';
