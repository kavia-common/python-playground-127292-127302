import React from 'react';

/**
 * Displays execution results (stdout, stderr) with some metadata.
 */
function ResultPanel({ result }) {
  if (!result) {
    return (
      <div className="panel">
        <div className="panel-header">
          <div className="panel-title">Results</div>
        </div>
        <div className="panel-body">
          <div className="result">Run code to see results here.</div>
        </div>
      </div>
    );
  }

  const { stdout = '', stderr = '', exit_code, duration } = result;

  return (
    <div className="panel">
      <div className="panel-header">
        <div className="panel-title">Results</div>
        <div className="result-meta">
          {typeof exit_code !== 'undefined' && <span>exit {exit_code}</span>}
          {typeof duration !== 'undefined' && <span>• {duration} ms</span>}
        </div>
      </div>
      <div className="panel-body">
        {stdout && (
          <>
            <div className="list-item-title">stdout</div>
            <pre className="result">{stdout}</pre>
          </>
        )}
        {stderr && (
          <>
            <div className="list-item-title">stderr</div>
            <pre className="result" style={{ borderColor: '#fecaca' }}>{stderr}</pre>
          </>
        )}
        {!stdout && !stderr && <div className="result">No output</div>}
      </div>
    </div>
  );
}

export default ResultPanel;
