import React from 'react';

/**
 * Displays a list of saved snippets with basic actions.
 */
function SnippetList({ items = [], onLoad, onDelete }) {
  return (
    <div className="list">
      {items.map((s) => (
        <div key={s.id || s.title} className="list-item">
          <div className="list-item-title">{s.title}</div>
          <div className="list-item-sub">{s.description}</div>
          <div className="controls">
            <button className="btn-outline" onClick={() => onLoad && onLoad(s)}>Load</button>
            <button className="btn-secondary" onClick={() => onDelete && onDelete(s)} style={{ background: '#ef4444' }}>
              Delete
            </button>
          </div>
        </div>
      ))}
      {items.length === 0 && <div className="list-item-sub">No snippets found.</div>}
    </div>
  );
}

export default SnippetList;
