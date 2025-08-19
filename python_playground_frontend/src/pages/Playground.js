import React from 'react';
import CodeEditor from '../components/Editor';
import ResultPanel from '../components/ResultPanel';
import HistoryPanel from '../components/HistoryPanel';
import { executeCode, getHistory } from '../api/code';
import { createSnippet } from '../api/snippets';
import { useAuth } from '../hooks/useAuth';

/**
 * Main playground area: editor (left) and results/history (right).
 */
function Playground() {
  const { user } = useAuth();

  const [title, setTitle] = React.useState('untitled.py');
  const [code, setCode] = React.useState(`# Python Playground
print("Hello from Python!")`);
  const [stdin, setStdin] = React.useState('');
  const [result, setResult] = React.useState(null);
  const [running, setRunning] = React.useState(false);

  const [history, setHistory] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  async function refreshHistory() {
    setRefreshing(true);
    try {
      const list = await getHistory();
      setHistory(Array.isArray(list) ? list : (list.items || []));
    } catch {
      // ignore missing endpoint
    } finally {
      setRefreshing(false);
    }
  }

  React.useEffect(() => {
    refreshHistory();
  }, []);

  async function onRun() {
    setRunning(true);
    setResult(null);
    try {
      const res = await executeCode({ code, stdin });
      setResult(res);
      refreshHistory();
    } catch (e) {
      setResult({ stdout: '', stderr: e.message || 'Execution failed' });
    } finally {
      setRunning(false);
    }
  }

  async function onSaveSnippet() {
    if (!user) {
      alert('Please log in to save snippets.');
      return;
    }
    try {
      await createSnippet({ title, code, description: 'Saved from Playground' });
      alert('Snippet saved!');
    } catch (e) {
      alert(`Save failed: ${e.message}`);
    }
  }

  return (
    <>
      <section className="panel">
        <div className="panel-header">
          <div className="panel-title">Editor</div>
          <div className="controls">
            <input
              className="input"
              style={{ width: 220 }}
              placeholder="Filename or title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button className="btn" onClick={onRun} disabled={running}>
              {running ? 'Running...' : 'Run ▶'}
            </button>
            <button className="btn-outline" onClick={onSaveSnippet}>
              Save Snippet
            </button>
          </div>
        </div>

        <div className="panel-body" style={{ padding: 0 }}>
          <CodeEditor value={code} onChange={setCode} />
        </div>

        <div className="panel-body">
          <div className="form">
            <div className="form-row">
              <label className="field-label">stdin (optional)</label>
              <textarea
                className="textarea"
                placeholder="Optional stdin for your program"
                value={stdin}
                onChange={(e) => setStdin(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="panel">
        <ResultPanel result={result} />
        <div className="hr" />
        <HistoryPanel items={history} refreshing={refreshing} onRefresh={refreshHistory} />
      </section>
    </>
  );
}

export default Playground;
