import React from 'react';
import { listSnippets, deleteSnippet } from '../api/snippets';
import SnippetList from '../components/SnippetList';

/**
 * Lists user snippets with basic actions.
 */
function Snippets() {
  const [snippets, setSnippets] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  async function load() {
    setLoading(true);
    try {
      const items = await listSnippets();
      setSnippets(Array.isArray(items) ? items : (items.items || []));
    } catch {
      setSnippets([]);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    load();
  }, []);

  async function onDelete(s) {
    if (!window.confirm(`Delete "${s.title}"?`)) return;
    try {
      await deleteSnippet(s.id);
      await load();
    } catch (e) {
      alert(`Delete failed: ${e.message}`);
    }
  }

  async function onLoad(s) {
    try {
      await navigator.clipboard.writeText(s.code || '');
      alert('Snippet code copied to clipboard. Go to Playground to paste.');
    } catch {
      alert('Unable to copy to clipboard.');
    }
  }

  return (
    <div className="panel" style={{ maxWidth: 900, margin: '1rem auto' }}>
      <div className="panel-header">
        <div className="panel-title">Your Snippets</div>
        <div className="controls">
          <button className="btn-outline" onClick={load} disabled={loading}>
            {loading ? 'Loading...' : 'Refresh'}
          </button>
        </div>
      </div>
      <div className="panel-body">
        <SnippetList items={snippets} onDelete={onDelete} onLoad={onLoad} />
      </div>
    </div>
  );
}

export default Snippets;
