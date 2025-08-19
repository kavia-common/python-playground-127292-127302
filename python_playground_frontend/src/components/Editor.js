import React from 'react';
import Editor from '@monaco-editor/react';

/**
 * Monaco editor for Python with theme delegation from document data-theme.
 */
function CodeEditor({ value, onChange }) {
  const [theme, setTheme] = React.useState('vs-light');

  React.useEffect(() => {
    const themeAttr = document.documentElement.getAttribute('data-theme');
    setTheme(themeAttr === 'dark' ? 'vs-dark' : 'vs-light');
  }, []);

  React.useEffect(() => {
    const observer = new MutationObserver(() => {
      const themeAttr = document.documentElement.getAttribute('data-theme');
      setTheme(themeAttr === 'dark' ? 'vs-dark' : 'vs-light');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="editor-container">
      <Editor
        height="100%"
        defaultLanguage="python"
        theme={theme}
        value={value}
        onChange={(v) => onChange(v || '')}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          automaticLayout: true,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
        }}
      />
    </div>
  );
}

export default CodeEditor;
