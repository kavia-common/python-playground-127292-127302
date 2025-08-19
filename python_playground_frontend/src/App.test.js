import { render, screen } from '@testing-library/react';
import App from './App';

test('renders navigation with Playground link', () => {
  render(<App />);
  const linkElement = screen.getAllByText(/Playground/i)[0];
  expect(linkElement).toBeInTheDocument();
});
