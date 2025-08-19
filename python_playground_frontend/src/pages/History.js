import React from 'react';
import { getHistory } from '../api/code';

/**
 * Separate page to view execution history list.
 */
function History() {
  const [history, setHistory] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  async function load() {
    setLoading(true);
    try {
      const list = await getHistory();
      setHistory(Array.isArray(list) ? list : (list.items || []));
    } catch {
      setHistory([]);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    load();
  }, []);

  return (
    <div className="panel" style={{ maxWidth: 900, margin: '1rem auto' }}>
      <div className="panel-header">
        <div className="panel-title">Execution History</div>
        <div className="controls">
          <button className="btn-outline" onClick={load} disabled={loading}>
            {loading ? 'Loading...' : 'Refresh'}
          </button>
        </div>
      </div>
      <div className="panel-body">
        {history.length === 0 && <div className="list-item-sub">No history yet.</div>}
        <div className="list">
          {history.map((h) => (
            <div key={h.id || h.created_at || Math.random()} className="list-item">
              <div className="list-item-title">{h.title || 'Execution'}</div>
              <div className="list-item-sub">
                {h.created_at ? new Date(h.created_at).toLocaleString() : ''}
                {typeof h.exit_code !== 'undefined' && ` • exit ${h.exit_code}`}
                {typeof h.duration !== 'undefined' && ` • ${h.duration} ms`}
              </div>
              {h.stderr && <div className="badge">stderr</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default History;
