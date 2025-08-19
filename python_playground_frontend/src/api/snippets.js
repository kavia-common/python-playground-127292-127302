/**
 * Snippets CRUD API functions.
 */
import { apiClient } from './client';

// PUBLIC_INTERFACE
export async function listSnippets() {
  /** Returns an array of snippet items. */
  return apiClient.get('/snippets');
}

// PUBLIC_INTERFACE
export async function createSnippet({ title, code, description = '' }) {
  /** Creates and returns a new snippet. */
  return apiClient.post('/snippets', { title, code, description });
}

// PUBLIC_INTERFACE
export async function updateSnippet(id, payload) {
  /** Updates and returns an existing snippet by ID. */
  return apiClient.put(`/snippets/${id}`, payload);
}

// PUBLIC_INTERFACE
export async function deleteSnippet(id) {
  /** Deletes a snippet by ID. */
  return apiClient.delete(`/snippets/${id}`);
}
