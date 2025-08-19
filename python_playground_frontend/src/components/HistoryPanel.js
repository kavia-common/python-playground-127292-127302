import React from 'react';

/**
 * Displays a list of execution history records.
 */
function HistoryPanel({ items = [], refreshing = false, onRefresh }) {
  return (
    <div className="panel">
      <div className="panel-header">
        <div className="panel-title">History</div>
        <div className="controls">
          <button className="btn-outline" onClick={onRefresh} disabled={refreshing}>
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </div>
      <div className="panel-body">
        {items.length === 0 && <div className="list-item-sub">No history yet.</div>}
        <div className="list">
          {items.map((h) => (
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

export default HistoryPanel;
