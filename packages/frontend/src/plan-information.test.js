import { render, screen } from '@testing-library/react';
import Test from './plan-information.js';

test('renders learn react link', () => {
  render(<Test />);
  const linkElement = screen.getByText(/Loading.../i);
  expect(linkElement).toBeInTheDocument();
});
