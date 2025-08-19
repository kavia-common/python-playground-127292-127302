/* jest-dom adds custom jest matchers for asserting on DOM nodes.
   allows you to do things like:
   expect(element).toHaveTextContent(/react/i)
   learn more: https://github.com/testing-library/jest-dom */
import '@testing-library/jest-dom';

// Mock Monaco editor to a simple textarea for test environment
jest.mock('@monaco-editor/react', () => ({
  __esModule: true,
  default: ({ value = '', onChange }) => {
    const React = require('react');
    // Use a simple textarea mock to simulate editing
    return React.createElement('textarea', {
      'data-testid': 'mock-monaco',
      defaultValue: value,
      onChange: (e) => onChange && onChange(e.target.value),
      style: { width: '100%', height: '120px' }
    });
  },
}));
