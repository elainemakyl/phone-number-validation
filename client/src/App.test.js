import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Phone Number Validation Tool/i);
  expect(linkElement).toBeInTheDocument();
});
